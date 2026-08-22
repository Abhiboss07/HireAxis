// POST /api/verify-payment
//
// Confirms a completed Razorpay payment. Razorpay's browser callback can be
// forged, so nothing is trusted until the HMAC signature is recomputed here
// with the secret key. Only this endpoint's verdict should ever mark an order
// as paid.
//
// Request : { razorpay_order_id, razorpay_payment_id, razorpay_signature }
// Response: { verified: true, paymentId, amount, currency, status }

import crypto from 'node:crypto';
import Razorpay from 'razorpay';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const keyId = process.env.VITE_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    console.error('RAZORPAY_KEY_SECRET missing - cannot verify payments');
    return res.status(500).json({ error: 'Payment verification is not configured.' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ verified: false, error: 'Missing payment fields' });
  }

  // Razorpay signs "<order_id>|<payment_id>" with the key secret.
  const expected = crypto
    .createHmac('sha256', keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (!timingSafeEqualHex(expected, razorpay_signature)) {
    console.warn('Signature mismatch for order', razorpay_order_id);
    return res.status(400).json({ verified: false, error: 'Payment signature verification failed' });
  }

  // Signature is valid. Fetch the payment so the response reflects Razorpay's
  // own record of the amount and status rather than anything the client said.
  try {
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    return res.status(200).json({
      verified: true,
      paymentId: payment.id,
      orderId: razorpay_order_id,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status // "captured" once the money has actually moved
    });
  } catch (error) {
    // The signature already proved authenticity; a lookup failure is not fatal.
    console.error('Payment lookup failed after valid signature:', error?.message);
    return res.status(200).json({
      verified: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: 'unknown'
    });
  }
}

function timingSafeEqualHex(a, b) {
  const bufA = Buffer.from(String(a), 'utf8');
  const bufB = Buffer.from(String(b), 'utf8');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}
