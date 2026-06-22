"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

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
    <section className="py-24 lg:py-36 bg-[#f9f9f9] text-[#0c0c0c] border-t border-b border-[#e5e5e5] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-8">

        {/* ── Header ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-[10px] text-[#ecb881] tracking-[0.24em] uppercase mb-4">
            Client Stories
          </p>
          <h2 className="display-md text-[#0c0c0c]">
            Trusted by Discerning Homes
          </h2>
        </motion.div>

        {/* ── Testimonial card ─────────────────────────────── */}
        <div className="max-w-3xl mx-auto">
          <div className="relative min-h-[240px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-center w-full"
              >
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-8">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={12} className="text-[#ecb881] fill-[#ecb881]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-serif text-xl lg:text-2xl text-[#3d3d3d] font-light leading-[1.7] italic mb-8 max-w-2xl mx-auto">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-[1px] bg-[#ecb881]/60 mb-4" />
                  <p className="font-sans text-sm text-[#0c0c0c] font-medium">{t.name}</p>
                  <p className="font-sans text-[11px] text-[#555555] tracking-[0.1em] uppercase">{t.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Controls ───────────────────────────────────── */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 border border-[#e5e5e5] text-[#555555] hover:border-[#ecb881]/50 hover:text-[#ecb881] flex items-center justify-center transition-all duration-200"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 10L4 6l4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="flex items-center gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`block rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-7 h-[2px] bg-[#ecb881]"
                      : "w-3 h-[2px] bg-[#e5e5e5] hover:bg-[#888888]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 border border-[#e5e5e5] text-[#555555] hover:border-[#ecb881]/50 hover:text-[#ecb881] flex items-center justify-center transition-all duration-200"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
