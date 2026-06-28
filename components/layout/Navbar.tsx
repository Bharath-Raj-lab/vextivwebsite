"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useReducer, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import Logo from "@/components/ui/Logo";

// ─── Nav links ───────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const [isOpen, setIsOpen] = useReducer((_: boolean, v: boolean) => v, false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 0) return; // ignore rubber banding

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Trap focus in mobile menu when open
  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();

    const overlay = document.getElementById("mobile-menu");

    const focusableSelectors =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusable = overlay
      ? Array.from(overlay.querySelectorAll<HTMLElement>(focusableSelectors))
      : [];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const trapTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (!first || !last) return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("keydown", trapTab);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("keydown", trapTab);
    };
  }, [isOpen]);

  // Return focus to hamburger when overlay closes
  useEffect(() => {
    if (!isOpen) {
      hamburgerRef.current?.focus();
    }
  }, [isOpen]);

  // Entrance animation (respects prefers-reduced-motion)
  const entranceVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : -8, x: "-50%" },
    visible: { opacity: 1, y: 0, x: "-50%", transition: { duration: 0.4, ease: "easeOut" } },
    hiddenTop: { opacity: 0, y: -100, x: "-50%", transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <>
      {/* Skip to main content */}
      <a href="#main-content" className="navbar__skip-link">
        Skip to main content
      </a>

      <motion.header
        className="navbar"
        role="banner"
        variants={entranceVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hiddenTop"}
      >
        <nav className="navbar__inner" aria-label="Main navigation">
          {/* Logo + Text */}
          <Logo className="navbar__brand" imageClassName="navbar__brand-logo" textClassName="navbar__brand-text" priority />

          {/* Center Navigation Capsule */}
          <ul className="navbar__links-capsule" role="list">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <li key={href} style={{ position: "relative" }}>
                  <Link
                    href={href}
                    className={`navbar__capsule-link${isActive ? " navbar__capsule-link--active" : ""}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-pill"
                        className="navbar__capsule-link-bg"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="navbar__capsule-link-text">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Side: CTA Capsule & Mobile Hamburger */}
          <div className="navbar__actions">
            <Link
              href="/contact"
              className="navbar__cta-capsule btn-premium"
              aria-label="Book a call with Vextiv"
              onClick={() => trackEvent('cta_click', { label: 'Book a Call', location: 'navbar' })}
            >
              Book a Call
            </Link>

            {/* Hamburger */}
            <button
              ref={hamburgerRef}
              className="navbar__hamburger"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M4 6H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={isOpen ? { d: "M6 6L18 18" } : { d: "M4 6H20" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.path
                  d="M4 12H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.path
                  d="M4 18H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={isOpen ? { d: "M6 18L18 6" } : { d: "M4 18H20" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </svg>
            </button>
          </div>
        </nav>

      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="navbar__mobile-overlay"
            initial={{ opacity: 0, y: prefersReduced ? 0 : -12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : -8, transition: { duration: 0.2 } }}
          >
            <nav aria-label="Mobile navigation" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <motion.ul 
                className="navbar__mobile-links" 
                role="list"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
              >
                {NAV_LINKS.map(({ label, href }) => (
                  <motion.li 
                    key={href}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 20 }
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <Link
                      href={href}
                      className={`navbar__mobile-link${pathname === href ? " navbar__mobile-link--active" : ""}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Styles ─────────────────────────────────────────────────────── */}
      <style>{`
        /* Skip link */
        .navbar__skip-link {
          position: absolute;
          top: -100%;
          left: var(--skip-left, 1rem);
          padding: 8px 16px;
          background: var(--accent);
          color: var(--bg-base);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          border-radius: 4px;
          text-decoration: none;
          z-index: 1000;
          transition: top 0.15s;
        }
        .navbar__skip-link:focus-visible {
          position: fixed;
          top: 1rem;
          left: 1rem;
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
        }

        /* Navbar wrapper */
        .navbar {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 1500px;
          padding: 0 clamp(24px, 4vw, 64px);
          z-index: 50;
          pointer-events: none;
        }

        /* Inner layout */
        .navbar__inner {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          pointer-events: auto;
          z-index: 50;
        }

        /* Brand Area (Left) */
        .navbar__brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          transition: opacity 200ms;
          flex-shrink: 0;
        }
        .navbar__brand:hover {
          opacity: 0.85;
        }
        .navbar__brand:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
          border-radius: 4px;
        }
        .navbar__brand-text {
          font-family: var(--font-display, sans-serif);
          font-weight: 400;
          font-size: 20px;
          color: #ffffff;
          letter-spacing: 0.5px;
        }

        /* Center Navigation Capsule */
        .navbar__links-capsule {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          height: 52px;
          padding: 0 16px;
          border-radius: 9999px;
          background: rgba(20, 20, 20, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 24px -4px rgba(0, 0, 0, 0.2);
        }

        .navbar__capsule-link {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          padding: 0 16px;
          font-family: var(--font-body, sans-serif);
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.65);
          text-decoration: none;
          border-radius: 9999px;
          transition: color 200ms, background-color 200ms;
        }

        .navbar__capsule-link:hover {
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.06);
        }

        .navbar__capsule-link--active {
          color: #ffffff;
        }

        .navbar__capsule-link-bg {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          z-index: 0;
        }

        .navbar__capsule-link-text {
          position: relative;
          z-index: 1;
        }

        .navbar__capsule-link:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
        }

        /* Right Actions */
        .navbar__actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        /* Book a Call Capsule */
        .navbar__cta-capsule {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 52px;
          padding: 0 24px;
          background: var(--accent);
          color: #000000;
          font-family: var(--font-body, sans-serif);
          font-size: 14px;
          font-weight: 600;
          border-radius: 9999px;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 4px 16px -4px rgba(var(--accent-rgb, 0, 255, 0), 0.3);
          transition: transform 200ms, filter 200ms;
        }
        .navbar__cta-capsule:hover {
          transform: scale(1.03);
          filter: brightness(1.1);
        }
        .navbar__cta-capsule:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
        }

        /* Hamburger — hidden on desktop */
        .navbar__hamburger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          background: rgba(20, 20, 20, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 9999px;
          color: #ffffff;
          cursor: pointer;
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .navbar__hamburger:hover {
          background-color: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }
        .navbar__hamburger:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
        }

        /* Mobile overlay */
        .navbar__mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          z-index: 40;
          display: flex;
          flex-direction: column;
          padding: 24px;
          pointer-events: auto;
        }

        .navbar__mobile-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          text-align: center;
        }

        .navbar__mobile-link {
          display: inline-block;
          font-family: var(--font-display, sans-serif);
          font-size: clamp(32px, 8vw, 48px);
          font-weight: 700;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          transition: color 300ms, transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
          padding: 8px 16px;
        }
        .navbar__mobile-link:hover {
          color: #ffffff;
          transform: scale(1.05);
        }
        .navbar__mobile-link--active {
          color: #ffffff;
        }
        .navbar__mobile-link:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
          border-radius: 8px;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .navbar__brand-text {
            display: none;
          }
          .navbar__links-capsule {
            padding: 0 8px;
          }
          .navbar__capsule-link {
            padding: 0 12px;
          }
        }

        @media (max-width: 860px) {
          .navbar__links-capsule {
            display: none;
          }
          .navbar__hamburger {
            display: flex;
          }
          .navbar__brand-text {
            display: block; /* Show text again since capsule is gone */
          }
        }

        @media (max-width: 767px) {
          .navbar {
            width: 100%;
            padding: 0 16px;
          }
          .navbar__cta-capsule {
            display: flex; /* Keeping it visible on mobile */
            height: 44px;
            padding: 0 16px;
            font-size: 13px;
          }
          .navbar__hamburger {
            width: 48px;
            height: 48px;
          }
        }

        /* Extremely small screens */
        @media (max-width: 420px) {
           .navbar__brand-text {
             display: block;
             font-size: 16px;
           }
           .navbar__brand-logo {
             height: 24px !important;
             width: auto !important;
           }
           .navbar__actions {
             gap: 8px;
           }
        }
      `}</style>
    </>
  );
}
