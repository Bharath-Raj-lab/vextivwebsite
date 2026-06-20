import type { Metadata } from "next";
import ProseLayout, {
  type ProseSection,
} from "@/components/layout/ProseLayout";

// ─── SSG ──────────────────────────────────────────────────────────────────────
export const dynamic = "force-static";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://vextiv.com"),
  title: "Terms of Service | Vextiv Studio",
  description:
    "Terms and conditions governing all engagements with Vextiv Studio. Read before hiring us — clear, plain English, no legal jargon where possible.",
  openGraph: {
    title: "Terms of Service | Vextiv Studio",
    description:
      "Terms and conditions governing all engagements with Vextiv Studio. Read before hiring us — clear, plain English, no legal jargon where possible.",
    url: "https://vextiv.com/terms",
    siteName: "Vextiv Studio",
    type: "website",
  },
  alternates: {
    canonical: "https://vextiv.com/terms",
  },
};

// ─── Content ──────────────────────────────────────────────────────────────────

const EFFECTIVE_DATE = "20 June 2025" as const;
const CONTACT_EMAIL  = "hello@vextiv.com" as const;

const INTRO =
  "These Terms of Service ('Terms') govern the relationship between Vextiv Studio ('we', 'us', 'our') — a digital agency operating in Hyderabad, Telangana, India — and any individual or business ('Client', 'you') who engages us for services. By engaging Vextiv Studio for a project or service, you agree to be bound by these Terms. If you have questions before committing, please reach out at hello@vextiv.com.";

const SECTIONS: readonly ProseSection[] = [
  {
    id: "services",
    heading: "Services Offered",
    content: [
      "Vextiv Studio provides digital services to businesses including, but not limited to: website design and development, brand identity and visual design, social media management, content creation, local SEO and Google Business Profile optimisation, and QR-based ordering systems for restaurants and cafés.",
      "The specific deliverables, timeline, and scope for each engagement are agreed upon in writing before work commences — either via a Proposal document, Statement of Work, or a written email exchange that both parties confirm. Anything outside the agreed scope constitutes additional work and will be separately quoted.",
    ],
  },
  {
    id: "payment-terms",
    heading: "Payment Terms",
    content: [
      "All fees are quoted and invoiced in Indian Rupees (INR) unless otherwise agreed in writing.",
    ],
    subSections: [
      {
        heading: "One-time project work",
        content: [
          "For project-based engagements (website builds, branding, etc.), payment is structured as follows: 50% of the total project fee is due upfront before any work begins. The remaining 50% is due upon delivery of the final deliverables, prior to transfer of files or site launch. Work will not begin until the deposit invoice is settled.",
        ],
      },
      {
        heading: "Monthly retainer services",
        content: [
          "For ongoing services billed on a retainer basis (social media management, content creation, SEO maintenance, etc.), fees are billed in advance at the start of each monthly billing cycle. The first month's fee is payable before work begins. Retainer services continue on a rolling monthly basis unless cancelled in accordance with the Cancellation Policy below.",
        ],
      },
      {
        heading: "Late payment",
        content: [
          "Invoices not settled within 14 days of the due date may attract a late payment charge of 2% per month on the outstanding amount. We reserve the right to pause all active work until overdue invoices are cleared.",
        ],
      },
      {
        heading: "Payment methods",
        content: [
          "We accept bank transfer (NEFT/IMPS/RTGS), UPI, and Razorpay where available. Payment details are included on each invoice. Third-party payment processing fees, if any, are the responsibility of the Client.",
        ],
      },
    ],
  },
  {
    id: "intellectual-property",
    heading: "Intellectual Property",
    content: [
      "All original creative work produced by Vextiv Studio — including but not limited to design files, source code, written copy, and visual assets — remains the property of Vextiv Studio until full payment of all outstanding invoices has been received.",
    ],
    subSections: [
      {
        heading: "On full payment",
        content: [
          "Upon receipt of full and final payment, Vextiv Studio assigns to the Client all rights, title, and interest in the final deliverables specific to their project. This includes, where applicable, source files, design files, and website code. Any third-party components (stock imagery, licensed fonts, open-source libraries) remain subject to their respective licences, which we will identify during project handoff.",
        ],
      },
      {
        heading: "Portfolio rights",
        content: [
          "Vextiv Studio retains the perpetual, irrevocable right to display project work in its portfolio, on its website, and on social media for promotional purposes, unless the Client requests confidentiality in writing prior to project commencement.",
        ],
      },
      {
        heading: "Pre-existing materials",
        content: [
          "Any materials, assets, or content provided by the Client to Vextiv Studio for use in a project remain the Client's property. By providing these materials, the Client warrants that they have the right to use them and grants Vextiv Studio a licence to incorporate them into the deliverables.",
        ],
      },
    ],
  },
  {
    id: "revision-rounds",
    heading: "Revision Rounds",
    content: [
      "Every project includes a defined number of revision rounds as specified in the Proposal or Statement of Work. A revision round means one consolidated set of feedback submitted in writing. Multiple separate feedback emails on the same design iteration count as one revision round only if submitted together.",
    ],
    list: [
      "Standard website projects: up to 2 revision rounds per page or section.",
      "Branding projects: up to 2 revision rounds at the concept stage and 1 round at the refinement stage.",
      "Social media content: up to 1 revision round per content batch.",
    ],
    subSections: [
      {
        heading: "Revisions beyond the included rounds",
        content: [
          "Additional revision rounds beyond those included in the agreed scope will be charged at ₹2,500 per round for design work and ₹1,500 per round for content revisions, unless a different rate is agreed in writing. Major scope changes requested after design has been approved and development has begun will be treated as new scope and separately quoted.",
        ],
      },
    ],
  },
  {
    id: "cancellation-policy",
    heading: "Cancellation Policy",
    content: [],
    subSections: [
      {
        heading: "Cancellation by the Client — project work",
        content: [
          "If you cancel a project after work has commenced, the deposit paid is non-refundable. If cancellation occurs after more than 50% of the agreed deliverables have been completed (as assessed by Vextiv Studio), the full project fee becomes payable. Completed work and any transferable assets created up to the point of cancellation will be provided upon receipt of payment for work done.",
        ],
      },
      {
        heading: "Cancellation by the Client — retainer services",
        content: [
          "Monthly retainer services may be cancelled with 30 days' written notice. Notice must be provided before the next billing cycle begins to avoid being charged for the following month. Fees already paid for the current billing period are non-refundable; no partial refunds are issued for mid-month cancellations.",
        ],
      },
      {
        heading: "Cancellation by Vextiv Studio",
        content: [
          "Vextiv Studio reserves the right to terminate an engagement if the Client fails to make payment within 30 days of the due date, provides materially misleading project information, behaves in a manner that is abusive or threatening toward our team, or requests deliverables that violate applicable law or our ethical standards. In such cases, fees for work completed will remain due and payable.",
        ],
      },
      {
        heading: "Client-caused delays",
        content: [
          "If a project is placed on hold for more than 60 days due to lack of Client response, missing content, or missing approvals, Vextiv Studio reserves the right to de-prioritise the project and charge a project reactivation fee of ₹5,000 to resume work.",
        ],
      },
    ],
  },
  {
    id: "liability",
    heading: "Limitation of Liability",
    content: [
      "To the maximum extent permitted by applicable law, Vextiv Studio's total liability to the Client for any claim arising out of or related to a project or these Terms shall not exceed the total fees paid by the Client to Vextiv Studio for the specific project or service giving rise to the claim.",
      "Vextiv Studio shall not be liable for any indirect, incidental, consequential, or punitive damages, including but not limited to: loss of business revenue or profit, loss of data, business interruption, reputational damage, or third-party claims — even if advised of the possibility of such damages.",
    ],
    subSections: [
      {
        heading: "Third-party platforms",
        content: [
          "Vextiv Studio is not liable for changes made by third-party platforms (including but not limited to Google, Meta, Instagram, or hosting providers) that affect deliverables or results after project delivery. We are not liable for website downtime, security breaches, or data loss resulting from your hosting environment or third-party services outside our direct control.",
        ],
      },
      {
        heading: "Results disclaimer",
        content: [
          "We work to deliver measurable results, but we cannot guarantee specific business outcomes including search rankings, advertising ROI, follower growth, or revenue impact. Digital marketing and design results depend on numerous factors outside our control including market conditions, competitor behaviour, and platform algorithm changes.",
        ],
      },
    ],
  },
  {
    id: "governing-law",
    heading: "Governing Law",
    content: [
      "These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms, or any project engagement with Vextiv Studio, shall be subject to the exclusive jurisdiction of the courts located in Hyderabad, Telangana, India.",
      "We will always try to resolve any dispute directly and amicably before initiating formal proceedings. If you have a concern, contact us at hello@vextiv.com and we will respond promptly.",
    ],
    subSections: [
      {
        heading: "Entire agreement",
        content: [
          "These Terms, together with any Proposal, Statement of Work, or written agreement for a specific project, constitute the entire agreement between you and Vextiv Studio. They supersede any prior understandings, representations, or agreements relating to the subject matter hereof. Any amendment to these Terms must be made in writing and agreed to by both parties.",
        ],
      },
      {
        heading: "Severability",
        content: [
          "If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision will be modified to the minimum extent necessary to make it enforceable, or severed if modification is not possible, without affecting the enforceability of the remaining provisions.",
        ],
      },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TermsPage() {
  return (
    <ProseLayout
      eyebrow="Legal"
      title="Terms of Service"
      effectiveDate={EFFECTIVE_DATE}
      intro={INTRO}
      sections={SECTIONS}
      contactEmail={CONTACT_EMAIL}
    />
  );
}
