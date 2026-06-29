"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, MotionValue, useReducedMotion } from "framer-motion";
import Link from "next/link";

// ─── Ease ────────────────────────────────────────────────────────────────
const EXPO = [0.16, 1, 0.3, 1] as const;

// ══════════════════════════════════════════════════════════════════════════
// Shared footer: description + CTA — fades in after typography animation
// ══════════════════════════════════════════════════════════════════════════
function CardFooter({
  visible,
  delay = 0,
  description,
  cta,
  light,
  prefersReducedMotion,
  href,
}: {
  visible: boolean;
  delay?: number;
  description: string;
  cta: string;
  light?: boolean;
  prefersReducedMotion: boolean | null;
  href?: string;
}) {
  const content = (
    <motion.span
      className={light ? "wv-cta wv-cta--light" : "wv-cta"}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
      style={{ display: "inline-flex" }}
    >
      {cta}
      <span className="wv-arrow">→</span>
    </motion.span>
  );

  return (
    <motion.div
      className="wv-footer"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={prefersReducedMotion ? {} : (visible ? { opacity: 1, y: 0 } : {})}
      transition={{ duration: 0.75, delay, ease: EXPO }}
    >
      <p className={light ? "wv-desc wv-desc--light" : "wv-desc"}>{description}</p>
      {href ? <Link href={href} style={{ textDecoration: 'none' }}>{content}</Link> : content}
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// Shared Reactive Letter for Cards 3 and 4
// ══════════════════════════════════════════════════════════════════════════
interface ReactiveLetterProps {
  ch: string;
  i: number;
  after: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  isHovered: boolean;
  isTapped: boolean;
  prefersReducedMotion: boolean | null;
  className?: string;
  initial?: React.ComponentPropsWithoutRef<typeof motion.span>["initial"];
  animate?: React.ComponentPropsWithoutRef<typeof motion.span>["animate"];
  transition?: React.ComponentPropsWithoutRef<typeof motion.span>["transition"];
  style?: React.CSSProperties;
}

function ReactiveLetter({
  ch,
  i,
  after,
  mouseX,
  mouseY,
  isHovered,
  isTapped,
  prefersReducedMotion,
  className,
  initial,
  animate,
  transition,
  style
}: ReactiveLetterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  useEffect(() => {
    if (!after || !ref.current) return;

    // If reduced motion is preferred, never move letters
    if (prefersReducedMotion) {
      x.set(0);
      y.set(0);
      return;
    }

    if (isTapped) {
      const varianceX = 15 + (i % 3) * 6;
      const varianceY = 10 + (i % 2) * 8;
      x.set(i % 2 === 0 ? varianceX : -varianceX);
      y.set(i % 3 === 0 ? varianceY : -varianceY);
      return;
    }

    if (!isHovered) {
      x.set(0);
      y.set(0);
      return;
    }

    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = mouseX.get() - centerX;
      const dy = mouseY.get() - centerY;

      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 250;

      if (distance < maxDist && distance > 0) {
        const intensity = 1 - distance / maxDist;
        const dirX = dx / distance;
        const dirY = dy / distance;

        const varianceX = 15 + (i % 3) * 5;
        const varianceY = 10 + (i % 2) * 10;

        const moveX = -dirX * intensity * varianceX;
        const moveY = -dirY * intensity * varianceY;

        x.set(moveX);
        y.set(moveY);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const unsubX = mouseX.on("change", update);
    const unsubY = mouseY.on("change", update);

    return () => {
      unsubX();
      unsubY();
    };
  }, [after, isHovered, isTapped, mouseX, mouseY, x, y, i, prefersReducedMotion]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={prefersReducedMotion ? false : initial}
      animate={prefersReducedMotion ? {} : animate}
      transition={transition}
      style={{ ...style, x: prefersReducedMotion ? 0 : springX, y: prefersReducedMotion ? 0 : springY, display: "inline-flex", whiteSpace: "pre" }}
    >
      {ch}
    </motion.span>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// CARD 1 · Letters fall from above and assemble
// Surface: #0a0a0a black  ·  Type: white + lime
// ══════════════════════════════════════════════════════════════════════════
function Card1({ visible }: { visible: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const word = "STRATEGY".split("");
  const [after, setAfter] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const tapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!visible) { setAfter(false); return; }
    const t = setTimeout(() => setAfter(true), 1400);
    return () => clearTimeout(t);
  }, [visible]);

  const handleTap = () => {
    if (prefersReducedMotion) return;
    setIsTapped(true);
    if (tapTimeout.current) clearTimeout(tapTimeout.current);
    tapTimeout.current = setTimeout(() => setIsTapped(false), 800);
  };

  return (
    <motion.div 
      className="wv-card wv-card-black" 
      whileHover={prefersReducedMotion ? undefined : "hover"}
      onTap={prefersReducedMotion ? undefined : handleTap}
    >
      <div className="wv-noise" />

      {/* ── Stage ── */}
      <div className="wv-stage wv-stage-fall">
        <span className="wv-num">01</span>

        <div className="wv-fall-row">
          {word.map((ch, i) => (
            <motion.span
              key={i}
              className="wv-fall-letter"
              initial={prefersReducedMotion ? false : { y: -40, opacity: 0, x: 0, rotate: 0 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : isTapped 
                    ? { y: i % 2 === 0 ? -16 : 16, x: i % 3 === 0 ? 14 : -14, rotate: i % 2 === 0 ? 4 : -4, opacity: 1 }
                    : (visible ? { y: 0, x: 0, rotate: 0, opacity: 1 } : { y: -40, x: 0, rotate: 0, opacity: 0 })
              }
              variants={prefersReducedMotion ? undefined : { hover: { y: i % 2 === 0 ? -16 : 16, x: i % 3 === 0 ? 14 : -14, rotate: i % 2 === 0 ? 4 : -4 } }}
              transition={{
                type: "spring", damping: 14, stiffness: 100, delay: visible && !isTapped && !prefersReducedMotion ? 0.06 * i : 0
              }}
            >
              {ch}
            </motion.span>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="wv-body">
        <motion.h3
          className="wv-title"
          initial={prefersReducedMotion ? false : { opacity: 0, x: -18 }}
          animate={prefersReducedMotion ? {} : (after ? { opacity: 1, x: 0 } : {})}
          transition={{ duration: 0.6, ease: EXPO }}
        >
          Ideas that hit<br />
          <em>without apology.</em>
        </motion.h3>
        <CardFooter
          visible={after}
          delay={0.12}
          description="We don't do timid. Every creative decision is made to stop the scroll and demand attention."
          cta="See the work"
          prefersReducedMotion={prefersReducedMotion}
          href="/work"
        />
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// CARD 2 · Letters slide from four compass directions
// Surface: #f05a00 orange  ·  Type: black
// ══════════════════════════════════════════════════════════════════════════
function Card2({ visible }: { visible: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const word = "DESIGN".split("");
  const [after, setAfter] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const tapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!visible) { setAfter(false); return; }
    const t = setTimeout(() => setAfter(true), 1200);
    return () => clearTimeout(t);
  }, [visible]);

  const handleTap = () => {
    if (prefersReducedMotion) return;
    setIsTapped(true);
    if (tapTimeout.current) clearTimeout(tapTimeout.current);
    tapTimeout.current = setTimeout(() => setIsTapped(false), 800);
  };

  return (
    <motion.div 
      className="wv-card wv-card-orange" 
      whileHover={prefersReducedMotion ? undefined : "hover"}
      onTap={prefersReducedMotion ? undefined : handleTap}
    >
      <div className="wv-noise" />

      <div className="wv-stage wv-stage-slide">
        <span className="wv-num wv-num--dark">02</span>

        <div className="wv-slide-row">
          {word.map((ch, i) => (
            <motion.span
              key={i}
              className="wv-slide-letter"
              initial={prefersReducedMotion ? false : { x: i < 3 ? -40 : 40, opacity: 0, y: 0, rotate: 0 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : isTapped 
                    ? { x: i % 2 === 0 ? 14 : -14, y: i % 3 === 0 ? 12 : -12, rotate: i % 2 === 0 ? 4 : -4, opacity: 1 }
                    : (visible ? { x: 0, y: 0, rotate: 0, opacity: 1 } : { x: i < 3 ? -40 : 40, opacity: 0, y: 0, rotate: 0 })
              }
              variants={prefersReducedMotion ? undefined : { hover: { x: i % 2 === 0 ? 14 : -14, y: i % 3 === 0 ? 12 : -12, rotate: i % 2 === 0 ? 4 : -4 } }}
              transition={{
                type: "spring", damping: 15, stiffness: 100, delay: visible && !isTapped && !prefersReducedMotion ? 0.1 + i * 0.03 : 0
              }}
              style={{ marginRight: i === 2 ? 6 : 1 }}
            >
              {ch}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="wv-body">
        <motion.h3
          className="wv-title wv-title--dark"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={prefersReducedMotion ? {} : (after ? { opacity: 1, y: 0 } : {})}
          transition={{ duration: 0.6, ease: EXPO }}
        >
          Results that<br />
          compound.
        </motion.h3>
        <CardFooter
          visible={after}
          delay={0.12}
          description="Growth isn't an accident. We engineer momentum that builds on itself every single month."
          cta="See the numbers"
          light
          prefersReducedMotion={prefersReducedMotion}
          href="/work"
        />
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// CARD 3 · Typewriter reveal
// Surface: #f5f0e8 cream  ·  Type: deep charcoal + burnt orange cursor
// ══════════════════════════════════════════════════════════════════════════
function Card3({ visible }: { visible: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const word = "GROWTH".split("");
  const [after, setAfter] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const tapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!visible) { setAfter(false); return; }
    const t = setTimeout(() => setAfter(true), 1200);
    return () => clearTimeout(t);
  }, [visible]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (prefersReducedMotion) return;
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleTap = () => {
    if (prefersReducedMotion) return;
    setIsTapped(true);
    if (tapTimeout.current) clearTimeout(tapTimeout.current);
    tapTimeout.current = setTimeout(() => setIsTapped(false), 800);
  };

  return (
    <motion.div 
      className="wv-card wv-card-cream" 
      whileHover={prefersReducedMotion ? undefined : "hover"}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => !prefersReducedMotion && setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onPointerDown={() => !prefersReducedMotion && setIsHovered(true)}
      onPointerUp={() => setIsHovered(false)}
      onPointerCancel={() => setIsHovered(false)}
      onTap={prefersReducedMotion ? undefined : handleTap}
    >
      <div className="wv-stage wv-stage-type">
        <motion.span
          className="wv-num wv-num--burnt"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={prefersReducedMotion ? {} : (visible ? { opacity: 1 } : {})}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          03 / Brand
        </motion.span>

        <div className="wv-type-block">
          {word.map((ch, i) => (
             <ReactiveLetter
               key={i}
               ch={ch}
               i={i}
               after={after}
               mouseX={mouseX}
               mouseY={mouseY}
               isHovered={isHovered}
               isTapped={isTapped}
               prefersReducedMotion={prefersReducedMotion}
               className="wv-type-text"
               initial={{ opacity: 0, scale: 0.8 }}
               animate={visible ? { opacity: 1, scale: 1 } : {}}
               transition={{
                 opacity: { duration: 0.4, delay: 0.08 * i },
                 scale: { type: "spring", damping: 14, stiffness: 100, delay: 0.08 * i }
               }}
             />
          ))}
        </div>
      </div>

      <div className="wv-body">
        <motion.h3
          className="wv-title wv-title--dark"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={prefersReducedMotion ? {} : (after ? { opacity: 1, y: 0 } : {})}
          transition={{ duration: 0.6, ease: EXPO }}
        >
          Identity that<br />
          stays.
        </motion.h3>
        <CardFooter
          visible={after}
          delay={0.12}
          description="Logos, tone, visual systems — crafted so that every touchpoint is unmistakably you."
          cta="Explore branding"
          light
          prefersReducedMotion={prefersReducedMotion}
          href="/services"
        />
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// CARD 4 · Clip-path masked text reveal (wipe left → right per line)
// Surface: #100505 deep crimson  ·  Type: white + red accent stripe
// ══════════════════════════════════════════════════════════════════════════
function Card4({ visible }: { visible: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const word = "SPEED".split("");
  const [after, setAfter] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const tapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!visible) { setAfter(false); return; }
    const t = setTimeout(() => setAfter(true), 1200);
    return () => clearTimeout(t);
  }, [visible]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (prefersReducedMotion) return;
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleTap = () => {
    if (prefersReducedMotion) return;
    setIsTapped(true);
    if (tapTimeout.current) clearTimeout(tapTimeout.current);
    tapTimeout.current = setTimeout(() => setIsTapped(false), 800);
  };

  return (
    <motion.div 
      className="wv-card wv-card-red" 
      whileHover={prefersReducedMotion ? undefined : "hover"}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => !prefersReducedMotion && setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onPointerDown={() => !prefersReducedMotion && setIsHovered(true)}
      onPointerUp={() => setIsHovered(false)}
      onPointerCancel={() => setIsHovered(false)}
      onTap={prefersReducedMotion ? undefined : handleTap}
    >
      <div className="wv-noise" />

      <div className="wv-stage wv-stage-mask">
        <motion.span
          className="wv-num wv-num--red"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={prefersReducedMotion ? {} : (visible ? { opacity: 1 } : {})}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          04
        </motion.span>

        <div className="wv-mask-lines">
          <div className="wv-mask-wrap" style={{ overflow: after ? 'visible' : 'hidden' }}>
            <motion.span
              className="wv-mask-line"
              initial={prefersReducedMotion ? false : { y: "100%" }}
              animate={prefersReducedMotion ? {} : (visible ? { y: "0%" } : {})}
              transition={{
                y: { type: "spring", damping: 16, stiffness: 90, delay: 0.2 }
              }}
            >
              {word.map((ch, i) => (
                <ReactiveLetter
                  key={i}
                  ch={ch}
                  i={i}
                  after={after}
                  mouseX={mouseX}
                  mouseY={mouseY}
                  isHovered={isHovered}
                  isTapped={isTapped}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </motion.span>
          </div>
        </div>
      </div>

      <div className="wv-body">
        <motion.h3
          className="wv-title"
          initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
          animate={prefersReducedMotion ? {} : (after ? { opacity: 1, x: 0 } : {})}
          transition={{ duration: 0.6, ease: EXPO }}
        >
          Execution at<br />
          <em className="wv-em-red">full velocity.</em>
        </motion.h3>
        <CardFooter
          visible={after}
          delay={0.12}
          description="We ship fast, iterate faster. No months of planning — real work starts on day one."
          cta="Start today"
          prefersReducedMotion={prefersReducedMotion}
          href="/contact"
        />
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// CARD 5 · Letters spin/rotate and settle into place
// Surface: #ffffff white  ·  Type: black
// Spans full width as a cinematic wide banner
// ══════════════════════════════════════════════════════════════════════════
function Card5({ visible }: { visible: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const word = "RESULTS".split("");
  const [after, setAfter] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const tapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!visible) { setAfter(false); return; }
    const t = setTimeout(() => setAfter(true), 1500);
    return () => clearTimeout(t);
  }, [visible]);

  const handleTap = () => {
    if (prefersReducedMotion) return;
    setIsTapped(true);
    if (tapTimeout.current) clearTimeout(tapTimeout.current);
    tapTimeout.current = setTimeout(() => setIsTapped(false), 800);
  };

  return (
    <motion.div 
      className="wv-card wv-card-white wv-card-wide" 
      whileHover={prefersReducedMotion ? undefined : "hover"}
      onTap={prefersReducedMotion ? undefined : handleTap}
    >
      {/* Left: rotating letters */}
      <div className="wv-stage wv-stage-spin">
        <span className="wv-num wv-num--faint">05</span>

        <div className="wv-spin-row">
          {word.map((ch, i) => (
            <motion.span
              key={i}
              className="wv-spin-letter"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 30, x: 0, rotate: 0 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : isTapped 
                    ? { y: i % 2 === 0 ? -16 : 16, x: i % 3 === 0 ? 14 : -14, rotate: i % 2 === 0 ? 5 : -5, opacity: 1 }
                    : (visible ? { opacity: 1, y: 0, x: 0, rotate: 0 } : { opacity: 0, y: 30, x: 0, rotate: 0 })
              }
              variants={prefersReducedMotion ? undefined : { hover: { y: i % 2 === 0 ? -16 : 16, x: i % 3 === 0 ? 14 : -14, rotate: i % 2 === 0 ? 5 : -5 } }}
              transition={{
                type: "spring", damping: 14, stiffness: 110, delay: visible && !isTapped && !prefersReducedMotion ? 0.08 * i : 0
              }}
            >
              {ch}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <motion.div
        className="wv-wide-divider"
        initial={prefersReducedMotion ? false : { scaleY: 0 }}
        animate={prefersReducedMotion ? {} : (visible ? { scaleY: 1 } : {})}
        transition={{ duration: 0.8, delay: 0.5, ease: EXPO }}
        style={{ originY: 0.5 }}
      />

      {/* Right: body copy */}
      <div className="wv-body wv-body-wide">
        <motion.h3
          className="wv-title wv-title--dark"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={prefersReducedMotion ? {} : (after ? { opacity: 1, y: 0 } : {})}
          transition={{ duration: 0.6, ease: EXPO }}
        >
          Proof over<br />
          promises.
        </motion.h3>
        <CardFooter
          visible={after}
          delay={0.12}
          description="Every client gets a dedicated dashboard. Every metric is tracked. No smoke, no mirrors."
          cta="View case studies"
          light
          prefersReducedMotion={prefersReducedMotion}
          href="/work"
        />
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION ROOT
// ══════════════════════════════════════════════════════════════════════════
export default function WhyVextiv() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView    = useInView(sectionRef, { margin: "-80px" });

  const c1Ref = useRef<HTMLDivElement>(null);
  const c2Ref = useRef<HTMLDivElement>(null);
  const c3Ref = useRef<HTMLDivElement>(null);
  const c4Ref = useRef<HTMLDivElement>(null);
  const c5Ref = useRef<HTMLDivElement>(null);

  const c1 = useInView(c1Ref, { once: true, margin: "-60px" });
  const c2 = useInView(c2Ref, { once: true, margin: "-60px" });
  const c3 = useInView(c3Ref, { once: true, margin: "-60px" });
  const c4 = useInView(c4Ref, { once: true, margin: "-60px" });
  const c5 = useInView(c5Ref, { once: true, margin: "-60px" });

  return (
    <section
      id="why-vextiv"
      ref={sectionRef}
      className="wv-section"
      aria-labelledby="wv-heading"
    >
      <div className="wv-inner">

        {/* ── Section header ── */}
        <motion.div
          className="wv-hdr"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
          animate={prefersReducedMotion ? {} : (isInView ? { opacity: 1, y: 0 } : {})}
          transition={{ duration: 0.9, ease: EXPO }}
        >
          <motion.p
            className="wv-eyebrow"
            initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
            animate={prefersReducedMotion ? {} : (isInView ? { opacity: 1, x: 0 } : {})}
            transition={{ duration: 0.6, delay: 0.15, ease: EXPO }}
          >
            Why Vextiv
          </motion.p>
          <h2 id="wv-heading" className="wv-h2">
            <motion.span
              className="wv-h2-a"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              animate={prefersReducedMotion ? {} : (isInView ? { opacity: 1, y: 0 } : {})}
              transition={{ duration: 0.8, delay: 0.22, ease: EXPO }}
            >
              Five reasons
            </motion.span>
            <motion.span
              className="wv-h2-b"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              animate={prefersReducedMotion ? {} : (isInView ? { opacity: 1, y: 0 } : {})}
              transition={{ duration: 0.8, delay: 0.34, ease: EXPO }}
            >
              clients stay.
            </motion.span>
          </h2>
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="wv-bento">

          {/* ROW 1 — Card1 (wide) + Card2 (tall, right) */}
          <motion.div
            ref={c1Ref}
            className="wv-cell wv-cell-1"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
            animate={prefersReducedMotion ? {} : (isInView ? { opacity: 1, y: 0 } : {})}
            transition={{ duration: 0.7, delay: 0.08, ease: EXPO }}
          >
            <Card1 visible={c1} />
          </motion.div>

          <motion.div
            ref={c2Ref}
            className="wv-cell wv-cell-2"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
            animate={prefersReducedMotion ? {} : (isInView ? { opacity: 1, y: 0 } : {})}
            transition={{ duration: 0.7, delay: 0.18, ease: EXPO }}
          >
            <Card2 visible={c2} />
          </motion.div>

          {/* ROW 2 — Card3 + Card4 (left side, below Card1) */}
          <motion.div
            ref={c3Ref}
            className="wv-cell wv-cell-3"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
            animate={prefersReducedMotion ? {} : (isInView ? { opacity: 1, y: 0 } : {})}
            transition={{ duration: 0.7, delay: 0.28, ease: EXPO }}
          >
            <Card3 visible={c3} />
          </motion.div>

          <motion.div
            ref={c4Ref}
            className="wv-cell wv-cell-4"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
            animate={prefersReducedMotion ? {} : (isInView ? { opacity: 1, y: 0 } : {})}
            transition={{ duration: 0.7, delay: 0.38, ease: EXPO }}
          >
            <Card4 visible={c4} />
          </motion.div>

          {/* ROW 3 — Card5 full-width banner */}
          <motion.div
            ref={c5Ref}
            className="wv-cell wv-cell-5"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
            animate={prefersReducedMotion ? {} : (isInView ? { opacity: 1, y: 0 } : {})}
            transition={{ duration: 0.7, delay: 0.48, ease: EXPO }}
          >
            <Card5 visible={c5} />
          </motion.div>

        </div>
      </div>

      {/* ══════════════ STYLES ══════════════ */}
      <style>{`

        /* ─────────────────────────────────────
           SECTION
        ───────────────────────────────────── */
        .wv-section {
          background: #09090b;
          padding: 40px clamp(24px, 4vw, 64px) 40px;
          overflow: hidden;
          position: relative;
        }
        .wv-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 65% 45% at 12% 25%, rgba(255,90,0,0.045) 0%, transparent 65%),
            radial-gradient(ellipse 55% 55% at 88% 75%, rgba(200,240,77,0.03) 0%, transparent 60%);
          pointer-events: none;
        }
        .wv-inner {
          max-width: 1500px;
          margin: 0 auto;
        }

        /* ─────────────────────────────────────
           HEADER
        ───────────────────────────────────── */
        .wv-hdr { margin-bottom: 48px; }

        .wv-eyebrow {
          font-family: var(--font-body, sans-serif);
          font-size: var(--text-2xs);
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C8F04D;
          margin-bottom: 20px;
        }
        .wv-h2 {
          font-family: var(--font-display, system-ui);
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .wv-h2-a {
          display: block;
          font-size: clamp(36px, 4vw, 56px);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.0;
          color: #F0EEE8;
        }
        .wv-h2-b {
          display: block;
          font-size: clamp(36px, 4vw, 56px);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.0;
          color: rgba(240,238,232,0.22);
        }

        /* ─────────────────────────────────────
           BENTO GRID  — Ultra Compact 3x2 Layout
           ┌──────────┬──────────┬──────────┐
           │  Card 1  │  Card 2  │  Card 3  │ row 1
           ├──────────┼──────────┴──────────┤
           │  Card 4  │    Card 5 (wide)    │ row 2
           └──────────┴─────────────────────┘
        ───────────────────────────────────── */
        .wv-bento {
          display: grid;
          grid-template-columns: repeat(3, minmax(220px, 320px));
          justify-content: center;
          gap: 12px;
        }
        .wv-cell { display: flex; }

        .wv-cell-1 { grid-column: 1; grid-row: 1; }
        .wv-cell-2 { grid-column: 2; grid-row: 1; }
        .wv-cell-3 { grid-column: 3; grid-row: 1; }
        .wv-cell-4 { grid-column: 1; grid-row: 2; }
        .wv-cell-5 { grid-column: 2 / 4; grid-row: 2; }

        /* ─────────────────────────────────────
           CARD BASE
        ───────────────────────────────────── */
        .wv-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          width: 100%;
          display: flex;
          flex-direction: column;
          min-height: 200px;
          cursor: default;
        }

        /* Themes */
        .wv-card-black  { background: #0a0a0a;   border: 1px solid rgba(255,255,255,0.07); }
        .wv-card-orange { background: #f05a00;   border: none; }
        .wv-card-cream  { background: #f5f0e8;   border: none; }
        .wv-card-red    { background: #100505;   border: 1px solid rgba(160,20,20,0.35); }
        .wv-card-white  { background: #ffffff;   border: none; }

        /* Card 5 is a wide horizontal card */
        .wv-card-wide {
          flex-direction: row;
          min-height: 180px;
        }

        /* ─────────────────────────────────────
           NOISE OVERLAY
        ───────────────────────────────────── */
        .wv-noise {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px;
        }

        /* ─────────────────────────────────────
           STAGE (typography animation area)
        ───────────────────────────────────── */
        .wv-stage {
          position: relative;
          flex: 1;
          overflow: hidden;
          z-index: 2;
        }

        /* ─────────────────────────────────────
           CARD BODY
        ───────────────────────────────────── */
        .wv-body {
          position: relative;
          z-index: 3;
          padding: 12px 16px 16px;
          margin-top: auto;
        }
        .wv-body-wide {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-top: 0;
          padding: 16px 20px;
        }

        .wv-title {
          font-family: var(--font-display, system-ui);
          font-size: clamp(14px, 1.4vw, 18px);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.18;
          color: #F0EEE8;
          margin-bottom: 12px;
        }
        .wv-title em {
          font-style: italic;
          color: #C8F04D;
        }
        .wv-title--dark { color: #0d0d0d; }
        .wv-em-red { color: #ff5555 !important; }

        /* ─────────────────────────────────────
           FOOTER
        ───────────────────────────────────── */
        .wv-footer {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .wv-desc {
          font-family: var(--font-body, sans-serif);
          font-size: 11px;
          line-height: 1.5;
          color: rgba(240,238,232,0.5);
          max-width: 240px;
        }
        .wv-desc--light { color: rgba(10,10,10,0.52); }

        .wv-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body, sans-serif);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #C8F04D;
          background: transparent;
          border: 1px solid rgba(200,240,77,0.28);
          padding: 6px 12px;
          border-radius: 100px;
          cursor: pointer;
          align-self: flex-start;
          transition: background 0.25s, border-color 0.25s;
        }
        .wv-cta:hover { background: rgba(200,240,77,0.09); border-color: rgba(200,240,77,0.55); }

        .wv-cta--light {
          color: #0d0d0d;
          border-color: rgba(10,10,10,0.22);
        }
        .wv-cta--light:hover {
          background: rgba(10,10,10,0.07);
          border-color: rgba(10,10,10,0.45);
        }

        .wv-arrow { transition: transform 0.2s ease; }
        .wv-cta:hover .wv-arrow { transform: translateX(4px); }

        /* ─────────────────────────────────────
           SHARED NUMBER LABEL
        ───────────────────────────────────── */
        .wv-num {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.18);
          z-index: 3;
        }
        .wv-num--dark  { color: rgba(10,10,10,0.28); }
        .wv-num--burnt { color: rgba(180,70,0,0.4);  left: 20px; right: auto; }
        .wv-num--red   { color: rgba(255,80,80,0.38); }
        .wv-num--faint { color: rgba(10,10,10,0.18); }

        /* ═══════════════════════════════════
           CARD 1 · Fall animation
        ═══════════════════════════════════ */
        .wv-stage-fall {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px 16px 8px;
          gap: 0;
        }
        .wv-fall-row {
          display: inline-flex;
          align-items: baseline;
          position: relative;
        }
        .wv-fall-letter {
          font-family: var(--font-display, system-ui);
          font-size: clamp(16px, 2.5vw, 26px);
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 1;
          color: #ffffff;
          display: inline-flex;
          white-space: pre;
          will-change: transform;
        }
        .wv-fall-rule {
          width: 100%;
          max-width: 240px;
          height: 3px;
          background: #C8F04D;
          border-radius: 2px;
          margin-top: 10px;
        }

        /* ═══════════════════════════════════
           CARD 2 · Slide animation
        ═══════════════════════════════════ */
        .wv-stage-slide {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px 16px 8px;
          gap: 0;
        }
        .wv-slide-row {
          display: inline-flex;
          align-items: baseline;
          position: relative;
          z-index: 2;
        }
        .wv-slide-letter {
          font-family: var(--font-display, system-ui);
          font-size: clamp(20px, 3.5vw, 32px);
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 1;
          color: #0d0d0d;
          display: inline-flex;
          white-space: pre;
          will-change: transform;
        }
        .wv-orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 200px;
          margin: -100px 0 0 -100px;
          border-radius: 50%;
          border: 1.5px dashed rgba(0,0,0,0.12);
          pointer-events: none;
          z-index: 1;
        }

        /* ═══════════════════════════════════
           CARD 3 · Typewriter
        ═══════════════════════════════════ */
        .wv-stage-type {
          padding: 20px 16px 8px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .wv-type-block {
          display: inline-flex;
          align-items: flex-start;
          margin-top: 16px;
        }
        .wv-type-text {
          font-family: var(--font-display, system-ui);
          font-size: clamp(14px, 1.6vw, 22px);
          font-weight: 800;
          letter-spacing: 0.02em;
          line-height: 1.25;
          color: #1a120a;
          display: inline-flex;
          white-space: pre;
          will-change: transform;
        }
        .wv-cursor {
          font-family: var(--font-display, system-ui);
          font-size: clamp(14px, 1.6vw, 22px);
          font-weight: 300;
          color: #c05000;
          margin-left: 2px;
          line-height: 1.25;
        }
        .wv-type-rule {
          height: 2px;
          width: 32px;
          background: #c05000;
          border-radius: 2px;
          margin-top: 12px;
        }

        /* ═══════════════════════════════════
           CARD 4 · Clip-mask reveal
        ═══════════════════════════════════ */
        .wv-stage-mask {
          padding: 20px 16px 8px;
          display: flex;
          flex-direction: column;
        }
        .wv-mask-lines {
          display: inline-flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 12px;
        }
        .wv-mask-wrap { overflow: hidden; display: inline-flex; }
        .wv-mask-line {
          font-family: var(--font-display, system-ui);
          font-size: clamp(16px, 1.8vw, 26px);
          font-weight: 900;
          letter-spacing: 0.02em;
          line-height: 1.1;
          color: #ffffff;
          display: inline-flex;
          white-space: pre;
          will-change: clip-path;
        }
        .wv-stripe {
          position: absolute;
          top: 0;
          right: 16px;
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, #cc2222 30%, #ff4444 70%, transparent);
          border-radius: 2px;
          opacity: 0.55;
          z-index: 1;
        }

        /* ═══════════════════════════════════
           CARD 5 · Spin/rotate settle
        ═══════════════════════════════════ */
        .wv-stage-spin {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px 24px;
          gap: 0;
          min-width: 0;
        }
        .wv-spin-row {
          display: inline-flex;
          align-items: baseline;
        }
        .wv-spin-letter {
          font-family: var(--font-display, system-ui);
          font-size: clamp(20px, 3.5vw, 34px);
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 1;
          color: #0d0d0d;
          display: inline-flex;
          white-space: pre;
          will-change: transform;
        }
        .wv-spin-sub {
          display: block;
          font-size: 9px;
          font-weight: 700;
          color: rgba(10,10,10,0.28);
          text-align: center;
          margin-top: 6px;
        }
        .wv-wide-divider {
          width: 1px;
          align-self: stretch;
          background: rgba(10,10,10,0.1);
          flex-shrink: 0;
          margin: 16px 0;
        }

        /* ─────────────────────────────────────
           RESPONSIVE
        ───────────────────────────────────── */
        @media (max-width: 1024px) {
          .wv-bento {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto auto;
          }
          .wv-cell-1 { grid-column: 1 / 3; grid-row: 1; }
          .wv-cell-2 { grid-column: 1;     grid-row: 2; }
          .wv-cell-3 { grid-column: 2;     grid-row: 2; }
          .wv-cell-4 { grid-column: 1;     grid-row: 3; }
          .wv-cell-5 { grid-column: 2;     grid-row: 3; }
          .wv-card-wide { flex-direction: column; min-height: 420px; }
          .wv-wide-divider { width: 100%; height: 1px; margin: 0 32px; align-self: auto; }
          .wv-body-wide { padding: 28px 32px 32px; }
        }

        @media (max-width: 767px) {
          .wv-section { padding: 32px 8px 32px; }
          .wv-hdr     { margin-bottom: 20px; }

          .wv-bento {
            grid-template-columns: 1fr 1fr;
            max-width: 100%;
            gap: 6px;
            padding: 0 4px;
          }
          .wv-cell-1 { grid-column: 1; grid-row: 1; }
          .wv-cell-2 { grid-column: 2; grid-row: 1; }
          .wv-cell-3 { grid-column: 1; grid-row: 2; }
          .wv-cell-4 { grid-column: 2; grid-row: 2; }
          .wv-cell-5 { grid-column: 1 / 3; grid-row: 3; }
          
          .wv-card, .wv-card-wide { min-height: 125px; flex-direction: column; }
          .wv-wide-divider { width: calc(100% - 24px); height: 1px; margin: 0 12px; align-self: auto; }
          
          .wv-body { padding: 6px 10px 10px; }
          .wv-body-wide { padding: 8px 12px 12px; }
          .wv-title { font-size: 11px; margin-bottom: 4px; }
          .wv-desc { font-size: 9px; line-height: 1.3; }
          .wv-cta { font-size: 8px; padding: 4px 6px; }
          .wv-num { font-size: 8px; top: 8px; right: 8px; left: auto; }
          .wv-num--burnt { left: 8px; right: auto; }
          
          .wv-stage-fall, .wv-stage-slide, .wv-stage-type, .wv-stage-mask, .wv-stage-spin {
             padding: 10px 6px 6px;
          }

          .wv-fall-letter  { font-size: 20px; }
          .wv-slide-letter { font-size: 20px; }
          .wv-mask-line    { font-size: 15px; }
          .wv-spin-letter  { font-size: 22px; }
          .wv-type-text    { font-size: 14px; }

          .wv-orbit { width: 90px; height: 90px; margin: -45px 0 0 -45px; }
        }

      `}</style>
    </section>
  );
}
