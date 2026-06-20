"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { ArrowUpRight } from "lucide-react";
import { CaseStudy, TOP_ROW_PROJECTS, BOTTOM_ROW_PROJECTS } from "@/lib/projects";

export default function FeaturedWork() {
  const renderCard = (study: CaseStudy, index: number) => (
    <Link
      key={study.slug + "-" + index}
      href={`/work/${study.slug}`}
      className="featured-work__card"
      onClick={() => trackEvent("case_study_open", { slug: study.slug })}
    >
      <div className="featured-work__image-wrapper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={study.imageUrl} alt={study.name} className="featured-work__img" loading="lazy" />
        <div className="featured-work__overlay"></div>
      </div>
      
      <div className="featured-work__content">
        <div className="featured-work__info">
          <h3 className="featured-work__name">{study.name}</h3>
          <p className="featured-work__meta">
            {study.type} <span className="featured-work__dot">•</span> {study.services}
          </p>
        </div>
        <div className="featured-work__arrow">
          <ArrowUpRight size={20} strokeWidth={2} aria-hidden="true" />
        </div>
      </div>
    </Link>
  );

  return (
    <section id="featured-work" className="featured-work" aria-labelledby="featured-work-heading">
      <div className="featured-work__header">
        <p className="featured-work__eyebrow">OUR WORK</p>
        <h2 id="featured-work-heading" className="featured-work__heading">
          Projects We&rsquo;re Proud Of
        </h2>
      </div>

      <div className="featured-work__showcase">
        {/* Top Row - Scrolls Left */}
        <div className="marquee-wrapper">
          <div className="marquee-track marquee-track--left">
            {TOP_ROW_PROJECTS.map((study, i) => renderCard(study, i))}
            {TOP_ROW_PROJECTS.map((study, i) => renderCard(study, i + TOP_ROW_PROJECTS.length))}
          </div>
        </div>

        {/* Bottom Row - Scrolls Right */}
        <div className="marquee-wrapper">
          <div className="marquee-track marquee-track--right">
            {BOTTOM_ROW_PROJECTS.map((study, i) => renderCard(study, i))}
            {BOTTOM_ROW_PROJECTS.map((study, i) => renderCard(study, i + BOTTOM_ROW_PROJECTS.length))}
          </div>
        </div>
      </div>

      <style>{`
        .featured-work {
          background: var(--bg-base);
          padding: 120px 0;
          border-top: 1px solid var(--border-subtle);
          overflow: hidden; /* Hide horizontal overflow from marquees */
        }

        .featured-work__header {
          max-width: 1500px;
          margin: 0 auto 64px;
          padding: 0 clamp(24px, 4vw, 64px);
          text-align: center;
        }

        .featured-work__eyebrow {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: var(--tracking-eyebrow);
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 16px;
        }

        .featured-work__heading {
          font-family: var(--font-display);
          font-size: var(--text-section);
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          color: var(--text-primary);
          line-height: 1.1;
        }

        /* Marquee Showcase Layout */
        .featured-work__showcase {
          display: flex;
          flex-direction: column;
          gap: 32px;
          /* Add padding to allow cards to scale up on hover without clipping */
          padding: 20px 0;
        }

        .marquee-wrapper {
          width: 100vw;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
        }

        .marquee-track {
          display: flex;
          gap: 24px;
          padding-right: 24px; /* Crucial for seamless loop: matches the gap */
          width: max-content;
          will-change: transform;
        }

        .marquee-track--left {
          animation: marquee-left 15s linear infinite;
        }

        .marquee-track--right {
          /* To start the right scroll seamlessly, we start from -50% and go to 0 */
          animation: marquee-right 15s linear infinite;
        }

        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        /* Card Design */
        .featured-work__card {
          position: relative;
          width: 360px;
          height: 260px;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          text-decoration: none;
          background: var(--bg-surface-1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 400ms ease, filter 400ms ease;
          flex-shrink: 0;
          /* Premium depth */
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Hover Interaction */
        .featured-work__card:hover {
          transform: scale(1.04) translateY(-8px);
          z-index: 10;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3), 0 0 40px var(--accent-fill-12);
        }

        .featured-work__card:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
        }

        /* Image Wrapper & Overlay */
        .featured-work__image-wrapper {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
        }

        .featured-work__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1), filter 400ms ease;
          filter: brightness(0.85) contrast(1.1);
        }

        .featured-work__card:hover .featured-work__img {
          transform: scale(1.08);
          filter: brightness(1) contrast(1.1);
        }

        .featured-work__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 100%);
          pointer-events: none;
          transition: opacity 400ms ease;
          opacity: 0.9;
        }

        .featured-work__card:hover .featured-work__overlay {
          opacity: 1;
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%);
        }

        /* Card Content */
        .featured-work__content {
          position: relative;
          z-index: 2;
          padding: 24px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          width: 100%;
        }

        .featured-work__info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .featured-work__name {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .featured-work__meta {
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .featured-work__dot {
          font-size: 10px;
          opacity: 0.5;
        }

        .featured-work__arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: background 300ms ease, transform 300ms ease;
        }

        .featured-work__card:hover .featured-work__arrow {
          background: #ffffff;
          color: #000000;
          transform: rotate(45deg);
        }

        /* Responsive Adjustments */
        @media (max-width: 1024px) {
          .featured-work__card {
            width: 320px;
            height: 240px;
          }
          .marquee-track {
            gap: 20px;
            padding-right: 20px;
          }
        }

        @media (max-width: 768px) {
          .featured-work {
            padding: 80px 0;
          }
          .featured-work__card {
            width: 280px;
            height: 220px;
          }
          .featured-work__content {
            padding: 24px;
          }
          .featured-work__name {
            font-size: 20px;
          }
          .marquee-track {
            gap: 16px;
            padding-right: 16px;
          }
        }
      `}</style>
    </section>
  );
}
