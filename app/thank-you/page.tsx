import type { Metadata } from "next";
import Link from "next/link";

// ─── SSG + noindex ────────────────────────────────────────────────────────────
export const dynamic = "force-static";

import { BASE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Message Received | VeXtiv",
  description: "Thank you for reaching out to VeXtiv. We will review your details and be in touch shortly to discuss how we can help your Hyderabad business grow.",
  openGraph: {
    title: "Message Received | VeXtiv",
    description: "Thank you for reaching out to VeXtiv. We will review your details and be in touch shortly to discuss how we can help your Hyderabad business grow.",
    url: `${BASE_URL}/thank-you`,
    siteName: "VeXtiv",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: `${BASE_URL}/thank-you`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ThankYouPage() {
  return (
    <>
      <div className="ty-root">
        {/* Dot-grid background */}
        <div className="ty-grid" aria-hidden="true" />

        {/* Ambient glow */}
        <div className="ty-glow" aria-hidden="true" />

        {/* Content card */}
        <div className="ty-card">
          {/* Inline checkmark SVG — accent colour */}
          <div className="ty-icon-wrap" aria-hidden="true">
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ty-icon"
            >
              {/* Outer ring */}
              <circle
                cx="28"
                cy="28"
                r="26"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.25"
              />
              {/* Inner filled circle */}
              <circle cx="28" cy="28" r="20" fill="currentColor" opacity="0.10" />
              {/* Check mark */}
              <polyline
                points="18,29 25,36 38,21"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="ty-heading">Message Received.</h1>

          {/* Subtext */}
          <p className="ty-sub">
            Thanks for reaching out. We&apos;ll review your message and get back
            to you within one business day — usually sooner.
          </p>

          {/* Subtle back link — not a prominent button */}
          <Link href="/" className="ty-back-link">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* ── Scoped styles ─────────────────────────────────────────────────────
          All values via CSS custom properties. No hardcoded colours.
          Server Component — no "use client".
          ─────────────────────────────────────────────────────────────────── */}
      <style>{`

        .ty-root {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: var(--bg-base);
          padding: clamp(80px, 12vw, 140px) clamp(24px, 5vw, 64px);
          overflow: hidden;
        }

        /* ─── Dot grid ──────────────────────────────────────────── */

        .ty-grid {
          position: absolute;
          inset: 0;
          background-image: var(--gradient-dot-grid);
          background-size: var(--dot-grid-size);
          mask-image: radial-gradient(
            ellipse 70% 65% at 50% 50%,
            black 0%,
            transparent 100%
          );
          pointer-events: none;
          opacity: 0.55;
        }

        /* ─── Ambient glow ──────────────────────────────────────── */

        .ty-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 560px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            var(--accent-fill-08) 0%,
            transparent 68%
          );
          pointer-events: none;
          filter: blur(40px);
        }

        /* ─── Content card ──────────────────────────────────────── */

        .ty-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 480px;
        }

        /* ─── Checkmark icon ────────────────────────────────────── */

        .ty-icon-wrap {
          color: var(--accent);
          margin-bottom: 32px;
        }

        .ty-icon {
          display: block;
          filter: drop-shadow(0 0 18px var(--accent-fill-25));
        }

        /* ─── Heading — Syne 800 · 48px ─────────────────────────── */

        .ty-heading {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 48px);
          font-weight: 800;
          letter-spacing: var(--tracking-heading);
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 20px;
        }

        /* ─── Subtext — DM Sans 300 · 15px · text-secondary ────── */

        .ty-sub {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 300;
          line-height: var(--leading-body);
          color: var(--text-secondary);
          margin: 0 0 40px;
          max-width: 380px;
        }

        /* ─── Subtle back link — not a prominent button ─────────── */

        .ty-back-link {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 400;
          color: var(--text-muted);
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: color 0.18s ease;
        }

        .ty-back-link:hover {
          color: var(--text-secondary);
        }

        .ty-back-link:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 3px;
          border-radius: 2px;
        }

      `}</style>
    </>
  );
}
