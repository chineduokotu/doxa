"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/lib/data/products";

interface ProductCardProps {
  product:  Product;
  priority?: boolean;
}

type AddState = "idle" | "adding" | "added";

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [addState, setAddState] = useState<AddState>("idle");
  const addItem                  = useCartStore((s) => s.addItem);
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted               = isWishlisted(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (addState !== "idle") return;
    setAddState("adding");
    await new Promise((r) => setTimeout(r, 150));
    addItem(product);
    setAddState("added");
    setTimeout(() => setAddState("idle"), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link href={`/product/${product.slug}`} aria-label={`View ${product.name}`} className="block">

        {/* ── Image container ───────────────────────────── */}
        <div className="relative overflow-hidden bg-[#111b33] mb-4" style={{ aspectRatio: "3/4" }}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <Badge
                variant={
                  product.badge === "Sale"
                    ? "sale"
                    : product.badge === "Royal Collection"
                    ? "gold"
                    : "dark"
                }
              >
                {product.badge}
              </Badge>
            </div>
          )}

          {/* Wishlist button — top right */}
          <button
            onClick={handleWishlist}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 ${
              wishlisted ? "text-[#dc320c]" : "text-[#9aa4cc] hover:text-[#dc320c]"
            }`}
          >
            <Heart size={13} fill={wishlisted ? "currentColor" : "none"} strokeWidth={1.5} />
          </button>

          {/* Add to bag — slides up from bottom on hover (hidden overlay by default on desktop, visible on mobile) */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <button
              onClick={handleAddToCart}
              disabled={addState === "adding"}
              className={`w-full py-3 flex md:py-3.5 flex items-center justify-center gap-2 font-sans text-[9px] md:text-[9.5px] font-semibold tracking-[0.16em] uppercase transition-all duration-200 ${
                addState === "added"
                  ? "bg-[#dc320c] text-[#050714]"
                  : "bg-[#0c0c0c] hover:bg-[#222222] text-white"
              }`}
            >
              {addState === "added" ? (
                <>
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Added
                </>
              ) : (
                <>
                  <ShoppingBag size={12} strokeWidth={1.5} />
                  Add to Bag
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Product info ───────────────────────────────── */}
        <div className="space-y-1.5">
          <p className="font-sans text-[9.5px] text-[#9aa4cc] tracking-[0.14em] uppercase">
            {product.category.replace("-", " ")}
          </p>
          <h3 className="font-serif text-[1.05rem] lg:text-[1.15rem] text-[#f6f8ff] font-light leading-snug group-hover:text-[#dc320c] transition-colors duration-200">
            {product.shortName}
          </h3>
          <div className="flex items-center gap-3 pt-0.5">
            <span className="font-sans text-[0.825rem] font-medium text-[#f6f8ff]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-sans text-xs text-[#a09a94] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
