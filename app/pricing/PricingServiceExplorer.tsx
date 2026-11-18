"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { SERVICES, type ServiceItem } from "../services/servicesData";

type ExplorerService = ServiceItem & {
  contactService: string;
  audience: string[];
  outcomes: string[];
};

const PRICING_NOTE = "Pricing varies by region and complexity. Contact us for a custom quote.";

const EXPLORER_SERVICES: ExplorerService[] = SERVICES.map((service) => {
  const contactServiceMap: Record<string, string> = {
    "website-design-development": "Website Development",
    "branding-identity": "Branding & Identity",
    "content-creation": "Content Creation",
    "social-media-management": "Social Media Management",
    "local-seo-google-business-optimization": "Local SEO",
    "qr-ordering-systems": "QR Ordering System",
  };

  const audienceMap: Record<string, string[]> = {
    "website-design-development": [
      "Businesses that need a credible website",
      "Brands that want stronger conversion paths",
      "Teams that need SEO-ready structure",
    ],
    "branding-identity": [
      "New brands that need a professional identity",
      "Companies planning a refresh",
      "Founders who want consistent visuals",
    ],
    "content-creation": [
      "Businesses that need regular content output",
      "Brands that want polished campaign assets",
      "Teams that need a repeatable content system",
    ],
    "social-media-management": [
      "Brands that need consistent social presence",
      "Teams that want less day-to-day posting work",
      "Businesses trying to increase inbound enquiries",
    ],
    "local-seo-google-business-optimization": [
      "Local businesses that rely on nearby discovery",
      "Restaurants, cafes, and service providers",
      "Brands that want stronger map visibility",
    ],
    "qr-ordering-systems": [
      "Restaurants and cafes",
      "Hospitality teams that want faster service",
      "Businesses that want a cleaner guest experience",
    ],
  };

  const outcomesMap: Record<string, string[]> = {
    "website-design-development": [
      "Fast, mobile-friendly pages",
      "Clear enquiry paths and stronger conversion",
      "SEO-ready structure from day one",
    ],
    "branding-identity": [
      "A more credible visual identity",
      "Consistent brand application across touchpoints",
      "Design assets your team can actually use",
    ],
    "content-creation": [
      "Creative assets that support campaigns",
      "Content built for modern platforms",
      "A repeatable production system",
    ],
    "social-media-management": [
      "Consistent posting and community support",
      "Content aligned with your brand voice",
      "Performance tracking and refinement",
    ],
    "local-seo-google-business-optimization": [
      "Stronger local visibility",
      "Better Google Business Profile signals",
      "A clearer path from search to enquiry",
    ],
    "qr-ordering-systems": [
      "Faster menu access and smoother ordering",
      "A more premium guest experience",
      "Digital operations that reduce friction",
    ],
  };

  return {
    ...service,
    contactService: contactServiceMap[service.id] ?? "Other",
    audience: audienceMap[service.id] ?? [],
    outcomes: outcomesMap[service.id] ?? [],
  };
});

export default function PricingServiceExplorer() {
  const [activeId, setActiveId] = useState(EXPLORER_SERVICES[0].id);

  const activeService = useMemo(
    () => EXPLORER_SERVICES.find((service) => service.id === activeId) ?? EXPLORER_SERVICES[0],
    [activeId],
  );

  return (
    <section className="pricing-explorer" aria-labelledby="pricing-explorer-heading">
      <div className="pricing-explorer__inner">
        <div className="pricing-explorer__header">
          <p className="pricing-explorer__eyebrow">Choose a service</p>
          <h2 id="pricing-explorer-heading" className="pricing-explorer__title">
            Tap a service to see what it includes and who it&apos;s best for.
          </h2>
          <p className="pricing-explorer__lede">
            We keep pricing flexible because scope, region, and complexity change the work. Use the buttons below to find the right starting point, then we&apos;ll quote the actual project.
          </p>
        </div>

        <div className="pricing-explorer__tabs" role="tablist" aria-label="Pricing services">
          {EXPLORER_SERVICES.map((service) => {
            const isActive = service.id === activeId;
            return (
              <button
                key={service.id}
                id={`pricing-tab-${service.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`pricing-panel-${service.id}`}
                className={`pricing-explorer__tab${isActive ? " pricing-explorer__tab--active" : ""}`}
                onClick={() => setActiveId(service.id)}
              >
                <span className="pricing-explorer__tab-eyebrow">{service.eyebrow}</span>
                <span className="pricing-explorer__tab-name">{service.name}</span>
                <span className="pricing-explorer__tab-action">
                  View details
                  <span aria-hidden="true">→</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="pricing-explorer__panel-shell">
          <article
            id={`pricing-panel-${activeService.id}`}
            role="tabpanel"
            aria-labelledby={`pricing-tab-${activeService.id}`}
            className="pricing-explorer__panel"
          >
            <div className="pricing-explorer__panel-copy">
              <p className="pricing-explorer__panel-eyebrow">{activeService.eyebrow}</p>
              <h3 className="pricing-explorer__panel-title">{activeService.name}</h3>
              <p className="pricing-explorer__panel-description">{activeService.description}</p>

              <div className="pricing-explorer__panel-meta">
                <span className="pricing-explorer__panel-pill">What it&apos;s for</span>
                <span className="pricing-explorer__panel-pill pricing-explorer__panel-pill--muted">Tap a button above to switch services</span>
              </div>

              <div className="pricing-explorer__chips" aria-label="Who this service is for">
                {activeService.audience.map((item) => (
                  <span key={item} className="pricing-explorer__chip">{item}</span>
                ))}
              </div>
            </div>

            <div className="pricing-explorer__panel-card">
              <p className="pricing-explorer__card-title">What you get</p>
              <ul className="pricing-explorer__list" role="list">
                {activeService.features.map((feature) => (
                  <li key={feature.text} className="pricing-explorer__list-item">
                    <span className="pricing-explorer__check" aria-hidden="true">✓</span>
                    <span>
                      {feature.text}
                      {feature.subnote ? <em>{feature.subnote}</em> : null}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pricing-explorer__outcomes">
                <p className="pricing-explorer__card-title">Expected outcomes</p>
                <ul className="pricing-explorer__outcome-list" role="list">
                  {activeService.outcomes.map((item) => (
                    <li key={item} className="pricing-explorer__outcome-item">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="pricing-explorer__note">
                <strong>{PRICING_NOTE}</strong>
                <span>Local in Hyderabad and available for projects across India.</span>
              </div>

              <Link
                href={`/contact?service=${encodeURIComponent(activeService.contactService)}`}
                className="pricing-explorer__cta"
              >
                Start this service
              </Link>
            </div>
          </article>
        </div>
      </div>

      <style>{`
        .pricing-explorer {
          padding: clamp(72px, 9vw, 104px) clamp(24px, 4vw, 64px);
        }

        .pricing-explorer__inner {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          gap: 32px;
        }

        .pricing-explorer__header {
          max-width: 820px;
        }

        .pricing-explorer__eyebrow,
        .pricing-explorer__panel-eyebrow {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow);
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 14px;
        }

        .pricing-explorer__title {
          font-family: var(--font-display);
          font-size: clamp(30px, 4vw, 54px);
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          line-height: 1.08;
          color: var(--text-primary);
          margin-bottom: 14px;
        }

        .pricing-explorer__lede,
        .pricing-explorer__panel-description {
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.75;
          color: var(--text-secondary);
        }

        .pricing-explorer__tabs {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .pricing-explorer__tab {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          padding: 18px;
          border-radius: 18px;
          border: 1px solid var(--border-default);
          background: var(--bg-surface-2);
          color: var(--text-secondary);
          text-align: left;
          transition: transform 180ms ease, border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease;
          min-height: 126px;
        }

        .pricing-explorer__tab:hover {
          transform: translateY(-1px);
          border-color: var(--border-hover);
          background: var(--bg-surface-3);
        }

        .pricing-explorer__tab--active {
          border-color: var(--accent-border-card);
          background: linear-gradient(180deg, rgba(200, 240, 77, 0.12), rgba(255, 255, 255, 0.03));
          color: var(--text-primary);
          box-shadow: 0 12px 32px -20px rgba(200, 240, 77, 0.5);
        }

        .pricing-explorer__tab-eyebrow {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-accent);
          font-weight: 700;
        }

        .pricing-explorer__tab-name {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
        }

        .pricing-explorer__tab-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: auto;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.03em;
          color: var(--text-accent);
        }

        .pricing-explorer__panel-shell {
          border-radius: 28px;
          padding: 1px;
          background: linear-gradient(180deg, rgba(200, 240, 77, 0.24), rgba(255, 255, 255, 0.04));
        }

        .pricing-explorer__panel {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
          gap: 20px;
          padding: clamp(24px, 3vw, 36px);
          background: var(--bg-surface-2);
          border-radius: 27px;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .pricing-explorer__panel-copy {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 8px 8px 8px 0;
        }

        .pricing-explorer__panel-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .pricing-explorer__panel-pill {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 6px 10px;
          background: rgba(200, 240, 77, 0.12);
          border: 1px solid var(--accent-border-card);
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
        }

        .pricing-explorer__panel-pill--muted {
          background: var(--bg-surface-1);
          border-color: var(--border-subtle);
          color: var(--text-secondary);
        }

        .pricing-explorer__panel-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 3vw, 44px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: var(--tracking-heading);
          color: var(--text-primary);
        }

        .pricing-explorer__chips,
        .pricing-explorer__outcome-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .pricing-explorer__chip,
        .pricing-explorer__outcome-item {
          border: 1px solid var(--border-default);
          background: var(--bg-surface-1);
          color: var(--text-secondary);
          border-radius: 999px;
          padding: 8px 12px;
          font-family: var(--font-body);
          font-size: 13px;
        }

        .pricing-explorer__panel-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 24px;
          border-radius: 22px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.015));
          border: 1px solid var(--border-default);
        }

        .pricing-explorer__card-title {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-accent);
        }

        .pricing-explorer__list {
          display: grid;
          gap: 10px;
        }

        .pricing-explorer__list-item {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.6;
        }

        .pricing-explorer__list-item em {
          display: block;
          font-style: normal;
          color: var(--text-muted);
        }

        .pricing-explorer__check {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(200, 240, 77, 0.12);
          color: var(--text-accent);
          border: 1px solid var(--accent-border-card);
          margin-top: 2px;
        }

        .pricing-explorer__note {
          display: grid;
          gap: 4px;
          padding: 14px 16px;
          border-radius: 14px;
          background: var(--bg-surface-1);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.6;
        }

        .pricing-explorer__note strong {
          color: var(--text-primary);
          font-weight: 700;
        }

        .pricing-explorer__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 20px;
          border-radius: 999px;
          background: var(--gradient-btn);
          color: #000;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 180ms ease, filter 180ms ease;
        }

        .pricing-explorer__cta:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
        }

        .pricing-explorer__cta:focus-visible,
        .pricing-explorer__tab:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 3px;
        }

        @media (max-width: 980px) {
          .pricing-explorer__tabs {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .pricing-explorer__panel {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .pricing-explorer {
            padding: 56px 16px;
          }

          .pricing-explorer__tabs {
            display: flex;
            overflow-x: auto;
            gap: 12px;
            padding-bottom: 6px;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .pricing-explorer__tabs::-webkit-scrollbar {
            display: none;
          }

          .pricing-explorer__tab {
            flex: 0 0 82%;
            min-width: 250px;
            scroll-snap-align: start;
            padding: 16px;
            min-height: 118px;
          }

          .pricing-explorer__title {
            font-size: clamp(26px, 8vw, 36px);
          }

          .pricing-explorer__panel {
            padding: 18px;
            gap: 14px;
          }

          .pricing-explorer__panel-copy {
            padding: 0;
          }

          .pricing-explorer__panel-title {
            font-size: clamp(24px, 7vw, 32px);
          }

          .pricing-explorer__panel-pill,
          .pricing-explorer__chip,
          .pricing-explorer__outcome-item {
            font-size: 12px;
          }

          .pricing-explorer__panel-card {
            padding: 18px;
          }

          .pricing-explorer__cta {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}