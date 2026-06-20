import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// ─── SSG: no dynamic segments, statically generated at build time ─────────────
export const dynamic = "force-static";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://vextiv.com"),
  title: "About Vextiv Studio | Hyderabad Digital Agency",
  description:
    "We're a digital studio founded in Hyderabad with one purpose: to give local businesses the online presence they deserve. Meet the team behind Vextiv Studio.",
  openGraph: {
    title: "About Vextiv Studio | Hyderabad Digital Agency",
    description:
      "We're a digital studio founded in Hyderabad with one purpose: to give local businesses the online presence they deserve. Meet the team behind Vextiv Studio.",
    url: "https://vextiv.com/about",
    siteName: "Vextiv Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://vextiv.com/about",
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly photo: string;
  readonly photoAlt: string;
}

interface Value {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly icon: string;
}

const STORY_PARAGRAPHS: readonly string[] = [
  "Vextiv Studio was born in Hyderabad out of a simple frustration: too many brilliant local businesses were invisible online. Restaurants with incredible food, boutiques with unique products, service providers with real talent — all underselling themselves with outdated websites, inconsistent branding, or no digital presence at all. We started Vextiv to fix that.",
  "From day one, we chose to stay close to home. Hyderabad's business community is fast-moving, deeply entrepreneurial, and fiercely loyal to quality. That energy shaped how we work — we move quickly, we stay direct, and we care about outcomes more than aesthetics for their own sake. Every project we take on is built to perform.",
  "Today we serve restaurants, startups, service businesses, and growing brands across the city and beyond. We're a small studio by design — it keeps us focused, keeps our work personal, and keeps our clients from becoming ticket numbers. We know the people we work with. That matters to us.",
];

const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    id: "ganesh",
    name: "Ganesh Raj",
    role: "Founder & Strategy",
    bio: "Ganesh started Vextiv with a conviction that local businesses deserve world-class digital work. He leads client relationships, strategy, and overall creative direction — making sure every project delivers real business results, not just a pretty deliverable.",
    photo: "/team/ganesh.png",
    photoAlt: "Ganesh Raj, Founder of Vextiv Studio",
  },
  {
    id: "priya",
    name: "Priya Sharma",
    role: "Lead Designer",
    bio: "Priya is the visual mind behind Vextiv's work. She brings a meticulous eye to brand identity, UI, and content design — turning briefs into experiences that feel both intentional and effortless. She believes great design should be invisible until the moment it isn't.",
    photo: "/team/priya.png",
    photoAlt: "Priya Sharma, Lead Designer at Vextiv Studio",
  },
  {
    id: "arjun",
    name: "Arjun Mehta",
    role: "Developer & Tech Lead",
    bio: "Arjun builds everything that lives under the surface — fast, accessible, and built to last. From Next.js sites to QR ordering systems, he writes code that holds up under real-world conditions and doesn't need to be rewritten in six months.",
    photo: "/team/arjun.png",
    photoAlt: "Arjun Mehta, Developer at Vextiv Studio",
  },
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

// ─── Section: Team ────────────────────────────────────────────────────────────
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

        {/* Cards grid */}
        <ul className="ab-team-grid" role="list">
          {TEAM_MEMBERS.map((member) => (
            <li key={member.id} className="ab-team-card">
              {/* Photo */}
              <div className="ab-team-photo-wrap">
                <Image
                  src={member.photo}
                  alt={member.photoAlt}
                  width={480}
                  height={480}
                  className="ab-team-photo"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                />
                {/* Accent corner glow */}
                <div className="ab-team-photo-glow" aria-hidden="true" />
              </div>

              {/* Meta */}
              <div className="ab-team-meta">
                <h3 className="ab-team-name">{member.name}</h3>
                <p className="ab-team-role">{member.role}</p>
                <p className="ab-team-bio">{member.bio}</p>
              </div>
            </li>
          ))}
        </ul>
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
    <section className="ab-cta-section" aria-label="Get in touch with Vextiv Studio">
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
        <Link href="/contact" className="ab-cta-btn" aria-label="Start a project with Vextiv Studio">
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
           TEAM
        ───────────────────────────────────── */

        .ab-team-section {
          background-color: var(--bg-base);
        }

        .ab-team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .ab-team-card {
          display: flex;
          flex-direction: column;
          background-color: var(--bg-surface-1);
          border: 1px solid var(--border-default);
          border-radius: 20px;
          overflow: hidden;
          transition: border-color 0.3s ease, transform 0.3s ease;
        }

        .ab-team-card:hover {
          border-color: var(--accent-border-hover);
          transform: translateY(-4px);
        }

        .ab-team-photo-wrap {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }

        .ab-team-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .ab-team-card:hover .ab-team-photo {
          transform: scale(1.04);
        }

        .ab-team-photo-glow {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60%;
          background: linear-gradient(
            to top,
            var(--bg-surface-1) 0%,
            transparent 100%
          );
          pointer-events: none;
        }

        .ab-team-meta {
          padding: 28px 28px 32px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .ab-team-name {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .ab-team-role {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 400;
          color: var(--text-muted);
          letter-spacing: 0.02em;
          margin-bottom: 12px;
        }

        .ab-team-bio {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 300;
          line-height: var(--leading-body);
          color: var(--text-secondary);
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
          .ab-team-grid {
            grid-template-columns: 1fr;
          }

          .ab-hero-title {
            font-size: clamp(32px, 9vw, 48px);
          }
        }

      `}</style>
    </>
  );
}
