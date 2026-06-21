import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import BlogArticleClient from './BlogArticleClient';
import JsonLd from '@/components/seo/JsonLd';

export const revalidate = 3600;

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Not Found | Vextiv Studio' };

  const fullSuffix = " - Insights from Vextiv Studio, Hyderabad.";
  const shortSuffix = " — Vextiv Studio, Hyderabad.";
  
  function trimAtWord(str: string, maxLen: number) {
    if (str.length <= maxLen) return str;
    const trimmed = str.substring(0, maxLen);
    const lastSpace = trimmed.lastIndexOf(" ");
    return lastSpace > 0 ? trimmed.substring(0, lastSpace) : trimmed;
  }

  let desc = post.excerpt;
  if (desc.includes("Hyderabad")) {
    if (desc.length > 160) {
      desc = trimAtWord(desc, 157) + "...";
    }
  } else {
    if (desc.length + fullSuffix.length <= 160) {
      desc += fullSuffix;
    } else if (desc.length + shortSuffix.length <= 160) {
      desc += shortSuffix;
    } else {
      const maxLen = 160 - shortSuffix.length - 3;
      desc = trimAtWord(desc, maxLen) + "..." + shortSuffix;
    }
  }

  return {
    metadataBase: new URL("https://vextiv.tech"),
    title: post.title + " | Vextiv Studio",
    description: desc,
    openGraph: {
      title: post.title + " | Vextiv Studio",
      description: desc,
      url: "https://vextiv.tech/blog/" + slug,
      siteName: "Vextiv Studio",
      images: [post.thumbnail],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      canonical: "https://vextiv.tech/blog/" + slug,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category);

  // BreadcrumbList schema (PRD §8.2) — dynamic, built from route segments
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
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://vextiv.tech/blog/${post.slug}`,
      },
    ],
  };

  // Article schema (PRD §8.2) — dynamic, built from post data
  const articleSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: [post.thumbnail],
    datePublished: post.date,
    // dateModified falls back to datePublished when not separately tracked
    dateModified: post.date,
    author: [
      {
        '@type': 'Person',
        name: post.author.name,
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'Vextiv Studio',
      url: 'https://vextiv.tech',
      logo: {
        '@type': 'ImageObject',
        url: 'https://vextiv.tech/favicons/favicon-32x32.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://vextiv.tech/blog/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-[calc(var(--navbar-height)+4rem)] pb-24">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={articleSchema} />
      <BlogArticleClient slug={post.slug} />

      <article className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="mb-6 flex items-center justify-center gap-3 text-sm">
            <Link href="/blog" className="text-[var(--accent)] hover:underline font-medium uppercase tracking-wider">
              {post.category}
            </Link>
          </div>
          <h1 className="text-[length:var(--text-section)] font-display font-bold text-[var(--text-primary)] leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-[var(--text-secondary)] mb-10">
            <div className="flex items-center gap-2">
              <Image src={post.author.avatar} alt={post.author.name} width={40} height={40} className="rounded-full" />
              <div className="text-left">
                <p className="text-sm font-medium text-[var(--text-primary)]">{post.author.name}</p>
                <p className="text-xs">{post.author.role}</p>
              </div>
            </div>
            <div className="h-8 w-px bg-[var(--border-subtle)] mx-2"></div>
            <div className="text-sm flex flex-col items-start">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Thumbnail Hero */}
        <div className="relative w-full h-[40vh] md:h-[60vh] rounded-3xl overflow-hidden mb-16 shadow-2xl border border-[var(--border-subtle)]">
          <Image
            src={post.thumbnail}
            alt={`${post.title} hero`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Content */}
        <div
          className="max-w-3xl mx-auto mb-20 text-[var(--text-secondary)] text-lg leading-relaxed space-y-6 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-[var(--text-primary)] [&>h3]:mt-10 [&>h3]:mb-4 [&>p]:mb-6 [&>a]:text-[var(--accent)] hover:[&>a]:text-[var(--text-primary)] [&>a]:underline [&>img]:rounded-2xl [&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA Block */}
        <div className="bg-[var(--bg-surface-1)] border border-[var(--border-subtle)] rounded-3xl p-10 text-center mb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[var(--gradient-hero-glow)] opacity-20 pointer-events-none" />
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-4 relative z-10">
            Need help implementing this?
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 relative z-10">
            Our team of experts at Vextiv Studio can help you build and scale your digital presence.
          </p>
          <Link
            href="/contact"
            className="px-8 py-4 bg-[var(--accent)] text-black font-bold rounded-full hover:bg-white transition-colors duration-300 relative z-10 inline-block"
          >
            Get in Touch
          </Link>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-8">Related Reads</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group block relative rounded-xl overflow-hidden bg-[var(--bg-surface-1)] border border-[var(--border-subtle)] hover:border-[var(--accent-border-hover)] transition-all duration-500 hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative h-40 w-full overflow-hidden bg-zinc-900">
                    <Image
                      src={related.thumbnail}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 leading-tight group-hover:text-[var(--accent)] transition-colors duration-300">
                      {related.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-auto flex items-center gap-2">
                      {related.readTime} &bull; {new Date(related.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
