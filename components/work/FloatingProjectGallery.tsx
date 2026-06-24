'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

interface FloatingProjectGalleryProps {
  images: string[];
  title: string;
}

export default function FloatingProjectGallery({ images, title }: FloatingProjectGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          // Center origin, scale from -0.5 to +0.5
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          container.style.setProperty('--mouse-x', x.toString());
          container.style.setProperty('--mouse-y', y.toString());
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <section className="w-full max-w-[1600px] mx-auto py-24 px-4 md:px-8 overflow-hidden">
      
      {/* Mobile & Tablet: Vertical Stack */}
      <div className="lg:hidden flex flex-col gap-8">
        {images.map((img, i) => (
          <div key={i} className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-[var(--border-subtle)]">
             <Image 
                src={img} 
                alt={`${title} showcase ${i + 1}`} 
                fill 
                className="object-cover"
                sizes="(max-width: 1024px) 100vw"
              />
          </div>
        ))}
      </div>

      {/* Desktop: Floating Composition */}
      <div 
        ref={containerRef}
        className="hidden lg:block relative w-full h-[900px] [perspective:1000px]"
        style={{
          '--mouse-x': '0',
          '--mouse-y': '0',
        } as React.CSSProperties}
      >
        {/* 1. Center Hero (55-65% dominance, highest z-index) */}
        {images[0] && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[58%] aspect-[16/10] z-30 rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-[var(--border-subtle)] transition-transform duration-700 ease-out"
               style={{ transform: 'translate(calc(-50% + var(--mouse-x) * 20px), calc(-50% + var(--mouse-y) * 20px))' }}>
            <Image src={images[0]} alt={`${title} hero showcase`} fill className="object-cover" sizes="60vw" priority />
          </div>
        )}

        {/* 2. Left Supporting */}
        {images[1] && (
          <div className="absolute top-[15%] left-[2%] w-[25%] aspect-[4/5] z-10 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-[var(--border-subtle)] transition-transform duration-700 ease-out"
               style={{ transform: 'translate(calc(var(--mouse-x) * 10px), calc(var(--mouse-y) * 10px))' }}>
            <Image src={images[1]} alt={`${title} left showcase`} fill className="object-cover" sizes="30vw" />
          </div>
        )}

        {/* 3. Right Supporting */}
        {images[2] && (
          <div className="absolute top-[25%] right-[2%] w-[28%] aspect-[1/1] z-20 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-[var(--border-subtle)] transition-transform duration-700 ease-out"
               style={{ transform: 'translate(calc(var(--mouse-x) * 15px), calc(var(--mouse-y) * 15px))' }}>
            <Image src={images[2]} alt={`${title} right showcase`} fill className="object-cover" sizes="30vw" />
          </div>
        )}

        {/* 4. Top Detail */}
        {images[3] && (
          <div className="absolute top-[2%] left-[40%] w-[20%] aspect-[3/2] z-0 rounded-3xl overflow-hidden shadow-lg border border-[var(--border-subtle)] opacity-90 transition-transform duration-700 ease-out"
               style={{ transform: 'translate(calc(var(--mouse-x) * -10px), calc(var(--mouse-y) * -10px))' }}>
            <Image src={images[3]} alt={`${title} top showcase`} fill className="object-cover" sizes="25vw" />
          </div>
        )}

        {/* 5. Bottom 1 */}
        {images[4] && (
          <div className="absolute bottom-[5%] left-[20%] w-[22%] aspect-[4/3] z-20 rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.3)] border border-[var(--border-subtle)] transition-transform duration-700 ease-out"
               style={{ transform: 'translate(calc(var(--mouse-x) * 12px), calc(var(--mouse-y) * 12px))' }}>
            <Image src={images[4]} alt={`${title} bottom showcase 1`} fill className="object-cover" sizes="25vw" />
          </div>
        )}

        {/* 6. Bottom 2 */}
        {images[5] && (
          <div className="absolute bottom-[2%] right-[28%] w-[18%] aspect-[3/4] z-10 rounded-3xl overflow-hidden shadow-lg border border-[var(--border-subtle)] opacity-95 transition-transform duration-700 ease-out"
               style={{ transform: 'translate(calc(var(--mouse-x) * -5px), calc(var(--mouse-y) * -5px))' }}>
            <Image src={images[5]} alt={`${title} bottom showcase 2`} fill className="object-cover" sizes="20vw" />
          </div>
        )}
      </div>

    </section>
  );
}
