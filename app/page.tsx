import type { Metadata } from "next";

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
  title: "VeXtiv | Digital Growth Agency in Hyderabad",
  description:
    "VeXtiv builds websites, QR systems, branding, and social media for restaurants, startups, and local businesses in Hyderabad. Get a free consultation.",
  openGraph: {
    title: "VeXtiv | Digital Growth Agency in Hyderabad",
    description:
      "VeXtiv builds websites, QR systems, branding, and social media for restaurants, startups, and local businesses in Hyderabad. Get a free consultation.",
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
export default function Home() {
  return (
    <div style={{ position: "relative" }}>
      <Hero />
      <TrustBar />
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
