"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Pieces Delivered"   },
  { value: "8+",   label: "Years of Excellence" },
  { value: "100%", label: "Premium Quality"     },
];

export function BrandStory() {
  return (
    <section className="py-24 lg:py-36 overflow-hidden bg-ivory">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Image side ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            {/* Gold accent line */}
            <div className="absolute top-12 -left-4 w-[2px] h-16 bg-[#D4AF37] hidden lg:block" />

            {/* Main image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/dox9.jpeg"
                alt="Doxa Home craftsmanship — marble and gold coffee table"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating inset accent */}
            <div className="absolute -bottom-6 -right-5 w-44 h-44 lg:w-60 lg:h-60 overflow-hidden border-[3px] border-white shadow-2xl hidden sm:block">
              <Image
                src="/images/dox8.jpeg"
                alt="Detail — gold coffee table"
                fill
                className="object-cover"
                sizes="240px"
              />
            </div>
          </motion.div>

          {/* ── Text side ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="order-1 lg:order-2 pb-16 sm:pb-0"
          >
            <p className="font-sans text-[10px] text-[#D4AF37] tracking-[0.22em] uppercase mb-4">
              Our Philosophy
            </p>

            {/* Accent rule */}
            <div className="w-9 h-[1px] bg-[#D4AF37] mb-7" />

            <h2 className="display-lg text-ink-950 mb-8">
              Furniture that{" "}
              <span className="text-ink-400 italic">tells your story.</span>
            </h2>

            <div className="space-y-5 text-ink-500 font-sans text-[0.875rem] leading-[1.85]">
              <p>
                Doxa Home was founded on a simple belief: every Nigerian home deserves
                furniture as refined as the people who live in it. Based at 108 Akpakpava Road,
                Benin City, we source and curate premium pieces that blend international
                design with the warmth of Nigerian living.
              </p>
              <p>
                Each piece is selected for its craft, durability, and the way it
                transforms a room. From expansive marble dining tables to hand-upholstered
                sectionals — we champion quality over quantity, always.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/about"   className="btn-primary">Our Story</Link>
              <Link href="/contact" className="btn-outline">Visit Showroom</Link>
            </div>

            {/* Stats */}
            <div className="mt-14 pt-10 border-t border-ink-200 grid grid-cols-3 gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-[2rem] text-ink-950 font-light leading-none mb-2">
                    {stat.value}
                  </p>
                  <p className="font-sans text-[9.5px] text-ink-400 tracking-[0.14em] uppercase leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
