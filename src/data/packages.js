// ---------------------------------------------------------------------------
// HireAxis package catalogue - THE single source of truth for pricing.
//
// This file is imported by BOTH the browser (pricing table, checkout button)
// and the serverless functions in /api. The server looks the price up here by
// package id and ignores any amount the browser sends, so a tampered client
// cannot change what it is charged. Never accept an amount from the client.
//
// >>> EDIT THE PRICES BELOW. The values are placeholders. <<<
// Amounts are in the currency's SMALLEST unit, which is what Razorpay expects:
// USD 149.00 -> 14900 cents. Keep them as integers to avoid float rounding.
// ---------------------------------------------------------------------------

export const CURRENCY = 'USD';

// Razorpay only accepts non-INR currencies once International Payments is
// enabled on the account (Dashboard > Settings > Configuration). Until then a
// live USD order is rejected with BAD_REQUEST_ERROR.
export const CURRENCY_SYMBOL = '$';

export const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    applications: 50,
    amountMinor: 14900,
    bestFor: 'Testing the market or a focused niche search',
    popular: false
  },
  {
    id: 'growth',
    name: 'Growth',
    applications: 100,
    amountMinor: 24900,
    bestFor: 'Most active job seekers',
    popular: true
  },
  {
    id: 'pro',
    name: 'Pro',
    applications: 200,
    amountMinor: 42900,
    bestFor: 'Career switchers & competitive markets',
    popular: false
  }
];

// Shared by every tier - rendered once in the pricing table's "Includes" row.
export const INCLUDED_IN_EVERY_PACKAGE = [
  'ATS resume optimization',
  'weekly submissions',
  'live tracker',
  'same-day interview alerts',
  'market & role strategy',
  'interview prep support'
];

export function getPackage(id) {
  return PACKAGES.find((pkg) => pkg.id === id) || null;
}

/** 14900 -> "$149" ; 14950 -> "$149.50" */
export function formatPrice(amountMinor, currencySymbol = CURRENCY_SYMBOL) {
  const major = amountMinor / 100;
  const text = Number.isInteger(major) ? String(major) : major.toFixed(2);
  return `${currencySymbol}${text}`;
}

/** Per-application unit price, used in the "what does it cost" copy. */
export function formatUnitPrice(pkg) {
  return formatPrice(Math.round(pkg.amountMinor / pkg.applications));
}
