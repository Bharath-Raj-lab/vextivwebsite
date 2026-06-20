'use client';

import { useEffect } from 'react';
import { trackBlogArticleOpen } from '@/lib/analytics';

export default function BlogArticleClient({ slug }: { slug: string }) {
  useEffect(() => {
    trackBlogArticleOpen(slug);
  }, [slug]);

  return null;
}
