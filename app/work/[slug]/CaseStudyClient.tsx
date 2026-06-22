'use client';

import { useEffect } from 'react';
import { trackEvent, trackCaseStudyOpen } from '@/lib/analytics';

// ─── Mount effect: fires case_study_open once when the page loads ─────────────
export default function CaseStudyClient({ slug }: { slug: string }) {
  useEffect(() => {
    trackCaseStudyOpen(slug);
  }, [slug]);

  return null;
}

// ─── Tracked "Start a Project" CTA ───────────────────────────────────────────
export function CaseStudyCtaLink({ href, children, className }: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackEvent('cta_click', { label: 'Start a Project', location: 'case-study' })}
    >
      {children}
    </a>
  );
}

// ─── Tracked external "View Live Site" link ───────────────────────────────────
export function CaseStudyLiveLink({ href, children, className }: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackEvent('outbound_link_click', { href })}
    >
      {children}
    </a>
  );
}
