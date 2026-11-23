// Checkout, stock holds and the stock/orders admin page for the berkeley.mt store.
// Prices live here so the browser can't change them. Stock lives in D1 (schema.sql).
// Secrets: STRIPE_API_KEY, ADMIN_PASSWORD. Optional order emails: RESEND_API_KEY, ALERT_TO, ALERT_FROM.

const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];
const CATALOG = {
  "mystery": { name: "Mystery Shirt", price: 800, sizes: SIZES },
  "bmmt-2026": { name: "BmMT 2026 Shirt", price: 900, sizes: SIZES },
  "bmt-2025": { name: "BMT 2025 Shirt", price: 900, sizes: SIZES },
  "bmmt-2025": { name: "BmMT 2025 Shirt", price: 900, sizes: SIZES },
  "bmt-2024": { name: "BMT 2024 Shirt", price: 900, sizes: SIZES },
  "bmmt-2024": { name: "BmMT 2024 Shirt", price: 900, sizes: SIZES },
  "bmt-2023": { name: "BMT 2023 Shirt", price: 900, sizes: SIZES },
  "tote-bmmt-2026": { name: "BmMT 2026 Tote Bag", price: 1200, sizes: ["One size"] },
};
const isShirt = id => id !== "mystery" && !id.startsWith("tote-");
const SHIRTS = Object.keys(CATALOG).filter(isShirt);
const SHIPPING = 500;
const MAX_QTY = 100;
const HOLD_SECONDS = 31 * 60; // Stripe requires checkout sessions to last at least 30 minutes
const FREEBIE = "+1 freebie (your pick) + card";

const allowedOrigin = o =>
  o === "https://berkeley.mt" ||
  /^https:\/\/([a-z0-9-]+\.)?berkeley-mt\.pages\.dev$/.test(o) ||
  /^http:\/\/localhost(:\d+)?$/.test(o);

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
      ...(allowedOrigin(origin) && { "access-control-allow-origin": origin, "vary": "origin" }),
    },
  });
}

const now = () => Math.floor(Date.now() / 1000);
const label = (id, size) => CATALOG[id].sizes.length > 1 ? `${CATALOG[id].name} (${size})` : CATALOG[id].name;

async function readStock(db) {
  const [s, p] = await db.batch([db.prepare("SELECT product, size, qty FROM stock"), db.prepare("SELECT size, free FROM pool")]);
  const stock = {}, pool = {};
  for (const r of s.results) (stock[r.product] ??= {})[r.size] = r.qty;
  for (const r of p.results) pool[r.size] = r.free;
  return { stock, pool };
}

// What a cart line can still get: named shirts are also capped by the shared per-size pool.
const avail = ({ stock, pool }, id, size) =>
  id === "mystery" ? pool[size] ?? 0
  : isShirt(id) ? Math.min(stock[id]?.[size] ?? 0, pool[size] ?? 0)
  : stock[id]?.[size] ?? 0;

const stripe = (env, path, init = {}) => fetch(`https://api.stripe.com/v1/${path}`, {
  ...init,
  headers: { authorization: `Bearer ${env.STRIPE_API_KEY}`, "content-type": "application/x-www-form-urlencoded" },
}).then(async r => ({ ok: r.ok, body: await r.json() }));

async function checkout(req, env, origin) {
  let body;
  try { body = await req.json(); } catch { return json({ error: "Bad JSON" }, 400, origin); }
  const raw = Array.isArray(body.items) ? body.items : [];
  const delivery = body.delivery === "pickup" ? "pickup" : "ship";
  if (!raw.length || raw.length > 50) return json({ error: "Cart is empty" }, 400, origin);

  const merged = new Map();
  for (const it of raw) {
    const p = CATALOG[it.id], qty = Number(it.qty);
    if (!p || !p.sizes.includes(it.size) || !Number.isInteger(qty) || qty < 1) return json({ error: "Invalid item" }, 400, origin);
    const k = it.id + "|" + it.size;
    merged.set(k, { id: it.id, size: it.size, qty: (merged.get(k)?.qty || 0) + qty });
  }
  const items = [...merged.values()];
  if (items.some(i => i.qty > MAX_QTY)) return json({ error: "Invalid item" }, 400, origin);

  // Take the stock first; the CHECK (qty >= 0) constraints make two buyers racing for the last units safe.
  const take = [];
  for (const i of items) {
    if (i.id !== "mystery") take.push(["stock", i.id, i.size, i.qty]);
    if (i.id === "mystery" || isShirt(i.id)) take.push(["pool", null, i.size, i.qty]);
  }
  const id = crypto.randomUUID(), t = now();
  const db = env.DB;
  try {
    await db.batch([
      ...take.map(([tbl, product, size, n]) => tbl === "stock"
        ? db.prepare("UPDATE stock SET qty = qty - ? WHERE product = ? AND size = ?").bind(n, product, size)
        : db.prepare("UPDATE pool SET free = free - ? WHERE size = ?").bind(n, size)),
      db.prepare("INSERT INTO orders (id, status, delivery, items, take, created, expires) VALUES (?, 'held', ?, ?, ?, ?, ?)")
        .bind(id, delivery, JSON.stringify(items), JSON.stringify(take), t, t + HOLD_SECONDS),
    ]);
  } catch (e) {
    if (!/CHECK constraint/i.test(String(e.message))) throw e;
    const st = await readStock(db);
    const short = items.find(i => avail(st, i.id, i.size) < i.qty);
    const n = short ? Math.max(0, avail(st, short.id, short.size)) : 0;
    return json({
      error: short ? `Sorry, only ${n} left of ${label(short.id, short.size)}. Your cart has been updated.` : "Some items just sold out.",
      ...st,
    }, 409, origin);
  }

  const f = new URLSearchParams({
    "mode": "payment",
    "success_url": `${origin}/store/?paid=1`,
    "cancel_url": `${origin}/store/`,
    "expires_at": t + HOLD_SECONDS,
    "client_reference_id": id,
    "metadata[order]": id,
    "metadata[delivery]": delivery,
  });
  items.forEach((it, i) => {
    f.set(`line_items[${i}][price_data][currency]`, "usd");
    f.set(`line_items[${i}][price_data][unit_amount]`, CATALOG[it.id].price);
    f.set(`line_items[${i}][price_data][product_data][name]`, label(it.id, it.size));
    f.set(`line_items[${i}][quantity]`, it.qty);
  });
  f.set("metadata[items]", items.map(i => `${i.qty}x ${i.id}${CATALOG[i.id].sizes.length > 1 ? " " + i.size : ""}`).join(", ").slice(0, 500));
  if (delivery === "ship") {
    f.set("shipping_address_collection[allowed_countries][0]", "US");
    f.set("shipping_options[0][shipping_rate_data][type]", "fixed_amount");
    f.set("shipping_options[0][shipping_rate_data][display_name]", "US shipping (flat)");
    f.set("shipping_options[0][shipping_rate_data][fixed_amount][amount]", SHIPPING);
    f.set("shipping_options[0][shipping_rate_data][fixed_amount][currency]", "usd");
  } else {
    f.set("phone_number_collection[enabled]", "true");
    f.set("custom_text[submit][message]", "Local pickup in Berkeley. We'll email you to set a time. This order won't be shipped.");
  }

  const s = await stripe(env, "checkout/sessions", { method: "POST", body: f });
  if (!s.ok) {
    console.log("stripe error", s.body.error?.message);
    await release(db, id, take);
    return json({ error: "Couldn't start checkout" }, 502, origin);
  }
  await db.prepare("UPDATE orders SET session = ? WHERE id = ?").bind(s.body.id, id).run();
  return json({ url: s.body.url }, 200, origin);
}

// Returns an order's stock. Safe to call twice: only a still-held order gives stock back.
async function release(db, id, take) {
  const held = "EXISTS (SELECT 1 FROM orders WHERE id = ? AND status = 'held')";
  await db.batch([
    ...take.map(([tbl, product, size, n]) => tbl === "stock"
      ? db.prepare(`UPDATE stock SET qty = qty + ? WHERE product = ? AND size = ? AND ${held}`).bind(n, product, size, id)
      : db.prepare(`UPDATE pool SET free = free + ? WHERE size = ? AND ${held}`).bind(n, size, id)),
    db.prepare("UPDATE orders SET status = 'released' WHERE id = ? AND status = 'held'").bind(id),
  ]);
}

// Asks Stripe about every open hold: paid -> order, expired/failed -> stock back.
async function reconcile(env) {
  const db = env.DB;
  const { results } = await db.prepare("SELECT * FROM orders WHERE status = 'held' ORDER BY created LIMIT 50").all();
  for (const o of results) {
    const take = JSON.parse(o.take);
    if (!o.session) {
      if (now() - o.created > 300) await release(db, o.id, take);
      continue;
    }
    const r = await stripe(env, `checkout/sessions/${o.session}?expand[]=payment_intent`);
    if (!r.ok) { console.log("stripe error", r.body.error?.message); continue; }
    const s = r.body;
    const pi = s.payment_intent;
    if (s.status === "expired" || (s.status === "complete" && s.payment_status === "unpaid" && pi && ["canceled", "requires_payment_method"].includes(pi.status))) {
      await release(db, o.id, take);
    } else if (s.status === "complete" && s.payment_status !== "unpaid") {
      const d = s.customer_details || {};
      const ship = s.collected_information?.shipping_details || s.shipping_details;
      const customer = { name: ship?.name || d.name, email: d.email, phone: d.phone, address: ship?.address || null };
      const res = await db.prepare("UPDATE orders SET status = 'paid', paid_at = ?, total = ?, customer = ? WHERE id = ? AND status = 'held'")
        .bind(now(), s.amount_total, JSON.stringify(customer), o.id).run();
      if (res.meta.changes) await alert(env, { ...o, customer, total: s.amount_total }).catch(e => console.log("alert failed", e.message));
    }
  }
}

const fmtAddr = a => a ? [a.line1, a.line2, `${a.city}, ${a.state} ${a.postal_code}`].filter(Boolean).join(", ") : "";
const itemLines = items => items.map(i => `${i.qty}x ${label(i.id, i.size)}${i.id === "mystery" ? " (any design)" : ""}`);

async function alert(env, o) {
  if (!env.RESEND_API_KEY || !env.ALERT_TO) return;
  const c = o.customer, items = JSON.parse(o.items);
  const text = [
    `New store order ${o.id.slice(0, 8)}: $${(o.total / 100).toFixed(2)}`,
    "", ...itemLines(items), FREEBIE, "",
    o.delivery === "pickup" ? `PICKUP: ${c.name} <${c.email}> ${c.phone || ""}` : `SHIP TO: ${c.name}, ${fmtAddr(c.address)} <${c.email}>`,
    "", "Stock page: https://bmt-store-checkout.andrew-js-ku.workers.dev/admin",
  ].join("\n");
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({ from: env.ALERT_FROM || "BMT Store <store@berkeley.mt>", to: env.ALERT_TO.split(","), subject: `Store order: ${itemLines(items).join(", ").slice(0, 80)}`, text }),
  });
  if (!r.ok) throw new Error(`resend ${r.status}`);
}

// ---------- admin ----------

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);

function authorized(req, env) {
  const h = req.headers.get("authorization") || "";
  if (!env.ADMIN_PASSWORD || !h.startsWith("Basic ")) return false;
  const [, pass] = atob(h.slice(6)).split(/:(.*)/s);
  return pass === env.ADMIN_PASSWORD;
}

// Units of each product/size still physically on the shelf but already spoken for.
function committed(orders) {
  const held = {}, toPack = {};
  for (const o of orders) {
    const bucket = o.status === "held" ? held : o.status === "paid" && !o.packed ? toPack : null;
    if (!bucket) continue;
    for (const i of JSON.parse(o.items)) bucket[i.id + "|" + i.size] = (bucket[i.id + "|" + i.size] || 0) + i.qty;
  }
  return { held, toPack };
}

async function admin(req, env, url) {
  const db = env.DB;
  if (req.method === "POST") {
    if (req.headers.get("origin") !== url.origin) return new Response("Bad origin", { status: 403 });
    const f = await req.formData();
    const orders = (await db.prepare("SELECT * FROM orders WHERE status IN ('held', 'paid')").all()).results;
    let msg = "";
    try {
      if (url.pathname === "/admin/stock") {
        const id = f.get("product"), size = f.get("size"), shelf = Number(f.get("shelf"));
        if (!CATALOG[id] || id === "mystery" || !CATALOG[id].sizes.includes(size) || !Number.isInteger(shelf) || shelf < 0) throw new Error("Bad count");
        const { held, toPack } = committed(orders);
        const qty = shelf - (held[id + "|" + size] || 0) - (toPack[id + "|" + size] || 0);
        if (qty < 0) throw new Error(`${label(id, size)}: ${shelf} on the shelf is less than what's in open checkouts or waiting to be packed.`);
        const cur = (await db.prepare("SELECT qty FROM stock WHERE product = ? AND size = ?").bind(id, size).first())?.qty ?? 0;
        await db.batch([
          db.prepare("INSERT INTO stock (product, size, qty) VALUES (?, ?, ?) ON CONFLICT DO UPDATE SET qty = excluded.qty").bind(id, size, qty),
          ...(isShirt(id) ? [
            db.prepare("INSERT OR IGNORE INTO pool (size, free) VALUES (?, 0)").bind(size),
            db.prepare("UPDATE pool SET free = free + ? WHERE size = ?").bind(qty - cur, size),
          ] : []),
        ]);
        msg = `Saved ${label(id, size)}: ${shelf} on the shelf.`;
      } else if (url.pathname === "/admin/pack") {
        const o = orders.find(x => x.id === f.get("id") && x.status === "paid" && !x.packed);
        if (!o) throw new Error("Order not found or already packed");
        const picks = f.getAll("pick");
        const need = JSON.parse(o.items).filter(i => i.id === "mystery").flatMap(i => Array(i.qty).fill(i.size));
        if (picks.length !== need.length || picks.some(p => !SHIRTS.includes(p))) throw new Error("Pick a design for every mystery shirt");
        const counts = {};
        need.forEach((size, i) => counts[picks[i] + "|" + size] = (counts[picks[i] + "|" + size] || 0) + 1);
        const unpacked = "EXISTS (SELECT 1 FROM orders WHERE id = ? AND status = 'paid' AND packed = 0)";
        await db.batch([
          ...Object.entries(counts).map(([k, n]) => { const [p, s] = k.split("|");
            return db.prepare(`UPDATE stock SET qty = qty - ? WHERE product = ? AND size = ? AND ${unpacked}`).bind(n, p, s, o.id); }),
          db.prepare("UPDATE orders SET packed = 1, picks = ? WHERE id = ? AND packed = 0").bind(JSON.stringify(need.map((size, i) => ({ size, product: picks[i] }))), o.id),
        ]);
        msg = `Order ${o.id.slice(0, 8)} marked packed.`;
      } else if (url.pathname === "/admin/unpack") {
        const o = await db.prepare("SELECT * FROM orders WHERE id = ? AND status = 'paid' AND packed = 1").bind(f.get("id")).first();
        if (!o) throw new Error("Order not found");
        const packed = "EXISTS (SELECT 1 FROM orders WHERE id = ? AND packed = 1)";
        await db.batch([
          ...JSON.parse(o.picks || "[]").map(p => db.prepare(`UPDATE stock SET qty = qty + 1 WHERE product = ? AND size = ? AND ${packed}`).bind(p.product, p.size, o.id)),
          db.prepare("UPDATE orders SET packed = 0, picks = NULL WHERE id = ?").bind(o.id),
        ]);
        msg = `Order ${o.id.slice(0, 8)} moved back to "to pack".`;
      }
    } catch (e) {
      msg = !/CHECK constraint/i.test(String(e.message)) ? e.message
        : url.pathname === "/admin/stock" ? "That's fewer shirts in this size than mystery shirts waiting to be packed."
        : "The stock page shows fewer of that design than you picked. Recount it first.";
    }
    return Response.redirect(`${url.origin}/admin?msg=${encodeURIComponent(msg)}`, 303);
  }

  await reconcile(env).catch(e => console.log("reconcile failed", e.message));
  const orders = (await db.prepare("SELECT * FROM orders WHERE status IN ('held', 'paid') ORDER BY created DESC LIMIT 500").all()).results;
  const toPack = orders.filter(o => o.status === "paid" && !o.packed).reverse();

  if (url.pathname === "/admin/manifest.csv") {
    const csv = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = [["order", "paid", "name", "email", "phone", "delivery", "address", "items", "extra"],
      ...toPack.map(o => { const c = JSON.parse(o.customer);
        return [o.id.slice(0, 8), new Date(o.paid_at * 1000).toISOString().slice(0, 10), c.name, c.email, c.phone, o.delivery, fmtAddr(c.address), itemLines(JSON.parse(o.items)).join("; "), FREEBIE]; })];
    return new Response(rows.map(r => r.map(csv).join(",")).join("\n"), {
      headers: { "content-type": "text/csv", "content-disposition": "attachment; filename=bmt-store-manifest.csv", "cache-control": "no-store" },
    });
  }
  if (url.pathname !== "/admin") return new Response("Not found", { status: 404 });

  const st = await readStock(db);
  const { held, toPack: unpacked } = committed(orders);
  const sold = {};
  for (const o of orders) if (o.status === "paid") for (const i of JSON.parse(o.items)) sold[i.id + "|" + i.size] = (sold[i.id + "|" + i.size] || 0) + i.qty;
  const stockRows = Object.entries(CATALOG).map(([id, p]) => `<tr><th colspan="6" class="l">${esc(p.name)}${id === "mystery" ? " <small>(sells from all shirts in that size)</small>" : ""}</th></tr>` +
    p.sizes.map(s => { const k = id + "|" + s;
      const shelf = id === "mystery" ? "" : (st.stock[id]?.[s] ?? 0) + (held[k] || 0) + (unpacked[k] || 0);
      return `<tr><td>${esc(s)}</td><td><b>${avail(st, id, s)}</b></td><td>${held[k] || 0}</td><td>${unpacked[k] || 0}</td><td>${sold[k] || 0}</td><td>${id === "mystery" ? "" :
        `<form method="post" action="/admin/stock"><input type="hidden" name="product" value="${esc(id)}"><input type="hidden" name="size" value="${esc(s)}"><input name="shelf" type="number" min="0" value="${shelf}"> <button>Save</button></form>`}</td></tr>`; }).join("")).join("");
  const orderCard = o => { const c = JSON.parse(o.customer || "{}"), items = JSON.parse(o.items);
    const mysteries = items.filter(i => i.id === "mystery").flatMap(i => Array(i.qty).fill(i.size));
    return `<div class="card"><b>#${esc(o.id.slice(0, 8))}</b> · ${new Date((o.paid_at || o.created) * 1000).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} · $${((o.total || 0) / 100).toFixed(2)}
      <ul>${itemLines(items).map(l => `<li>${esc(l)}</li>`).join("")}<li><i>${esc(FREEBIE)}</i></li></ul>
      <div>${o.delivery === "pickup" ? `<b>Pickup</b>: ${esc(c.name)} · ${esc(c.email)} · ${esc(c.phone)}` : `<b>Ship to</b>: ${esc(c.name)}, ${esc(fmtAddr(c.address))} · ${esc(c.email)}`}</div>
      ${o.packed ? `<div>Packed${o.picks && JSON.parse(o.picks).length ? ": mystery = " + JSON.parse(o.picks).map(p => `${esc(p.size)} ${esc(CATALOG[p.product].name)}`).join(", ") : ""}
        <form method="post" action="/admin/unpack" style="display:inline"><input type="hidden" name="id" value="${esc(o.id)}"><button>Undo</button></form></div>`
      : `<form method="post" action="/admin/pack"><input type="hidden" name="id" value="${esc(o.id)}">${mysteries.map(s =>
        `<label>Mystery ${esc(s)} packed as <select name="pick" required><option value="">choose…</option>${SHIRTS.map(p => `<option value="${p}">${esc(CATALOG[p].name)}</option>`).join("")}</select></label><br>`).join("")}
        <button>Mark packed</button></form>`}</div>`; };
  const msg = url.searchParams.get("msg");
  const page = `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>BMT store stock</title>
<style>body{font:15px system-ui,sans-serif;max-width:900px;margin:auto;padding:16px;color:#111}table{border-collapse:collapse;width:100%}td,th{padding:4px 8px;border-bottom:1px solid #eee;text-align:right}.l{text-align:left;background:#f4f4f5}td:first-child{text-align:left}input[type=number]{width:5em}.card{border:1px solid #ddd;border-radius:8px;padding:10px;margin:8px 0}.msg{background:#ecfeff;border:1px solid #67e8f9;padding:8px;border-radius:6px}small{color:#666;font-weight:normal}</style>
<h1>BMT store</h1>${msg ? `<p class="msg">${esc(msg)}</p>` : ""}
<h2>To pack (${toPack.length})</h2><p><a href="/admin/manifest.csv">Download packing manifest (CSV)</a></p>${toPack.map(orderCard).join("") || "<p>Nothing to pack.</p>"}
<h2>Stock</h2><p><small>Available = can still be bought. In checkout = held for someone on the Stripe page (returns after 30 min if unpaid). On shelf = what's physically there, including orders not yet packed. After a recount, type the shelf count and Save.</small></p>
<table><tr><th class="l">Size</th><th>Available</th><th>In checkout</th><th>To pack</th><th>Sold</th><th>On shelf</th></tr>${stockRows}</table>
<h2>Packed</h2>${orders.filter(o => o.status === "paid" && o.packed).slice(0, 30).map(orderCard).join("") || "<p>None yet.</p>"}`;
  return new Response(page, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const origin = req.headers.get("origin") || "";
    if (url.pathname === "/admin" || url.pathname.startsWith("/admin/")) {
      if (!authorized(req, env)) return new Response("Login required", { status: 401, headers: { "www-authenticate": 'Basic realm="BMT store"' } });
      return admin(req, env, url);
    }
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: allowedOrigin(origin) ? {
          "access-control-allow-origin": origin,
          "access-control-allow-methods": "GET, POST",
          "access-control-allow-headers": "content-type",
          "access-control-max-age": "86400",
          "vary": "origin",
        } : {},
      });
    }
    if (req.method === "GET" && url.pathname === "/stock") return json(await readStock(env.DB), 200, origin);
    if (req.method !== "POST" || url.pathname !== "/checkout") return json({ error: "Not found" }, 404, origin);
    if (!allowedOrigin(origin)) return json({ error: "Origin not allowed" }, 403, origin);
    return checkout(req, env, origin);
  },
  async scheduled(_event, env) {
    await reconcile(env);
  },
};
