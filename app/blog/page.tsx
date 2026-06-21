import { blogPosts } from '@/lib/blog';
import BlogClient from './BlogClient';

export const revalidate = 900; // ISR revalidate 900

export const metadata = {
  title: 'Blog | Vextiv Studio',
  description: 'Insights, strategies, and deep dives on digital transformation for modern businesses.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-[calc(var(--navbar-height)+4rem)] pb-24">
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
