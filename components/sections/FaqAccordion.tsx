"use client";

import { useState, useId } from "react";
import { FAQ_CATEGORIES, type FaqCategory, type FaqItem } from "@/lib/faq";

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
          const panelId = `faq-panel-${instanceId}-${item.id}`;
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
          background: var(--gradient-btn);
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
