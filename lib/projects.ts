import { caseStudies } from './case-studies';

export interface CaseStudy {
  slug: string;
  name: string;
  type: string;
  services: string;
  imageUrl: string;
}

const mappedCaseStudies: CaseStudy[] = caseStudies.map(study => ({
  slug: study.slug,
  name: study.clientName,
  type: study.industry,
  services: study.services.slice(0, 2).join(" + "),
  imageUrl: study.thumbnail || "",
}));

export const TOP_ROW_PROJECTS: CaseStudy[] = mappedCaseStudies.slice(0, 4);

const remaining = mappedCaseStudies.slice(4);
const fallback: CaseStudy[] = [
  {
    slug: "orbit",
    name: "Orbit",
    type: "Logistics",
    services: "System Design",
    imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop",
  },
];

export const BOTTOM_ROW_PROJECTS: CaseStudy[] = [...remaining, ...fallback].slice(0, 5);

export const ALL_PROJECTS = [...TOP_ROW_PROJECTS, ...BOTTOM_ROW_PROJECTS];
