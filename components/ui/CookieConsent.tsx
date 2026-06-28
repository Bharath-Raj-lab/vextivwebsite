"use client";

import { useEffect, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const STORAGE_KEY = "vextiv_cookie_consent" as const;

type ConsentValue = "accepted" | "declined";

// ─── Component ────────────────────────────────────────────────────────────────
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  // Mount: read localStorage and only show if consent has NOT been set
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (SSR guard, private browsing restriction, etc.)
      // Silently skip — banner stays hidden to avoid blocking the UI
    }
  }, []);

  const writeConsent = (value: ConsentValue) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
      // Notify same-tab listeners (e.g. GoogleAnalytics.tsx) immediately.
      // The native `storage` event only fires in *other* tabs, so we dispatch
      // a custom event here to close the same-tab gap without prop-drilling.
      window.dispatchEvent(new Event("cookie-consent-updated"));
    } catch {
      // Ignore write errors; consent state is in memory only this session
    }
    setVisible(false);
  };

  const handleAccept = () => writeConsent("accepted");
  // On decline: flag is stored as "declined" — GoogleAnalytics.tsx reads this
  // key and skips initialisation. This component does NOT import or call gtag.
  const handleDecline = () => writeConsent("declined");

  if (!visible) return null;

  return (
    <>
      {/* ─── Banner ──────────────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="false"
        aria-label="Cookie consent"
        aria-describedby="cookie-consent-desc"
        aria-live="polite"
        className="cookie-consent"
        id="cookie-consent-banner"
      >
        {/* Left: icon + copy */}
        <div className="cookie-consent__body">
          <span className="cookie-consent__icon" aria-hidden="true">🍪</span>

          <div className="cookie-consent__text">
            <p className="cookie-consent__title">
              We use cookies
            </p>
            <p id="cookie-consent-desc" className="cookie-consent__description">
              We use analytics cookies to understand how you use our site and
              improve your experience. Under the{" "}
              <strong>Digital Personal Data Protection Act 2023</strong>, you can
              choose to decline non-essential cookies at any time.{" "}
              <a
                href="/privacy"
                className="cookie-consent__link"
                aria-label="Read our full Privacy Policy"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Right: actions */}
        <div className="cookie-consent__actions" role="group" aria-label="Cookie consent choices">
          <button
            id="cookie-consent-decline"
            type="button"
            className="cookie-consent__btn cookie-consent__btn--ghost"
            onClick={handleDecline}
          >
            Decline
          </button>
          <button
            id="cookie-consent-accept"
            type="button"
            className="cookie-consent__btn cookie-consent__btn--accent"
            onClick={handleAccept}
            autoFocus
          >
            Accept
          </button>
        </div>
      </div>

      {/* ─── Styles ──────────────────────────────────────────────────────── */}
      <style>{`
        /* ── Wrapper ────────────────────────────────────────────────────── */
        .cookie-consent {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;

          /*
           * Z-index layering (Vextiv):
           *   ExitIntent       =  50
           *   Cookie banner    =  45   ← below modal popups
           *   Navbar           =  40
           *   WhatsApp btn     =  30
           */
          z-index: 45;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;

          padding: 18px clamp(20px, 5vw, 48px);

          background: var(--bg-surface-3);
          border-top: 1px solid var(--border-medium);
          box-shadow:
            0 -4px 32px -8px rgba(0, 0, 0, 0.45),
            0 -1px 0 0 var(--border-subtle);

          /* Slide-up entrance */
          animation: cookie-consent-slide-up 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes cookie-consent-slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* ── Body: icon + text ─────────────────────────────────────────── */
        .cookie-consent__body {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          flex: 1;
          min-width: 0;
        }

        .cookie-consent__icon {
          font-size: 22px;
          line-height: 1;
          flex-shrink: 0;
          margin-top: 1px;
          filter: grayscale(0.1);
        }

        .cookie-consent__text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cookie-consent__title {
          font-family: var(--font-display);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-primary);
          line-height: var(--leading-tight);
          letter-spacing: var(--tracking-heading);
        }

        .cookie-consent__description {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          color: var(--text-secondary);
          line-height: 1.55;
          max-width: 640px;
        }

        .cookie-consent__description strong {
          color: var(--text-primary);
          font-weight: 500;
        }

        .cookie-consent__link {
          color: var(--text-accent);
          text-decoration: underline;
          text-underline-offset: 2px;
          text-decoration-color: var(--accent-fill-35);
          transition: text-decoration-color 150ms, opacity 150ms;
        }
        .cookie-consent__link:hover {
          opacity: 0.85;
          text-decoration-color: var(--accent);
        }
        .cookie-consent__link:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
          border-radius: 2px;
        }

        /* ── Actions ───────────────────────────────────────────────────── */
        .cookie-consent__actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        /* Base button */
        .cookie-consent__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          padding: 0 22px;
          border-radius: 9999px;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          letter-spacing: 0.01em;
          white-space: nowrap;
          cursor: pointer;
          transition: transform 160ms ease, filter 160ms ease, opacity 160ms ease, background-color 160ms ease, border-color 160ms ease;
          border: 1px solid transparent;
          text-decoration: none;
        }
        .cookie-consent__btn:active {
          transform: scale(0.97);
        }
        .cookie-consent__btn:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 3px;
        }

        /* Accent variant (Accept) */
        .cookie-consent__btn--accent {
          background: var(--gradient-btn);
          color: var(--bg-base);
          box-shadow: 0 2px 12px -4px var(--accent-fill-35);
        }
        .cookie-consent__btn--accent:hover {
          filter: brightness(1.08);
          transform: scale(1.02);
        }

        /* Ghost variant (Decline) */
        .cookie-consent__btn--ghost {
          background: transparent;
          color: var(--text-secondary);
          border-color: var(--border-medium);
        }
        .cookie-consent__btn--ghost:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
          background: var(--accent-fill-08);
        }

        /* ── Responsive ────────────────────────────────────────────────── */

        /* On mobile, stack body above actions and go full-width */
        @media (max-width: 600px) {
          .cookie-consent {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding: 16px 20px;
            /* Extra bottom padding to clear iOS home bar */
            padding-bottom: max(16px, env(safe-area-inset-bottom, 16px));
          }

          .cookie-consent__actions {
            width: 100%;
            /* Reverse order: primary action on the right */
            flex-direction: row-reverse;
            justify-content: flex-start;
          }

          .cookie-consent__btn {
            flex: 1;
            max-width: 160px;
            height: 44px; /* Larger touch target on mobile */
          }
        }

        /* Respect reduced-motion preference */
        @media (prefers-reduced-motion: reduce) {
          .cookie-consent {
            animation: none;
          }
          .cookie-consent__btn {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
