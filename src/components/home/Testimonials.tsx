"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id:    1,
    name:  "Chidinma O.",
    role:  "Interior Designer, Lagos",
    quote: "I've sourced furniture from all over Nigeria and abroad — Doxa Home's quality is genuinely unmatched for the price. The marble dining table we got for a client in Lekki has been a conversation starter at every dinner party.",
    rating: 5,
  },
  {
    id:    2,
    name:  "Emmanuel A.",
    role:  "Homeowner, Benin City",
    quote: "From first call to delivery, the experience was seamless. The Royale dining set transformed our home. My wife hasn't stopped taking photos of it. Worth every kobo.",
    rating: 5,
  },
  {
    id:    3,
    name:  "Adaeze N.",
    role:  "Architect, Abuja",
    quote: "Doxa Home is my first stop for premium furniture recommendations. The sectional sofas are particularly impressive — the upholstery quality rivals pieces I've seen in Dubai.",
    rating: 5,
  },
  {
    id:    4,
    name:  "Rotimi B.",
    role:  "Homeowner, Port Harcourt",
    quote: "Ordered the beige sofa set and it arrived perfectly packaged. The fabric quality is exceptional. Customer service was responsive throughout. Highly recommend.",
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-28 lg:py-36 bg-ivory text-ink-950 border-t border-b border-ink-200/60 overflow-hidden relative">
      {/* Background soft textures or shapes */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-ink-200/30 via-transparent to-ink-200/30" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-ink-200/30 via-transparent to-ink-200/30" />

      <div className="max-w-screen-xl mx-auto px-8 relative z-10">

        {/* ── Header ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-20"
        >
          <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mb-4" />
          <p className="font-sans text-[10px] text-[#D4AF37] tracking-[0.24em] uppercase mb-4 font-bold">
            Client Stories
          </p>
          <h2 className="display-lg text-ink-950">
            Trusted by Discerning Homes
          </h2>
        </motion.div>

        {/* ── Testimonial card ─────────────────────────────── */}
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[300px] flex items-center justify-center">
            
            {/* Elegant luxury frame card wrapper */}
            <div className="absolute inset-0 bg-white border border-ink-200 shadow-[0_24px_50px_-12px_rgba(13,12,10,0.04)] rounded-[2px]" />
            <div className="absolute top-2.5 left-2.5 right-2.5 bottom-2.5 border border-[#D4AF37]/15 rounded-[1px] pointer-events-none" />

            <div className="relative z-10 px-8 sm:px-16 py-12 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center w-full flex flex-col items-center"
                >
                  {/* Large decorative quotation mark */}
                  <span className="font-serif text-6xl text-[#D4AF37]/15 leading-none select-none h-6 mb-2">
                    &ldquo;
                  </span>

                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1.5 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={11} className="text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="font-serif text-lg sm:text-[1.35rem] text-ink-800 font-light leading-[1.8] italic mb-8 max-w-3xl">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Divider line */}
                  <div className="w-6 h-[1px] bg-[#D4AF37]/50 mb-5" />

                  {/* User profile identifier / monogram */}
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="w-10 h-10 rounded-full border border-[#D4AF37]/60 flex items-center justify-center font-serif text-[0.8rem] text-[#D4AF37] font-medium tracking-wider uppercase bg-[#0d0c0a] shadow-md select-none">
                      {t.name.substring(0, 2)}
                    </div>
                    <div>
                      <p className="font-sans text-xs text-[#000000] font-bold tracking-wider uppercase">{t.name}</p>
                      <p className="font-sans text-[10px] text-ink-400 tracking-[0.1em] uppercase mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Controls ───────────────────────────────────── */}
          <div className="flex items-center justify-between mt-10 px-4">
            {/* Left Button */}
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-11 h-11 border border-ink-200 text-ink-400 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] flex items-center justify-center transition-all duration-300 rounded-[2px] bg-white hover:bg-[#0d0c0a] group"
            >
              <ChevronLeft size={16} strokeWidth={1.5} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
            </button>

            {/* Pagination dots */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`block rounded-full transition-all duration-400 ${
                    i === current
                      ? "w-8 h-[2px] bg-[#D4AF37]"
                      : "w-2.5 h-[2px] bg-ink-200 hover:bg-ink-400"
                  }`}
                />
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-11 h-11 border border-ink-200 text-ink-400 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] flex items-center justify-center transition-all duration-300 rounded-[2px] bg-white hover:bg-[#0d0c0a] group"
            >
              <ChevronRight size={16} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
