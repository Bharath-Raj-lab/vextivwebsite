/**
 * app/audit/page.tsx — Free Digital Audit funnel page.
 *
 * Server Component shell: handles metadata (noindex/nofollow) and renders
 * the suspense boundary. All interactivity is isolated to AuditForm (client).
 */
import type { Metadata } from 'next';
import { Suspense } from 'react';
import AuditForm from './AuditForm';

// ─── Metadata ─────────────────────────────────────────────────────────────────
// noindex + nofollow — this funnel page must never appear in search results.

import { BASE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Free Digital Audit | VeXtiv",
  description:
    "Get a free digital audit for your Hyderabad business. Fill in our brief form and our team will respond within 1–2 business days.",
  openGraph: {
    title: "Free Digital Audit | VeXtiv",
    description:
      "Get a free digital audit for your Hyderabad business. Fill in our brief form and our team will respond within 1–2 business days.",
    url: `${BASE_URL}/audit`,
    siteName: "VeXtiv",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: `${BASE_URL}/audit`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AuditPage() {
  return (
    // Suspense boundary required because AuditForm reads useSearchParams()
    // inside a client component — Next.js App Router requires this.
    <Suspense fallback={null}>
      <AuditForm />
    </Suspense>
  );
}
