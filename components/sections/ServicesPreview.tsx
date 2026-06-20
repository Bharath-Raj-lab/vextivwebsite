"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

// ─── Constants ─────────────────────────────────────────────────────────────
const CARD_WIDTH_COLLAPSED_D = 120;
const CARD_WIDTH_EXPANDED_D = 420;
const CARD_HEIGHT_D = 520;

const CARD_WIDTH_COLLAPSED_M = 52;
const CARD_WIDTH_EXPANDED_M = 300;
const CARD_HEIGHT_M = 440;

const SPRING_OPTS = { stiffness: 220, damping: 26, mass: 0.9 };

// ─── Premium Custom SVG Icons ──────────────────────────────────────────────
const IconWebsite = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="32" height="26" rx="4" stroke="#0A0A0A" strokeWidth="2.2" fill="none" />
    <line x1="2" y1="12" x2="34" y2="12" stroke="#0A0A0A" strokeWidth="2.2" />
    <circle cx="7.5" cy="8.5" r="1.5" fill="#0A0A0A" />
    <circle cx="12.5" cy="8.5" r="1.5" fill="#0A0A0A" />
    <circle cx="17.5" cy="8.5" r="1.5" fill="#0A0A0A" />
    <rect x="7" y="17" width="10" height="8" rx="2" fill="#0A0A0A" opacity="0.15" stroke="#0A0A0A" strokeWidth="1.8" />
    <line x1="20" y1="17" x2="29" y2="17" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="21" x2="29" y2="21" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="25" x2="25" y2="25" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconBrand = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="10" stroke="#0A0A0A" strokeWidth="2.2" fill="none" />
    <circle cx="18" cy="18" r="4" fill="#0A0A0A" opacity="0.18" />
    <line x1="18" y1="4" x2="18" y2="8" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="18" y1="28" x2="18" y2="32" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="4" y1="18" x2="8" y2="18" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="28" y1="18" x2="32" y2="18" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="8.5" y1="8.5" x2="11.5" y2="11.5" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
    <line x1="24.5" y1="24.5" x2="27.5" y2="27.5" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
    <line x1="27.5" y1="8.5" x2="24.5" y2="11.5" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
    <line x1="11.5" y1="24.5" x2="8.5" y2="27.5" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconContent = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="30" height="21" rx="3.5" stroke="#0A0A0A" strokeWidth="2.2" fill="none" />
    <polygon points="14,11 14,22 24,16.5" fill="#0A0A0A" opacity="0.85" />
    <line x1="8" y1="30" x2="28" y2="30" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="14" y1="27" x2="14" y2="30" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="22" y1="27" x2="22" y2="30" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const IconSocial = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="8" r="4" stroke="#0A0A0A" strokeWidth="2.2" fill="none" />
    <circle cx="8" cy="18" r="4" stroke="#0A0A0A" strokeWidth="2.2" fill="none" />
    <circle cx="28" cy="28" r="4" stroke="#0A0A0A" strokeWidth="2.2" fill="none" />
    <line x1="12" y1="16" x2="24" y2="10" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="12" y1="20" x2="24" y2="26" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="28" cy="8" r="1.5" fill="#0A0A0A" />
    <circle cx="8" cy="18" r="1.5" fill="#0A0A0A" />
    <circle cx="28" cy="28" r="1.5" fill="#0A0A0A" />
  </svg>
);

const IconSEO = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="15" r="9" stroke="#0A0A0A" strokeWidth="2.2" fill="none" />
    <line x1="22.5" y1="22.5" x2="32" y2="32" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="12" y1="15" x2="20" y2="15" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="11" x2="16" y2="19" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="15" r="2.5" fill="#0A0A0A" opacity="0.2" />
  </svg>
);

const IconQR = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="12" height="12" rx="2" stroke="#0A0A0A" strokeWidth="2.2" fill="none" />
    <rect x="20" y="4" width="12" height="12" rx="2" stroke="#0A0A0A" strokeWidth="2.2" fill="none" />
    <rect x="4" y="20" width="12" height="12" rx="2" stroke="#0A0A0A" strokeWidth="2.2" fill="none" />
    <rect x="7" y="7" width="6" height="6" rx="1" fill="#0A0A0A" />
    <rect x="23" y="7" width="6" height="6" rx="1" fill="#0A0A0A" />
    <rect x="7" y="23" width="6" height="6" rx="1" fill="#0A0A0A" />
    <line x1="20" y1="20" x2="23" y2="20" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="20" y1="24" x2="20" y2="32" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="24" y1="24" x2="32" y2="24" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="28" y1="20" x2="32" y2="20" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="32" y1="24" x2="32" y2="32" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="24" y1="32" x2="28" y2="32" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="24" y1="28" x2="28" y2="28" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "web",
    icon: <IconWebsite />,
    name: "Website Design",
    shortDesc: "Turn your website into a 24/7 customer acquisition system.",
    longDesc: "We build high-performance web experiences designed to convert traffic into revenue. Every pixel is optimized for speed, accessibility, and measurable growth.",
    features: ["Next.js & React Architecture", "CMS Integration", "Technical SEO Foundation"],
    // gradient colors for the card background
    gradFrom: "#4D9FFF",
    gradTo: "#2F6BFF",
    glowColor: "rgba(77, 159, 255, 0.55)",
    stat: "98 Speed Score",
  },
  {
    id: "brand",
    icon: <IconBrand />,
    name: "Brand Identity",
    shortDesc: "Memorable logo systems and comprehensive visual guidelines.",
    longDesc: "Your brand is your most valuable asset. We craft cohesive identity systems that resonate with your target audience and stand out in crowded markets.",
    features: ["Logo & Mark Design", "Typography & Color Systems", "Brand Guidelines"],
    gradFrom: "#FF5BA7",
    gradTo: "#FF2D75",
    glowColor: "rgba(255, 91, 167, 0.55)",
    stat: "Full Guidelines",
  },
  {
    id: "content",
    icon: <IconContent />,
    name: "Content Creation",
    shortDesc: "Scroll-stopping photo & video production that converts.",
    longDesc: "High-end visual content tailored for modern digital platforms. From cinematic commercials to fast-paced social media assets, we produce content that demands attention.",
    features: ["Short-form Video", "Commercial Photography", "Motion Graphics"],
    gradFrom: "#FFB347",
    gradTo: "#FF7A00",
    glowColor: "rgba(255, 179, 71, 0.55)",
    stat: "1.2M Total Views",
  },
  {
    id: "social",
    icon: <IconSocial />,
    name: "Social Media",
    shortDesc: "Data-driven content calendars that maximize engagement.",
    longDesc: "We don't just post; we build communities. Our social strategies are driven by analytics, trend forecasting, and authentic engagement tactics.",
    features: ["Platform Strategies", "Community Management", "Influencer Partnerships"],
    gradFrom: "#C66CFF",
    gradTo: "#8A2BE2",
    glowColor: "rgba(198, 108, 255, 0.55)",
    stat: "8.7% Engage Rate",
  },
  {
    id: "seo",
    icon: <IconSEO />,
    name: "Local SEO",
    shortDesc: "Optimized profiles & local strategy to drive foot traffic.",
    longDesc: "Dominate your local market. We optimize your digital presence across all local search surfaces to ensure customers find you before your competitors.",
    features: ["Google Business Optimization", "Local Citation Building", "Review Management"],
    gradFrom: "#3EE7B7",
    gradTo: "#00C896",
    glowColor: "rgba(62, 231, 183, 0.55)",
    stat: "#1 Local Rank",
  },
  {
    id: "qr",
    icon: <IconQR />,
    name: "QR Menu Systems",
    shortDesc: "Beautiful, instantly-updatable digital menus for modern venues.",
    longDesc: "Replace static menus with a living digital experience. Our QR systems enable instant updates, analytics, and upselling opportunities directly from the customer's phone.",
    features: ["Instant Menu Updates", "Analytics Dashboard", "Multi-language Support"],
    gradFrom: "#5CE1FF",
    gradTo: "#16C7FF",
    glowColor: "rgba(92, 225, 255, 0.55)",
    stat: "Zero Print Costs",
  },
];

// ─── Service Card Component ────────────────────────────────────────────────
function ServiceCard({
  service,
  isActive,
  waveY,
  waveScale,
  onEnter,
  onLeave,
  isMobile,
  isOverlay,
}: {
  service: typeof SERVICES[0];
  isActive: boolean;
  waveY: number;
  waveScale: number;
  onEnter: () => void;
  onLeave: () => void;
  isMobile: boolean;
  isOverlay?: boolean;
}) {
  const CARD_WIDTH_COLLAPSED = isMobile ? CARD_WIDTH_COLLAPSED_M : CARD_WIDTH_COLLAPSED_D;
  const CARD_WIDTH_EXPANDED = isOverlay ? "100%" : (isMobile ? CARD_WIDTH_EXPANDED_M : CARD_WIDTH_EXPANDED_D);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _CARD_HEIGHT = isOverlay ? "100%" : (isMobile ? CARD_HEIGHT_M : CARD_HEIGHT_D);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt (only when active)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [6, -6]), SPRING_OPTS);
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-6, 6]), SPRING_OPTS);

  // Light sweep position
  const [spotlight, setSpotlight] = useState({ x: 50, y: 30 });
  const [sweepActive, setSweepActive] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    mouseX.set((nx - 0.5) * 2);
    mouseY.set((ny - 0.5) * 2);
    setSpotlight({ x: nx * 100, y: ny * 100 });
  }, [isActive, mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    onLeave();
  }, [mouseX, mouseY, onLeave]);

  useEffect(() => {
    if (isActive) {
      setSweepActive(true);
      const t = setTimeout(() => setSweepActive(false), 700);
      return () => clearTimeout(t);
    }
  }, [isActive]);

  // Width spring — useSpring only accepts numbers; when isOverlay the CSS width
  // is "100%" so we bypass the spring and set it directly on the motion.div.
  const numericExpandedWidth = typeof CARD_WIDTH_EXPANDED === "number"
    ? CARD_WIDTH_EXPANDED
    : CARD_WIDTH_COLLAPSED;
  const numericTargetWidth = isActive ? numericExpandedWidth : CARD_WIDTH_COLLAPSED;
  const widthSpring = useSpring(numericTargetWidth, SPRING_OPTS);
  useEffect(() => { widthSpring.set(numericTargetWidth); }, [isActive, numericTargetWidth, widthSpring]);

  const cardHeight = isMobile ? CARD_HEIGHT_M : CARD_HEIGHT_D;

  const ySpring = useSpring(waveY, SPRING_OPTS);
  const scaleSpring = useSpring(waveScale, SPRING_OPTS);
  useEffect(() => { ySpring.set(waveY); }, [waveY, ySpring]);
  useEffect(() => { scaleSpring.set(waveScale); }, [waveScale, scaleSpring]);

  return (
    <motion.div
      ref={cardRef}
      className="sv-card-outer"
      style={{
        width: isOverlay ? "100%" : widthSpring,
        height: cardHeight,
        y: ySpring,
        scale: scaleSpring,
        rotateX: !isMobile && isActive ? rotateX : 0,
        rotateY: !isMobile && isActive ? rotateY : 0,
        transformStyle: "preserve-3d",
        zIndex: isActive ? 20 : "auto",
      }}
      onMouseEnter={isMobile ? undefined : onEnter}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onTouchEnd={(e) => {
        e.preventDefault();
        if (isActive) onLeave();
        else onEnter();
      }}
    >
      {/* Outer ambient glow behind the card */}
      <div
        className={`sv-outer-glow ${isActive ? "sv-outer-glow--active" : ""}`}
        style={{
          background: service.glowColor,
          boxShadow: isActive
            ? `0 0 80px 20px ${service.glowColor}`
            : `0 0 40px 10px ${service.glowColor}`,
        }}
      />

      <div
        className={`sv-card ${isActive ? "sv-card--active" : ""}`}
        style={{
          "--grad-from": service.gradFrom,
          "--grad-to": service.gradTo,
          "--glow": service.glowColor,
        } as React.CSSProperties}
      >
        {/* Base gradient background */}
        <div className="sv-bg-gradient" />

        {/* Inner radial highlight at top */}
        <div className="sv-inner-light" />

        {/* Glass overlay */}
        <div className="sv-glass" />

        {/* Noise texture */}
        <div className="sv-noise" />

        {/* Cursor spotlight */}
        {isActive && (
          <div
            className="sv-spotlight"
            style={{
              background: `radial-gradient(280px circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.18) 0%, transparent 65%)`,
            }}
          />
        )}

        {/* Light sweep on activate */}
        <div className={`sv-sweep ${sweepActive ? "sv-sweep--active" : ""}`} />

        {/* Collapsed label — vertical text shown when inactive */}
        <div className="sv-label-vertical" aria-hidden={isActive}>
          <span className="sv-label-icon">{service.icon}</span>
          <span className="sv-label-text">{service.name}</span>
        </div>

        {/* Full content — shown when active */}
        <motion.div
          className="sv-content"
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -14 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={!isActive}
        >
          {/* Icon box */}
          <div className="sv-content-icon">
            {service.icon}
          </div>

          <h3 className="sv-content-name">{service.name}</h3>
          <p className="sv-content-desc">{service.longDesc}</p>

          <div className="sv-features">
            {service.features.map((f, i) => (
              <div key={i} className="sv-feature">
                <CheckCircle2 size={14} className="sv-feature-icon" />
                <span>{f}</span>
              </div>
            ))}
          </div>

          <div className="sv-bottom">
            <div className="sv-stat">
              <span className="sv-stat-dot" />
              {service.stat}
            </div>
            <button className="sv-cta">
              Learn More
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Section Component ─────────────────────────────────────────────────────
export default function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const getWave = (index: number) => {
    if (activeIndex === null) return { y: 0, scale: 1 };
    const dist = Math.abs(index - activeIndex);
    const liftScale = isMobile ? 0.6 : 1;
    if (dist === 0) return { y: -38 * liftScale, scale: 1.02 };
    if (dist === 1) return { y: -18 * liftScale, scale: 1.01 };
    if (dist === 2) return { y: -8 * liftScale, scale: 1.005 };
    if (dist === 3) return { y: -3 * liftScale, scale: 1.002 };
    return { y: 0, scale: 1 };
  };

  const deckHeight = isMobile ? CARD_HEIGHT_M : CARD_HEIGHT_D;

  return (
    <section ref={sectionRef} className="sv-section">
      {/* Background grid texture */}
      <div className="sv-bg-grid" />

      <div className="sv-inner">
        {/* Header */}
        <motion.div
          className="sv-header"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="sv-eyebrow">What We Do</p>
          <h2 className="sv-title">
            One Ecosystem,<br />
            <span className="sv-title-accent">Every Growth System</span>
          </h2>
          <p className="sv-subtitle">
            {isMobile
              ? 'Tap any card to explore our services.'
              : 'Move your cursor across the cards to explore our services.'}
          </p>
        </motion.div>

        {/* Fan Deck */}
        <motion.div
          className="sv-deck"
          style={{ height: deckHeight }}
          onMouseLeave={() => !isMobile && setActiveIndex(null)}
          initial={{ opacity: 0, y: 60 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {SERVICES.map((service, index) => {
            const { y, scale } = getWave(index);
            const isActive = isMobile ? false : activeIndex === index;
            return (
              <ServiceCard
                key={service.id}
                service={service}
                isActive={isActive}
                waveY={y}
                waveScale={scale}
                onEnter={() => setActiveIndex(index)}
                onLeave={() => setActiveIndex(null)}
                isMobile={isMobile}
              />
            );
          })}
        </motion.div>

        {/* Mobile Modal Overlay */}
        <AnimatePresence>
          {isMobile && activeIndex !== null && (
            <motion.div
              className="sv-mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => setActiveIndex(null)}
            >
              <motion.div
                className="sv-mobile-overlay-inner"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <ServiceCard
                  service={SERVICES[activeIndex]}
                  isActive={true}
                  waveY={0}
                  waveScale={1}
                  onEnter={() => { }}
                  onLeave={() => setActiveIndex(null)}
                  isMobile={true}
                  isOverlay={true}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        /* ═══════════════════════════════════════════════════════════════
           VEXTIV SERVICES — PREMIUM COLOR-CODED REDESIGN
        ═══════════════════════════════════════════════════════════════ */

        .sv-section {
          position: relative;
          background: #060608;
          padding: 120px 0 100px;
          overflow: hidden;
          font-family: var(--font-body, system-ui, sans-serif);
          color: #fff;
        }

        .sv-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent);
          pointer-events: none;
        }

        .sv-inner {
          max-width: 1500px;
          margin: 0 auto;
          padding: 0 clamp(24px, 4vw, 64px);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ── Header ── */
        .sv-header {
          text-align: center;
          margin-bottom: 80px;
          max-width: 640px;
        }

        .sv-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C8F04D;
          margin-bottom: 20px;
        }

        .sv-title {
          font-family: var(--font-display, system-ui);
          font-size: clamp(36px, 4.5vw, 60px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin-bottom: 20px;
        }

        .sv-title-accent {
          color: #C8F04D;
        }

        .sv-subtitle {
          font-size: 16px;
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
        }

        /* ════════════════════════════════════════════════════
           DECK
        ════════════════════════════════════════════════════ */
        .sv-deck {
          display: flex;
          align-items: flex-end;
          gap: 0;
          height: ${CARD_HEIGHT_D}px;
          perspective: 1200px;
          perspective-origin: 50% 120%;
          cursor: default;
        }

        .sv-card-outer {
          flex-shrink: 0;
          height: ${CARD_HEIGHT_D}px;
          overflow: visible;
          position: relative;
          will-change: transform, width;
        }

        /* ────────────────────────────────────────────────────
           OUTER AMBIENT GLOW (behind the card)
        ──────────────────────────────────────────────────── */
        .sv-outer-glow {
          position: absolute;
          inset: 8px;
          border-radius: 32px;
          opacity: 0;
          filter: blur(28px);
          transition: opacity 0.5s ease, box-shadow 0.5s ease;
          pointer-events: none;
          z-index: 0;
        }

        .sv-outer-glow--active {
          opacity: 0.5;
        }

        /* ────────────────────────────────────────────────────
           CARD SHELL
        ──────────────────────────────────────────────────── */
        .sv-card {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.18);
          overflow: hidden;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
          box-shadow:
            0 2px 0 rgba(255,255,255,0.25) inset,
            0 -1px 0 rgba(0,0,0,0.3) inset,
            0 24px 48px -12px rgba(0,0,0,0.5);
          z-index: 1;
        }

        .sv-card--active {
          border-color: rgba(255,255,255,0.28);
          box-shadow:
            0 2px 0 rgba(255,255,255,0.3) inset,
            0 -1px 0 rgba(0,0,0,0.3) inset,
            0 32px 64px -16px rgba(0,0,0,0.7),
            0 0 0 1px rgba(255,255,255,0.12);
        }

        /* ── Gradient base ── */
        .sv-bg-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg, var(--grad-from) 0%, var(--grad-to) 100%);
          z-index: 0;
        }

        /* ── Inner radial highlight (top-center white gleam) ── */
        .sv-inner-light {
          position: absolute;
          top: -30%;
          left: 50%;
          transform: translateX(-50%);
          width: 140%;
          height: 70%;
          background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.38) 0%, transparent 65%);
          z-index: 1;
          pointer-events: none;
          transition: opacity 0.5s ease;
        }

        .sv-card--active .sv-inner-light {
          opacity: 1.4;
        }

        /* ── Glass overlay ── */
        .sv-glass {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(255,255,255,0.12) 0%,
            rgba(255,255,255,0.04) 40%,
            rgba(0,0,0,0.08) 100%
          );
          z-index: 2;
          pointer-events: none;
        }

        /* ── Noise texture overlay ── */
        .sv-noise {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 128px 128px;
        }

        /* ── Cursor spotlight ── */
        .sv-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 4;
        }

        /* ── Light sweep animation ── */
        .sv-sweep {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(255,255,255,0.2) 50%,
            transparent 70%
          );
          transform: translateX(-100%);
          opacity: 0;
        }

        .sv-sweep--active {
          animation: sv-sweep-anim 0.65s ease forwards;
        }

        @keyframes sv-sweep-anim {
          0%   { transform: translateX(-120%); opacity: 1; }
          100% { transform: translateX(120%);  opacity: 0; }
        }

        /* ────────────────────────────────────────────────────
           COLLAPSED: VERTICAL LABEL
        ──────────────────────────────────────────────────── */
        .sv-label-vertical {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          transition: opacity 0.2s ease;
          z-index: 10;
        }

        .sv-card--active .sv-label-vertical {
          opacity: 0;
          pointer-events: none;
        }

        .sv-label-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          /* Icon SVGs use #0A0A0A strokes directly */
        }

        .sv-label-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: rgba(10, 10, 10, 0.75);
          white-space: nowrap;
        }

        /* ────────────────────────────────────────────────────
           EXPANDED: FULL CONTENT
        ──────────────────────────────────────────────────── */
        .sv-content {
          position: absolute;
          inset: 0;
          padding: 40px 36px;
          display: flex;
          flex-direction: column;
          z-index: 10;
          pointer-events: none;
        }

        .sv-card--active .sv-content {
          pointer-events: auto;
        }

        /* Icon container */
        .sv-content-icon {
          width: 68px;
          height: 68px;
          border-radius: 18px;
          background: rgba(255,255,255,0.22);
          border: 1px solid rgba(255,255,255,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 26px;
          box-shadow:
            0 2px 0 rgba(255,255,255,0.4) inset,
            0 4px 16px rgba(0,0,0,0.12);
          backdrop-filter: blur(4px);
          flex-shrink: 0;
        }

        .sv-content-name {
          font-family: var(--font-display, system-ui);
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.025em;
          margin-bottom: 14px;
          color: #0A0A0A;
          line-height: 1.2;
        }

        .sv-content-desc {
          font-size: 13.5px;
          color: rgba(10, 10, 10, 0.68);
          line-height: 1.65;
          margin-bottom: 28px;
          flex-shrink: 0;
          font-weight: 450;
        }

        .sv-features {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 32px;
          flex: 1;
        }

        .sv-feature {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: rgba(10, 10, 10, 0.8);
          font-weight: 500;
        }

        .sv-feature-icon {
          color: rgba(10, 10, 10, 0.65);
          flex-shrink: 0;
        }

        .sv-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(0,0,0,0.12);
          padding-top: 22px;
          margin-top: auto;
          gap: 12px;
        }

        .sv-stat {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          color: rgba(10, 10, 10, 0.75);
          letter-spacing: 0.01em;
        }

        .sv-stat-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(10,10,10,0.6);
          flex-shrink: 0;
        }

        .sv-cta {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(0,0,0,0.14);
          border: 1px solid rgba(0,0,0,0.2);
          color: #0A0A0A;
          padding: 10px 18px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .sv-cta:hover {
          background: rgba(0,0,0,0.22);
          border-color: rgba(0,0,0,0.32);
          transform: translateY(-1px);
        }

        /* ════════════════════════════════════════════════════
           MOBILE
        ════════════════════════════════════════════════════ */
        @media (max-width: 900px) {
          .sv-section {
            padding: 72px 0 64px;
          }

          .sv-inner {
            padding: 0 0;
            overflow: hidden;
          }

          .sv-header {
            padding: 0 24px;
            margin-bottom: 40px;
          }

          .sv-header .sv-subtitle {
            font-size: 14px;
          }

          .sv-deck {
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
            padding: 0 24px;
            gap: 8px;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .sv-deck::-webkit-scrollbar {
            display: none;
          }

          .sv-card-outer {
            flex-shrink: 0;
          }

          .sv-mobile-overlay {
            position: fixed;
            inset: 0;
            z-index: 1000;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
          }

          .sv-mobile-overlay-inner {
            width: 85vw;
            max-width: 380px;
            height: 440px;
            position: relative;
          }

          .sv-card {
            border-radius: 20px;
          }

          .sv-content {
            padding: 24px 20px;
          }

          .sv-content-icon {
            width: 52px;
            height: 52px;
            border-radius: 14px;
            margin-bottom: 16px;
          }

          .sv-content-icon svg {
            width: 22px;
            height: 22px;
          }

          .sv-content-name {
            font-size: 20px;
            margin-bottom: 10px;
          }

          .sv-content-desc {
            font-size: 12px;
            margin-bottom: 16px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .sv-features {
            gap: 8px;
            margin-bottom: 16px;
          }

          .sv-feature {
            font-size: 12px;
            gap: 8px;
          }

          .sv-bottom {
            padding-top: 16px;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .sv-cta {
            padding: 8px 14px;
            font-size: 11px;
            border-radius: 8px;
          }

          .sv-stat {
            font-size: 11px;
          }

          .sv-label-icon svg {
            width: 18px;
            height: 18px;
          }

          .sv-label-text {
            font-size: 10px;
          }

          .sv-label-vertical {
            gap: 10px;
          }
        }
      `}</style>
    </section>
  );
}
