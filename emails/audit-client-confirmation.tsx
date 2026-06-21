// React Email template — Audit client confirmation
// Sent to the person who submitted a free-audit request.
// Rendered server-side by Resend; import via @/emails/audit-client-confirmation.

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

export interface AuditClientConfirmationProps {
  businessName: string;
}

// ─── Template ─────────────────────────────────────────────────────────────────

export default function AuditClientConfirmation({
  businessName,
}: AuditClientConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Your free audit request is confirmed — Vextiv Studio
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>You&apos;re on the list! 🎉</Heading>

          <Text style={styles.paragraph}>
            Hi {businessName}, thanks for requesting your free digital audit
            from <strong>Vextiv Studio</strong>.
          </Text>

          <Text style={styles.paragraph}>
            Our team will review your details and reach out within{' '}
            <strong>1–2 business days</strong> with a personalised audit report
            and actionable recommendations.
          </Text>

          <Hr style={styles.hr} />

          <Text style={styles.paragraph}>
            In the meantime, feel free to reply to this email if you have any
            questions — we&apos;re happy to help.
          </Text>

          <Text style={styles.signature}>
            Warm regards,
            <br />
            The Vextiv Studio Team
          </Text>

          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            © {new Date().getFullYear()} Vextiv Studio · You received this
            because you requested a free digital audit.
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
