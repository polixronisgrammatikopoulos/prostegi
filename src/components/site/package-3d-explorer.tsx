"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Sun, Boxes, House, Building2, ArrowRight, RotateCw } from "lucide-react";
import { AddToCartButton } from "@/components/site/add-to-cart-button";
import { PriceTag } from "@/components/site/price-tag";
import { cn } from "@/lib/utils";
import { getProduct } from "@/lib/products-data";
import type { PackageVariant } from "@/components/site/package-3d";

/* Φόρτωση 3D σκηνής μόνο στον client */
const Package3DScene = dynamic(() => import("@/components/site/package-3d"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#bfe3f7] via-[#fdf3e0] to-[#eef0e0]">
      <div className="flex animate-pulse flex-col items-center gap-3">
        <Sun className="h-12 w-12 text-[#ffcf7a]" aria-hidden />
        <p className="text-sm font-semibold text-[#0d4c74]/60">Φόρτωση 3D πακέτου…</p>
      </div>
    </div>
  ),
});

const TABS: {
  id: PackageVariant;
  label: string;
  sub: string;
  icon: typeof House;
}[] = [
  { id: "net", label: "Net-Billing", sub: "Κατοικία", icon: House },
  { id: "hybrid", label: "Υβριδικό Αυτονομίας", sub: "Με μπαταρίες", icon: Boxes },
  { id: "pro", label: "Επαγγελματικό", sub: "Επιχειρήσεις", icon: Building2 },
];

/**
 * Διαδραστικός 3D εξερευνητής ολοκληρωμένων πακέτων.
 * Οι 3 παραλλαγές συνδέονται με τα πραγματικά πακέτα του e-shop.
 */
export function Package3DExplorer() {
  const [variant, setVariant] = useState<PackageVariant>("net");
  const reduceMotion = useReducedMotion();
  const product = getProduct(
    variant === "net"
      ? "package-net-billing-5kwp"
      : variant === "hybrid"
        ? "package-hybrid-10kwp"
        : "package-pro-30kwp"
  )!;

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1.35fr_1fr]">
      {/* 3D Canvas + tabs */}
      <div>
        <div className="bg-sky-scene relative h-[320px] overflow-hidden rounded-[1.75rem] shadow-2xl shadow-[#0d4c74]/15 sm:h-[420px]">
          <Package3DScene variant={variant} reduceMotion={!!reduceMotion} />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d4c74]/10 via-transparent to-transparent"
          />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#0d4c74] shadow-sm backdrop-blur">
            <RotateCw className="h-3 w-3" aria-hidden />
            3D · Περιστρέφεται αυτόματα
          </span>
        </div>

        {/* Tabs */}
        <div
          className="mt-4 grid grid-cols-3 gap-2"
          role="tablist"
          aria-label="Επιλογή πακέτου"
        >
          {TABS.map((tab) => {
            const active = variant === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active}
                onClick={() => setVariant(tab.id)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl px-3 py-3 text-center transition-all duration-200",
                  active
                    ? "bg-[#0d4c74] text-white shadow-lg shadow-[#0d4c74]/25"
                    : "border border-[#0d4c74]/20 bg-white text-[#17324a]/75 hover:border-[#0d4c74]/45 hover:text-[#0d4c74]"
                )}
              >
                <tab.icon className="h-5 w-5" aria-hidden />
                <span className="text-[13px] font-bold leading-tight">{tab.label}</span>
                <span
                  className={cn(
                    "text-[11px] font-semibold",
                    active ? "text-white/70" : "text-muted-foreground"
                  )}
                >
                  {tab.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Κάρτα πακέτου */}
      <aside
        key={variant}
        className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-lg shadow-[#0d4c74]/5 sm:p-7"
      >
        <div className="flex items-start gap-4">
          <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-[#eef1ea] p-2">
            <Image
              src={product.image}
              alt={product.alt}
              width={96}
              height={96}
              className="max-h-full w-auto object-contain"
            />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#2c7a3e]">
              {product.subtitle}
            </p>
            <h3 className="mt-1 font-heading text-xl font-extrabold leading-snug text-[#0d4c74]">
              {product.name}
            </h3>
          </div>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          {product.shortDesc}
        </p>

        <ul className="mt-4 space-y-2">
          {product.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm font-semibold text-[#17324a]">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2c7a3e]" aria-hidden />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <PriceTag product={product} />
          <p className="mt-1 text-[11px] font-medium text-muted-foreground">
            Τελική τιμή με ΦΠΑ 24% — περιλαμβάνεται πλήρης εγκατάσταση
          </p>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <AddToCartButton
              slug={product.slug}
              name={product.name}
              className="h-12 flex-1 justify-center"
            />
            <Link
              href={`/proionta/${product.slug}`}
              className="inline-flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#0d4c74]/25 px-4 text-sm font-bold text-[#0d4c74] transition-colors hover:bg-[#0d4c74] hover:text-white"
            >
              Χαρακτηριστικά
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
