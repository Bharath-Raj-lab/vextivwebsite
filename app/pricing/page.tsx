import type { Metadata } from "next";
import PricingFaqAccordion from "./PricingFaqAccordion";
import { PricingCtaLink, AddonCtaLink, BottomCtaLink } from "./PricingCtaLinks";

// ─── Metadata (SSG, Server Component) ─────────────────────────────────────────
export const metadata: Metadata = {
  title: "Pricing | VeXtiv",
  description:
    "Transparent pricing for websites, QR ordering systems, social media management, and branding in Hyderabad. Honest packages, no hidden fees.",
};

// Force static generation
export const dynamic = "force-static";

// ─── Types ────────────────────────────────────────────────────────────────────
interface PricingTier {
  id: string;
  name: string;
  price: string;
  pricePrefix?: string;       // "Starting from"
  priceSuffix?: string;       // "/month"
  hostingLine?: string;       // e.g. "₹999/month hosting & maintenance"
  oneTimeNote?: string;       // e.g. "One-time fee · no recurring charges"
  isPopular?: boolean;
  inclusions: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaPlan: string;            // trackEvent param
}

interface ServiceSection {
  id: string;
  eyebrow: string;
  heading: string;
  tiers: PricingTier[];
}

interface AdditionalService {
  id: string;
  name: string;
  priceLabel: string;
  description: string;
  ctaHref: string;
  ctaPlan: string;
}

// ─── Pricing data (PRD §4.2–4.6) ─────────────────────────────────────────────

// §4.2 — Website Development
const WEBSITE_TIERS: PricingTier[] = [
  {
    id: "web-starter",
    name: "Starter",
    price: "₹19,999",
    hostingLine: "₹999/month hosting & maintenance",
    isPopular: false,
    inclusions: [
      "Up to 5 pages",
      "Mobile-responsive design",
      "Contact form integration",
      "Basic on-page SEO",
      "Google Analytics setup",
      "1 round of revisions",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact",
    ctaPlan: "Starter Website",
  },
  {
    id: "web-business",
    name: "Business",
    price: "₹34,999",
    hostingLine: "₹999/month hosting & maintenance",
    isPopular: true,
    inclusions: [
      "Up to 10 pages",
      "Custom UI/UX design",
      "Blog or news section",
      "Lead generation forms",
      "Full on-page SEO setup",
      "Google Analytics & Search Console",
      "Performance optimisation",
      "2 rounds of revisions",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact",
    ctaPlan: "Business Website",
  },
  {
    id: "web-premium",
    name: "Premium",
    price: "₹59,999+",
    pricePrefix: "Starting from",
    hostingLine: "₹999/month hosting & maintenance",
    isPopular: false,
    inclusions: [
      "Unlimited pages",
      "Bespoke design system",
      "Advanced animations & interactions",
      "E-commerce or booking integrations",
      "Custom CMS integration",
      "Advanced SEO & schema markup",
      "Priority support & delivery",
      "Unlimited revisions during project",
    ],
    ctaLabel: "Let's Talk",
    ctaHref: "/contact",
    ctaPlan: "Premium Website",
  },
  {
    id: "web-landing",
    name: "Landing Page",
    price: "₹9,999",
    pricePrefix: "Starting from",
    hostingLine: "₹999/month hosting & maintenance",
    isPopular: false,
    inclusions: [
      "Single conversion-focused page",
      "Mobile-responsive design",
      "Lead capture form",
      "Basic SEO setup",
      "Fast delivery (5–7 business days)",
      "1 round of revisions",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact",
    ctaPlan: "Landing Page",
  },
];

// §4.3 — QR Ordering Systems
const QR_TIERS: PricingTier[] = [
  {
    id: "qr-essential",
    name: "Essential",
    price: "₹14,999",
    hostingLine: "₹999/month hosting & maintenance",
    isPopular: false,
    inclusions: [
      "Digital menu with QR code",
      "Up to 50 menu items",
      "Table-scan ordering flow",
      "Basic order dashboard",
      "Menu updates portal",
      "WhatsApp order notifications",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact",
    ctaPlan: "Essential QR System",
  },
  {
    id: "qr-smart",
    name: "Smart",
    price: "₹24,999",
    hostingLine: "₹999/month hosting & maintenance",
    isPopular: true,
    inclusions: [
      "Everything in Essential",
      "Unlimited menu items",
      "Category & modifier support",
      "Real-time order management",
      "Customer-facing order tracker",
      "Sales analytics dashboard",
      "Multi-language menu support",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact",
    ctaPlan: "Smart QR System",
  },
  {
    id: "qr-premium",
    name: "Premium",
    price: "₹39,999+",
    pricePrefix: "Starting from",
    hostingLine: "₹999/month hosting & maintenance",
    isPopular: false,
    inclusions: [
      "Everything in Smart",
      "Online payment gateway integration",
      "Loyalty & rewards system",
      "Custom branded experience",
      "Multi-outlet management",
      "Inventory tracking",
      "Priority support & SLA",
    ],
    ctaLabel: "Let's Talk",
    ctaHref: "/contact",
    ctaPlan: "Premium QR System",
  },
];

// §4.4 — Social Media Management
const SOCIAL_TIERS: PricingTier[] = [
  {
    id: "social-starter",
    name: "Starter",
    price: "₹9,999",
    priceSuffix: "/month",
    isPopular: false,
    inclusions: [
      "1 platform (Instagram or Facebook)",
      "8 posts per month",
      "Content calendar",
      "Basic caption copywriting",
      "Monthly performance report",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact",
    ctaPlan: "Starter Social Media",
  },
  {
    id: "social-growth",
    name: "Growth",
    price: "₹19,999",
    priceSuffix: "/month",
    isPopular: true,
    inclusions: [
      "2 platforms (Instagram + Facebook or LinkedIn)",
      "16 posts per month",
      "Reels & carousels",
      "Full caption copywriting",
      "Community engagement & replies",
      "Competitor analysis",
      "Bi-weekly performance report",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact",
    ctaPlan: "Growth Social Media",
  },
  {
    id: "social-scale",
    name: "Scale",
    price: "₹34,999",
    priceSuffix: "/month",
    isPopular: false,
    inclusions: [
      "3 platforms (Instagram, Facebook, LinkedIn)",
      "24 posts per month",
      "Reels, carousels & stories",
      "Full content strategy",
      "Active community management",
      "Influencer coordination",
      "Weekly performance report",
      "Paid ad creative support",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact",
    ctaPlan: "Scale Social Media",
  },
];

// §4.5 — Branding & Identity
const BRANDING_TIERS: PricingTier[] = [
  {
    id: "brand-starter",
    name: "Starter",
    price: "₹7,999",
    oneTimeNote: "One-time fee · no recurring charges",
    isPopular: false,
    inclusions: [
      "Logo design (2 concepts)",
      "Primary brand colour palette",
      "Font selection",
      "Business card design",
      "Final files in all formats (PNG, SVG, PDF)",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact",
    ctaPlan: "Starter Branding",
  },
  {
    id: "brand-business",
    name: "Business",
    price: "₹14,999",
    oneTimeNote: "One-time fee · no recurring charges",
    isPopular: true,
    inclusions: [
      "Logo design (4 concepts + refinement)",
      "Full brand colour system",
      "Typography system",
      "Business card, letterhead & email signature",
      "Social media profile & cover art",
      "Brand guidelines document (PDF)",
      "Final files in all formats",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact",
    ctaPlan: "Business Branding",
  },
  {
    id: "brand-complete",
    name: "Complete",
    price: "₹24,999",
    oneTimeNote: "One-time fee · no recurring charges",
    isPopular: false,
    inclusions: [
      "Everything in Business",
      "Brand voice & messaging guide",
      "Icon set & illustration style",
      "Packaging or signage mockups",
      "Social media templates (Canva/Figma)",
      "Comprehensive brand identity deck",
      "Unlimited revisions during project",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact",
    ctaPlan: "Complete Branding",
  },
];

// §4.6 — Additional Services
const ADDITIONAL_SERVICES: AdditionalService[] = [
  {
    id: "add-local-seo",
    name: "Local SEO Setup",
    priceLabel: "Starting from ₹4,999",
    description:
      "Full local SEO foundation — keyword research, on-page optimisation, citation building, and Google Business Profile integration so your business ranks in local searches.",
    ctaHref: "/contact",
    ctaPlan: "Local SEO Setup",
  },
  {
    id: "add-gbp",
    name: "Google Business Profile Optimisation",
    priceLabel: "Starting from ₹4,999",
    description:
      "Complete setup and optimisation of your Google Business Profile: categories, attributes, photo strategy, review response templates, and Q&A — so you show up where it matters most.",
    ctaHref: "/contact",
    ctaPlan: "Google Business Profile Optimisation",
  },
  {
    id: "add-ai",
    name: "AI Integration & Automation",
    priceLabel: "Starting from ₹14,999",
    description:
      "Custom AI-powered workflows for your business — chatbots, lead qualification, automated follow-ups, and intelligent process automation tailored to your operations.",
    ctaHref: "/contact",
    ctaPlan: "AI Integration & Automation",
  },
];

// ─── Shared icons ─────────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="true"
      className="pricing-check-icon"
    >
      <circle
        cx="7.5"
        cy="7.5"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <polyline
        points="4.5,8 6.5,10 10.5,5.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── CTA rendering delegates to client wrappers in PricingCtaLinks.tsx ──────

// ─── Pricing card ─────────────────────────────────────────────────────────────
function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={`pricing-card${tier.isPopular ? " pricing-card--popular" : ""}`}
      aria-label={`${tier.name} plan`}
    >
      {/* Popular badge */}
      {tier.isPopular && (
        <div className="pricing-popular-badge" aria-label="Most Popular plan">
          ⭐ Most Popular
        </div>
      )}

      {/* Tier name */}
      <div className="pricing-card-header">
        <h3 className="pricing-tier-name">{tier.name}</h3>
      </div>

      {/* Price block */}
      <div className="pricing-price-block">
        {tier.pricePrefix && (
          <p className="pricing-price-prefix">{tier.pricePrefix}</p>
        )}
        <div className="pricing-price-row">
          <span className="pricing-price">{tier.price}</span>
          {tier.priceSuffix && (
            <span className="pricing-price-suffix">{tier.priceSuffix}</span>
          )}
        </div>

        {/* Hosting line — visually separated, smaller weight */}
        {tier.hostingLine && (
          <p className="pricing-hosting-line">{tier.hostingLine}</p>
        )}

        {/* One-time note for Branding */}
        {tier.oneTimeNote && (
          <p className="pricing-one-time-note">{tier.oneTimeNote}</p>
        )}
      </div>

      {/* Divider */}
      <div className="pricing-divider" aria-hidden="true" />

      {/* Inclusions */}
      <ul className="pricing-inclusions" role="list">
        {tier.inclusions.map((item, i) => (
          <li key={i} className="pricing-inclusion-item">
            <CheckIcon />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="pricing-card-footer">
        <PricingCtaLink
          href={tier.ctaHref}
          label={tier.ctaLabel}
          plan={tier.ctaPlan}
          variant={tier.isPopular ? "popular" : "default"}
        />
      </div>
    </div>
  );
}

// ─── Service group ────────────────────────────────────────────────────────────
function ServiceGroup({
  section,
  tiers,
}: {
  section: ServiceSection;
  tiers: PricingTier[];
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="pricing-service-group"
    >
      <div className="pricing-group-header">
        <p className="pricing-group-eyebrow">{section.eyebrow}</p>
        <h2
          id={`${section.id}-heading`}
          className="pricing-group-heading"
        >
          {section.heading}
        </h2>
      </div>

      <div className={`pricing-cards-grid pricing-cards-grid--${tiers.length}`}>
        {tiers.map((tier) => (
          <PricingCard key={tier.id} tier={tier} />
        ))}
      </div>
    </section>
  );
}

// ─── Page hero ────────────────────────────────────────────────────────────────
function PricingHero() {
  return (
    <div className="pricing-hero">
      <div className="pricing-hero-glow" aria-hidden="true" />
      <div className="pricing-hero-grid" aria-hidden="true" />
      <div className="pricing-hero-inner">
        <p className="pricing-hero-eyebrow">Transparent Pricing</p>
        <h1 className="pricing-hero-title">
          Honest prices.{" "}
          <span className="pricing-hero-accent">No surprises.</span>
        </h1>
        <p className="pricing-hero-subtitle">
          Every plan is priced to deliver real value for Hyderabad businesses.
          No hidden fees, no lock-in contracts — just clear deliverables and
          fair rates.
        </p>

        {/* Jump nav */}
        <nav aria-label="Jump to pricing section" className="pricing-jump-nav">
          <a href="#website-dev" className="pricing-jump-link">Websites</a>
          <a href="#qr-systems" className="pricing-jump-link">QR Ordering</a>
          <a href="#social-media" className="pricing-jump-link">Social Media</a>
          <a href="#branding" className="pricing-jump-link">Branding</a>
          <a href="#additional" className="pricing-jump-link">Add-ons</a>
        </nav>
      </div>
    </div>
  );
}

// ─── Additional services strip (§4.6) ─────────────────────────────────────────
function AdditionalServicesStrip() {
  return (
    <section
      id="additional"
      aria-labelledby="additional-heading"
      className="pricing-additional-section"
    >
      <div className="pricing-additional-inner">
        <div className="pricing-group-header">
          <p className="pricing-group-eyebrow">Add-On Services</p>
          <h2 id="additional-heading" className="pricing-group-heading">
            Expand your digital footprint
          </h2>
        </div>

        <div className="pricing-additional-grid">
          {ADDITIONAL_SERVICES.map((svc) => (
            <div key={svc.id} className="pricing-addon-card">
              <div className="pricing-addon-content">
                <h3 className="pricing-addon-name">{svc.name}</h3>
                <p className="pricing-addon-price">{svc.priceLabel}</p>
                <p className="pricing-addon-desc">{svc.description}</p>
              </div>
              <div className="pricing-addon-footer">
                <AddonCtaLink
                  href={svc.ctaHref}
                  plan={svc.ctaPlan}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ section (§4.7) ───────────────────────────────────────────────────────
function PricingFaq() {
  return (
    <section
      id="pricing-faq"
      aria-labelledby="faq-heading"
      className="pricing-faq-section"
    >
      <div className="pricing-faq-inner">
        <div className="pricing-group-header">
          <p className="pricing-group-eyebrow">FAQs</p>
          <h2 id="faq-heading" className="pricing-group-heading">
            Common questions answered
          </h2>
        </div>
        <PricingFaqAccordion />
      </div>
    </section>
  );
}

// ─── Bottom CTA band ──────────────────────────────────────────────────────────
function BottomCta() {
  return (
    <div className="pricing-bottom-cta">
      <div className="pricing-bottom-cta-inner">
        <p className="pricing-bottom-eyebrow">Still deciding?</p>
        <h2 className="pricing-bottom-title">
          Not sure which plan is right for you?
        </h2>
        <p className="pricing-bottom-body">
          Tell us about your business and budget — we&apos;ll recommend the
          best fit. No pressure, no jargon, no sales pitch.
        </p>
        <BottomCtaLink />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PricingPage() {
  // Service sections metadata
  const sections: Array<{ section: ServiceSection; tiers: PricingTier[] }> = [
    {
      section: {
        id: "website-dev",
        eyebrow: "Web Presence",
        heading: "Website Development",
        tiers: WEBSITE_TIERS,
      },
      tiers: WEBSITE_TIERS,
    },
    {
      section: {
        id: "qr-systems",
        eyebrow: "Hospitality Tech",
        heading: "QR Ordering Systems",
        tiers: QR_TIERS,
      },
      tiers: QR_TIERS,
    },
    {
      section: {
        id: "social-media",
        eyebrow: "Social Growth",
        heading: "Social Media Management",
        tiers: SOCIAL_TIERS,
      },
      tiers: SOCIAL_TIERS,
    },
    {
      section: {
        id: "branding",
        eyebrow: "Brand Strategy",
        heading: "Branding & Identity",
        tiers: BRANDING_TIERS,
      },
      tiers: BRANDING_TIERS,
    },
  ];

  return (
    <>
      <PricingHero />

      <div className="pricing-main">
        {sections.map(({ section, tiers }) => (
          <ServiceGroup key={section.id} section={section} tiers={tiers} />
        ))}
      </div>

      <AdditionalServicesStrip />
      <PricingFaq />
      <BottomCta />

      {/* ── Scoped styles ── */}
      <style>{`

        /* ═════════════════════════════════════════════════════
           PRICING PAGE — SCOPED STYLES
        ═════════════════════════════════════════════════════ */

        /* ── Hero ──────────────────────────────────────────── */

        .pricing-hero {
          position: relative;
          background-color: var(--bg-surface-0);
          padding: clamp(120px, 14vw, 180px) 0 clamp(72px, 8vw, 100px);
          overflow: hidden;
        }

        .pricing-hero-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 700px 420px at 50% 60%,
            var(--accent-fill-08) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .pricing-hero-grid {
          position: absolute;
          inset: 0;
          background-image: var(--gradient-dot-grid);
          background-size: var(--dot-grid-size);
          mask-image: radial-gradient(
            ellipse 80% 70% at 50% 50%,
            black,
            transparent
          );
          pointer-events: none;
          opacity: 0.6;
        }

        .pricing-hero-inner {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .pricing-hero-eyebrow {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 600;
          letter-spacing: var(--tracking-eyebrow-wide);
          text-transform: uppercase;
          color: var(--text-accent);
          margin-bottom: 20px;
        }

        .pricing-hero-title {
          font-family: var(--font-display);
          font-size: var(--text-section);
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-tight);
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .pricing-hero-accent {
          color: var(--text-accent);
        }

        .pricing-hero-subtitle {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          font-weight: 300;
          line-height: var(--leading-body);
          color: var(--text-secondary);
          max-width: 600px;
          margin-bottom: 48px;
        }

        /* ── Jump nav ───────────────────────────────────────── */

        .pricing-jump-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }

        .pricing-jump-link {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          padding: 8px 18px;
          border-radius: 9999px;
          border: 1px solid var(--border-medium);
          background-color: var(--bg-surface-1);
          transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
          letter-spacing: 0.02em;
        }

        .pricing-jump-link:hover {
          color: var(--text-accent);
          border-color: var(--accent-border-hover);
          background-color: var(--accent-fill-08);
        }

        /* ── Main container ─────────────────────────────────── */

        .pricing-main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          display: flex;
          flex-direction: column;
          gap: clamp(80px, 10vw, 120px);
          padding-top: clamp(72px, 8vw, 96px);
          padding-bottom: clamp(48px, 6vw, 80px);
        }

        /* ── Service group ──────────────────────────────────── */

        .pricing-service-group {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .pricing-group-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
        }

        .pricing-group-eyebrow {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 600;
          letter-spacing: var(--tracking-eyebrow-wide);
          text-transform: uppercase;
          color: var(--text-accent);
        }

        .pricing-group-heading {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-tight);
          color: var(--text-primary);
        }

        /* ── Cards grid ─────────────────────────────────────── */

        .pricing-cards-grid {
          display: grid;
          gap: 20px;
        }

        .pricing-cards-grid--3 {
          grid-template-columns: repeat(3, 1fr);
        }

        .pricing-cards-grid--4 {
          grid-template-columns: repeat(4, 1fr);
        }

        @media (max-width: 1100px) {
          .pricing-cards-grid--4 {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 860px) {
          .pricing-cards-grid--3,
          .pricing-cards-grid--4 {
            grid-template-columns: 1fr;
          }
        }

        /* ── Pricing card ───────────────────────────────────── */

        .pricing-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-surface-2);
          border: 1px solid var(--border-default);
          border-radius: 16px;
          padding: 28px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }

        .pricing-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-2px);
          box-shadow: 0 12px 40px -8px rgba(0, 0, 0, 0.4);
        }

        .pricing-card--popular {
          background-color: var(--bg-surface-3);
          border-color: var(--accent-border-card);
          box-shadow: 0 0 0 1px var(--accent-border-card), 0 16px 48px -12px rgba(200, 240, 77, 0.08);
        }

        .pricing-card--popular:hover {
          border-color: var(--accent-border-hover);
          box-shadow: 0 0 0 1px var(--accent-border-hover), 0 20px 60px -12px rgba(200, 240, 77, 0.14);
          transform: translateY(-3px);
        }

        /* ── Popular badge ──────────────────────────────────── */

        .pricing-popular-badge {
          position: absolute;
          top: -1px;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          background-color: var(--accent);
          color: #000;
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 14px;
          border-radius: 9999px;
          white-space: nowrap;
          box-shadow: 0 4px 16px -4px rgba(200, 240, 77, 0.5);
        }

        /* ── Card header ────────────────────────────────────── */

        .pricing-card-header {
          margin-bottom: 20px;
          padding-top: 8px; /* space for popular badge */
        }

        .pricing-tier-name {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: var(--tracking-heading);
        }

        /* ── Price block ────────────────────────────────────── */

        .pricing-price-block {
          margin-bottom: 24px;
        }

        .pricing-price-prefix {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 400;
          color: var(--text-muted);
          margin-bottom: 4px;
          letter-spacing: 0.01em;
        }

        .pricing-price-row {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 8px;
        }

        .pricing-price {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: var(--tracking-heading);
          line-height: 1;
        }

        .pricing-price-suffix {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 400;
          color: var(--text-secondary);
          letter-spacing: 0;
        }

        /* Hosting line — visually distinct from main price */
        .pricing-hosting-line {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 400;
          color: var(--text-muted);
          margin-top: 6px;
          padding: 5px 10px;
          background-color: var(--accent-fill-08);
          border-radius: 6px;
          display: inline-block;
          border: 1px solid var(--accent-border-card);
        }

        /* One-time note for Branding */
        .pricing-one-time-note {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 500;
          color: var(--text-accent);
          margin-top: 6px;
          letter-spacing: 0.01em;
        }

        /* ── Divider ────────────────────────────────────────── */

        .pricing-divider {
          height: 1px;
          background-color: var(--border-subtle);
          margin-bottom: 20px;
        }

        /* ── Inclusions list ────────────────────────────────── */

        .pricing-inclusions {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
          margin-bottom: 24px;
        }

        .pricing-inclusion-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 400;
          color: var(--text-secondary);
          line-height: var(--leading-base);
        }

        .pricing-check-icon {
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--text-accent);
        }

        /* ── Card footer ────────────────────────────────────── */

        .pricing-card-footer {
          margin-top: auto;
        }

        /* ── CTA button ─────────────────────────────────────── */

        .pricing-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 12px 20px;
          border-radius: 10px;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: transform 0.2s ease, filter 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
        }

        .pricing-cta--default {
          background-color: var(--bg-surface-4);
          color: var(--text-primary);
          border: 1px solid var(--border-medium);
        }

        .pricing-cta--default:hover {
          background-color: var(--bg-surface-5);
          border-color: var(--border-hover);
          transform: translateY(-1px);
        }

        .pricing-cta--popular {
          background-color: var(--accent);
          color: #000;
          border: 1px solid transparent;
          box-shadow: 0 4px 16px -4px rgba(200, 240, 77, 0.4);
        }

        .pricing-cta--popular:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px -6px rgba(200, 240, 77, 0.5);
        }

        .pricing-cta--outline {
          background-color: transparent;
          color: var(--text-primary);
          border: 1px solid var(--border-medium);
        }

        .pricing-cta--outline:hover {
          background-color: var(--accent-fill-08);
          border-color: var(--accent-border-hover);
          transform: translateY(-1px);
        }

        .pricing-cta:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
        }

        /* ── Additional services section ────────────────────── */

        .pricing-additional-section {
          background-color: var(--bg-surface-1);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          padding: clamp(72px, 8vw, 96px) 0;
        }

        .pricing-additional-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .pricing-additional-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 860px) {
          .pricing-additional-grid {
            grid-template-columns: 1fr;
          }
        }

        .pricing-addon-card {
          display: flex;
          flex-direction: column;
          background-color: var(--bg-surface-2);
          border: 1px solid var(--border-default);
          border-radius: 16px;
          padding: 28px;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .pricing-addon-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-2px);
        }

        .pricing-addon-content {
          flex: 1;
          margin-bottom: 24px;
        }

        .pricing-addon-name {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: var(--tracking-heading);
          margin-bottom: 8px;
        }

        .pricing-addon-price {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 600;
          color: var(--text-accent);
          margin-bottom: 14px;
        }

        .pricing-addon-desc {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 400;
          color: var(--text-secondary);
          line-height: var(--leading-body);
        }

        .pricing-addon-footer {
          margin-top: auto;
        }

        .pricing-addon-cta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
          padding: 11px 20px;
          border-radius: 10px;
          border: 1px solid var(--border-medium);
          background-color: var(--bg-surface-4);
          transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
          width: 100%;
          justify-content: center;
        }

        .pricing-addon-cta:hover {
          border-color: var(--accent-border-hover);
          background-color: var(--accent-fill-08);
          color: var(--text-accent);
          transform: translateY(-1px);
        }

        .pricing-addon-cta:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
        }

        /* ── FAQ section ────────────────────────────────────── */

        .pricing-faq-section {
          padding: clamp(72px, 8vw, 96px) 0;
          background-color: var(--bg-surface-0);
        }

        .pricing-faq-inner {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        /* ── FAQ accordion ──────────────────────────────────── */

        .pfaq-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid var(--border-default);
          border-radius: 14px;
          overflow: hidden;
        }

        .pfaq-item {
          border-bottom: 1px solid var(--border-default);
        }

        .pfaq-item:last-child {
          border-bottom: none;
        }

        .pfaq-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 22px 24px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          gap: 16px;
          transition: background-color 0.15s ease;
        }

        .pfaq-trigger:hover {
          background-color: var(--accent-fill-08);
        }

        .pfaq-item--open .pfaq-trigger {
          background-color: var(--accent-fill-08);
        }

        .pfaq-trigger:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: -2px;
        }

        .pfaq-question {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 500;
          color: var(--text-primary);
          line-height: var(--leading-tight);
          flex: 1;
        }

        .pfaq-icon {
          flex-shrink: 0;
          color: var(--text-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease;
        }

        .pfaq-item--open .pfaq-icon {
          transform: rotate(45deg);
        }

        .pfaq-chevron {
          display: block;
        }

        .pfaq-vertical-line {
          transform-origin: center;
          transition: opacity 0.25s ease;
        }

        .pfaq-item--open .pfaq-vertical-line {
          opacity: 0;
        }

        .pfaq-panel {
          padding: 0 24px 22px;
        }

        .pfaq-panel[hidden] {
          display: none;
        }

        .pfaq-answer {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 400;
          color: var(--text-secondary);
          line-height: var(--leading-body);
        }

        /* ── Bottom CTA band ────────────────────────────────── */

        .pricing-bottom-cta {
          background-color: var(--bg-surface-1);
          border-top: 1px solid var(--border-subtle);
          padding: clamp(72px, 8vw, 96px) 0;
        }

        .pricing-bottom-cta-inner {
          max-width: 680px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
        }

        .pricing-bottom-eyebrow {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 600;
          letter-spacing: var(--tracking-eyebrow-wide);
          text-transform: uppercase;
          color: var(--text-accent);
        }

        .pricing-bottom-title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          color: var(--text-primary);
          line-height: var(--leading-tight);
        }

        .pricing-bottom-body {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 300;
          line-height: var(--leading-body);
          color: var(--text-secondary);
          max-width: 480px;
        }

        .pricing-bottom-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
          padding: 14px 28px;
          background-color: var(--accent);
          color: #000;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 700;
          letter-spacing: 0.01em;
          border-radius: 9999px;
          text-decoration: none;
          box-shadow: 0 4px 20px -4px rgba(200, 240, 77, 0.4);
          transition: transform 0.2s ease, filter 0.2s ease;
        }

        .pricing-bottom-btn:hover {
          transform: scale(1.03);
          filter: brightness(1.08);
        }

        .pricing-bottom-btn:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
        }

        /* ── Responsive tweaks ──────────────────────────────── */

        @media (max-width: 600px) {
          .pricing-card {
            padding: 22px 18px;
          }

          .pricing-addon-card {
            padding: 22px 18px;
          }

          .pfaq-trigger {
            padding: 18px 18px;
          }

          .pfaq-panel {
            padding: 0 18px 18px;
          }

          .pricing-price {
            font-size: var(--text-2xl);
          }
        }

      `}</style>
    </>
  );
}
