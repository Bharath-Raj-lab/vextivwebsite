"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight } from "lucide-react";

// ─── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const rafRef = useRef<number>(0);

  // ── Cursor-reveal interaction ──────────────────────────────────────────────
  const updateMask = useCallback(() => {
    const reveal = revealRef.current;
    if (!reveal) return;

    smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.08;
    smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.08;

    if (isHoveringRef.current) {
      const size = 320;
      const maskStr = `radial-gradient(${size}px circle at ${smoothRef.current.x}px ${smoothRef.current.y}px,
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,0.8) 35%,
        rgba(0,0,0,0.5) 55%,
        rgba(0,0,0,0.2) 70%,
        rgba(0,0,0,0.05) 85%,
        rgba(0,0,0,0) 100%)`;
      reveal.style.maskImage = maskStr;
      reveal.style.webkitMaskImage = maskStr;
    } else {
      const hideMask =
        "radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)";
      reveal.style.maskImage = hideMask;
      reveal.style.webkitMaskImage = hideMask;
    }

    rafRef.current = requestAnimationFrame(updateMask);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;

    const hero = heroRef.current;
    const reveal = revealRef.current;
    if (!hero || !reveal) return;

    // Init reveal visible after zoom begins
    const showTimer = setTimeout(() => {
      reveal.style.opacity = "1";
      const hideMask =
        "radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)";
      reveal.style.maskImage = hideMask;
      reveal.style.webkitMaskImage = hideMask;
    }, 800);

    // Mouse handlers (desktop)
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      isHoveringRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
    };

    // Touch handlers (mobile) — finger acts as cursor
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX;
      mouseRef.current.y = touch.clientY;
      smoothRef.current.x = touch.clientX;
      smoothRef.current.y = touch.clientY;
      isHoveringRef.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX;
      mouseRef.current.y = touch.clientY;
      isHoveringRef.current = true;
    };

    const handleTouchEnd = () => {
      isHoveringRef.current = false;
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);
    hero.addEventListener("touchstart", handleTouchStart, { passive: true });
    hero.addEventListener("touchmove", handleTouchMove, { passive: true });
    hero.addEventListener("touchend", handleTouchEnd);

    rafRef.current = requestAnimationFrame(updateMask);

    return () => {
      clearTimeout(showTimer);
      cancelAnimationFrame(rafRef.current);
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
      hero.removeEventListener("touchstart", handleTouchStart);
      hero.removeEventListener("touchmove", handleTouchMove);
      hero.removeEventListener("touchend", handleTouchEnd);
    };
  }, [prefersReduced, updateMask]);

  // Removed animation variants as they are now handled by CSS

  return (
    <section
      id="hero"
      className="hero"
      ref={heroRef}
      aria-labelledby="hero-heading"
    >
      {/* ── Base layer (dark, with zoom animation) ─────────────────────── */}
      <div
        className={`hero__base-layer ${prefersReduced ? "" : "hero__base-layer--animate"}`}
      >
        <div
          className="hero__base-img"
          role="img"
          aria-hidden="true"
        />
      </div>

      {/* ── Vignette overlay ───────────────────────────────────────────── */}
      <div className="hero__vignette" aria-hidden="true" />

      {/* ── Reveal layer (cursor-driven) ───────────────────────────────── */}
      <div
        ref={revealRef}
        className="hero__reveal-layer"
        aria-hidden="true"
      />

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="hero__content">
        {/* Center headline */}
        <div className="hero__headline-wrap">
          <h1 id="hero-heading" className="hero__headline">
            <span
              className="hero__headline-italic animate-fade-up delay-300"
              style={prefersReduced ? { animationDuration: '0.01ms' } : {}}
            >
              More Visibility.
            </span>
            <span
              className="hero__headline-bold animate-fade-up delay-500"
              style={prefersReduced ? { animationDuration: '0.01ms' } : {}}
            >
              More Customers. More <span style={{ color: "#C8F04D" }}>Growth</span>.
            </span>
          </h1>
        </div>

        {/* Bottom content row */}
        <div className="hero__bottom">
          {/* Left description */}
          <div
            className="hero__bottom-left animate-fade-in delay-800"
            style={prefersReduced ? { animationDuration: '0.01ms' } : {}}
          >
            <p className="hero__description">
              We help businesses stand out with websites, branding, content, and smart digital systems.
            </p>
          </div>

          {/* Right CTA block */}
          <div
            className="hero__bottom-right animate-fade-in delay-1000"
            style={prefersReduced ? { animationDuration: '0.01ms' } : {}}
          >
            <div className="hero__ctas">
              <Link
                href="/contact"
                className="hero__cta-primary btn-premium"
                onClick={() =>
                  trackEvent("cta_click", { label: "Start a Project" })
                }
              >
                Start a Project
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </Link>
              <Link
                href="/work"
                className="hero__cta-secondary btn-premium-ghost"
                onClick={() =>
                  trackEvent("cta_click", { label: "View Our Work" })
                }
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator (animated bounce) ─────────────────────────── */}
      <div className="hero__scroll-indicator" aria-hidden="true">
        {/* Desktop: subtle mouse + wheel */}
        <div className="hero__scroll-indicator-inner hero__scroll-desktop">
          <span className="hero__scroll-text">Scroll to explore</span>
          <div className="hero__scroll-mouse">
            <div className="hero__scroll-wheel" />
          </div>
        </div>
        {/* Mobile: bold chevron arrow */}
        <div className="hero__scroll-mobile">
          <span className="hero__scroll-mobile-label">Scroll</span>
          <div className="hero__scroll-chevron-wrap">
            <svg className="hero__scroll-chevron" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <polyline points="5,10 14,19 23,10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg className="hero__scroll-chevron hero__scroll-chevron--delay" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <polyline points="5,10 14,19 23,10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ─── Styles ──────────────────────────────────────────────────────── */}
      <style>{`
        /* ═══ HERO SECTION ═══════════════════════════════════════════════ */
        .hero {
          position: relative;
          height: 100vh;
          height: 100dvh;
          min-height: 600px;
          max-height: 1200px;
          width: 100%;
          overflow: hidden;
          background: var(--bg-section-hero);
        }

        /* ── Base layer (dark background image with zoom) ────────────── */
        .hero__base-layer {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .hero__base-layer--animate {
          animation: heroZoomOut 14s ease-out forwards;
        }

        .hero__base-img {
          width: 100%;
          height: 100%;
          background-image: url('/assets/hero-bg-dark.webp');
          background-size: cover;
          background-position: center;
        }

        @keyframes heroZoomOut {
          from { transform: scale(1.15); }
          to   { transform: scale(1); }
        }

        /* ── Vignette gradient overlay ───────────────────────────────── */
        .hero__vignette {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(
            to top,
            var(--bg-base) 0%,
            rgba(8, 8, 8, 0.6) 25%,
            transparent 50%,
            rgba(8, 8, 8, 0.35) 100%
          );
          pointer-events: none;
        }

        /* ── Reveal layer (cursor-driven) ────────────────────────────── */
        .hero__reveal-layer {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.8s ease;
          background-image: url('/assets/hero-bg-reveal.webp');
          background-size: cover;
          background-position: center;
          mix-blend-mode: screen;
          will-change: mask-image, -webkit-mask-image;
        }

        /* ── Content container ───────────────────────────────────────── */
        .hero__content {
          position: relative;
          z-index: 10;
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 140px clamp(24px, 4vw, 64px) 64px;
        }

        /* ── Headline ────────────────────────────────────────────────── */
        .hero__headline-wrap {
          position: absolute;
          top: 18%;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          width: 100%;
          max-width: 900px;
          padding: 0 24px;
          pointer-events: none;
        }

        .hero__headline {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .hero__headline-italic {
          font-family: var(--font-display);
          font-size: clamp(36px, 6vw, 72px);
          font-weight: 700;
          font-style: italic;
          line-height: 1.1;
          color: var(--text-primary);
          letter-spacing: -0.03em;
        }

        .hero__headline-bold {
          font-family: var(--font-display);
          font-size: clamp(36px, 6vw, 72px);
          font-weight: 800;
          line-height: 1.1;
          color: #ffffff;
          letter-spacing: -0.04em;
        }

        /* ── Bottom content row ──────────────────────────────────────── */
        .hero__bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
          margin-top: auto;
          gap: 48px;
        }

        /* Left description */
        .hero__bottom-left {
          max-width: 420px;
        }

        .hero__description {
          font-family: var(--font-body);
          font-size: var(--text-md);
          font-weight: 400;
          line-height: 1.65;
          color: var(--text-secondary);
          border-left: 2px solid rgba(200, 240, 77, 0.3);
          padding-left: 16px;
        }

        /* Right CTA block */
        .hero__bottom-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 16px;
          text-align: right;
        }

        .hero__cta-desc {
          font-family: var(--font-body);
          font-size: var(--text-md);
          font-weight: 400;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 280px;
        }

        /* CTAs */
        .hero__ctas {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .hero__cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: var(--accent);
          color: var(--bg-base);
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: 9999px;
          text-decoration: none;
          transition: background 250ms ease, transform 250ms ease, box-shadow 250ms ease;
          box-shadow: 0 0 32px rgba(200, 240, 77, 0.15);
        }
        .hero__cta-primary:hover {
          background: #d4f76a;
          transform: translateY(-2px);
          box-shadow: 0 0 48px rgba(200, 240, 77, 0.25);
        }
        .hero__cta-primary:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
        }

        .hero__cta-secondary {
          display: inline-flex;
          align-items: center;
          padding: 14px 28px;
          background: transparent;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1px solid var(--border-medium);
          border-radius: 9999px;
          text-decoration: none;
          transition: border-color 250ms ease, color 250ms ease, background 250ms ease;
        }
        .hero__cta-secondary:hover {
          border-color: var(--border-hover);
          color: var(--accent);
          background: rgba(255, 255, 255, 0.03);
        }
        .hero__cta-secondary:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
        }

        /* ── Scroll Indicator ────────────────────────────────────────── */
        .hero__scroll-indicator {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 12;
          pointer-events: none;
        }

        /* Desktop scroll indicator */
        .hero__scroll-desktop {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          animation: scrollBounce 2s ease-in-out infinite;
        }

        .hero__scroll-text {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
        }

        .hero__scroll-mouse {
          width: 20px;
          height: 32px;
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          border-radius: 10px;
          position: relative;
        }

        .hero__scroll-wheel {
          width: 3px;
          height: 6px;
          background-color: var(--accent);
          border-radius: 1px;
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          animation: scrollWheel 2s infinite;
        }

        /* Mobile scroll indicator — hidden on desktop */
        .hero__scroll-mobile {
          display: none;
        }

        @keyframes scrollWheel {
          0% {
            opacity: 0;
            transform: translate(-50%, 0);
          }
          20% {
            opacity: 1;
          }
          60% {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        @keyframes chevronDrop {
          0%, 100% { transform: translateY(0); opacity: 0.9; }
          50% { transform: translateY(8px); opacity: 0.4; }
        }

        @keyframes chevronDropDelay {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(8px); opacity: 0.1; }
        }

        @keyframes mobileScrollPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(200, 240, 77, 0.5); }
          50% { box-shadow: 0 0 0 10px rgba(200, 240, 77, 0); }
        }

        /* ── Responsive ──────────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .hero__content {
            padding: 120px 40px 48px;
          }
          .hero__headline-wrap {
            top: 16%;
          }
        }

        @media (max-width: 767px) {
          .hero {
            min-height: 100vh;
            max-height: none;
          }

          .hero__content {
            padding: 100px 20px 72px;
          }

          .hero__headline-wrap {
            top: 14%;
            padding: 0 16px;
          }

          .hero__headline-italic,
          .hero__headline-bold {
            font-size: clamp(28px, 8vw, 42px);
          }

          .hero__bottom {
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
          }

          .hero__bottom-left {
            max-width: 100%;
          }

          .hero__bottom-right {
            align-items: stretch;
            text-align: left;
            background: rgba(10, 10, 10, 0.5);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            padding: 20px;
          }

          .hero__cta-desc {
            max-width: 100%;
          }

          .hero__ctas {
            flex-direction: column;
            justify-content: stretch;
          }

          .hero__cta-primary,
          .hero__cta-secondary {
            width: 100%;
            justify-content: center;
          }

          /* Hide desktop indicator, show mobile indicator */
          .hero__scroll-desktop {
            display: none;
          }

          .hero__scroll-indicator {
            bottom: 18px;
            transform: translateX(-50%);
          }

          .hero__scroll-mobile {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
          }

          .hero__scroll-mobile-label {
            font-family: var(--font-body);
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: var(--accent);
            opacity: 0.85;
          }

          .hero__scroll-chevron-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0px;
            background: rgba(200, 240, 77, 0.08);
            border: 1px solid rgba(200, 240, 77, 0.25);
            border-radius: 50px;
            padding: 6px 10px 4px;
            animation: mobileScrollPulse 2s ease-in-out infinite;
          }

          .hero__scroll-chevron {
            color: var(--accent);
            display: block;
            animation: chevronDrop 1.4s ease-in-out infinite;
          }

          .hero__scroll-chevron--delay {
            animation: chevronDropDelay 1.4s ease-in-out infinite;
            margin-top: -10px;
            opacity: 0.45;
          }
        }
      `}</style>
    </section>
  );
}
