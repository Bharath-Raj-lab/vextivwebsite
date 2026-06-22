// ⚠️ CLIENT ONLY — never import in server components.
// GA4 event helper. Uses window.gtag if available; silently no-ops if not.
// All events are safe to call during SSR (typeof window guard).
//
// Cookie-consent note: window.gtag is only defined AFTER the user accepts
// cookies (the GA4 script tag is withheld until consent). Calling trackEvent
// before consent is therefore a natural no-op — no special flag is needed.

// ─── Strict event-name union (PRD §9.1) ─────────────────────────────────────

export type EventName =
  | 'cta_click'
  | 'form_start'
  | 'form_step_complete'
  | 'form_submit_success'
  | 'form_submit_error'
  | 'pricing_plan_click'
  | 'audit_cta_click'
  | 'whatsapp_click'
  | 'blog_article_open'
  | 'portfolio_filter_click'
  | 'case_study_open'
  | 'scroll_depth_50'
  | 'scroll_depth_90'
  | 'outbound_link_click';

// ─── gtag type ───────────────────────────────────────────────────────────────

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

// ─── Core dispatcher ─────────────────────────────────────────────────────────

/**
 * Send a GA4 event.
 * No-ops safely when:
 *   • running on the server (typeof window === 'undefined')
 *   • gtag has not been injected yet (cookie consent not given)
 */
export function trackEvent(
  eventName: EventName,
  params?: Record<string, string | number>,
): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}

// ─── Named helpers (backwards-compat with existing call sites) ───────────────

/** Fire when the user focuses any field in a form for the first time. */
export function trackFormStart(formId: string): void {
  trackEvent('form_start', { form_id: formId });
}

/** Fire immediately before redirecting on successful submission. */
export function trackFormSubmitSuccess(formId: string): void {
  trackEvent('form_submit_success', { form_id: formId });
}

/** Fire when the API returns an error (network or validation). */
export function trackFormSubmitError(formId: string, errorMessage: string): void {
  trackEvent('form_submit_error', { form_id: formId, error_message: errorMessage });
}

/** Fire when a user clicks a portfolio filter tab. */
export function trackPortfolioFilterClick(filterName: string): void {
  trackEvent('portfolio_filter_click', { filter_name: filterName });
}

/** Fire when a user opens a case study page. */
export function trackCaseStudyOpen(slug: string): void {
  trackEvent('case_study_open', { slug });
}

/** Fire when a user opens a blog post. */
export function trackBlogArticleOpen(slug: string): void {
  trackEvent('blog_article_open', { slug });
}
