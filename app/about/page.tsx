import type { Metadata } from "next";
import Link from "next/link";

// ─── SSG: no dynamic segments, statically generated at build time ─────────────
export const dynamic = "force-static";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://vextiv.tech"),
  title: "About VeXtiv | Hyderabad Digital Agency",
  description:
    "We're a digital studio founded in Hyderabad with one purpose: to give local businesses the online presence they deserve. Meet the team behind VeXtiv.",
  openGraph: {
    title: "About VeXtiv | Hyderabad Digital Agency",
    description:
      "We're a digital studio founded in Hyderabad with one purpose: to give local businesses the online presence they deserve. Meet the team behind VeXtiv.",
    url: "https://vextiv.tech/about",
    siteName: "VeXtiv",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://vextiv.tech/about",
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Value {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly icon: string;
}

const STORY_PARAGRAPHS: readonly string[] = [
  "VeXtiv was born in Hyderabad out of a simple frustration: too many brilliant local businesses were invisible online. Restaurants with incredible food, boutiques with unique products, service providers with real talent — all underselling themselves with outdated websites, inconsistent branding, or no digital presence at all. We started Vextiv to fix that.",
  "From day one, we chose to stay close to home. Hyderabad's business community is fast-moving, deeply entrepreneurial, and fiercely loyal to quality. That energy shaped how we work — we move quickly, we stay direct, and we care about outcomes more than aesthetics for their own sake. Every project we take on is built to perform.",
  "Today we serve restaurants, startups, service businesses, and growing brands across the city and beyond. We're a small studio by design — it keeps us focused, keeps our work personal, and keeps our clients from becoming ticket numbers. We know the people we work with. That matters to us.",
];

const VALUES: readonly Value[] = [
  {
    id: "honest-work",
    title: "Honest Work",
    body: "We don't overpromise. We tell you what's realistic, what's worth the investment, and what isn't — even when that's not what you want to hear. Long-term trust matters more to us than a single sale.",
    icon: "◈",
  },
  {
    id: "real-results",
    title: "Real Results",
    body: "Every deliverable is measured against one question: does it move the needle for your business? Design choices, copy decisions, tech stack — all of it answers to that standard.",
    icon: "◎",
  },
  {
    id: "client-first-thinking",
    title: "Client-First Thinking",
    body: "You're not a ticket in a queue. We work with a small roster of clients at a time so that every person we serve gets direct access, real attention, and work that actually reflects their business.",
    icon: "◉",
  },
];

// ─── Section: Hero ────────────────────────────────────────────────────────────
function AboutHero() {
  return (
    <div className="ab-hero">
      {/* Ambient glow */}
      <div className="ab-hero-glow" aria-hidden="true" />
      {/* Dot grid */}
      <div className="ab-hero-grid" aria-hidden="true" />

      <div className="ab-hero-inner">
        <p className="ab-eyebrow">About Us</p>
        <h1 className="ab-hero-title">
          A studio built for{" "}
          <span className="ab-hero-accent">Hyderabad&apos;s</span>
          <br />
          ambitious businesses.
        </h1>
        <p className="ab-hero-sub">
          We&apos;re a small digital studio with a very specific mission — help
          local businesses compete, grow, and get the online presence they
          actually deserve.
        </p>
      </div>
    </div>
  );
}

// ─── Section: Studio Story ────────────────────────────────────────────────────
function StudioStory() {
  return (
    <section className="ab-section ab-story-section" aria-labelledby="ab-story-heading">
      <div className="ab-inner ab-story-inner">
        {/* Left: label column */}
        <div className="ab-story-label-col">
          <span className="ab-label" id="ab-story-heading">
            Our Story
          </span>
          <div className="ab-label-line" aria-hidden="true" />
        </div>

        {/* Right: paragraphs */}
        <div className="ab-story-body-col">
          {STORY_PARAGRAPHS.map((para, i) => (
            <p key={i} className="ab-story-para">
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

const CAROUSEL_MEMBERS = [
  { id: "1", name: "Priya", role: "Design Lead", image: "/team/avatar_priya.png", isLeadership: false },
  { id: "2", name: "Maya", role: "Product Manager", image: "/team/avatar_maya.png", isLeadership: false },
  { id: "3", name: "Sarah", role: "UX Researcher", image: "/team/avatar_sarah.png", isLeadership: false },
  { id: "4", name: "Bathini Ganesh", role: "Co-Founder & CTO", image: "/team/avatar_ganesh.png", isLeadership: true },
  { id: "5", name: "Alloney Bharath Raj", role: "Founder & CEO", image: "/team/avatar_bharath.png", isLeadership: true },
  { id: "6", name: "Yoganandh", role: "Co-Founder & COO", image: "/team/avatar_yoganandh.png", isLeadership: true },
  { id: "7", name: "Rohan", role: "Data Wrangler", image: "/team/avatar_rohan.png", isLeadership: false },
  { id: "8", name: "David", role: "Frontend Dev", image: "/team/avatar_david.png", isLeadership: false },
];

function TeamSection() {
  return (
    <section className="ab-section ab-team-section" aria-labelledby="ab-team-heading">
      <div className="ab-inner">
        {/* Header */}
        <div className="ab-section-hdr">
          <p className="ab-eyebrow">The People</p>
          <h2 id="ab-team-heading" className="ab-section-title">
            Who we are
          </h2>
        </div>
      </div>

      {/* Interactive Avatar Carousel */}
      <div className="ab-carousel-container">
        <ul className="ab-carousel-row" id="ab-team-carousel" role="list">
          {CAROUSEL_MEMBERS.map((member) => (
            <li
              key={member.id}
              className="ab-carousel-card"
              tabIndex={0}
            >
              <div className="ab-carousel-avatar-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={`${member.name} illustration`}
                  className="ab-carousel-avatar"
                />
              </div>
              <div className="ab-carousel-text">
                <p className="ab-carousel-meet">
                  Meet {member.name}, {member.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                setTimeout(function() {
                  var el = document.getElementById('ab-team-carousel');
                  if (el && window.innerWidth <= 900) {
                    var target = el.children[3];
                    if (target) {
                      el.scrollLeft = target.offsetLeft - el.offsetLeft;
                    }
                  }
                }, 50);
              }
            `,
          }}
        />
      </div>
    </section>
  );
}

// ─── Section: Values ─────────────────────────────────────────────────────────
function ValuesSection() {
  return (
    <section className="ab-section ab-values-section" aria-labelledby="ab-values-heading">
      <div className="ab-inner">
        {/* Header */}
        <div className="ab-section-hdr">
          <p className="ab-eyebrow">What We Stand For</p>
          <h2 id="ab-values-heading" className="ab-section-title">
            Three things we never compromise on.
          </h2>
        </div>

        {/* Values list */}
        <ul className="ab-values-grid" role="list">
          {VALUES.map((value, i) => (
            <li key={value.id} className="ab-value-item">
              {/* Number */}
              <span className="ab-value-num" aria-hidden="true">
                0{i + 1}
              </span>
              {/* Icon */}
              <span className="ab-value-icon" aria-hidden="true">
                {value.icon}
              </span>
              <h3 className="ab-value-title">{value.title}</h3>
              <p className="ab-value-body">{value.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Section: CTA ─────────────────────────────────────────────────────────────
function AboutCTA() {
  return (
    <section className="ab-cta-section" aria-label="Get in touch with VeXtiv">
      <div className="ab-cta-inner">
        {/* Ambient glow blob */}
        <div className="ab-cta-glow" aria-hidden="true" />

        <p className="ab-eyebrow ab-cta-eyebrow">Work With Us</p>
        <h2 className="ab-cta-title">
          Ready to build something{" "}
          <span className="ab-hero-accent">worth talking about?</span>
        </h2>
        <p className="ab-cta-body">
          Tell us about your business. We&apos;ll listen properly, ask the right
          questions, and come back with a clear plan — no jargon, no templates,
          no wasted time.
        </p>
        <Link href="/contact" className="ab-cta-btn" aria-label="Start a project with VeXtiv">
          <span>Start a Conversation</span>
          {/* Arrow */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <line
              x1="2"
              y1="8"
              x2="13"
              y2="8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <polyline
              points="9,4 13,8 9,12"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}

// ─── Page Root ────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StudioStory />
      <TeamSection />
      <ValuesSection />
      <AboutCTA />

      {/* ══════════════════════════════════════════════════════════
          SCOPED STYLES — About Page
          All values reference CSS custom properties from globals.css
          No hardcoded colour values that duplicate token definitions.
          ══════════════════════════════════════════════════════════ */}
      <style>{`

        /* ─────────────────────────────────────
           SHARED UTILITIES
        ───────────────────────────────────── */

        .ab-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
        }

        .ab-section {
          padding: clamp(80px, 10vw, 128px) 0;
        }

        .ab-eyebrow {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow-wide);
          text-transform: uppercase;
          color: var(--text-accent);
          margin-bottom: 16px;
        }

        .ab-label {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow-wide);
          text-transform: uppercase;
          color: var(--text-accent);
          white-space: nowrap;
        }

        .ab-section-hdr {
          margin-bottom: clamp(48px, 6vw, 72px);
        }

        .ab-section-title {
          font-family: var(--font-display);
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-tight);
          color: var(--text-primary);
        }

        /* ─────────────────────────────────────
           HERO
        ───────────────────────────────────── */

        .ab-hero {
          position: relative;
          background-color: var(--bg-section-hero);
          padding: clamp(128px, 16vw, 196px) 0 clamp(80px, 10vw, 120px);
          overflow: hidden;
        }

        .ab-hero-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 700px 500px at 35% 60%,
            var(--accent-fill-08) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .ab-hero-grid {
          position: absolute;
          inset: 0;
          background-image: var(--gradient-dot-grid);
          background-size: var(--dot-grid-size);
          mask-image: radial-gradient(
            ellipse 85% 75% at 35% 55%,
            black,
            transparent
          );
          pointer-events: none;
          opacity: 0.55;
        }

        .ab-hero-inner {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
        }

        .ab-hero-title {
          font-family: var(--font-display);
          font-size: clamp(40px, 6vw, 76px);
          font-weight: 700;
          letter-spacing: var(--tracking-hero);
          line-height: 1.1;
          color: var(--text-primary);
          margin-bottom: 28px;
          max-width: 800px;
        }

        .ab-hero-accent {
          color: var(--text-accent);
        }

        .ab-hero-sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          font-weight: 300;
          line-height: var(--leading-body);
          color: var(--text-secondary);
          max-width: 560px;
        }

        /* ─────────────────────────────────────
           STORY
        ───────────────────────────────────── */

        .ab-story-section {
          background-color: var(--bg-surface-1);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .ab-story-inner {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 64px;
          align-items: start;
        }

        .ab-story-label-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
          padding-top: 6px;
          position: sticky;
          top: 100px;
        }

        .ab-label-line {
          width: 1px;
          height: 60px;
          background: var(--gradient-accent-line);
          flex-shrink: 0;
        }

        .ab-story-body-col {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .ab-story-para {
          font-family: var(--font-body);
          font-size: var(--text-md);
          font-weight: 300;
          line-height: 1.85;
          color: var(--text-secondary);
        }

        .ab-story-para:first-child {
          font-size: var(--text-lg);
          font-weight: 400;
          color: var(--text-primary);
          line-height: var(--leading-body);
        }

        /* ─────────────────────────────────────
           INTERACTIVE AVATAR CAROUSEL
        ───────────────────────────────────── */

        .ab-team-section {
          background-color: var(--bg-base);
          overflow: hidden;
        }

        .ab-carousel-container {
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding: 20px clamp(24px, 5vw, 80px) 60px;
          overflow-x: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none;  /* IE and Edge */
        }
        
        .ab-carousel-container::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }

        .ab-carousel-row {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: clamp(4px, 1vw, 8px);
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
        }

        .ab-carousel-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          width: 100%;
          cursor: pointer;
          outline: none;
        }

        .ab-carousel-avatar-wrap {
          width: 100%;
          aspect-ratio: 3 / 4;
          background-color: #f3f4f6; /* light gray background */
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                      background-color 0.4s ease, 
                      box-shadow 0.4s ease;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .ab-carousel-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center bottom;
          filter: grayscale(100%) contrast(1.1); /* Black and white illustration effect */
        }

        /* Hover & Focus Effects */
        .ab-carousel-card:hover .ab-carousel-avatar-wrap,
        .ab-carousel-card:focus-visible .ab-carousel-avatar-wrap,
        .ab-carousel-card:focus .ab-carousel-avatar-wrap,
        .ab-carousel-card:active .ab-carousel-avatar-wrap {
          transform: scale(1.15);
          background-color: #ffffff; /* Solid white background */
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15); /* Subtle drop shadow */
        }

        .ab-carousel-text {
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s;
          text-align: center;
          min-height: 40px; /* Prevent layout shift when text appears */
        }

        .ab-carousel-card:hover .ab-carousel-text,
        .ab-carousel-card:focus-visible .ab-carousel-text,
        .ab-carousel-card:focus .ab-carousel-text,
        .ab-carousel-card:active .ab-carousel-text {
          opacity: 1;
          transform: translateY(0);
        }

        .ab-carousel-meet {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 500;
          color: #9ca3af; /* Light gray font */
          line-height: 1.4;
          margin: 0;
        }

        /* ─────────────────────────────────────
           VALUES
        ───────────────────────────────────── */

        .ab-values-section {
          background-color: var(--bg-surface-1);
          border-top: 1px solid var(--border-subtle);
        }

        .ab-values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          list-style: none;
          padding: 0;
          margin: 0;
          border: 1px solid var(--border-default);
          border-radius: 20px;
          overflow: hidden;
        }

        .ab-value-item {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: clamp(32px, 4vw, 48px);
          background-color: var(--bg-surface-2);
          border-right: 1px solid var(--border-default);
          transition: background-color 0.25s ease;
          position: relative;
        }

        .ab-value-item:last-child {
          border-right: none;
        }

        .ab-value-item:hover {
          background-color: var(--accent-fill-08);
        }

        .ab-value-num {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 700;
          letter-spacing: var(--tracking-number);
          color: var(--text-very-muted);
        }

        .ab-value-icon {
          font-size: 28px;
          line-height: 1;
          color: var(--text-accent);
          display: block;
        }

        .ab-value-title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .ab-value-body {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 300;
          line-height: 1.75;
          color: var(--text-secondary);
        }

        /* ─────────────────────────────────────
           CTA
        ───────────────────────────────────── */

        .ab-cta-section {
          position: relative;
          background-color: var(--bg-base);
          padding: clamp(80px, 12vw, 140px) 0;
          overflow: hidden;
          border-top: 1px solid var(--border-subtle);
          text-align: center;
        }

        .ab-cta-inner {
          position: relative;
          max-width: 720px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 48px);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .ab-cta-glow {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            var(--accent-fill-08) 0%,
            transparent 70%
          );
          pointer-events: none;
          filter: blur(40px);
        }

        .ab-cta-eyebrow {
          margin-bottom: 20px;
        }

        .ab-cta-title {
          font-family: var(--font-display);
          font-size: clamp(32px, 4.5vw, 56px);
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          line-height: 1.15;
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .ab-cta-body {
          font-family: var(--font-body);
          font-size: var(--text-md);
          font-weight: 300;
          line-height: var(--leading-body);
          color: var(--text-secondary);
          margin-bottom: 40px;
          max-width: 520px;
        }

        .ab-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background-color: var(--accent);
          color: var(--bg-base);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 16px 32px;
          border-radius: 9999px;
          transition: transform 0.2s ease, filter 0.2s ease;
          box-shadow: 0 0 32px var(--accent-fill-25);
        }

        .ab-cta-btn:hover {
          transform: scale(1.04);
          filter: brightness(1.08);
        }

        .ab-cta-btn:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
        }

        /* ─────────────────────────────────────
           RESPONSIVE
        ───────────────────────────────────── */

        @media (max-width: 900px) {
          .ab-carousel-row {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-top: 32px;
            padding-bottom: 32px;
            gap: 12px;
          }
          .ab-carousel-card {
            flex: 0 0 calc(33.333% - 8px);
            scroll-snap-align: start;
          }
          .ab-story-inner {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .ab-story-label-col {
            flex-direction: row;
            align-items: center;
            position: static;
            gap: 12px;
          }

          .ab-label-line {
            width: 40px;
            height: 1px;
            background: var(--gradient-accent-line);
          }

          .ab-team-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .ab-values-grid {
            grid-template-columns: 1fr;
          }

          .ab-value-item {
            border-right: none;
            border-bottom: 1px solid var(--border-default);
          }

          .ab-value-item:last-child {
            border-bottom: none;
          }
        }

        @media (max-width: 600px) {
          .ab-hero-title {
            font-size: clamp(32px, 9vw, 48px);
          }
        }

      `}</style>
    </>
  );
}
