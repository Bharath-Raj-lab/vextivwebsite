export type PortfolioCategory = 'All' | 'Websites' | 'QR Systems' | 'Branding' | 'Social Media';

export interface CaseStudyMetric {
  label: string;
  value: string;
  isIllustrative: boolean;
}

export interface CaseStudyContent {
  problem: string;
  solution: string;
  results: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  category: PortfolioCategory;
  services: string[];
  outcomeHeadline: string;
  metricStatus: 'illustrative' | 'estimated' | 'real';
  thumbnail: string;
  metrics: CaseStudyMetric[];
  content: CaseStudyContent;
  gallery: string[];
  liveUrl?: string;
}
