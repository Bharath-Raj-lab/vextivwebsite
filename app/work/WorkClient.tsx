'use client';

import { useState, useId, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaseStudy, PortfolioCategory } from '@/types/portfolio';
import { trackPortfolioFilterClick, trackCaseStudyOpen } from '@/lib/analytics';

const CATEGORIES: PortfolioCategory[] = ['All', 'Websites', 'QR Systems', 'Branding', 'Social Media'];

/* ─── Animation variants ─────────────────────────────────────────── */

/* Shared easing — expo-out feels physical without any bounce */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 20,
    filter: 'blur(0px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      ease: EASE,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    filter: 'blur(4px)',
    transition: {
      duration: 1.1,
      ease: EASE,
    },
  },
};

/* Layout transition reused on every card motion.div */
const LAYOUT_TRANSITION = {
  layout: {
    duration: 0.9,
    ease: EASE,
  },
};

/* ─── Filter pill indicator variant ─────────────────────────────── */

const indicatorVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } },
};

export default function WorkClient({ initialCaseStudies }: { initialCaseStudies: CaseStudy[] }) {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>('All');
  const layoutId = useId();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleFilterClick = (category: PortfolioCategory) => {
    setActiveFilter(category);
    trackPortfolioFilterClick(category);
  };

  const filteredStudies = initialCaseStudies.filter(
    (study) => activeFilter === 'All' || study.category === activeFilter
  );

  return (
    <div>
      {/* ── Filter Navigation ─────────────────────────────────────── */}
      <div className="flex justify-center mb-10 md:mb-14 px-4 md:px-0">
        <div
          role="group"
          aria-label="Filter by category"
          className="flex flex-wrap justify-center items-center gap-2 md:gap-1 p-2 md:p-1.5 rounded-3xl md:rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface-1)] shadow-[0_2px_20px_rgba(0,0,0,0.4)] backdrop-blur-sm max-w-full"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={category}
                onClick={() => handleFilterClick(category)}
                aria-pressed={isActive}
                className="relative h-[44px] md:h-auto md:py-2 px-4 md:px-5 rounded-full text-[14px] md:text-sm font-medium cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-focus)] transition-colors duration-300 flex items-center justify-center text-center"
                style={{
                  color: isActive
                    ? 'var(--text-primary)'
                    : 'var(--text-muted)',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {/* Active pill background — shared layoutId creates smooth slide */}
                {isActive && (
                  <motion.span
                    layoutId={`filter-pill-${layoutId}`}
                    className="absolute inset-0 rounded-full bg-[var(--accent-fill-12)] border border-[var(--accent-border-active)] shadow-[0_0_18px_rgba(200,240,77,0.08)]"
                    initial={indicatorVariants.initial}
                    animate={indicatorVariants.animate}
                    exit={indicatorVariants.exit}
                    transition={{
                      layout: {
                        type: 'spring',
                        stiffness: 380,
                        damping: 38,
                        mass: 0.8,
                      },
                    }}
                    aria-hidden
                  />
                )}
                <span className="relative z-10 transition-colors duration-300">
                  {category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Project Grid ─────────────────────────────────────────── */}
      <motion.div
        layout
        className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredStudies.map((study) => (
            <motion.div
              key={study.id}
              layout
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={LAYOUT_TRANSITION}
              style={{ willChange: 'transform, opacity' }}
            >
              <Link
                href={`/work/${study.slug}`}
                className="group block relative rounded-2xl overflow-hidden bg-zinc-900 border border-[var(--border-subtle)] hover:border-[var(--accent-border-hover)] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--accent-fill-08)]"
                onClick={() => trackCaseStudyOpen(study.slug)}
              >
                {/* Image — perfect square, title overlaid inside */}
                <div className="relative aspect-square w-full overflow-hidden">
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

                  {/* Gradient overlay — subtle base, deepens slightly on hover */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.35) 40%, transparent 100%)',
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.45) 45%, transparent 100%)',
                    }}
                  />

                  {/* Title + arrow — anchored to bottom of image */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-3 pb-3 pt-6 md:px-6 md:pb-6 md:pt-12">
                    <h3
                      className="font-display font-medium leading-tight flex-1 mr-2 md:mr-3 text-white/80 group-hover:text-white transition-colors duration-400"
                      style={{ 
                        fontSize: 'clamp(15px, 1.8vw, 22px)', 
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {study.title}
                    </h3>
                    <span className="flex-shrink-0 text-white/60 group-hover:text-white transition-all duration-400 translate-x-0 translate-y-0 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      <ArrowUpRight size={18} strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── Empty state ───────────────────────────────────────────── */}
      <AnimatePresence>
        {filteredStudies.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
            className="py-20 text-center"
          >
            <p className="text-[var(--text-muted)]">No case studies found for this category.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
