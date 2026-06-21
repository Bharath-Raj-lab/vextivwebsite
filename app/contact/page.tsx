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

export const metadata: Metadata = {
  metadataBase: new URL("https://vextiv.tech"),
  title: "Contact Us | Vextiv Studio",
  description:
    "Get in touch with Vextiv Studio. Tell us about your project in Hyderabad or beyond, and we'll respond within 1–2 business days with a tailored proposal.",
  openGraph: {
    title: "Contact Us | Vextiv Studio",
    description:
      "Get in touch with Vextiv Studio. Tell us about your project in Hyderabad or beyond, and we'll respond within 1–2 business days with a tailored proposal.",
    url: "https://vextiv.tech/contact",
    siteName: "Vextiv Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://vextiv.tech/contact",
  },
};

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactForm />
    </Suspense>
  );
}
