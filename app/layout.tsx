import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const syne = Syne({
  weight: ["700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Vextiv Studio",
  metadataBase: new URL("https://vextiv.tech"),
  description: "Digital solutions crafted with precision — Vextiv Studio",
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicons/apple-touch-icon.png',
    shortcut: '/favicons/favicon.ico',
  },
  openGraph: {
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

// ─── LocalBusiness schema (PRD §8.2, §1.4) ───────────────────────────────────
// NOTE: telephone, streetAddress, and geo coordinates are not specified in the
// PRD. Replace the placeholder strings below with real values before going live.
const localBusinessSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Vextiv Studio",
  url: "https://vextiv.tech",
  // TODO: Replace with real telephone number (PRD §8.2 — not yet provided)
  telephone: "/* PLACEHOLDER: +91-XXXXXXXXXX */",
  address: {
    "@type": "PostalAddress",
    // TODO: Replace with real street address (PRD §8.2 — not yet provided)
    streetAddress: "/* PLACEHOLDER: Street Address */",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    // TODO: Replace with real office latitude/longitude (not yet provided)
    latitude: 0, // PLACEHOLDER
    longitude: 0, // PLACEHOLDER
  },
  // PRD §8.4 — full areaServed list
  areaServed: [
    "Hyderabad",
    "Secunderabad",
    "Gachibowli",
    "Hitech City",
    "Banjara Hills",
    "Jubilee Hills",
    "Kondapur",
    "Madhapur",
    "Telangana",
    "Andhra Pradesh",
  ],
  openingHours: "Mo-Fr 09:00-18:00",
  sameAs: [
    // TODO: Add verified social profile URLs when available
  ],
};

// ─── WebSite schema with SearchAction (PRD §8.2) ─────────────────────────────
const webSiteSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Vextiv Studio",
  url: "https://vextiv.tech",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://vextiv.tech/blog?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Site-wide structured data */}
        <JsonLd schema={localBusinessSchema} />
        <JsonLd schema={webSiteSchema} />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
