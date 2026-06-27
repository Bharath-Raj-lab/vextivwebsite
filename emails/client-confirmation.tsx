// React Email template — Contact client confirmation
// Sent to the person who submitted a contact inquiry.
// Rendered server-side by Resend; import via @/emails/client-confirmation.

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from 'react-email';
import * as React from 'react';

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ClientConfirmationProps {
  name: string;
}

// ─── Template ─────────────────────────────────────────────────────────────────

export default function ClientConfirmation({ name }: ClientConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>We&apos;ve received your message — VeXtiv</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Thanks for reaching out! 👋</Heading>

          <Text style={styles.paragraph}>
            Hi {name}, we&apos;ve received your message and will get back to you
            within <strong>1–2 business days</strong>.
          </Text>

          <Text style={styles.paragraph}>
            In the meantime, feel free to reply to this email if you have
            anything to add — we&apos;re happy to help.
          </Text>

          <Hr style={styles.hr} />

          <Text style={styles.signature}>
            Warm regards,
            <br />
            The VeXtiv Team
          </Text>

          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            © {new Date().getFullYear()} VeXtiv · You received this
            because you contacted us via our website.
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
    margin: '0 0 16px',
  },
  paragraph: {
    fontSize: '15px',
    color: '#374151',
    lineHeight: '1.6',
    margin: '0 0 12px',
  },
  hr: {
    borderColor: '#e5e7eb',
    margin: '20px 0',
  },
  signature: {
    fontSize: '15px',
    color: '#374151',
    lineHeight: '1.6',
    margin: '0 0 12px',
  },
  footer: {
    fontSize: '12px',
    color: '#9ca3af',
    textAlign: 'center' as const,
  },
} as const;
