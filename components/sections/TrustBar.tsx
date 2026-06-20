// ─── Trust Bar ────────────────────────────────────────────────────────────────
// Server Component — no client-side interactivity needed.

const INDUSTRIES = [
  "Restaurants",
  "Cafés",
  "Startups",
  "Local Businesses",
  "Personal Brands",
  "SMEs",
] as const;

export default function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Industries we serve">
      <div className="trust-bar__inner">
        <p className="trust-bar__eyebrow">BUILT FOR</p>
        <ul className="trust-bar__tags" role="list">
          {INDUSTRIES.map((industry) => (
            <li key={industry} className="trust-bar__tag">
              {industry}
            </li>
          ))}
        </ul>
      </div>

      {/* ─── Styles ──────────────────────────────────────────────────────── */}
      <style>{`
        .trust-bar {
          background: var(--bg-base);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          padding: 32px clamp(24px, 4vw, 64px);
        }

        .trust-bar__inner {
          max-width: 1500px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .trust-bar__eyebrow {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 400;
          letter-spacing: var(--tracking-eyebrow);
          text-transform: uppercase;
          color: var(--accent);
        }

        .trust-bar__tags {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          list-style: none;
        }

        .trust-bar__tag {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 400;
          color: var(--text-muted);
          padding: 6px 16px;
          border: 1px solid var(--border-default);
          border-radius: 100px;
          white-space: nowrap;
          background: var(--bg-surface-1);
        }

        @media (max-width: 767px) {
          .trust-bar {
            padding: 28px 20px;
          }
          .trust-bar__tags {
            gap: 8px;
          }
          .trust-bar__tag {
            font-size: 12px;
            padding: 5px 12px;
          }
        }
      `}</style>
    </section>
  );
}
