import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/sections/FaqAccordion";
import PageBackground from "@/components/ui/PageBackground";

// ─── SSG ──────────────────────────────────────────────────────────────────────
export const dynamic = "force-static";

import { BASE_URL } from "@/lib/constants";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "FAQ | VeXtiv — Hyderabad Digital Agency",
  description:
    "Honest answers to common questions about working with VeXtiv — pricing, process, timelines, and post-launch support in Hyderabad.",
  openGraph: {
    title: "FAQ | VeXtiv — Hyderabad Digital Agency",
    description:
      "Honest answers to common questions about working with VeXtiv — pricing, process, timelines, and post-launch support in Hyderabad.",
    url: `${BASE_URL}/faq`,
    siteName: "VeXtiv",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: `${BASE_URL}/faq`,
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONTACT_HREF = "/contact" as const;

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

// ─── Sections ─────────────────────────────────────────────────────────────────

function FaqHero() {
  return (
    <div className="fq-hero">
      <PageBackground />
      <div className="fq-hero-glow" aria-hidden="true" />
      <div className="fq-hero-grid" aria-hidden="true" />

      <div className="fq-hero-inner">
        <p className="fq-eyebrow">FAQ</p>
        <h1 className="fq-hero-title">
          Questions we get{" "}
          <span className="fq-accent">all the time.</span>
        </h1>
        <p className="fq-hero-sub">
          Straight answers on how we work, what things cost, how long things
          take, and what happens after we ship. No fluff.
        </p>
      </div>
    </div>
  );
}

function FaqCTA() {
  return (
    <section
      className="fq-cta-section"
      aria-label="Still have questions? Contact Vextiv."
    >
      <div className="fq-cta-glow" aria-hidden="true" />
      <div className="fq-cta-inner">
        <p className="fq-eyebrow fq-cta-eyebrow">Still Not Sure?</p>
        <h2 className="fq-cta-title">
          Ask us{" "}
          <span className="fq-accent">directly.</span>
        </h2>
        <p className="fq-cta-body">
          If your question isn&apos;t answered here, just get in touch. We
          respond quickly and we&apos;ll give you a real answer — not a
          template.
        </p>
        <Link
          href={CONTACT_HREF}
          className="fq-cta-btn"
          aria-label="Contact Vextiv with your question"
        >
          <span>Get in Touch</span>
          <IconArrow />
        </Link>
      </div>
    </section>
  );
}

// ─── Page Root ────────────────────────────────────────────────────────────────
export default function FaqPage() {
  return (
    <>
      <FaqHero />

      {/* Main FAQ content */}
      <section
        className="fq-main"
        aria-labelledby="fq-main-heading"
      >
        <div className="fq-main-inner">
          {/* Visually hidden heading for landmark */}
          <h2 id="fq-main-heading" className="fq-sr-only">
            Frequently Asked Questions
          </h2>

          {/* Two-column layout: sticky sidebar + accordion body */}
          <div className="fq-layout">
            {/* Sidebar */}
            <aside className="fq-sidebar" aria-label="FAQ section guide">
              <p className="fq-sidebar-label">On This Page</p>
              <ul className="fq-sidebar-list" role="list">
                {(
                  [
                    "General",
                    "Pricing",
                    "Process",
                    "Support",
                  ] as const
                ).map((cat) => (
                  <li key={cat}>
                    <span className="fq-sidebar-item">{cat}</span>
                  </li>
                ))}
              </ul>

              <div className="fq-sidebar-contact">
                <p className="fq-sidebar-contact-text">
                  Can&apos;t find your answer?
                </p>
                <Link href={CONTACT_HREF} className="fq-sidebar-contact-link">
                  Ask us directly →
                </Link>
              </div>
            </aside>

            {/* Accordion */}
            <div className="fq-accordion-col">
              <FaqAccordion />
            </div>
          </div>
        </div>
      </section>

      <FaqCTA />

      {/* ══════════════════════════════════════════════════════════
          SCOPED STYLES — FAQ Page
          All values via CSS custom properties from globals.css.
          ══════════════════════════════════════════════════════════ */}
      <style>{`

        /* ─── Shared ────────────────────────────────────────────── */

        .fq-eyebrow {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow-wide);
          text-transform: uppercase;
          color: var(--text-accent);
          margin-bottom: 16px;
        }

        .fq-accent {
          color: var(--text-accent);
        }

        .fq-sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* ─── Hero ──────────────────────────────────────────────── */

        .fq-hero {
          position: relative;
          background-color: var(--bg-section-hero);
          padding: clamp(128px, 16vw, 196px) 0 clamp(72px, 8vw, 100px);
          overflow: hidden;
        }

        .fq-hero-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 600px 440px at 50% 65%,
            var(--accent-fill-08) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .fq-hero-grid {
          position: absolute;
          inset: 0;
          background-image: var(--gradient-dot-grid);
          background-size: var(--dot-grid-size);
          mask-image: radial-gradient(
            ellipse 80% 70% at 50% 55%,
            black,
            transparent
          );
          pointer-events: none;
          opacity: 0.5;
        }

        .fq-hero-inner {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .fq-hero-title {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 68px);
          font-weight: 700;
          letter-spacing: var(--tracking-hero);
          line-height: 1.1;
          color: var(--text-primary);
          margin-bottom: 24px;
          max-width: 700px;
        }

        .fq-hero-sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          font-weight: 300;
          line-height: var(--leading-body);
          color: var(--text-secondary);
          max-width: 500px;
        }

        /* ─── Main section ──────────────────────────────────────── */

        .fq-main {
          background-color: var(--bg-base);
          padding: clamp(64px, 8vw, 100px) 0 clamp(80px, 10vw, 128px);
        }

        .fq-main-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
        }

        .fq-layout {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 64px;
          align-items: start;
        }

        /* ─── Sidebar ───────────────────────────────────────────── */

        .fq-sidebar {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .fq-sidebar-label {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow);
          text-transform: uppercase;
          color: var(--text-very-muted);
          margin-bottom: 8px;
        }

        .fq-sidebar-list {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .fq-sidebar-item {
          display: block;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 400;
          color: var(--text-muted);
          padding: 6px 0;
          border-left: 2px solid var(--border-subtle);
          padding-left: 14px;
          transition: color 0.18s ease, border-color 0.18s ease;
        }

        .fq-sidebar-contact {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 16px;
          background-color: var(--bg-surface-1);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          margin-top: 8px;
        }

        .fq-sidebar-contact-text {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 400;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .fq-sidebar-contact-link {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-accent);
          text-decoration: none;
          transition: opacity 0.18s ease;
        }

        .fq-sidebar-contact-link:hover {
          opacity: 0.8;
        }

        .fq-sidebar-contact-link:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
          border-radius: 2px;
        }

        /* ─── Accordion column ──────────────────────────────────── */

        .fq-accordion-col {
          min-width: 0; /* prevent grid blowout */
        }

        /* ─── CTA ───────────────────────────────────────────────── */

        .fq-cta-section {
          position: relative;
          background-color: var(--bg-surface-1);
          border-top: 1px solid var(--border-subtle);
          padding: clamp(72px, 10vw, 120px) 0;
          overflow: hidden;
          text-align: center;
        }

        .fq-cta-glow {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 360px;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            var(--accent-fill-08) 0%,
            transparent 70%
          );
          pointer-events: none;
          filter: blur(40px);
        }

        .fq-cta-inner {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 48px);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .fq-cta-eyebrow {
          margin-bottom: 20px;
        }

        .fq-cta-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 3.5vw, 48px);
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          line-height: 1.15;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .fq-cta-body {
          font-family: var(--font-body);
          font-size: var(--text-md);
          font-weight: 300;
          line-height: var(--leading-body);
          color: var(--text-secondary);
          margin-bottom: 36px;
          max-width: 460px;
        }

        .fq-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--gradient-btn);
          color: var(--bg-base);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 15px 30px;
          border-radius: 9999px;
          transition: transform 0.2s ease, filter 0.2s ease;
          box-shadow: 0 0 28px var(--accent-fill-20);
        }

        .fq-cta-btn:hover {
          transform: scale(1.04);
          filter: brightness(1.08);
        }

        .fq-cta-btn:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
        }

        /* ─── Responsive ────────────────────────────────────────── */

        @media (max-width: 900px) {
          .fq-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .fq-sidebar {
            position: static;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 12px;
            align-items: center;
          }

          .fq-sidebar-label {
            width: 100%;
            margin-bottom: 0;
          }

          .fq-sidebar-list {
            display: none; /* hidden on mobile — tabs in accordion handle nav */
          }

          .fq-sidebar-contact {
            margin-top: 0;
          }
        }

        @media (max-width: 600px) {
          .fq-hero-title {
            font-size: clamp(30px, 9vw, 44px);
          }
          .fq-sidebar {
            display: none; /* fully hidden on small screens — tabs suffice */
          }
        }

      `}</style>
    </>
  );
}
