import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, MessageCircle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function FooterLogo() {
  return (
    <Link href="/" className="footer__logo" aria-label="Vextiv Studio — home">
      <Image 
        src="/logo.svg" 
        alt="Vextiv Studio" 
        width={140} 
        height={36} 
        style={{ width: "auto", height: "36px" }} 
      />
    </Link>
  );
}

function FooterLink({ href, children, external = false }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="footer__nav-link"
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </Link>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const whatsappHref   = `https://wa.me/${whatsappNumber}`;

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer__inner">
        {/* ── Grid ─────────────────────────────────────────────────────── */}
        <div className="footer__grid">

          {/* Column 1 — Brand */}
          <div className="footer__col footer__col--brand">
            <FooterLogo />
            <p className="footer__tagline">
              Building digital experiences for businesses across Hyderabad.
            </p>
          </div>

          {/* Column 2 — Navigation */}
          <div className="footer__col">
            <p className="footer__col-label">Pages</p>
            <nav aria-label="Footer navigation">
              <ul className="footer__nav-list" role="list">
                {[
                  { label: "Home",     href: "/" },
                  { label: "Services", href: "/services" },
                  { label: "Work",     href: "/work" },
                  { label: "Pricing",  href: "/pricing" },
                  { label: "About",    href: "/about" },
                  { label: "Blog",     href: "/blog" },
                  { label: "Careers",  href: "/careers" },
                  { label: "FAQ",      href: "/faq" },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <FooterLink href={href}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3 — Connect */}
          <div className="footer__col">
            <p className="footer__col-label">Connect</p>

            {/* Social icons */}
            <div className="footer__social-row" role="list">
              <a
                href="https://instagram.com/vextivstudio"
                className="footer__social-btn"
                aria-label="Vextiv on Instagram"
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                style={{ color: "var(--instagram)" }}
              >
                <Instagram size={20} strokeWidth={1.75} aria-hidden="true" />
              </a>

              <a
                href="https://linkedin.com/company/vextiv"
                className="footer__social-btn"
                aria-label="Vextiv on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                style={{ color: "var(--linkedin)" }}
              >
                <Linkedin size={20} strokeWidth={1.75} aria-hidden="true" />
              </a>

              <a
                href={whatsappHref}
                className="footer__social-btn"
                aria-label="Vextiv on WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                style={{ color: "var(--whatsapp)" }}
              >
                <MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>

            {/* Google Business */}
            <a
              href="#"
              className="footer__google-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Business
            </a>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────────── */}
        <div className="footer__bottom" role="contentinfo">
          <p className="footer__copy">
            &copy; 2025 Vextiv Studio. All rights reserved.
          </p>
          <div className="footer__legal-links">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
          </div>
        </div>
      </div>

      {/* ─── Styles ──────────────────────────────────────────────────────── */}
      <style>{`
        .footer {
          background: var(--bg-base);
          border-top: 1px solid var(--border-default);
        }

        .footer__inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 24px 40px;
        }

        /* Grid */
        .footer__grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 48px;
        }

        /* Columns */
        .footer__col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Logo */
        .footer__logo {
          font-family: var(--font-display);
          font-weight: 800;
          letter-spacing: var(--tracking-logo);
          color: var(--text-primary);
          font-size: 22px;
          text-decoration: none;
          display: inline-block;
        }
        .footer__logo:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
          border-radius: 4px;
        }

        /* Tagline */
        .footer__tagline {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: var(--leading-body);
          max-width: 280px;
        }

        /* Column label */
        .footer__col-label {
          font-family: var(--font-body);
          font-weight: 400;
          font-size: 12px;
          color: var(--text-very-muted);
          letter-spacing: var(--tracking-eyebrow);
          text-transform: uppercase;
        }

        /* Nav list */
        .footer__nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer__nav-link {
          font-family: var(--font-body);
          font-weight: 400;
          font-size: 13px;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 200ms;
          display: inline-block;
          padding: 2px 0;
        }
        .footer__nav-link:hover {
          color: var(--text-primary);
        }
        .footer__nav-link:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
          border-radius: 4px;
        }

        /* Social row */
        .footer__social-row {
          display: flex;
          gap: 10px;
        }

        .footer__social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: var(--bg-surface-1);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          text-decoration: none;
          transition: border-color 200ms;
          flex-shrink: 0;
        }
        .footer__social-btn:hover {
          border-color: var(--border-hover);
        }
        .footer__social-btn:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 2px;
          border-radius: 8px;
        }

        /* Google Business */
        .footer__google-link {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 400;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 200ms;
          display: inline-block;
          padding: 2px 0;
        }
        .footer__google-link:hover {
          color: var(--text-primary);
        }
        .footer__google-link:focus-visible {
          outline: 2px solid var(--accent-focus);
          outline-offset: 4px;
          border-radius: 4px;
        }

        /* Bottom bar */
        .footer__bottom {
          margin-top: 48px;
          padding-top: 24px;
          border-top: 1px solid var(--border-default);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .footer__copy {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 12px;
          color: var(--text-very-muted);
        }

        .footer__legal-links {
          display: flex;
          gap: 20px;
        }

        /* ── Mobile ──────────────────────────────────────────────────── */
        @media (max-width: 767px) {
          .footer__inner {
            padding: 48px 20px 32px;
          }

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
            gap: 12px;
          }
        }
      `}</style>
    </footer>
  );
}
