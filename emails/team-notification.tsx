// React Email template — Contact team notification
// Sent to the internal team when a new contact inquiry is received.
// Rendered server-side by Resend; import via @/emails/team-notification.

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

export interface TeamNotificationProps {
  name: string;
  email: string;
  phone: string;
  company: string | null;
  service: string | null;
  budget: string | null;
  brief: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  submittedAt: string;
}

// ─── Template ─────────────────────────────────────────────────────────────────

export default function TeamNotification({
  name,
  email,
  phone,
  company,
  service,
  budget,
  brief,
  utm_source,
  utm_medium,
  utm_campaign,
  submittedAt,
}: TeamNotificationProps) {
  const hasUtm = utm_source || utm_medium || utm_campaign;

  return (
    <Html>
      <Head />
      <Preview>New Contact Inquiry — {name}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>📬 New Contact Inquiry</Heading>
          <Text style={styles.meta}>Received: {submittedAt}</Text>

          <Hr style={styles.hr} />

          {/* ── Contact details ── */}
          <Section>
            <Heading as="h2" style={styles.subheading}>
              Contact Details
            </Heading>
            <Row>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{name}</Text>
            </Row>
            <Row>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{email}</Text>
            </Row>
            <Row>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{phone}</Text>
            </Row>
            {company && (
              <Row>
                <Text style={styles.label}>Company</Text>
                <Text style={styles.value}>{company}</Text>
              </Row>
            )}
          </Section>

          <Hr style={styles.hr} />

          {/* ── Inquiry details ── */}
          <Section>
            <Heading as="h2" style={styles.subheading}>
              Inquiry Details
            </Heading>
            {service && (
              <Row>
                <Text style={styles.label}>Service</Text>
                <Text style={styles.value}>{service}</Text>
              </Row>
            )}
            {budget && (
              <Row>
                <Text style={styles.label}>Budget</Text>
                <Text style={styles.value}>{budget}</Text>
              </Row>
            )}
            {brief && (
              <Row>
                <Text style={styles.label}>Brief</Text>
                <Text style={styles.value}>{brief}</Text>
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
