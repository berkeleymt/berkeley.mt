// Run: npm test (Node 22+). Uses node:sqlite as a stand-in for D1 and a fake Stripe.
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import worker from "./src/index.js";

function d1() {
  const db = new DatabaseSync(":memory:");
  db.exec(readFileSync(new URL("./schema.sql", import.meta.url), "utf8"));
  db.exec(readFileSync(new URL("./seed-fake.sql", import.meta.url), "utf8"));
  const stmt = (sql, args = []) => ({
    sql, args,
    bind: (...a) => stmt(sql, a),
    run: async () => ({ meta: { changes: Number(db.prepare(sql).run(...args).changes) } }),
    first: async () => db.prepare(sql).get(...args) ?? null,
    all: async () => ({ results: db.prepare(sql).all(...args) }),
    exec() { return /^\s*SELECT/i.test(sql) ? { results: db.prepare(sql).all(...args) } : { meta: { changes: Number(db.prepare(sql).run(...args).changes) } }; },
  });
  return {
    raw: db,
    prepare: sql => stmt(sql),
    batch: async stmts => {
      db.exec("BEGIN");
      try { const r = stmts.map(s => s.exec()); db.exec("COMMIT"); return r; }
      catch (e) { db.exec("ROLLBACK"); throw e; }
    },
  };
}

let env, sessions, emails, stripeDown;
beforeEach(() => {
  env = { DB: d1(), STRIPE_API_KEY: "sk_test", ADMIN_PASSWORD: "pw", RESEND_API_KEY: "re", ALERT_TO: "a@x.com,moor@x.com" };
  sessions = {}; emails = []; stripeDown = false;
  globalThis.fetch = async (url, init = {}) => {
    const u = new URL(url);
    if (u.host === "api.resend.com") { emails.push(JSON.parse(init.body)); return new Response("{}"); }
    if (stripeDown) return new Response(JSON.stringify({ error: { message: "down" } }), { status: 500 });
    if (init.method === "POST") {
      const id = "cs_" + Object.keys(sessions).length;
      sessions[id] = { id, url: "https://checkout.stripe.com/" + id, status: "open", payment_status: "unpaid", form: new URLSearchParams(init.body) };
      return new Response(JSON.stringify(sessions[id]));
    }
    return new Response(JSON.stringify(sessions[u.pathname.split("/").pop()]));
  };
});

const ORIGIN = "https://berkeley.mt";
const buy = (items, delivery = "ship", origin = ORIGIN) => worker.fetch(new Request("https://w.dev/checkout", {
  method: "POST", headers: { origin, "content-type": "application/json" }, body: JSON.stringify({ items, delivery }),
}), env);
const qty = (p, s) => env.DB.raw.prepare("SELECT qty FROM stock WHERE product = ? AND size = ?").get(p, s).qty;
const pool = s => env.DB.raw.prepare("SELECT free FROM pool WHERE size = ?").get(s).free;
const status = () => env.DB.raw.prepare("SELECT status FROM orders").all().map(r => r.status);
const auth = { authorization: "Basic " + btoa("moor:pw") };
const adminPost = (path, fields, origin = "https://w.dev") => worker.fetch(new Request("https://w.dev" + path, {
  method: "POST", headers: { ...auth, origin }, body: new URLSearchParams(fields),
}), env);
const pay = id => Object.assign(sessions[id], { status: "complete", payment_status: "paid", amount_total: 1400,
  customer_details: { name: "Ann", email: "ann@x.com" }, collected_information: { shipping_details: { name: "Ann", address: { line1: "1 Main", city: "Berkeley", state: "CA", postal_code: "94704" } } } });

test("checkout holds stock and opens Stripe", async () => {
  const r = await buy([{ id: "bmt-2024", size: "S", qty: 2 }, { id: "bmt-2024", size: "S", qty: 1 }]);
  assert.equal(r.status, 200);
  assert.match((await r.json()).url, /checkout\.stripe\.com/);
  assert.equal(qty("bmt-2024", "S"), 3);
  assert.equal(pool("S"), 66 - 3);
  assert.equal(sessions.cs_0.form.get("line_items[0][quantity]"), "3");
  assert.ok(Number(sessions.cs_0.form.get("expires_at")) >= Date.now() / 1000 + 1800);
});

test("two buyers racing for the last units: only one gets them", async () => {
  const rs = await Promise.all([buy([{ id: "bmt-2023", size: "S", qty: 3 }]), buy([{ id: "bmt-2023", size: "S", qty: 3 }])]);
  assert.deepEqual(rs.map(r => r.status).sort(), [200, 409]);
  const err = await rs.find(r => r.status === 409).json();
  assert.match(err.error, /only 0 left of BMT 2023 Shirt \(S\)/);
  assert.equal(err.stock["bmt-2023"].S, 0);
  assert.equal(qty("bmt-2023", "S"), 0);
  assert.equal(Object.keys(sessions).length, 1);
});

test("mystery shirts sell from every design's stock in that size", async () => {
  assert.equal(pool("2XL"), 4); // 1 + 0 + 2 + 1 + 0 + 0
  assert.equal((await buy([{ id: "mystery", size: "2XL", qty: 3 }])).status, 200);
  assert.equal(qty("bmmt-2025", "2XL"), 2); // design not chosen until packing
  const r = await buy([{ id: "bmmt-2025", size: "2XL", qty: 2 }]);
  assert.equal(r.status, 409);
  assert.match((await r.json()).error, /only 1 left/);
  assert.equal((await buy([{ id: "bmmt-2025", size: "2XL", qty: 1 }])).status, 200);
  assert.equal((await buy([{ id: "mystery", size: "2XL", qty: 1 }])).status, 409);
});

test("expired checkout returns stock once", async () => {
  await buy([{ id: "bmt-2024", size: "M", qty: 4 }, { id: "tote-bmmt-2026", size: "One size", qty: 2 }]);
  await worker.scheduled({}, env);
  assert.deepEqual(status(), ["held"]);
  sessions.cs_0.status = "expired";
  await worker.scheduled({}, env);
  await worker.scheduled({}, env);
  assert.deepEqual(status(), ["released"]);
  assert.equal(qty("bmt-2024", "M"), 14);
  assert.equal(qty("tote-bmmt-2026", "One size"), 25);
  assert.equal(pool("M"), 66);
});

test("failed async payment returns stock; pending one keeps it", async () => {
  await buy([{ id: "bmt-2024", size: "M", qty: 1 }]);
  Object.assign(sessions.cs_0, { status: "complete", payment_status: "unpaid", payment_intent: { status: "processing" } });
  await worker.scheduled({}, env);
  assert.deepEqual(status(), ["held"]);
  sessions.cs_0.payment_intent.status = "requires_payment_method";
  await worker.scheduled({}, env);
  assert.deepEqual(status(), ["released"]);
  assert.equal(qty("bmt-2024", "M"), 14);
});

test("Stripe failure returns stock", async () => {
  stripeDown = true;
  assert.equal((await buy([{ id: "bmt-2024", size: "M", qty: 5 }])).status, 502);
  assert.deepEqual(status(), ["released"]);
  assert.equal(qty("bmt-2024", "M"), 14);
});

test("paid order: one alert, manifest, packing with mystery picks", async () => {
  await buy([{ id: "mystery", size: "S", qty: 1 }, { id: "bmt-2024", size: "S", qty: 1 }]);
  pay("cs_0");
  await worker.scheduled({}, env);
  await worker.scheduled({}, env);
  assert.deepEqual(status(), ["paid"]);
  assert.equal(emails.length, 1);
  assert.deepEqual(emails[0].to, ["a@x.com", "moor@x.com"]);
  assert.match(emails[0].text, /1x Mystery Shirt \(S\) \(any design\)\n1x BMT 2024 Shirt \(S\)\n\+1 freebie \(your pick\) \+ card/);
  assert.match(emails[0].text, /SHIP TO: Ann, 1 Main, Berkeley, CA 94704/);

  const csv = await (await worker.fetch(new Request("https://w.dev/admin/manifest.csv", { headers: auth }), env)).text();
  assert.match(csv, /"Ann","ann@x.com","","ship","1 Main, Berkeley, CA 94704","1x Mystery Shirt \(S\) \(any design\); 1x BMT 2024 Shirt \(S\)","\+1 freebie/);

  const id = env.DB.raw.prepare("SELECT id FROM orders").get().id;
  let r = await adminPost("/admin/pack", { id });
  assert.match(decodeURIComponent(r.headers.get("location")), /Pick a design/);
  r = await adminPost("/admin/pack", { id, pick: "bmt-2025" });
  assert.match(decodeURIComponent(r.headers.get("location")), /marked packed/);
  assert.equal(qty("bmt-2025", "S"), 11);
  assert.equal(pool("S"), 66 - 2);
  await adminPost("/admin/unpack", { id });
  assert.equal(qty("bmt-2025", "S"), 12);
  assert.equal(env.DB.raw.prepare("SELECT packed FROM orders").get().packed, 0);
});

test("recount sets shelf count net of open orders", async () => {
  await buy([{ id: "bmt-2024", size: "L", qty: 2 }]);
  const r = await adminPost("/admin/stock", { product: "bmt-2024", size: "L", shelf: "5" });
  assert.match(decodeURIComponent(r.headers.get("location")), /Saved/);
  assert.equal(qty("bmt-2024", "L"), 3);
  assert.equal(pool("L"), 46 - 2 - 5);
  const bad = await adminPost("/admin/stock", { product: "bmt-2024", size: "L", shelf: "1" });
  assert.match(decodeURIComponent(bad.headers.get("location")), /less than/);
  assert.equal(qty("bmt-2024", "L"), 3);
});

test("admin needs the password and same-origin posts", async () => {
  assert.equal((await worker.fetch(new Request("https://w.dev/admin"), env)).status, 401);
  assert.equal((await worker.fetch(new Request("https://w.dev/admin", { headers: { authorization: "Basic " + btoa("x:nope") } }), env)).status, 401);
  const page = await worker.fetch(new Request("https://w.dev/admin", { headers: auth }), env);
  assert.equal(page.status, 200);
  assert.match(await page.text(), /BmMT 2026 Tote Bag/);
  assert.equal((await adminPost("/admin/stock", { product: "bmt-2024", size: "L", shelf: "0" }, "https://evil.com")).status, 403);
});

test("rejects bad carts and other sites", async () => {
  assert.equal((await buy([{ id: "bmt-2024", size: "S", qty: 101 }])).status, 400);
  assert.equal((await buy([{ id: "bmt-2026", size: "S", qty: 1 }])).status, 400);
  assert.equal((await buy([])).status, 400);
  assert.equal((await buy([{ id: "bmt-2024", size: "S", qty: 1 }], "ship", "https://evil.com")).status, 403);
  const s = await worker.fetch(new Request("https://w.dev/stock", { headers: { origin: ORIGIN } }), env);
  assert.equal((await s.json()).pool.S, 66);
});
