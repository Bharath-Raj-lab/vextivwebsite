import type { Metadata } from "next";
import Link from "next/link";
import PageBackground from "@/components/ui/PageBackground";

// ─── SSG: no dynamic segments, statically generated at build time ─────────────
export const dynamic = "force-static";

import { BASE_URL } from "@/lib/constants";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "About VeXtiv | Hyderabad Digital Agency",
  description:
    "We're a digital studio founded in Hyderabad with one purpose: to give local businesses the online presence they deserve. Meet the team behind VeXtiv.",
  openGraph: {
    title: "About VeXtiv | Hyderabad Digital Agency",
    description:
      "We're a digital studio founded in Hyderabad with one purpose: to give local businesses the online presence they deserve. Meet the team behind VeXtiv.",
    url: `${BASE_URL}/about`,
    siteName: "VeXtiv",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: `${BASE_URL}/about`,
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
      <PageBackground />
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
  { id: "1", name: "Maya", role: "Design Lead", image: "/team/avatar_priya.webp", isLeadership: false },
  { id: "2", name: "Sowmya", role: "Product Manager", image: "/team/avatar_maya.webp", isLeadership: false },
  { id: "3", name: "Sarah", role: "UX Researcher", image: "/team/avatar_sarah.webp", isLeadership: false },
  { id: "4", name: "Bathini Ganesh", role: "Co-Founder & CTO", image: "/team/avatar_ganesh.webp", isLeadership: true },
  { id: "5", name: "Alloney Bharath Raj", role: "Founder & CEO", image: "/team/avatar_bharath.webp", isLeadership: true },
  { id: "6", name: "Yoganandh", role: "Co-Founder & COO", image: "/team/avatar_yoganandh.webp", isLeadership: true },
  { id: "7", name: "Rohan", role: "Data Wrangler", image: "/team/avatar_rohan.webp", isLeadership: false },
  { id: "8", name: "Vishnu", role: "Frontend Dev", image: "/team/avatar_david.webp", isLeadership: false },
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
                    var target = el.children[4];
                    if (target) {
                      var centerOffset = (target.offsetLeft - el.offsetLeft) - (el.clientWidth / 2) + (target.clientWidth / 2);
                      el.scrollLeft = centerOffset;
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
    <section className="ab-section ab-timeline-section" aria-labelledby="ab-values-heading">
      <div className="ab-inner">
        {/* Header */}
        <div className="ab-section-hdr ab-timeline-hdr">
          <p className="ab-eyebrow">What We Stand For</p>
          <h2 id="ab-values-heading" className="ab-section-title">
            Three things we never compromise on.
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="ab-timeline-container">

          {/* Background SVG Path */}
          <div className="ab-timeline-svg-wrap">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="ab-timeline-svg">
              <path
                d="M 50,0 C 50,15 55,5 55,20 C 55,35 45,35 45,50 C 45,65 55,65 55,80 C 55,95 50,85 50,100"
                stroke="var(--accent)"
                strokeWidth="1.5"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* Items */}
          <div className="ab-timeline-items">
            {VALUES.map((val, i) => (
              <div key={val.id} className={`ab-timeline-item item-${i + 1}`}>
                <div className="ab-timeline-dot" aria-hidden="true"></div>
                <div className="ab-timeline-content">
                  <div className="ab-timeline-title-wrap">
                    <span className="ab-timeline-num">0{i + 1}.</span>
                    <h3 className="ab-timeline-title">{val.title}</h3>
                  </div>
                  <p className="ab-timeline-body">{val.body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
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
        <Link href="/contact" className="ab-cta-btn btn-premium" aria-label="Start a project with VeXtiv">
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
          padding: clamp(48px, 6vw, 80px) 0;
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
          margin-bottom: clamp(32px, 5vw, 56px);
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
          padding: clamp(120px, 14vw, 160px) 0 clamp(56px, 8vw, 80px);
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
           VALUES (TIMELINE)
        ───────────────────────────────────── */

        .ab-timeline-section {
          background-color: var(--bg-surface-1);
          border-top: 1px solid var(--border-subtle);
          overflow: hidden;
        }

        .ab-timeline-hdr {
          text-align: center;
          margin-bottom: clamp(40px, 6vw, 72px);
        }

        .ab-timeline-container {
          position: relative;
          width: 100%;
          height: 800px; /* Increased height for better vertical pacing */
        }

        .ab-timeline-svg-wrap {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .ab-timeline-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .ab-timeline-item {
          position: absolute;
          display: flex;
        }

        .ab-timeline-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--gradient-btn);
          box-shadow: 0 0 12px var(--accent-fill-25);
          z-index: 2;
          flex-shrink: 0;
        }

        .ab-timeline-content {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .ab-timeline-title-wrap {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 12px;
        }

        .ab-timeline-num {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text-accent);
          font-style: italic;
        }

        .ab-timeline-title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .ab-timeline-body {
          font-family: var(--font-body);
          font-size: var(--text-md);
          font-weight: 300;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 440px; /* Balanced text width */
        }

        /* Desktop Positioning */
        .ab-timeline-item.item-1 {
          top: 20%;
          right: 45%; /* Matches SVG path x=55 */
          left: 0;
          transform: translateY(-50%);
          padding-right: 40px; /* More space from dot to text */
        }
        .item-1 .ab-timeline-dot {
          position: absolute;
          right: -5px;
          top: 50%;
          transform: translateY(-50%);
        }
        .item-1 .ab-timeline-content {
          text-align: right;
          align-items: flex-end;
        }

        .ab-timeline-item.item-2 {
          top: 50%;
          left: 45%; /* Matches SVG path x=45 */
          right: 0;
          transform: translateY(-50%);
          padding-left: 40px;
        }
        .item-2 .ab-timeline-dot {
          position: absolute;
          left: -5px;
          top: 50%;
          transform: translateY(-50%);
        }
        .item-2 .ab-timeline-content {
          text-align: left;
          align-items: flex-start;
        }

        .ab-timeline-item.item-3 {
          top: 80%;
          right: 45%; /* Matches SVG path x=55 */
          left: 0;
          transform: translateY(-50%);
          padding-right: 40px;
        }
        .item-3 .ab-timeline-dot {
          position: absolute;
          right: -5px;
          top: 50%;
          transform: translateY(-50%);
        }
        .item-3 .ab-timeline-content {
          text-align: right;
          align-items: flex-end;
        }

        /* ─────────────────────────────────────
           CTA
        ───────────────────────────────────── */

        .ab-cta-section {
          position: relative;
          background-color: var(--bg-base);
          padding: clamp(56px, 10vw, 100px) 0;
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
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 16px 32px;
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

          .ab-timeline-container {
            height: auto;
            padding-left: 40px; 
            display: flex;
            flex-direction: column;
            gap: 48px;
            width: 100%;
          }
          .ab-timeline-svg-wrap {
            display: none;
          }
          .ab-timeline-container::before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 16px; 
            width: 2px;
            background: var(--accent);
            opacity: 0.3;
          }
          .ab-timeline-item {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            transform: none !important;
            padding: 0 !important;
            width: 100% !important;
          }
          .ab-timeline-dot {
            position: absolute !important;
            left: -28px !important; 
            top: 8px !important;
            right: auto !important;
            transform: none !important;
          }
          .item-1 .ab-timeline-content,
          .item-2 .ab-timeline-content,
          .item-3 .ab-timeline-content {
            text-align: left !important;
            align-items: flex-start !important;
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
