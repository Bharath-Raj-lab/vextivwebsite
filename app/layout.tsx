import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import GtagLoader from "@/components/layout/GtagLoader";
import MetaPixel from "@/components/layout/MetaPixel";
import CookieConsent from "@/components/ui/CookieConsent";
import ClientProviders from "@/components/layout/ClientProviders";
import NextTopLoader from "nextjs-toploader";

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
  title: "VeXtiv",
  metadataBase: new URL("https://vextiv.tech"),
  description: "Digital solutions crafted with precision — VeXtiv",
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicons/apple-touch-icon.png',
    shortcut: '/favicons/favicon.ico',
  },
  openGraph: {
    images: [{ url: '/og-image.webp', width: 1200, height: 630 }],
  },
};

// ─── LocalBusiness schema (PRD §8.2, §1.4) ───────────────────────────────────
// NOTE: telephone, streetAddress, and geo coordinates are not specified in the
// PRD. Replace the placeholder strings below with real values before going live.
const localBusinessSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "VeXtiv",
  url: "https://vextiv.tech",
  telephone: "+91-6300318824",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Saroornagar",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500035",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.3541, // Saroornagar general coordinates
    longitude: 78.5323,
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
    "https://www.instagram.com/vextiv.tech",
    "https://www.linkedin.com/company/vextiv/",
    "https://www.facebook.com/people/Vextiv/61589618447564/",
  ],
};

// ─── WebSite schema with SearchAction (PRD §8.2) ─────────────────────────────
const webSiteSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VeXtiv",
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
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <NextTopLoader color="#C8F04D" showSpinner={false} />
        <ClientProviders>
          {/* Site-wide structured data */}
          <JsonLd schema={localBusinessSchema} />
          <JsonLd schema={webSiteSchema} />

          {/* Consent-gated tag loaders */}
          <GtagLoader />
          <MetaPixel />
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <CookieConsent />
        </ClientProviders>
      </body>
    </html>
  );
}
