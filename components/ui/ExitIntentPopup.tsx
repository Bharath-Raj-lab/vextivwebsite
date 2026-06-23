"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const ctaRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname === "/thank-you" || pathname === "/audit") {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 0) {
        const hasShown = sessionStorage.getItem("vextiv_exit_shown");
        if (!hasShown) {
          sessionStorage.setItem("vextiv_exit_shown", "true");
          setIsVisible(true);
        }
      }
    };

    const isMobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    if (!isMobile) {
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [pathname]);

  useEffect(() => {
    if (isVisible) {
      previousFocusRef.current = document.activeElement as HTMLElement;

      let rafId: number;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsVisible(false);
          return;
        }

        if (e.key === "Tab") {
          if (!popupRef.current) return;

          const focusableElements = popupRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );

          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      rafId = requestAnimationFrame(() => {
        if (ctaRef.current) {
          ctaRef.current.focus();
        }
      });

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        cancelAnimationFrame(rafId);
      };
    } else {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleCtaClick = () => {
    trackEvent("audit_cta_click");
    router.push("/audit");
  };

  const backdropProps = shouldReduceMotion
    ? { style: { opacity: 1 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2 },
      };

  const cardProps = shouldReduceMotion
    ? {
        initial: { opacity: 1, scale: 1, x: "-50%", y: "-50%" },
        animate: { opacity: 1, scale: 1, x: "-50%", y: "-50%" },
        transition: { duration: 0 },
      }
    : {
        initial: { scale: 0.95, opacity: 0, x: "-50%", y: "-50%" },
        animate: { scale: 1, opacity: 1, x: "-50%", y: "-50%" },
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <motion.div
      {...backdropProps}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(8,8,8,0.85)",
        zIndex: 50,
        ...(shouldReduceMotion ? { opacity: 1 } : {}),
      }}
      onClick={() => setIsVisible(false)}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-popup-heading"
        aria-describedby="exit-popup-desc"
        ref={popupRef}
        {...cardProps}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          maxWidth: "480px",
          width: "calc(100% - 48px)",
          backgroundColor: "var(--surface-2)",
          border: "1px solid var(--accent-border-hover)",
          borderRadius: "16px",
          padding: "40px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-muted)",
          }}
          aria-label="Close popup"
          onClick={() => setIsVisible(false)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <p
          style={{
            fontSize: "var(--text-2xs)",
            letterSpacing: "0.18em",
            color: "var(--accent)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 500,
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          WAIT BEFORE YOU GO
        </p>

        <h2
          id="exit-popup-heading"
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontWeight: 700,
            fontSize: "28px",
            color: "var(--text-primary)",
            marginBottom: "16px",
            lineHeight: 1.2,
          }}
        >
          Get a Free Website Audit
        </h2>

        <p
          id="exit-popup-desc"
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 300,
            fontSize: "14px",
            color: "var(--text-secondary)",
            marginBottom: "32px",
            lineHeight: 1.5,
          }}
        >
          We&apos;ll review your website and tell you exactly what&apos;s holding back your growth. No cost, no obligation.
        </p>

        <button
          ref={ctaRef}
          onClick={handleCtaClick}
          style={{
            width: "100%",
            backgroundColor: "var(--accent)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 500,
            fontSize: "15px",
            padding: "16px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "16px",
          }}
        >
          Get My Free Audit
        </button>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => setIsVisible(false)}
            style={{
              background: "none",
              border: "none",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              color: "var(--text-muted)",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            No thanks
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
