"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, Menu, Phone, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useCart, productsLabel } from "@/lib/cart-store";
import { useHasMounted } from "@/hooks/use-has-mounted";

export const NAV_ITEMS = [
  { href: "/", label: "Αρχική" },
  { href: "/fotovoltaika", label: "Φωτοβολταϊκά" },
  { href: "/paketa", label: "Πακέτα", highlight: true },
  { href: "/proionta", label: "Προϊόντα" },
  { href: "/ypiresies", label: "Υπηρεσίες" },
  { href: "/ypologistis", label: "Υπολογιστής" },
  { href: "/etaireia", label: "Η Εταιρεία" },
  { href: "/faq", label: "Ερωτήσεις" },
  { href: "/epikoinonia", label: "Επικοινωνία" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const hasMounted = useHasMounted();
  const cartCount = useCart((s) =>
    s.items.reduce((acc, i) => acc + i.qty, 0)
  );
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-white/95 shadow-md shadow-black/5 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="ProΣτέγη — Αρχική"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 p-1 transition-colors">
            <Image
              src="/logo.png"
              alt="Λογότυπο ProΣτέγη"
              width={48}
              height={48}
              className="h-11 w-11 object-contain"
              priority
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-xl font-extrabold tracking-tight text-[#0d4c74]">
              ProΣτέγη
            </span>
            <span className="text-[11px] font-medium tracking-wide text-[#2c7a3e]">
              Ηλιακή Ενέργεια, Ανεξάρτητη Ζωή
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Κύρια πλοήγηση">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            if (item.highlight) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "ml-1 flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold shadow-md transition-all",
                    active
                      ? "bg-[#256d34] text-white shadow-[#2c7a3e]/30"
                      : "bg-[#2c7a3e] text-white shadow-[#2c7a3e]/25 hover:bg-[#256d34]"
                  )}
                >
                  <Boxes className="h-4 w-4" aria-hidden />
                  {item.label}
                </Link>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-semibold transition-colors",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-[#17324a]/85 hover:bg-accent/60 hover:text-[#0d4c74]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Καλάθι */}
          <Link
            href="/kalathi"
            aria-label={`Καλάθι αγορών${hasMounted && cartCount > 0 ? ` (${productsLabel(cartCount)})` : ""}`}
            className="relative rounded-xl border border-border bg-white/90 p-2.5 transition-colors hover:border-[#2c7a3e]/50 hover:bg-accent"
          >
            <ShoppingCart className="h-5 w-5 text-[#0d4c74]" aria-hidden />
            {hasMounted && cartCount > 0 && (
              <span
                className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b3392f] px-1 text-[11px] font-extrabold text-white shadow"
                aria-hidden
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Phone CTA */}
          <a href="tel:+302310644512" className="hidden sm:block">
            <Button className="gap-2 rounded-xl bg-[#2c7a3e] px-4 font-heading font-bold shadow-lg shadow-[#2c7a3e]/25 hover:bg-[#256d34]">
              <Phone className="h-4 w-4" aria-hidden />
              2310 644 512
            </Button>
          </a>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-border bg-white/90 lg:hidden"
                aria-label="Άνοιγμα μενού"
              >
                <Menu className="h-5 w-5 text-[#0d4c74]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 font-heading text-[#0d4c74]">
                  <Image
                    src="/logo.png"
                    alt="Λογότυπο ProΣτέγη"
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                  />
                  ProΣτέγη
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-2 flex flex-col gap-1 px-4" aria-label="Μενού κινητού">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-3 text-base font-semibold transition-colors",
                      isActive(item.href)
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground/85 hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <a href="tel:+302310644512" onClick={() => setOpen(false)}>
                  <Button className="mt-4 w-full gap-2 rounded-xl bg-[#2c7a3e] font-heading font-bold hover:bg-[#256d34]">
                    <Phone className="h-4 w-4" aria-hidden />
                    2310 644 512
                  </Button>
                </a>
                <Link
                  href="/kalathi"
                  onClick={() => setOpen(false)}
                  className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-[#0d4c74]/25 px-3 py-3 text-base font-semibold text-[#0d4c74]"
                >
                  <ShoppingCart className="h-5 w-5" aria-hidden />
                  Καλάθι Αγορών
                  {hasMounted && cartCount > 0 && (
                    <span className="rounded-full bg-[#b3392f] px-2 py-0.5 text-xs font-extrabold text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
