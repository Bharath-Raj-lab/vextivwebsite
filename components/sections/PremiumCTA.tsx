"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import WordSpinner from "@/components/ui/WordSpinner";

// ─── CTA Section ──────────────────────────────────────────────────────────────
// Layout: two-column, content left / image right (with subtle tilt like reference).
// Moderate headline scale, tight spacing rhythm, left-aligned.
// ─────────────────────────────────────────────────────────────────────────────

export default function PremiumCTA() {
  return (
    <section style={{ backgroundColor: "#0a0a0a", padding: "5rem 0" }}>
      {/* ── Controlled container ── */}
      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "0 3rem",
        }}
      >
        {/* ── Two-column layout ── */}
        <div
          className="cta-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            alignItems: "center",
            gap: "4rem",
          }}
        >
          {/* ══ LEFT: Text content ══ */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>

            {/* Label */}
            <p
              style={{
                margin: 0,
                marginBottom: "1rem",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#C8F04D",
              }}
            >
              GET STARTED
            </p>

            {/* Headline */}
            <h2
              style={{
                margin: 0,
                marginBottom: "1rem",
                fontSize: "clamp(1.6rem, 2.8vw, 2.25rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              Ready To Grow<br />Your <WordSpinner words={["Business", "Brand", "Audience", "Startup", "Sales"]} style={{ color: "#C8F04D" }} /> Online?
            </h2>

            {/* Description */}
            <p
              style={{
                margin: 0,
                marginBottom: "2rem",
                maxWidth: "420px",
                fontSize: "15px",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.50)",
              }}
            >
              Let&apos;s build a website, brand, and digital presence that
              attracts customers and drives growth.
            </p>

            {/* CTA Button */}
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "#C8F04D",
                color: "#000000",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                padding: "14px 28px",
                borderRadius: "9999px",
                textDecoration: "none",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#d5f36e";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C8F04D";
              }}
              onClick={() => trackEvent('cta_click', { label: 'Book a Free Consultation', location: 'premium-cta' })}
            >
              BOOK A FREE CONSULTATION
              <ArrowRight style={{ width: "14px", height: "14px" }} />
            </Link>

            {/* Trust text */}
            <p
              style={{
                margin: 0,
                marginTop: "1.25rem",
                fontSize: "12px",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              Built for Restaurants, Startups, Local Businesses &amp; Growing Brands.
            </p>

          </div>

          {/* ══ RIGHT: Image panel — tilted like reference ══ */}
          <div
            className="cta-image-col"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Subtle glow behind the image */}
            <div
              style={{
                position: "absolute",
                inset: "-20px",
                background:
                  "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(200,240,77,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Tilted image card — matches reference composition */}
            <div
              style={{
                position: "relative",
                width: "100%",
                borderRadius: "16px",
                overflow: "hidden",
                transform: "rotate(2deg)",
                boxShadow:
                  "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
              }}
            >
              <Image
                src="/cta-panel.webp"
                alt="Vextiv digital workspace"
                width={800}
                height={520}
                style={{
                  width: "100%",
                  height: "240px",
                  objectFit: "cover",
                  display: "block",
                }}
                priority
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── Responsive ── */}
      <style>{`
        @media (max-width: 900px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
          }
          .cta-image-col {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
