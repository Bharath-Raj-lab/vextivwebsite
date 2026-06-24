import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { caseStudies, getCaseStudyBySlug } from '@/lib/case-studies';
import CaseStudyClient, { CaseStudyCtaLink, CaseStudyLiveLink } from './CaseStudyClient';
import JsonLd from '@/components/seo/JsonLd';

export const revalidate = 3600;

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: "Not Found | VeXtiv Studio" };

  const fullSuffix = " - Check out this project by VeXtiv Studio, a digital agency based in Hyderabad.";
  const shortSuffix = " — VeXtiv Studio, Hyderabad.";
  const desc = study.outcomeHeadline.length + fullSuffix.length <= 160 
    ? study.outcomeHeadline + fullSuffix 
    : study.outcomeHeadline + shortSuffix;

  return {
    metadataBase: new URL("https://vextiv.tech"),
    title: study.title + " | VeXtiv Studio",
    description: desc,
    openGraph: {
      title: study.title + " | VeXtiv Studio",
      description: desc,
      url: "https://vextiv.tech/work/" + slug,
      siteName: "VeXtiv Studio",
      images: [study.thumbnail],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      canonical: "https://vextiv.tech/work/" + slug,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  // BreadcrumbList schema (PRD §8.2) — dynamic, built from route segment
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
      {
        '@type': 'ListItem',
        position: 3,
        name: study.title,
        item: `https://vextiv.tech/work/${study.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--bg-base)] pt-32 pb-24">
      <JsonLd schema={breadcrumbSchema} />
      <CaseStudyClient slug={study.slug} />

      <article className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <header className="mb-16 text-center max-w-3xl mx-auto">
          <div className="mb-6 flex items-center justify-center gap-3 text-sm">
            <span className="text-[var(--accent)] font-medium uppercase tracking-wider">{study.clientName}</span>
            <span className="text-[var(--text-muted)]">&bull;</span>
            <span className="text-[var(--text-secondary)]">{study.industry}</span>
          </div>
          <h1 className="text-[var(--text-section)] font-display font-bold text-[var(--text-primary)] leading-tight mb-6">
            {study.title}
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <p className="text-xl text-[var(--text-secondary)]">
              {study.outcomeHeadline}
            </p>
            {study.metricStatus === 'illustrative' && (
              <span className="inline-block text-[11px] uppercase tracking-wider text-[var(--text-muted)] border border-[var(--border-subtle)] px-2 py-1 rounded-sm">
                Illustrative
              </span>
            )}
          </div>
        </header>

        {/* Thumbnail Hero */}
        <div className="relative w-full h-[50vh] md:h-[70vh] rounded-3xl overflow-hidden mb-20 shadow-2xl border border-[var(--border-subtle)]">
          <Image
            src={study.thumbnail}
            alt={`${study.title} hero`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Content & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-8 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[var(--accent)] inline-block"></span>
                The Challenge
              </h2>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                {study.content.problem}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[var(--accent)] inline-block"></span>
                Our Solution
              </h2>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                {study.content.solution}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[var(--accent)] inline-block"></span>
                The Results
              </h2>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                {study.content.results}
              </p>
            </section>
          </div>

          {/* Sidebar Metrics */}
          <aside className="lg:col-span-4">
            <div className="bg-[var(--bg-surface-1)] border border-[var(--border-subtle)] rounded-2xl p-8 sticky top-32">
              <h3 className="text-sm uppercase tracking-widest text-[var(--text-muted)] font-bold mb-6">Key Metrics</h3>
              <div className="space-y-6">
                {study.metrics.map((metric, i) => (
                  <div key={i} className="pb-6 border-b border-[var(--border-subtle)] last:border-0 last:pb-0">
                    <p className="text-4xl font-display font-bold text-[var(--accent)] mb-1">
                      {metric.value}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {metric.label} {metric.isIllustrative && <span className="italic text-[var(--text-muted)] text-xs ml-1">(Illustrative)</span>}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-[var(--border-subtle)]">
                <h3 className="text-sm uppercase tracking-widest text-[var(--text-muted)] font-bold mb-4">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {study.services.map(service => (
                    <span key={service} className="px-3 py-1.5 rounded-md bg-[var(--bg-surface-2)] text-xs text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Gallery */}
        {study.gallery.length > 0 && (
          <section className="mb-24">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-10 text-center">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {study.gallery.map((img, i) => (
                <div key={i} className={`relative rounded-2xl overflow-hidden border border-[var(--border-subtle)] ${i === 2 ? 'md:col-span-2' : ''} h-80 md:h-[500px]`}>
                  <Image
                    src={img}
                    alt={`Gallery image ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA & Live URL */}
        <div className="text-center bg-[var(--bg-surface-1)] border border-[var(--border-subtle)] rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[var(--gradient-hero-glow)] opacity-30 pointer-events-none" />
          <h2 className="text-3xl font-display font-bold text-[var(--text-primary)] mb-6 relative z-10">
            Ready to achieve similar results?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
            <CaseStudyCtaLink
              href="/contact"
              className="px-8 py-4 bg-[var(--accent)] text-black font-bold rounded-full hover:bg-white transition-colors duration-300"
            >
              Start a Project
            </CaseStudyCtaLink>
            {study.liveUrl && (
              <CaseStudyLiveLink
                href={study.liveUrl}
                className="px-8 py-4 bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-bold rounded-full hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
              >
                View Live Site &rarr;
              </CaseStudyLiveLink>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
