// ⚠️ CLIENT ONLY — never import in server components.
// GA4 event helper. Uses window.gtag if available; silently no-ops if not.
// All events are also safe to call during SSR (typeof window guard).

type GtagFn = (
  command: 'event',
  eventName: string,
  params?: Record<string, string | number | boolean | null | undefined>,
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

function sendEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | null | undefined>,
): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}

// ─── Contact form events ──────────────────────────────────────────────────────

/** Fire when the user focuses any field in the contact form for the first time. */
export function trackFormStart(formId: string): void {
  sendEvent('form_start', { form_id: formId });
}

/** Fire immediately before redirecting on successful submission. */
export function trackFormSubmitSuccess(formId: string): void {
  sendEvent('form_submit_success', { form_id: formId });
}

/** Fire when the API returns an error (network or validation). */
export function trackFormSubmitError(formId: string, errorMessage: string): void {
  sendEvent('form_submit_error', { form_id: formId, error_message: errorMessage });
}

// ─── Portfolio events ─────────────────────────────────────────────────────────

/** Fire when a user clicks a portfolio filter tab. */
export function trackPortfolioFilterClick(filterName: string): void {
  sendEvent('portfolio_filter_click', { filter_name: filterName });
}

/** Fire when a user opens a case study page. */
export function trackCaseStudyOpen(slug: string): void {
  sendEvent('case_study_open', { slug: slug });
}

// ─── Blog events ─────────────────────────────────────────────────────────────

/** Fire when a user opens a blog post. */
export function trackBlogArticleOpen(slug: string): void {
  sendEvent('blog_article_open', { slug: slug });
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | null | undefined>,
): void {
  sendEvent(eventName, params);
}
