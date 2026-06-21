export type BlogCategory = 'Digital Strategy' | 'Tech & Tools' | 'Local SEO' | 'Design & Branding';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: BlogCategory;
  thumbnail: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}
