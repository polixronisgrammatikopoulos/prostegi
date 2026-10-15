"use client";

/**
 * Καλάθι αγορών ProΣτέγη — Zustand store με αποθήκευση στο localStorage.
 * Το e-shop λειτουργεί με τηλεφωνική επιβεβαίωση: ο πελάτης συμπληρώνει
 * τη φόρμα παραγγελίας και τον καλούμε εμείς για την οριστικοποίηση.
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getProduct, type Product } from "@/lib/products-data";

export type CartItem = {
  slug: string;
  qty: number;
};

export type CartLine = {
  product: Product;
  qty: number;
  lineTotal: number;
};

type CartState = {
  items: CartItem[];
  addItem: (slug: string, qty?: number) => void;
  removeItem: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (slug, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.slug === slug);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.slug === slug ? { ...i, qty: Math.min(99, i.qty + qty) } : i
              ),
            };
          }
          return { items: [...state.items, { slug, qty }] };
        }),
      removeItem: (slug) =>
        set((state) => ({ items: state.items.filter((i) => i.slug !== slug) })),
      setQty: (slug, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.slug !== slug)
              : state.items.map((i) =>
                  i.slug === slug ? { ...i, qty: Math.min(99, qty) } : i
                ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "prostegi-cart-v1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/** Σωστή ελληνική κλίση: 1 προϊόν, 2 προϊόντα, 21 προϊόν… */
export function productsLabel(n: number): string {
  const singular = n === 1 || (n % 10 === 1 && n % 100 !== 11);
  return `${n} ${singular ? "προϊόν" : "προϊόντα"}`;
}

/** Υπολογίζει τις γραμμές, το σύνολο και την εξοικονόμηση από εκπτώσεις */
export function computeCart(items: CartItem[]): {
  lines: CartLine[];
  total: number;
  savings: number;
  count: number;
} {
  const lines: CartLine[] = [];
  let total = 0;
  let savings = 0;
  let count = 0;

  for (const item of items) {
    const product = getProduct(item.slug);
    if (!product) continue;
    const lineTotal = product.price * item.qty;
    total += lineTotal;
    if (product.oldPrice && product.oldPrice > product.price) {
      savings += (product.oldPrice - product.price) * item.qty;
    }
    count += item.qty;
    lines.push({ product, qty: item.qty, lineTotal });
  }

  return { lines, total, savings, count };
}
