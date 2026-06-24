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

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://vextiv.tech"),
  title: "VeXtiv Studio | Digital Growth Agency in Hyderabad",
  description:
    "VeXtiv Studio builds websites, QR systems, branding, and social media for restaurants, startups, and local businesses in Hyderabad. Get a free consultation.",
  openGraph: {
    title: "VeXtiv Studio | Digital Growth Agency in Hyderabad",
    description:
      "VeXtiv Studio builds websites, QR systems, branding, and social media for restaurants, startups, and local businesses in Hyderabad. Get a free consultation.",
    url: "https://vextiv.tech",
    siteName: "VeXtiv Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://vextiv.tech",
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
