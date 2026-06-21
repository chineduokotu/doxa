"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/lib/data/products";

export function FeaturedProducts() {
  const products = getFeaturedProducts(6);

  return (
    <section className="py-20 lg:py-28 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <p className="text-gold-500 text-[0.65rem] tracking-[0.25em] uppercase font-sans mb-2">
              Curated Selection
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 font-light">
              Featured Pieces
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 text-[0.65rem] tracking-widest uppercase font-sans text-stone-500 hover:text-gold-500 transition-colors"
          >
            View All <ArrowRight size={12} />
          </Link>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={i < 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
