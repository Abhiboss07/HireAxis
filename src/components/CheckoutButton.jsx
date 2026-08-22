import React, { useState } from 'react';
import { startCheckout } from '../lib/razorpay';
import { formatPrice } from '../data/packages';

/**
 * Buys one package. Sends only the package id to the server - the price shown
 * here is for display, the charged amount comes from the server-side catalogue.
 *
 * @param {object}   pkg       Entry from src/data/packages.js
 * @param {function} onStatus  Reports { type: 'success'|'error', message, package }
 */
export default function CheckoutButton({ pkg, onStatus }) {
  const [isBusy, setIsBusy] = useState(false);

  const handleClick = () => {
    setIsBusy(true);
    startCheckout({
      packageId: pkg.id,
      onSuccess: (result) => {
        setIsBusy(false);
        onStatus({
          type: 'success',
          message: `Payment received for the ${pkg.name} package. Your receipt ID is ${result.paymentId}. We'll email your onboarding steps within one business day.`
        });
      },
      onFailure: (error) => {
        setIsBusy(false);
        onStatus({ type: 'error', message: error.message });
      },
      onDismiss: () => setIsBusy(false)
    });
  };

  return (
    <button
      type="button"
      className={`btn ${pkg.popular ? 'btn-dark' : 'btn-outline-dark'} pricing-buy-btn`}
      onClick={handleClick}
      disabled={isBusy}
    >
      {isBusy ? 'Opening checkout...' : `Buy ${pkg.name} · ${formatPrice(pkg.amountMinor)}`}
    </button>
  );
}
