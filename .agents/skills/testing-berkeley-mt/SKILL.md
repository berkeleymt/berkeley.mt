---
name: testing-berkeley-mt
description: Test the berkeley.mt Zola static site end-to-end, including URL redirects (e.g. /feedback, /join, /volunteer). Use when verifying redirect targets or other site changes on a PR.
---

# Testing berkeley.mt

Static site built with Zola + Tailwind, deployed to OCF and Cloudflare Pages.

## Deploy previews (primary way to test a PR)
Each PR auto-deploys to Cloudflare Pages at:

    https://pr-{N}.berkeley-mt.pages.dev

Wait for the `deploy` / `build` CI checks to pass, then open the preview. No auth needed (public site).

## Testing redirects (e.g. /feedback)
Redirects live in `content/redirects/*.md` using `template = "redirect.html"`. Each file sets:
- `aliases = ["/short-path"]` — the user-facing path (e.g. `/feedback`).
- `extra.url = "https://..."` — the destination.

The build produces a two-hop client-side redirect: `/feedback` (alias page) meta-refreshes to `/redirects/feedback/`, which then `window.location.replace(...)`s to the destination URL.

To verify a redirect end-to-end:
1. In the browser, go to `https://pr-{N}.berkeley-mt.pages.dev/<alias>` (e.g. `/feedback`).
2. Confirm the address bar ends on the destination URL and the destination page renders.
   - Zoom the address bar for a clear screenshot of the final URL.
3. Quick non-browser check: `curl -s https://pr-{N}.berkeley-mt.pages.dev/<alias>/` should contain `<meta http-equiv="refresh" ... url=/redirects/<alias>/>`, and `curl -s .../redirects/<alias>/` should contain the destination URL.

Tip: when given a `forms.gle/...` short link, resolve it to the canonical `docs.google.com/forms/d/e/.../viewform` URL (`curl -sI <shortlink>` → Location header) so the redirect skips an extra hop and matches the other redirect files.

## Local build / verify
Tools (zola, tailwindcss) are preinstalled via the blueprint.

    tailwindcss -i ./static/input.css -o ./static/style.css && zola build
    # then inspect public/<alias>/index.html and public/redirects/<alias>/index.html

`zola serve --interface 0.0.0.0` runs a local dev server if you need to test without a preview.

## Devin Secrets Needed
None for redirect/static-site testing — deploy previews are public.
