/**
 * app/contact/page.tsx — Contact page server shell.
 *
 * Keeps the page as a Server Component for metadata. All interactivity
 * is in ContactForm (client). Suspense boundary is required because
 * ContactForm reads useSearchParams().
 */
import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContactForm from './ContactForm';
import JsonLd from "@/components/seo/JsonLd";

import { BASE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Contact VeXtiv",
  description:
    "Get in touch with VeXtiv. Tell us about your project in Hyderabad or beyond, and we'll respond within 1–2 business days with a tailored proposal.",
  openGraph: {
    title: "Contact VeXtiv",
    description:
      "Get in touch with VeXtiv. Tell us about your project in Hyderabad or beyond, and we'll respond within 1–2 business days with a tailored proposal.",
    url: `${BASE_URL}/contact`,
    siteName: "VeXtiv",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
};

export default function ContactPage() {
  const contactPageSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact VeXtiv",
    url: `${BASE_URL}/contact`,
    description:
      "Contact VeXtiv to discuss websites, branding, content, SEO, and digital growth projects in Hyderabad.",
    mainEntity: {
      "@type": "Organization",
      name: "VeXtiv",
      url: BASE_URL,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "vextiv.tech@gmail.com",
          areaServed: ["Hyderabad", "India"],
          availableLanguage: ["en"],
        },
      ],
    },
  };

  return (
    <>
      <JsonLd schema={contactPageSchema} />
      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>
    </>
  );
}
