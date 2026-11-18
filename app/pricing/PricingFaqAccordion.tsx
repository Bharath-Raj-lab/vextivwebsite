"use client";

import { useState } from "react";
import { FAQ_ITEMS, type PricingFaqItem } from "./pricingFaqData";

// ─── Single accordion item ────────────────────────────────────────────────────
function AccordionItem({ item }: { item: PricingFaqItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`pfaq-item${isOpen ? " pfaq-item--open" : ""}`}>
      <button
        id={`${item.id}-btn`}
        aria-expanded={isOpen}
        aria-controls={`${item.id}-panel`}
        className="pfaq-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="pfaq-question">{item.question}</span>
        <span className="pfaq-icon" aria-hidden="true">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="pfaq-chevron"
          >
            <line
              x1="4"
              y1="9"
              x2="14"
              y2="9"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <line
              x1="9"
              y1="4"
              x2="9"
              y2="14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              className="pfaq-vertical-line"
            />
          </svg>
        </span>
      </button>
      <div
        id={`${item.id}-panel`}
        role="region"
        aria-labelledby={`${item.id}-btn`}
        className="pfaq-panel"
        hidden={!isOpen}
      >
        <p className="pfaq-answer">{item.answer}</p>
      </div>
    </div>
  );
}

// ─── Exported accordion ───────────────────────────────────────────────────────
export default function PricingFaqAccordion() {
  return (
    <div className="pfaq-list" role="list">
      {FAQ_ITEMS.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}
    </div>
  );
}
