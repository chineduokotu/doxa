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
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px] bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-stone-700" />
                <span className="font-serif text-lg text-stone-900 font-light">
                  Your Bag
                </span>
                {items.length > 0 && (
                  <span className="text-xs text-stone-400 font-sans ml-1">
                    ({items.length} {items.length === 1 ? "item" : "items"})
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="text-stone-400 hover:text-stone-900 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4">
              {items.length === 0 ? (
                // Empty state
                <div className="h-full flex flex-col items-center justify-center px-6 text-center">
                  <div className="w-16 h-16 bg-stone-100 flex items-center justify-center mb-6">
                    <ShoppingBag size={24} className="text-stone-400" />
                  </div>
                  <p className="font-serif text-xl text-stone-900 font-light mb-2">
                    Your bag is empty
                  </p>
                  <p className="text-stone-400 text-sm font-sans mb-8">
                    Discover our premium collection and fill it with beautiful
                    pieces.
                  </p>
                  <Button
                    onClick={closeCart}
                    variant="solid"
                    size="md"
                    className="w-full"
                  >
                    <Link href="/shop" className="flex items-center gap-2">
                      Shop Now <ArrowRight size={13} />
                    </Link>
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-stone-50">
                  {items.map((item) => (
                    <li
                      key={item.product.id}
                      className="flex gap-4 px-6 py-4 hover:bg-stone-50 transition-colors"
                    >
                      {/* Product image */}
                      <div className="relative w-20 h-24 shrink-0 bg-stone-100 overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[0.6rem] text-stone-400 tracking-widest uppercase font-sans mb-0.5">
                          {item.product.category.replace("-", " ")}
                        </p>
                        <p className="font-serif text-sm text-stone-900 font-light leading-snug mb-2">
                          {item.product.shortName}
                        </p>
                        <p className="font-sans text-xs font-medium text-stone-700 mb-3">
                          {formatPrice(item.product.price)}
                        </p>

                        {/* Qty stepper */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-stone-200">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              aria-label="Decrease quantity"
                              className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-7 text-center text-xs font-sans text-stone-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              aria-label="Increase quantity"
                              className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            aria-label="Remove item"
                            className="text-stone-300 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Line total */}
                      <p className="text-sm font-sans font-medium text-stone-900 shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer — checkout */}
            {items.length > 0 && (
              <div className="border-t border-stone-100 px-6 py-6 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-[0.65rem] tracking-widest uppercase font-sans text-stone-500">
                    Subtotal
                  </span>
                  <span className="font-serif text-lg text-stone-900">
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="text-stone-400 text-[0.65rem] font-sans">
                  Delivery costs calculated at checkout
                </p>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block"
                >
                  <Button variant="gold" size="lg" fullWidth>
                    Proceed to Checkout
                    <ArrowRight size={14} />
                  </Button>
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full text-center text-[0.65rem] tracking-widest uppercase font-sans text-stone-400 hover:text-stone-700 transition-colors py-1"
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
