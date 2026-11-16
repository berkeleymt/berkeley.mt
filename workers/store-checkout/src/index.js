// Creates Stripe Checkout Sessions for the berkeley.mt store.
// Prices live here so the browser can't change them. Secret: STRIPE_API_KEY.

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
const SHIPPING = 500;
const MAX_QTY = 20;

const allowedOrigin = o =>
  o === "https://berkeley.mt" ||
  /^https:\/\/([a-z0-9-]+\.)?berkeley-mt\.pages\.dev$/.test(o) ||
  /^http:\/\/localhost(:\d+)?$/.test(o);

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      ...(allowedOrigin(origin) && { "access-control-allow-origin": origin, "vary": "origin" }),
    },
  });
}

export default {
  async fetch(req, env) {
    const origin = req.headers.get("origin") || "";
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: allowedOrigin(origin) ? {
          "access-control-allow-origin": origin,
          "access-control-allow-methods": "POST",
          "access-control-allow-headers": "content-type",
          "access-control-max-age": "86400",
          "vary": "origin",
        } : {},
      });
    }
    if (req.method !== "POST" || new URL(req.url).pathname !== "/checkout") return json({ error: "Not found" }, 404, origin);
    if (!allowedOrigin(origin)) return json({ error: "Origin not allowed" }, 403, origin);

    let body;
    try { body = await req.json(); } catch { return json({ error: "Bad JSON" }, 400, origin); }
    const items = Array.isArray(body.items) ? body.items : [];
    const delivery = body.delivery === "pickup" ? "pickup" : "ship";
    if (!items.length || items.length > 50) return json({ error: "Cart is empty" }, 400, origin);

    const f = new URLSearchParams({
      "mode": "payment",
      "success_url": `${origin}/store/?paid=1`,
      "cancel_url": `${origin}/store/`,
      "metadata[delivery]": delivery,
    });
    const summary = [];
    for (const [i, it] of items.entries()) {
      const p = CATALOG[it.id];
      const qty = Number(it.qty);
      if (!p || !p.sizes.includes(it.size) || !Number.isInteger(qty) || qty < 1 || qty > MAX_QTY)
        return json({ error: "Invalid item" }, 400, origin);
      const name = p.sizes.length > 1 ? `${p.name} (${it.size})` : p.name;
      f.set(`line_items[${i}][price_data][currency]`, "usd");
      f.set(`line_items[${i}][price_data][unit_amount]`, p.price);
      f.set(`line_items[${i}][price_data][product_data][name]`, name);
      f.set(`line_items[${i}][quantity]`, qty);
      summary.push(`${qty}x ${it.id}${p.sizes.length > 1 ? " " + it.size : ""}`);
    }
    f.set("metadata[items]", summary.join(", ").slice(0, 500));

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

    const r = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: { authorization: `Bearer ${env.STRIPE_API_KEY}`, "content-type": "application/x-www-form-urlencoded" },
      body: f,
    });
    const s = await r.json();
    if (!r.ok) {
      console.log("stripe error", s.error?.message);
      return json({ error: "Couldn't start checkout" }, 502, origin);
    }
    return json({ url: s.url }, 200, origin);
  },
};
