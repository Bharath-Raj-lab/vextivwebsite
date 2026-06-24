"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface InteractiveProjectGalleryProps {
  images: string[];
}

const getDesktopStyle = (index: number) => {
  const styles = [
    { top: "15%", left: "20%", width: "45%", height: "70%", zIndex: 10 },
    { top: "5%", left: "55%", width: "35%", height: "45%", zIndex: 5 },
    { top: "50%", left: "5%", width: "35%", height: "45%", zIndex: 15 },
    { top: "60%", left: "50%", width: "40%", height: "35%", zIndex: 20 },
    { top: "10%", left: "10%", width: "30%", height: "35%", zIndex: 8 },
    { top: "35%", left: "70%", width: "25%", height: "35%", zIndex: 12 },
  ];
  return styles[index % styles.length];
};

export default function InteractiveProjectGallery({ images }: InteractiveProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Desktop Drag-to-Scroll State
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const openLightbox = (index: number) => {
    // Prevent opening lightbox if user was just dragging
    if (isDragging) return;
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  // Touch Handlers for Swipe (Mobile gallery & Lightbox)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) nextImage();
    else if (diff < -50) prevImage();
    setTouchStartX(null);
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(false); // reset on down
    if (scrollContainerRef.current) {
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return; // Only if left mouse button is held
    e.preventDefault();
    setIsDragging(true); // they are actively dragging
    if (scrollContainerRef.current) {
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const chunkedImages = Array.from({ length: Math.ceil(images.length / 6) }, (_, i) =>
    images.slice(i * 6, i * 6 + 6)
  );

  if (!images || images.length === 0) return null;

  return (
    <section className="mb-24 w-full">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-10 text-center">Gallery</h2>

      {/* Floating Animation CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }

        @keyframes float-0 { 0%, 100% { translate: 0px 0px 0px; } 50% { translate: 2px -5px 0px; } }
        @keyframes float-1 { 0%, 100% { translate: 0px 0px 0px; } 50% { translate: -3px 4px 0px; } }
        @keyframes float-2 { 0%, 100% { translate: 0px 0px 0px; } 50% { translate: 3px 3px 0px; } }
        @keyframes float-3 { 0%, 100% { translate: 0px 0px 0px; } 50% { translate: -2px -4px 0px; } }
        @keyframes float-4 { 0%, 100% { translate: 0px 0px 0px; } 50% { translate: 0px -6px 0px; } }
        @keyframes float-5 { 0%, 100% { translate: 0px 0px 0px; } 50% { translate: -2px 5px 0px; } }

        .float-anim-0 { animation: float-0 10s ease-in-out infinite; }
        .float-anim-1 { animation: float-1 12s ease-in-out infinite 1s; }
        .float-anim-2 { animation: float-2 14s ease-in-out infinite 2s; }
        .float-anim-3 { animation: float-3 11s ease-in-out infinite 0.5s; }
        .float-anim-4 { animation: float-4 13s ease-in-out infinite 1.5s; }
        .float-anim-5 { animation: float-5 10.5s ease-in-out infinite 2.5s; }

        .float-anim-0:hover,
        .float-anim-1:hover,
        .float-anim-2:hover,
        .float-anim-3:hover,
        .float-anim-4:hover,
        .float-anim-5:hover {
          animation-play-state: paused;
        }
      ` }} />

      {/* DESKTOP COLLAGE VIEW (Hidden on Mobile) */}
      <div
        ref={scrollContainerRef}
        className={`no-scrollbar hidden md:flex overflow-x-auto h-[600px] lg:h-[800px] rounded-3xl mb-8 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollBehavior: isDragging ? "auto" : "smooth" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setTimeout(() => setIsDragging(false), 100)} // Delay to prevent click on drop
        onMouseLeave={() => setIsDragging(false)}
      >
        {chunkedImages.map((chunk, pageIndex) => (
          <div key={pageIndex} className="relative w-full h-full flex-none shrink-0" style={{ width: "100%" }}>
            {chunk.map((img, i) => {
              const style = getDesktopStyle(i);
              const globalIndex = pageIndex * 6 + i;
              const animClass = `float-anim-${globalIndex % 6}`;

              return (
                <motion.div
                  key={globalIndex}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute",
                    top: style.top,
                    left: style.left,
                    width: style.width,
                    height: style.height,
                    zIndex: style.zIndex,
                  }}
                  className={`group rounded-2xl overflow-hidden border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.4)] ${animClass}`}
                  onClick={() => openLightbox(globalIndex)}
                >
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none">
                    <Image
                      src={img}
                      alt={`Project Gallery Image ${globalIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* MOBILE SWIPEABLE CARDS VIEW (Hidden on Desktop) */}
      <div className="no-scrollbar md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 px-4 w-[100vw] -ml-6" style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}>
        {images.map((img, i) => {
          const animClass = `float-anim-${i % 6}`;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className={`group relative flex-none w-[85vw] h-[50vh] snap-center rounded-2xl overflow-hidden border border-white/10 shadow-xl cursor-pointer ${animClass}`}
              onClick={() => openLightbox(i)}
            >
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none">
                <Image
                  src={img}
                  alt={`Project Gallery Image ${i + 1}`}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="85vw"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </motion.div>
          );
        })}
        <div className="flex-none w-[4vw]" />
      </div>

      {/* LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar: Counter and Close */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
              <div className="text-white/60 font-medium tracking-widest text-sm uppercase">
                {currentIndex + 1} <span className="opacity-50 mx-1">/</span> {images.length}
              </div>
              <button
                onClick={closeLightbox}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300"
                aria-label="Close Gallery"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Navigation Arrows (Desktop Only) */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 z-10"
              aria-label="Previous Image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 z-10"
              aria-label="Next Image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            {/* Main Image */}
            <div className="relative w-full h-full max-w-[90vw] max-h-[85vh] flex items-center justify-center px-4" onClick={closeLightbox}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={images[currentIndex]}
                    alt={`Project Gallery Image ${currentIndex + 1}`}
                    fill
                    className="object-contain pointer-events-none"
                    sizes="100vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
