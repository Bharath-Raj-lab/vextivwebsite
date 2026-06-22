"use client";

/**
 * GtagLoader.tsx
 *
 * Single-instance Google Tag (gtag.js) loader for all Google products.
 * Replaces the separate GoogleAnalytics.tsx and GoogleAdsTag.tsx components.
 *
 * ─── Why a single loader? ────────────────────────────────────────────────────
 *
 * Google explicitly states that only ONE gtag.js script should be loaded per
 * page, regardless of how many Google products are in use:
 *   https://developers.google.com/tag-platform/gtagjs/install
 *
 * Loading two separate gtag.js files (each with a different ?id= param) causes:
 *   1. Two separate network fetches (~28 KB each).
 *   2. A second `gtag('js', new Date())` call — the internal "library install"
 *      signal — which causes the second gtag.js instance to re-process already-
 *      processed dataLayer entries, producing duplicate pageview hits in GA4.
 *
 * The canonical multi-destination pattern is:
 *   • One <script src="gtag.js?id=PRIMARY_ID"> loader.
 *   • One inline init block with `gtag('js', ...)` called EXACTLY ONCE, followed
 *     by one `gtag('config', ...)` call per destination ID.
 *
 * ─── Behaviour ───────────────────────────────────────────────────────────────
 *
 *   • "accepted"     → inject one gtag.js loader + one init block
 *   • "declined"     → render nothing
 *   • unset          → render nothing (consent banner is still visible)
 *   • both IDs absent → render null (component is a no-op; no env vars set)
 *
 * ─── Loader URL ──────────────────────────────────────────────────────────────
 *
 * gtag.js is loaded with NEXT_PUBLIC_GA_ID as the ?id= parameter when present,
 * falling back to NEXT_PUBLIC_GOOGLE_ADS_ID. Per Google's documentation, any
 * valid Google tag ID works as the bootstrap URL — they are interchangeable as
 * the loader parameter. The ?id= does not restrict which destinations receive
 * events; that is controlled exclusively by `gtag('config', ...)` calls.
 *
 * ─── Mid-session loading (no page reload required) ───────────────────────────
 *
 *   • Same tab   → CookieConsent dispatches 'cookie-consent-updated' immediately
 *                  after writing localStorage; we flip `ready` in the same tick.
 *   • Other tabs → native `storage` event carries the new value cross-tab.
 *
 * This component does NOT manage the consent key — that belongs to CookieConsent.tsx.
 * MetaPixel.tsx remains a separate component because Facebook's pixel library
 * (fbevents.js) is entirely independent from the Google Tag infrastructure.
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

export default function GtagLoader() {
  const gaId  = process.env.NEXT_PUBLIC_GA_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  // `ready` flips to true only when consent === "accepted".
  // Once true it never flips back — removing scripts mid-session is not
  // meaningful because gtag state is already in memory; a reload clears it.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Short-circuit: nothing to load if neither ID is configured.
    if (!gaId && !adsId) return;

    // 1. Check consent on mount.
    if (readConsent() === "accepted") {
      setReady(true);
      return; // Already accepted — no listeners needed.
    }

    // 2a. Same-tab: CookieConsent.tsx dispatches this custom event immediately
    //     after writing localStorage. The native `storage` event is cross-tab
    //     only and would NOT fire in the tab that called setItem.
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // process.env values are compile-time constants in Next.js — they are baked
  // in at build time and never change at runtime, so [] is the correct dep array.

  // Determine the loader URL: GA4 ID takes precedence as the primary tag ID
  // (conventional), falling back to the Ads ID if GA4 is not configured.
  // If neither is set, render nothing.
  const loaderId = gaId ?? adsId;
  if (!loaderId || !ready) return null;

  // Build per-ID config call lines — only for IDs that are actually present.
  // This means a project with only GA4, only Ads, or both gets exactly the
  // right number of config calls with no dead code.
  const configLines: string[] = [];
  if (gaId) {
    configLines.push(
      `gtag('config', '${gaId}', { page_path: window.location.pathname });`
    );
  }
  if (adsId) {
    configLines.push(`gtag('config', '${adsId}');`);
  }

  // Inline init script. Key invariant: `gtag('js', new Date())` is called
  // exactly once. A second call (as happened when two separate gtag.js loaders
  // were used) causes the second library instance to replay dataLayer commands
  // from before that timestamp, producing duplicate GA4 pageview hits.
  const initScript = [
    "window.dataLayer = window.dataLayer || [];",
    "function gtag(){dataLayer.push(arguments);}",
    "gtag('js', new Date());",
    ...configLines,
  ].join("\n    ");

  return (
    <>
      {/*
       * Single gtag.js loader. The ?id= parameter is the "primary" bootstrap ID;
       * it does not restrict event routing — all destinations registered via
       * gtag('config', ...) in the init block below receive their respective hits.
       *
       * Do NOT add a second <Script src="gtag.js?id=..."> for any other Google ID.
       * Strategy "afterInteractive": runs after hydration, never blocks render.
       */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`}
        strategy="afterInteractive"
      />
      {/*
       * Single init block — one gtag('js', ...) + one gtag('config', ...) per ID.
       * This is the pattern mandated by Google for multi-destination setups.
       * See: https://developers.google.com/tag-platform/gtagjs/install#add-products
       */}
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: initScript }}
      />
    </>
  );
}
