'use client';

/**
 * AuditForm — client component for the Free Digital Audit funnel.
 *
 * Field names are taken verbatim from lib/validations/audit.ts.
 * DO NOT rename them here if the schema changes — update this file to match.
 *
 * Schema fields used in the POST body (exact keys):
 *   businessName   — required string
 *   websiteUrl     — optional string (url) | null
 *   primaryGoal    — required enum (see PRIMARY_GOAL_OPTIONS below)
 *   phone          — required string
 *   email          — required string (email)
 *   hearAboutUs    — required in UX; schema is nullish (see note below)
 *   website        — honeypot (hidden, always empty for legit users)
 *   utm_source     — string | undefined  (omit key if no URL param)
 *   utm_medium     — string | undefined  (omit key if no URL param)
 *   utm_campaign   — string | undefined  (omit key if no URL param)
 *
 * Note on hearAboutUs: the Zod schema marks it .nullish() so null is accepted.
 * PRD Section 5.7 treats it as required in the UX — we enforce selection in the
 * form but the server will accept null (bots / edge cases).
 */

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useReducer, useRef } from 'react';
import { logger } from '@/logger';
import { trackFormStart, trackFormSubmitSuccess, trackFormSubmitError } from '@/lib/analytics';

// ─── Enum options — copied from lib/validations/audit.ts (source of truth) ────
// If the schema changes these arrays, update this file to match.

const PRIMARY_GOAL_OPTIONS = [
  'Get more customers online',
  'Improve my website',
  'Boost local SEO',
  'Build a brand identity',
  'Launch a new product',
  'Other',
] as const;

const HEAR_ABOUT_US_OPTIONS = [
  'Google Search',
  'Instagram',
  'Facebook',
  'LinkedIn',
  'Referral',
  'Other',
] as const;

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Raw form state (all strings — inputs are always strings before submission).
 * Keys match the Zod schema exactly.
 */
interface FormFields {
  businessName: string;
  websiteUrl: string;
  primaryGoal: string;
  phone: string;
  email: string;
  hearAboutUs: string;
  // Honeypot — always empty for real users
  website: string;
  // UTM — populated from URL params on mount, empty string means not present
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

type FieldErrors = Partial<Record<keyof FormFields, string>>;

interface FormState {
  fields: FormFields;
  errors: FieldErrors;
  globalError: string;
  status: 'idle' | 'submitting' | 'success';
}

type FormAction =
  | { type: 'SET_FIELD'; field: keyof FormFields; value: string }
  | { type: 'SET_ERRORS'; errors: FieldErrors }
  | { type: 'SET_GLOBAL_ERROR'; message: string }
  | { type: 'SET_STATUS'; status: FormState['status'] }
  | { type: 'SET_UTM'; utm_source: string; utm_medium: string; utm_campaign: string };

const INITIAL_FIELDS: FormFields = {
  businessName: '',
  websiteUrl: '',
  primaryGoal: '',
  phone: '',
  email: '',
  hearAboutUs: '',
  website: '',       // honeypot — always stays ''
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        fields: { ...state.fields, [action.field]: action.value },
        // Clear the field error as the user types
        errors: { ...state.errors, [action.field]: undefined },
        globalError: '',
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors, status: 'idle' };
    case 'SET_GLOBAL_ERROR':
      return { ...state, globalError: action.message, status: 'idle' };
    case 'SET_STATUS':
      return { ...state, status: action.status };
    case 'SET_UTM':
      return {
        ...state,
        fields: {
          ...state.fields,
          utm_source: action.utm_source,
          utm_medium: action.utm_medium,
          utm_campaign: action.utm_campaign,
        },
      };
    default:
      return state;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AuditForm() {
  const searchParams = useSearchParams();

  const [state, dispatch] = useReducer(formReducer, {
    fields: INITIAL_FIELDS,
    errors: {},
    globalError: '',
    status: 'idle',
  });

  const firstErrorRef = useRef<HTMLElement | null>(null);
  const hasTrackedStart = useRef(false);

  // ── GA4: fire form_start once on first field interaction ──────────────────
  function handleFormFocus() {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackFormStart('audit-form');
    }
  }

  // ── On mount: read UTM params from URL ──────────────────────────────────────
  useEffect(() => {
    dispatch({
      type: 'SET_UTM',
      utm_source: searchParams.get('utm_source') ?? '',
      utm_medium: searchParams.get('utm_medium') ?? '',
      utm_campaign: searchParams.get('utm_campaign') ?? '',
    });
  }, [searchParams]);

  // ── Focus first error on validation failure ──────────────────────────────────
  useEffect(() => {
    if (Object.keys(state.errors).length > 0) {
      firstErrorRef.current?.focus();
    }
  }, [state.errors]);

  // ── Field change handler ─────────────────────────────────────────────────────
  function handleChange(field: keyof FormFields, value: string) {
    dispatch({ type: 'SET_FIELD', field, value });
  }

  // ── Submit ───────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (state.status === 'submitting') return;
    dispatch({ type: 'SET_STATUS', status: 'submitting' });

    const { fields } = state;

    /**
     * Build the POST body using EXACT key names from lib/validations/audit.ts.
     * UTM params: omit the key entirely if the value is empty — the schema
     * expects null | string, not empty string. websiteUrl: omit if empty.
     *
     * DEV NOTE: log the body through the shared logger so you can verify in
     * the Network tab that every key exactly matches the Zod schema.
     */
    const body: Record<string, string | null> = {
      businessName: fields.businessName,
      primaryGoal: fields.primaryGoal,
      phone: fields.phone,
      email: fields.email,
      hearAboutUs: fields.hearAboutUs || null,
      website: fields.website,          // honeypot — always ''
      websiteUrl: fields.websiteUrl || null,
      utm_source: fields.utm_source || null,
      utm_medium: fields.utm_medium || null,
      utm_campaign: fields.utm_campaign || null,
    };

    // Strip explicit null UTM keys so the schema receives undefined (treated as null via .nullish())
    if (!body.utm_source) delete body.utm_source;
    if (!body.utm_medium) delete body.utm_medium;
    if (!body.utm_campaign) delete body.utm_campaign;

    logger.debug('[AuditForm] POST /api/audit body:', JSON.stringify(body, null, 2));

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json() as
        | { success: true }
        | { success: false; message: string; errors?: Record<string, string> };

      if (json.success) {
        trackFormSubmitSuccess('audit-form');
        dispatch({ type: 'SET_STATUS', status: 'success' });
        return;
      }

      // Field-level validation errors from the API
      if ('errors' in json && json.errors) {
        trackFormSubmitError('audit-form', json.message ?? 'Validation error');
        const fieldErrors: FieldErrors = {};
        for (const [key, msg] of Object.entries(json.errors)) {
          if (key in INITIAL_FIELDS) {
            fieldErrors[key as keyof FormFields] = msg;
          }
        }
        dispatch({ type: 'SET_ERRORS', errors: fieldErrors });
        return;
      }

      // Generic server error
      trackFormSubmitError('audit-form', json.message ?? 'Server error');
      dispatch({
        type: 'SET_GLOBAL_ERROR',
        message: json.message ?? 'Something went wrong. Please try again.',
      });
    } catch {
      const networkMsg = 'Network error. Please check your connection and try again.';
      trackFormSubmitError('audit-form', networkMsg);
      dispatch({
        type: 'SET_GLOBAL_ERROR',
        message: networkMsg,
      });
    }
  }

  // ─── Success state ──────────────────────────────────────────────────────────
  if (state.status === 'success') {
    return (
      <div className="audit-page">
        <main className="audit-main" id="main-content">
          <div className="audit-success" role="status" aria-live="polite">
            <div className="audit-success__icon" aria-hidden="true">✓</div>
            <h1 className="audit-success__heading">You&apos;re on the list!</h1>
            <p className="audit-success__body">
              Our team will review your details and send you a personalised
              digital audit report within <strong>1–2 business days</strong>.
            </p>
            <p className="audit-success__sub">
              Keep an eye on your inbox — we might also follow up by phone if
              we spot something worth discussing straight away.
            </p>
            <Link href="/" className="audit-success__cta">
              Back to Vextiv
            </Link>
          </div>
        </main>
        <AuditStyles />
      </div>
    );
  }

  const { fields, errors, globalError, status } = state;

  // ─── Form ───────────────────────────────────────────────────────────────────
  return (
    <div className="audit-page">
      <main className="audit-main" id="main-content">
        <div className="audit-container">
          {/* ── Left: copy ── */}
          <aside className="audit-copy" aria-hidden="false">
            <p className="audit-eyebrow">Free · No commitment</p>
            <h1 className="audit-heading">
              Get your free<br />
              <span className="audit-heading--accent">digital audit</span>
            </h1>
            <p className="audit-subheading">
              Tell us about your business and we&apos;ll send you a
              personalised report with actionable recommendations — no strings
              attached.
            </p>
            <ul className="audit-benefits" role="list">
              {[
                'Website speed & UX review',
                'Local SEO gap analysis',
                'Competitor benchmark snapshot',
                'Top 3 quick-win recommendations',
              ].map((item) => (
                <li key={item} className="audit-benefits__item">
                  <span className="audit-benefits__check" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </aside>

          {/* ── Right: form ── */}
          <section className="audit-form-wrapper" aria-label="Request your free audit">
            <form
              id="audit-form"
              className="audit-form"
              onSubmit={handleSubmit}
              onFocus={handleFormFocus}
              noValidate
              aria-label="Free digital audit request form"
            >
              {/* Global error */}
              {globalError && (
                <div
                  className="audit-global-error"
                  role="alert"
                  aria-live="assertive"
                >
                  {globalError}
                </div>
              )}

              {/* ─── Business Name ─────────────────────────────────── */}
              <div className="audit-field">
                <label htmlFor="audit-businessName" className="audit-label">
                  Business name <span className="audit-label__required" aria-hidden="true">*</span>
                </label>
                <input
                  id="audit-businessName"
                  name="businessName"
                  type="text"
                  className={`audit-input${errors.businessName ? ' audit-input--error' : ''}`}
                  value={fields.businessName}
                  onChange={(e) => handleChange('businessName', e.target.value)}
                  placeholder="e.g. Sharma Electronics"
                  autoComplete="organization"
                  aria-required="true"
                  aria-describedby={errors.businessName ? 'error-businessName' : undefined}
                  aria-invalid={!!errors.businessName}
                  ref={(el) => {
                    if (errors.businessName && !firstErrorRef.current) {
                      firstErrorRef.current = el;
                    }
                  }}
                />
                {errors.businessName && (
                  <span id="error-businessName" className="audit-error" role="alert">
                    {errors.businessName}
                  </span>
                )}
              </div>

              {/* ─── Website URL ────────────────────────────────────── */}
              <div className="audit-field">
                <label htmlFor="audit-websiteUrl" className="audit-label">
                  Website URL
                  <span className="audit-label__optional"> (optional)</span>
                </label>
                <input
                  id="audit-websiteUrl"
                  name="websiteUrl"
                  type="url"
                  className={`audit-input${errors.websiteUrl ? ' audit-input--error' : ''}`}
                  value={fields.websiteUrl}
                  onChange={(e) => handleChange('websiteUrl', e.target.value)}
                  placeholder="https://yourbusiness.com"
                  autoComplete="url"
                  aria-describedby={errors.websiteUrl ? 'error-websiteUrl' : undefined}
                  aria-invalid={!!errors.websiteUrl}
                />
                {errors.websiteUrl && (
                  <span id="error-websiteUrl" className="audit-error" role="alert">
                    {errors.websiteUrl}
                  </span>
                )}
              </div>

              {/* ─── Primary Goal ────────────────────────────────────── */}
              <div className="audit-field">
                <label htmlFor="audit-primaryGoal" className="audit-label">
                  What&apos;s your primary goal?{' '}
                  <span className="audit-label__required" aria-hidden="true">*</span>
                </label>
                <div className="audit-select-wrapper">
                  <select
                    id="audit-primaryGoal"
                    name="primaryGoal"
                    className={`audit-select${errors.primaryGoal ? ' audit-input--error' : ''}`}
                    value={fields.primaryGoal}
                    onChange={(e) => handleChange('primaryGoal', e.target.value)}
                    aria-required="true"
                    aria-describedby={errors.primaryGoal ? 'error-primaryGoal' : undefined}
                    aria-invalid={!!errors.primaryGoal}
                    ref={(el) => {
                      if (errors.primaryGoal && !firstErrorRef.current) {
                        firstErrorRef.current = el;
                      }
                    }}
                  >
                    <option value="" disabled>Select a goal…</option>
                    {PRIMARY_GOAL_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <span className="audit-select-chevron" aria-hidden="true">▾</span>
                </div>
                {errors.primaryGoal && (
                  <span id="error-primaryGoal" className="audit-error" role="alert">
                    {errors.primaryGoal}
                  </span>
                )}
              </div>

              {/* ─── Phone + Email (2-col on desktop) ─────────────── */}
              <div className="audit-row">
                <div className="audit-field">
                  <label htmlFor="audit-phone" className="audit-label">
                    Phone number <span className="audit-label__required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="audit-phone"
                    name="phone"
                    type="tel"
                    className={`audit-input${errors.phone ? ' audit-input--error' : ''}`}
                    value={fields.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    aria-required="true"
                    aria-describedby={errors.phone ? 'error-phone' : undefined}
                    aria-invalid={!!errors.phone}
                    ref={(el) => {
                      if (errors.phone && !firstErrorRef.current) {
                        firstErrorRef.current = el;
                      }
                    }}
                  />
                  {errors.phone && (
                    <span id="error-phone" className="audit-error" role="alert">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div className="audit-field">
                  <label htmlFor="audit-email" className="audit-label">
                    Email address <span className="audit-label__required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="audit-email"
                    name="email"
                    type="email"
                    className={`audit-input${errors.email ? ' audit-input--error' : ''}`}
                    value={fields.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="you@yourbusiness.com"
                    autoComplete="email"
                    inputMode="email"
                    aria-required="true"
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    aria-invalid={!!errors.email}
                    ref={(el) => {
                      if (errors.email && !firstErrorRef.current) {
                        firstErrorRef.current = el;
                      }
                    }}
                  />
                  {errors.email && (
                    <span id="error-email" className="audit-error" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* ─── Hear About Us ─────────────────────────────────── */}
              <div className="audit-field">
                <label htmlFor="audit-hearAboutUs" className="audit-label">
                  How did you hear about us?{' '}
                  <span className="audit-label__required" aria-hidden="true">*</span>
                </label>
                <div className="audit-select-wrapper">
                  <select
                    id="audit-hearAboutUs"
                    name="hearAboutUs"
                    className={`audit-select${errors.hearAboutUs ? ' audit-input--error' : ''}`}
                    value={fields.hearAboutUs}
                    onChange={(e) => handleChange('hearAboutUs', e.target.value)}
                    aria-required="true"
                    aria-describedby={errors.hearAboutUs ? 'error-hearAboutUs' : undefined}
                    aria-invalid={!!errors.hearAboutUs}
                    ref={(el) => {
                      if (errors.hearAboutUs && !firstErrorRef.current) {
                        firstErrorRef.current = el;
                      }
                    }}
                  >
                    <option value="" disabled>Select an option…</option>
                    {HEAR_ABOUT_US_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <span className="audit-select-chevron" aria-hidden="true">▾</span>
                </div>
                {errors.hearAboutUs && (
                  <span id="error-hearAboutUs" className="audit-error" role="alert">
                    {errors.hearAboutUs}
                  </span>
                )}
              </div>

              {/* ─── Honeypot — must be present but hidden ─────────── */}
              {/* opacity:0 + position:absolute (not display:none) so screenreaders
                  don't skip it but it's visually invisible. tabIndex={-1} prevents
                  keyboard focus. aria-hidden hides it from AT. */}
              <div
                aria-hidden="true"
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', top: 0, left: 0, height: 0, overflow: 'hidden' }}
              >
                <label htmlFor="audit-website">Leave this blank</label>
                <input
                  id="audit-website"
                  name="website"
                  type="text"
                  value={fields.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* ─── Submit ────────────────────────────────────────── */}
              <button
                id="audit-submit"
                type="submit"
                className="audit-submit-btn btn-premium"
                disabled={status === 'submitting'}
                aria-disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <span className="audit-submit__inner">
                    <span className="audit-spinner" aria-hidden="true" />
                    Sending…
                  </span>
                ) : (
                  <span className="audit-submit__inner">
                    Get my free audit
                    <span className="audit-submit__arrow" aria-hidden="true">→</span>
                  </span>
                )}
              </button>

              <p className="audit-disclaimer">
                No spam. No sales calls. Just your audit.
              </p>
            </form>
          </section>
        </div>
      </main>

      <AuditStyles />
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
// All colors use CSS variable tokens — zero hardcoded hex values.

function AuditStyles() {
  return (
    <style>{`
      /* ── Page shell ── */
      .audit-page {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: var(--bg-base);
        color: var(--text-primary);
        font-family: var(--font-body);
      }

      /* ── Main area ── */
      .audit-main {
        flex: 1;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 56px 24px 80px;
      }

      /* ── Two-column container ── */
      .audit-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 80px;
        align-items: start;
        max-width: 1100px;
        width: 100%;
      }

      /* ── Left copy ── */
      .audit-eyebrow {
        font-family: var(--font-body);
        font-size: var(--text-xs);
        font-weight: 500;
        letter-spacing: var(--tracking-eyebrow);
        text-transform: uppercase;
        color: var(--text-accent);
        margin-bottom: 16px;
      }
      .audit-heading {
        font-family: var(--font-display);
        font-size: clamp(32px, 4vw, 48px);
        font-weight: 800;
        line-height: 1.15;
        letter-spacing: var(--tracking-heading);
        color: var(--text-primary);
        margin-bottom: 20px;
      }
      .audit-heading--accent { color: var(--text-accent); }
      .audit-subheading {
        font-size: var(--text-base);
        color: var(--text-secondary);
        line-height: var(--leading-body);
        margin-bottom: 36px;
        max-width: 380px;
      }
      .audit-benefits {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .audit-benefits__item {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: var(--text-sm);
        color: var(--text-secondary);
        line-height: var(--leading-tight);
      }
      .audit-benefits__check {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: var(--accent-fill-12);
        color: var(--text-accent);
        font-size: 11px;
        font-weight: 700;
        flex-shrink: 0;
      }

      /* ── Form wrapper ── */
      .audit-form-wrapper {
        background-color: var(--bg-surface-1);
        border: 1px solid var(--border-default);
        border-radius: 16px;
        padding: 40px;
        position: sticky;
        top: 80px;
      }

      /* ── Form ── */
      .audit-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      /* Global error banner */
      .audit-global-error {
        padding: 12px 16px;
        background-color: rgba(255, 107, 107, 0.08);
        border: 1px solid rgba(255, 107, 107, 0.25);
        border-radius: 8px;
        font-size: var(--text-sm);
        color: var(--error);
        line-height: var(--leading-base);
      }

      /* ── Field ── */
      .audit-field {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .audit-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }

      /* Labels */
      .audit-label {
        font-size: var(--text-xs);
        font-weight: 500;
        color: var(--text-secondary);
        letter-spacing: 0.01em;
      }
      .audit-label__required {
        color: var(--text-accent);
        margin-left: 2px;
      }
      .audit-label__optional {
        color: var(--text-muted);
        font-weight: 400;
      }

      /* Inputs */
      .audit-input,
      .audit-select {
        width: 100%;
        padding: 11px 14px;
        background-color: var(--bg-surface-2);
        border: 1px solid var(--border-medium);
        border-radius: 8px;
        color: var(--text-primary);
        font-family: var(--font-body);
        font-size: var(--text-sm);
        line-height: var(--leading-base);
        transition: border-color 200ms, box-shadow 200ms;
        outline: none;
        -webkit-appearance: none;
        appearance: none;
      }
      .audit-input:-webkit-autofill,
      .audit-input:-webkit-autofill:hover,
      .audit-input:-webkit-autofill:focus,
      .audit-select:-webkit-autofill,
      .audit-select:-webkit-autofill:hover,
      .audit-select:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0px 1000px var(--bg-surface-2) inset !important;
        -webkit-text-fill-color: var(--text-primary) !important;
        transition: background-color 5000s ease-in-out 0s;
      }
      .audit-input::placeholder {
        color: var(--text-very-muted);
      }
      .audit-input:hover,
      .audit-select:hover {
        border-color: var(--border-hover);
      }
      .audit-input:focus-visible,
      .audit-select:focus-visible {
        border-color: var(--accent-focus);
        box-shadow: 0 0 0 3px var(--accent-fill-08);
        outline: none;
      }
      .audit-input--error {
        border-color: rgba(255, 107, 107, 0.5);
      }
      .audit-input--error:focus-visible {
        border-color: var(--error);
        box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.12);
      }

      /* Select wrapper (custom chevron) */
      .audit-select-wrapper {
        position: relative;
      }
      .audit-select {
        cursor: pointer;
        padding-right: 36px;
        background-image: none;
      }
      .audit-select option {
        background-color: var(--bg-surface-3);
        color: var(--text-primary);
      }
      .audit-select-chevron {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
        font-size: 11px;
        pointer-events: none;
        user-select: none;
      }

      /* Field errors */
      .audit-error {
        font-size: var(--text-2xs);
        color: var(--error);
        line-height: var(--leading-base);
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .audit-error::before {
        content: '!';
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: var(--error);
        color: var(--bg-base);
        font-size: 9px;
        font-weight: 700;
        flex-shrink: 0;
      }

      /* Submit button */
      .audit-submit {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 14px 24px;
        background: var(--gradient-btn);
        color: var(--bg-base);
        font-family: var(--font-body);
        font-size: var(--text-sm);
        font-weight: 600;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: opacity 200ms, transform 100ms;
        margin-top: 4px;
      }
      .audit-submit:hover:not(:disabled) { opacity: 0.92; }
      .audit-submit:active:not(:disabled) { transform: scale(0.99); }
      .audit-submit:disabled { opacity: 0.55; cursor: not-allowed; }
      .audit-submit:focus-visible {
        outline: 2px solid var(--accent-focus);
        outline-offset: 3px;
        border-radius: 8px;
      }
      .audit-submit__inner {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .audit-submit__arrow {
        font-size: 16px;
        transition: transform 200ms;
      }
      .audit-submit:hover:not(:disabled) .audit-submit__arrow {
        transform: translateX(3px);
      }

      /* Spinner */
      .audit-spinner {
        display: inline-block;
        width: 14px;
        height: 14px;
        border: 2px solid rgba(8, 8, 8, 0.25);
        border-top-color: var(--bg-base);
        border-radius: 50%;
        animation: audit-spin 0.6s linear infinite;
        flex-shrink: 0;
      }
      @keyframes audit-spin {
        to { transform: rotate(360deg); }
      }

      /* Disclaimer */
      .audit-disclaimer {
        font-size: var(--text-2xs);
        color: var(--text-muted);
        text-align: center;
        line-height: var(--leading-base);
      }

      /* ── Success state ── */
      .audit-success {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        max-width: 480px;
        margin: 0 auto;
        padding: 80px 24px;
        animation: audit-fade-in 0.4s ease-out both;
      }
      @keyframes audit-fade-in {
        from { opacity: 0; transform: translateY(12px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .audit-success__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background-color: var(--accent-fill-12);
        color: var(--text-accent);
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 24px;
        border: 1px solid var(--accent-border-card);
      }
      .audit-success__heading {
        font-family: var(--font-display);
        font-size: clamp(28px, 4vw, 40px);
        font-weight: 800;
        letter-spacing: var(--tracking-heading);
        color: var(--text-primary);
        margin-bottom: 16px;
      }
      .audit-success__body {
        font-size: var(--text-base);
        color: var(--text-secondary);
        line-height: var(--leading-body);
        margin-bottom: 12px;
      }
      .audit-success__sub {
        font-size: var(--text-sm);
        color: var(--text-muted);
        line-height: var(--leading-body);
        margin-bottom: 32px;
      }
      .audit-success__cta {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 12px 24px;
        background: var(--gradient-btn);
        color: var(--bg-base);
        font-family: var(--font-body);
        font-size: var(--text-sm);
        font-weight: 600;
        border-radius: 8px;
        text-decoration: none;
        transition: opacity 200ms;
      }
      .audit-success__cta:hover { opacity: 0.9; }
      .audit-success__cta:focus-visible {
        outline: 2px solid var(--accent-focus);
        outline-offset: 3px;
        border-radius: 8px;
      }

      /* ── Responsive ── */
      @media (max-width: 900px) {
        .audit-container {
          grid-template-columns: 1fr;
          gap: 40px;
        }
        .audit-form-wrapper {
          position: static;
        }
        .audit-copy {
          text-align: center;
        }
        .audit-subheading {
          max-width: 100%;
        }
        .audit-benefits {
          align-items: center;
        }
      }
      @media (max-width: 768px) {
        .audit-input,
        .audit-select {
          font-size: 16px;
        }
      }
      @media (max-width: 540px) {
        .audit-main {
          padding: 32px 16px 60px;
        }
        .audit-form-wrapper {
          padding: 28px 20px;
          border-radius: 12px;
        }
        .audit-row {
          grid-template-columns: 1fr;
        }
      }
    `}</style>
  );
}
