// React Email template — Newsletter confirmation
// Sent to the person who subscribes to the blog.
// Rendered server-side by Resend; import via @/emails/newsletter-confirmation.

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

// ─── Template ─────────────────────────────────────────────────────────────────

export default function NewsletterConfirmation() {
  return (
    <Html>
      <Head />
      <Preview>You're subscribed to the VeXtiv blog!</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Welcome to the club 🚀</Heading>

          <Text style={styles.paragraph}>
            Thanks for subscribing to the VeXtiv blog. We'll keep you posted on new articles, strategies, and deep dives for Hyderabad businesses.
          </Text>

          <Text style={styles.paragraph}>
            If you ever want to chat about a project or have questions, just hit reply to this email. We read every message.
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
            because you subscribed to our newsletter via our website.
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
