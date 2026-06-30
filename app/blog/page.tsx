import { blogPosts } from '@/lib/blog';
import { Metadata } from 'next';
import BlogClient from './BlogClient';
import JsonLd from '@/components/seo/JsonLd';
import PageBackground from "@/components/ui/PageBackground";

import { BASE_URL } from "@/lib/constants";

export const revalidate = 900; // ISR revalidate 900

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Blog | VeXtiv",
  description:
    "Insights, strategies, and deep dives on digital transformation, local SEO, and online growth for modern restaurants and local businesses in Hyderabad.",
  openGraph: {
    title: "Blog | VeXtiv",
    description:
      "Insights, strategies, and deep dives on digital transformation, local SEO, and online growth for modern restaurants and local businesses in Hyderabad.",
    url: `${BASE_URL}/blog`,
    siteName: "VeXtiv",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: `${BASE_URL}/blog`,
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
      item: `${BASE_URL}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: `${BASE_URL}/blog`,
    },
  ],
};

export default function BlogPage() {
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
            Our <span className="text-[var(--accent)]">Insights</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl">
            Strategies, trends, and stories to help your business navigate the digital landscape.
          </p>
        </header>

        <BlogClient initialPosts={blogPosts} />
      </div>
      </div>
    </div>
  );
}
