"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Chidinma O.",
    role: "Interior Designer, Lagos",
    quote:
      "I've sourced furniture from all over Nigeria and abroad — Doxa Home's quality is genuinely unmatched for the price. The marble dining table we got for a client in Lekki has been a conversation starter at every dinner party.",
    rating: 5,
  },
  {
    id: 2,
    name: "Emmanuel A.",
    role: "Homeowner, Benin City",
    quote:
      "From first call to delivery, the experience was seamless. The Royale dining set transformed our home. My wife hasn't stopped taking photos of it. Worth every kobo.",
    rating: 5,
  },
  {
    id: 3,
    name: "Adaeze N.",
    role: "Architect, Abuja",
    quote:
      "Doxa Home is my first stop for premium furniture recommendations. The sectional sofas are particularly impressive — the upholstery quality rivals pieces I've seen in Dubai.",
    rating: 5,
  },
  {
    id: 4,
    name: "Rotimi B.",
    role: "Homeowner, Port Harcourt",
    quote:
      "Ordered the beige sofa set and it arrived perfectly packaged. The fabric quality is exceptional. Customer service was responsive throughout. Highly recommend.",
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-20 lg:py-28 bg-stone-950 text-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-gold-400 text-[0.65rem] tracking-[0.25em] uppercase font-sans mb-4"
        >
          What Our Clients Say
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-3xl lg:text-4xl text-white font-light mb-16"
        >
          Stories from the Home
        </motion.h2>

        {/* Testimonial card */}
        <div className="relative min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-gold-400 fill-gold-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-serif text-xl lg:text-2xl text-stone-200 font-light leading-relaxed italic mb-8 max-w-2xl mx-auto">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <p className="text-white font-sans text-sm font-medium">
                {t.name}
              </p>
              <p className="text-stone-400 text-xs font-sans mt-1">{t.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-10 h-10 border border-stone-700 text-stone-400 hover:border-gold-500 hover:text-gold-400 flex items-center justify-center transition-all duration-200"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-0.5 transition-all duration-300 ${
                  i === current ? "w-8 bg-gold-400" : "w-3 bg-stone-700"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-10 h-10 border border-stone-700 text-stone-400 hover:border-gold-500 hover:text-gold-400 flex items-center justify-center transition-all duration-200"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
