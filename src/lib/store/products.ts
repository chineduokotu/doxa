"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as initialProducts, type Product } from "@/lib/data/products";

interface ProductsStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (force?: boolean) => void;
  addProduct: (product: any) => Promise<void>;
  updateProduct: (id: string, updated: any) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  resetToDefault: () => void;
}

export const useProductsStore = create<ProductsStore>()(
  persist(
    (set, get) => ({
      products: [],
      loading: false,
      error: null,
      fetchProducts: (force = false) => {
        const currentProducts = get().products;
        if (currentProducts.length > 0 && !force) return;
        
        set({ loading: true, error: null });
        try {
          const list = currentProducts.length > 0 ? currentProducts : initialProducts;
          set({ products: list, loading: false });
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },
      addProduct: async (newProd: any) => {
        set({ loading: true });
        try {
          const id = `prod-${Date.now()}`;
          const slug = newProd.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

          // Format image list
          let imagesList: string[] = ["/images/placeholder.jpg"];
          if (newProd.images && newProd.images.length > 0) {
            imagesList = newProd.images;
          }

          const product: Product = {
            id,
            slug,
            name: newProd.name,
            shortName: newProd.name,
            category: newProd.category,
            price: Number(newProd.price),
            originalPrice: newProd.originalPrice ? Number(newProd.originalPrice) : undefined,
            images: imagesList,
            description: newProd.description || "",
            details: newProd.details || ["Premium quality craftsmanship", "Bespoke aesthetic"],
            material: newProd.material || "Premium Wood / Fabric",
            finish: newProd.finish || "Premium Hand-finish",
            dimensions: newProd.dimensions || "",
            inStock: true,
            isNew: true,
            isFeatured: newProd.isFeatured || false,
          };

          set((state) => ({
            products: [...state.products, product],
            loading: false,
          }));
        } catch (err: any) {
          set({ error: err.message, loading: false });
          throw err;
        }
      },
      updateProduct: async (id: string, updated: any) => {
        set({ loading: true });
        try {
          set((state) => ({
            products: state.products.map((p) =>
              p.id === id
                ? {
                    ...p,
                    ...updated,
                    price: updated.price !== undefined ? Number(updated.price) : p.price,
                    originalPrice: updated.originalPrice !== undefined ? Number(updated.originalPrice) : p.originalPrice,
                  }
                : p
            ),
            loading: false,
          }));
        } catch (err: any) {
          set({ error: err.message, loading: false });
          throw err;
        }
      },
      deleteProduct: async (id: string) => {
        set({ loading: true });
        try {
          set((state) => ({
            products: state.products.filter((p) => p.id !== id),
            loading: false,
          }));
        } catch (err: any) {
          set({ error: err.message, loading: false });
          throw err;
        }
      },
      resetToDefault: () => {
        set({ products: initialProducts });
      },
    }),
    {
      name: "doxa-products-store",
      partialize: (state) => ({ products: state.products }),
    }
  )
);
