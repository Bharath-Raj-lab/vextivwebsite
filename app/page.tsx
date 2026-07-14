import type { Metadata } from "next";
import Link from "next/link";

import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import ServicesPreview from "@/components/sections/ServicesPreview";
import WhyVextiv from "@/components/sections/WhyVextiv";
import Process from "@/components/sections/Process";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Testimonials from "@/components/sections/Testimonials";
import PremiumCTA from "@/components/sections/PremiumCTA";
import ScrollDepthTracker from "@/components/sections/ScrollDepthTracker";

import { BASE_URL } from "@/lib/constants";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "VeXtiv Digital Growth Agency | Websites, Branding & Local SEO",
  description:
    "VeXtiv builds growth-focused websites, branding, local SEO, QR systems, and content for Hyderabad restaurants, startups, and local businesses.",
  openGraph: {
    title: "VeXtiv Digital Growth Agency | Websites, Branding & Local SEO",
    description:
      "VeXtiv builds growth-focused websites, branding, local SEO, QR systems, and content for Hyderabad restaurants, startups, and local businesses.",
    url: BASE_URL,
    siteName: "VeXtiv",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

// ─── Home Page (Server Component root) ────────────────────────────────────────
const HOME_LINKS = [
  {
    href: "/services",
    label: "Services",
    description: "Website design, branding, local SEO, content, social, and QR systems.",
  },
  {
    href: "/work",
    label: "Work",
    description: "Examples of strategy, design direction, and launch-ready execution.",
  },
  {
    href: "/pricing",
    label: "Pricing",
    description: "Package ranges for focused fixes, full builds, and ongoing growth.",
  },
  {
    href: "/about",
    label: "About",
    description: "How Vextiv thinks about clarity, craft, performance, and momentum.",
  },
  {
    href: "/blog",
    label: "Blog",
    description: "Practical notes on websites, search, content, and digital operations.",
  },
  {
    href: "/audit",
    label: "Free Audit",
    description: "A quick way to spot visibility, conversion, and technical gaps.",
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Start a project conversation with your goals, timeline, and website.",
  },
] as const;

function HomeSeoContent() {
  return (
    <section className="home-copy" aria-labelledby="home-copy-heading">
      <div className="home-copy__inner">
        <div className="home-copy__body">
          <p className="home-copy__eyebrow">Digital Growth Agency in Hyderabad</p>
          <h2 id="home-copy-heading" className="home-copy__heading">
            Digital growth that connects strategy, design, and local demand.
          </h2>

          <div className="home-copy__prose">
            <p>
              Vextiv is a digital growth agency in Hyderabad for restaurants,
              cafes, startups, local service businesses, and founder-led brands
              that need more than a good-looking page. We plan, design, and
              build online systems that make it easier for people to discover
              you, trust you, and take the next step. That usually starts with a
              fast website, but the work often includes brand identity, local
              SEO, content, social media, QR menu systems, analytics, and
              follow-up flows that turn attention into enquiries.
            </p>

            <p>
              A homepage should answer practical questions quickly: what do you
              do, who is it for, why should a visitor believe you, and what can
              they do next? That is how we approach client projects too. On our{" "}
              <Link href="/services">services page</Link>, you can see how
              website design, branding, content creation, SEO, and QR systems
              fit together. If you want proof before process, our{" "}
              <Link href="/work">work page</Link> shows examples of strategy
              and creative direction across different business types. If budget
              is the first question, the{" "}
              <Link href="/pricing">pricing page</Link> explains package ranges
              so a planning conversation starts with realistic expectations.
            </p>

            <p>
              For local businesses, visibility is rarely one channel. A diner
              may find a restaurant through Google Maps, scan a QR menu at the
              table, follow Instagram after a reel, and return through a search
              result weeks later. A startup founder may need a landing page that
              explains the offer, a brand system that looks credible, and
              content that helps sales conversations move faster. We map those
              moments, remove friction, and make sure each asset supports the
              same business goal instead of living as a disconnected
              deliverable.
            </p>

            <p>
              We also keep the work measurable. Before building, we clarify the
              action that matters: calls, bookings, WhatsApp enquiries, form
              submissions, store visits, demo requests, or repeat purchases.
              During design and development, we protect speed, mobile usability,
              accessibility, copy clarity, and technical SEO. After launch, we
              review performance signals and improve the pages, content, and
              calls to action that are responsible for growth. That is why our{" "}
              <Link href="/audit">free audit</Link> is useful even if you are
              not ready for a full project yet; it gives you a practical view of
              what is helping, what is leaking attention, and what should be
              fixed first.
            </p>

            <p>
              If you are comparing partners, start with the{" "}
              <Link href="/about">about page</Link> to understand how we think,
              then read the <Link href="/blog">blog</Link> for practical notes
              on websites, search, and digital operations. When you are ready to
              turn the conversation into a plan,{" "}
              <Link href="/contact">contact us</Link> with your goals, current
              website, timeline, and the main outcome you want. We will help you
              decide whether you need a focused fix, a full website build, a
              brand refresh, or a more complete growth system.
            </p>
          </div>
        </div>

        <aside className="home-copy__links" aria-label="Explore Vextiv pages">
          <p className="home-copy__links-eyebrow">Explore</p>
          <h3 className="home-copy__links-heading">Main pages</h3>
          <ul className="home-copy__link-list">
            {HOME_LINKS.map((item) => (
              <li key={item.href} className="home-copy__link-item">
                <Link href={item.href} className="home-copy__link">
                  <span>{item.label}</span>
                  <small>{item.description}</small>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <style>{`
        .home-copy {
          background: var(--bg-base);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          padding: 96px clamp(24px, 4vw, 64px);
        }

        .home-copy__inner {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 360px;
          gap: clamp(40px, 7vw, 88px);
          align-items: start;
        }

        .home-copy__body {
          max-width: 760px;
        }

        .home-copy__eyebrow,
        .home-copy__links-eyebrow {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow);
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 16px;
        }

        .home-copy__heading {
          font-family: var(--font-display);
          font-size: clamp(30px, 4vw, 52px);
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          line-height: 1.08;
          color: var(--text-primary);
          margin-bottom: 28px;
        }

        .home-copy__prose {
          display: grid;
          gap: 18px;
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.75;
        }

        .home-copy__prose a {
          color: var(--text-primary);
          text-decoration: underline;
          text-decoration-color: rgba(200, 240, 77, 0.45);
          text-decoration-thickness: 1px;
          text-underline-offset: 4px;
          transition: color 180ms ease, text-decoration-color 180ms ease;
        }

        .home-copy__prose a:hover {
          color: var(--accent);
          text-decoration-color: var(--accent);
        }

        .home-copy__links {
          position: sticky;
          top: 108px;
          border: 1px solid var(--border-default);
          border-radius: 8px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.015));
          padding: 24px;
        }

        .home-copy__links-heading {
          font-family: var(--font-display);
          font-size: 24px;
          line-height: 1.2;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .home-copy__link-list {
          display: grid;
          gap: 10px;
          list-style: none;
        }

        .home-copy__link {
          display: grid;
          gap: 4px;
          padding: 14px 0;
          border-top: 1px solid var(--border-subtle);
          text-decoration: none;
        }

        .home-copy__link span {
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
        }

        .home-copy__link small {
          color: var(--text-muted);
          font-family: var(--font-body);
          font-size: 13px;
          line-height: 1.5;
        }

        .home-copy__link:hover span {
          color: var(--accent);
        }

        @media (max-width: 980px) {
          .home-copy {
            padding: 72px 20px;
          }

          .home-copy__inner {
            grid-template-columns: 1fr;
          }

          .home-copy__body {
            max-width: none;
          }

          .home-copy__links {
            position: static;
          }
        }
      `}</style>
    </section>
  );
}

export default function Home() {
  return (
    <div style={{ position: "relative" }}>
      <Hero />
      <TrustBar />
      <HomeSeoContent />
      <ServicesPreview />
      <WhyVextiv />
      <Process />
      <FeaturedWork />
      <Testimonials />
      <PremiumCTA />
      <ScrollDepthTracker />
    </div>
  );
}
