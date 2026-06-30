# Vextiv Studio — Website

The public-facing website for **VeXtiv**, a digital growth agency based in Hyderabad, India. It serves as the agency's primary sales, portfolio, and lead-generation surface — showcasing case studies, service offerings, and pricing for restaurants, startups, and local businesses across Hyderabad and beyond. Built with Next.js 15 App Router, it is designed to be fully static where possible (ISR + SSG), fast on mobile, and compliant with the agency's PRD across SEO, accessibility, and content integrity requirements.

---

## Getting Started

### Prerequisites

| Requirement | Version |
|---|---|
| Node.js | **≥ 20** (LTS recommended) |
| Package manager | **npm** (lockfile is `package-lock.json`) |

### Local Setup

```bash
# 1. Clone the repository
git clone <repo-url>
cd vextivwebsite

# 2. Install dependencies
npm install

# 3. Create your local environment file
#    Copy the example and fill in real values (see Environment Variables below)
cp .env.local.example .env.local

# 4. Start the development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Other Scripts

```bash
npm run build    # Production build
npm run start    # Serve the production build locally
npm run lint     # ESLint check
npm run audit    # npm security audit (high-severity only)
```

---

## Environment Variables

All variables are read from `.env.local` (never committed — already in `.gitignore`).

| Variable | Used In (file / feature) | Scope | Where to Obtain |
|---|---|---|---|
| `NEXT_PUBLIC_GA_ID` | `components/layout/GtagLoader.tsx` — Google Analytics 4 page-view tracking | **Public** | Google Analytics 4 → Admin → Data Streams → Measurement ID |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | `components/layout/GtagLoader.tsx` — Google Ads conversion tracking | **Public** | Google Ads → Tools → Linked accounts → Tag |
| `NEXT_PUBLIC_META_PIXEL_ID` | `components/layout/MetaPixel.tsx` — Meta (Facebook) Pixel events | **Public** | Meta Business Suite → Events Manager → Pixel ID |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `components/ui/WhatsAppButton.tsx`, `components/layout/Footer.tsx` — WhatsApp chat link | **Public** | Your WhatsApp Business number without `+` (e.g. `919XXXXXXXXX`) |
| `NEXT_PUBLIC_SUPABASE_URL` | `lib/supabase.ts`, `lib/supabase-admin.ts` — Supabase client init | **Public** | Supabase Dashboard → Project → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `lib/supabase.ts` — browser-side Supabase queries (RLS enforced) | **Public** | Supabase Dashboard → Project → Settings → API → `anon` / `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | `lib/supabase-admin.ts` — server-side admin operations (bypasses RLS) | **Server only — never expose** | Supabase Dashboard → Project → Settings → API → `service_role` key |
| `RESEND_API_KEY` | `lib/email.ts` — sends contact form and audit confirmation emails via Resend | **Server only** | [resend.com](https://resend.com) → API Keys |
| `RESEND_FROM_EMAIL` | `lib/email.ts` — the `From:` address on all outbound emails | **Server only** | A domain you have verified in Resend (e.g. `hello@vextiv.tech`) |
| `TEAM_EMAIL` | `lib/email.ts` — internal recipient for new lead / contact notifications | **Server only** | Your team inbox address |
| `UPSTASH_REDIS_REST_URL` | `lib/rate-limit.ts` — contact form rate limiting via Upstash Redis | **Server only** | [console.upstash.com](https://console.upstash.com) → Database → REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | `lib/rate-limit.ts` — Upstash auth token | **Server only** | Upstash Console → Database → REST Token |

> **Note on `NEXT_PUBLIC_GOOGLE_ADS_ID`:** this variable is referenced in `GtagLoader.tsx` but is **not** present in `.env.local.example`. Add it to your `.env.local` if you run Google Ads conversions; the component silently skips it when absent.

---

## Folder Structure

```
vextivwebsite/
├── app/            Next.js 15 App Router — all pages, layouts, API routes, and per-page metadata
├── components/     Shared UI components (layout, sections, ui primitives, work-specific)
├── lib/            Data layer — case study data, blog posts, email helpers, Supabase clients, rate limiting, Zod schemas
├── emails/         React Email templates sent via Resend (contact confirmation, team notification, audit confirmation, newsletter)
├── types/          Shared TypeScript interfaces (portfolio, blog, database types generated from Supabase)
├── public/         Static assets — team avatars (/team/), favicons, open graph images, robots.txt
├── hooks/          Custom React hooks
└── supabase/       Supabase migration files and schema definitions
```

---

## Content Management

Case studies (`/work`) and blog posts (`/blog`) are currently hardcoded as static data in [`lib/case-studies.ts`](./lib/case-studies.ts) and [`lib/blog.ts`](./lib/blog.ts) — they are not stored in Supabase.

To add, edit, or remove a case study or blog post right now, edit the relevant array in that file directly and redeploy. There is no CMS or admin dashboard yet.

This is intentional for launch: the site ships with 3 seed case studies and 3 seed blog posts per PRD Section 13.2, so this is not a bug or an incomplete feature.

A Supabase-backed admin dashboard for non-developer content editing is planned for a future phase. When that ships, it will also require updating sitemap generation, the ISR revalidation strategy, and `generateStaticParams` for dynamic slugs — not just adding a database table.

---

## Tech Stack

| Package | Version | Role |
|---|---|---|
| Next.js | ^15.5 | App Router framework, SSG + ISR, API routes |
| React | 19.2 | UI runtime |
| TypeScript | ^5 | Type safety across the entire codebase |
| Tailwind CSS | ^4 | Utility CSS (PostCSS plugin mode) |
| Framer Motion | ^11.18 | Page animations and scroll effects |
| GSAP | ^3.15 | Advanced scroll-driven animations |
| Supabase JS | ^2.108 | Database client (contact form leads, newsletter subscribers) |
| Resend | ^6.12 | Transactional email delivery |
| React Email | ^6.6 | Email template authoring |
| Upstash Redis + Ratelimit | ^1.38 / ^2.0 | Server-side rate limiting on the contact API route |
| React Hook Form | ^7.80 | Contact and audit form state management |
| Zod | ^4.4 | Form validation schemas (`lib/validations/`) |
| Lucide React | ^0.469 | Icon library |
| isomorphic-dompurify | ^3.18 | Server-safe HTML sanitisation |
| Vercel | — | Hosting + Edge Network + automatic deployments |

---

## Deployment

This project deploys to **Vercel** via Git integration.

### Steps

1. Push the `main` branch to your Git remote (GitHub / GitLab / Bitbucket).
2. In the [Vercel dashboard](https://vercel.com), click **Add New → Project** and import the repository.
3. Vercel auto-detects Next.js — no build command or output directory changes needed.
4. Set all environment variables listed above under **Project → Settings → Environment Variables**. Mark server-only variables (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `TEAM_EMAIL`, `UPSTASH_*`) for **Production** and **Preview** environments only — never expose them in the browser.
5. Click **Deploy**.

### Custom Domain

Go to **Project → Settings → Domains**, add `vextiv.tech` (and `www.vextiv.tech`), and follow Vercel's DNS instructions. The `<link rel="canonical">` tags in every page already point to `https://vextiv.tech`.

### Previews

Every PR automatically gets a Vercel Preview URL. Environment variables are inherited from the project settings, so forms and analytics work in preview deployments.

---

## Content Update Guide

### Adding a Blog Post

Edit [`lib/blog.ts`](./lib/blog.ts). Add a new object to the `blogPosts` array at the top of the file:

```typescript
{
  id: '4',                              // unique, increment from last
  slug: 'your-url-slug',               // used in /blog/[slug]
  title: 'Your Post Title',
  excerpt: 'One-sentence summary shown on the blog listing card.',
  content: `
    <p>Your HTML content here...</p>
    <h3>Section heading</h3>
    <p>More content...</p>
  `,
  date: '2026-07-01',                  // ISO date, used for display and sorting
  readTime: '5 min read',
  category: 'Tech & Tools',            // must match BlogCategory type in types/blog.ts
  thumbnail: 'https://...',            // Unsplash or your own hosted image URL
  author: {
    name: 'Author Name',
    role: 'Role Title',
    avatar: 'https://...',             // headshot URL
  },
}
```

> **Content compliance note:** do not include specific numeric claims (percentages, revenue figures, time savings) in blog body copy without a verifiable source or an explicit "Estimated / Industry Average" qualifier. See PRD §13.1 and the metrics audit in `metrics_audit.md`.

---

### Adding a Portfolio / Case Study

Edit [`lib/case-studies.ts`](./lib/case-studies.ts). Add a new object to the `caseStudies` array:

```typescript
{
  id: '14',                            // unique string ID, increment from last
  slug: 'your-client-slug',           // used in /work/[slug]
  title: 'Project Title',
  clientName: 'Client Name',
  industry: 'Restaurant / Cafe',
  category: 'Websites',               // 'Websites' | 'QR Systems' | 'Branding' | 'Social Media'
  services: ['Service 1', 'Service 2', 'Service 3'],
  outcomeHeadline: 'One-line result summary',
  metricStatus: 'illustrative',       // 'illustrative' | 'estimated' | 'real'
  thumbnail: 'https://...',
  metrics: [
    { label: 'Metric Label', value: '+25%', isIllustrative: true, status: 'illustrative' },
    // add up to 3 metrics
  ],
  content: {
    problem: 'What the client was struggling with.',
    solution: 'What Vextiv built or designed.',
    results:  'Outcome in plain language.',
  },
  gallery: [
    'https://image-1.jpg',
    // 4–6 gallery images recommended
  ],
  liveUrl: 'https://client-site.com', // optional — shows "View Live Site" button
}
```

> **Metric compliance:** always set `metricStatus: 'illustrative'` and `isIllustrative: true` on metrics unless you have real, client-verified data. The case study detail page renders an "Illustrative" badge automatically when `metricStatus === 'illustrative'`. See PRD §13.3.

---

### Adding a Team Member to the About Page

Edit the `CAROUSEL_MEMBERS` array in [`app/about/page.tsx`](./app/about/page.tsx) (around line 120):

```typescript
{ id: '9', name: 'First Name', role: 'Job Title', image: '/team/avatar_firstname.webp', isLeadership: false },
```

Then place the avatar image at `public/team/avatar_firstname.webp`. The carousel renders up to 8 members at full desktop width — if adding beyond 8, test the layout at 1280px. Leadership members (`isLeadership: true`) are Bathini Ganesh, Alloney Bharath Raj, and Yoganandh.

---

## Design System

All visual tokens — colours, typography scales, spacing, border radii, shadows, and animation durations — are defined as CSS custom properties in [`app/globals.css`](./app/globals.css). [`tailwind.config.ts`](./tailwind.config.ts) maps those same tokens into Tailwind utility classes so both CSS and JSX class-based styling draw from a single source of truth. Do not hardcode colour or font values anywhere in component files; reference `var(--token-name)` instead. For the full token specification and brand rationale, see PRD Section 3.

---

## Git Workflow

- **Branch naming:** `feat/short-description`, `fix/short-description`, `chore/short-description`
- **`main` is protected** — never push directly. All changes go through a PR.
- **PR requirements:** at least one review approval before merging. Squash merge preferred to keep history clean.
- **Current active branch:** `Last` (post-phase-5 working branch) — merge to `main` once QA is signed off.

```bash
# Example: start a new feature
git switch -c feat/add-case-study-nizam-bistro

# When ready
git push origin feat/add-case-study-nizam-bistro
# → open a PR against main
```

---

## Known Follow-ups

These items are non-blocking for launch but should be addressed post-go-live:

| # | Item | File(s) | Priority |
|---|------|---------|----------|
| 1 | **Duplicated budget tier strings** — `'Under ₹10,000'`, `'₹10,000–₹25,000'` etc. are defined identically in both `lib/validations/contact.ts` and `app/contact/ContactForm.tsx`. If budget tiers change, both must be updated simultaneously. Refactor to a single exported constant. | [`lib/validations/contact.ts:17–20`](./lib/validations/contact.ts), [`app/contact/ContactForm.tsx:56–59`](./app/contact/ContactForm.tsx) | Low |
| 2 | **Testimonial t7 (Karthik Iyer / FinStream) pending verification** — contains the claim "site performance metrics improved by over 200% since launch". The testimonial is correctly gated behind `verified: false` and will NOT render on the live site. Do not flip to `verified: true` until the client confirms the claim in writing and clarifies what "200%" refers to (Lighthouse score? Core Web Vitals? TTFB?). | [`components/sections/Testimonials.tsx:71–80`](./components/sections/Testimonials.tsx) | Medium — resolve before enabling |
| 3 | **`NEXT_PUBLIC_GOOGLE_ADS_ID` missing from `.env.local.example`** — the variable is referenced in `GtagLoader.tsx` but not documented in the example env file. Add it to `.env.local.example` with a placeholder value. | [`components/layout/GtagLoader.tsx:73`](./components/layout/GtagLoader.tsx), `.env.local.example` | Low |
| 4 | **`npm install` required after clone** — `node_modules` is gitignored (correct), so first-time contributors must run `npm install` before `npm run dev`. The dev server currently fails with `'next' is not recognized` if this step is skipped. Consider adding a `postinstall` note or Makefile target. | `package.json` | Low |

---

## Contact

For questions about this project, reach out at  [vextiv.tech@gmail.com]