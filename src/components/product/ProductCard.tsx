"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

type AddState = "idle" | "adding" | "added";

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [addState, setAddState] = useState<AddState>("idle");
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/product/${product.slug}`}
        className="group block"
        aria-label={`View ${product.name}`}
      >
        {/* Image container */}
        <div className="relative overflow-hidden bg-stone-100 mb-4">
          <div
            className="relative"
            style={{ aspectRatio: "3/4" }}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority={priority}
              className="object-cover transition-transform duration-500 ease-luxury group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>

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

          {/* Hover action buttons */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Quick actions */}
          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={`w-9 h-9 flex items-center justify-center bg-white shadow-md transition-colors duration-200 ${
                wishlisted
                  ? "text-gold-500"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Heart
                size={15}
                fill={wishlisted ? "currentColor" : "none"}
              />
            </button>

            {/* Quick view */}
            <div
              aria-label="Quick view"
              className="w-9 h-9 flex items-center justify-center bg-white shadow-md text-stone-600 hover:text-stone-900 transition-colors"
            >
              <Eye size={15} />
            </div>
          </div>

          {/* Add to cart — appears on hover, bottom */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-luxury">
            <button
              onClick={handleAddToCart}
              disabled={addState === "adding"}
              className={`w-full py-3 flex items-center justify-center gap-2 text-[0.65rem] tracking-widest uppercase font-sans transition-all duration-200 ${
                addState === "added"
                  ? "bg-gold-500 text-white"
                  : "bg-stone-900 hover:bg-stone-700 text-white"
              }`}
            >
              {addState === "added" ? (
                <>
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBag size={13} />
                  Add to Bag
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product info */}
        <div className="space-y-1.5">
          <p className="text-[0.6rem] text-stone-400 tracking-widest uppercase font-sans">
            {product.category.replace("-", " ")}
          </p>
          <h3 className="font-serif text-base lg:text-lg text-stone-900 font-light leading-snug group-hover:text-stone-700 transition-colors">
            {product.shortName}
          </h3>
          <div className="flex items-center gap-3">
            <span className="font-sans text-sm font-medium text-stone-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-sans text-xs text-stone-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
