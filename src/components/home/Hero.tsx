"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeroSlide {
  image: string;
  headline: string;
  subline: string;
  cta: string;
  ctaHref: string;
}

const slides: HeroSlide[] = [
  {
    image: "/images/dox7.jpeg",
    headline: "Live in the\nExtraordinary",
    subline: "Premium furniture curated for Nigerian homes.",
    cta: "Shop Living Room",
    ctaHref: "/shop/living-room",
  },
  {
    image: "/images/dox4.jpeg",
    headline: "Dine with\nDistinction",
    subline: "Dining sets that transform every meal into an occasion.",
    cta: "Explore Dining",
    ctaHref: "/shop/dining-room",
  },
  {
    image: "/images/dox6.jpeg",
    headline: "The Royal\nCollection",
    subline: "For those who demand nothing less than extraordinary.",
    cta: "View Royal Sets",
    ctaHref: "/shop/royal-sets",
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 700);
    },
    [animating]
  );

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo]
  );
  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo]
  );

  // Autoplay
  useEffect(() => {
    intervalRef.current = setInterval(next, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next]);

  const slide = slides[current];

  return (
    <section
      className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden"
      aria-label="Hero carousel"
    >
      {/* Background images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="ken-burns-active absolute inset-0 scale-100">
            <Image
              src={slide.image}
              alt={slide.headline}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="max-w-2xl"
            >
              {/* Label */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-gold-400 text-[0.65rem] tracking-[0.3em] uppercase font-sans mb-6"
              >
                Doxa Home — Benin City
              </motion.p>

              {/* Headline */}
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[1.05] tracking-[-0.01em] whitespace-pre-line mb-6">
                {slide.headline}
              </h1>

              {/* Sub line */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="font-sans text-stone-300 text-base lg:text-lg font-light mb-10 max-w-md leading-relaxed"
              >
                {slide.subline}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link href={slide.ctaHref}>
                  <Button variant="gold" size="lg">
                    {slide.cta}
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button variant="ghost" size="lg">
                    View All
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-10 max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 ${
                i === current
                  ? "w-8 h-0.5 bg-gold-400"
                  : "w-3 h-0.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="w-10 h-10 border border-white/30 text-white hover:bg-white/10 flex items-center justify-center transition-colors duration-200"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="w-10 h-10 border border-white/30 text-white hover:bg-white/10 flex items-center justify-center transition-colors duration-200"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2 z-10 hidden lg:block">
        <span className="font-serif text-xs text-white/50 vertical-text tracking-widest">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
