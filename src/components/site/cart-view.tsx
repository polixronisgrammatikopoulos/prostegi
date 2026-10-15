"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  PhoneCall,
  ShieldCheck,
  PiggyBank,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, computeCart } from "@/lib/cart-store";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { formatPrice } from "@/lib/products-data";

/** Πλήρης προβολή καλαθιού — χρησιμοποιείται στη σελίδα /kalathi */
export function CartView() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const removeItem = useCart((s) => s.removeItem);
  const mounted = useHasMounted();

  const { lines, total, savings, count } = computeCart(items);

  if (!mounted) {
    // Αποφυγή hydration mismatch: το localStorage δεν είναι διαθέσιμο στο SSR
    return (
      <div className="flex h-64 items-center justify-center rounded-3xl border border-border bg-card" aria-busy="true">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2c7a3e]/20 border-t-[#2c7a3e]" aria-hidden />
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-sm">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e9f3eb]">
          <ShoppingCart className="h-10 w-10 text-[#2c7a3e]" aria-hidden />
        </span>
        <h2 className="mt-5 font-heading text-2xl font-extrabold text-[#0d4c74]">
          Το καλάθι σας είναι άδειο
        </h2>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          Περιηγηθείτε στον κατάλογό μας και προσθέστε τον εξοπλισμό που σας ενδιαφέρει.
          Δεν χρειάζεται λογαριασμός και δεν υπάρχει online πληρωμή.
        </p>
        <Link href="/proionta" className="mt-6">
          <Button
            size="lg"
            className="h-13 rounded-xl bg-[#2c7a3e] px-8 font-heading text-base font-bold text-white shadow-xl shadow-[#2c7a3e]/25 hover:bg-[#256d34]"
          >
            Δείτε τα Προϊόντα
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
      {/* Γραμμές καλαθιού */}
      <div className="flex flex-col gap-4">
        {lines.map(({ product, qty, lineTotal }) => (
          <div
            key={product.slug}
            className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5"
          >
            <Link
              href={`/proionta/${product.slug}`}
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white to-[#eef1ea] p-2"
              aria-label={product.name}
            >
              <Image
                src={product.image}
                alt={product.alt}
                width={96}
                height={96}
                className="max-h-full w-auto object-contain"
              />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link
                    href={`/proionta/${product.slug}`}
                    className="block truncate font-heading text-base font-extrabold text-[#0d4c74] transition-colors hover:text-[#2c7a3e] sm:text-lg"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-[#2c7a3e]">
                    {product.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(product.slug)}
                  aria-label={`Αφαίρεση: ${product.name}`}
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-[#fbeaea] hover:text-[#b3392f]"
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                </button>
              </div>

              <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
                {/* Ποσότητα */}
                <div className="flex items-center gap-1 rounded-xl border border-border bg-white p-1">
                  <button
                    onClick={() => setQty(product.slug, qty - 1)}
                    aria-label={`Μείωση ποσότητας: ${product.name}`}
                    className="rounded-lg p-1.5 text-[#0d4c74] transition-colors hover:bg-[#eaf2f8]"
                  >
                    <Minus className="h-4 w-4" aria-hidden />
                  </button>
                  <span className="min-w-8 text-center text-sm font-extrabold text-[#17324a]" aria-live="polite">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(product.slug, qty + 1)}
                    aria-label={`Αύξηση ποσότητας: ${product.name}`}
                    className="rounded-lg p-1.5 text-[#0d4c74] transition-colors hover:bg-[#eaf2f8]"
                  >
                    <Plus className="h-4 w-4" aria-hidden />
                  </button>
                </div>

                {/* Τιμή γραμμής */}
                <div className="text-right">
                  {product.oldPrice && (
                    <span className="mr-2 text-sm font-semibold text-muted-foreground line-through">
                      {formatPrice(product.oldPrice * qty)}
                    </span>
                  )}
                  <span className="font-heading text-lg font-extrabold text-[#0d4c74]">
                    {formatPrice(lineTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Link
          href="/proionta"
          className="self-start text-sm font-bold text-[#2c7a3e] underline decoration-[#2c7a3e]/40 underline-offset-4 transition-colors hover:text-[#256d34]"
        >
          ← Συνέχεια αγορών
        </Link>
      </div>

      {/* Σύνοψη */}
      <aside className="rounded-3xl border border-border bg-card p-6 shadow-lg shadow-[#0d4c74]/5 lg:sticky lg:top-24">
        <h2 className="font-heading text-xl font-extrabold text-[#0d4c74]">
          Σύνοψη Παραγγελίας
        </h2>

        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="font-semibold text-muted-foreground">Προϊόντα ({count})</dt>
            <dd className="font-bold text-[#17324a]">{formatPrice(total + savings)}</dd>
          </div>
          {savings > 0 && (
            <div className="flex items-center justify-between text-[#b3392f]">
              <dt className="flex items-center gap-1.5 font-semibold">
                <PiggyBank className="h-4 w-4" aria-hidden />
                Έκπτωση
              </dt>
              <dd className="font-extrabold">-{formatPrice(savings)}</dd>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-border pt-3">
            <dt className="font-heading text-base font-extrabold text-[#0d4c74]">Σύνολο (με ΦΠΑ)</dt>
            <dd className="font-heading text-2xl font-extrabold text-[#0d4c74]">
              {formatPrice(total)}
            </dd>
          </div>
        </dl>

        <Link href="/oloklirosi-paraggelias" className="mt-6 block">
          <Button
            size="lg"
            className="h-13 w-full justify-center rounded-xl bg-[#2c7a3e] font-heading text-base font-bold text-white shadow-xl shadow-[#2c7a3e]/25 hover:bg-[#256d34]"
          >
            Ολοκλήρωση Παραγγελίας
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
          </Button>
        </Link>

        <div className="mt-5 space-y-2.5 rounded-xl bg-[#eaf2f8] p-4 text-[13px] leading-relaxed text-[#0d4c74]">
          <p className="flex items-start gap-2">
            <PhoneCall className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>
              <strong>Χωρίς online πληρωμή.</strong> Στην επόμενη φόρμα αφήνετε το τηλέφωνό σας
              και σας καλούμε εμείς για επιβεβαίωση &amp; καλύτερη τιμή.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>Όλες οι τιμές τελικές με ΦΠΑ 24%, με επίσημη εγγύηση αντιπροσωπείας.</span>
          </p>
        </div>
      </aside>
    </div>
  );
}
