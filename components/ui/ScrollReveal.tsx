"use client";

import React, { HTMLAttributes } from "react";
import { useInViewCss } from "@/hooks/useInViewCss";

interface ScrollRevealProps extends HTMLAttributes<HTMLDivElement> {
  animationClass?: string;
  delayClass?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  animationClass = "animate-fade-in",
  delayClass = "",
  threshold = 0,
  rootMargin = "0px",
  once = true,
  ...props
}: ScrollRevealProps) {
  const { ref, isInView } = useInViewCss<HTMLDivElement>({ threshold, rootMargin, once });

  return (
    <div
      ref={ref}
      className={`${className} ${isInView ? `${animationClass} ${delayClass}` : "opacity-0"}`}
      {...props}
    >
      {children}
    </div>
  );
}
