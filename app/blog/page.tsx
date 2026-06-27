import { blogPosts } from '@/lib/blog';
import { Metadata } from 'next';
import BlogClient from './BlogClient';
import JsonLd from '@/components/seo/JsonLd';

export const revalidate = 900; // ISR revalidate 900

export const metadata: Metadata = {
  metadataBase: new URL("https://vextiv.tech"),
  title: "Blog | VeXtiv",
  description:
    "Insights, strategies, and deep dives on digital transformation, local SEO, and online growth for modern restaurants and local businesses in Hyderabad.",
  openGraph: {
    title: "Blog | VeXtiv",
    description:
      "Insights, strategies, and deep dives on digital transformation, local SEO, and online growth for modern restaurants and local businesses in Hyderabad.",
    url: "https://vextiv.tech/blog",
    siteName: "VeXtiv",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://vextiv.tech/blog",
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
      name: 'Blog',
      item: 'https://vextiv.tech/blog',
    },
  ],
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-[calc(var(--navbar-height)+4rem)] pb-24">
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
  );
}
