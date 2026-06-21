"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();
  const total = subtotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ivory pt-28 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-stone-100 flex items-center justify-center mb-8">
          <ShoppingBag size={30} className="text-stone-400" />
        </div>
        <h1 className="font-serif text-3xl text-stone-900 font-light mb-3">
          Your bag is empty
        </h1>
        <p className="text-stone-400 font-sans text-sm mb-8 max-w-sm">
          Discover our premium furniture collection and find something you love.
        </p>
        <Link href="/shop">
          <Button variant="solid" size="lg">
            Browse Collection <ArrowRight size={14} />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory pt-28 lg:pt-36 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="font-serif text-4xl lg:text-5xl text-stone-900 font-light mb-12">
          Shopping Bag
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="divide-y divide-stone-200">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-5 py-6"
                >
                  <div className="relative w-24 h-28 bg-stone-100 shrink-0 overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[0.6rem] text-stone-400 tracking-widest uppercase font-sans mb-0.5">
                        {item.product.category.replace("-", " ")}
                      </p>
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="font-serif text-lg text-stone-900 font-light hover:text-stone-600 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      {/* Qty stepper */}
                      <div className="flex items-center border border-stone-300">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-sans text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-sans text-sm font-medium text-stone-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-stone-300 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-stone-50 border border-stone-200 p-6 sticky top-28">
              <h2 className="font-serif text-xl text-stone-900 font-light mb-6">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm font-sans text-stone-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm font-sans text-stone-600">
                  <span>Delivery</span>
                  <span className="text-stone-400">Calculated at checkout</span>
                </div>
                <div className="border-t border-stone-200 pt-3 flex justify-between font-sans font-medium text-stone-900">
                  <span>Total</span>
                  <span className="font-serif text-lg">{formatPrice(total)}</span>
                </div>
              </div>
              <Link href="/checkout">
                <Button variant="gold" size="lg" fullWidth>
                  Checkout <ArrowRight size={14} />
                </Button>
              </Link>
              <Link
                href="/shop"
                className="block text-center mt-3 text-[0.65rem] tracking-widest uppercase font-sans text-stone-400 hover:text-stone-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
