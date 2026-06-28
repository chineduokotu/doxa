"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight, Trash2, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, subtotal } =
    useCartStore();
  const total = subtotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ────────────────────────────────── */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[3px]"
          />

          {/* ── Drawer panel ────────────────────────────── */}
          <motion.div
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[400px] bg-white flex flex-col shadow-2xl"
          >
            {/* ── Header ───────────────────────────────── */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink-200">
              <div className="flex items-center gap-2.5">
                <ShoppingBag
                  size={16}
                  strokeWidth={1.5}
                  className="text-ink-400"
                />
                <span className="font-serif text-[1.05rem] text-ink-950 font-light">
                  Your Bag
                </span>
                {items.length > 0 && (
                  <span className="font-sans text-[11px] text-ink-400 ml-0.5">
                    ({items.length} {items.length === 1 ? "item" : "items"})
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="w-8 h-8 flex items-center justify-center text-ink-400 hover:text-ink-950 transition-colors"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* ── Items list ───────────────────────────── */}
            <div className="flex-1 min-h-0 overflow-y-auto">
              {items.length === 0 ? (
                /* Empty state */
                <div className="h-full flex flex-col items-center justify-center px-6 py-12 text-center">
                  <div className="w-14 h-14 bg-ink-100 flex items-center justify-center mb-6">
                    <ShoppingBag
                      size={20}
                      strokeWidth={1.5}
                      className="text-ink-400"
                    />
                  </div>
                  <p className="font-serif text-[1.15rem] text-ink-950 font-light mb-2">
                    Your bag is empty
                  </p>
                  <p className="font-sans text-[13px] text-ink-400 mb-8 max-w-[240px] leading-relaxed">
                    Discover our premium collection and fill it with beautiful
                    pieces.
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="btn-primary"
                  >
                    Shop Now <ArrowRight size={12} strokeWidth={1.5} />
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-ink-100">
                  {items.map((item) => (
                    <li key={item.product.id} className="flex gap-4 px-6 py-5">
                      {/* Product image */}
                      <div
                        className="relative w-18 h-24 shrink-0 bg-ink-100 overflow-hidden"
                        style={{ width: 72 }}
                      >
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-[9.5px] text-ink-400 tracking-[0.12em] uppercase mb-0.5">
                          {item.product.category.replace("-", " ")}
                        </p>
                        <p>{item.product.category.replace("-", " ")}</p>
                        <p className="font-serif text-[0.9rem] text-ink-950 font-light leading-snug mb-1.5">
                          {item.product.shortName}
                        </p>
                        {/* Empty spacing for layout */}
                        <div className="h-2" />

                        {/* Qty stepper */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-ink-200">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                )
                              }
                              aria-label="Decrease quantity"
                              className="w-7 h-7 flex items-center justify-center text-ink-400 hover:text-ink-950 transition-colors"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="w-7 text-center font-sans text-xs text-ink-950">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                )
                              }
                              aria-label="Increase quantity"
                              className="w-7 h-7 flex items-center justify-center text-ink-400 hover:text-ink-950 transition-colors"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            aria-label="Remove item"
                            className="text-ink-300 hover:text-[#D4AF37] transition-colors"
                          >
                            <Trash2 size={13} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>

                      {/* No line total */}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ── Footer / checkout ────────────────────── */}
            {items.length > 0 && (
              <div className="border-t border-ink-200 px-6 py-6 space-y-4">
                <p className="font-sans text-[11px] text-ink-400 text-center">
                  Enter your delivery details on the next step to place your order.
                </p>

                <Link href="/checkout" onClick={closeCart} className="block">
                  <Button variant="gold" size="lg" fullWidth>
                    Proceed to Order details
                    <ArrowRight size={13} strokeWidth={1.5} />
                  </Button>
                </Link>

                <button
                  onClick={closeCart}
                  className="w-full text-center font-sans text-[9.5px] tracking-[0.14em] uppercase text-ink-400 hover:text-ink-950 transition-colors py-1"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
