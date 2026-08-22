# Razorpay Payment Setup for HireAxis

Checkout is split between the browser and two serverless functions so that the
price is decided on the server and every payment is cryptographically verified.

---

## How It Works

```
Browser                          Vercel Function                 Razorpay
   |                                   |                             |
   |-- POST /api/create-order -------->|                             |
   |     { packageId: "growth" }       |-- looks up price in --------|
   |                                   |   src/data/packages.js      |
   |                                   |-- orders.create() --------->|
   |<-- { orderId, amount, keyId } ----|                             |
   |                                                                 |
   |-- opens Razorpay Checkout ------------------------------------->|
   |<-- { order_id, payment_id, signature } -------------------------|
   |                                   |                             |
   |-- POST /api/verify-payment ------>|                             |
   |                                   |-- HMAC-SHA256 recompute     |
   |<-- { verified: true } ------------|                             |
```

**The browser never sends a price.** It sends a package id; `create-order` reads
the real amount from `src/data/packages.js`. Editing the request in devtools
cannot change what is charged.

**A payment counts only when `/api/verify-payment` says so.** Razorpay's browser
callback can be forged, so the signature is recomputed server-side with the
secret key before anything is treated as paid.

---

## Step 1: Get Your Keys

1. Open the [Razorpay Dashboard](https://dashboard.razorpay.com/).
2. Go to **Account & Settings → API Keys → Generate Test Key**.
3. Copy both values. The secret is shown **once** — save it now.
   - **Key ID** → `rzp_test_xxxxxxxxxx` (publishable, safe in the browser)
   - **Key Secret** → server only, never commit it

---

## Step 2: Set the Environment Variables

Local development — create `.env` in the project root (already gitignored):

```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_key_secret_here
```

Production — **Vercel → Project Settings → Environment Variables**, add both.

> The `VITE_` prefix on the Key ID is what tells Vite to inline it into the
> client bundle. The secret has **no** prefix precisely so that Vite can never
> expose it. Do not rename it.

---

## Step 3: Set Your Prices

All amounts live in one file: [`src/data/packages.js`](src/data/packages.js).
The pricing table, the chatbot's pricing answers, and the server-side charge all
read from it, so they can never drift apart.

```js
{ id: 'growth', name: 'Growth', applications: 100, amountMinor: 24900, ... }
```

`amountMinor` is in the **smallest currency unit** — `24900` means **$249.00**.
Keep these as integers.

---

## Step 4: Enable International Payments (USD only)

Pricing is currently set to **USD**. Razorpay accounts are INR-only by default
and will reject a USD order with `BAD_REQUEST_ERROR` until you enable
international payments:

**Dashboard → Settings → Configuration → International Payments** (needs
business verification and Razorpay's approval).

To switch to INR instead, change `CURRENCY` and `CURRENCY_SYMBOL` in
`src/data/packages.js` and restate `amountMinor` in paise (`₹4,999` → `499900`).

---

## Step 5: Test Locally

Plain `npm run dev` serves the React app but **not** `/api` — checkout will
report that it is unavailable. Use the Vercel CLI to run both together:

```bash
npm i -g vercel
vercel dev
```

Then go to `/pricing` and click a Buy button. Use Razorpay's test card:

| Field | Value |
|---|---|
| Card | `4111 1111 1111 1111` |
| CVV | any 3 digits |
| Expiry | any future date |
| OTP | `1234` |

A success banner with a payment ID means the whole chain worked. Confirm the
payment appears under **Dashboard → Transactions**.

---

## Step 6: Go Live

1. Complete Razorpay KYC and activate the account.
2. Generate **Live** keys and swap both env vars in Vercel (`rzp_live_...`).
3. Redeploy, then make one small real payment and refund it to confirm.

---

## Not Included

These are deliberate gaps, not oversights — decide how you want them handled:

- **No order record is stored.** A verified payment is shown to the user but not
  written anywhere. Razorpay's dashboard is currently your only ledger. To log
  purchases into the Google Sheet, call the Apps Script from `verify-payment`.
- **No webhook.** If a user closes the tab mid-payment, the browser never calls
  `verify-payment` and you will not learn about it. A Razorpay webhook pointed at
  a third function is the standard fix for reconciling those.
- **No receipt email.** Razorpay sends its own payment receipt; HireAxis sends
  nothing.
- **Checkout does not collect the candidate's details.** Payment and the
  application form are separate steps today.
