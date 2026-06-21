"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import type { Product } from "@/lib/data/products";
import { Button } from "@/components/ui/Button";

interface AddToCartButtonProps {
  product: Product;
}

type State = "idle" | "adding" | "added";

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [state, setState] = useState<State>("idle");
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = async () => {
    if (state !== "idle") return;
    setState("adding");
    await new Promise((r) => setTimeout(r, 200));
    addItem(product);
    setState("added");
    setTimeout(() => setState("idle"), 2500);
  };

  return (
    <Button
      onClick={handleAdd}
      variant={state === "added" ? "gold" : "solid"}
      size="lg"
      fullWidth
      disabled={state === "adding"}
      className="transition-all duration-300"
    >
      {state === "idle" && (
        <>
          <ShoppingBag size={16} />
          Add to Bag
        </>
      )}
      {state === "adding" && (
        <>
          <span className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
          Adding...
        </>
      )}
      {state === "added" && (
        <>
          <Check size={16} />
          Added to Bag
        </>
      )}
    </Button>
  );
}
