"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────
const STEPS = [
  {
    number: "01",
    title: "Discover",
    description: "We learn your business, goals, and audience.",
    // Desktop layout
    dLeft: "10%", dTop: "75%", dPos: "bottom",
    // Mobile layout
    mStyle: { top: "12.5%", left: "58%", right: "2%", textAlign: "left" as const, alignItems: "flex-start" as const },
  },
  {
    number: "02",
    title: "Design",
    description: "We craft a visual direction built around your brand.",
    dLeft: "35%", dTop: "25%", dPos: "top",
    mStyle: { top: "37.5%", left: "30%", right: "5%", textAlign: "left" as const, alignItems: "flex-start" as const },
  },
  {
    number: "03",
    title: "Build",
    description: "We develop with performance and conversion in mind.",
    dLeft: "65%", dTop: "25%", dPos: "top",
    mStyle: { top: "62.5%", right: "32%", left: "5%", textAlign: "right" as const, alignItems: "flex-end" as const },
  },
  {
    number: "04",
    title: "Launch",
    description: "We deploy, test, and hand off with full documentation.",
    dLeft: "90%", dTop: "75%", dPos: "bottom",
    mStyle: { top: "87.5%", right: "58%", left: "2%", textAlign: "right" as const, alignItems: "flex-end" as const },
  },
];

// ─── SVG Paths ─────────────────────────────────────────────────────────────
const DESKTOP_PATH = "M -50 225 L 100 225 C 250 225 250 75 350 75 L 650 75 C 750 75 750 225 900 225 L 1050 225";
const MOBILE_PATH = "M 150 -50 L 150 100 C 150 200 50 200 50 300 C 50 400 250 400 250 500 C 250 600 150 600 150 700 L 150 850";

// ─── Components ────────────────────────────────────────────────────────────

const CarIcon = () => (
  <g className="journey-car-group">
    {/* Neon glow under car */}
    <rect x="-24" y="-14" width="48" height="28" rx="8" fill="rgba(200, 240, 77, 0.2)" filter="blur(6px)" />
    {/* Car chassis */}
    <rect x="-20" y="-10" width="40" height="20" rx="6" fill="#0a0a0a" stroke="var(--accent)" strokeWidth="1.5" />
    {/* Windshield */}
    <rect x="-2" y="-8" width="10" height="16" rx="2" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.6" />
    {/* Headlights */}
    <circle cx="18" cy="-6" r="2" fill="#fff" />
    <circle cx="18" cy="6" r="2" fill="#fff" />
    <circle cx="18" cy="-6" r="4" fill="rgba(255,255,255,0.4)" filter="blur(2px)" />
    <circle cx="18" cy="6" r="4" fill="rgba(255,255,255,0.4)" filter="blur(2px)" />
    {/* Tail lights */}
    <circle cx="-20" cy="-6" r="1.5" fill="#ff3333" />
    <circle cx="-20" cy="6" r="1.5" fill="#ff3333" />
    <circle cx="-20" cy="-6" r="4" fill="rgba(255,51,51,0.5)" filter="blur(2px)" />
    <circle cx="-20" cy="6" r="4" fill="rgba(255,51,51,0.5)" filter="blur(2px)" />
  </g>
);

export default function Process() {
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Exact path progress thresholds calculated based on Bezier curve lengths
  const D_THRESHOLDS = [0.124, 0.376, 0.624, 0.876];
  const M_THRESHOLDS = [0.141, 0.359, 0.641, 0.859];

  // Sync React state to the 12s SVG animation loop
  useEffect(() => {
    if (shouldReduceMotion) return;
    const start = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = (now - start) % 12000;
      setProgress(elapsed / 12000); // 0.0 to 1.0
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [shouldReduceMotion]);

  return (
    <section id="process" className="process" aria-labelledby="process-heading">
      <div className="process__inner">
        <p className="process__eyebrow">HOW WE WORK</p>
        <h2 id="process-heading" className="process__heading">
          From Brief to Launch — Our Process
        </h2>

        {/* ─── DESKTOP JOURNEY ─── */}
        <div className="journey-container journey-desktop">
          <svg className="journey-svg" viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base road layers */}
            <path id="d-path" d={DESKTOP_PATH} fill="none" stroke="#111" strokeWidth="40" strokeLinecap="round" />
            <path d={DESKTOP_PATH} fill="none" stroke="#1a1a1a" strokeWidth="38" strokeLinecap="round" />
            <path d={DESKTOP_PATH} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="12 12" />

            {/* Checkpoints */}
            {STEPS.map((_, i) => {
              const isActive = shouldReduceMotion || progress >= D_THRESHOLDS[i];
              return (
                <circle
                  key={`d-chk-${i}`}
                  cx={i === 0 ? 100 : i === 1 ? 350 : i === 2 ? 650 : 900}
                  cy={i === 0 ? 225 : i === 1 ? 75 : i === 2 ? 75 : 225}
                  r="6"
                  fill={isActive ? "var(--accent)" : "#333"}
                  className="journey-checkpoint"
                />
              );
            })}

            {/* Glowing checkpoints */}
            {STEPS.map((_, i) => {
              const isActive = shouldReduceMotion || progress >= D_THRESHOLDS[i];
              return (
                <circle
                  key={`d-glow-${i}`}
                  cx={i === 0 ? 100 : i === 1 ? 350 : i === 2 ? 650 : 900}
                  cy={i === 0 ? 225 : i === 1 ? 75 : i === 2 ? 75 : 225}
                  r="16"
                  fill="var(--accent)"
                  opacity={isActive ? 0.3 : 0}
                  className="journey-checkpoint-glow"
                  filter="url(#glow)"
                />
              );
            })}

            {/* Animated Car */}
            {!shouldReduceMotion && (
              <g>
                <CarIcon />
                <animateMotion dur="12s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#d-path" />
                </animateMotion>
              </g>
            )}
          </svg>

          {/* HTML Overlay Steps */}
          {STEPS.map((step, i) => {
            const isActive = shouldReduceMotion || progress >= D_THRESHOLDS[i];
            return (
              <div
                key={step.number}
                className={`journey-step journey-step--desktop ${isActive ? "is-active" : ""}`}
                style={{ left: step.dLeft, top: step.dTop }}
                data-pos={step.dPos}
              >
                <span className="journey-step__number">{step.number}</span>
                <h3 className="journey-step__title">{step.title}</h3>
                <p className="journey-step__desc">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* ─── MOBILE JOURNEY ─── */}
        <div className="journey-container journey-mobile">
          <svg className="journey-svg" viewBox="0 0 300 800" preserveAspectRatio="xMidYMid meet">
            {/* Base road layers */}
            <path id="m-path" d={MOBILE_PATH} fill="none" stroke="#111" strokeWidth="40" strokeLinecap="round" />
            <path d={MOBILE_PATH} fill="none" stroke="#1a1a1a" strokeWidth="38" strokeLinecap="round" />
            <path d={MOBILE_PATH} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="12 12" />

            {/* Checkpoints & Glows */}
            {STEPS.map((_, i) => {
              const cx = i === 0 ? 150 : i === 1 ? 50 : i === 2 ? 250 : 150;
              const cy = i === 0 ? 100 : i === 1 ? 300 : i === 2 ? 500 : 700;
              const isActive = shouldReduceMotion || progress >= M_THRESHOLDS[i];
              return (
                <g key={`m-chk-${i}`}>
                  <circle cx={cx} cy={cy} r="6" fill={isActive ? "var(--accent)" : "#333"} className="journey-checkpoint" />
                  <circle cx={cx} cy={cy} r="16" fill="var(--accent)" opacity={isActive ? 0.3 : 0} className="journey-checkpoint-glow" filter="url(#glow)" />
                </g>
              );
            })}

            {/* Animated Car */}
            {!shouldReduceMotion && (
              <g>
                <CarIcon />
                <animateMotion dur="12s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#m-path" />
                </animateMotion>
              </g>
            )}
          </svg>

          {/* HTML Overlay Steps */}
          {STEPS.map((step, i) => {
            const isActive = shouldReduceMotion || progress >= M_THRESHOLDS[i];
            return (
              <div
                key={step.number}
                className={`journey-step journey-step--mobile ${isActive ? "is-active" : ""}`}
                style={{ ...step.mStyle, transform: "translateY(-50%)" }}
              >
                <span className="journey-step__number">{step.number}</span>
                <h3 className="journey-step__title">{step.title}</h3>
                <p className="journey-step__desc">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Styles ──────────────────────────────────────────────────────── */}
      <style>{`
        .process {
          background: var(--bg-base);
          padding: 120px clamp(24px, 4vw, 64px);
          overflow: hidden; /* Prevent edge glow or translation overflow */
        }

        .process__inner {
          max-width: 1500px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .process__eyebrow {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          text-align: center;
          margin-bottom: 24px;
        }

        .process__heading {
          font-family: var(--font-display);
          font-size: var(--text-section);
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          color: var(--text-primary);
          text-align: center;
          margin-bottom: 80px;
          line-height: 1.1;
          max-width: 600px;
        }

        /* ── Layout Containers ── */
        .journey-container {
          position: relative;
          margin: 0 auto;
        }

        .journey-desktop {
          display: block;
          width: 100%;
          max-width: 1000px;
          aspect-ratio: 1000 / 300;
          height: auto;
        }

        .journey-mobile {
          display: none;
          width: 100%;
          max-width: 300px;
          aspect-ratio: 300 / 800;
          height: auto;
        }

        .journey-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        /* ── Steps ── */
        .journey-step {
          position: absolute;
          width: 240px;
          display: flex;
          flex-direction: column;
          pointer-events: none; /* Let clicks pass through if needed */
        }

        /* Desktop specific positioning */
        .journey-step--desktop[data-pos="bottom"] {
          transform: translate(-50%, 40px);
          text-align: center;
          align-items: center;
        }
        .journey-step--desktop[data-pos="top"] {
          transform: translate(-50%, calc(-100% - 40px));
          text-align: center;
          align-items: center;
        }

        /* Mobile specific positioning */
        .journey-step--mobile {
          width: auto;
        }

        /* ── Typography & Glows ── */
        .journey-step__number {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 800;
          color: rgba(255, 255, 255, 0.15);
          transition: color 0.4s ease, text-shadow 0.4s ease;
          margin-bottom: 8px;
          line-height: 1;
        }

        .journey-step__title {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          font-weight: 600;
          color: rgba(255, 255, 255, 0.4);
          transition: color 0.4s ease;
          margin-bottom: 8px;
        }

        .journey-step__desc {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 300;
          color: rgba(255, 255, 255, 0.3);
          line-height: var(--leading-body);
          transition: color 0.4s ease;
        }

        /* Active State Animations */
        .journey-step.is-active .journey-step__number {
          color: var(--accent);
          text-shadow: 0 0 20px rgba(200, 240, 77, 0.5);
          animation: pulse-step 2s infinite ease-in-out;
        }
        .journey-step.is-active .journey-step__title {
          color: #fff;
        }
        .journey-step.is-active .journey-step__desc {
          color: rgba(255, 255, 255, 0.8);
        }

        .journey-checkpoint {
          transition: fill 0.4s ease;
        }
        .journey-checkpoint-glow {
          transition: opacity 0.4s ease;
        }

        @keyframes pulse-step {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        /* ── Reduced Motion Fallback ── */
        @media (prefers-reduced-motion: reduce) {
          .journey-step__number {
            color: var(--accent);
            animation: none !important;
            text-shadow: none !important;
          }
          .journey-step__title {
            color: #fff;
          }
          .journey-step__desc {
            color: rgba(255, 255, 255, 0.8);
          }
          .journey-checkpoint {
            fill: var(--accent);
          }
        }

        /* ── Responsive Switching ── */
        @media (max-width: 900px) {
          .journey-desktop { display: none; }
          .journey-mobile { display: block; margin-top: 60px; }
          .process { padding: 80px 20px; }
          .process__heading { margin-bottom: 40px; }
        }
      `}</style>
    </section>
  );
}
