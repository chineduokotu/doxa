import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/data/products";

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          if (state.items.some((i) => i.id === product.id)) return state;
          return { items: [...state.items, product] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId),
        }));
      },

      toggleItem: (product) => {
        const { items, addItem, removeItem } = get();
        if (items.some((i) => i.id === product.id)) {
          removeItem(product.id);
        } else {
          addItem(product);
        }
      },

      isWishlisted: (productId) => {
        return get().items.some((i) => i.id === productId);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "doxa-wishlist",
    }
  )
);
