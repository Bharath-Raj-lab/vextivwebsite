# Vextiv Studio

Vextiv Studio is a modern, high-performance web application built with Next.js 15 (App Router), TypeScript, and Tailwind CSS v4. It serves as the digital presence and client portal for Vextiv — featuring service showcases, portfolio, blog, contact forms with email automation (Resend), analytics tracking (GA4 + Meta Pixel), and a Supabase-powered backend. Deployed on Vercel with edge-optimized performance and security hardening.

---

## Getting Started

### Prerequisites

- **Node.js** 20+ (LTS recommended)
- **pnpm** (preferred) or npm

### Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-org/vextiv-studio.git
cd vextiv-studio

# 2. Install dependencies
pnpm install
# or: npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Fill in all values in .env.local

# 4. Start the development server
pnpm dev
# or: npm run dev

# 5. Open http://localhost:3000
```

---

## Git Conventions

### Branch Naming

| Prefix   | Use Case                        |
| -------- | ------------------------------- |
| `feat/`  | New features — `feat/pricing-page` |
| `fix/`   | Bug fixes — `fix/form-validation`  |
| `chore/` | Maintenance — `chore/update-deps`  |

### Branch Rules

- **`main`** branch: never push directly — all changes via pull requests.
- All PRs require review before merging.

### Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add pricing page business tier
fix: resolve form submission error on mobile
chore: update Tailwind CSS to v4.1
```

---

## Tech Stack

| Technology      | Purpose                        |
| --------------- | ------------------------------ |
| Next.js 15      | App Router, SSR, ISR           |
| TypeScript      | Strict mode, type safety       |
| Tailwind CSS v4 | Utility-first styling          |
| Framer Motion   | Animations & transitions       |
| Supabase        | Database, auth, storage        |
| Resend          | Transactional emails           |
| Upstash Redis   | Rate limiting                  |
| Vercel          | Hosting & edge deployment      |
| GA4 + Meta      | Analytics & conversion tracking|

---

> **Note:** Full documentation will be added post-launch.
