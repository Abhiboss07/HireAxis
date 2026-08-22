import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ApplicationForm from './ApplicationForm';

// The popup opens on the home page, every time it is opened.
const AUTO_OPEN_PATHS = ['/'];
// Just enough delay for the hero to paint first, so it does not flash over a blank page.
const AUTO_OPEN_DELAY_MS = 700;
// Once someone has actually submitted, stop showing it for the rest of the visit.
const SUBMITTED_KEY = 'hireaxis:lead-submitted';

const ApplicationModalContext = createContext({ open: () => {}, close: () => {} });

/** Lets any component trigger the form: const { open } = useApplicationModal() */
export function useApplicationModal() {
  return useContext(ApplicationModalContext);
}

// sessionStorage, not localStorage: a converted visitor is left alone for the
// rest of this browsing session, but a fresh visit shows the form again.
function hasAlreadySubmitted() {
  try {
    return window.sessionStorage.getItem(SUBMITTED_KEY) === '1';
  } catch {
    return false; // private mode / storage blocked - just show it
  }
}

function rememberSubmission() {
  try {
    window.sessionStorage.setItem(SUBMITTED_KEY, '1');
  } catch {
    /* storage unavailable - worst case the form shows once more */
  }
}

export function ApplicationModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const dialogRef = useRef(null);
  const lastFocusedRef = useRef(null);

  const open = useCallback(() => {
    lastFocusedRef.current = document.activeElement;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // Opens every time the home page is shown - including navigating back to it -
  // because the effect re-runs on each pathname change.
  useEffect(() => {
    if (!AUTO_OPEN_PATHS.includes(pathname)) return undefined;
    if (hasAlreadySubmitted()) return undefined;

    const timer = setTimeout(open, AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, [pathname, open]);

  // Lock background scroll, trap focus, and close on Escape while open.
  useEffect(() => {
    if (!isOpen) return undefined;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const focusables = () =>
      Array.from(
        dialogRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'
        ) || []
      ).filter((element) => element.offsetParent !== null);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        close();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const focusTimer = setTimeout(() => focusables()[0]?.focus(), 60);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimer);
      document.body.style.overflow = overflow;
      // Return focus to whatever opened the dialog.
      if (lastFocusedRef.current instanceof HTMLElement) lastFocusedRef.current.focus();
    };
  }, [isOpen, close]);

  return (
    <ApplicationModalContext.Provider value={{ open, close }}>
      {children}
      {isOpen && (
        <div
          className="app-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            className="app-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="app-modal-title"
            ref={dialogRef}
          >
            <button type="button" className="app-modal-close" onClick={close} aria-label="Close form">
              ✕
            </button>

            <div className="app-modal-header">
              <span className="app-modal-eyebrow">Start This Week</span>
              <h2 className="app-modal-title" id="app-modal-title">
                Let Us Apply on Your Behalf
              </h2>
              <p className="app-modal-subtitle">
                Share your details and we'll come back within one business day with your country's
                pricing and next steps.
              </p>
            </div>

            <div className="app-modal-body">
              <ApplicationForm compact idPrefix="popup" onSuccess={rememberSubmission} />
            </div>
          </div>
        </div>
      )}
    </ApplicationModalContext.Provider>
  );
}
