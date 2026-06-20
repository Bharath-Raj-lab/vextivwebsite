import type { Metadata } from "next";
import Link from "next/link";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "404 — Page Not Found | Vextiv Studio",
  description:
    "The page you're looking for doesn't exist. Head back home or explore our work.",
};

// ─── Arrow icon ───────────────────────────────────────────────────────────────
function IconArrow() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="2"
        y1="7.5"
        x2="13"
        y2="7.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <polyline
        points="9,3.5 13,7.5 9,11.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function NotFound() {
  return (
    <>
      <div className="nf-root" role="main">
        {/* Dot-grid background using gradient token from globals.css */}
        <div className="nf-grid" aria-hidden="true" />

        {/* Ambient radial glow */}
        <div className="nf-glow" aria-hidden="true" />

        {/* Content */}
        <div className="nf-content">
          {/* Large 404 numeral */}
          <p className="nf-numeral" aria-hidden="true">404</p>

          {/* Heading */}
          <h1 className="nf-heading">Page Not Found</h1>

          {/* Subtext */}
          <p className="nf-sub">
            Whatever you were looking for isn&apos;t here. It may have moved,
            been removed, or never existed — either way, we can&nbsp;help you
            find somewhere useful.
          </p>

          {/* CTAs */}
          <nav className="nf-ctas" aria-label="Recovery navigation">
            {/* Primary: Go Home */}
            <Link href="/" className="nf-btn nf-btn--primary">
              <span>Go Home</span>
              <IconArrow />
            </Link>

            {/* Ghost: View Our Work */}
            <Link href="/work" className="nf-btn nf-btn--ghost">
              <span>View Our Work</span>
              <IconArrow />
            </Link>
          </nav>
        </div>
      </div>

      {/* ── Scoped styles ─────────────────────────────────────────────────────
          All values via CSS custom properties from globals.css.
          No hardcoded colours, no "use client" needed.
          ─────────────────────────────────────────────────────────────────── */}
      <style>{`

        /* ─── Root ──────────────────────────────────────────────── */

        .nf-root {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: clamp(100px, 12vw, 160px) clamp(24px, 5vw, 80px);
          background-color: var(--bg-base);
          overflow: hidden;
          text-align: center;
        }

        /* ─── Dot grid ──────────────────────────────────────────── */
        /*    Uses --gradient-dot-grid and --dot-grid-size tokens   */

        .nf-grid {
          position: absolute;
          inset: 0;
          background-image: var(--gradient-dot-grid);
          background-size: var(--dot-grid-size);
          mask-image: radial-gradient(
            ellipse 80% 70% at 50% 50%,
            black 0%,
            transparent 100%
          );
          pointer-events: none;
          opacity: 0.65;
        }

        /* ─── Ambient glow ──────────────────────────────────────── */

        .nf-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 700px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            var(--accent-fill-08) 0%,
            transparent 68%
          );
          pointer-events: none;
          filter: blur(32px);
        }

        /* ─── Content ───────────────────────────────────────────── */

        .nf-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        /* ─── 404 numeral ───────────────────────────────────────── */
        /*    Syne 800 · clamp(88px,15vw,160px) · accent · ls 0.1em */

        .nf-numeral {
          font-family: var(--font-display);
          font-size: clamp(88px, 15vw, 160px);
          font-weight: 800;
          letter-spacing: 0.1em;
          line-height: 1;
          color: var(--accent);
          margin: 0 0 24px;
          /* Prevent layout shift from letter-spacing on last char */
          padding-right: 0.1em;
          /* Subtle text-shadow glow matching accent */
          text-shadow: 0 0 80px var(--accent-fill-20);
        }

        /* ─── Heading ───────────────────────────────────────────── */
        /*    Syne 700 · 32px                                        */

        .nf-heading {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-tight);
          color: var(--text-primary);
          margin: 0 0 16px;
        }

        /* ─── Subtext ───────────────────────────────────────────── */
        /*    DM Sans 300 · 15px · text-secondary token             */

        .nf-sub {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 300;
          line-height: var(--leading-body);
          color: var(--text-secondary);
          max-width: 440px;
          margin: 0 0 40px;
        }

        /* ─── CTA nav ───────────────────────────────────────────── */

        .nf-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }

        /* ─── Shared button base ────────────────────────────────── */

        .nf-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 15px 28px;
          border-radius: 9999px;
          transition: transform 0.2s ease, filter 0.2s ease,
            border-color 0.2s ease, color 0.2s ease,
            background-color 0.2s ease;
          white-space: nowrap;
        }

        .nf-btn:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
        }

        /* ─── Primary: accent fill ──────────────────────────────── */

        .nf-btn--primary {
          background-color: var(--accent);
          color: var(--bg-base);
          border: 1px solid var(--accent);
          box-shadow: 0 0 28px var(--accent-fill-20);
        }

        .nf-btn--primary:hover {
          transform: scale(1.04);
          filter: brightness(1.08);
        }

        /* ─── Ghost: outline ────────────────────────────────────── */

        .nf-btn--ghost {
          background-color: transparent;
          color: var(--text-primary);
          border: 1px solid var(--border-strong);
        }

        .nf-btn--ghost:hover {
          border-color: var(--accent-border-hover);
          color: var(--text-accent);
          background-color: var(--accent-fill-08);
        }

        /* ─── Responsive ────────────────────────────────────────── */

        @media (max-width: 480px) {
          .nf-heading {
            font-size: 26px;
          }

          .nf-ctas {
            flex-direction: column;
            width: 100%;
          }

          .nf-btn {
            justify-content: center;
          }
        }

      `}</style>
    </>
  );
}
