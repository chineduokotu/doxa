"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { searchProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState(searchProducts(query));

  useEffect(() => {
    setResults(searchProducts(query));
  }, [query]);

  return (
    <div>
      {query && (
        <p className="text-stone-500 font-sans text-sm mb-10">
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
            <p className="font-serif text-2xl text-stone-400 font-light mb-3">
              Nothing found
            </p>
            <p className="text-stone-400 font-sans text-sm mb-6">
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
    <div className="min-h-screen bg-ivory pt-28 lg:pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-gold-500 text-[0.65rem] tracking-[0.25em] uppercase font-sans mb-3">
            Search
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl text-stone-900 font-light mb-8">
            Find Your Piece
          </h1>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-0 max-w-lg">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sofas, dining tables, marble..."
              className="flex-1 border border-stone-300 border-r-0 px-5 py-4 text-sm font-sans text-stone-900 focus:outline-none focus:border-stone-900 bg-white transition-colors"
            />
            <button
              type="submit"
              className="bg-stone-900 hover:bg-stone-700 text-white px-5 flex items-center justify-center transition-colors"
            >
              <Search size={18} />
            </button>
          </form>
        </div>

        <Suspense
          fallback={
            <p className="text-stone-400 font-sans text-sm">Searching...</p>
          }
        >
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
}
