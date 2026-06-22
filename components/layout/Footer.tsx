"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Instagram,
  Linkedin,
  Facebook,
  MessageCircle,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.08 },
  }),
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function FooterLink({ href, children, external = false }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="footer__nav-link"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="footer__nav-link-arrow">→</span>
      {children}
    </Link>
  );
}

function SocialIcon({
  href,
  label,
  children,
  isWhatsApp = false,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  isWhatsApp?: boolean;
}) {
  return (
    <a
      href={href}
      className="footer__social-btn"
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        if (isWhatsApp) {
          trackEvent('whatsapp_click', { location: 'footer' });
        } else {
          trackEvent('outbound_link_click', { href });
        }
      }}
    >
      {children}
    </a>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const whatsappHref = `https://wa.me/${whatsappNumber}`;

  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  const SERVICES = [
    { label: "Website Development", href: "/services" },
    { label: "Web Application Development", href: "/services" },
    { label: "UI/UX Design", href: "/services" },
    { label: "E-Commerce Solutions", href: "/services" },
    { label: "SEO Optimization", href: "/services" },
    { label: "Website Maintenance", href: "/services" },
    { label: "Business Automation", href: "/services" },
  ];

  const COMPANY = [
    { label: "About Us", href: "/about" },
    { label: "Our Work", href: "/work" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "FAQs", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="footer" aria-label="Site footer">
      {/* ── Radial glow background effect ──────────────────────────────── */}
      <div className="footer__bg-glow" aria-hidden="true" />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — Main Footer Grid
      ══════════════════════════════════════════════════════════════════ */}
      <div className="footer__inner footer__main" ref={gridRef}>
        <div className="footer__grid">

          {/* Column 1 — Brand */}
          <motion.div
            className="footer__col footer__col--brand"
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={0}
          >
            <Link href="/" className="footer__logo-row" aria-label="Vextiv Studio — home">
              <Image
                src="/logo.svg"
                alt="Vextiv Studio"
                width={40}
                height={40}
                style={{ width: "auto", height: "36px" }}
              />
              <span className="footer__logo-text">VE<span className="footer__logo-accent">X</span>TIV</span>
            </Link>
            <p className="footer__tagline">
              Building modern websites, web applications, and digital solutions
              for businesses ready to grow.
            </p>

            {/* Social Icons */}
            <div className="footer__social-row" role="list" aria-label="Social media links">
              <SocialIcon href="https://instagram.com/vextivstudio" label="Vextiv on Instagram">
                <Instagram size={18} strokeWidth={1.75} aria-hidden="true" />
              </SocialIcon>
              <SocialIcon href="https://linkedin.com/company/vextiv" label="Vextiv on LinkedIn">
                <Linkedin size={18} strokeWidth={1.75} aria-hidden="true" />
              </SocialIcon>
              <SocialIcon href="https://facebook.com/vextivstudio" label="Vextiv on Facebook">
                <Facebook size={18} strokeWidth={1.75} aria-hidden="true" />
              </SocialIcon>
              <SocialIcon href={whatsappHref} label="Vextiv on WhatsApp" isWhatsApp>
                <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />
              </SocialIcon>
            </div>
          </motion.div>

          {/* Column 2 — Services */}
          <motion.div
            className="footer__col"
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={1}
          >
            <p className="footer__col-label">Services</p>
            <nav aria-label="Services navigation">
              <ul className="footer__nav-list" role="list">
                {SERVICES.map(({ label, href }) => (
                  <li key={label}>
                    <FooterLink href={href}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Column 3 — Company */}
          <motion.div
            className="footer__col"
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={2}
          >
            <p className="footer__col-label">Company</p>
            <nav aria-label="Company navigation">
              <ul className="footer__nav-list" role="list">
                {COMPANY.map(({ label, href }) => (
                  <li key={label}>
                    <FooterLink href={href}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Column 4 — Contact */}
          <motion.div
            className="footer__col"
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={3}
          >
            <p className="footer__col-label">Contact</p>
            <ul className="footer__contact-list" role="list">
              <li className="footer__contact-item">
                <MapPin size={15} strokeWidth={1.75} aria-hidden="true" className="footer__contact-icon" />
                <span>Hyderabad, India</span>
              </li>
              <li className="footer__contact-item">
                <Mail size={15} strokeWidth={1.75} aria-hidden="true" className="footer__contact-icon" />
                <a href="mailto:hello@vextiv.tech" className="footer__contact-link">
                  hello@vextiv.tech
                </a>
              </li>
              <li className="footer__contact-item">
                <Phone size={15} strokeWidth={1.75} aria-hidden="true" className="footer__contact-icon" />
                <a href="tel:+91XXXXXXXXXX" className="footer__contact-link">
                  +91 XXXXX XXXXX
                </a>
              </li>
            </ul>

            <Link
              href="/contact"
              className="footer__schedule-btn"
              id="footer-schedule-btn"
              onClick={() => trackEvent('cta_click', { label: 'Book a Free Consultation', location: 'footer' })}
            >
              Book a Free Consultation
              <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
            </Link>
          </motion.div>

        </div>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 2 — Bottom Bar
        ══════════════════════════════════════════════════════════════ */}
        <div className="footer__bottom" role="contentinfo">
          <p className="footer__copy">
            © 2026 Vextiv. All Rights Reserved.
          </p>
          <div className="footer__legal-links">
            <Link href="/privacy" className="footer__legal-link">Privacy Policy</Link>
            <Link href="/terms" className="footer__legal-link">Terms of Service</Link>

            <div className="footer__legal-divider" aria-hidden="true" />

            <button className="footer__locale-btn" aria-label="Change Language">
              🌐 English (IN)
            </button>
            <button className="footer__locale-btn" aria-label="Change Currency">
              ₹ INR
            </button>
          </div>
        </div>
      </div>

      {/* ─── Styles ────────────────────────────────────────────────────────── */}
      <style>{`
        /* ── Base ──────────────────────────────────────────────────────── */
        .footer {
          position: relative;
          background: #000000;
          overflow: hidden;
        }

        /* ── Radial glow ─────────────────────────────────────────────── */
        .footer__bg-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 55% at 50% 0%, rgba(200, 240, 77, 0.055) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 15% 100%, rgba(200, 240, 77, 0.025) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Inner container ─────────────────────────────────────────── */
        .footer__inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
          padding: 0 clamp(24px, 4vw, 64px);
        }

        /* ══════════════════════════════════════════════════════════════
           SECTION 1 — Grid
        ══════════════════════════════════════════════════════════════ */
        .footer__main {
          padding-top: 72px;
        }

        .footer__grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: 48px 40px;
        }

        /* ── Columns ─────────────────────────────────────────────────── */
        .footer__col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .footer__col--brand {
          gap: 18px;
        }

        /* ── Logo ────────────────────────────────────────────────────── */
        .footer__logo-row {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .footer__logo-row:hover { opacity: 0.85; }
        .footer__logo-row:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
          border-radius: 4px;
        }
        
        .footer__logo-text {
          color: #FFFFFF;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 24px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .footer__logo-accent {
          color: var(--accent);
        }

        /* ── Tagline ─────────────────────────────────────────────────── */
        .footer__tagline {
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.42);
          line-height: 1.7;
          max-width: 280px;
        }

        /* ── Social row ──────────────────────────────────────────────── */
        .footer__social-row {
          display: flex;
          gap: 10px;
          margin-top: 4px;
        }

        .footer__social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(8px);
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
          flex-shrink: 0;
        }

        .footer__social-btn:hover {
          background: #C8F04D;
          border-color: #C8F04D;
          color: #000000;
          transform: translateY(-2px);
        }

        .footer__social-btn:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
        }

        /* ── Column label ────────────────────────────────────────────── */
        .footer__col-label {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.30);
          padding-bottom: 4px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        /* ── Nav list ────────────────────────────────────────────────── */
        .footer__nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .footer__nav-link {
          display: flex;
          align-items: center;
          gap: 0px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.48);
          text-decoration: none;
          padding: 5px 0;
          transition: color 0.3s ease, gap 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .footer__nav-link-arrow {
          display: inline-block;
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          color: var(--accent);
          font-size: 12px;
          margin-right: 0px;
          width: 0;
          overflow: hidden;
          transition: opacity 0.3s ease, transform 0.3s ease, width 0.3s ease, margin-right 0.3s ease;
        }

        .footer__nav-link:hover {
          color: #ffffff;
          gap: 6px;
        }

        .footer__nav-link:hover .footer__nav-link-arrow {
          opacity: 1;
          transform: translateX(0);
          width: 14px;
          margin-right: 4px;
        }

        .footer__nav-link:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
          border-radius: 2px;
        }

        /* ── Contact list ────────────────────────────────────────────── */
        .footer__contact-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer__contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.48);
          line-height: 1.5;
        }

        .footer__contact-icon {
          color: var(--accent);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .footer__contact-link {
          color: rgba(255, 255, 255, 0.48);
          text-decoration: none;
          transition: color 0.25s ease;
        }

        .footer__contact-link:hover {
          color: #C8F04D;
        }

        .footer__contact-link:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
          border-radius: 2px;
        }

        /* ── Schedule button ─────────────────────────────────────────── */
        .footer__schedule-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border: 1px solid rgba(200, 240, 77, 0.22);
          border-radius: 9999px;
          background: rgba(200, 240, 77, 0.05);
          color: #C8F04D;
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
          width: fit-content;
          margin-top: 4px;
        }

        .footer__schedule-btn:hover {
          background: #C8F04D;
          border-color: #C8F04D;
          color: #000000;
          transform: translateY(-1px);
        }

        .footer__schedule-btn:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
        }

        /* ══════════════════════════════════════════════════════════════
           SECTION 2 — Bottom Bar
        ══════════════════════════════════════════════════════════════ */
        .footer__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 24px 0 40px;
          margin-top: 56px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer__copy {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.25);
        }

        .footer__legal-links {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
        }

        .footer__legal-link {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.25);
          text-decoration: none;
          transition: color 0.25s ease;
        }

        .footer__legal-link:hover {
          color: rgba(255, 255, 255, 0.70);
        }

        .footer__legal-link:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
          border-radius: 2px;
        }

        .footer__legal-divider {
          width: 1px;
          height: 12px;
          background: rgba(255, 255, 255, 0.15);
        }

        .footer__locale-btn {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.25);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.25s ease;
          padding: 0;
        }

        .footer__locale-btn:hover {
          color: var(--accent);
        }

        .footer__locale-btn:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
          border-radius: 2px;
        }

        /* ══════════════════════════════════════════════════════════════
           RESPONSIVE — Tablet (≤ 1024px)
        ══════════════════════════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .footer__grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px 32px;
          }
        }

        /* ══════════════════════════════════════════════════════════════
           RESPONSIVE — Mobile (≤ 640px)
        ══════════════════════════════════════════════════════════════ */
        @media (max-width: 640px) {
          .footer__grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          .footer__tagline {
            max-width: 100%;
          }

          .footer__bottom {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 14px;
            padding-bottom: 32px;
            margin-top: 40px;
          }

          .footer__legal-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 16px;
          }

          .footer__legal-divider {
            display: none;
          }

          .footer__main {
            padding-top: 56px;
          }
        }
      `}</style>
    </footer>
  );
}
