// ─── GA4 Analytics Utility ────────────────────────────────────────────────────
// Typed wrapper around window.gtag for event tracking.
// Safe for SSR — guards against window/gtag being unavailable.

type EventName =
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
  | 'outbound_link_click'

export function trackEvent(
  name: EventName,
  params?: Record<string, string | number>,
): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}
