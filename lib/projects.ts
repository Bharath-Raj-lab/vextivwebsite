export interface CaseStudy {
  slug: string;
  name: string;
  type: string;
  services: string;
  imageUrl: string;
}

export const TOP_ROW_PROJECTS: CaseStudy[] = [
  {
    slug: "brew-co",
    name: "Brew & Co.",
    type: "Café",
    services: "Website + Branding",
    imageUrl: "https://images.unsplash.com/photo-1498804103009-f8f906fba11b?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "shopflow",
    name: "ShopFlow",
    type: "E-commerce",
    services: "Web App + Social",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "estateedge",
    name: "EstateEdge",
    type: "Real Estate",
    services: "Website + SEO",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "lumina",
    name: "Lumina",
    type: "Design System",
    services: "UI/UX + Development",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "aura-health",
    name: "Aura Health",
    type: "Wellness App",
    services: "Mobile Design",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
  },
];

export const BOTTOM_ROW_PROJECTS: CaseStudy[] = [
  {
    slug: "nexus",
    name: "Nexus",
    type: "Fintech Dashboard",
    services: "Product Design",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "vertex",
    name: "Vertex",
    type: "SaaS Platform",
    services: "Web Application",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "crafted",
    name: "Crafted",
    type: "Agency Portfolio",
    services: "Website + Branding",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-14c27d7620f1?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "orbit",
    name: "Orbit",
    type: "Logistics",
    services: "System Design",
    imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "zendesk-concept",
    name: "ZenDesk UI",
    type: "Concept",
    services: "UI Exploration",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  },
];

export const ALL_PROJECTS = [...TOP_ROW_PROJECTS, ...BOTTOM_ROW_PROJECTS];
