import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProseSection {
  readonly id: string;
  readonly heading: string;
  readonly content: readonly string[]; // Each string = one <p>. Two empty strings = divider.
  readonly list?: readonly string[];   // Optional bullet list after the paragraphs.
  readonly subSections?: readonly {
    readonly heading: string;
    readonly content: readonly string[];
    readonly list?: readonly string[];
  }[];
}

interface ProseLayoutProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly effectiveDate: string;
  readonly intro: string;
  readonly sections: readonly ProseSection[];
  readonly contactEmail: string;
}

// ─── Arrow icon (back link) ───────────────────────────────────────────────────

function IconLeft() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="12"
        y1="7"
        x2="2"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <polyline
        points="6,3 2,7 6,11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProseLayout({
  eyebrow,
  title,
  effectiveDate,
  intro,
  sections,
  contactEmail,
}: ProseLayoutProps) {
  return (
    <>
      <div className="pl-root">
        {/* ── Hero bar ────────────────────────────────────────── */}
        <div className="pl-hero">
          <div className="pl-hero-glow" aria-hidden="true" />
          <div className="pl-hero-inner">
            <p className="pl-eyebrow">{eyebrow}</p>
            <h1 className="pl-title">{title}</h1>
            <p className="pl-date">Effective date: {effectiveDate}</p>
          </div>
        </div>

        {/* ── Body ────────────────────────────────────────────── */}
        <div className="pl-body">
          <div className="pl-body-inner">

            {/* Sidebar table of contents */}
            <aside className="pl-toc" aria-label="Table of contents">
              <p className="pl-toc-label">Contents</p>
              <nav>
                <ol className="pl-toc-list" role="list">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="pl-toc-link">
                        <span className="pl-toc-num">0{i + 1}</span>
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="pl-toc-contact">
                <p className="pl-toc-contact-label">Questions?</p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="pl-toc-contact-link"
                >
                  {contactEmail}
                </a>
              </div>
            </aside>

            {/* Prose content */}
            <article className="pl-prose" aria-label={title}>
              {/* Intro */}
              <p className="pl-intro">{intro}</p>

              {/* Sections */}
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="pl-section"
                  aria-labelledby={`${section.id}-heading`}
                >
                  <h2
                    id={`${section.id}-heading`}
                    className="pl-section-heading"
                  >
                    {section.heading}
                  </h2>

                  {section.content.map((para, i) => (
                    <p key={i} className="pl-para">
                      {para}
                    </p>
                  ))}

                  {section.list !== undefined && section.list.length > 0 && (
                    <ul className="pl-list" role="list">
                      {section.list.map((item, i) => (
                        <li key={i} className="pl-list-item">
                          <span className="pl-list-dot" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.subSections !== undefined &&
                    section.subSections.map((sub, si) => (
                      <div key={si} className="pl-subsection">
                        <h3 className="pl-sub-heading">{sub.heading}</h3>
                        {sub.content.map((para, pi) => (
                          <p key={pi} className="pl-para">
                            {para}
                          </p>
                        ))}
                        {sub.list !== undefined && sub.list.length > 0 && (
                          <ul className="pl-list" role="list">
                            {sub.list.map((item, li) => (
                              <li key={li} className="pl-list-item">
                                <span
                                  className="pl-list-dot"
                                  aria-hidden="true"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                </section>
              ))}

              {/* Back link */}
              <div className="pl-back-wrap">
                <Link href="/" className="pl-back-link">
                  <IconLeft />
                  Back to Home
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* ── Scoped styles ─────────────────────────────────────────────────────
          All values via CSS custom properties from globals.css.
          Shared across Privacy Policy and Terms of Service.
          ─────────────────────────────────────────────────────────────────── */}
      <style>{`

        /* ─── Root ──────────────────────────────────────────────── */

        .pl-root {
          background-color: var(--bg-base);
          min-height: 100vh;
        }

        /* ─── Hero ──────────────────────────────────────────────── */

        .pl-hero {
          position: relative;
          background-color: var(--bg-surface-1);
          border-bottom: 1px solid var(--border-subtle);
          padding: clamp(100px, 12vw, 152px) 0 clamp(40px, 5vw, 64px);
          overflow: hidden;
        }

        .pl-hero-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 600px 300px at 20% 80%,
            var(--accent-fill-08) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .pl-hero-inner {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
        }

        .pl-eyebrow {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow-wide);
          text-transform: uppercase;
          color: var(--text-accent);
          margin-bottom: 14px;
        }

        .pl-title {
          font-family: var(--font-display);
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          line-height: 1.15;
          color: var(--text-primary);
          margin-bottom: 14px;
        }

        .pl-date {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 400;
          color: var(--text-very-muted);
        }

        /* ─── Body layout ───────────────────────────────────────── */

        .pl-body {
          padding: clamp(48px, 6vw, 80px) 0 clamp(80px, 10vw, 120px);
        }

        .pl-body-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 64px;
          align-items: start;
        }

        /* ─── Table of contents ─────────────────────────────────── */

        .pl-toc {
          position: sticky;
          top: 96px;
        }

        .pl-toc-label {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow);
          text-transform: uppercase;
          color: var(--text-very-muted);
          margin-bottom: 12px;
        }

        .pl-toc-list {
          list-style: none;
          padding: 0;
          margin: 0 0 32px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          counter-reset: toc-counter;
        }

        .pl-toc-link {
          display: flex;
          align-items: baseline;
          gap: 8px;
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 400;
          color: var(--text-muted);
          text-decoration: none;
          padding: 7px 0;
          border-left: 2px solid var(--border-subtle);
          padding-left: 12px;
          transition: color 0.18s ease, border-color 0.18s ease;
          line-height: 1.4;
        }

        .pl-toc-link:hover {
          color: var(--text-primary);
          border-left-color: var(--accent-border-hover);
        }

        .pl-toc-link:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
          border-radius: 2px;
        }

        .pl-toc-num {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          color: var(--text-ultra-muted);
          letter-spacing: 0.06em;
          flex-shrink: 0;
        }

        .pl-toc-contact {
          padding: 14px;
          background-color: var(--bg-surface-1);
          border: 1px solid var(--border-default);
          border-radius: 10px;
        }

        .pl-toc-contact-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 400;
          color: var(--text-muted);
          margin-bottom: 6px;
        }

        .pl-toc-contact-link {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 500;
          color: var(--text-accent);
          text-decoration: none;
          word-break: break-all;
          transition: opacity 0.18s ease;
        }

        .pl-toc-contact-link:hover {
          opacity: 0.75;
        }

        .pl-toc-contact-link:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
          border-radius: 2px;
        }

        /* ─── Prose ─────────────────────────────────────────────── */

        .pl-prose {
          min-width: 0;
        }

        /* Intro paragraph */
        .pl-intro {
          font-family: var(--font-body);
          font-size: var(--text-md);
          font-weight: 400;
          line-height: 1.8;
          color: var(--text-primary);
          margin-bottom: 56px;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--border-subtle);
        }

        /* Section */
        .pl-section {
          padding-top: 48px;
          margin-bottom: 48px;
          scroll-margin-top: 100px;
        }

        .pl-section + .pl-section {
          border-top: 1px solid var(--border-subtle);
        }

        /* Section headings — Syne 700 */
        .pl-section-heading {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.25;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        /* Sub-section headings */
        .pl-subsection {
          margin-top: 28px;
        }

        .pl-sub-heading {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.3;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        /* Body paragraphs — DM Sans 300 */
        .pl-para {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 300;
          line-height: 1.85;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .pl-para:last-of-type {
          margin-bottom: 0;
        }

        /* Bullet list */
        .pl-list {
          list-style: none;
          padding: 0;
          margin: 16px 0 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .pl-list-item {
          display: flex;
          align-items: baseline;
          gap: 12px;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 300;
          line-height: 1.75;
          color: var(--text-secondary);
        }

        .pl-list-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--accent);
          flex-shrink: 0;
          margin-top: 9px;
        }

        /* Back link */
        .pl-back-wrap {
          margin-top: 64px;
          padding-top: 32px;
          border-top: 1px solid var(--border-subtle);
        }

        .pl-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 400;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.18s ease;
        }

        .pl-back-link:hover {
          color: var(--text-secondary);
        }

        .pl-back-link:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 3px;
          border-radius: 2px;
        }

        /* ─── Responsive ────────────────────────────────────────── */

        @media (max-width: 900px) {
          .pl-body-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .pl-toc {
            position: static;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            align-items: center;
          }

          .pl-toc-label {
            width: 100%;
            margin-bottom: 0;
          }

          .pl-toc-list {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 6px;
            margin-bottom: 0;
          }

          .pl-toc-link {
            border-left: none;
            padding-left: 0;
            background-color: var(--bg-surface-1);
            border: 1px solid var(--border-default);
            border-radius: 9999px;
            padding: 5px 14px;
            font-size: var(--text-xs);
          }

          .pl-toc-link:hover {
            border-color: var(--accent-border-hover);
          }

          .pl-toc-num {
            display: none;
          }

          .pl-toc-contact {
            width: 100%;
          }
        }

        @media (max-width: 600px) {
          .pl-section-heading {
            font-size: var(--text-xl);
          }
        }

      `}</style>
    </>
  );
}
