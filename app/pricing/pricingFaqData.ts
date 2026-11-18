export interface PricingFaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: PricingFaqItem[] = [
  {
    id: "faq-1",
    question: "Do your prices include hosting and domain?",
    answer:
      "One-time development fees cover design, build, and launch — they do not include hosting or domain registration. For Website Development and QR Ordering Systems, ongoing hosting and maintenance is ₹999/month, billed separately. Social Media Management plans are all-inclusive monthly retainers. Branding packages are entirely one-time with no recurring fees.",
  },
  {
    id: "faq-2",
    question: "Can I upgrade my plan later?",
    answer:
      "Absolutely. You can upgrade from any website or QR system tier at any point — you'll simply pay the difference between your current plan and the higher tier. For Social Media Management, you can move to a higher monthly plan with 30 days' notice. We build every project with future growth in mind so upgrades are always smooth.",
  },
  {
    id: "faq-3",
    question: "How long does a typical project take?",
    answer:
      "Timelines vary by service. Landing pages are typically delivered in 5–7 business days. Starter and Business website tiers take 2–3 weeks. Premium projects are scoped individually. Branding packages range from 1–3 weeks depending on revision rounds. QR Ordering Systems take 2–4 weeks depending on menu complexity. We'll give you a firm timeline before any work begins.",
  },
  {
    id: "faq-4",
    question: "What payment methods do you accept, and is there an EMI option?",
    answer:
      "We accept bank transfers (NEFT/IMPS/UPI), and all major UPI apps. For projects above ₹19,999, we offer a 50/50 split payment schedule — 50% upfront to begin, 50% on delivery. Monthly retainers (Social Media Management and hosting) are billed at the start of each cycle. Reach out if you'd like to discuss a custom payment arrangement for larger projects.",
  },
];