"use client";

import { useState } from "react";
import { RevealStagger, RevealItem } from "@/components/site/reveal";
import { ProductCard } from "@/components/site/product-card";
import { PRODUCTS, CATEGORIES, type ProductCategory } from "@/lib/products-data";
import { cn } from "@/lib/utils";

/** Πλέγμα e-shop με φίλτρα κατηγοριών */
export function CatalogGrid() {
  const [active, setActive] = useState<ProductCategory | "all">("all");

  const visible =
    active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  const offers = PRODUCTS.filter((p) => p.oldPrice && p.oldPrice > p.price).length;

  return (
    <div>
      {/* Φίλτρα κατηγοριών */}
      <div
        className="mb-8 flex flex-wrap items-center justify-center gap-2"
        role="tablist"
        aria-label="Φίλτρο κατηγορίας προϊόντων"
      >
        {CATEGORIES.map((cat) => {
          const count =
            cat.id === "all"
              ? PRODUCTS.length
              : PRODUCTS.filter((p) => p.category === cat.id).length;
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(cat.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-bold transition-all duration-200",
                isActive
                  ? "bg-[#0d4c74] text-white shadow-lg shadow-[#0d4c74]/25"
                  : "border border-[#0d4c74]/20 bg-white text-[#17324a]/80 hover:border-[#0d4c74]/50 hover:text-[#0d4c74]"
              )}
            >
              {cat.label}
              <span
                className={cn(
                  "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-extrabold",
                  isActive ? "bg-white/20 text-white" : "bg-[#e9f3eb] text-[#256d34]"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {active === "all" && offers > 0 && (
        <p className="mb-6 text-center text-sm font-semibold text-[#b3392f]">
          {offers} προϊόντα σε ειδική τιμή — η έκπτωση υπολογίζεται αυτόματα στο καλάθι
        </p>
      )}

      {/* Πλέγμα προϊόντων */}
      <RevealStagger
        key={active}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {visible.map((product) => (
          <RevealItem key={product.slug} className="h-full">
            <ProductCard product={product} />
          </RevealItem>
        ))}
      </RevealStagger>
    </div>
  );
}
