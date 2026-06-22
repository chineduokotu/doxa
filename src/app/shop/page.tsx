"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/product/ProductCard";
import { getAllProducts } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { SlidersHorizontal, X } from "lucide-react";

type SortOption = "default" | "price-asc" | "price-desc" | "newest";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortOption>("default");
  const [priceMax, setPriceMax] = useState<number>(3000000);
  const [filterOpen, setFilterOpen] = useState(false);

  const allProducts = getAllProducts();

  const filtered = useMemo(() => {
    let list = [...allProducts];

    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    list = list.filter((p) => p.price <= priceMax);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return list;
  }, [allProducts, selectedCategory, sort, priceMax]);

  return (
    <div className="min-h-screen bg-ivory pt-28 lg:pt-36">
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Page header */}
        <div className="mb-10">
          <p className="text-gold-500 text-[0.65rem] tracking-[0.25em] uppercase font-sans mb-2">
            Browse
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl text-ink-950 font-light">
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
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            {/* Price filter toggle */}
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-1.5 text-[0.65rem] tracking-widest uppercase font-sans text-ink-600 hover:text-ink-950 border border-ink-300 px-3 py-1.5 transition-colors"
            >
              <SlidersHorizontal size={12} />
              Filter
            </button>
          </div>
        </div>

        {/* Price filter */}
        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-5 border border-ink-200 bg-ink-50"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[0.65rem] tracking-widest uppercase font-sans text-ink-600">
                Max Price: <span className="text-ink-950">₦{(priceMax / 1000000).toFixed(1)}M</span>
              </p>
              <button
                onClick={() => setFilterOpen(false)}
                className="text-ink-400 hover:text-ink-700"
              >
                <X size={14} />
              </button>
            </div>
            <input
              type="range"
              min={300000}
              max={3000000}
              step={100000}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full max-w-xs accent-ink-950 cursor-pointer"
            />
          </motion.div>
        )}

        {/* Product grid */}
        {filtered.length === 0 ? (
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
                setPriceMax(3000000);
              }}
              className="mt-6 text-[0.65rem] tracking-widest uppercase font-sans text-gold-500 hover:text-gold-600 transition-colors"
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
