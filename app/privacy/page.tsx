import type { Metadata } from "next";
import ProseLayout, {
  type ProseSection,
} from "@/components/layout/ProseLayout";

// ─── SSG ──────────────────────────────────────────────────────────────────────
export const dynamic = "force-static";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://vextiv.tech"),
  title: "Privacy Policy | VeXtiv",
  description:
    "How VeXtiv collects, uses, and protects your personal data. Compliant with India's Digital Personal Data Protection Act 2023.",
  openGraph: {
    title: "Privacy Policy | VeXtiv",
    description:
      "How VeXtiv collects, uses, and protects your personal data. Compliant with India's Digital Personal Data Protection Act 2023.",
    url: "https://vextiv.tech/privacy",
    siteName: "VeXtiv",
    type: "website",
  },
  alternates: {
    canonical: "https://vextiv.tech/privacy",
  },
  twitter: {
    card: "summary_large_image",
  },
};

// ─── Content ──────────────────────────────────────────────────────────────────

const EFFECTIVE_DATE = "20 June 2025" as const;
const CONTACT_EMAIL = "vextiv.tech@gmail.com" as const;

const INTRO =
  "This Privacy Policy explains how VeXtiv ('we', 'us', 'our') collects, uses, stores, and protects personal data when you visit our website (vextiv.tech) or engage us for digital services. We are committed to handling your information responsibly and in compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) of India.";

const SECTIONS: readonly ProseSection[] = [
  {
    id: "data-collected",
    heading: "Data We Collect",
    content: [
      "We collect personal data only to the extent necessary to provide our services and operate this website. The categories of data we may collect are:",
    ],
    subSections: [
      {
        heading: "Data you provide directly",
        content: [],
        list: [
          "Name and email address submitted via the contact form.",
          "Business name, phone number, and project details provided during consultation.",
          "Any files, assets, or documents shared with us during an engagement.",
          "Correspondence content from emails sent to vextiv.tech@gmail.com.",
        ],
      },
      {
        heading: "Data collected automatically",
        content: [],
        list: [
          "Browser type, operating system, and device identifiers.",
          "IP address and approximate geolocation (country/city level).",
          "Pages visited, time on page, referral source, and navigation paths.",
          "Cookie identifiers and session data (see Cookie Policy below).",
        ],
      },
    ],
  },
  {
    id: "how-its-used",
    heading: "How We Use Your Data",
    content: [
      "We use the data we collect for the following purposes, each grounded in a lawful basis under the DPDP Act 2023:",
    ],
    list: [
      "Responding to contact form submissions and consultation requests (legitimate interest / consent).",
      "Delivering contracted digital services including website design, branding, and social media management (contract performance).",
      "Sending project-related communication and progress updates (contract performance).",
      "Analysing aggregate website usage to improve content and user experience (legitimate interest).",
      "Retargeting website visitors through advertising platforms with your consent where required (consent).",
      "Complying with applicable legal obligations, including tax and financial record-keeping (legal obligation).",
      "Preventing fraud and protecting the security of our systems (legitimate interest).",
    ],
  },
  {
    id: "third-parties",
    heading: "Third-Party Services",
    content: [
      "We use carefully selected third-party processors to operate our website and deliver services. Each processor is bound by their own privacy terms and applicable data protection law. We do not sell your personal data to any third party.",
    ],
    subSections: [
      {
        heading: "Supabase",
        content: [
          "We use Supabase (Supabase Inc., USA) as our backend database and authentication service. Contact form submissions and certain client project data are stored in Supabase. Data is stored on servers in the EU region. Supabase processes data in accordance with its Data Processing Agreement and complies with GDPR standards.",
        ],
      },
      {
        heading: "Resend",
        content: [
          "We use Resend (Resend Inc., USA) to send transactional emails, including contact form confirmations and project notifications. Your email address and message content are transmitted to Resend for delivery purposes only and are not used for any other purpose by Resend.",
        ],
      },
      {
        heading: "Google Analytics 4 (GA4)",
        content: [
          "We use Google Analytics 4 (Google LLC, USA) to analyse website traffic. GA4 collects anonymised usage data including page views, session durations, and approximate location. IP addresses are anonymised before storage. You can opt out of GA4 tracking by installing the Google Analytics Opt-out Browser Add-on or by declining cookies when prompted.",
        ],
      },
      {
        heading: "Meta Pixel",
        content: [
          "We use Meta Pixel (Meta Platforms Ireland Ltd.) on our website to measure the effectiveness of our advertising and to serve relevant ads to visitors on Meta's platforms. Meta Pixel sets cookies that track your interactions with our website. This data is shared with Meta under our advertising relationship. You can manage your Meta ad preferences at your.meta.com/adpreferences.",
        ],
      },
      {
        heading: "Vercel",
        content: [
          "Our website is hosted on Vercel (Vercel Inc., USA). Vercel processes server request logs including IP addresses and request metadata as part of normal infrastructure operation. These logs are retained for a limited period for security and debugging purposes. Vercel is GDPR-compliant and operates under a Data Processing Agreement with us.",
        ],
      },
    ],
  },
  {
    id: "data-retention",
    heading: "Data Retention",
    content: [
      "We retain personal data only for as long as necessary for the purpose for which it was collected or as required by applicable law.",
    ],
    list: [
      "Contact form submissions: retained for 24 months from the date of submission, then deleted.",
      "Client project data and correspondence: retained for 5 years following project completion, consistent with Indian tax and contract record-keeping requirements.",
      "Analytics data: aggregated and anonymised; individual session data retained by Google for up to 14 months.",
      "Advertising pixel data: governed by Meta's data retention policies, typically up to 180 days.",
      "Infrastructure logs (Vercel): retained for up to 30 days.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your Rights under the DPDP Act 2023",
    content: [
      "As a Data Principal under India's Digital Personal Data Protection Act, 2023, you have the following rights with respect to your personal data processed by VeXtiv:",
    ],
    list: [
      "Right to Access: You may request a summary of the personal data we hold about you and the purposes for which it is being processed.",
      "Right to Correction and Erasure: You may request that we correct inaccurate or incomplete personal data, or erase data that is no longer required for the purpose for which it was collected.",
      "Right to Grievance Redressal: You have the right to have your grievance addressed by us in a timely manner. If you are unsatisfied, you may approach the Data Protection Board of India once it is constituted.",
      "Right to Nominate: You may nominate another individual to exercise your rights in the event of your death or incapacity.",
      "Right to Withdraw Consent: Where processing is based on consent, you may withdraw your consent at any time. Withdrawal does not affect the lawfulness of processing prior to withdrawal.",
    ],
    subSections: [
      {
        heading: "How to exercise your rights",
        content: [
          "To exercise any of the above rights, please contact us by email at vextiv.tech@gmail.com with the subject line 'DPDP Data Request'. We will acknowledge your request within 72 hours and respond substantively within 30 days. We may need to verify your identity before processing any request.",
        ],
      },
    ],
  },
  {
    id: "cookie-policy",
    heading: "Cookie Policy",
    content: [
      "Cookies are small text files stored on your device when you visit a website. We use the following categories of cookies:",
    ],
    subSections: [
      {
        heading: "Strictly necessary cookies",
        content: [
          "These cookies are essential for the website to function and cannot be disabled. They include session management cookies required for form submissions and security tokens.",
        ],
      },
      {
        heading: "Analytics cookies",
        content: [
          "Google Analytics 4 sets cookies (_ga, _gid, _ga_*) to distinguish users and sessions. These cookies are active only if you accept analytics cookies. They expire within 2 years.",
        ],
      },
      {
        heading: "Advertising and tracking cookies",
        content: [
          "Meta Pixel sets cookies (_fbp, _fbc) to track conversions from our advertising and build custom audiences. These are active only if you accept marketing cookies.",
        ],
      },
      {
        heading: "Managing cookies",
        content: [
          "You can control and delete cookies through your browser settings. Disabling certain cookies may affect the functionality of the website. You may also use the Google Analytics opt-out add-on or adjust your Meta ad preferences to limit tracking.",
        ],
      },
    ],
  },
  {
    id: "contact",
    heading: "Contact for Data Requests",
    content: [
      "VeXtiv acts as the Data Fiduciary for personal data processed through this website and our service engagements.",
      "For all privacy-related queries, data access requests, correction requests, erasure requests, or complaints, please contact us at:",
    ],
    list: [
      "Email: vextiv.tech@gmail.com (Subject: DPDP Data Request)",
      "Studio: VeXtiv, Hyderabad, Telangana, India",
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PrivacyPage() {
  return (
    <ProseLayout
      eyebrow="Legal"
      title="Privacy Policy"
      effectiveDate={EFFECTIVE_DATE}
      intro={INTRO}
      sections={SECTIONS}
      contactEmail={CONTACT_EMAIL}
    />
  );
}
