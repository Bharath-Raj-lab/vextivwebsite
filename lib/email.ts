// ⚠️ SERVER ONLY — never import in client components.
import * as React from 'react';
import { Resend } from 'resend';
import ContactTeamNotification from '@/emails/team-notification';
import ContactClientConfirmation from '@/emails/client-confirmation';
import AuditTeamNotification from '@/emails/audit-team-notification';
import AuditClientConfirmation from '@/emails/audit-client-confirmation';
import NewsletterConfirmation from '@/emails/newsletter-confirmation';

// ─── Singleton ────────────────────────────────────────────────────────────────

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.RESEND_FROM_EMAIL ?? 'vextiv.tech@gmail.com';
const TEAM_TO = process.env.TEAM_EMAIL ?? 'team@vextivestudio.com';

// ─── Param types ─────────────────────────────────────────────────────────────

/** Shared UTM + timestamp fields present on every notification. */
interface BaseNotificationParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  submittedAt: string;
}

export interface ContactNotificationParams extends BaseNotificationParams {
  source: 'contact';
  name: string;
  email: string;
  phone: string;
  company: string | null;
  service: string | null;
  budget: string | null;
  brief: string | null;
}

export interface AuditNotificationParams extends BaseNotificationParams {
  source: 'audit';
  businessName: string;
  email: string;
  phone: string;
  primaryGoal: string;
  websiteUrl: string | null;
  hearAboutUs: string | null;
}

export type TeamNotificationParams =
  | ContactNotificationParams
  | AuditNotificationParams;

// ─── sendTeamNotification ─────────────────────────────────────────────────────

/**
 * Sends the internal team-notification email.
 * Dispatched to TEAM_EMAIL; template varies by `source`.
 *
 * Throws on Resend API failure — callers should use Promise.allSettled
 * to avoid blocking the success response.
 */
export async function sendTeamNotification(
  params: TeamNotificationParams,
): Promise<void> {
  let subject: string;
  let reactEl: React.ReactElement;

  if (params.source === 'contact') {
    subject = `New Contact Inquiry — ${params.name}`;
    reactEl = ContactTeamNotification({
      name: params.name,
      email: params.email,
      phone: params.phone,
      company: params.company,
      service: params.service,
      budget: params.budget,
      brief: params.brief,
      utm_source: params.utm_source,
      utm_medium: params.utm_medium,
      utm_campaign: params.utm_campaign,
      submittedAt: params.submittedAt,
    });
  } else {
    subject = `New Free Audit Request — ${params.businessName}`;
    reactEl = AuditTeamNotification({
      businessName: params.businessName,
      email: params.email,
      phone: params.phone,
      primaryGoal: params.primaryGoal,
      websiteUrl: params.websiteUrl,
      hearAboutUs: params.hearAboutUs,
      utm_source: params.utm_source,
      utm_medium: params.utm_medium,
      utm_campaign: params.utm_campaign,
      submittedAt: params.submittedAt,
    });
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: TEAM_TO,
    replyTo: 'vextiv.tech@gmail.com',
    subject,
    react: reactEl,
  });

  if (error) {
    throw new Error(`Resend team notification failed: ${JSON.stringify(error)}`);
  }
}

// ─── sendClientConfirmation ───────────────────────────────────────────────────

/** Discriminated params for the client-facing confirmation email. */
export type ClientConfirmationParams =
  | { source: 'contact'; name: string }
  | { source: 'audit'; businessName: string };

/**
 * Sends a confirmation email to the person who submitted the form.
 * Template varies by `source`.
 *
 * Throws on Resend API failure — callers should use Promise.allSettled.
 */
export async function sendClientConfirmation(
  params: ClientConfirmationParams,
  toEmail: string,
): Promise<void> {
  let subject: string;
  let reactEl: React.ReactElement;

  if (params.source === 'contact') {
    subject = "We've received your message — VeXtiv";
    reactEl = ContactClientConfirmation({ name: params.name });
  } else {
    subject = 'Your free digital audit is confirmed — VeXtiv';
    reactEl = AuditClientConfirmation({ businessName: params.businessName });
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: toEmail,
    replyTo: 'vextiv.tech@gmail.com',
    subject,
    react: reactEl,
  });

  if (error) {
    throw new Error(
      `Resend client confirmation failed: ${JSON.stringify(error)}`,
    );
  }
}

// ─── sendNewsletterConfirmation ───────────────────────────────────────────────

/**
 * Sends a confirmation email to a new blog newsletter subscriber.
 *
 * Throws on Resend API failure — callers should use Promise.allSettled.
 */
export async function sendNewsletterConfirmation(toEmail: string): Promise<void> {
  const { error } = await resend.emails.send({
    from: FROM,
    to: toEmail,
    replyTo: 'vextiv.tech@gmail.com',
    subject: 'Welcome to the VeXtiv Blog 🚀',
    react: NewsletterConfirmation(),
  });

  if (error) {
    throw new Error(`Resend newsletter confirmation failed: ${JSON.stringify(error)}`);
  }
}
