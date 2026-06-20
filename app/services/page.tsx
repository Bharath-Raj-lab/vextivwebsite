import type { Metadata } from "next";
import Link from "next/link";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Services | Vextiv Studio",
  description:
    "From websites to branding, QR ordering systems to local SEO — Vextiv Studio delivers end-to-end digital services for businesses across Hyderabad and beyond.",
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface ServiceFeature {
  text: string;
  subnote?: string;
}

interface ServiceItem {
  id: string;
  eyebrow: string;
  name: string;
  description: string;
  features: ServiceFeature[];
  ctaLabel: string;
  ctaHref: string;
  iconPath: React.ReactNode;
  colorRgb: string;
  image: string | null;
}

// ─── Service data ─────────────────────────────────────────────────────────────
const SERVICES: ServiceItem[] = [
  {
    id: "website-design-development",
    eyebrow: "Web Presence",
    name: "Website Design & Development",
    description:
      "Your website is your most powerful sales tool. We build fast, conversion-focused websites that turn visitors into customers — from business sites and landing pages to complete portfolio builds and refreshed redesigns.",
    features: [
      { text: "Business websites" },
      { text: "Landing pages" },
      { text: "Portfolio websites" },
      { text: "Website renovation & redesign" },
    ],
    ctaLabel: "See Pricing",
    ctaHref: "/pricing",
    colorRgb: "59, 130, 246", // Blue
    image: "/stitch/web pic.png",
    iconPath: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="4"
          width="24"
          height="20"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <line
          x1="2"
          y1="10"
          x2="26"
          y2="10"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="6" cy="7" r="1.2" fill="currentColor" />
        <circle cx="10" cy="7" r="1.2" fill="currentColor" />
        <circle cx="14" cy="7" r="1.2" fill="currentColor" />
        <rect
          x="5"
          y="14"
          width="8"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <line
          x1="16"
          y1="14"
          x2="23"
          y2="14"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="16"
          y1="17"
          x2="23"
          y2="17"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="16"
          y1="20"
          x2="20"
          y2="20"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "branding-identity",
    eyebrow: "Brand Strategy",
    name: "Branding & Identity",
    description:
      "Your brand is often the first thing customers notice — and the last thing they forget. We build cohesive identity systems that give your business a distinctive voice, look, and presence across every touchpoint.",
    features: [
      { text: "Logo design" },
      { text: "Brand color systems" },
      { text: "Typography systems" },
      { text: "Brand guidelines" },
    ],
    ctaLabel: "See Pricing",
    ctaHref: "/pricing",
    colorRgb: "236, 72, 153", // Pink
    image: "/stitch/brand.png",
    iconPath: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="14" cy="14" r="3" fill="currentColor" opacity="0.25" />
        <line
          x1="14"
          y1="2"
          x2="14"
          y2="6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          x1="14"
          y1="22"
          x2="14"
          y2="26"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          x1="2"
          y1="14"
          x2="6"
          y2="14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          x1="22"
          y1="14"
          x2="26"
          y2="14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          x1="5.5"
          y1="5.5"
          x2="8.5"
          y2="8.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="19.5"
          y1="19.5"
          x2="22.5"
          y2="22.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="22.5"
          y1="5.5"
          x2="19.5"
          y2="8.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="8.5"
          y1="19.5"
          x2="5.5"
          y2="22.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "content-creation",
    eyebrow: "Creative Studio",
    name: "Content Creation",
    description:
      "Scroll-stopping content built for how people actually consume media today. We produce reels, carousels, captions, and full content calendars designed to grow your audience and keep them engaged.",
    features: [
      { text: "Reels" },
      { text: "Posts and carousels" },
      { text: "Captions and copy" },
      { text: "Content calendars" },
    ],
    ctaLabel: "Get in Touch",
    ctaHref: "/contact",
    colorRgb: "249, 115, 22", // Orange
    image: "/stitch/content.png",
    iconPath: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="4"
          width="24"
          height="17"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <polygon points="11,8.5 11,17.5 19.5,13" fill="currentColor" opacity="0.85" />
        <line
          x1="6"
          y1="24"
          x2="22"
          y2="24"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          x1="11"
          y1="21"
          x2="11"
          y2="24"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          x1="17"
          y1="21"
          x2="17"
          y2="24"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "social-media-management",
    eyebrow: "Social Growth",
    name: "Social Media Management",
    description:
      "Consistent, on-brand social presence builds trust and drives traffic over time. We handle content scheduling, account management, and active engagement so you can focus on running your business.",
    features: [
      { text: "Content scheduling" },
      { text: "Account management" },
      { text: "Engagement support" },
      { text: "Platforms: Instagram, Facebook, LinkedIn" },
    ],
    ctaLabel: "See Pricing",
    ctaHref: "/pricing",
    colorRgb: "168, 85, 247", // Purple
    image: "/stitch/social.png",
    iconPath: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="22" cy="6" r="3.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="6" cy="14" r="3.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="22" cy="22" r="3.2" stroke="currentColor" strokeWidth="1.8" />
        <line
          x1="9.2"
          y1="12.4"
          x2="18.8"
          y2="7.6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="9.2"
          y1="15.6"
          x2="18.8"
          y2="20.4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "local-seo-google-business-optimization",
    eyebrow: "Local Visibility",
    name: "Local SEO & Google Business Optimization",
    description:
      "When customers in your area search for what you offer, you need to show up first. We optimize your Google Business Profile and local SEO footprint so your business gets found — not buried.",
    features: [
      { text: "Google Business Profile optimization" },
      { text: "Local SEO setup" },
      { text: "Basic website SEO" },
    ],
    ctaLabel: "Get in Touch",
    ctaHref: "/contact",
    colorRgb: "34, 197, 94", // Green
    image: "/stitch/local.png",
    iconPath: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
        <line
          x1="17.5"
          y1="17.5"
          x2="26"
          y2="26"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1="9"
          y1="11"
          x2="15"
          y2="11"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="12"
          y1="8"
          x2="12"
          y2="14"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "qr-ordering-systems",
    eyebrow: "Hospitality Tech",
    name: "QR Ordering Systems",
    description:
      "Replace static printed menus with a living digital experience. Our QR ordering systems are built for restaurants and cafés that want to streamline service, reduce errors, and give guests a premium ordering flow.",
    features: [
      { text: "Digital menus" },
      { text: "QR code setup" },
      { text: "Order management dashboard" },
      { text: "Restaurant and café solutions" },
    ],
    ctaLabel: "See Pricing",
    ctaHref: "/pricing",
    colorRgb: "6, 182, 212", // Cyan
    image: "/stitch/qr.png",
    iconPath: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="3"
          width="9"
          height="9"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect
          x="16"
          y="3"
          width="9"
          height="9"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect
          x="3"
          y="16"
          width="9"
          height="9"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect x="5.5" y="5.5" width="4" height="4" rx="0.8" fill="currentColor" />
        <rect x="18.5" y="5.5" width="4" height="4" rx="0.8" fill="currentColor" />
        <rect x="5.5" y="18.5" width="4" height="4" rx="0.8" fill="currentColor" />
        <line
          x1="16"
          y1="16"
          x2="19"
          y2="16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          x1="16"
          y1="20"
          x2="16"
          y2="25"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="20"
          x2="25"
          y2="20"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          x1="23"
          y1="16"
          x2="25"
          y2="16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          x1="25"
          y1="20"
          x2="25"
          y2="25"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="25"
          x2="23"
          y2="25"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

// ─── Bullet check icon ────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="svc-check-icon"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
      <polyline
        points="5,8.5 7,10.5 11,6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Arrow icon ───────────────────────────────────────────────────────────────
function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="2"
        y1="7"
        x2="12"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <polyline
        points="8,3 12,7 8,11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Individual service section ───────────────────────────────────────────────
function ServiceSection({ service }: { service: ServiceItem }) {
  const isPrimary = service.id === "website-design-development";

  return (
    <section
      id={service.id}
      aria-labelledby={`${service.id}-heading`}
      className={`svc-showcase-box ${isPrimary ? 'svc-showcase-box--primary' : ''}`}
      style={{ "--service-color-rgb": service.colorRgb } as React.CSSProperties}
    >
      {/* Background Layer */}
      <div className="svc-bg-layer" aria-hidden="true">
        <div className="svc-bg-placeholder" />
        <div className="svc-bg-overlay" />
        <div className="svc-ambient-glow" />
      </div>

      {/* Content Layer */}
      <div className="svc-content-layer">

        {/* Left Column: Text & CTA */}
        <div className="svc-text-col">
          <p className="svc-eyebrow">{service.eyebrow}</p>

          <div className="svc-heading-row">
            <div className="svc-icon-wrap" aria-hidden="true">
              {service.iconPath}
            </div>
            <h2 id={`${service.id}-heading`} className="svc-heading">
              {service.name}
            </h2>
          </div>

          <p className="svc-description">{service.description}</p>

          <Link href={service.ctaHref} className="svc-cta">
            <span>{service.ctaLabel}</span>
            <ArrowIcon />
          </Link>
        </div>

        {/* Right Column: Floating Panel */}
        <div className="svc-features-floating-panel">
          {service.image && (
            <div className="svc-panel-image-wrapper" aria-hidden="true">
              <div
                className="svc-panel-image"
                style={{ backgroundImage: `url('${service.image}')` }}
              />
              <div className="svc-panel-image-overlay" />
            </div>
          )}

          <div className="svc-panel-content">
            <p className="svc-features-heading">What&apos;s included</p>
            <ul className="svc-feature-list" role="list">
              {service.features.map((feature, i) => (
                <li key={i} className="svc-feature-item">
                  <CheckIcon />
                  <div className="svc-feature-text">
                    <span className="svc-feature-name">{feature.text}</span>
                    {feature.subnote !== undefined && (
                      <span className="svc-feature-subnote">{feature.subnote}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Page hero ────────────────────────────────────────────────────────────────
function ServicesHero() {
  return (
    <div className="svc-hero">
      <div className="svc-hero-glow" aria-hidden="true" />
      <div className="svc-hero-grid" aria-hidden="true" />

      <div className="svc-hero-inner">
        <p className="svc-hero-eyebrow">Our Services</p>
        <h1 className="svc-hero-title">
          Everything your business
          <br />
          <span className="svc-hero-accent">needs to grow online.</span>
        </h1>
        <p className="svc-hero-subtitle">
          Six focused disciplines. One studio. Built for businesses across
          Hyderabad that want a real digital presence — not just a template.
        </p>

        <nav aria-label="Jump to service section" className="svc-jump-nav">
          {SERVICES.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="svc-jump-link">
              {s.eyebrow}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <>
      <ServicesHero />

      <main className="svc-main">
        {SERVICES.map((service) => (
          <ServiceSection key={service.id} service={service} />
        ))}
      </main>

      {/* ── Bottom CTA band ── */}
      <div className="svc-bottom-cta">
        <div className="svc-bottom-cta-inner">
          <p className="svc-bottom-eyebrow">Ready to begin?</p>
          <h2 className="svc-bottom-title">
            Not sure which service is right for you?
          </h2>
          <p className="svc-bottom-body">
            Tell us about your business and we&apos;ll recommend the best
            starting point — no pressure, no jargon.
          </p>
          <Link href="/contact" className="svc-bottom-btn">
            <span>Book a Free Consultation</span>
            <ArrowIcon />
          </Link>
        </div>
      </div>

      {/* ── Scoped styles ── */}
      <style>{`

        /* ═══════════════════════════════════════════════════════
           SERVICES PAGE — SCOPED STYLES
        ═══════════════════════════════════════════════════════ */

        /* ── Hero ─────────────────────────────────────────── */

        .svc-hero {
          position: relative;
          background-color: var(--bg-surface-0);
          padding: clamp(120px, 14vw, 180px) 0 clamp(72px, 8vw, 100px);
          overflow: hidden;
        }

        .svc-hero-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 700px 420px at 50% 60%,
            var(--accent-fill-08) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .svc-hero-grid {
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

        .svc-hero-inner {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .svc-hero-eyebrow {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 600;
          letter-spacing: var(--tracking-eyebrow-wide);
          text-transform: uppercase;
          color: var(--text-accent);
          margin-bottom: 20px;
        }

        .svc-hero-title {
          font-family: var(--font-display);
          font-size: var(--text-section);
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-tight);
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .svc-hero-accent {
          color: var(--text-accent);
        }

        .svc-hero-subtitle {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          font-weight: 300;
          line-height: var(--leading-body);
          color: var(--text-secondary);
          max-width: 600px;
          margin-bottom: 48px;
        }

        /* ── Jump nav ─────────────────────────────────────── */

        .svc-jump-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }

        .svc-jump-link {
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

        .svc-jump-link:hover {
          color: var(--text-accent);
          border-color: var(--accent-border-hover);
          background-color: var(--accent-fill-08);
        }

        .svc-jump-link:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
        }

        /* ── Main wrapper ─────────────────────────────────── */

        .svc-main {
          background-color: var(--bg-surface-0);
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px) clamp(100px, 10vw, 160px);
          display: flex;
          flex-direction: column;
          gap: clamp(64px, 8vw, 120px);
        }

        /* ── Premium Showcase Box ─────────────────────────── */

        .svc-showcase-box {
          position: relative;
          scroll-margin-top: 100px;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          display: flex;
          min-height: 540px;
          width: 100%;
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.5);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .svc-showcase-box--primary {
          min-height: 640px;
        }

        .svc-showcase-box:hover {
          border-color: rgba(var(--service-color-rgb), 0.4);
          box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.6), 0 0 40px -10px rgba(var(--service-color-rgb), 0.15);
        }

        /* ── Background Layer ─────────────────────────────── */

        .svc-bg-layer {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background-color: rgba(var(--service-color-rgb), 0.1);
        }

        .svc-bg-placeholder {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(var(--service-color-rgb), 0.6) 0%,
            rgba(var(--service-color-rgb), 0.2) 40%,
            rgba(10, 10, 10, 0.95) 100%
          );
        }

        .svc-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(10, 10, 10, 0.85) 0%,
            rgba(10, 10, 10, 0.4) 40%,
            rgba(var(--service-color-rgb), 0.3) 100%
          );
        }

        .svc-ambient-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 70% 30%,
            rgba(var(--service-color-rgb), 0.5) 0%,
            rgba(var(--service-color-rgb), 0.15) 50%,
            transparent 80%
          );
          pointer-events: none;
          transition: background 0.6s ease;
        }

        .svc-showcase-box:hover .svc-ambient-glow {
          background: radial-gradient(
            circle at 70% 30%,
            rgba(var(--service-color-rgb), 0.65) 0%,
            rgba(var(--service-color-rgb), 0.25) 50%,
            transparent 85%
          );
        }

        /* ── Content Layer ────────────────────────────────── */

        .svc-content-layer {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: clamp(48px, 6vw, 80px);
          padding: clamp(48px, 6vw, 80px);
          width: 100%;
          align-items: center;
        }

        /* ── Text column ──────────────────────────────────── */

        .svc-text-col {
          display: flex;
          flex-direction: column;
          gap: 0;
          max-width: 600px;
        }

        .svc-eyebrow {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 600;
          letter-spacing: var(--tracking-eyebrow);
          text-transform: uppercase;
          color: rgba(var(--service-color-rgb), 0.9);
          margin-bottom: 20px;
        }

        .svc-heading-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .svc-icon-wrap {
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background-color: rgba(var(--service-color-rgb), 0.1);
          border: 1px solid rgba(var(--service-color-rgb), 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(var(--service-color-rgb), 1);
        }

        .svc-heading {
          font-family: var(--font-display);
          font-size: clamp(24px, 3vw, 42px);
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-tight);
          color: #ffffff;
        }

        .svc-description {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          font-weight: 300;
          line-height: var(--leading-body);
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 48px;
        }

        .svc-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--bg-base);
          background-color: #ffffff;
          border-radius: 9999px;
          padding: 14px 32px;
          width: fit-content;
          transition: filter 0.2s ease, transform 0.2s ease;
        }

        .svc-cta:hover {
          filter: brightness(0.9);
          transform: translateY(-1px);
        }

        .svc-cta:focus-visible {
          outline: 2px solid rgba(var(--service-color-rgb), 1);
          outline-offset: 3px;
        }

        /* ── Floating Panel ───────────────────────────────── */

        .svc-features-floating-panel {
          position: relative;
          background-color: rgba(10, 10, 10, 0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6);
          width: 100%;
          max-width: 500px;
          justify-self: end;
          overflow: hidden;
        }

        .svc-panel-content {
          position: relative;
          z-index: 2;
          padding: clamp(32px, 4vw, 48px);
        }

        .svc-panel-image-wrapper {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .svc-panel-image {
          position: absolute;
          inset: -10px;
          background-size: cover;
          background-position: center;
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
          opacity: 1;
        }

        .svc-showcase-box:hover .svc-panel-image {
          transform: scale(1.05);
        }

        .svc-panel-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(15, 15, 15, 0.95) 0%,
            rgba(15, 15, 15, 0.6) 45%,
            rgba(15, 15, 15, 0.1) 100%
          );
        }

        .svc-features-heading {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: var(--tracking-eyebrow);
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 24px;
        }

        .svc-feature-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .svc-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .svc-check-icon {
          flex-shrink: 0;
          margin-top: 3px;
          color: rgba(var(--service-color-rgb), 0.9);
        }

        .svc-feature-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .svc-feature-name {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 400;
          color: #ffffff;
          line-height: var(--leading-base);
        }

        .svc-feature-subnote {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.6);
          line-height: var(--leading-base);
        }

        /* ── Bottom CTA band ──────────────────────────────── */

        .svc-bottom-cta {
          background-color: var(--bg-surface-1);
          border-top: 1px solid var(--border-subtle);
          padding: clamp(72px, 8vw, 112px) 0;
          position: relative;
          overflow: hidden;
        }

        .svc-bottom-cta::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 600px 300px at 50% 50%,
            var(--accent-fill-08) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .svc-bottom-cta-inner {
          position: relative;
          max-width: 680px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .svc-bottom-eyebrow {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 600;
          letter-spacing: var(--tracking-eyebrow);
          text-transform: uppercase;
          color: var(--text-accent);
          margin-bottom: 16px;
        }

        .svc-bottom-title {
          font-family: var(--font-display);
          font-size: clamp(24px, 3vw, 38px);
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-tight);
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .svc-bottom-body {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 300;
          line-height: var(--leading-body);
          color: var(--text-secondary);
          margin-bottom: 36px;
        }

        .svc-bottom-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--bg-base);
          background-color: var(--accent);
          border-radius: 9999px;
          padding: 14px 32px;
          transition: filter 0.2s ease, transform 0.2s ease;
        }

        .svc-bottom-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }

        .svc-bottom-btn:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 3px;
        }

        /* ── Responsive ───────────────────────────────────── */

        @media (max-width: 1024px) {
          .svc-content-layer {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 48px;
          }

          .svc-features-floating-panel {
            justify-self: start;
            max-width: 100%;
          }

          .svc-bg-overlay {
            background: linear-gradient(
              180deg,
              rgba(10, 10, 10, 0.95) 0%,
              rgba(10, 10, 10, 0.8) 40%,
              rgba(var(--service-color-rgb), 0.3) 100%
            );
          }
        }

        @media (max-width: 600px) {
          .svc-content-layer {
            padding: 32px 24px;
            gap: 32px;
          }

          .svc-panel-content {
            padding: 28px 24px;
          }

          .svc-jump-nav {
            gap: 8px;
          }

          .svc-jump-link {
            font-size: 11px;
            padding: 7px 14px;
          }
        }
      `}</style>
    </>
  );
}
