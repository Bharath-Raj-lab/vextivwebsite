import { CaseStudy } from '@/types/portfolio';

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'hyderabad-bistro-qr',
    title: 'Digital Menu & Ordering System for Local Cafe',
    clientName: 'Nizam Bistro',
    industry: 'Restaurant / Cafe',
    category: 'QR Systems',
    services: ['QR Menu Design', 'Order Management System', 'Table Analytics'],
    outcomeHeadline: 'Increased Table Turnover by 25% with Contactless Ordering',
    metricStatus: 'illustrative',
    thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
    metrics: [
      { label: 'Order Processing Time', value: '-30%', isIllustrative: true },
      { label: 'Average Order Value', value: '+15%', isIllustrative: true },
      { label: 'Customer Satisfaction', value: '4.8/5', isIllustrative: true },
    ],
    content: {
      problem: 'Nizam Bistro was struggling with slow order taking during peak hours, leading to long wait times and occasional order errors. Their paper menus were also costly to update frequently.',
      solution: 'We deployed a comprehensive QR-based digital menu system. Customers can scan to view high-quality images of dishes, customize orders, and pay directly from their phones, completely bypassing the wait for a waiter.',
      results: 'The bistro saw immediate improvements in operational efficiency. Table turnover increased, and staff could focus more on food delivery and customer service rather than order taking.',
    },
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1200',
    ],
  },
  {
    id: '2',
    slug: 'tech-startup-web',
    title: 'Modern Landing Page for AI SaaS',
    clientName: 'DataSynth AI',
    industry: 'Technology / Startup',
    category: 'Websites',
    services: ['Web Design', 'Next.js Development', 'SEO Optimization'],
    outcomeHeadline: 'Boosted Early Access Signups by 300% Post-Launch',
    metricStatus: 'illustrative',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    metrics: [
      { label: 'Conversion Rate', value: '12%', isIllustrative: true },
      { label: 'Page Load Speed', value: '<0.8s', isIllustrative: true },
      { label: 'Bounce Rate', value: '-45%', isIllustrative: true },
    ],
    content: {
      problem: 'DataSynth AI had a groundbreaking product but their original website failed to communicate its value proposition clearly. Visitors were bouncing before signing up for the early access program.',
      solution: 'We designed a sleek, high-conversion landing page using modern web technologies. The site features interactive product demos, clear messaging, and a frictionless signup flow, all built on a highly performant Next.js stack.',
      results: 'The new site dramatically improved user engagement. Clearer messaging and faster load times directly contributed to a massive spike in early access registrations within the first month.',
    },
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200',
    ],
    liveUrl: 'https://example.com/datasynth',
  },
  {
    id: '3',
    slug: 'local-retail-branding',
    title: 'Brand Identity Refresh for Boutique',
    clientName: 'Threads of Deccan',
    industry: 'Retail / Fashion',
    category: 'Branding',
    services: ['Logo Design', 'Brand Guidelines', 'Social Media Templates'],
    outcomeHeadline: 'Revitalized Brand Presence across Offline and Digital Channels',
    metricStatus: 'illustrative',
    thumbnail: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1200',
    metrics: [
      { label: 'Social Engagement', value: '+120%', isIllustrative: true },
      { label: 'Store Footfall', value: '+40%', isIllustrative: true },
      { label: 'Brand Recall', value: 'High', isIllustrative: true },
    ],
    content: {
      problem: 'A legacy boutique in Hyderabad needed to attract a younger demographic without alienating its loyal customer base. Their existing branding felt outdated and lacked consistency across platforms.',
      solution: 'We crafted a modern, elegant brand identity that honors their heritage while appealing to a contemporary audience. This included a refreshed logo, a cohesive color palette, and versatile templates for social media and in-store collateral.',
      results: 'The rebrand successfully bridged the generational gap. The boutique saw a surge in social media engagement from younger shoppers and an overall increase in store footfall driven by the fresh look.',
    },
    gallery: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
    ],
  }
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find(study => study.slug === slug);
}
