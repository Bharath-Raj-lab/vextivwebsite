"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

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

// ─── Pricing plan CTA ─────────────────────────────────────────────────────────
export function PricingCtaLink({
  href,
  label,
  plan,
  variant = "default",
}: {
  href: string;
  label: string;
  plan: string;
  variant?: "default" | "popular" | "outline";
}) {
  return (
    <Link
      href={href}
      className={`pricing-cta pricing-cta--${variant} ${variant === "popular" ? "btn-premium" : "btn-premium-ghost"}`}
      onClick={() => trackEvent("pricing_plan_click", { plan })}
    >
      <span>{label}</span>
      <ArrowIcon />
    </Link>
  );
}

// ─── Custom Solutions discovery call CTA ──────────────────────────────────────
export function CustomSolutionCtaLink() {
  return (
    <Link
      href="/contact"
      className="custom-solutions-cta-btn btn-premium-ghost"
      onClick={() =>
        trackEvent("pricing_plan_click", { plan: "Custom Solutions Discovery Call" })
      }
    >
      <span>Book a Free Strategy Call</span>
      <ArrowIcon />
    </Link>
  );
}

// ─── Bottom CTA button ────────────────────────────────────────────────────────
export function BottomCtaLink() {
  return (
    <Link
      href="/contact"
      className="pricing-bottom-btn btn-premium"
      onClick={() =>
        trackEvent("pricing_plan_click", { plan: "Free Consultation CTA" })
      }
    >
      <span>Book a Free Strategy Call</span>
      <ArrowIcon />
    </Link>
  );
}
