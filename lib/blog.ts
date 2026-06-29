import { BlogPost, BlogCategory } from '@/types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'qr-systems-hyderabad-restaurants',
    title: 'Why Every Hyderabad Restaurant Needs a QR Ordering System in 2026',
    excerpt: 'From Jubilee Hills to Secunderabad, paper menus are fading. Discover how QR systems are reducing wait times and increasing order values for local cafes and fine-dining spots.',
    content: `
      <p>The hospitality scene in Hyderabad is booming, but staffing challenges and high customer expectations are forcing owners to rethink operations. Enter the QR ordering system.</p>
      <h3>The End of the Waiting Game</h3>
      <p>During peak hours in bustling areas like Banjara Hills, customers often wait 10-15 minutes just to place an order. A digital QR menu empowers guests to scan, browse, and order the moment they sit down. This frictionless experience doesn't just improve satisfaction—it directly accelerates table turnover.</p>
      <h3>Upselling Without the Awkwardness</h3>
      <p>Digital menus are widely reported to increase average order value, often in the 15-20% range. Why? Because high-quality photos of biryani, mocktails, and desserts look irresistible on a smartphone screen, and prompting add-ons is built seamlessly into the checkout flow.</p>
      <h3>Instant Updates</h3>
      <p>Out of paneer? Prices changing due to inflation? With a digital menu, you update your offerings in real-time without the recurring costs of reprinting paper menus.</p>
      <p>It's time for Hyderabad's restaurants to embrace the digital transition. The investment pays for itself within the first month.</p>
    `,
    date: '2026-06-15',
    readTime: '4 min read',
    category: 'Tech & Tools',
    thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Rohan Sharma',
      role: 'Tech Strategist',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    },
  },
  {
    id: '2',
    slug: 'local-seo-hyderabad-sme',
    title: 'Local SEO Mastery: How to Dominate Google Search in Hyderabad',
    excerpt: 'Is your business showing up when locals search for "near me"? Learn the actionable steps to optimize your Google Business Profile and local keywords.',
    content: `
      <p>When someone in Madhapur searches for "best interior designer near me," is your studio appearing in the coveted Google Local Pack? If not, you're leaving money on the table.</p>
      <h3>Claim and Optimize Your Google Business Profile</h3>
      <p>This is the cornerstone of Local SEO. Ensure your business name, address, and phone number (NAP) are exactly identical everywhere on the web. Upload high-quality interior and exterior photos of your business, and explicitly select your primary and secondary categories.</p>
      <h3>Collect Reviews Relentlessly</h3>
      <p>The algorithm favors businesses with high ratings and recent reviews. Train your staff to ask for reviews, or automate the process by sending a WhatsApp message with a direct review link immediately after a successful transaction or service completion.</p>
      <h3>Hyper-Local Keywords</h3>
      <p>Don't just target "plumber" or "boutique." Target "plumber in Kukatpally" or "designer boutique in Jubilee Hills." Embed these localized keywords naturally into your website's headers, meta descriptions, and footer.</p>
      <p>Local SEO isn't an overnight fix, but consistent effort yields a compound interest of free, highly-qualified organic traffic.</p>
    `,
    date: '2026-06-02',
    readTime: '6 min read',
    category: 'Local SEO',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Sneha Reddy',
      role: 'SEO Specialist',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    },
  },
  {
    id: '3',
    slug: 'hiring-digital-agency-checklist',
    title: 'The Ultimate Checklist for Hiring a Digital Agency',
    excerpt: 'Avoid costly mistakes. Here is exactly what SME founders should ask before signing a retainer with a digital marketing or web development agency.',
    content: `
      <p>Hiring a digital agency is a significant investment for any Small to Medium Enterprise. But with so many options promising the moon, how do you separate the experts from the amateurs?</p>
      <h3>1. Ask for Case Studies, Not Just Portfolios</h3>
      <p>A pretty website is great, but did it convert? Demand case studies that highlight the problem, the solution, and the actual business metrics impacted. Look for agencies that talk about ROI, lead generation, and user acquisition, rather than just aesthetics.</p>
      <h3>2. Who Will Actually Do the Work?</h3>
      <p>Often, senior partners pitch the business, but junior associates execute the work. Clarify exactly who your day-to-day point of contact will be, and who is actively managing your campaigns or writing your code.</p>
      <h3>3. Transparency in Reporting</h3>
      <p>You should never be in the dark about where your money is going. Ensure the agency provides real-time dashboards or comprehensive monthly reports that tie directly to your core KPIs, not just vanity metrics like "impressions" or "likes."</p>
      <p>Take your time, ask hard questions, and choose an agency that operates as an extension of your own team.</p>
    `,
    date: '2026-05-20',
    readTime: '5 min read',
    category: 'Digital Strategy',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Vikram Singh',
      role: 'Founder & CEO',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    },
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, category: BlogCategory, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.category === category && post.slug !== currentSlug)
    .slice(0, limit);
}
