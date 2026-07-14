import type { Metadata } from "next";
import PricingFaqAccordion from "./PricingFaqAccordion";
import {
  PricingCtaLink,
  CustomSolutionCtaLink,
  BottomCtaLink,
} from "./PricingCtaLinks";
import PageBackground from "@/components/ui/PageBackground";

import { BASE_URL } from "@/lib/constants";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Pricing | VeXtiv",
  description:
    "Transparent pricing for websites, social media & branding in Hyderabad. No hidden fees, no lock-in — just clear deliverables and fair rates.",
  openGraph: {
    title: "Pricing | VeXtiv",
    description:
      "Transparent pricing for websites, social media & branding in Hyderabad. No hidden fees, no lock-in — just clear deliverables and fair rates.",
    url: `${BASE_URL}/pricing`,
    siteName: "VeXtiv",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: `${BASE_URL}/pricing`,
  },
};

export const dynamic = "force-static";

// ─── Types ────────────────────────────────────────────────────────────────────
interface PricingTier {
  id: string;
  name: string;
  price: string;
  pricePrefix?: string;
  priceSuffix?: string;
  hostingLine?: string;
  oneTimeNote?: string;
  isMostChosen?: boolean;
  tagline: string; // outcome headline
  whoIsThisFor: string[]; // customer profiles
  inclusions: string[]; // outcome-based
  ctaLabel: string;
  ctaHref: string;
  ctaPlan: string;
}

// ─── Website Development ──────────────────────────────────────────────────────
const WEBSITE_TIERS: PricingTier[] = [
  {
    id: "web-starter",
    name: "Starter",
    price: "₹14,999",
    hostingLine: "₹999/month hosting & maintenance",
    isMostChosen: false,
    tagline: "Get online and look credible fast.",
    whoIsThisFor: [
      "New businesses & startups",
      "Personal brands",
      "Small local businesses",
    ],
    inclusions: [
      "Professional 5-page website ready to impress",
      "Mobile-optimised design that works on every device",
      "Contact & enquiry form connected to your inbox",
      "Basic SEO so local customers can find you",
      "Google Analytics installed and configured",
      "1 revision round until you're happy",
    ],
    ctaLabel: "Start My Website",
    ctaHref: "/contact",
    ctaPlan: "Starter Website",
  },
  {
    id: "web-business",
    name: "Business",
    price: "₹24,999",
    hostingLine: "₹999/month hosting & maintenance",
    isMostChosen: true,
    tagline: "A complete website built to generate leads.",
    whoIsThisFor: [
      "Growing businesses",
      "Service providers",
      "Companies generating leads online",
    ],
    inclusions: [
      "Complete business website ready to generate leads",
      "Custom UI/UX that reflects your brand identity",
      "Lead capture system connected to your business",
      "Blog or news section to build authority",
      "Advanced SEO setup with Google Search Console",
      "Performance-optimised for speed and conversions",
      "2 revision rounds — we get it right",
    ],
    ctaLabel: "Start My Website",
    ctaHref: "/contact",
    ctaPlan: "Business Website",
  },
  {
    id: "web-premium",
    name: "Premium",
    price: "₹49,999+",
    pricePrefix: "Starting from",
    hostingLine: "₹999/month hosting & maintenance",
    isMostChosen: false,
    tagline: "Bespoke digital experience for established brands.",
    whoIsThisFor: [
      "Established brands",
      "Custom requirements",
      "Advanced functionality needs",
    ],
    inclusions: [
      "Unlimited pages with a bespoke design system",
      "Advanced animations & micro-interactions",
      "E-commerce, booking, or custom integrations",
      "Full CMS so your team can update content",
      "Advanced SEO, schema markup & structured data",
      "Priority delivery & VIP support",
      "Unlimited revisions during the project",
    ],
    ctaLabel: "Talk to an Expert",
    ctaHref: "/contact",
    ctaPlan: "Premium Website",
  },
];

// ─── Social Media Management ──────────────────────────────────────────────────
const SOCIAL_TIERS: PricingTier[] = [
  {
    id: "social-starter",
    name: "Starter",
    price: "₹14,999",
    priceSuffix: "/month",
    isMostChosen: false,
    tagline: "Stay visible on social without the stress.",
    whoIsThisFor: [
      "New businesses & personal brands",
      "Small local businesses",
      "Getting started with social media",
    ],
    inclusions: [
      "3 reels and 5 posts per month",
      "Content calendar",
      "Compelling captions written for your audience",
      "Monthly performance report with insights",
    ],
    ctaLabel: "Grow My Presence",
    ctaHref: "/contact",
    ctaPlan: "Starter Social Media",
  },
  {
    id: "social-business",
    name: "Business",
    price: "₹19,999",
    priceSuffix: "/month",
    isMostChosen: true,
    tagline: "Consistent presence that attracts customers.",
    whoIsThisFor: [
      "Growing businesses",
      "Service providers wanting more enquiries",
      "Brands building an engaged audience",
    ],
    inclusions: [
      "4 reels and 8 posts per month",
      "Full caption copywriting in your brand voice",
      "Community management & audience replies",
      "Competitor analysis to stay ahead",
      "Bi-weekly performance report",
    ],
    ctaLabel: "Grow My Presence",
    ctaHref: "/contact",
    ctaPlan: "Business Social Media",
  },
  {
    id: "social-scale",
    name: "Scale",
    price: "₹34,999",
    priceSuffix: "/month",
    isMostChosen: false,
    tagline: "Full-stack social media for serious growth.",
    whoIsThisFor: [
      "Established businesses scaling fast",
      "Brands with active ad campaigns",
      "Companies needing a full content team",
    ],
    inclusions: [
      "6 reels and 10 posts per month",
      "Full content strategy & brand voice guide",
      "Active community management daily",
      "Influencer coordination & partnership outreach",
      "Weekly performance report with recommendations",
    ],
    ctaLabel: "Grow My Presence",
    ctaHref: "/contact",
    ctaPlan: "Scale Social Media",
  },
];

// ─── Branding & Identity ──────────────────────────────────────────────────────
const BRANDING_TIERS: PricingTier[] = [
  {
    id: "brand-starter",
    name: "Starter",
    price: "₹5,999",
    oneTimeNote: "One-time fee · no recurring charges",
    isMostChosen: false,
    tagline: "A professional identity to launch your brand.",
    whoIsThisFor: [
      "New businesses launching soon",
      "Freelancers & personal brands",
      "Small businesses needing a refresh",
    ],
    inclusions: [
      "Logo design with 2 distinct concepts",
      "Brand colour palette that stands out",
      "Font selection matched to your brand personality",
      "Business card design ready to print",
      "Final files in all formats (PNG, SVG, PDF)",
    ],
    ctaLabel: "Build My Brand",
    ctaHref: "/contact",
    ctaPlan: "Starter Branding",
  },
  {
    id: "brand-business",
    name: "Business",
    price: "₹14,999",
    oneTimeNote: "One-time fee · no recurring charges",
    isMostChosen: true,
    tagline: "A brand system people remember and trust.",
    whoIsThisFor: [
      "Growing businesses",
      "Companies rebranding for a new market",
      "Brands that want a consistent identity",
    ],
    inclusions: [
      "Logo design with 4 concepts + full refinement",
      "Complete brand colour system with usage rules",
      "Typography system for print and digital",
      "Business card, letterhead & email signature",
      "Social media profile & cover art for all platforms",
      "Brand guidelines document so your team stays consistent",
      "All files in every format you'll ever need",
    ],
    ctaLabel: "Build My Brand",
    ctaHref: "/contact",
    ctaPlan: "Business Branding",
  },
  {
    id: "brand-complete",
    name: "Complete",
    price: "₹24,999",
    oneTimeNote: "One-time fee · no recurring charges",
    isMostChosen: false,
    tagline: "The complete brand identity for ambitious companies.",
    whoIsThisFor: [
      "Established brands entering new markets",
      "Companies with physical & digital presence",
      "Ambitious brands that want to own their space",
    ],
    inclusions: [
      "Everything in Business, plus:",
      "Brand voice & messaging guide",
      "Custom icon set & illustration style",
      "Packaging or signage mockups",
      "Social media templates (Canva/Figma ready)",
      "Comprehensive brand identity deck",
      "Unlimited revisions during the project",
    ],
    ctaLabel: "Build My Brand",
    ctaHref: "/contact",
    ctaPlan: "Complete Branding",
  },
];

// ─── Trust Indicators ─────────────────────────────────────────────────────────
const TRUST_INDICATORS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13 2L4.09 12.11a1 1 0 00.77 1.64H11l-1 8 8.92-10.11A1 1 0 0018 10H13l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Fast Turnaround",
    desc: "Delivered on time, every time",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Transparent Pricing",
    desc: "No hidden fees, ever",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    label: "Modern Technology Stack",
    desc: "Built with tools that last",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    label: "Dedicated Support",
    desc: "We're with you after launch",
  },
];

// ─── Check icon ───────────────────────────────────────────────────────────────
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
      <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.3" />
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

// ─── Hero ─────────────────────────────────────────────────────────────────────
function PricingHero() {
  return (
    <div className="pricing-hero">
      <PageBackground />
      <div className="pricing-hero-glow" aria-hidden="true" />
      <div className="pricing-hero-grid" aria-hidden="true" />
      <div className="pricing-hero-inner">
        <p className="pricing-hero-eyebrow">Transparent Pricing</p>
        <h1 className="pricing-hero-title">
          Growth Solutions for{" "}
          <span className="pricing-hero-accent">Every Stage</span>{" "}
          of Your Business
        </h1>
        <p className="pricing-hero-subtitle">
          Transparent pricing with no hidden costs. Choose the service that
          matches your goals — and get results you can measure.
        </p>
      </div>
    </div>
  );
}

// ─── Trust Strip ──────────────────────────────────────────────────────────────
function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="trust-strip-inner">
        {TRUST_INDICATORS.map((t, i) => (
          <div key={i} className="trust-item">
            <div className="trust-icon">{t.icon}</div>
            <div className="trust-text">
              <span className="trust-label">{t.label}</span>
              <span className="trust-desc">{t.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Most Clients Start Here ──────────────────────────────────────────────────
function FeaturedCard() {
  return (
    <section className="featured-section" aria-label="Recommended package">
      <div className="featured-inner">
        <div className="featured-badge-wrap">
          <span className="featured-eyebrow-badge">⭐ Most Clients Start Here</span>
        </div>
        <div className="featured-card">
          <div className="featured-card-left">
            <p className="featured-category">Website Development</p>
            <h2 className="featured-title">
              Business Website Subscription 🔥
            </h2>
            <p className="featured-sub">
              Best for growing businesses that want a professional website
              without a large upfront investment.
            </p>
            <ul className="featured-list" role="list">
              {[
                "Professional business website",
                "Hosting & maintenance included",
                "Minor content updates monthly",
                "Ongoing support & monitoring",
              ].map((item, i) => (
                <li key={i} className="featured-list-item">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="featured-commitment">12-month commitment</p>
          </div>
          <div className="featured-card-right">
            <div className="featured-most-chosen">🔥 Most Chosen</div>
            <p className="featured-monthly-label">Monthly subscription</p>
            <p className="featured-price">₹2,499<span className="featured-price-mo">/mo</span></p>
            <PricingCtaLink
              href="/contact"
              label="Start My Website"
              plan="Business Website Subscription"
              variant="popular"
            />
            <div className="featured-or-divider">
              <span className="featured-or-line" />
              <span className="featured-or-text">or</span>
              <span className="featured-or-line" />
            </div>
            <div className="featured-onetime">
              <p className="featured-onetime-label">One-time purchase</p>
              <p className="featured-onetime-price">₹24,999 + ₹999/mo</p>
              <PricingCtaLink
                href="/contact"
                label="Buy Outright"
                plan="Business Website One-Time"
                variant="default"
              />
            </div>
            <p className="featured-note">Free consultation included</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Card ─────────────────────────────────────────────────────────────
function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={`pricing-card${tier.isMostChosen ? " pricing-card--chosen" : ""}`}
      aria-label={`${tier.name} plan`}
    >
      {tier.isMostChosen && (
        <div className="pricing-chosen-badge" aria-label="Most Chosen plan">
          🔥 Most Chosen
        </div>
      )}

      <div className="pricing-card-header">
        <h3 className="pricing-tier-name">{tier.name}</h3>
        <p className="pricing-tagline">{tier.tagline}</p>
      </div>

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
        {tier.hostingLine && (
          <p className="pricing-hosting-line">{tier.hostingLine}</p>
        )}
        {tier.oneTimeNote && (
          <p className="pricing-one-time-note">{tier.oneTimeNote}</p>
        )}
      </div>

      {/* Who Is This For */}
      <div className="pricing-who">
        <p className="pricing-who-label">Who is this for?</p>
        <ul className="pricing-who-list" role="list">
          {tier.whoIsThisFor.map((item, i) => (
            <li key={i} className="pricing-who-item">
              <span className="pricing-who-dot" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="pricing-divider" aria-hidden="true" />

      <ul className="pricing-inclusions" role="list">
        {tier.inclusions.map((item, i) => (
          <li key={i} className="pricing-inclusion-item">
            <CheckIcon />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="pricing-card-footer">
        <PricingCtaLink
          href={tier.ctaHref}
          label={tier.ctaLabel}
          plan={tier.ctaPlan}
          variant={tier.isMostChosen ? "popular" : "default"}
        />
      </div>
    </div>
  );
}

// ─── Quick Launch card ────────────────────────────────────────────────────────
function QuickLaunchCard() {
  return (
    <div className="quick-launch-card">
      <div className="quick-launch-left">
        <span className="quick-launch-badge">⚡ Quick Launch</span>
        <h3 className="quick-launch-title">Landing Page</h3>
        <p className="quick-launch-sub">
          One conversion-focused page — ideal for product launches, campaigns,
          or testing a new offer. Delivered in 5–7 business days.
        </p>
      </div>
      <div className="quick-launch-right">
        <p className="quick-launch-from">Starting from</p>
        <p className="quick-launch-price">₹5,999</p>
        <PricingCtaLink
          href="/contact"
          label="Get Started"
          plan="Landing Page Quick Launch"
          variant="outline"
        />
      </div>
    </div>
  );
}

// ─── Service Section ──────────────────────────────────────────────────────────
function ServiceSection({
  id,
  eyebrow,
  heading,
  tiers,
  showQuickLaunch = false,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  tiers: PricingTier[];
  showQuickLaunch?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="pricing-service-section"
    >
      <div className="pricing-section-header">
        <p className="pricing-section-eyebrow">{eyebrow}</p>
        <h2 id={`${id}-heading`} className="pricing-section-heading">
          {heading}
        </h2>
      </div>

      <div className="pricing-cards-grid">
        {tiers.map((tier) => (
          <PricingCard key={tier.id} tier={tier} />
        ))}
      </div>

      {showQuickLaunch && <QuickLaunchCard />}
    </section>
  );
}

// ─── Website Subscription Card ─────────────────────────────────────────────
function WebsiteSubscriptionCard() {
  return (
    <div className="subscription-card">
      <div className="subscription-left">
        <div>
          <span className="subscription-badge">💡 New Option</span>
        </div>
        <h3 className="subscription-title">Website Subscription</h3>
        <p className="subscription-sub">
          A fully-managed business website delivered as a monthly subscription.
          No large payment upfront &mdash; just a single monthly fee.
        </p>
        <ul className="subscription-list" role="list">
          {[
            "Professional business website",
            "Hosting & maintenance included",
            "Minor content updates monthly",
            "Ongoing support & monitoring",
          ].map((item, i) => (
            <li key={i} className="subscription-list-item">
              <CheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="subscription-right">
        <PricingCtaLink
          href="/contact"
          label="Enquire Now"
          plan="Website Subscription"
          variant="outline"
        />
      </div>
    </div>
  );
}

// ─── Website Section ─────────────────────────────────────────────────────
function WebsiteSection() {
  return (
    <section
      id="website-dev"
      aria-labelledby="website-dev-heading"
      className="pricing-service-section"
    >
      <div className="pricing-section-header">
        <p className="pricing-section-eyebrow">Web Presence</p>
        <h2 id="website-dev-heading" className="pricing-section-heading">
          Website Development
        </h2>
        <p className="website-section-intro">
          No large upfront investment required. Start with a monthly plan and
          scale as your business grows.
        </p>
      </div>

      {/* Option comparison */}
      <div className="web-option-table">
        <div className="web-option-row web-option-row--header">
          <span className="web-option-cell web-option-label">Option</span>
          <span className="web-option-cell">Best For</span>
          <span className="web-option-cell web-option-cell--hide-mobile">Entry Cost</span>
        </div>
        <div className="web-option-row">
          <span className="web-option-cell web-option-label">
            <span className="web-option-badge web-option-badge--fire">🔥 Subscription</span>
          </span>
          <span className="web-option-cell">Lower upfront cost, pay monthly</span>
          <span className="web-option-cell web-option-cell--hide-mobile web-option-price">₹1,999–₹2,499/mo</span>
        </div>
        <div className="web-option-row">
          <span className="web-option-cell web-option-label">
            <span className="web-option-badge">One-Time</span>
          </span>
          <span className="web-option-cell">Long-term ownership, pay once</span>
          <span className="web-option-cell web-option-cell--hide-mobile web-option-price">₹5,999–₹49,999+</span>
        </div>
      </div>

      {/* Landing Page — entry product */}
      <QuickLaunchCard />

      {/* Subscription card */}
      <WebsiteSubscriptionCard />

      {/* One-time packages */}
      <div className="web-onetime-header">
        <p className="web-onetime-label">Or choose a one-time package</p>
      </div>
      <div className="pricing-cards-grid">
        {WEBSITE_TIERS.map((tier) => (
          <PricingCard key={tier.id} tier={tier} />
        ))}
      </div>
    </section>
  );
}

// ─── Custom Solutions ─────────────────────────────────────────────────────────
function CustomSolutions() {
  const solutions = [
    { icon: "📱", label: "QR Ordering Systems" },
    { icon: "📅", label: "Booking Platforms" },
    { icon: "📊", label: "Custom Dashboards" },
    { icon: "🤖", label: "AI & Automation" },
    { icon: "🔧", label: "Internal Tools" },
    { icon: "🛒", label: "E-commerce Stores" },
  ];

  return (
    <section
      id="custom-solutions"
      aria-labelledby="custom-solutions-heading"
      className="custom-solutions-section"
    >
      <div className="custom-solutions-inner">
        <div className="custom-solutions-content">
          <p className="custom-solutions-eyebrow">Custom Solutions</p>
          <h2 id="custom-solutions-heading" className="custom-solutions-heading">
            Need something unique?
          </h2>
          <p className="custom-solutions-sub">
            Not every business fits a standard package. If you need a tailored
            solution, we&apos;ll build it from scratch — scoped to your exact
            requirements and budget.
          </p>
          <div className="custom-solutions-tags">
            {solutions.map((s, i) => (
              <span key={i} className="custom-solutions-tag">
                {s.icon} {s.label}
              </span>
            ))}
          </div>
          <div className="custom-solutions-cta">
            <CustomSolutionCtaLink />
            <p className="custom-solutions-note">
              Free 30-minute strategy call · No commitment required
            </p>
          </div>
        </div>
        <div className="custom-solutions-visual" aria-hidden="true">
          <div className="csv-glow" />
          <div className="csv-card csv-card-1">
            <span className="csv-card-icon">🎯</span>
            <span>Scoped to your needs</span>
          </div>
          <div className="csv-card csv-card-2">
            <span className="csv-card-icon">💬</span>
            <span>Free discovery call</span>
          </div>
          <div className="csv-card csv-card-3">
            <span className="csv-card-icon">📋</span>
            <span>Custom proposal</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why Businesses Choose Vextiv ────────────────────────────────────────────
function WhyChooseVextiv() {
  const strengths = [
    "Direct access to the founders",
    "Faster turnaround times",
    "Modern technology stack",
    "Transparent pricing",
    "Ongoing support after launch",
  ];

  return (
    <section
      aria-labelledby="why-vextiv-heading"
      className="why-vextiv-section"
    >
      <div className="why-vextiv-inner">
        <div className="why-vextiv-left">
          <p className="why-vextiv-eyebrow">Why Choose Us</p>
          <h2 id="why-vextiv-heading" className="why-vextiv-heading">
            Why businesses choose Vextiv
          </h2>
          <p className="why-vextiv-body">
            We&apos;re a specialist team that does one thing well &mdash; helping
            businesses in India build a strong digital presence. No
            generalists, no bloated teams, no unnecessary overhead.
          </p>
          <p className="why-vextiv-body">
            Every project gets our full attention, from the first call to
            post-launch support.
          </p>
          <div className="why-vextiv-urgency">
            <span className="why-vextiv-urgency-dot" aria-hidden="true" />
            We onboard only 5 new projects each month to maintain quality.
          </div>
        </div>
        <div className="why-vextiv-right">
          <ul className="why-trust-list" role="list">
            {strengths.map((item, i) => (
              <li key={i} className="why-trust-item">
                <span className="why-trust-check" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="why-vextiv-quote">
            <blockquote className="why-quote-text">
              &ldquo;We&apos;d rather have 5 happy clients than 15 average
              projects.&rdquo;
            </blockquote>
            <p className="why-quote-attr">&mdash; Vextiv Team</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function PricingFaq() {
  return (
    <section
      id="pricing-faq"
      aria-labelledby="faq-heading"
      className="pricing-faq-section"
    >
      <div className="pricing-faq-inner">
        <div className="pricing-section-header">
          <p className="pricing-section-eyebrow">FAQs</p>
          <h2 id="faq-heading" className="pricing-section-heading">
            Common questions answered
          </h2>
        </div>
        <PricingFaqAccordion />
      </div>
    </section>
  );
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────
function BottomCta() {
  return (
    <div className="pricing-bottom-cta">
      <div className="pricing-bottom-cta-inner">
        <p className="pricing-bottom-eyebrow">Still deciding?</p>
        <h2 className="pricing-bottom-title">Not sure what you need?</h2>
        <p className="pricing-bottom-body">
          Book a free strategy call and we&apos;ll recommend the right solution
          for your business. No pressure, no jargon, no sales pitch.
        </p>
        <BottomCtaLink />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PricingPage() {
  return (
    <>
      {/* 1. Hero */}
      <PricingHero />

      {/* 2. Trust Indicators */}
      <TrustStrip />

      {/* 3. Most Clients Start Here */}
      <FeaturedCard />

      {/* 4. Service Pricing */}
      <div className="pricing-main">
        {/* Website — uses dedicated section with option table */}
        <WebsiteSection />
        <ServiceSection
          id="social-media"
          eyebrow="Social Growth"
          heading="Social Media Management"
          tiers={SOCIAL_TIERS}
        />
        <ServiceSection
          id="branding"
          eyebrow="Brand Strategy"
          heading="Branding & Identity"
          tiers={BRANDING_TIERS}
        />
      </div>

      {/* 5. Custom Solutions */}
      <CustomSolutions />

      {/* 6. Why Businesses Choose Vextiv */}
      <WhyChooseVextiv />

      {/* 7. FAQ */}
      <PricingFaq />

      {/* 8. Bottom CTA */}
      <BottomCta />

      {/* ── Scoped styles ── */}
      <style>{`

        /* ═══════════════════════════════════════════════════════
           PRICING PAGE v2 — PSYCHOLOGY-DRIVEN REDESIGN
        ═══════════════════════════════════════════════════════ */

        /* ── Hero ──────────────────────────────────────────────── */

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
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent);
          pointer-events: none;
          opacity: 0.6;
        }

        .pricing-hero-inner {
          position: relative;
          max-width: 860px;
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
          font-size: clamp(2rem, 5vw, 3.5rem);
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
          max-width: 580px;
        }

        /* ── Trust Strip ──────────────────────────────────────── */

        .trust-strip {
          background-color: var(--bg-surface-1);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          padding: 40px 0;
        }

        .trust-strip-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }

        .trust-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .trust-icon {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--accent-fill-08);
          border: 1px solid var(--accent-border-card);
          border-radius: 12px;
          color: var(--text-accent);
        }

        .trust-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .trust-label {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.01em;
        }

        .trust-desc {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 400;
          color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .trust-strip-inner {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .trust-strip-inner {
            grid-template-columns: 1fr;
          }
        }

        /* ── Featured Card ─────────────────────────────────────── */

        .featured-section {
          padding: clamp(64px, 7vw, 96px) 0 clamp(48px, 5vw, 72px);
        }

        .featured-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .featured-badge-wrap {
          display: flex;
          justify-content: center;
        }

        .featured-eyebrow-badge {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-accent);
          background-color: var(--accent-fill-08);
          border: 1px solid var(--accent-border-card);
          border-radius: 9999px;
          padding: 6px 20px;
        }

        .featured-card {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 48px;
          background-color: var(--bg-surface-2);
          border: 1px solid var(--accent-border-card);
          border-radius: 24px;
          padding: clamp(32px, 4vw, 52px);
          box-shadow: 0 0 0 1px var(--accent-border-card),
            0 24px 60px -16px rgba(200, 240, 77, 0.1);
          position: relative;
          overflow: hidden;
        }

        .featured-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 60% 50% at 80% 50%,
            var(--accent-fill-08) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .featured-card-left {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .featured-category {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 600;
          letter-spacing: var(--tracking-eyebrow-wide);
          text-transform: uppercase;
          color: var(--text-accent);
        }

        .featured-title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-tight);
        }

        .featured-sub {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 300;
          color: var(--text-secondary);
          line-height: var(--leading-body);
          max-width: 500px;
        }

        .featured-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .featured-list-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-secondary);
          line-height: var(--leading-base);
        }

        .featured-card-right {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          min-width: 240px;
          padding: 28px 24px;
          background-color: var(--bg-surface-3);
          border: 1px solid var(--border-default);
          border-radius: 16px;
        }

        .featured-most-chosen {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: var(--gradient-btn);
          color: #000;
          padding: 4px 14px;
          border-radius: 9999px;
        }

        .featured-monthly-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .featured-price-mo {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 400;
          color: var(--text-secondary);
        }

        .featured-commitment {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-muted);
          padding: 6px 12px;
          background-color: var(--bg-surface-1);
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
          width: fit-content;
        }

        .featured-or-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          margin: 4px 0;
        }

        .featured-or-line {
          flex: 1;
          height: 1px;
          background-color: var(--border-subtle);
        }

        .featured-or-text {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-muted);
          font-weight: 500;
        }

        .featured-onetime {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          padding: 14px;
          background-color: var(--bg-surface-1);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
        }

        .featured-onetime-label {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .featured-onetime-price {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: var(--tracking-heading);
        }

        .featured-note {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          color: var(--text-muted);
        }

        @media (max-width: 860px) {
          .featured-card {
            grid-template-columns: 1fr;
          }

          .featured-card-right {
            min-width: unset;
          }
        }

        /* ── Main pricing container ─────────────────────────────── */

        .pricing-main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          display: flex;
          flex-direction: column;
          gap: clamp(80px, 10vw, 120px);
          padding-top: clamp(64px, 7vw, 96px);
          padding-bottom: clamp(48px, 6vw, 80px);
        }

        /* ── Website section intro & option table ──────────────── */

        .website-section-intro {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 300;
          color: var(--text-secondary);
          line-height: var(--leading-body);
          max-width: 560px;
          text-align: center;
        }

        .web-option-table {
          border: 1px solid var(--border-default);
          border-radius: 14px;
          overflow: hidden;
          background-color: var(--bg-surface-2);
        }

        .web-option-row {
          display: grid;
          grid-template-columns: 180px 1fr 160px;
          align-items: center;
          padding: 14px 20px;
          border-bottom: 1px solid var(--border-subtle);
          transition: background-color 0.15s ease;
        }

        .web-option-row:last-child {
          border-bottom: none;
        }

        .web-option-row--header {
          background-color: var(--bg-surface-1);
        }

        .web-option-row:not(.web-option-row--header):hover {
          background-color: var(--accent-fill-08);
        }

        .web-option-cell {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .web-option-row--header .web-option-cell {
          font-size: var(--text-2xs);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .web-option-label {
          font-weight: 600;
          color: var(--text-primary);
        }

        .web-option-badge {
          font-size: var(--text-xs);
          font-weight: 500;
          padding: 3px 10px;
          border-radius: 6px;
          background-color: var(--bg-surface-3);
          border: 1px solid var(--border-default);
          color: var(--text-secondary);
        }

        .web-option-badge--fire {
          background-color: var(--accent-fill-08);
          border-color: var(--accent-border-card);
          color: var(--text-accent);
        }

        .web-option-price {
          font-family: var(--font-display);
          font-weight: 600;
          color: var(--text-primary);
          font-size: var(--text-sm);
        }

        .web-onetime-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 8px;
        }

        .web-onetime-label {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.02em;
          white-space: nowrap;
          padding: 6px 16px;
          background-color: var(--bg-surface-1);
          border: 1px solid var(--border-subtle);
          border-radius: 9999px;
        }

        @media (max-width: 700px) {
          .web-option-row {
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto;
            gap: 6px 12px;
            padding: 16px;
          }

          .web-option-row--header {
            display: none;
          }

          .web-option-cell:nth-child(1) {
            grid-column: 1 / 2;
            grid-row: 1 / 2;
          }

          .web-option-cell:nth-child(2) {
            grid-column: 1 / 3;
            grid-row: 2 / 3;
            font-size: var(--text-xs);
          }

          .web-option-cell:nth-child(3) {
            grid-column: 2 / 3;
            grid-row: 1 / 2;
            text-align: right;
          }

          .web-option-cell--hide-mobile {
            display: block;
          }
        }

        /* ── Service section ────────────────────────────────────── */

        .pricing-service-section {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .pricing-section-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
        }

        .pricing-section-eyebrow {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 600;
          letter-spacing: var(--tracking-eyebrow-wide);
          text-transform: uppercase;
          color: var(--text-accent);
        }

        .pricing-section-heading {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-tight);
          color: var(--text-primary);
        }

        /* ── Cards grid ─────────────────────────────────────────── */

        .pricing-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: start;
        }

        @media (max-width: 960px) {
          .pricing-cards-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            gap: 16px;
            padding-top: 20px;
            padding-bottom: 24px;
            margin: -20px -20px 0 -20px;
            padding-left: 20px;
            padding-right: 20px;
            scrollbar-width: none;
          }
          .pricing-cards-grid::-webkit-scrollbar {
            display: none;
          }
          .pricing-cards-grid > .pricing-card {
            flex: 0 0 calc(100% - 32px);
            scroll-snap-align: center;
          }
        }

        /* ── Pricing card ───────────────────────────────────────── */

        .pricing-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-surface-2);
          border: 1px solid var(--border-default);
          border-radius: 20px;
          padding: 28px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }

        .pricing-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-3px);
          box-shadow: 0 16px 48px -12px rgba(0, 0, 0, 0.4);
        }

        .pricing-card--chosen {
          background-color: var(--bg-surface-3);
          border-color: var(--accent-border-card);
          box-shadow: 0 0 0 1px var(--accent-border-card),
            0 20px 60px -16px rgba(200, 240, 77, 0.1);
          transform: scale(1.02);
        }

        .pricing-card--chosen:hover {
          border-color: var(--accent-border-hover);
          box-shadow: 0 0 0 1px var(--accent-border-hover),
            0 24px 72px -16px rgba(200, 240, 77, 0.16);
          transform: scale(1.02) translateY(-3px);
        }

        /* ── Chosen badge ───────────────────────────────────────── */

        .pricing-chosen-badge {
          position: absolute;
          top: -1px;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          background: var(--gradient-btn);
          color: #000;
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 5px 16px;
          border-radius: 9999px;
          white-space: nowrap;
          box-shadow: 0 4px 16px -4px rgba(200, 240, 77, 0.6);
        }

        /* ── Card header ────────────────────────────────────────── */

        .pricing-card-header {
          margin-bottom: 20px;
          padding-top: 10px;
        }

        .pricing-tier-name {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: var(--tracking-heading);
          margin-bottom: 6px;
        }

        .pricing-tagline {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 400;
          color: var(--text-secondary);
          line-height: var(--leading-base);
        }

        /* ── Price block ────────────────────────────────────────── */

        .pricing-price-block {
          margin-bottom: 20px;
        }

        .pricing-price-prefix {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 400;
          color: var(--text-muted);
          margin-bottom: 4px;
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
        }

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

        .pricing-one-time-note {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 500;
          color: var(--text-accent);
          margin-top: 6px;
        }

        /* ── Who Is This For ────────────────────────────────────── */

        .pricing-who {
          margin-bottom: 20px;
          padding: 14px 16px;
          background-color: var(--bg-surface-1);
          border-radius: 10px;
          border: 1px solid var(--border-subtle);
        }

        .pricing-who-label {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .pricing-who-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .pricing-who-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-secondary);
        }

        .pricing-who-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--text-accent);
          flex-shrink: 0;
        }

        /* ── Divider ────────────────────────────────────────────── */

        .pricing-divider {
          height: 1px;
          background-color: var(--border-subtle);
          margin-bottom: 20px;
        }

        /* ── Inclusions ─────────────────────────────────────────── */

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

        .pricing-card-footer {
          margin-top: auto;
        }

        /* ── CTA buttons ────────────────────────────────────────── */

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
          transition: transform 0.2s ease, filter 0.2s ease,
            background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
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
          background: var(--gradient-btn);
          color: #000;
          border: 1px solid transparent;
          box-shadow: 0 4px 16px -4px rgba(200, 240, 77, 0.4);
        }

        .pricing-cta--popular:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
          box-shadow: 0 8px 28px -6px rgba(200, 240, 77, 0.55);
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

        /* ── Quick Launch card ──────────────────────────────────── */

        .quick-launch-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          background-color: var(--bg-surface-1);
          border: 1px solid var(--border-default);
          border-radius: 16px;
          padding: 28px 36px;
          transition: border-color 0.2s ease;
        }

        .quick-launch-card:hover {
          border-color: var(--border-hover);
        }

        .quick-launch-left {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .quick-launch-badge {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-accent);
          background-color: var(--accent-fill-08);
          border: 1px solid var(--accent-border-card);
          border-radius: 9999px;
          padding: 3px 12px;
          display: inline-block;
          width: fit-content;
        }

        .quick-launch-title {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: var(--tracking-heading);
        }

        .quick-launch-sub {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-secondary);
          max-width: 480px;
          line-height: var(--leading-body);
        }

        .quick-launch-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          min-width: 180px;
          text-align: center;
        }

        .quick-launch-from {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-muted);
        }

        .quick-launch-price {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: var(--tracking-heading);
          line-height: 1;
        }

        @media (max-width: 680px) {
          .quick-launch-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 24px;
          }

          .quick-launch-right {
            align-items: flex-start;
            text-align: left;
            width: 100%;
          }
        }

        /* ── Subscription Card ──────────────────────────────────── */

        .subscription-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          background-color: var(--bg-surface-2);
          border: 1px solid var(--accent-border-card);
          border-radius: 16px;
          padding: 32px 36px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 0 1px var(--accent-border-card),
            0 12px 40px -12px rgba(200, 240, 77, 0.08);
        }

        .subscription-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 50% 50% at 0% 0%,
            var(--accent-fill-08) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .subscription-left {
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          flex: 1;
        }

        .subscription-badge {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-accent);
          background-color: var(--accent-fill-10);
          border: 1px solid var(--accent-border-card);
          border-radius: 9999px;
          padding: 4px 14px;
          display: inline-block;
        }

        .subscription-title {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: var(--tracking-heading);
        }

        .subscription-sub {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-secondary);
          line-height: var(--leading-body);
          max-width: 500px;
        }

        .subscription-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 8px;
        }

        .subscription-list-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-secondary);
          line-height: var(--leading-base);
        }

        .subscription-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          min-width: 180px;
          position: relative;
        }

        @media (max-width: 860px) {
          .subscription-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 24px;
            gap: 24px;
          }

          .subscription-right {
            align-items: flex-start;
            width: 100%;
          }
        }

        /* ── Custom Solutions ───────────────────────────────────── */

        .custom-solutions-section {
          background-color: var(--bg-surface-1);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          padding: clamp(72px, 8vw, 96px) 0;
        }

        .custom-solutions-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .custom-solutions-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .custom-solutions-eyebrow {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 600;
          letter-spacing: var(--tracking-eyebrow-wide);
          text-transform: uppercase;
          color: var(--text-accent);
        }

        .custom-solutions-heading {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-tight);
        }

        .custom-solutions-sub {
          font-family: var(--font-body);
          font-size: var(--text-base);
          color: var(--text-secondary);
          line-height: var(--leading-body);
        }

        .custom-solutions-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .custom-solutions-tag {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 500;
          color: var(--text-secondary);
          background-color: var(--bg-surface-2);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: 6px 12px;
        }

        .custom-solutions-cta {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .custom-solutions-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: var(--gradient-btn);
          color: #000;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 700;
          text-decoration: none;
          border-radius: 9999px;
          border: none;
          letter-spacing: 0.01em;
          box-shadow: 0 4px 20px -4px rgba(200, 240, 77, 0.4);
          transition: transform 0.2s ease, filter 0.2s ease;
          width: fit-content;
        }

        .custom-solutions-cta-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.08);
        }

        .custom-solutions-cta-btn:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
        }

        .custom-solutions-note {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-muted);
        }

        .custom-solutions-visual {
          position: relative;
          height: 280px;
        }

        .csv-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 70% 60% at 50% 50%,
            var(--accent-fill-08) 0%,
            transparent 70%
          );
          border-radius: 20px;
          border: 1px solid var(--accent-border-card);
        }

        .csv-card {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          background-color: var(--bg-surface-2);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-secondary);
          backdrop-filter: blur(8px);
          box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.3);
        }

        .csv-card-icon {
          font-size: 1.25rem;
        }

        .csv-card-1 { top: 20%; left: 10%; }
        .csv-card-2 { top: 48%; right: 8%; }
        .csv-card-3 { bottom: 18%; left: 18%; }

        @media (max-width: 860px) {
          .custom-solutions-inner {
            grid-template-columns: 1fr;
          }

          .custom-solutions-visual {
            display: none;
          }
        }

        /* ── Why Work With Vextiv ───────────────────────────────── */

        .why-vextiv-section {
          padding: clamp(72px, 8vw, 96px) 0;
          background-color: var(--bg-surface-0);
        }

        .why-vextiv-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }

        .why-vextiv-left {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .why-vextiv-eyebrow {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 600;
          letter-spacing: var(--tracking-eyebrow-wide);
          text-transform: uppercase;
          color: var(--text-accent);
        }

        .why-vextiv-heading {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-tight);
        }

        .why-vextiv-body {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 300;
          color: var(--text-secondary);
          line-height: var(--leading-body);
        }

        .why-vextiv-urgency {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-primary);
          padding: 14px 18px;
          background-color: var(--bg-surface-2);
          border: 1px solid var(--accent-border-card);
          border-radius: 10px;
          margin-top: 4px;
        }

        .why-vextiv-urgency-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--gradient-btn);
          flex-shrink: 0;
          box-shadow: 0 0 8px 2px rgba(200, 240, 77, 0.5);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .why-vextiv-right {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .why-trust-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid var(--border-default);
          border-radius: 14px;
          overflow: hidden;
        }

        .why-trust-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-subtle);
          transition: background-color 0.15s ease;
        }

        .why-trust-item:last-child {
          border-bottom: none;
        }

        .why-trust-item:hover {
          background-color: var(--accent-fill-08);
        }

        .why-trust-check {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--accent-fill-08);
          border: 1px solid var(--accent-border-card);
          border-radius: 50%;
          color: var(--text-accent);
          font-size: 13px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .why-vextiv-quote {
          padding: 24px;
          background-color: var(--bg-surface-2);
          border-left: 3px solid var(--accent);
          border-radius: 0 12px 12px 0;
        }

        .why-quote-text {
          font-family: var(--font-display);
          font-size: var(--text-base);
          font-weight: 500;
          color: var(--text-primary);
          line-height: var(--leading-body);
          font-style: italic;
          margin-bottom: 8px;
        }

        .why-quote-attr {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-muted);
        }

        @media (max-width: 860px) {
          .why-vextiv-inner {
            grid-template-columns: 1fr;
          }
        }

        /* ── FAQ section ────────────────────────────────────────── */

        .pricing-faq-section {
          padding: clamp(72px, 8vw, 96px) 0;
          background-color: var(--bg-surface-1);
          border-top: 1px solid var(--border-subtle);
        }

        .pricing-faq-inner {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        /* ── FAQ accordion ──────────────────────────────────────── */

        .pfaq-list {
          display: flex;
          flex-direction: column;
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

        .pfaq-chevron { display: block; }

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

        /* ── Bottom CTA ─────────────────────────────────────────── */

        .pricing-bottom-cta {
          background-color: var(--bg-surface-0);
          border-top: 1px solid var(--border-subtle);
          padding: clamp(72px, 8vw, 96px) 0;
        }

        .pricing-bottom-cta-inner {
          max-width: 640px;
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
          max-width: 460px;
        }

        .pricing-bottom-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
          padding: 14px 32px;
          background: var(--gradient-btn);
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

        /* ── Responsive tweaks ──────────────────────────────────── */

        @media (max-width: 600px) {
          .pricing-card {
            padding: 22px 18px;
          }

          .pricing-card--chosen {
            transform: none;
          }

          .pricing-card--chosen:hover {
            transform: translateY(-3px);
          }

          .pfaq-trigger {
            padding: 18px;
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
