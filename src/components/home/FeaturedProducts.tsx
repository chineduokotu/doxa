"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { useProductsStore } from "@/lib/store/products";

export function FeaturedProducts() {
  const { products, loading, fetchProducts } = useProductsStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <section className="py-28 lg:py-36 bg-ivory">
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
            <div className="section-rule" />
            <p className="font-sans text-[10px] text-[#D4AF37] tracking-[0.22em] uppercase mb-3">
              Curated Selection
            </p>
            <h2 className="display-lg text-ink-950">
              Featured Pieces
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-sans text-[10px] text-ink-400 hover:text-ink-950 tracking-[0.16em] uppercase transition-colors duration-200 group"
          >
            View All Pieces
            <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>

        {/* ── Product grid ──────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12 animate-pulse">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="bg-ink-100/50 aspect-[3/4] border border-ink-200/20" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 3} />
            ))}
          </div>
        )}

        {/* ── CTA strip ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 pt-10"
        >
          <div className="glass-panel flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8">
            <p className="font-serif text-white/80 font-light text-lg text-center sm:text-left max-w-2xl">
              Discover our full range of premium pieces, handcrafted for enduring spaces.
            </p>
            <Link href="/shop" className="btn-primary w-full sm:w-auto">
              Shop All <ArrowRight size={13} strokeWidth={1.5} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
