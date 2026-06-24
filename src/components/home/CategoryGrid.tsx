"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { categories } from "@/lib/data/categories";
import { ArrowRight } from "lucide-react";

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
};

export function CategoryGrid() {
  const featured = categories.filter((c) => c.featured);
  const rest     = categories.filter((c) => !c.featured);

  return (
    <section className="py-24 lg:py-32 bg-[#050714]">
      <div className="max-w-screen-xl mx-auto px-8">

        {/* ── Section header ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <p className="font-sans text-[10px] text-[#dc320c] tracking-[0.22em] uppercase mb-3">
              Shop by Room
            </p>
            <h2 className="display-lg text-[#f6f8ff]">
              Every Room,{" "}
              <span className="text-[#888888] italic font-light">Perfected.</span>
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-sans text-[10px] text-[#cfd9ff] hover:text-white tracking-[0.16em] uppercase transition-colors duration-200 group"
          >
            View All Collections
            <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>

        {/* ── Featured categories (3 large portrait cards) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3"
        >
          {featured.map((cat) => (
            <motion.div key={cat.slug} variants={itemVariants}>
              <Link
                href={`/shop/${cat.slug}`}
                className="group relative block overflow-hidden bg-[#111b33] aspect-[4/3] md:aspect-[3/4]"
              >
                {/* Image */}
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-400" />

                {/* Card text */}
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  {/* Hover label */}
                  <p className="font-sans text-[9px] text-[#dc320c] tracking-[0.22em] uppercase mb-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Explore Collection
                  </p>

                  <h3 className="font-serif text-[1.75rem] lg:text-[2rem] text-white font-light leading-tight mb-1">
                    {cat.label}
                  </h3>

                  <p className="font-sans text-white/50 text-xs leading-relaxed max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {cat.description}
                  </p>

                  <div className="mt-4 flex items-center gap-1.5 font-sans text-[9px] text-[#dc320c] tracking-[0.18em] uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    Shop Now <ArrowRight size={9} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Secondary categories (smaller landscape cards) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {rest.map((cat) => (
            <motion.div key={cat.slug} variants={itemVariants}>
              <Link
                href={`/shop/${cat.slug}`}
                className="group relative block overflow-hidden bg-[#111b33]"
                style={{ aspectRatio: "16/9" }}
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

                <div className="absolute inset-0 flex items-end p-5">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg text-white font-light leading-tight">
                      {cat.label}
                    </h3>
                    <p className="font-sans text-[9px] text-white/40 mt-1 tracking-widest uppercase hidden sm:block">
                      Coming Soon
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
