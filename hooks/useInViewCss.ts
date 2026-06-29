import { useEffect, useState, useRef } from 'react';

interface UseInViewCssOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useInViewCss<T extends Element = HTMLDivElement>(
  options: UseInViewCssOptions = { once: true, threshold: 0 }
) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options.once) {
            observer.unobserve(currentRef);
          }
        } else if (!options.once) {
          setIsInView(false);
        }
      },
      {
        threshold: options.threshold,
        rootMargin: options.rootMargin || "0px",
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options.threshold, options.rootMargin, options.once]);

  return { ref, isInView };
}
