"use client";

import { useState, useId } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

interface FaqCategory {
  readonly id: string;
  readonly label: string;
  readonly items: readonly FaqItem[];
}

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const FAQ_CATEGORIES: readonly FaqCategory[] = [
  {
    id: "general",
    label: "General",
    items: [
      {
        id: "what-does-vextiv-do",
        question: "What does Vextiv Studio do?",
        answer:
          "Vextiv Studio is a digital agency based in Hyderabad. We design and build websites, develop brand identities, manage social media, create content, run local SEO, and deploy QR-based ordering systems. In short, we handle everything a local business needs to compete and grow online — under one roof.",
      },
      {
        id: "where-are-you-based",
        question: "Where are you based?",
        answer:
          "We're based in Hyderabad, Telangana. We work primarily with businesses across the city and surrounding areas, though we also take on remote projects for clients elsewhere in India who want the same level of focused attention we give our local clients.",
      },
      {
        id: "what-businesses-do-you-work-with",
        question: "What types of businesses do you work with?",
        answer:
          "We work with restaurants, cafés, retail boutiques, service providers, startups, and growing local brands. If you're a business that needs a stronger digital presence — whether you're launching fresh or refreshing something stale — we're likely a good fit. We don't work well with businesses that want cheap and fast over considered and effective.",
      },
      {
        id: "work-outside-hyderabad",
        question: "Do you take on clients outside Hyderabad?",
        answer:
          "Yes. While Hyderabad is our home base and where most of our clients are, we work with businesses across India. We're entirely comfortable running projects remotely — our process is built for clear async communication, so geography is rarely a constraint.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    items: [
      {
        id: "how-much-does-a-website-cost",
        question: "How much does a website cost?",
        answer:
          "Website pricing depends on scope, complexity, and what you actually need. A focused landing page sits at a different price point than a full multi-page business site with integrations. Our pricing page gives you a clear breakdown by project type — we don't hide numbers behind a contact form. If you need something custom, tell us about your business and we'll give you a straight estimate.",
      },
      {
        id: "payment-plans",
        question: "Do you offer payment plans or split billing?",
        answer:
          "Yes. For most projects we work on a two-part structure: a deposit before work begins and the balance on delivery. For larger or longer-running engagements we can discuss milestone-based billing. We're not in the business of making payment awkward — just tell us what works and we'll find something reasonable.",
      },
      {
        id: "minimum-project-size",
        question: "Is there a minimum project size?",
        answer:
          "We don't publish a hard minimum, but in practice we work best on projects where there's enough scope to do the work properly. Very small one-off requests (like a single social post or a single logo revision) are not a good fit for how we work. If you're unsure, just get in touch — we'll tell you honestly whether we're the right match.",
      },
      {
        id: "whats-included",
        question: "What's included in the price — any hidden costs?",
        answer:
          "No hidden costs. What we quote is what you pay for our work. External costs — such as domain registration, hosting, third-party software licences, or stock image libraries — are separate and will always be itemised clearly before you commit. We'll tell you exactly what you'll need to pay elsewhere.",
      },
    ],
  },
  {
    id: "process",
    label: "Process",
    items: [
      {
        id: "how-long-does-a-project-take",
        question: "How long does a project typically take?",
        answer:
          "A focused landing page can be live in one to two weeks. A full website with branding typically takes three to five weeks depending on how quickly we can get content and feedback from your side. We give you a realistic timeline upfront and we stick to it — delays almost always come from waiting on content or approvals, so the faster you can move, the faster we can.",
      },
      {
        id: "how-do-we-get-started",
        question: "How do we get started?",
        answer:
          "Book a free consultation through our contact page. We'll ask you some questions about your business, your goals, and what you're trying to solve. From there we'll outline an approach, give you a clear scope and price, and — if it's a fit — we'll send over an agreement and get moving. No lengthy proposal documents, no weeks of back and forth.",
      },
      {
        id: "will-i-be-involved",
        question: "How involved will I need to be during the project?",
        answer:
          "We need your input at the key moments — kickoff, direction review, and final approval — but we try to keep your day-to-day involvement low. You have a business to run. We'll come to you with clear questions and decisions, not open-ended conversations. Expect a few focused touchpoints, not constant availability.",
      },
      {
        id: "what-do-you-need-from-me",
        question: "What do you need from me to get started?",
        answer:
          "At minimum: a clear brief on your business and goals, your existing brand assets (logos, colours, fonts) if you have them, and access to any accounts we'll be working on (website host, social platforms, etc.). If you don't have brand assets yet, that's fine — we can build those for you as part of the engagement.",
      },
    ],
  },
  {
    id: "support",
    label: "Support",
    items: [
      {
        id: "what-happens-after-launch",
        question: "What happens after the project goes live?",
        answer:
          "We don't disappear at launch. For the first 30 days after a website or campaign goes live, we're available to fix any bugs, address issues, and make minor adjustments at no additional cost. After that, ongoing support is available as a retained service or handled on a time-and-materials basis.",
      },
      {
        id: "ongoing-support",
        question: "Do you offer ongoing retainer or support packages?",
        answer:
          "Yes. For clients who want ongoing content, social management, SEO maintenance, or website updates, we offer monthly retainer arrangements. These are scoped and priced individually based on what you actually need — not a one-size bundle. Ask us about this during your consultation.",
      },
      {
        id: "changes-after-launch",
        question: "What if I want changes after the project is delivered?",
        answer:
          "Minor copy edits and small tweaks within the first 30 days are covered under our standard handoff. Anything beyond that — new pages, redesigned sections, new features — is scoped as a separate piece of work. We'll always give you a clear estimate before touching anything, so there are no surprise invoices.",
      },
      {
        id: "how-to-contact-support",
        question: "How do I contact you if something's wrong?",
        answer:
          "Email us at hello@vextiv.tech with a description of the issue and we'll respond within one business day. For active retainer clients, response times are typically faster. We don't have a support ticket system — we prefer a direct email thread where the context stays in one place.",
      },
    ],
  },
];

// ─── Single accordion item ────────────────────────────────────────────────────

function AccordionItem({
  item,
  isOpen,
  onToggle,
  panelId,
  buttonId,
}: {
  readonly item: FaqItem;
  readonly isOpen: boolean;
  readonly onToggle: () => void;
  readonly panelId: string;
  readonly buttonId: string;
}) {
  return (
    <div className={`faq-item${isOpen ? " faq-item--open" : ""}`}>
      {/* Toggle button */}
      <h3 className="faq-question-wrap">
        <button
          id={buttonId}
          type="button"
          className="faq-question-btn"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="faq-question-text">{item.question}</span>
          {/* Chevron icon — rotates via CSS */}
          <span className="faq-chevron" aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <polyline
                points="3,6 8,11 13,6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </h3>

      {/* Answer panel — grid-template-rows trick for smooth CSS height animation */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="faq-answer-outer"
        data-open={isOpen ? "true" : "false"}
      >
        <div className="faq-answer-inner">
          <p className="faq-answer-text">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Category block ───────────────────────────────────────────────────────────

function CategoryBlock({
  category,
  openId,
  onToggle,
  instanceId,
}: {
  readonly category: FaqCategory;
  readonly openId: string | null;
  readonly onToggle: (id: string) => void;
  readonly instanceId: string;
}) {
  return (
    <div className="faq-category">
      <h2 className="faq-category-label" id={`faq-cat-${instanceId}-${category.id}`}>
        {category.label}
      </h2>
      <ul
        className="faq-list"
        role="list"
        aria-labelledby={`faq-cat-${instanceId}-${category.id}`}
      >
        {category.items.map((item) => {
          const buttonId = `faq-btn-${instanceId}-${item.id}`;
          const panelId  = `faq-panel-${instanceId}-${item.id}`;
          return (
            <li key={item.id}>
              <AccordionItem
                item={item}
                isOpen={openId === item.id}
                onToggle={() => onToggle(item.id)}
                panelId={panelId}
                buttonId={buttonId}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ─── Tab bar ──────────────────────────────────────────────────────────────────

function CategoryTabs({
  categories,
  activeId,
  onSelect,
}: {
  readonly categories: readonly FaqCategory[];
  readonly activeId: string;
  readonly onSelect: (id: string) => void;
}) {
  return (
    <div className="faq-tabs" role="tablist" aria-label="FAQ categories">
      {categories.map((cat) => (
        <button
          key={cat.id}
          role="tab"
          type="button"
          id={`faq-tab-${cat.id}`}
          aria-selected={activeId === cat.id}
          aria-controls={`faq-tabpanel-${cat.id}`}
          className={`faq-tab${activeId === cat.id ? " faq-tab--active" : ""}`}
          onClick={() => onSelect(cat.id)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

// ─── Root accordion export ────────────────────────────────────────────────────

export default function FaqAccordion() {
  const instanceId = useId().replace(/:/g, "");
  const [activeCategory, setActiveCategory] = useState<string>(
    FAQ_CATEGORIES[0].id,
  );
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  function handleTabSelect(categoryId: string) {
    setActiveCategory(categoryId);
    setOpenItemId(null); // close any open item when switching tabs
  }

  function handleItemToggle(itemId: string) {
    setOpenItemId((prev) => (prev === itemId ? null : itemId));
  }

  const currentCategory = FAQ_CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <>
      {/* Category tab bar */}
      <CategoryTabs
        categories={FAQ_CATEGORIES}
        activeId={activeCategory}
        onSelect={handleTabSelect}
      />

      {/* Active category panel */}
      <div
        id={`faq-tabpanel-${activeCategory}`}
        role="tabpanel"
        aria-labelledby={`faq-tab-${activeCategory}`}
        className="faq-panel"
      >
        <CategoryBlock
          category={currentCategory}
          openId={openItemId}
          onToggle={handleItemToggle}
          instanceId={instanceId}
        />
      </div>

      {/* ── Scoped styles ── */}
      <style>{`

        /* ─── Tab bar ──────────────────────────────────────────── */

        .faq-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 40px;
        }

        .faq-tab {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-secondary);
          background: var(--bg-surface-2);
          border: 1px solid var(--border-default);
          border-radius: 9999px;
          padding: 9px 22px;
          cursor: pointer;
          transition:
            color 0.18s ease,
            background-color 0.18s ease,
            border-color 0.18s ease;
          white-space: nowrap;
        }

        .faq-tab:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
        }

        .faq-tab--active {
          color: var(--bg-base);
          background-color: var(--accent);
          border-color: var(--accent);
        }

        .faq-tab--active:hover {
          color: var(--bg-base);
          filter: brightness(1.06);
        }

        .faq-tab:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 3px;
        }

        /* ─── Panel ─────────────────────────────────────────────── */

        .faq-panel {
          animation: faq-fade 0.2s ease;
        }

        @keyframes faq-fade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── Category label ────────────────────────────────────── */

        .faq-category-label {
          font-family: var(--font-body);
          font-size: var(--text-2xs);
          font-weight: 700;
          letter-spacing: var(--tracking-eyebrow-wide);
          text-transform: uppercase;
          color: var(--text-accent);
          margin-bottom: 16px;
        }

        /* ─── FAQ list ──────────────────────────────────────────── */

        .faq-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        /* ─── Accordion item ────────────────────────────────────── */

        .faq-item {
          background-color: var(--bg-surface-1);
          border: 1px solid var(--border-default);
          border-radius: 14px;
          overflow: hidden;
          transition:
            border-color 0.2s ease,
            background-color 0.2s ease;
        }

        .faq-item:hover {
          border-color: var(--border-hover);
        }

        .faq-item--open {
          border-color: var(--accent-border-card);
          background-color: var(--accent-fill-08);
        }

        /* ─── Question button ───────────────────────────────────── */

        .faq-question-wrap {
          margin: 0;
        }

        .faq-question-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          width: 100%;
          padding: 20px 24px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          -webkit-tap-highlight-color: transparent;
        }

        .faq-question-btn:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: -2px;
          border-radius: 14px;
        }

        .faq-question-text {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          line-height: var(--leading-tight);
          color: var(--text-primary);
          flex: 1;
        }

        .faq-chevron {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--text-muted);
          transition: transform 0.28s ease, color 0.2s ease;
        }

        .faq-item--open .faq-chevron {
          transform: rotate(180deg);
          color: var(--text-accent);
        }

        /* ─── Answer panel — grid trick for smooth height ───────── */

        .faq-answer-outer {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s ease;
        }

        .faq-answer-outer[data-open="true"] {
          grid-template-rows: 1fr;
        }

        .faq-answer-inner {
          overflow: hidden;
        }

        .faq-answer-text {
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 300;
          line-height: 1.8;
          color: var(--text-secondary);
          padding: 0 24px 22px;
        }

        /* ─── Responsive ─────────────────────────────────────────── */

        @media (max-width: 640px) {
          .faq-question-btn {
            padding: 18px 18px;
          }
          .faq-answer-text {
            padding: 0 18px 18px;
          }
          .faq-question-text {
            font-size: 14px;
          }
        }

      `}</style>
    </>
  );
}
