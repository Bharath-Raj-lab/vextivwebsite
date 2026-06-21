'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CaseStudy, PortfolioCategory } from '@/types/portfolio';
import { trackPortfolioFilterClick } from '@/lib/analytics';

const CATEGORIES: PortfolioCategory[] = ['All', 'Websites', 'QR Systems', 'Branding', 'Social Media'];

export default function WorkClient({ initialCaseStudies }: { initialCaseStudies: CaseStudy[] }) {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>('All');

  const handleFilterClick = (category: PortfolioCategory) => {
    setActiveFilter(category);
    trackPortfolioFilterClick(category);
  };

  const filteredStudies = initialCaseStudies.filter(
    (study) => activeFilter === 'All' || study.category === activeFilter
  );

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
                ? 'bg-[var(--accent-fill-10)] text-white border-[var(--accent-border-active)] shadow-[0_0_15px_rgba(200,240,77,0.1)]'
                : 'bg-[var(--bg-surface-2)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStudies.map((study) => (
          <Link
            key={study.id}
            href={`/work/${study.slug}`}
            className="group block relative rounded-2xl overflow-hidden bg-[var(--bg-surface-1)] border border-[var(--border-subtle)] hover:border-[var(--accent-border-hover)] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--accent-fill-08)]"
          >
            <div className="relative h-64 w-full overflow-hidden bg-zinc-900">
              {study.thumbnail ? (
                <Image
                  src={study.thumbnail}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-surface-2)]">
                  <span className="text-[var(--text-muted)] text-sm">No Thumbnail</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface-1)] via-transparent to-transparent opacity-80" />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--bg-surface-0)]/80 text-[var(--text-primary)] backdrop-blur-md border border-[var(--border-subtle)]">
                  {study.category}
                </span>
              </div>
            </div>

            <div className="p-6 relative z-10 flex flex-col h-[200px]">
              <p className="text-xs text-[var(--accent)] font-medium mb-2 tracking-wide uppercase">
                {study.clientName} &bull; {study.industry}
              </p>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 leading-tight group-hover:text-[var(--accent)] transition-colors duration-300">
                {study.title}
              </h3>
              <div className="mb-4">
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2 inline">
                  {study.outcomeHeadline}
                </p>
                {study.metricStatus === 'illustrative' && (
                  <span className="inline-block ml-2 text-[10px] uppercase tracking-wider text-[var(--text-muted)] border border-[var(--border-subtle)] px-1.5 py-0.5 rounded-sm align-middle">
                    Illustrative
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {study.services.slice(0, 3).map((service) => (
                  <span
                    key={service}
                    className="text-[11px] px-2 py-1 rounded bg-[var(--bg-surface-2)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredStudies.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-[var(--text-muted)]">No case studies found for this category.</p>
        </div>
      )}
    </div>
  );
}
