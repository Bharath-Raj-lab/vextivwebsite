import { Metadata } from 'next';
import { caseStudies } from '@/lib/case-studies';
import WorkClient from './WorkClient';
import JsonLd from '@/components/seo/JsonLd';
import PageBackground from "@/components/ui/PageBackground";

export const revalidate = 3600; // SSG + ISR

export const metadata: Metadata = {
  metadataBase: new URL("https://vextiv.tech"),
  title: "Our Work | VeXtiv",
  description:
    "Explore our portfolio of digital experiences, branding, and QR systems designed for modern businesses across Hyderabad and globally.",
  openGraph: {
    title: "Our Work | VeXtiv",
    description:
      "Explore our portfolio of digital experiences, branding, and QR systems designed for modern businesses across Hyderabad and globally.",
    url: "https://vextiv.tech/work",
    siteName: "VeXtiv",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://vextiv.tech/work",
  },
};

// BreadcrumbList schema (PRD §8.2)
const breadcrumbSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://vextiv.tech/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Work',
      item: 'https://vextiv.tech/work',
    },
  ],
};

export default function WorkPage() {
  return (
    <div className="relative min-h-screen bg-[var(--bg-base)] pt-[calc(var(--navbar-height)+4rem)] pb-24">
      <div className="absolute top-0 left-0 w-full h-[60vh] min-h-[500px] overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <PageBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-base)] pointer-events-none" />
      </div>
      <div className="relative z-10">
        <JsonLd schema={breadcrumbSchema} />
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="mb-16">
          <h1 className="text-[length:var(--text-section)] font-display font-bold tracking-tight mb-4">
            Our <span className="text-[var(--accent)]">Work</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl">
            A selection of our recent projects. We help ambitious brands craft digital experiences that look stunning and drive real results.
          </p>
        </header>

        <WorkClient initialCaseStudies={caseStudies} />
      </div>
      </div>
    </div>
  );
}
