// Revora Life Stripe Checkout Session API
// Server-side price catalog. Do not trust browser totals.

const PRODUCTS = {
  "sbs-imrs-prime": {
    "name": "iMRS Prime",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 599500,
    "image": "assets/images/products/sbs-imrs-prime.jpg"
  },
  "sbs-omnium1": {
    "name": "Omnium1",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 429500,
    "image": "assets/images/products/sbs-omnium1.jpg"
  },
  "sbs-omnium1-combo": {
    "name": "Omnium1 Combo Set",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 549500,
    "image": "assets/images/products/sbs-omnium1-combo.jpg"
  },
  "sbs-imrs-pad": {
    "name": "iMRS Localized Pad",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 129500,
    "image": "assets/images/products/sbs-imrs-pad.jpg"
  },
  "sbs-smart-pulser": {
    "name": "Smart Pulser",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 79500,
    "image": "assets/images/products/sbs-smart-pulser.jpg"
  },
  "ol-tera-p90": {
    "name": "Tera-P90",
    "brand": "Olylife",
    "unit_amount": 349500,
    "image": "assets/images/products/ol-tera-p90.jpg"
  },
  "ol-tera-p90-plus": {
    "name": "Tera-P90 Plus",
    "brand": "Olylife",
    "unit_amount": 429500,
    "image": "assets/images/products/ol-tera-p90-plus.jpg"
  },
  "ol-tera-pulse": {
    "name": "Tera-Pulse Localized",
    "brand": "Olylife",
    "unit_amount": 99500,
    "image": "assets/images/products/ol-tera-pulse.jpg"
  },
  "ol-tera-pro": {
    "name": "Tera-Pro Professional",
    "brand": "Olylife",
    "unit_amount": 599500,
    "image": "assets/images/products/ol-tera-pro.jpg"
  },
  "ql-qicoil-mini": {
    "name": "Qi Coil Mini",
    "brand": "QiLife",
    "unit_amount": 29900,
    "image": "assets/images/products/ql-qicoil-mini.jpg"
  },
  "ql-qicoil-3s": {
    "name": "Qi Coil 3S",
    "brand": "QiLife",
    "unit_amount": 79500,
    "image": "assets/images/products/ql-qicoil-3s.jpg"
  },
  "ql-qicoil-max": {
    "name": "Qi Coil Max",
    "brand": "QiLife",
    "unit_amount": 159500,
    "image": "assets/images/products/ql-qicoil-max.jpg"
  },
  "ql-resonant-wave": {
    "name": "Resonant Wave System",
    "brand": "QiLife",
    "unit_amount": 249500,
    "image": "assets/images/products/ql-resonant-wave.jpg"
  },
  "imrs-control-unit": {
    "name": "iMRS Prime Control Unit",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 205300,
    "image": "assets/images/accessories/80011.jpg"
  },
  "imrs-connector-box": {
    "name": "iMRS Prime Connector Box",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 156800,
    "image": "assets/images/accessories/80016.jpg"
  },
  "imrs-20pin-cable": {
    "name": "iMRS Prime 20-Pin Cable",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 3900,
    "image": "assets/images/accessories/80017.jpg"
  },
  "imrs-power-supply": {
    "name": "Power Supply iMRS Prime 24V",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 9000,
    "image": "assets/images/accessories/80020.jpg"
  },
  "exagon-mat": {
    "name": "Exagon Applicator MAT",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 112300,
    "image": "assets/images/accessories/80012.jpg"
  },
  "exagon-fir": {
    "name": "Exagon Applicator FIR",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 189400,
    "image": "assets/images/accessories/80013.jpg"
  },
  "exagon-pad": {
    "name": "Exagon Applicator PAD",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 51100,
    "image": "assets/images/accessories/80014.jpg"
  },
  "exagon-spot": {
    "name": "Exagon Applicator SPOT",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 66500,
    "image": "assets/images/accessories/80015.jpg"
  },
  "exagon-brain": {
    "name": "Exagon Brain",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 95100,
    "image": "assets/images/accessories/80027.jpg"
  },
  "exagon-sense": {
    "name": "Exagon Sense",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 98300,
    "image": "assets/images/accessories/80029.jpg"
  },
  "brain-hygiene-clothes": {
    "name": "Brain Hygiene Clothes (10 pcs)",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 900,
    "image": "assets/images/accessories/80028.jpg"
  },
  "organizer-bag": {
    "name": "iMRS Prime Organizer Bag",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 5400,
    "image": "assets/images/accessories/80021.jpg"
  },
  "travel-bag": {
    "name": "Exagon Applicator Travel Bag",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 5500,
    "image": "assets/images/accessories/80022.jpg"
  },
  "software-program-mode": {
    "name": "Software: Program Mode",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 9900,
    "image": "assets/images/accessories/80031.jpg"
  },
  "software-split-mode": {
    "name": "Software: Split Mode + iGuide",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 99300,
    "image": "assets/images/accessories/80033.jpg"
  },
  "software-hybrid-mode": {
    "name": "Software: Hybrid Mode",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 146400,
    "image": "assets/images/accessories/80034.jpg"
  },
  "software-trial-mode": {
    "name": "Software: Trial Mode",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 307100,
    "image": "assets/images/accessories/80035.jpg"
  },
  "warranty-12m": {
    "name": "Carefree Plus (12 Months)",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 48300,
    "image": "assets/images/accessories/80050.jpg"
  },
  "warranty-24m": {
    "name": "Carefree Plus (24 Months)",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 60100,
    "image": "assets/images/accessories/80051.jpg"
  },
  "ol-galaxy-g-one": {
    "name": "Galaxy G-One",
    "brand": "OlyLife",
    "unit_amount": 299500,
    "image": "assets/images/products/ol-galaxy-g-one.jpg"
  },
  "ol-shaken-massager": {
    "name": "Shaken 7-in-1 Smart Belt",
    "brand": "OlyLife",
    "unit_amount": 24900,
    "image": "assets/images/products/ol-shaken-massager.jpg"
  },
  "ol-a9-anion": {
    "name": "A9 Smart Anion BamaAir",
    "brand": "OlyLife",
    "unit_amount": 39900,
    "image": "assets/images/products/ol-a9-anion.jpg"
  },
  "ol-vitality-wand": {
    "name": "Vitality Wand",
    "brand": "OlyLife",
    "unit_amount": 59900,
    "image": "assets/images/products/ol-vitality-wand.jpg"
  },
  "ol-frost-gels": {
    "name": "Frost Gels",
    "brand": "OlyLife",
    "unit_amount": 50000,
    "image": "assets/images/products/ol-frost-gels.jpg"
  },
  "ol-skyline-sl6": {
    "name": "Skyline SL-6",
    "brand": "OlyLife",
    "unit_amount": 50000,
    "image": "assets/images/products/ol-skyline-sl6.jpg"
  },
  "imrs-prime-basic": {
    "name": "iMRS Prime Basic",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 538400,
    "image": "assets/images/products/sbs-imrs-prime.jpg"
  },
  "imrs-prime-advanced": {
    "name": "iMRS Prime Advanced",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 614800,
    "image": "assets/images/products/sbs-imrs-prime.jpg"
  },
  "imrs-prime-expert": {
    "name": "iMRS Prime Expert",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 714700,
    "image": "assets/images/products/sbs-imrs-prime.jpg"
  },
  "imrs-prime-hybrid": {
    "name": "iMRS Prime Hybrid",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 937600,
    "image": "assets/images/products/sbs-imrs-prime.jpg"
  },
  "imrs-prime-trial": {
    "name": "iMRS Prime Trial",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 1244700,
    "image": "assets/images/products/sbs-imrs-prime.jpg"
  },
  "smart-pulser-basic": {
    "name": "Smart Pulser Basic Set",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 276900,
    "image": "assets/images/products/sbs-smart-pulser.jpg"
  },
  "smart-pulser-complete": {
    "name": "Smart Pulser Complete Set",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 307900,
    "image": "assets/images/products/sbs-smart-pulser.jpg"
  },
  "smart-pulser-duo-sleep": {
    "name": "Smart Pulser Duo Sleep Set",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 401900,
    "image": "assets/images/products/sbs-smart-pulser.jpg"
  },
  "smart-pulser-sbed": {
    "name": "Smart Pulser S-Bed",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 129900,
    "image": "assets/images/products/sbs-smart-pulser.jpg"
  },
  "smart-pulser-swrap": {
    "name": "Smart Pulser S-Wrap",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 32900,
    "image": "assets/images/products/sbs-smart-pulser.jpg"
  },
  "smart-pulser-uno-sleep": {
    "name": "Smart Pulser Uno Sleep Set",
    "brand": "Swiss Bionic Solutions",
    "unit_amount": 284900,
    "image": "assets/images/products/sbs-smart-pulser.jpg"
  }
};

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function getOrigin(req) {
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${proto}://${host}`;
}

async function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1024 * 1024) req.destroy();
    });
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); }
      catch (err) { reject(err); }
    });
    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY || process.env.stripe_secret_key;
  if (!secretKey || !/^sk_(test|live)_/.test(secretKey)) {
    return sendJson(res, 500, { error: 'Stripe is not configured yet. Missing STRIPE_SECRET_KEY.' });
  }

  // Safety guard: run Stripe sandbox/test mode only unless live mode is explicitly unlocked later.
  if (secretKey.startsWith('sk_live_') && process.env.ALLOW_LIVE_STRIPE !== 'true') {
    return sendJson(res, 500, { error: 'Live Stripe key detected, but live payments are locked. Use sk_test_ for sandbox testing first.' });
  }

  let payload;
  try {
    payload = await readJson(req);
  } catch (_) {
    return sendJson(res, 400, { error: 'Invalid JSON request.' });
  }

  const items = Array.isArray(payload.items) ? payload.items : [];
  if (!items.length) return sendJson(res, 400, { error: 'Cart is empty.' });
  if (items.length > 50) return sendJson(res, 400, { error: 'Too many cart line items.' });

  const normalized = [];
  const metadataCart = [];
  let subtotal = 0;

  for (const item of items) {
    const id = String(item.id || '');
    const qty = Math.max(1, Math.min(99, parseInt(item.qty, 10) || 1));
    const product = PRODUCTS[id];
    if (!product) return sendJson(res, 400, { error: `Unknown product: ${id}` });
    normalized.push({ id, qty, product });
    metadataCart.push(`${id}x${qty}`);
    subtotal += product.unit_amount * qty;
  }

  const origin = getOrigin(req);
  const params = new URLSearchParams();
  params.append('mode', 'payment');
  params.append('success_url', `${origin}/checkout.html?success=1&session_id={CHECKOUT_SESSION_ID}`);
  params.append('cancel_url', `${origin}/checkout.html?canceled=1`);
  params.append('billing_address_collection', 'required');
  params.append('phone_number_collection[enabled]', 'true');
  ['US','CA','AU','GB','DE','FR','NZ','JP','SG'].forEach(country => {
    params.append('shipping_address_collection[allowed_countries][]', country);
  });
  params.append('metadata[cart]', metadataCart.join(','));
  params.append('metadata[source]', 'revora-life-preview');
  params.append('metadata[stripe_mode]', secretKey.startsWith('sk_test_') ? 'test' : 'live');

  normalized.forEach((entry, index) => {
    const label = `${entry.product.brand} — ${entry.product.name}`;
    params.append(`line_items[${index}][price_data][currency]`, 'usd');
    params.append(`line_items[${index}][price_data][unit_amount]`, String(entry.product.unit_amount));
    params.append(`line_items[${index}][price_data][product_data][name]`, label);
    params.append(`line_items[${index}][price_data][product_data][metadata][product_id]`, entry.id);
    params.append(`line_items[${index}][quantity]`, String(entry.qty));
  });

  const shippingAmount = subtotal >= 5000 ? 0 : 1500;
  params.append('shipping_options[0][shipping_rate_data][type]', 'fixed_amount');
  params.append('shipping_options[0][shipping_rate_data][fixed_amount][amount]', String(shippingAmount));
  params.append('shipping_options[0][shipping_rate_data][fixed_amount][currency]', 'usd');
  params.append('shipping_options[0][shipping_rate_data][display_name]', shippingAmount === 0 ? 'Free standard shipping' : 'Standard shipping');

  let stripeResponse;
  try {
    stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });
  } catch (_) {
    return sendJson(res, 502, { error: 'Could not reach Stripe. Please try again.' });
  }

  const data = await stripeResponse.json();
  if (!stripeResponse.ok) {
    return sendJson(res, stripeResponse.status, { error: data.error?.message || 'Stripe checkout failed.' });
  }

  return sendJson(res, 200, { url: data.url, id: data.id });
};
