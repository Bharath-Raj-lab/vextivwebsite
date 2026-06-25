// React Email template — Audit team notification
// Sent to the internal team when a new free-audit request is submitted.
// Rendered server-side by Resend; import via @/emails/audit-team-notification.

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from 'react-email';
import * as React from 'react';

// ─── Props ────────────────────────────────────────────────────────────────────

export interface AuditTeamNotificationProps {
  businessName: string;
  email: string;
  phone: string;
  primaryGoal: string;
  websiteUrl: string | null;
  hearAboutUs: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  submittedAt: string;
}

// ─── Template ─────────────────────────────────────────────────────────────────

export default function AuditTeamNotification({
  businessName,
  email,
  phone,
  primaryGoal,
  websiteUrl,
  hearAboutUs,
  utm_source,
  utm_medium,
  utm_campaign,
  submittedAt,
}: AuditTeamNotificationProps) {
  const hasUtm = utm_source || utm_medium || utm_campaign;

  return (
    <Html>
      <Head />
      <Preview>New Free Audit Request — {businessName}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>🔍 New Free Audit Request</Heading>
          <Text style={styles.meta}>Received: {submittedAt}</Text>

          <Hr style={styles.hr} />

          {/* ── Contact details ── */}
          <Section>
            <Heading as="h2" style={styles.subheading}>
              Contact Details
            </Heading>
            <Row>
              <Text style={styles.label}>Business Name</Text>
              <Text style={styles.value}>{businessName}</Text>
            </Row>
            <Row>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{email}</Text>
            </Row>
            <Row>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{phone}</Text>
            </Row>
            {websiteUrl && (
              <Row>
                <Text style={styles.label}>Website URL</Text>
                <Text style={styles.value}>{websiteUrl}</Text>
              </Row>
            )}
          </Section>

          <Hr style={styles.hr} />

          {/* ── Audit details ── */}
          <Section>
            <Heading as="h2" style={styles.subheading}>
              Audit Details
            </Heading>
            <Row>
              <Text style={styles.label}>Primary Goal</Text>
              <Text style={styles.value}>{primaryGoal}</Text>
            </Row>
            {hearAboutUs && (
              <Row>
                <Text style={styles.label}>How They Heard About Us</Text>
                <Text style={styles.value}>{hearAboutUs}</Text>
              </Row>
            )}
          </Section>

          {/* ── UTM attribution (only if present) ── */}
          {hasUtm && (
            <>
              <Hr style={styles.hr} />
              <Section>
                <Heading as="h2" style={styles.subheading}>
                  UTM Attribution
                </Heading>
                {utm_source && (
                  <Row>
                    <Text style={styles.label}>Source</Text>
                    <Text style={styles.value}>{utm_source}</Text>
                  </Row>
                )}
                {utm_medium && (
                  <Row>
                    <Text style={styles.label}>Medium</Text>
                    <Text style={styles.value}>{utm_medium}</Text>
                  </Row>
                )}
                {utm_campaign && (
                  <Row>
                    <Text style={styles.label}>Campaign</Text>
                    <Text style={styles.value}>{utm_campaign}</Text>
                  </Row>
                )}
              </Section>
            </>
          )}

          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            This notification was generated automatically by VeXtiv Studio.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  body: {
    backgroundColor: '#f4f4f5',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  container: {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '32px',
    borderRadius: '8px',
    maxWidth: '600px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 4px',
  },
  subheading: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151',
    margin: '16px 0 8px',
  },
  meta: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0 0 16px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    margin: '8px 0 2px',
  },
  value: {
    fontSize: '15px',
    color: '#111827',
    margin: '0 0 8px',
  },
  hr: {
    borderColor: '#e5e7eb',
    margin: '16px 0',
  },
  footer: {
    fontSize: '12px',
    color: '#9ca3af',
    textAlign: 'center' as const,
  },
} as const;
