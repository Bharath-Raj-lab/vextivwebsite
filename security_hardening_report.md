# Security Hardening — Vextiv Studio

## Summary

Four files changed, one package installed. TypeScript compiles clean (`tsc --noEmit` → 0 errors).

---

## 1 · HTTP Security Headers — `next.config.ts`

### What changed

```diff
-  // HTTP security headers — will be configured in Phase 4 (security hardening)
-  async headers() {
-    return [
-      // { source: "/(.*)", headers: [] },
-    ];
-  },
+  async headers() {
+    return [
+      {
+        source: '/(.*)',
+        headers: securityHeaders,
+      },
+    ];
+  },
```

The `securityHeaders` array (defined at the top of the file) injects:

| Header | Value |
|--------|-------|
| `Content-Security-Policy-Report-Only` | See below |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` **(production only)** |

### CSP directive rationale

| Directive | Allowed origins | Reason |
|-----------|----------------|--------|
| `script-src` | `'self' 'unsafe-inline'` + `googletagmanager.com`, `google-analytics.com`, `connect.facebook.net`, `googleadservices.com` | Next.js inline hydration; GA4 + Ads gtag.js; Meta Pixel fbevents.js |
| `style-src` | `'self' 'unsafe-inline'` + `fonts.googleapis.com` | Tailwind inline styles; Google Fonts CSS |
| `font-src` | `'self'` + `fonts.gstatic.com` | Google Fonts woff2 assets |
| `img-src` | `'self' data: blob:` + `images.unsplash.com`, `google-analytics.com`, `facebook.com`, `googletagmanager.com` | Unsplash CDN; GA beacon; Meta Pixel noscript image |
| `connect-src` | `'self'` + `*.supabase.co`, GA/Analytics domains, `facebook.com` | Supabase anon client; analytics beacons |
| `frame-src` | `'none'` | No iframes on site |
| `object-src` | `'none'` | Blocks Flash/plugins |
| `base-uri` | `'self'` | Prevents base-tag injection |
| `form-action` | `'self'` | Forms must POST to same origin |

> [!IMPORTANT]
> The CSP is running in **Report-Only mode** (`Content-Security-Policy-Report-Only`). This logs violations to DevTools but does **not** block anything. After observing clean traffic for several days, rename the header key to `Content-Security-Policy` in `next.config.ts` to enforce it.

> [!NOTE]
> `'unsafe-inline'` in `script-src` is unavoidable until you adopt a **nonce-based CSP** via Next.js 15 middleware. This is a known limitation of framework-injected hydration scripts.

---

## 2 · DOMPurify Sanitization — `/api/contact/route.ts` & `/api/audit/route.ts`

### Package installed

```
npm install isomorphic-dompurify
```

`isomorphic-dompurify` wraps DOMPurify with `jsdom` so it works in Node.js server environments (standard `dompurify` requires a browser DOM).

### What changed in both routes

Added at the top of each file:

```diff
+import DOMPurify from 'isomorphic-dompurify';
+
+// ─── Sanitization helper ──────────────────────────────────────────────────────
+function sanitize(value: string | null | undefined): string | null {
+  if (value == null) return null;
+  return DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
+}
```

`ALLOWED_TAGS: []` + `ALLOWED_ATTR: []` strips **all HTML** — output is plain text only.

### `/api/contact` — Supabase insert diff

```diff
  .insert({
-   name:         data.name,
-   email:        data.email,
-   phone:        data.phone,
-   company:      data.company,
-   service:      data.service,
-   budget:       data.budget,
-   brief:        data.brief,
-   source:       'contact',
-   utm_source:   data.utm_source,
-   utm_medium:   data.utm_medium,
-   utm_campaign: data.utm_campaign,
+   name:         sanitize(data.name)!,      // free-text → sanitized
+   email:        data.email,               // Zod email validated + lowercased
+   phone:        sanitize(data.phone)!,    // free-text → sanitized
+   company:      sanitize(data.company),   // nullable free-text → sanitized
+   service:      data.service,             // Zod enum whitelist
+   budget:       data.budget,              // Zod enum whitelist
+   brief:        sanitize(data.brief),     // nullable free-text → sanitized
+   source:       'contact',
+   utm_source:   sanitize(data.utm_source),
+   utm_medium:   sanitize(data.utm_medium),
+   utm_campaign: sanitize(data.utm_campaign),
  });
```

### `/api/audit` — Supabase insert diff

```diff
  .insert({
-   name:          data.businessName,
-   email:         data.email,
-   phone:         data.phone,
-   source:        'audit',
-   primary_goal:  data.primaryGoal,
-   website_url:   data.websiteUrl,
-   hear_about_us: data.hearAboutUs,
-   utm_source:    data.utm_source,
-   utm_medium:    data.utm_medium,
-   utm_campaign:  data.utm_campaign,
+   name:          sanitize(data.businessName)!,  // free-text → sanitized
+   email:         data.email,                    // Zod email validated
+   phone:         sanitize(data.phone)!,          // free-text → sanitized
+   source:        'audit',
+   primary_goal:  data.primaryGoal,              // Zod enum whitelist
+   website_url:   sanitize(data.websiteUrl),     // URL validated by Zod + sanitized
+   hear_about_us: data.hearAboutUs,              // Zod enum whitelist
+   utm_source:    sanitize(data.utm_source),
+   utm_medium:    sanitize(data.utm_medium),
+   utm_campaign:  sanitize(data.utm_campaign),
  });
```

---

## 3 · Honeypot Verification — ✅ Both routes confirmed working

| Route | Honeypot field | Check location | Behaviour |
|-------|---------------|----------------|-----------|
| `/api/contact` | `website` (Zod schema `contact.ts` L72) | `route.ts` lines 97–102 | Silently returns `{ success: true, 200 }` — bot believes it succeeded |
| `/api/audit` | `website` (Zod schema `audit.ts` L64) | `route.ts` lines 95–97 | Same silent discard |

Both checks run **after** Zod validation and **before** rate-limiting, which is the correct order (avoids Upstash calls for obvious bot traffic).

---

## 4 · Upstash Rate Limiting — ✅ Both routes confirmed active

| Setting | Value |
|---------|-------|
| Algorithm | Sliding window |
| Limit | 5 requests per IP |
| Window | 1 hour |
| Redis prefix | `vextiv:ratelimit` |
| Env vars required | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` |

Both API routes call `rateLimiter.limit(clientIp)` at step 4, returning HTTP 429 with `"Too many requests."` when exceeded.

---

## 5 · Secret Key Audit — ✅ No leakage found

`grep` results across all files under `/components/**` and `/app/(pages)/**`:

| Secret | In components? | In app pages? |
|--------|---------------|---------------|
| `SUPABASE_SERVICE_ROLE_KEY` | ❌ Not found | ❌ Not found (only in `/api/` routes) |
| `RESEND_API_KEY` | ❌ Not found | ❌ Not found (only in `lib/email.ts`) |
| `supabase-admin` import | ❌ Not found | ❌ Not found (only in `/api/contact/route.ts`, `/api/audit/route.ts`) |

`lib/supabase-admin.ts` is correctly marked `// ⚠️ SERVER ONLY` and is never imported outside of API routes.
`lib/email.ts` is correctly marked `// ⚠️ SERVER ONLY` and is never imported outside of API routes.

---

## 6 · Dependency Vulnerability Gate — `package.json`

### What changed

```diff
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
+   "audit": "npm audit --audit-level=high"
  },
```

### Usage

```bash
npm run audit
```

Exits with code **0** when no high/critical CVEs are found; exits **non-zero** on any `high` or `critical` severity finding, which blocks CI pipelines from continuing.

> [!IMPORTANT]
> **PRD Section 11 requirement** — `npm run audit` must be executed before every deploy (manual or automated). This is a process gate, not a code-level fix. Integrate it as the first step of your deploy workflow:
>
> **Manual deploys:** Run `npm run audit` locally before pushing to the deployment branch. Do not push if it exits non-zero.
>
> **CI/CD (GitHub Actions / Vercel CLI):** Add a job step before the build step:
> ```yaml
> - name: Dependency vulnerability check (PRD §11)
>   run: npm run audit
> ```
> Because `npm audit --audit-level=high` exits non-zero on high/critical findings, the pipeline will fail automatically and the deploy will be blocked until the vulnerability is patched or explicitly overridden.

> [!NOTE]
> The `--audit-level=high` flag intentionally ignores `low` and `moderate` severity advisories to avoid noise from transitive dependencies. Raise to `--audit-level=moderate` if you want stricter enforcement.

---

## ⚠️ Vercel Dashboard Action Items

These cannot be done in code — you must configure them manually:

### 1. Set Environment Variables

Confirm the following are set in **Vercel → Project Settings → Environment Variables**:

| Variable | Environment |
|----------|------------|
| `SUPABASE_SERVICE_ROLE_KEY` | Production, Preview |
| `RESEND_API_KEY` | Production, Preview |
| `UPSTASH_REDIS_REST_URL` | Production, Preview |
| `UPSTASH_REDIS_REST_TOKEN` | Production, Preview |
| `NEXT_PUBLIC_SUPABASE_URL` | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | All |

> [!CAUTION]
> `SUPABASE_SERVICE_ROLE_KEY` must **NOT** be prefixed with `NEXT_PUBLIC_`. If it is, it will be embedded in the browser bundle and exposed to all visitors.

### 2. Verify HSTS is not double-set

Vercel automatically adds `Strict-Transport-Security` on pro/enterprise plans. Our code adds it only in `NODE_ENV=production`. Check **Vercel → Project → Security** to avoid a duplicate HSTS header (doubles don't cause security issues but are untidy).

### 3. Enable CSP violation reporting (optional but recommended)

Once you flip from `Content-Security-Policy-Report-Only` to `Content-Security-Policy`, add a `report-uri` or `report-to` directive pointing to a service like [report-uri.com](https://report-uri.com) or a self-hosted endpoint to get real-time violation notifications.

### 4. Upgrade CSP from report-only to enforced

After 3–5 days of clean production traffic (no violations in DevTools / report endpoint), edit `next.config.ts`:

```diff
-  key: 'Content-Security-Policy-Report-Only',
+  key: 'Content-Security-Policy',
```

### 5. Consider HSTS preloading

The HSTS header includes `preload`. Submit `vextiv.tech` to [hstspreload.org](https://hstspreload.org) after the site is stable on HTTPS to be included in browser preload lists.
