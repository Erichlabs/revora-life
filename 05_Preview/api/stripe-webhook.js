// Revora Life Stripe Webhook
// Verifies Stripe signatures and records paid Checkout orders server-side.

const crypto = require('crypto');

const MAX_BODY_SIZE = 1024 * 1024; // 1 MB
const SIGNATURE_TOLERANCE_SECONDS = 300;

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', chunk => {
      size += chunk.length;
      if (size > MAX_BODY_SIZE) {
        reject(new Error('Request body too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function parseStripeSignature(header) {
  const parts = String(header || '').split(',');
  const parsed = { signatures: [] };
  for (const part of parts) {
    const [key, value] = part.split('=');
    if (key === 't') parsed.timestamp = value;
    if (key === 'v1') parsed.signatures.push(value);
  }
  return parsed;
}

function safeEqualHex(a, b) {
  const aBuffer = Buffer.from(a, 'hex');
  const bBuffer = Buffer.from(b, 'hex');
  return aBuffer.length === bBuffer.length && crypto.timingSafeEqual(aBuffer, bBuffer);
}

function verifyStripeSignature(rawBody, signatureHeader, webhookSecret) {
  if (!webhookSecret || !webhookSecret.startsWith('whsec_')) {
    throw new Error('Missing or invalid STRIPE_WEBHOOK_SECRET');
  }

  const parsed = parseStripeSignature(signatureHeader);
  if (!parsed.timestamp || !parsed.signatures.length) {
    throw new Error('Missing Stripe timestamp or signature');
  }

  const timestamp = Number(parsed.timestamp);
  if (!Number.isFinite(timestamp)) {
    throw new Error('Invalid Stripe timestamp');
  }

  const age = Math.abs(Math.floor(Date.now() / 1000) - timestamp);
  if (age > SIGNATURE_TOLERANCE_SECONDS) {
    throw new Error('Stripe signature timestamp outside tolerance');
  }

  const signedPayload = Buffer.concat([
    Buffer.from(String(parsed.timestamp)),
    Buffer.from('.'),
    rawBody
  ]);
  const expected = crypto.createHmac('sha256', webhookSecret).update(signedPayload).digest('hex');
  const valid = parsed.signatures.some(signature => safeEqualHex(signature, expected));
  if (!valid) throw new Error('Stripe signature verification failed');
}

async function stripeRequest(path, secretKey) {
  const response = await fetch(`https://api.stripe.com${path}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${secretKey}` }
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || `Stripe API request failed: ${response.status}`);
  }
  return data;
}

async function notifyOrder(summary) {
  const webhookUrl = process.env.ORDER_NOTIFICATION_WEBHOOK_URL;
  if (!webhookUrl) return { sent: false, reason: 'ORDER_NOTIFICATION_WEBHOOK_URL not configured' };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(summary)
  });

  if (!response.ok) {
    throw new Error(`Order notification failed: ${response.status}`);
  }
  return { sent: true };
}

function money(amount, currency) {
  if (typeof amount !== 'number') return null;
  return `${(amount / 100).toFixed(2)} ${String(currency || '').toUpperCase()}`;
}

async function handleCheckoutCompleted(session) {
  const secretKey = process.env.STRIPE_SECRET_KEY || process.env.stripe_secret_key;
  let lineItems = [];

  if (secretKey && session.id) {
    try {
      const data = await stripeRequest(`/v1/checkout/sessions/${encodeURIComponent(session.id)}/line_items?limit=100`, secretKey);
      lineItems = (data.data || []).map(item => ({
        description: item.description,
        quantity: item.quantity,
        amount_subtotal: item.amount_subtotal,
        amount_total: item.amount_total,
        currency: item.currency,
        amount_total_display: money(item.amount_total, item.currency)
      }));
    } catch (error) {
      console.error('REVORA_ORDER_LINE_ITEMS_FETCH_FAILED', { session_id: session.id, error: error.message });
    }
  }

  const summary = {
    type: 'revora_life_order_paid',
    stripe_session_id: session.id,
    payment_status: session.payment_status,
    amount_subtotal: session.amount_subtotal,
    amount_total: session.amount_total,
    currency: session.currency,
    amount_total_display: money(session.amount_total, session.currency),
    customer_email: session.customer_details?.email || session.customer_email || null,
    customer_name: session.customer_details?.name || null,
    customer_phone: session.customer_details?.phone || null,
    shipping: session.shipping_details || null,
    metadata: session.metadata || {},
    line_items: lineItems,
    created_at: new Date().toISOString()
  };

  // This appears in Vercel Function Logs and is safe: no card details, no secret keys.
  console.log('REVORA_ORDER_PAID', JSON.stringify(summary));

  try {
    const notification = await notifyOrder(summary);
    console.log('REVORA_ORDER_NOTIFICATION', JSON.stringify(notification));
  } catch (error) {
    // Return success to Stripe only after logging the order. Notification can be retried externally.
    console.error('REVORA_ORDER_NOTIFICATION_FAILED', { session_id: session.id, error: error.message });
  }

  return summary;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let rawBody;

  try {
    rawBody = await readRawBody(req);
    verifyStripeSignature(rawBody, req.headers['stripe-signature'], webhookSecret);
  } catch (error) {
    console.error('REVORA_STRIPE_WEBHOOK_SIGNATURE_ERROR', error.message);
    return sendJson(res, 400, { error: 'Webhook signature verification failed' });
  }

  let event;
  try {
    event = JSON.parse(rawBody.toString('utf8'));
  } catch (error) {
    return sendJson(res, 400, { error: 'Invalid webhook JSON' });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      await handleCheckoutCompleted(event.data.object);
    } else if (event.type === 'checkout.session.async_payment_succeeded') {
      await handleCheckoutCompleted(event.data.object);
    } else if (event.type === 'checkout.session.async_payment_failed') {
      console.warn('REVORA_ORDER_ASYNC_PAYMENT_FAILED', JSON.stringify({
        stripe_session_id: event.data.object?.id,
        payment_status: event.data.object?.payment_status,
        amount_total: event.data.object?.amount_total,
        currency: event.data.object?.currency
      }));
    } else {
      console.log('REVORA_STRIPE_WEBHOOK_IGNORED', JSON.stringify({ id: event.id, type: event.type }));
    }
  } catch (error) {
    console.error('REVORA_STRIPE_WEBHOOK_HANDLER_ERROR', { event_id: event.id, type: event.type, error: error.message });
    return sendJson(res, 500, { error: 'Webhook handler failed' });
  }

  return sendJson(res, 200, { received: true });
};

// Exported for local tests only.
module.exports._test = { verifyStripeSignature, parseStripeSignature };
