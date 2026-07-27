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
import JsonLd from "@/components/seo/JsonLd";

import { BASE_URL } from "@/lib/constants";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Digital Growth Agency in Hyderabad",
  description:
    "VeXtiv builds fast websites, branding, local SEO, QR systems, and content for restaurants, cafes, startups, and local businesses in Hyderabad.",
  openGraph: {
    title: "Digital Growth Agency in Hyderabad",
    description:
      "VeXtiv builds fast websites, branding, local SEO, QR systems, and content for restaurants, cafes, startups, and local businesses in Hyderabad.",
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
const homePageSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Digital Growth Agency in Hyderabad",
  url: BASE_URL,
  description:
    "VeXtiv builds fast websites, branding, local SEO, QR systems, and content for restaurants, cafes, startups, and local businesses in Hyderabad.",
  isPartOf: {
    "@type": "WebSite",
    name: "VeXtiv",
    url: BASE_URL,
  },
};

function HomeSeoContent() {
  return (
    <section className="home-seo" aria-labelledby="home-seo-heading">
      <div className="home-seo__inner">
        <p className="home-seo__eyebrow">Digital growth in Hyderabad</p>
        <h2 id="home-seo-heading" className="home-seo__heading">
          Strategy, design, and local SEO for brands that need more than a nice-looking site.
        </h2>

        <div className="home-seo__prose">
          <p>
            Vextiv builds websites, branding, content, local SEO, and conversion-focused systems for restaurants, cafes, startups, and local service businesses. The goal is simple: help people find you, trust you, and take the next step.
          </p>

          <p>
            If you want to see how the work fits together, explore our <Link href="/services">services</Link>, browse recent <Link href="/work">work</Link>, or check <Link href="/pricing">pricing</Link> before starting a conversation.
          </p>
        </div>
      </div>

      <style>{`
        .home-seo {
          background: var(--bg-base);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          padding: 72px clamp(24px, 4vw, 64px);
        }

        .home-seo__inner {
          max-width: 960px;
          margin: 0 auto;
        }

        .home-seo__eyebrow {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow);
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 14px;
        }

        .home-seo__heading {
          font-family: var(--font-display);
          font-size: clamp(28px, 3.6vw, 46px);
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          line-height: 1.1;
          color: var(--text-primary);
          margin-bottom: 18px;
        }

        .home-seo__prose {
          display: grid;
          gap: 14px;
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.75;
        }

        .home-seo__prose a {
          color: var(--text-primary);
          text-decoration: underline;
          text-decoration-color: rgba(200, 240, 77, 0.45);
          text-decoration-thickness: 1px;
          text-underline-offset: 4px;
          transition: color 180ms ease, text-decoration-color 180ms ease;
        }

        .home-seo__prose a:hover {
          color: var(--accent);
          text-decoration-color: var(--accent);
        }

        @media (max-width: 980px) {
          .home-seo {
            padding: 56px 20px;
          }
        }
      `}</style>
    </section>
  );
}

export default function Home() {
  return (
    <div style={{ position: "relative" }}>
      <JsonLd schema={homePageSchema} />
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
