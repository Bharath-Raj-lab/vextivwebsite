"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useReducer, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

// ─── Nav links ───────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work",     href: "/work"     },
  { label: "Pricing",  href: "/pricing"  },
  { label: "About",    href: "/about"    },
  { label: "Blog",     href: "/blog"     },
] as const;

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <Link href="/" className="navbar__logo" aria-label="Vextiv Studio — home">
      <Image 
        src="/logo.svg" 
        alt="Vextiv Studio" 
        width={120} 
        height={32} 
        style={{ width: "auto", height: "32px" }} 
        priority 
      />
    </Link>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname        = usePathname();
  const prefersReduced  = useReducedMotion();
  const [scrolled, setScrolled] = useReducer((_: boolean, v: boolean) => v, false);
  const [isOpen,   setIsOpen]   = useReducer((_: boolean, v: boolean) => v, false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Trap focus in mobile menu when open
  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Entrance animation (respects prefers-reduced-motion)
  const entranceVariants = {
    hidden:  { opacity: 0, y: prefersReduced ? 0 : -8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <>
      {/* Skip to main content */}
      <a href="#main-content" className="navbar__skip-link">
        Skip to main content
      </a>

      <motion.header
        className={`navbar${scrolled ? " navbar--scrolled" : ""}`}
        role="banner"
        variants={entranceVariants}
        initial="hidden"
        animate="visible"
      >
        <nav className="navbar__inner" aria-label="Main navigation">
          {/* Logo */}
          <Logo />

          {/* Desktop nav links */}
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`navbar__link${pathname === href ? " navbar__link--active" : ""}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <Link href="/contact" className="navbar__cta" aria-label="Book a call with Vextiv">
            Book a Call
          </Link>

          {/* Hamburger */}
          <button
            className="navbar__hamburger"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </button>
        </nav>

        {/* Mobile overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-label="Navigation menu"
              className="navbar__mobile-overlay"
              initial={{ opacity: 0, y: prefersReduced ? 0 : -12 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } }}
              exit={{ opacity: 0, y: prefersReduced ? 0 : -8, transition: { duration: 0.2 } }}
            >
              {/* Close button inside overlay */}
              <button
                ref={closeRef}
                className="navbar__mobile-close"
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
              >
                <X size={22} strokeWidth={2} />
              </button>

              <nav aria-label="Mobile navigation">
                <ul className="navbar__mobile-links" role="list">
                  {NAV_LINKS.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className={`navbar__mobile-link${pathname === href ? " navbar__mobile-link--active" : ""}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="navbar__mobile-cta"
                  onClick={() => setIsOpen(false)}
                >
                  Book a Call
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

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
          z-index: 100;
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
          top: 0;
          left: 0;
          right: 0;
          z-index: 40;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: background 300ms ease, border-color 300ms ease;
        }
        .navbar--scrolled {
          background: var(--bg-base);
          border-color: var(--border-default);
        }

        /* Inner layout */
        .navbar__inner {
          display: flex;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          height: 64px;
          gap: 32px;
        }

        /* Logo */
        .navbar__logo {
          font-family: var(--font-display);
          font-weight: 800;
          letter-spacing: var(--tracking-logo);
          color: var(--text-primary);
          text-decoration: none;
          font-size: 22px;
          flex-shrink: 0;
        }
        .navbar__logo:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
          border-radius: 4px;
        }

        /* Desktop nav links */
        .navbar__links {
          display: flex;
          align-items: center;
          gap: 28px;
          list-style: none;
          margin-left: auto;
        }
        .navbar__link {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 400;
          color: var(--text-very-muted);
          text-decoration: none;
          transition: color 200ms;
          white-space: nowrap;
        }
        .navbar__link:hover {
          color: var(--text-primary);
        }
        .navbar__link--active {
          color: var(--accent);
        }
        .navbar__link:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
          border-radius: 4px;
        }

        /* CTA */
        .navbar__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          background: var(--accent);
          color: var(--bg-base);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 500;
          border-radius: 6px;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: opacity 200ms;
        }
        .navbar__cta:hover {
          opacity: 0.9;
        }
        .navbar__cta:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
          border-radius: 6px;
        }

        /* Hamburger — hidden on desktop */
        .navbar__hamburger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: transparent;
          border: 1px solid var(--border-default);
          border-radius: 8px;
          color: var(--text-primary);
          cursor: pointer;
          flex-shrink: 0;
          margin-left: auto;
          transition: border-color 200ms;
        }
        .navbar__hamburger:hover {
          border-color: var(--border-hover);
        }
        .navbar__hamburger:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
          border-radius: 8px;
        }

        /* Mobile overlay */
        .navbar__mobile-overlay {
          position: fixed;
          inset: 0;
          background: var(--bg-base);
          z-index: 50;
          display: flex;
          flex-direction: column;
          padding: 24px;
        }

        .navbar__mobile-close {
          align-self: flex-end;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: transparent;
          border: 1px solid var(--border-default);
          border-radius: 8px;
          color: var(--text-primary);
          cursor: pointer;
          margin-bottom: 32px;
          transition: border-color 200ms;
        }
        .navbar__mobile-close:hover {
          border-color: var(--border-hover);
        }
        .navbar__mobile-close:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
          border-radius: 8px;
        }

        .navbar__mobile-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .navbar__mobile-link {
          display: block;
          padding: 16px 8px;
          font-family: var(--font-body);
          font-size: 18px;
          font-weight: 400;
          color: var(--text-muted);
          text-decoration: none;
          border-bottom: 1px solid var(--border-subtle);
          transition: color 200ms;
        }
        .navbar__mobile-link:hover {
          color: var(--text-primary);
        }
        .navbar__mobile-link--active {
          color: var(--accent);
        }
        .navbar__mobile-link:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
          border-radius: 4px;
        }

        .navbar__mobile-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 32px;
          padding: 16px 24px;
          background: var(--accent);
          color: var(--bg-base);
          font-family: var(--font-body);
          font-size: 16px;
          font-weight: 500;
          border-radius: 8px;
          text-decoration: none;
          transition: opacity 200ms;
        }
        .navbar__mobile-cta:hover {
          opacity: 0.9;
        }
        .navbar__mobile-cta:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
          border-radius: 8px;
        }

        /* Responsive — show hamburger, hide desktop links + CTA */
        @media (max-width: 767px) {
          .navbar__links,
          .navbar__cta {
            display: none;
          }
          .navbar__hamburger {
            display: flex;
          }
        }

        @media (min-width: 768px) {
          .navbar__hamburger {
            display: none;
          }
          .navbar__mobile-overlay {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
