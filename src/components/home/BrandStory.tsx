"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function BrandStory() {
  return (
    <section className="py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
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
            {/* Floating accent image */}
            <div className="absolute -bottom-8 -right-6 w-48 h-48 lg:w-64 lg:h-64 overflow-hidden border-4 border-ivory shadow-2xl hidden sm:block">
              <Image
                src="/images/dox8.jpeg"
                alt="Gold coffee table detail"
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
            {/* Gold accent line */}
            <div className="absolute top-8 -left-4 w-1 h-24 bg-gold-500 hidden lg:block" />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="order-1 lg:order-2 pb-16 sm:pb-0"
          >
            <p className="text-gold-500 text-[0.65rem] tracking-[0.25em] uppercase font-sans mb-4">
              Our Philosophy
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-stone-900 font-light leading-[1.1] mb-8">
              Furniture that tells
              <br />
              <em className="not-italic text-stone-500">your story.</em>
            </h2>
            <div className="space-y-4 text-stone-600 font-sans text-sm leading-relaxed">
              <p>
                Doxa Home was founded on a simple belief: every Nigerian home
                deserves furniture that is as refined as the people who live in
                it. Based on Airport Road, Benin City, we source and curate
                premium pieces that blend international design with the warmth
                of Nigerian living.
              </p>
              <p>
                Each piece in our collection is selected for its craft,
                durability, and the way it transforms a room. From expansive
                marble dining tables to hand-upholstered sectionals, we
                champion quality over quantity — always.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/about">
                <Button variant="solid" size="lg">
                  Our Story
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Visit Showroom
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 pt-10 border-t border-stone-200">
              {[
                { value: "500+", label: "Pieces Delivered" },
                { value: "8+", label: "Years of Excellence" },
                { value: "100%", label: "Premium Quality" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-2xl lg:text-3xl text-stone-900 font-light">
                    {stat.value}
                  </p>
                  <p className="text-[0.65rem] text-stone-400 font-sans tracking-wide mt-1 uppercase">
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
