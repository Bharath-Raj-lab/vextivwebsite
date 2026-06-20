import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You — Vextiv Studio',
  description: 'Your message has been received. We\'ll be in touch shortly.',
};

export default function ThankYouPage() {
  return (
    <main
      id="main-content"
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px',
        fontFamily: 'var(--font-body)',
        color: 'var(--text-primary)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-fill-12)',
          border: '1px solid var(--accent-border-card)',
          color: 'var(--text-accent)',
          fontSize: '30px',
          fontWeight: 700,
          marginBottom: '28px',
        }}
        aria-hidden="true"
      >
        ✓
      </div>

      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 800,
          letterSpacing: 'var(--tracking-heading)',
          color: 'var(--text-primary)',
          marginBottom: '16px',
          lineHeight: 1.15,
        }}
      >
        Message received!
      </h1>

      <p
        style={{
          fontSize: 'var(--text-base)',
          color: 'var(--text-secondary)',
          lineHeight: 'var(--leading-body)',
          maxWidth: '440px',
          marginBottom: '12px',
        }}
      >
        Thanks for reaching out. We&apos;ll review your details and get back to
        you within <strong style={{ color: 'var(--text-primary)' }}>1–2 business days</strong>.
      </p>

      <p
        style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--text-muted)',
          lineHeight: 'var(--leading-body)',
          maxWidth: '400px',
          marginBottom: '36px',
        }}
      >
        In the meantime, feel free to browse our work or follow us on Instagram
        for updates.
      </p>

      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '12px 28px',
          backgroundColor: 'var(--accent)',
          color: 'var(--bg-base)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          fontWeight: 600,
          borderRadius: '8px',
          textDecoration: 'none',
          transition: 'opacity 200ms',
        }}
      >
        Back to home
      </Link>
    </main>
  );
}
