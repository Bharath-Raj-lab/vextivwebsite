import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { SERVICES } from "./servicesData";
import { StickyServices } from "./StickyServices";
import PageBackground from "@/components/ui/PageBackground";

import { BASE_URL } from "@/lib/constants";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Services | VeXtiv",
  description:
    "From websites to branding, QR ordering systems to local SEO — VeXtiv delivers end-to-end digital services for businesses across Hyderabad and beyond.",
  openGraph: {
    title: "Services | VeXtiv",
    description:
      "From websites to branding, QR ordering systems to local SEO — VeXtiv delivers end-to-end digital services for businesses across Hyderabad and beyond.",
    url: `${BASE_URL}/services`,
    siteName: "VeXtiv",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: `${BASE_URL}/services`,
  },
};

// ─── Arrow icon for CTA ───────────────────────────────────────────────────────
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

// ─── Page hero ────────────────────────────────────────────────────────────────
function ServicesHero() {
  return (
    <div className="svc-hero">
      <PageBackground />
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
  // Service schemas (PRD §8.2, §2.1) — one block per service
  const serviceSchemas: Record<string, unknown>[] = SERVICES.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: "VeXtiv",
      url: BASE_URL,
    },
    // PRD §8.4 — areaServed list
    areaServed: [
      'Hyderabad',
      'Secunderabad',
      'Gachibowli',
      'Hitech City',
      'Banjara Hills',
      'Jubilee Hills',
      'Kondapur',
      'Madhapur',
      'Telangana',
      'Andhra Pradesh',
    ],
    url: `${BASE_URL}/services#${service.id}`,
  }));

  return (
    <>
      {/* Service structured data — one <script> block per service */}
      {serviceSchemas.map((schema, i) => (
        <JsonLd key={i} schema={schema} />
      ))}

      <ServicesHero />

      <main className="bg-black">
        <StickyServices services={SERVICES} />
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
          <Link href="/contact" className="svc-bottom-btn btn-premium">
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
          background: var(--gradient-btn);
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

        @media (max-width: 600px) {
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
