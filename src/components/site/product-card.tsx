"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PackageCheck, Truck } from "lucide-react";
import { AddToCartButton } from "@/components/site/add-to-cart-button";
import { PriceTag } from "@/components/site/price-tag";
import {
  BADGE_LABEL,
  discountPct,
  formatPrice,
  type Product,
} from "@/lib/products-data";

/** Καρτέλα προϊόντος για το πλέγμα του e-shop */
export function ProductCard({ product }: { product: Product }) {
  const pct = discountPct(product);
  const badgeLabel = product.badge ? BADGE_LABEL[product.badge] : null;
  const badgeStyle =
    product.badge === "offer" || pct
      ? "bg-[#b3392f] text-white"
      : product.badge === "new"
        ? "bg-[#0d4c74] text-white"
        : "bg-[#0d4c74] text-white";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#0d4c74]/10">
      {/* Εικόνα + badges */}
      <Link
        href={`/proionta/${product.slug}`}
        className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-white to-[#eef1ea] p-4"
        aria-label={`Λεπτομέρειες: ${product.name}`}
      >
        <Image
          src={product.image}
          alt={product.alt}
          width={400}
          height={400}
          className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {pct ? (
            <span className="rounded-lg bg-[#b3392f] px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-white shadow">
              ΕΚΠΤΩΣΗ -{pct}%
            </span>
          ) : badgeLabel ? (
            <span
              className={`rounded-lg px-2.5 py-1 text-[11px] font-extrabold tracking-wide shadow ${badgeStyle}`}
            >
              {badgeLabel}
            </span>
          ) : null}
        </div>
        {product.stock === "order" ? (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-[#0d4c74]/90 px-2 py-1 text-[10px] font-bold text-white">
            <Truck className="h-3 w-3" aria-hidden />
            Κατόπιν παραγγελίας
          </span>
        ) : (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-[#e9f3eb] px-2 py-1 text-[10px] font-bold text-[#256d34]">
            <PackageCheck className="h-3 w-3" aria-hidden />
            Άμεση παραλαβή
          </span>
        )}
      </Link>

      {/* Περιεχόμενο */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-[#2c7a3e]">
          {product.subtitle}
        </p>
        <h3 className="mt-1.5 font-heading text-lg font-extrabold leading-snug text-[#0d4c74]">
          <Link href={`/proionta/${product.slug}`} className="transition-colors hover:text-[#2c7a3e]">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.shortDesc}
        </p>

        {/* Τιμή */}
        <div className="mt-4 flex-1">
          <PriceTag product={product} />
          <p className="mt-1 text-[11px] font-medium text-muted-foreground">
            Τελική τιμή με ΦΠΑ 24%
          </p>
        </div>

        {/* Ενέργειες */}
        <div className="mt-4 flex flex-col gap-2">
          <AddToCartButton
            slug={product.slug}
            name={product.name}
            size="sm"
            className="h-11 w-full justify-center text-sm"
          />
          <Link
            href={`/proionta/${product.slug}`}
            className="inline-flex items-center justify-center gap-1 rounded-xl border border-[#0d4c74]/25 px-4 py-2.5 text-sm font-bold text-[#0d4c74] transition-colors hover:bg-[#0d4c74] hover:text-white"
          >
            Λεπτομέρειες & Χαρακτηριστικά
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Πλακέτα τιμής για μικρές προβολές (π.χ. related products) */
export function MiniPrice({ product }: { product: Product }) {
  return (
    <span className="text-sm font-extrabold text-[#0d4c74]">
      {formatPrice(product.price)}
      {product.oldPrice && (
        <span className="ml-1.5 text-xs font-semibold text-muted-foreground line-through">
          {formatPrice(product.oldPrice)}
        </span>
      )}
    </span>
  );
}
