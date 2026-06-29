"use client";

import React, { useRef, memo } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ServiceItem } from "./servicesData";
import Link from "next/link";
import { useInViewCss } from "@/hooks/useInViewCss";

export const StickyServices = ({ services }: { services: ServiceItem[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full pb-[10vh]"
    >
      <div id="sticky-services-container" className="flex flex-col gap-0 max-w-[1200px] mx-auto px-4 md:px-8">
        {services.map((service, i) => {
          const targetScale = 1 - (services.length - 1 - i) * 0.04;
          return (
            <ServiceCard
              key={service.id}
              service={service}
              i={i}
              progress={scrollYProgress}
              targetScale={targetScale}
              total={services.length}
            />
          );
        })}
      </div>
    </div>
  );
};

const ServiceCard = memo(({
  service,
  i,
  progress,
  targetScale,
  total
}: {
  service: ServiceItem;
  i: number;
  progress: MotionValue<number>;
  targetScale: number;
  total: number;
}) => {
  const rawScale = useTransform(progress, [i / total, 1], [1, targetScale]);
  const scale = useSpring(rawScale, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { ref, isInView } = useInViewCss<HTMLDivElement>({ threshold: 0, rootMargin: "-50px", once: true });

  return (
    <div id={service.id} ref={ref} className="sticky top-[100px] h-[92vh] lg:h-[85vh] w-full flex items-center justify-center">
      {service.image && (
        <link rel="preload" as="image" href={service.image} />
      )}

      <motion.div
        style={{
          scale,
          willChange: "transform",
          transform: "translateZ(0)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          background: "linear-gradient(135deg, #050505 0%, #0a0a0a 30%, #121212 60%, #080808 100%)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "28px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(255,255,255,0.05)"
        }}
        className={`group w-full h-full relative overflow-hidden flex flex-col lg:flex-row p-6 lg:p-8 gap-6 lg:gap-8 origin-top transition-colors duration-1000 hover:border-white/30 ${isInView ? 'animate-fade-up-lg' : 'opacity-0'}`}
      >
        {/* MOBILE FULL BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0 block lg:hidden">
          {service.image && (
            <div
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{
                backgroundImage: `url('${service.image}')`,
                willChange: "transform",
                transform: "translateZ(0)"
              }}
            />
          )}
          {/* Premium dark cinematic overlay for readability */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/85 to-transparent" />
        </div>

        {/* PREMIUM NOISE TEXTURE */}
        <div
          className="hidden lg:block absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-screen z-0"
          style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MDAnIGhlaWdodD0nNDAwJz4KICA8ZmlsdGVyIGlkPSdub2lzZSc+CiAgICA8ZmVUdXJidWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMC44JyBudW1PY3RhdmVzPSczJyBzdGl0Y2hUaWxlcz0nc3RpdGNoJy8+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgZmlsdGVyPSd1cmwoI25vaXNlKScvPgo8L3N2Zz4=')" }}
        />

        {/* LARGE GRADIENT STREAKS */}
        <div
          className="hidden lg:block absolute inset-0 pointer-events-none z-0 opacity-70 group-hover:opacity-100 transition-opacity duration-1000"
          style={{
            background: "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.08) 65%, transparent 100%)"
          }}
        />

        {/* LARGE GLOWING ORBS */}
        <div
          className="hidden lg:block absolute -top-[100px] -left-[100px] w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none z-0 opacity-70 group-hover:opacity-100 transition-opacity duration-1000"
          style={{ background: "rgba(190,255,0,0.12)" }}
        />
        <div
          className="hidden lg:block absolute -bottom-[100px] -right-[100px] w-[500px] h-[500px] rounded-full blur-[90px] pointer-events-none z-0 opacity-70 group-hover:opacity-100 transition-opacity duration-1000"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />

        {/* VEXTIV ACCENT CORNER */}
        <div className="hidden lg:block absolute top-0 right-0 w-[150px] h-[150px] pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-[#BEFF00] blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
          <div className="absolute top-0 right-0 border-t-[80px] border-l-[80px] border-t-white/10 border-l-transparent group-hover:border-t-[#BEFF00]/30 transition-colors duration-1000" />
        </div>
        {/* BACKGROUND ATMOSPHERE */}

        {/* Dark circular forms for depth (Opacity 2-4%) */}
        <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-black blur-[50px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-black blur-[60px]" />
        </div>

        {/* Layer 2: Flowing White Light Ribbons */}
        <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none opacity-[0.14] group-hover:opacity-[0.24] transition-opacity duration-700">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lightRibbon1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="30%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="70%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lightRibbon2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="40%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="12" />
              </filter>
              <filter id="heavyGlow">
                <feGaussianBlur stdDeviation="25" />
              </filter>
            </defs>

            {/* Primary curved light ribbon sweeping down */}
            <path d="M400,-100 C600,300 200,600 -100,800" fill="none" stroke="url(#lightRibbon1)" strokeWidth="45" filter="url(#softGlow)" />
            <path d="M400,-100 C600,300 200,600 -100,800" fill="none" stroke="url(#lightRibbon1)" strokeWidth="8" filter="blur(2px)" />

            {/* Secondary sweeping arc behind the image */}
            <path d="M700,-100 C900,400 400,600 200,1100" fill="none" stroke="url(#lightRibbon2)" strokeWidth="35" filter="url(#heavyGlow)" opacity="0.8" />
            <path d="M700,-100 C900,400 400,600 200,1100" fill="none" stroke="url(#lightRibbon2)" strokeWidth="6" filter="blur(3px)" />

            {/* Third subtle arc connecting bottom left */}
            <path d="M-100,300 C300,500 600,900 300,1200" fill="none" stroke="url(#lightRibbon1)" strokeWidth="20" filter="url(#heavyGlow)" opacity="0.5" />
          </svg>
        </div>

        {/* Layer 3: Atmospheric Green Lighting */}
        <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity duration-700">
          {/* Top-left glow */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_top_left,rgba(190,255,0,0.08),transparent_60%)]" />
          {/* Top-right glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_top_right,rgba(190,255,0,0.05),transparent_60%)]" />
          {/* Bottom-right glow */}
          <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(190,255,0,0.09),transparent_60%)]" />
        </div>

        {/* LEFT COLUMN: Content */}
        <div className="relative z-10 w-full lg:w-7/12 h-full flex flex-col pr-4 pb-2">
          <div className="mt-auto">
            <div
              className="font-display tabular-nums tracking-tighter leading-none mb-4 font-light"
              style={{ fontSize: "clamp(50px, 7vw, 90px)", color: "rgba(255,255,255,0.95)" }}
            >
              0{i + 1}
            </div>

            <div className="text-[11px] uppercase tracking-[0.2em] text-[#BEFF00]/90 mb-2 font-semibold">
              SERVICE
            </div>

            <h2
              className="font-light font-display leading-[1.15] tracking-tight mb-4"
              style={{ fontSize: "clamp(24px, 2.5vw, 36px)", color: "white" }}
            >
              {service.name}
            </h2>

            <p
              className="text-[13px] md:text-[14px] leading-[1.7] font-light mb-6 max-w-md"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {service.description}
            </p>

            <div className="flex flex-col gap-2.5 mb-8">
              {service.features.map((f, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#BEFF00] flex-shrink-0">
                    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 12.5L10.5 16L17 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[13px] font-light leading-relaxed tracking-wide" style={{ color: "rgba(255,255,255,0.85)" }}>
                    {f.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-2 lg:pt-0">
            <Link
              href="/pricing"
              className="group/btn relative inline-flex items-center gap-3 bg-transparent border border-white/20 rounded-full pl-6 pr-5 py-2.5 transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            >
              <span className="text-white/90 group-hover/btn:text-white font-medium text-[12px] tracking-widest uppercase transition-colors">
                SEE PRICING
              </span>
              <span className="text-[#BEFF00] font-light text-[16px] leading-none mb-[2px] transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px]">
                ↗
              </span>
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Single Premium Image */}
        <div className="relative z-10 w-full lg:w-5/12 h-full hidden lg:block rounded-[20px] overflow-hidden bg-[#0A0A0A] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] group/image">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out group-hover/image:scale-[1.03]"
            style={{
              backgroundImage: `url('${service.image}')`,
              willChange: "transform",
              transform: "translateZ(0)"
            }}
          />
        </div>

      </motion.div>
    </div>
  );
});
ServiceCard.displayName = "ServiceCard";
