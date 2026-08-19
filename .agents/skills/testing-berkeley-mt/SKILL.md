---
name: testing-berkeley-mt
description: How to build, run, and browser-test the berkeley.mt Zola static site locally
---

# Testing berkeley.mt locally

The site is a Zola static site (Tera templates) styled with the standalone Tailwind CSS binary — no npm/node needed.

## Setup / run

1. Ensure `zola` (v0.21.0) and `tailwindcss` (standalone v3.4.x) binaries are installed (the repo blueprint installs both to /usr/local/bin).
2. From the repo root:
   ```bash
   tailwindcss -i ./static/input.css -o ./static/style.css   # one-shot build is enough for testing
   zola serve --interface 0.0.0.0 --port 1111 &
   ```
3. Site is at http://localhost:1111. `zola serve` live-reloads on content/template edits. Internal links may render with base `http://0.0.0.0:1111` — that's normal for the dev server.

## Useful facts for testing

- Redirects are Zola front-matter `aliases` — they render a small HTML page with a JS `window.location.replace`, so `curl` shows HTTP 200 with a redirect stub, not a 30x. Test redirects in a real browser or grep the stub's `target =` URL.
- Nav bar (desktop + mobile hamburger) lives in `templates/base.html`; the mobile menu appears below the `md` breakpoint (resize window under ~768px wide, e.g. `wmctrl -r :ACTIVE: -e 0,100,50,500,700`).
- The Resources page section ordering is seasonal, computed at build time via `now()` in `templates/resources/index.html` (Jan–Jun: BmMT worksheets first; Jul–Dec: Blog first).
- Home page banner/notifications are in `templates/index.html` (latest news posts + latest blog post from `resources/blog/_index.md`).
- Deploy previews for PRs exist at `pr-{N}.berkeley-mt.pages.dev` (per blueprint notes) if local serving is not desired.
