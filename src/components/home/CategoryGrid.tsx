"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { categories } from "@/lib/data/categories";
import { ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

export function CategoryGrid() {
  const featured = categories.filter((c) => c.featured);
  const rest = categories.filter((c) => !c.featured);

  return (
    <section className="py-20 lg:py-28 px-6 max-w-7xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <p className="text-gold-500 text-[0.65rem] tracking-[0.25em] uppercase font-sans mb-2">
            Shop by Room
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 font-light">
            Every Room,
            <br />
            <em className="not-italic text-stone-500">Perfected.</em>
          </h2>
        </div>
        <Link
          href="/shop"
          className="flex items-center gap-2 text-[0.65rem] tracking-widest uppercase font-sans text-stone-500 hover:text-gold-500 transition-colors"
        >
          View All Collections <ArrowRight size={12} />
        </Link>
      </motion.div>

      {/* Featured categories grid (3 large cards) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
      >
        {featured.map((cat, i) => (
          <motion.div key={cat.slug} variants={itemVariants}>
            <Link
              href={`/shop/${cat.slug}`}
              className="group relative block overflow-hidden img-zoom-wrap"
              style={{ aspectRatio: i === 0 ? "3/4" : "3/4" }}
            >
              {/* Image */}
              <div className="relative h-full min-h-[380px]">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-500 ease-luxury group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/10 to-transparent transition-opacity duration-300 group-hover:from-stone-950/90" />
              </div>

              {/* Card text */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-gold-400 text-[0.6rem] tracking-widest uppercase font-sans mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  Explore
                </p>
                <h3 className="font-serif text-2xl lg:text-3xl text-white font-light mb-1">
                  {cat.label}
                </h3>
                <p className="text-stone-400 text-xs font-sans max-w-[220px] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {cat.description}
                </p>
                <div className="mt-3 flex items-center gap-2 text-gold-400 text-[0.65rem] tracking-widest uppercase font-sans opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  Shop Now <ArrowRight size={11} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Secondary categories (3 smaller cards) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-3 gap-4"
      >
        {rest.map((cat) => (
          <motion.div key={cat.slug} variants={itemVariants}>
            <Link
              href={`/shop/${cat.slug}`}
              className="group relative block overflow-hidden"
            >
              <div className="relative min-h-[160px] sm:min-h-[200px]">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-500 ease-luxury group-hover:scale-105"
                  sizes="(max-width: 768px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-stone-950/50 group-hover:bg-stone-950/60 transition-colors duration-300" />
              </div>
              <div className="absolute inset-0 flex items-end p-4">
                <div>
                  <h3 className="font-serif text-base sm:text-lg text-white font-light">
                    {cat.label}
                  </h3>
                  <p className="text-[0.6rem] text-stone-400 font-sans mt-0.5 hidden sm:block">
                    Coming Soon
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
