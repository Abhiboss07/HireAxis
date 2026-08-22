// Razorpay Checkout, browser side.
//
// The browser never decides the price. It sends a package id to /api/create-order,
// gets back a signed order, opens Checkout, and hands the result to
// /api/verify-payment. Treat a payment as real only when that endpoint says so.
//
// NOTE: `npm run dev` (plain Vite) does not serve /api. Run `vercel dev` to
// exercise checkout locally, otherwise order creation returns the HTML of
// index.html and you'll get the "not available" error below.

const CHECKOUT_SRC = 'https://checkout.razorpay.com/v1/checkout.js';

let scriptPromise = null;

function loadCheckoutScript() {
  if (window.Razorpay) return Promise.resolve(true);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = CHECKOUT_SRC;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      scriptPromise = null; // allow a retry on the next attempt
      reject(new Error('Could not load Razorpay Checkout. Check your connection and try again.'));
    };
    document.body.appendChild(script);
  });

  return scriptPromise;
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error(
      'Checkout is not available on this environment. The /api routes only run on Vercel (or via `vercel dev`).'
    );
  }

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
}

/**
 * Runs the full purchase flow for one package.
 *
 * @param {object}   options
 * @param {string}   options.packageId  Must match an id in src/data/packages.js
 * @param {object}   [options.customer] { name, email, phone } - prefills Checkout
 * @param {function} [options.onSuccess] Called with the verified payment payload
 * @param {function} [options.onFailure] Called with an Error
 * @param {function} [options.onDismiss] Called when the user closes Checkout
 */
export async function startCheckout({ packageId, customer = {}, onSuccess, onFailure, onDismiss }) {
  try {
    const order = await postJson('/api/create-order', { packageId, customer });
    await loadCheckoutScript();

    const checkout = new window.Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,
      name: 'HireAxis',
      description: `${order.package.name} - ${order.package.applications} tailored applications`,
      image: '/images/logo.png',
      prefill: {
        name: customer.name || '',
        email: customer.email || '',
        contact: customer.phone || ''
      },
      notes: { packageId: order.package.id },
      theme: { color: '#0D5C4F' },
      modal: {
        ondismiss: () => onDismiss && onDismiss()
      },
      handler: async (response) => {
        try {
          const verified = await postJson('/api/verify-payment', response);
          if (verified.verified) {
            onSuccess && onSuccess({ ...verified, package: order.package });
          } else {
            throw new Error(verified.error || 'Payment could not be verified');
          }
        } catch (error) {
          onFailure && onFailure(error);
        }
      }
    });

    // Surfaces card declines and similar gateway-side refusals.
    checkout.on('payment.failed', (event) => {
      const description = event?.error?.description || 'Payment failed. No money was taken.';
      onFailure && onFailure(new Error(description));
    });

    checkout.open();
  } catch (error) {
    onFailure && onFailure(error);
  }
}
