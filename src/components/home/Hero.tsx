"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeroSlide {
  image:    string;
  eyebrow:  string;
  headline: string;
  subline:  string;
  cta:      string;
  ctaHref:  string;
}

const slides: HeroSlide[] = [
  {
    image:    "/images/dox7.jpeg",
    eyebrow:  "Living Room",
    headline: "Live in the\nExtraordinary",
    subline:  "Premium furniture curated for discerning Nigerian homes.",
    cta:      "Shop Living Room",
    ctaHref:  "/shop/living-room",
  },
  {
    image:    "/images/dox4.jpeg",
    eyebrow:  "Dining Room",
    headline: "Dine with\nDistinction",
    subline:  "Dining sets that transform every meal into an occasion.",
    cta:      "Explore Dining",
    ctaHref:  "/shop/dining-room",
  },
  {
    image:    "/images/dox6.jpeg",
    eyebrow:  "Royal Collection",
    headline: "The Royal\nCollection",
    subline:  "For those who demand nothing less than extraordinary.",
    cta:      "View Royal Sets",
    ctaHref:  "/shop/royal-sets",
  },
];

export function Hero() {
  const [current, setCurrent]   = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 800);
    },
    [animating]
  );

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    intervalRef.current = setInterval(next, 7000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next]);

  const slide = slides[current];

  return (
    <section
      className="relative h-screen min-h-[640px] max-h-[1080px] overflow-hidden"
      aria-label="Hero carousel"
    >
      {/* ── Background images ─────────────────────────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="ken-burns-active absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.headline}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Layered overlays — cinematic feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* ── Content ────────────────────────────────────────── */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-screen-xl mx-auto px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              className="max-w-[620px]"
            >
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.5 }}
                className="font-sans text-[10px] text-[#ecb881] tracking-[0.28em] uppercase mb-6 font-bold"
              >
                Doxa Home — {slide.eyebrow}
              </motion.p>

              {/* Headline */}
              <h1 className="display-xl text-white mb-6 whitespace-pre-line font-bold">
                {slide.headline}
              </h1>

              {/* Subline */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.5 }}
                className="font-sans text-white/80 text-[0.95rem] font-medium mb-10 max-w-[440px] leading-[1.8]"
              >
                {slide.subline}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link
                  href={slide.ctaHref}
                  className="btn-primary"
                >
                  {slide.cta}
                  <ArrowRight size={13} strokeWidth={1.5} />
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold tracking-[0.16em] uppercase text-white/60 hover:text-white transition-colors duration-200"
                >
                  View All Collections
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Controls row ───────────────────────────────────── */}
      <div className="absolute bottom-8 left-0 right-0 z-10 max-w-screen-xl mx-auto px-8 flex items-end justify-between">
        {/* Slide progress dots */}
        <div className="flex items-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`block rounded-full transition-all duration-400 ${
                i === current
                  ? "w-7 h-[3px] bg-[#ecb881]"
                  : "w-3 h-[3px] bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <span className="font-sans text-[10px] text-white/30 tracking-[0.15em] tabular-nums hidden lg:block">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>

        {/* Arrow buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="w-10 h-10 border border-white/20 text-white/60 hover:border-white/50 hover:text-white flex items-center justify-center transition-all duration-200 backdrop-blur-[2px]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="w-10 h-10 border border-white/20 text-white/60 hover:border-white/50 hover:text-white flex items-center justify-center transition-all duration-200 backdrop-blur-[2px]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

