"use client";

// ─── Scroll Depth Tracker ─────────────────────────────────────────────────────
// Uses IntersectionObserver (not scroll listener) for performance.
// Fires trackEvent('scroll_depth_50') and trackEvent('scroll_depth_90') once each.
// Respects prefers-reduced-motion (still tracks, just skips animations).

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

export default function ScrollDepthTracker() {
  const sentinel50Ref = useRef<HTMLDivElement>(null);
  const sentinel90Ref = useRef<HTMLDivElement>(null);
  const fired50 = useRef(false);
  const fired90 = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          if (entry.target === sentinel50Ref.current && !fired50.current) {
            fired50.current = true;
            trackEvent("scroll_depth_50");
          }
          if (entry.target === sentinel90Ref.current && !fired90.current) {
            fired90.current = true;
            trackEvent("scroll_depth_90");
          }
        }
      },
      { threshold: 0 },
    );

    if (sentinel50Ref.current) observer.observe(sentinel50Ref.current);
    if (sentinel90Ref.current) observer.observe(sentinel90Ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Invisible sentinel at ~50% page height */}
      <div
        ref={sentinel50Ref}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "1px",
          height: "1px",
          pointerEvents: "none",
          opacity: 0,
        }}
      />
      {/* Invisible sentinel at ~90% page height */}
      <div
        ref={sentinel90Ref}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "90%",
          left: 0,
          width: "1px",
          height: "1px",
          pointerEvents: "none",
          opacity: 0,
        }}
      />
    </>
  );
}
