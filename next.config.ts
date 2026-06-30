import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// ─── Content-Security-Policy ────────────────────────────────────────────────
//
// Running in Report-Only mode first (Content-Security-Policy-Report-Only).
// This means violations are logged to the browser console / DevTools but
// the page is NOT blocked.  Once you have verified no false positives over
// several days of real traffic, switch the header name to:
//   Content-Security-Policy
// and remove the -Report-Only suffix.
//
// Domains allowed per third-party already in use:
//   • googletagmanager.com / google-analytics.com / googlesyndication.com
//     → Google Tag (gtag.js loaded by GtagLoader.tsx)
//   • connect.facebook.net / facebook.com
//     → Meta Pixel (MetaPixel.tsx)
//   • fonts.googleapis.com / fonts.gstatic.com
//     → Next.js Google Fonts (layout.tsx)
//   • *.supabase.co
//     → Supabase JS (browser anon client, if used)
//
// NOTE: 'unsafe-inline' for script-src is required while Next.js injects
// inline hydration scripts.  Once you adopt a nonce-based CSP strategy
// (Next.js 15 supports it via middleware) you can remove it.
// ─────────────────────────────────────────────────────────────────────────────

const ContentSecurityPolicy = `
  default-src 'self';
  script-src
    'self'
    'unsafe-inline'
    https://www.googletagmanager.com
    https://www.google-analytics.com
    https://connect.facebook.net
    https://www.googleadservices.com;
  style-src
    'self'
    'unsafe-inline'
    https://fonts.googleapis.com;
  font-src
    'self'
    https://fonts.gstatic.com;
  img-src
    'self'
    data:
    blob:
    https://images.unsplash.com
    https://picsum.photos
    https://loremflickr.com
    https://www.google-analytics.com
    https://www.facebook.com
    https://www.googletagmanager.com;
  connect-src
    'self'
    https://*.supabase.co
    https://www.google-analytics.com
    https://analytics.google.com
    https://stats.g.doubleclick.net
    https://www.facebook.com;
  frame-src
    'none';
  object-src
    'none';
  base-uri
    'self';
  form-action
    'self';
`
  .replace(/\s{2,}/g, ' ')
  .trim();

const isProd = process.env.NODE_ENV === 'production';

// ─── Shared security headers (applied on every response) ────────────────────
const securityHeaders = [
  // ── CSP (report-only — switch to Content-Security-Policy when ready) ──────
  {
    key: 'Content-Security-Policy-Report-Only',
    value: ContentSecurityPolicy,
  },
  // ── Clickjacking protection ───────────────────────────────────────────────
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // ── MIME-type sniffing protection ─────────────────────────────────────────
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // ── Referrer leakage control ──────────────────────────────────────────────
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // ── Browser feature permissions ───────────────────────────────────────────
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  // ── HSTS — production only (breaks local dev with HTTP) ───────────────────
  // max-age=63072000 = 2 years, as recommended by hstspreload.org
  ...(isProd
    ? [
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
    ]
    : []),
];

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply to all routes including API routes, static assets, etc.
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
