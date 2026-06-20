'use client';

/**
 * ContactForm — client component for the /contact page.
 *
 * ─── POST body key verification against lib/validations/contact.ts ────────────
 * Schema field    → POST body key   (match confirmed ✓)
 *   name          → name            ✓ required string
 *   email         → email           ✓ required string (email)
 *   phone         → phone           ✓ required string
 *   company       → company         ✓ string | null (optional)
 *   service       → service         ✓ enum | null   (SERVICE_OPTIONS)
 *   budget        → budget          ✓ enum | null   (BUDGET_OPTIONS)
 *   brief         → brief           ✓ string | null (optional)
 *   website       → website         ✓ honeypot, always ''
 *   utm_source    → utm_source      ✓ string | null (omitted if empty)
 *   utm_medium    → utm_medium      ✓ string | null (omitted if empty)
 *   utm_campaign  → utm_campaign    ✓ string | null (omitted if empty)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { z } from 'zod';
import { contactSchema } from '@/lib/validations/contact';
import {
  trackFormStart,
  trackFormSubmitSuccess,
  trackFormSubmitError,
} from '@/lib/analytics';

// Use the INPUT type (pre-transform) for useForm — zodResolver returns this
// to RHF. Both the form and submit handler share the same input type;
// optional fields are manually coerced to null in the body builder.
type ContactFormInput = z.input<typeof contactSchema>;

// ─── Enum options — source of truth: lib/validations/contact.ts ──────────────
// Update this file if the schema arrays change.

const SERVICE_OPTIONS = [
  'Website Development',
  'QR Ordering System',
  'Branding & Identity',
  'Social Media Management',
  'Content Creation',
  'Local SEO',
  'AI Integration',
  'Other',
] as const;

const BUDGET_OPTIONS = [
  'Under ₹10,000',
  '₹10,000–₹25,000',
  '₹25,000–₹50,000',
  '₹50,000+',
  "Let's discuss",
] as const;

const FORM_ID = 'contact-form';

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const hasTrackedStart = useRef(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name:         '',
      email:        '',
      phone:        '',
      company:      null,
      service:      null,
      budget:       null,
      brief:        null,
      website:      '',
      utm_source:   null,
      utm_medium:   null,
      utm_campaign: null,
    },
  });

  // ── On mount: pre-select ?service=X and capture UTM params ─────────────────
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (
      serviceParam &&
      (SERVICE_OPTIONS as readonly string[]).includes(serviceParam)
    ) {
      setValue('service', serviceParam as ContactFormInput['service']);
    }

    const utmSource   = searchParams.get('utm_source');
    const utmMedium   = searchParams.get('utm_medium');
    const utmCampaign = searchParams.get('utm_campaign');
    if (utmSource)   setValue('utm_source',   utmSource);
    if (utmMedium)   setValue('utm_medium',   utmMedium);
    if (utmCampaign) setValue('utm_campaign', utmCampaign);
  }, [searchParams, setValue]);

  // ── GA4: fire form_start once on first field interaction ───────────────────
  function handleFormFocus() {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackFormStart(FORM_ID);
    }
  }

  // ── Submit ──────────────────────────────────────────────────────────────────
  async function onSubmit(data: ContactFormInput) {
    /**
     * POST body — all keys match lib/validations/contact.ts exactly.
     * Optional fields send null (not undefined) so Supabase receives
     * a nullable value rather than omitting the column.
     * UTM keys are omitted entirely when not set (schema .nullish() transform
     * converts absent keys to null server-side).
     */
    const body: Record<string, string | null> = {
      name:    data.name,
      email:   data.email,
      phone:   data.phone,
      company: data.company  ?? null,
      service: data.service  ?? null,
      budget:  data.budget   ?? null,
      brief:   data.brief    ?? null,
      website: data.website  ?? '',   // honeypot — always ''
    };

    // Include UTM fields only when a value was actually captured from the URL
    if (data.utm_source)   body.utm_source   = data.utm_source;
    if (data.utm_medium)   body.utm_medium   = data.utm_medium;
    if (data.utm_campaign) body.utm_campaign = data.utm_campaign;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json() as
        | { success: true;  message: string }
        | { success: false; message: string; errors?: Record<string, string> };

      if (json.success) {
        // GA4 event before redirect so it fires before navigation
        trackFormSubmitSuccess(FORM_ID);
        router.push('/thank-you');
        return;
      }

      // ── Field-level validation errors from the API ──────────────────────────
      // setError preserves everything else the user typed
      if ('errors' in json && json.errors) {
        trackFormSubmitError(FORM_ID, json.message);
        for (const [field, message] of Object.entries(json.errors)) {
          setError(field as keyof ContactFormInput, { type: 'server', message });
        }
        return;
      }

      // Generic server error — attach to form root
      trackFormSubmitError(FORM_ID, json.message);
      setError('root', {
        message: json.message ?? 'Something went wrong. Please try again.',
      });
    } catch {
      const message = 'Network error. Check your connection and try again.';
      trackFormSubmitError(FORM_ID, message);
      setError('root', { message });
    }
  }

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="cp-page">

      {/* ── Hero header ── */}
      <section className="cp-hero" aria-label="Contact page header">
        <div className="cp-hero__inner">
          <p className="cp-eyebrow">Let&apos;s work together</p>
          <h1 className="cp-hero__heading">
            Tell us about<br />
            <span className="cp-hero__heading--accent">your project</span>
          </h1>
          <p className="cp-hero__sub">
            Fill in the form and we&apos;ll come back to you within
            1–2 business days with a tailored proposal.
          </p>
        </div>
        <div className="cp-hero__glow" aria-hidden="true" />
      </section>

      {/* ── Main grid ── */}
      <div className="cp-main" id="main-content">
        <div className="cp-grid">

          {/* ── Left info panel ── */}
          <aside className="cp-info" aria-label="Contact information">
            <div className="cp-info__block">
              <h2 className="cp-info__heading">What happens next?</h2>
              <ol className="cp-steps" role="list">
                {([
                  {
                    n:     '01',
                    label: 'We review your brief',
                    body:  'Our team reads every submission within one business day.',
                  },
                  {
                    n:     '02',
                    label: 'Discovery call',
                    body:  'We schedule a short call to align on goals and timeline.',
                  },
                  {
                    n:     '03',
                    label: 'Tailored proposal',
                    body:  'You receive a clear, itemised proposal — no hidden costs.',
                  },
                ] as const).map(({ n, label, body }) => (
                  <li key={n} className="cp-step">
                    <span className="cp-step__num" aria-hidden="true">{n}</span>
                    <div>
                      <p className="cp-step__label">{label}</p>
                      <p className="cp-step__body">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="cp-info__block cp-info__block--bordered">
              <p className="cp-info__label">Response time</p>
              <p className="cp-info__value">Within 24 hours</p>
              <p className="cp-info__label" style={{ marginTop: '16px' }}>Email us at</p>
              <a
                href="mailto:hello@vextivestudio.com"
                className="cp-info__link"
              >
                hello@vextivestudio.com
              </a>
            </div>
          </aside>

          {/* ── Form card ── */}
          <section className="cp-form-card" aria-label="Project enquiry form">

            {/* Root-level error banner */}
            {errors.root && (
              <div
                className="cp-global-error"
                role="alert"
                aria-live="assertive"
              >
                {errors.root.message}
              </div>
            )}

            <form
              id={FORM_ID}
              className="cp-form"
              onSubmit={handleSubmit(onSubmit)}
              onFocus={handleFormFocus}
              noValidate
              aria-label="Project enquiry form"
            >

              {/* ─── Name + Phone ───────────────────────────── */}
              <div className="cp-row">
                <div className="cp-field">
                  <label htmlFor="cp-name" className="cp-label">
                    Full name{' '}
                    <span className="cp-label__req" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="cp-name"
                    type="text"
                    className={`cp-input${errors.name ? ' cp-input--err' : ''}`}
                    placeholder="Ravi Sharma"
                    autoComplete="name"
                    aria-required="true"
                    aria-describedby={errors.name ? 'err-name' : undefined}
                    aria-invalid={!!errors.name}
                    {...register('name')}
                  />
                  {errors.name && (
                    <span id="err-name" className="cp-error" role="alert">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="cp-field">
                  <label htmlFor="cp-phone" className="cp-label">
                    Phone{' '}
                    <span className="cp-label__req" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="cp-phone"
                    type="tel"
                    className={`cp-input${errors.phone ? ' cp-input--err' : ''}`}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    inputMode="tel"
                    aria-required="true"
                    aria-describedby={errors.phone ? 'err-phone' : undefined}
                    aria-invalid={!!errors.phone}
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <span id="err-phone" className="cp-error" role="alert">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>

              {/* ─── Email + Company ────────────────────────── */}
              <div className="cp-row">
                <div className="cp-field">
                  <label htmlFor="cp-email" className="cp-label">
                    Email{' '}
                    <span className="cp-label__req" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="cp-email"
                    type="email"
                    className={`cp-input${errors.email ? ' cp-input--err' : ''}`}
                    placeholder="ravi@example.com"
                    autoComplete="email"
                    inputMode="email"
                    aria-required="true"
                    aria-describedby={errors.email ? 'err-email' : undefined}
                    aria-invalid={!!errors.email}
                    {...register('email')}
                  />
                  {errors.email && (
                    <span id="err-email" className="cp-error" role="alert">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="cp-field">
                  <label htmlFor="cp-company" className="cp-label">
                    Company
                    <span className="cp-label__opt"> (optional)</span>
                  </label>
                  <input
                    id="cp-company"
                    type="text"
                    className="cp-input"
                    placeholder="Sharma Electronics"
                    autoComplete="organization"
                    {...register('company')}
                  />
                </div>
              </div>

              {/* ─── Service + Budget ───────────────────────── */}
              <div className="cp-row">
                <div className="cp-field">
                  <label htmlFor="cp-service" className="cp-label">
                    Service needed
                    <span className="cp-label__opt"> (optional)</span>
                  </label>
                  <div className="cp-sel-wrap">
                    <select
                      id="cp-service"
                      className={`cp-select${errors.service ? ' cp-input--err' : ''}`}
                      aria-describedby={errors.service ? 'err-service' : undefined}
                      aria-invalid={!!errors.service}
                      {...register('service')}
                    >
                      <option value="">Select a service…</option>
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <span className="cp-sel-chevron" aria-hidden="true">▾</span>
                  </div>
                  {errors.service && (
                    <span id="err-service" className="cp-error" role="alert">
                      {errors.service.message}
                    </span>
                  )}
                </div>

                <div className="cp-field">
                  <label htmlFor="cp-budget" className="cp-label">
                    Budget range
                    <span className="cp-label__opt"> (optional)</span>
                  </label>
                  <div className="cp-sel-wrap">
                    <select
                      id="cp-budget"
                      className={`cp-select${errors.budget ? ' cp-input--err' : ''}`}
                      aria-describedby={errors.budget ? 'err-budget' : undefined}
                      aria-invalid={!!errors.budget}
                      {...register('budget')}
                    >
                      <option value="">Select a budget…</option>
                      {BUDGET_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <span className="cp-sel-chevron" aria-hidden="true">▾</span>
                  </div>
                  {errors.budget && (
                    <span id="err-budget" className="cp-error" role="alert">
                      {errors.budget.message}
                    </span>
                  )}
                </div>
              </div>

              {/* ─── Brief textarea ─────────────────────────── */}
              <div className="cp-field">
                <label htmlFor="cp-brief" className="cp-label">
                  Project details
                  <span className="cp-label__opt"> (optional)</span>
                </label>
                <textarea
                  id="cp-brief"
                  className={`cp-textarea${errors.brief ? ' cp-input--err' : ''}`}
                  placeholder="Tell us about your project, goals, timeline, or anything else that would help us prepare a great proposal…"
                  rows={5}
                  aria-describedby={errors.brief ? 'err-brief' : undefined}
                  aria-invalid={!!errors.brief}
                  {...register('brief')}
                />
                {errors.brief && (
                  <span id="err-brief" className="cp-error" role="alert">
                    {errors.brief.message}
                  </span>
                )}
              </div>

              {/* ─── Honeypot ────────────────────────────────── */}
              {/*
                Styled with opacity:0 + position:absolute (NOT display:none).
                Bots can still see and fill it. tabIndex={-1} removes it from
                keyboard navigation. aria-hidden hides it from screen readers.
              */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  opacity: 0,
                  pointerEvents: 'none',
                  top: 0,
                  left: 0,
                  height: 0,
                  overflow: 'hidden',
                }}
              >
                <label htmlFor="cp-website">Leave this blank</label>
                <input
                  id="cp-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register('website')}
                />
              </div>

              {/* ─── Submit button ───────────────────────────── */}
              <button
                id="cp-submit"
                type="submit"
                className="cp-submit"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="cp-submit__inner">
                    <span className="cp-spinner" aria-hidden="true" />
                    Sending…
                  </span>
                ) : (
                  <span className="cp-submit__inner">
                    Send enquiry
                    <span className="cp-submit__arrow" aria-hidden="true">→</span>
                  </span>
                )}
              </button>

              <p className="cp-disclaimer">
                No spam — just a conversation about your project.
              </p>
            </form>
          </section>
        </div>
      </div>

      <ContactStyles />
    </div>
  );
}

// ─── Scoped styles ────────────────────────────────────────────────────────────
// All colors via CSS variable tokens — zero hardcoded hex values.

function ContactStyles() {
  return (
    <style>{`
      /* ── Page shell ── */
      .cp-page {
        background-color: var(--bg-base);
        color: var(--text-primary);
        font-family: var(--font-body);
      }

      /* ── Hero ── */
      .cp-hero {
        position: relative;
        overflow: hidden;
        padding: 100px 24px 72px;
        border-bottom: 1px solid var(--border-subtle);
      }
      .cp-hero__inner {
        position: relative;
        z-index: 1;
        max-width: 680px;
        margin: 0 auto;
        text-align: center;
      }
      .cp-eyebrow {
        font-size: var(--text-xs);
        font-weight: 500;
        letter-spacing: var(--tracking-eyebrow);
        text-transform: uppercase;
        color: var(--text-accent);
        margin-bottom: 20px;
      }
      .cp-hero__heading {
        font-family: var(--font-display);
        font-size: clamp(40px, 6vw, 72px);
        font-weight: 800;
        line-height: 1.1;
        letter-spacing: var(--tracking-heading);
        color: var(--text-primary);
        margin-bottom: 20px;
      }
      .cp-hero__heading--accent { color: var(--text-accent); }
      .cp-hero__sub {
        font-size: var(--text-md);
        color: var(--text-secondary);
        line-height: var(--leading-body);
        max-width: 480px;
        margin: 0 auto;
      }
      .cp-hero__glow {
        position: absolute;
        inset: 0;
        background: var(--gradient-hero-glow);
        pointer-events: none;
        z-index: 0;
      }

      /* ── Main grid ── */
      .cp-main {
        max-width: 1140px;
        margin: 0 auto;
        padding: 64px 24px 100px;
      }
      .cp-grid {
        display: grid;
        grid-template-columns: 320px 1fr;
        gap: 64px;
        align-items: start;
      }

      /* ── Info panel ── */
      .cp-info {
        display: flex;
        flex-direction: column;
        gap: 32px;
        position: sticky;
        top: 88px;
      }
      .cp-info__block { display: flex; flex-direction: column; }
      .cp-info__block--bordered {
        padding: 24px;
        background-color: var(--bg-surface-1);
        border: 1px solid var(--border-default);
        border-radius: 12px;
      }
      .cp-info__heading {
        font-family: var(--font-display);
        font-size: var(--text-lg);
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 24px;
        letter-spacing: var(--tracking-heading);
      }
      .cp-steps {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
      .cp-step {
        display: flex;
        gap: 16px;
        align-items: flex-start;
      }
      .cp-step__num {
        font-family: var(--font-display);
        font-size: var(--text-xs);
        font-weight: 800;
        color: var(--text-accent);
        letter-spacing: var(--tracking-number);
        flex-shrink: 0;
        padding-top: 2px;
      }
      .cp-step__label {
        font-size: var(--text-sm);
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 4px;
      }
      .cp-step__body {
        font-size: var(--text-xs);
        color: var(--text-muted);
        line-height: var(--leading-body);
      }
      .cp-info__label {
        font-size: var(--text-2xs);
        font-weight: 500;
        letter-spacing: var(--tracking-eyebrow);
        text-transform: uppercase;
        color: var(--text-muted);
        margin-bottom: 6px;
      }
      .cp-info__value {
        font-size: var(--text-sm);
        font-weight: 600;
        color: var(--text-primary);
      }
      .cp-info__link {
        font-size: var(--text-sm);
        color: var(--text-accent);
        text-decoration: none;
        word-break: break-all;
        transition: opacity 200ms;
      }
      .cp-info__link:hover { opacity: 0.8; }
      .cp-info__link:focus-visible {
        outline: 2px solid var(--accent-focus);
        outline-offset: 2px;
        border-radius: 2px;
      }

      /* ── Form card ── */
      .cp-form-card {
        background-color: var(--bg-surface-1);
        border: 1px solid var(--border-default);
        border-radius: 20px;
        padding: 48px;
        position: relative;
      }

      /* Global error */
      .cp-global-error {
        padding: 14px 18px;
        background-color: rgba(255, 107, 107, 0.08);
        border: 1px solid rgba(255, 107, 107, 0.25);
        border-radius: 10px;
        font-size: var(--text-sm);
        color: var(--error);
        line-height: var(--leading-base);
        margin-bottom: 24px;
      }

      /* ── Form layout ── */
      .cp-form {
        display: flex;
        flex-direction: column;
        gap: 22px;
        position: relative;
      }
      .cp-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 18px;
      }
      .cp-field {
        display: flex;
        flex-direction: column;
        gap: 7px;
      }

      /* Labels */
      .cp-label {
        font-size: var(--text-xs);
        font-weight: 500;
        color: var(--text-secondary);
        letter-spacing: 0.01em;
      }
      .cp-label__req {
        color: var(--text-accent);
        margin-left: 2px;
      }
      .cp-label__opt {
        color: var(--text-muted);
        font-weight: 400;
      }

      /* Inputs */
      .cp-input,
      .cp-select,
      .cp-textarea {
        width: 100%;
        padding: 12px 16px;
        background-color: var(--bg-surface-2);
        border: 1px solid var(--border-medium);
        border-radius: 10px;
        color: var(--text-primary);
        font-family: var(--font-body);
        font-size: var(--text-sm);
        line-height: var(--leading-base);
        transition: border-color 200ms, box-shadow 200ms;
        outline: none;
        -webkit-appearance: none;
        appearance: none;
      }
      .cp-input::placeholder,
      .cp-textarea::placeholder {
        color: var(--text-very-muted);
      }
      .cp-input:hover,
      .cp-select:hover,
      .cp-textarea:hover {
        border-color: var(--border-hover);
      }
      .cp-input:focus-visible,
      .cp-select:focus-visible,
      .cp-textarea:focus-visible {
        border-color: var(--accent-focus);
        box-shadow: 0 0 0 3px var(--accent-fill-08);
        outline: none;
      }
      .cp-input--err {
        border-color: rgba(255, 107, 107, 0.5) !important;
      }
      .cp-input--err:focus-visible {
        border-color: var(--error) !important;
        box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.12) !important;
      }
      .cp-textarea {
        resize: vertical;
        min-height: 120px;
      }

      /* Select */
      .cp-sel-wrap { position: relative; }
      .cp-select   { cursor: pointer; padding-right: 36px; }
      .cp-select option {
        background-color: var(--bg-surface-3);
        color: var(--text-primary);
      }
      .cp-sel-chevron {
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
      .cp-error {
        font-size: var(--text-2xs);
        color: var(--error);
        line-height: var(--leading-base);
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .cp-error::before {
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

      /* Submit */
      .cp-submit {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 15px 28px;
        background-color: var(--accent);
        color: var(--bg-base);
        font-family: var(--font-body);
        font-size: var(--text-sm);
        font-weight: 600;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: opacity 200ms, transform 100ms;
        margin-top: 4px;
      }
      .cp-submit:hover:not(:disabled) { opacity: 0.92; }
      .cp-submit:active:not(:disabled) { transform: scale(0.99); }
      .cp-submit:disabled { opacity: 0.5; cursor: not-allowed; }
      .cp-submit:focus-visible {
        outline: 2px solid var(--accent-focus);
        outline-offset: 3px;
        border-radius: 10px;
      }
      .cp-submit__inner {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .cp-submit__arrow {
        font-size: 16px;
        transition: transform 200ms;
      }
      .cp-submit:hover:not(:disabled) .cp-submit__arrow {
        transform: translateX(4px);
      }

      /* Spinner */
      .cp-spinner {
        display: inline-block;
        width: 15px;
        height: 15px;
        border: 2px solid rgba(8, 8, 8, 0.25);
        border-top-color: var(--bg-base);
        border-radius: 50%;
        animation: cp-spin 0.6s linear infinite;
        flex-shrink: 0;
      }
      @keyframes cp-spin {
        to { transform: rotate(360deg); }
      }

      /* Disclaimer */
      .cp-disclaimer {
        font-size: var(--text-2xs);
        color: var(--text-muted);
        text-align: center;
        line-height: var(--leading-base);
      }

      /* ── Responsive ── */
      @media (max-width: 960px) {
        .cp-grid {
          grid-template-columns: 1fr;
          gap: 48px;
        }
        .cp-info { position: static; }
      }
      @media (max-width: 600px) {
        .cp-hero { padding: 80px 20px 56px; }
        .cp-main { padding: 48px 16px 72px; }
        .cp-form-card { padding: 28px 20px; border-radius: 14px; }
        .cp-row { grid-template-columns: 1fr; }
      }
    `}</style>
  );
}
