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
  title: 'Contact Us — Vextiv Studio',
  description:
    'Get in touch with Vextiv Studio. Tell us about your project and we\'ll respond within 1–2 business days with a tailored proposal.',
};

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactForm />
    </Suspense>
  );
}
