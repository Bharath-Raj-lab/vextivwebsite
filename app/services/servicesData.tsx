import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ServiceFeature {
  text: string;
  subnote?: string;
}

export interface ServiceItem {
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

// ─── Bullet check icon ────────────────────────────────────────────────────────
export function CheckIcon() {
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
export function ArrowIcon() {
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

// ─── Service data ─────────────────────────────────────────────────────────────
export const SERVICES: ServiceItem[] = [
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
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <line x1="2" y1="10" x2="26" y2="10" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="6" cy="7" r="1.2" fill="currentColor" />
        <circle cx="10" cy="7" r="1.2" fill="currentColor" />
        <circle cx="14" cy="7" r="1.2" fill="currentColor" />
        <rect x="5" y="14" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <line x1="16" y1="14" x2="23" y2="14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="16" y1="17" x2="23" y2="17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="16" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="14" cy="14" r="3" fill="currentColor" opacity="0.25" />
        <line x1="14" y1="2" x2="14" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="14" y1="22" x2="14" y2="26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="2" y1="14" x2="6" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="22" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="5.5" y1="5.5" x2="8.5" y2="8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="19.5" y1="19.5" x2="22.5" y2="22.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="22.5" y1="5.5" x2="19.5" y2="8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="8.5" y1="19.5" x2="5.5" y2="22.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
    ctaLabel: "See Pricing",
    ctaHref: "/pricing",
    colorRgb: "249, 115, 22", // Orange
    image: "/stitch/content.png",
    iconPath: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="24" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <polygon points="11,8.5 11,17.5 19.5,13" fill="currentColor" opacity="0.85" />
        <line x1="6" y1="24" x2="22" y2="24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="11" y1="21" x2="11" y2="24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="17" y1="21" x2="17" y2="24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="22" cy="6" r="3.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="6" cy="14" r="3.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="22" cy="22" r="3.2" stroke="currentColor" strokeWidth="1.8" />
        <line x1="9.2" y1="12.4" x2="18.8" y2="7.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="9.2" y1="15.6" x2="18.8" y2="20.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
    ctaLabel: "See Pricing",
    ctaHref: "/pricing",
    colorRgb: "34, 197, 94", // Green
    image: "/stitch/local.png",
    iconPath: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="12" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
        <line x1="17.5" y1="17.5" x2="26" y2="26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="9" y1="11" x2="15" y2="11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="12" y1="8" x2="12" y2="14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="16" y="3" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="3" y="16" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="5.5" y="5.5" width="4" height="4" rx="0.8" fill="currentColor" />
        <rect x="18.5" y="5.5" width="4" height="4" rx="0.8" fill="currentColor" />
        <rect x="5.5" y="18.5" width="4" height="4" rx="0.8" fill="currentColor" />
        <line x1="16" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="16" y1="20" x2="16" y2="25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="20" y1="20" x2="25" y2="20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="23" y1="16" x2="25" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="25" y1="20" x2="25" y2="25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="20" y1="25" x2="23" y2="25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];
