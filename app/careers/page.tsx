import type { Metadata } from "next";
import Link from "next/link";

// ─── SSG ──────────────────────────────────────────────────────────────────────
export const dynamic = "force-static";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://vextiv.com"),
  title: "Careers at Vextiv Studio | Join Our Hyderabad Team",
  description:
    "We're a small, focused digital studio based in Hyderabad. No open roles right now, but we always want to hear from people who care about craft. Send us a message.",
  openGraph: {
    title: "Careers at Vextiv Studio | Join Our Hyderabad Team",
    description:
      "We're a small, focused digital studio based in Hyderabad. No open roles right now, but we always want to hear from people who care about craft. Send us a message.",
    url: "https://vextiv.com/careers",
    siteName: "Vextiv Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://vextiv.com/careers",
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONTACT_EMAIL = "hello@vextiv.com" as const;

const CULTURE_POINTS: readonly { readonly id: string; readonly text: string }[] = [
  { id: "small-team", text: "Small on purpose. Every person on the team has real ownership over real work — no hand-holding, no bureaucracy." },
  { id: "local-first", text: "Rooted in Hyderabad. We work with local businesses and take pride in understanding the market we serve." },
  { id: "craft-over-volume", text: "Craft over volume. We'd rather do fewer things well than churn through a pipeline of average deliverables." },
  { id: "async-honest", text: "Direct and honest. We say what we think, disagree respectfully, and move fast once a decision is made." },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconEmpty() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="cr-empty-icon"
    >
      <circle
        cx="24"
        cy="24"
        r="20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
      <line
        x1="24"
        y1="4"
        x2="24"
        y2="11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="24"
        y1="37"
        x2="24"
        y2="44"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="4"
        y1="24"
        x2="11"
        y2="24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="37"
        y1="24"
        x2="44"
        y2="24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

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

function IconMail() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="4"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <polyline
        points="2,6 9,11 16,6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Section: Hero ────────────────────────────────────────────────────────────
function CareersHero() {
  return (
    <div className="cr-hero">
      <div className="cr-hero-glow" aria-hidden="true" />
      <div className="cr-hero-grid" aria-hidden="true" />

      <div className="cr-hero-inner">
        <p className="cr-eyebrow">Careers</p>
        <h1 className="cr-hero-title">
          Join a studio that cares about{" "}
          <span className="cr-accent">the work.</span>
        </h1>
        <p className="cr-hero-sub">
          We&apos;re building something deliberately small. If you care about
          craft, want real ownership, and like working with businesses that are
          genuinely trying to grow — read on.
        </p>
      </div>
    </div>
  );
}

// ─── Section: Culture ─────────────────────────────────────────────────────────
function CultureSection() {
  return (
    <section
      className="cr-section cr-culture-section"
      aria-labelledby="cr-culture-heading"
    >
      <div className="cr-inner cr-culture-inner">
        {/* Label column */}
        <div className="cr-label-col">
          <span className="cr-label" id="cr-culture-heading">
            How We Work
          </span>
          <div className="cr-label-line" aria-hidden="true" />
        </div>

        {/* Body */}
        <div className="cr-culture-body">
          <p className="cr-culture-lead">
            Vextiv is a small, focused team based in Hyderabad. We don&apos;t
            have departments. We don&apos;t have layers. Everyone who works here
            is a practitioner — someone who ships things, takes pride in getting
            details right, and cares about the actual outcomes for the businesses
            we serve.
          </p>

          <ul className="cr-culture-list" role="list">
            {CULTURE_POINTS.map((point) => (
              <li key={point.id} className="cr-culture-item">
                <span className="cr-culture-dot" aria-hidden="true" />
                <span className="cr-culture-text">{point.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Open Positions (empty state) ────────────────────────────────────
function OpenPositionsSection() {
  return (
    <section
      className="cr-section cr-positions-section"
      aria-labelledby="cr-positions-heading"
    >
      <div className="cr-inner">
        {/* Header row */}
        <div className="cr-positions-hdr">
          <div>
            <p className="cr-eyebrow">Open Roles</p>
            <h2 id="cr-positions-heading" className="cr-section-title">
              Current Openings
            </h2>
          </div>
        </div>

        {/* Empty state */}
        <div className="cr-empty-state" role="status" aria-live="polite">
          {/* Ambient glow behind icon */}
          <div className="cr-empty-glow" aria-hidden="true" />

          <IconEmpty />

          <p className="cr-empty-title">No Open Positions Right Now</p>
          <p className="cr-empty-body">
            We&apos;re not hiring for any specific roles at the moment. That can
            change quickly — we grow by finding the right people, not by posting
            job descriptions. If you think you&apos;re one of them, don&apos;t
            wait for a listing.
          </p>

          {/* Spontaneous application CTA */}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Spontaneous%20Application%20—%20Vextiv%20Studio&body=Hi%20Vextiv%20team%2C%0A%0AI%20came%20across%20your%20studio%20and%20wanted%20to%20introduce%20myself...`}
            className="cr-mailto-btn"
            aria-label={`Send a spontaneous application to ${CONTACT_EMAIL}`}
          >
            <IconMail />
            <span>Send a Spontaneous Application</span>
          </a>

          <p className="cr-empty-hint">
            Reaches us at{" "}
            <span className="cr-email-inline">{CONTACT_EMAIL}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Bottom CTA → /work ──────────────────────────────────────────────
function CareersCTA() {
  return (
    <section
      className="cr-bottom-cta"
      aria-label="See Vextiv Studio's work"
    >
      <div className="cr-bottom-cta-glow" aria-hidden="true" />
      <div className="cr-bottom-cta-inner">
        <p className="cr-eyebrow cr-cta-eyebrow">In the Meantime</p>
        <h2 className="cr-bottom-title">
          See the kind of work{" "}
          <span className="cr-accent">we&apos;re proud of.</span>
        </h2>
        <p className="cr-bottom-body">
          The best way to understand if Vextiv is a place you&apos;d want to
          work is to look at what we&apos;ve built. Our work page shows real
          projects, real businesses, and real outcomes.
        </p>
        <Link
          href="/work"
          className="cr-bottom-btn"
          aria-label="Browse Vextiv Studio's portfolio"
        >
          <span>Browse Our Work</span>
          <IconArrow />
        </Link>
      </div>
    </section>
  );
}

// ─── Page Root ────────────────────────────────────────────────────────────────
export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <CultureSection />
      <OpenPositionsSection />
      <CareersCTA />

      {/* ══════════════════════════════════════════════════════════
          SCOPED STYLES — Careers Page
          All values use CSS custom properties from globals.css.
          No hardcoded colour or font values.
          ══════════════════════════════════════════════════════════ */}
      <style>{`

        /* ─────────────────────────────────────
           SHARED
        ───────────────────────────────────── */

        .cr-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
        }

        .cr-section {
          padding: clamp(80px, 10vw, 128px) 0;
        }

        .cr-eyebrow {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow-wide);
          text-transform: uppercase;
          color: var(--text-accent);
          margin-bottom: 16px;
        }

        .cr-label {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow-wide);
          text-transform: uppercase;
          color: var(--text-accent);
          white-space: nowrap;
        }

        .cr-section-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-tight);
          color: var(--text-primary);
        }

        .cr-accent {
          color: var(--text-accent);
        }

        /* ─────────────────────────────────────
           HERO
        ───────────────────────────────────── */

        .cr-hero {
          position: relative;
          background-color: var(--bg-section-hero);
          padding: clamp(128px, 16vw, 196px) 0 clamp(80px, 10vw, 120px);
          overflow: hidden;
        }

        .cr-hero-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 640px 480px at 60% 55%,
            var(--accent-fill-08) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .cr-hero-grid {
          position: absolute;
          inset: 0;
          background-image: var(--gradient-dot-grid);
          background-size: var(--dot-grid-size);
          mask-image: radial-gradient(
            ellipse 80% 70% at 60% 50%,
            black,
            transparent
          );
          pointer-events: none;
          opacity: 0.5;
        }

        .cr-hero-inner {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
        }

        .cr-hero-title {
          font-family: var(--font-display);
          font-size: clamp(38px, 5.5vw, 72px);
          font-weight: 700;
          letter-spacing: var(--tracking-hero);
          line-height: 1.1;
          color: var(--text-primary);
          margin-bottom: 28px;
          max-width: 780px;
        }

        .cr-hero-sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          font-weight: 300;
          line-height: var(--leading-body);
          color: var(--text-secondary);
          max-width: 520px;
        }

        /* ─────────────────────────────────────
           CULTURE
        ───────────────────────────────────── */

        .cr-culture-section {
          background-color: var(--bg-surface-1);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .cr-culture-inner {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 64px;
          align-items: start;
        }

        .cr-label-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
          padding-top: 6px;
          position: sticky;
          top: 100px;
        }

        .cr-label-line {
          width: 1px;
          height: 60px;
          background: var(--gradient-accent-line);
          flex-shrink: 0;
        }

        .cr-culture-body {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .cr-culture-lead {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          font-weight: 400;
          line-height: 1.8;
          color: var(--text-primary);
        }

        .cr-culture-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cr-culture-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .cr-culture-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--accent);
          flex-shrink: 0;
          margin-top: 9px;
        }

        .cr-culture-text {
          font-family: var(--font-body);
          font-size: var(--text-md);
          font-weight: 300;
          line-height: 1.75;
          color: var(--text-secondary);
        }

        /* ─────────────────────────────────────
           OPEN POSITIONS
        ───────────────────────────────────── */

        .cr-positions-section {
          background-color: var(--bg-base);
        }

        .cr-positions-hdr {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: clamp(40px, 5vw, 60px);
        }

        /* ── Empty state ── */

        .cr-empty-state {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: clamp(64px, 8vw, 96px) clamp(24px, 5vw, 80px);
          border: 1px dashed var(--border-medium);
          border-radius: 20px;
          background-color: var(--bg-surface-1);
          overflow: hidden;
        }

        .cr-empty-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            var(--accent-fill-08) 0%,
            transparent 70%
          );
          pointer-events: none;
          filter: blur(32px);
        }

        .cr-empty-icon {
          color: var(--text-very-muted);
          margin-bottom: 28px;
          position: relative;
        }

        .cr-empty-title {
          font-family: var(--font-display);
          font-size: clamp(22px, 2.5vw, 30px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 16px;
          position: relative;
        }

        .cr-empty-body {
          font-family: var(--font-body);
          font-size: var(--text-md);
          font-weight: 300;
          line-height: 1.75;
          color: var(--text-secondary);
          max-width: 540px;
          margin-bottom: 40px;
          position: relative;
        }

        /* Spontaneous application mailto button */
        .cr-mailto-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background-color: var(--accent);
          color: var(--bg-base);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 15px 28px;
          border-radius: 9999px;
          transition: transform 0.2s ease, filter 0.2s ease;
          box-shadow: 0 0 28px var(--accent-fill-20);
          margin-bottom: 20px;
        }

        .cr-mailto-btn:hover {
          transform: scale(1.04);
          filter: brightness(1.08);
        }

        .cr-mailto-btn:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
        }

        .cr-empty-hint {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 400;
          color: var(--text-very-muted);
          position: relative;
        }

        .cr-email-inline {
          color: var(--text-muted);
          font-family: var(--font-body);
        }

        /* ─────────────────────────────────────
           BOTTOM CTA → /work
        ───────────────────────────────────── */

        .cr-bottom-cta {
          position: relative;
          background-color: var(--bg-surface-1);
          border-top: 1px solid var(--border-subtle);
          padding: clamp(80px, 12vw, 140px) 0;
          overflow: hidden;
          text-align: center;
        }

        .cr-bottom-cta-glow {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 700px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            var(--accent-fill-08) 0%,
            transparent 70%
          );
          pointer-events: none;
          filter: blur(48px);
        }

        .cr-bottom-cta-inner {
          position: relative;
          max-width: 680px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 48px);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cr-cta-eyebrow {
          margin-bottom: 20px;
        }

        .cr-bottom-title {
          font-family: var(--font-display);
          font-size: clamp(30px, 4vw, 52px);
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          line-height: 1.15;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .cr-bottom-body {
          font-family: var(--font-body);
          font-size: var(--text-md);
          font-weight: 300;
          line-height: var(--leading-body);
          color: var(--text-secondary);
          margin-bottom: 40px;
          max-width: 500px;
        }

        .cr-bottom-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid var(--border-strong);
          background-color: transparent;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 15px 30px;
          border-radius: 9999px;
          transition: border-color 0.2s ease, color 0.2s ease,
            background-color 0.2s ease;
        }

        .cr-bottom-btn:hover {
          border-color: var(--accent-border-hover);
          color: var(--text-accent);
          background-color: var(--accent-fill-08);
        }

        .cr-bottom-btn:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
        }

        /* ─────────────────────────────────────
           RESPONSIVE
        ───────────────────────────────────── */

        @media (max-width: 900px) {
          .cr-culture-inner {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .cr-label-col {
            flex-direction: row;
            align-items: center;
            position: static;
            gap: 12px;
          }

          .cr-label-line {
            width: 40px;
            height: 1px;
            background: var(--gradient-accent-line);
          }

          .cr-positions-hdr {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }

        @media (max-width: 600px) {
          .cr-hero-title {
            font-size: clamp(32px, 9vw, 48px);
          }

          .cr-empty-state {
            padding: 48px 24px;
          }
        }

      `}</style>
    </>
  );
}
