import { ALL_PROJECTS } from "@/lib/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ALL_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  // In Next.js 15, params is a promise.
  const { slug } = await params;
  const project = ALL_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="case-study-placeholder">
      <div className="case-study__container">
        {/* Navigation */}
        <Link href="/#featured-work" className="case-study__back-link">
          <ArrowLeft size={20} />
          <span>Back To Work</span>
        </Link>

        {/* Header */}
        <div className="case-study__header">
          <p className="case-study__category">{project.type}</p>
          <h1 className="case-study__title">{project.name}</h1>
        </div>

        {/* Content Box */}
        <div className="case-study__content-box">
          <div className="case-study__badge">Case Study Coming Soon</div>
          <p className="case-study__description">
            We are currently preparing this project showcase. Check back soon for an in-depth look at our process, design decisions, and the results we achieved for <strong>{project.name}</strong>.
          </p>
        </div>
      </div>

      <style>{`
        .case-study-placeholder {
          min-height: 100vh;
          background-color: var(--bg-base);
          background-image: radial-gradient(circle at top right, rgba(0, 255, 128, 0.05), transparent 40%),
                            radial-gradient(circle at bottom left, rgba(0, 255, 128, 0.03), transparent 40%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 24px;
        }

        .case-study__container {
          max-width: 800px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 64px;
        }

        .case-study__back-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 250ms ease, transform 250ms ease;
          width: fit-content;
        }

        .case-study__back-link:hover {
          color: #ffffff;
          transform: translateX(-4px);
        }

        .case-study__header {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .case-study__category {
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: var(--tracking-eyebrow);
          text-transform: uppercase;
          color: var(--accent);
          margin: 0;
        }

        .case-study__title {
          font-family: var(--font-display);
          font-size: clamp(48px, 8vw, 80px);
          font-weight: 700;
          line-height: 1.1;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .case-study__content-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 48px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          align-items: flex-start;
          backdrop-filter: blur(12px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .case-study__badge {
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          padding: 8px 16px;
          background: rgba(0, 255, 128, 0.1);
          color: var(--accent);
          border: 1px solid rgba(0, 255, 128, 0.2);
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .case-study__description {
          font-family: var(--font-body);
          font-size: 18px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
          max-width: 600px;
        }

        .case-study__description strong {
          color: #ffffff;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .case-study__container {
            gap: 40px;
          }
          .case-study__content-box {
            padding: 32px;
          }
          .case-study__description {
            font-size: 16px;
          }
        }
      `}</style>
    </main>
  );
}
