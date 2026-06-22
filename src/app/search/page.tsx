"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { searchProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const results = useMemo(() => searchProducts(query), [query]);

  return (
    <div>
      {query && (
        <p className="text-ink-600 font-sans text-sm mb-10">
          {results.length > 0
            ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
            : `No results found for "${query}"`}
        </p>
      )}

      {results.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        query && (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-ink-400 font-light mb-3">
              Nothing found
            </p>
            <p className="text-ink-400 font-sans text-sm mb-6">
              Try searching for sofa, dining table, marble, gold, or sectional.
            </p>
            <Link
              href="/shop"
              className="text-[0.65rem] tracking-widest uppercase font-sans text-gold-500 hover:text-gold-600 transition-colors"
            >
              Browse All Products →
            </Link>
          </div>
        )
      )}
    </div>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <div className="min-h-screen bg-ivory pt-24 sm:pt-28 lg:pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-12">
          <p className="text-gold-500 text-[0.65rem] tracking-[0.25em] uppercase font-sans mb-2 sm:mb-3">
            Search
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink-950 font-light leading-tight mb-5 sm:mb-8">
            Find Your Piece
          </h1>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-lg overflow-hidden border border-ink-300 bg-white focus-within:border-ink-950"
          >
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sofas, dining tables, marble..."
              className="min-w-0 flex-1 px-4 py-3.5 text-sm font-sans text-ink-950 placeholder:text-ink-400 focus:outline-none"
            />
            <button
              type="submit"
              className="min-h-12 shrink-0 bg-ink-950 hover:bg-ink-700 text-white px-5 flex items-center justify-center transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          </form>
        </div>

        <Suspense
          fallback={
            <p className="text-ink-400 font-sans text-sm">Searching...</p>
          }
        >
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
}
