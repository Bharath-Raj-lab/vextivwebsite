import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GtagLoader from "@/components/layout/GtagLoader";
import MetaPixel from "@/components/layout/MetaPixel";
import CookieConsent from "@/components/ui/CookieConsent";

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
        {/* Consent-gated tag loaders — render <Script> tags only after cookie acceptance */}
        <GtagLoader />   {/* GA4 + Google Ads: single gtag.js loader, one init block */}
        <MetaPixel />    {/* Facebook Pixel: independent fbevents.js — kept separate */}
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        {/* DPDP Act 2023 consent banner — fixed bottom, above mobile CTA bar */}
        <CookieConsent />
      </body>
    </html>
  );
}
