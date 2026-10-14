import { once } from "node:events";
import { createReadStream } from "node:fs";
import { mkdir, readFile, readdir, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { extname, isAbsolute, join, relative, resolve } from "node:path";
import { chromium } from "playwright-core";

const siteDirArg = process.argv[2];
if (!siteDirArg) throw new Error("Usage: node scripts/glance-images.mjs <siteDir>");

const siteDir = resolve(siteDirArg);
const siteInfo = await stat(siteDir);
if (!siteInfo.isDirectory()) throw new Error(`${siteDir} is not a directory`);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".woff2": "font/woff2",
};

const server = createServer((request, response) => {
  const serve = async () => {
    const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
    let filePath = resolve(siteDir, `.${pathname}`);
    const relativePath = relative(siteDir, filePath);
    if (relativePath.startsWith("..") || isAbsolute(relativePath)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }
    if (pathname.endsWith("/")) filePath = join(filePath, "index.html");

    const fileInfo = await stat(filePath).catch(() => null);
    if (!fileInfo?.isFile()) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": contentTypes[extname(filePath).toLowerCase()] || "application/octet-stream",
    });
    createReadStream(filePath).pipe(response);
  };

  serve().catch(error => {
    console.error("Unable to serve %s:", request.url, error);
    if (!response.headersSent) response.writeHead(500);
    response.end("Internal server error");
  });
});

server.listen(0, "127.0.0.1");
await once(server, "listening");
const { port } = server.address();
const dataDir = fileURLToPath(new URL("../data/", import.meta.url));
const configs = (await readdir(dataDir))
  .filter(name => name.endsWith("-at-a-glance.toml"))
  .sort();

let browser;
try {
  browser = await chromium.launch({
    executablePath: process.env.CHROME || "/usr/bin/google-chrome",
    args: ["--headless=new"],
  });
  const context = await browser.newContext({
    viewport: { width: 600, height: 1000 },
    deviceScaleFactor: 2,
  });
  const outputDir = join(siteDir, "email");
  await mkdir(outputDir, { recursive: true });

  for (const name of configs) {
    const slug = name.replace(/\.toml$/, "");
    const config = await readFile(join(dataDir, name), "utf8");
    const eventPage = config.match(/^event_page\s*=\s*"([^"]+)"/m)?.[1];
    if (!eventPage) throw new Error(`${name} has no event_page`);

    const page = await context.newPage();
    try {
      const response = await page.goto(
        `http://127.0.0.1:${port}${eventPage}?glance-email`,
        { waitUntil: "load" },
      );
      if (!response?.ok()) throw new Error(`Unable to load ${eventPage}: ${response?.status()}`);

      const glances = page.locator(".glance");
      if (!await glances.count()) throw new Error(`${eventPage} has no .glance widget`);
      const glance = glances.first();
      await glance.locator(".w").waitFor({ state: "attached" });
      await page.evaluate(() => document.fonts.ready.then(() => true));
      await page.waitForTimeout(300);
      await glance.screenshot({ path: join(outputDir, `${slug}.png`) });
      console.log(`Generated ${join(outputDir, `${slug}.png`)}`);
    } finally {
      await page.close();
    }
  }
} finally {
  if (browser) await browser.close();
  await new Promise((resolveClose, rejectClose) => {
    server.close(error => error ? rejectClose(error) : resolveClose());
  });
}
