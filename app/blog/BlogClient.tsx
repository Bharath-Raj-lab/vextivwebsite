'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost, BlogCategory } from '@/types/blog';
import { trackBlogArticleOpen } from '@/lib/analytics';

const CATEGORIES: ('All' | BlogCategory)[] = ['All', 'Digital Strategy', 'Tech & Tools', 'Local SEO', 'Design & Branding'];
const POSTS_PER_PAGE = 6;

export default function BlogClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [activeFilter, setActiveFilter] = useState<'All' | BlogCategory>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleFilterClick = (category: 'All' | BlogCategory) => {
    setActiveFilter(category);
    setCurrentPage(1);
  };

  const filteredPosts = initialPosts.filter(
    (post) => activeFilter === 'All' || post.category === activeFilter
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => handleFilterClick(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
              activeFilter === category
                ? 'bg-[var(--accent-fill-10)] text-[var(--accent)] border-[var(--accent-border-active)] shadow-[0_0_15px_rgba(200,240,77,0.1)]'
                : 'bg-[var(--bg-surface-2)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {paginatedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block relative rounded-2xl overflow-hidden bg-[var(--bg-surface-1)] border border-[var(--border-subtle)] hover:border-[var(--accent-border-hover)] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--accent-fill-08)] flex flex-col"
            onClick={() => trackBlogArticleOpen(post.slug)}
          >
            <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
              {post.thumbnail ? (
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-surface-2)]">
                  <span className="text-[var(--text-muted)] text-sm">No Thumbnail</span>
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--bg-surface-0)]/80 text-[var(--text-primary)] backdrop-blur-md border border-[var(--border-subtle)]">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="p-6 relative z-10 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-4 text-xs text-[var(--text-muted)] font-medium uppercase tracking-wide">
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span>&bull;</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 leading-tight group-hover:text-[var(--accent)] transition-colors duration-300">
                {post.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="mt-auto flex items-center gap-3">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-sm text-[var(--text-primary)] font-medium">{post.author.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-[var(--text-muted)]">No posts found for this category.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Blog pagination">
          <div className="flex justify-center gap-2 mb-20">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                aria-current={currentPage === i + 1 ? "page" : undefined}
                aria-label={`Go to page ${i + 1}`}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentPage === i + 1
                    ? 'bg-[var(--accent)] text-black'
                    : 'bg-[var(--bg-surface-2)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-3)]'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Newsletter Signup */}
      <div className="bg-[var(--bg-surface-1)] border border-[var(--border-subtle)] rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero-glow)] opacity-20 pointer-events-none" />
        <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--text-primary)] mb-4 relative z-10">
          Stay Ahead of the Curve
        </h2>
        <p className="text-[var(--text-secondary)] mb-8 max-w-lg mx-auto relative z-10">
          Join our newsletter to get actionable insights, digital strategies, and agency news delivered straight to your inbox.
        </p>
        {subscribed ? (
          <div className="bg-[var(--accent-fill-10)] border border-[var(--accent-border-active)] text-[var(--accent)] px-6 py-4 rounded-xl inline-block font-medium relative z-10">
            Thanks for subscribing! Keep an eye on your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10">
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] text-[var(--text-primary)] px-5 py-3 rounded-xl focus:outline-none focus:border-[var(--accent-focus)]"
            />
            <button
              type="submit"
              className="bg-[var(--text-primary)] text-black px-6 py-3 rounded-xl font-bold hover:bg-[var(--accent)] transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
