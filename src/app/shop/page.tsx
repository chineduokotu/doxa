"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/product/ProductCard";
import { categories } from "@/lib/data/categories";
import { useProductsStore } from "@/lib/store/products";
import { SlidersHorizontal, X } from "lucide-react";

type SortOption = "default" | "newest";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortOption>("default");

  const { products: allProducts, loading, fetchProducts } = useProductsStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filtered = useMemo(() => {
    let list = [...allProducts];

    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    switch (sort) {
      case "newest":
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return list;
  }, [allProducts, selectedCategory, sort]);

  return (
    <div className="min-h-screen bg-ivory pt-28 lg:pt-36">
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Page header */}
        <div className="mb-10">
          <p className="text-[#D4AF37] text-[0.65rem] tracking-[0.25em] uppercase font-sans mb-2">
            Browse
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl text-ink-50 font-light">
            All Collections
          </h1>
          <p className="text-ink-600 font-sans text-sm mt-2">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} found
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-ink-200 flex-wrap">
          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`text-[0.65rem] tracking-widest uppercase font-sans px-3 py-1.5 border transition-all duration-200 ${
                selectedCategory === "all"
                  ? "bg-ink-950 text-white border-ink-950"
                  : "border-ink-300 text-ink-600 hover:border-ink-950 hover:text-ink-950"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`text-[0.65rem] tracking-widest uppercase font-sans px-3 py-1.5 border transition-all duration-200 ${
                  selectedCategory === cat.slug
                    ? "bg-ink-950 text-white border-ink-950"
                    : "border-ink-300 text-ink-600 hover:border-ink-950 hover:text-ink-950"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="sort-select"
              className="text-[0.65rem] tracking-widest uppercase font-sans text-ink-600 hidden sm:block"
            >
              Sort:
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="text-xs font-sans border border-ink-300 text-ink-750 px-3 py-1.5 bg-white focus:outline-none focus:border-ink-950 cursor-pointer"
            >
              <option value="default">Featured</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Price filter removed */}

        {/* Product grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 animate-pulse">
            {[...Array(8)].map((_, idx) => (
              <div key={idx} className="bg-ink-100/50 aspect-[3/4] border border-ink-200/20" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl text-ink-400 font-light mb-3">
              No pieces found
            </p>
            <p className="text-ink-400 text-sm font-sans">
              Try adjusting your filters or browse all collections.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
              }}
              className="mt-6 text-[0.65rem] tracking-widest uppercase font-sans text-[#D4AF37] hover:text-[#AA7700] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={i < 4}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
