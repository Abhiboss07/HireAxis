// POST /api/create-order
//
// Creates a Razorpay order for a package. The amount is looked up SERVER-SIDE
// from the shared catalogue by package id - the browser sends only an id, never
// a price - so a user editing the request in devtools cannot alter what they
// are charged.
//
// Request : { packageId: "growth", customer?: { name, email, phone } }
// Response: { orderId, amount, currency, keyId, package: { id, name, applications } }

import Razorpay from 'razorpay';
import { getPackage, CURRENCY } from '../src/data/packages.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const keyId = process.env.VITE_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    console.error('Razorpay keys missing: set VITE_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET');
    return res.status(500).json({ error: 'Payments are not configured yet. Please contact us directly.' });
  }

  // Vercel parses JSON bodies automatically, but be tolerant of a raw string.
  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const { packageId, customer = {} } = body;

  const pkg = getPackage(packageId);
  if (!pkg) {
    return res.status(400).json({ error: 'Unknown package' });
  }

  try {
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const order = await razorpay.orders.create({
      amount: pkg.amountMinor, // trusted: read from the server-side catalogue
      currency: CURRENCY,
      // receipt is capped at 40 chars by Razorpay.
      receipt: `hx_${pkg.id}_${Date.now()}`.slice(0, 40),
      notes: {
        packageId: pkg.id,
        packageName: pkg.name,
        applications: String(pkg.applications),
        customerName: String(customer.name || '').slice(0, 120),
        customerEmail: String(customer.email || '').slice(0, 120),
        customerPhone: String(customer.phone || '').slice(0, 40)
      }
    });

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId, // publishable; the client needs it to open Checkout
      package: { id: pkg.id, name: pkg.name, applications: pkg.applications }
    });
  } catch (error) {
    // Razorpay SDK errors carry a nested description that is safe to surface.
    const description = error?.error?.description || error?.message || 'Unknown error';
    console.error('Razorpay order creation failed:', description);
    return res.status(502).json({ error: `Could not start checkout: ${description}` });
  }
}

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}
