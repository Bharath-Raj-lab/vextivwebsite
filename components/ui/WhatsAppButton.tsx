"use client";

import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

// Pages where the WhatsApp button must not appear (PRD §5.7, §5.11)
const EXCLUDED_PATHS = ["/thank-you", "/audit"];

// Inline WhatsApp SVG logo — lucide-react does not ship a WhatsApp icon.
// Source: official WhatsApp brand assets (simplified path).
function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      width="26"
      height="26"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const pathname = usePathname();

  // Do not render on excluded pages
  if (EXCLUDED_PATHS.includes(pathname)) return null;

  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  if (!phoneNumber) {
    if (typeof window !== "undefined") {
      console.warn(
        "[WhatsAppButton] NEXT_PUBLIC_WHATSAPP_NUMBER is not set. " +
          "The WhatsApp button will render as disabled. " +
          "Set this env var in your .env.local to enable it."
      );
    }
  }

  const href = phoneNumber
    ? `https://wa.me/91${phoneNumber}?text=Hi%20Vextiv%2C%20I%27d%20like%20to%20discuss%20a%20project`
    : undefined;

  const handleClick = () => {
    trackEvent("whatsapp_click");
  };

  return (
    <>
      <style>{`
        @keyframes wa-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 color-mix(in srgb, var(--whatsapp) 60%, transparent);
          }
          50% {
            box-shadow: 0 0 0 10px color-mix(in srgb, var(--whatsapp) 0%, transparent);
          }
        }

        .wa-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: var(--whatsapp);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.2s ease, opacity 0.2s ease;
          animation: wa-pulse 2.4s ease-in-out infinite;
        }

        .wa-btn:hover {
          transform: scale(1.1);
        }

        .wa-btn:focus-visible {
          outline: 3px solid var(--whatsapp);
          outline-offset: 3px;
        }

        .wa-btn--disabled {
          opacity: 0.45;
          cursor: not-allowed;
          pointer-events: none;
          animation: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .wa-btn {
            animation: none;
          }
        }
      `}</style>

      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-btn"
          aria-label="Chat with Vextiv on WhatsApp"
          onClick={handleClick}
        >
          <WhatsAppIcon />
        </a>
      ) : (
        <span
          className="wa-btn wa-btn--disabled"
          aria-label="Chat with Vextiv on WhatsApp (unavailable)"
          aria-disabled="true"
          role="img"
        >
          <WhatsAppIcon />
        </span>
      )}
    </>
  );
}
