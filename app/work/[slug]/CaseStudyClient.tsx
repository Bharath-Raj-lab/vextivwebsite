'use client';

import { useEffect } from 'react';
import { trackCaseStudyOpen } from '@/lib/analytics';

export default function CaseStudyClient({ slug }: { slug: string }) {
  useEffect(() => {
    trackCaseStudyOpen(slug);
  }, [slug]);

  return null;
}
