"use client";

/**
 * MetaPixel.tsx
 *
 * Injects the Meta Pixel base code only when the user has explicitly accepted cookies.
 * Reads the same localStorage key written by CookieConsent.tsx — never writes it.
 *
 * Behaviour:
 *   • "accepted"  → inject fbq init + PageView <Script> tag immediately
 *   • "declined"  → render nothing, window.fbq stays undefined
 *   • unset       → render nothing (banner is still showing)
 *
 * Mid-session loading (no page reload required):
 *   • Same tab   → CookieConsent dispatches window event 'cookie-consent-updated'
 *                  after writing localStorage — we listen and flip `ready` in the
 *                  same React render tick.
 *   • Other tabs → native `storage` event carries the new value cross-tab.
 *
 * Scope note:
 *   Only the standard PageView event is tracked here. Additional event tracking
 *   (e.g. ViewContent, Purchase) is out of scope for this component and must be
 *   added at the call-site level once the Pixel is confirmed loaded.
 *
 * This component does NOT manage the consent key — that belongs to CookieConsent.tsx.
 */

import Script from "next/script";
import { useEffect, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "vextiv_cookie_consent" as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readConsent(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  // `ready` flips to true only when consent === "accepted".
  // Once true it never flips back — removing scripts mid-session is not meaningful
  // because fbq state is already in memory; a full reload is needed to clear it.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 1. Check consent on mount
    if (readConsent() === "accepted") {
      setReady(true);
      return; // Already accepted — no listeners needed
    }

    // 2a. Same-tab: CookieConsent.tsx dispatches this custom event immediately
    //     after writing localStorage. The native `storage` event is cross-tab only
    //     and would NOT fire in the tab that called setItem.
    const handleConsentUpdated = () => {
      if (readConsent() === "accepted") {
        setReady(true);
      }
    };

    // 2b. Cross-tab: native storage event carries the new value when another
    //     browser tab writes the same key.
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue === "accepted") {
        setReady(true);
      }
    };

    window.addEventListener("cookie-consent-updated", handleConsentUpdated);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("cookie-consent-updated", handleConsentUpdated);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Guard: no Pixel ID configured, or consent not yet given
  if (!pixelId || !ready) return null;

  return (
    <>
      {/*
       * Strategy "afterInteractive": script runs after the page is interactive,
       * which is the correct timing for analytics (not blocking render).
       * Do NOT use "beforeInteractive" — that would break consent gating.
       */}
      <Script
        id="meta-pixel-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      {/*
       * <noscript> fallback pixel — rendered as a 1×1 image for browsers
       * with JavaScript disabled. Placed inside a Script tag so Next.js
       * can manage it alongside the JS counterpart.
       */}
      <Script
        id="meta-pixel-noscript"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            document.write('<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"/></noscript>');
          `,
        }}
      />
    </>
  );
}
