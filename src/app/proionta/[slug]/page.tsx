import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Check,
  ShieldCheck,
  Phone,
  ShoppingCart,
  PackageCheck,
  Truck,
  FileText,
  BadgePercent,
  ChevronRight,
} from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/site/reveal";
import { JsonLd } from "@/components/site/json-ld";
import { AddToCartButton } from "@/components/site/add-to-cart-button";
import { PriceTag } from "@/components/site/price-tag";
import { ProductCard } from "@/components/site/product-card";
import { Button } from "@/components/ui/button";
import { buildPageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import {
  PRODUCTS,
  getProduct,
  getRelatedProducts,
  discountPct,
  BADGE_LABEL,
  CATEGORIES,
} from "@/lib/products-data";

type Params = { slug: string };

/** Στατική παραγωγή για όλα τα προϊόντα */
export function generateStaticParams(): Params[] {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

/** Πλήρες SEO metadata ανά προϊόν */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return buildPageMetadata({
    title: `${product.name} — Τιμή, Χαρακτηριστικά & Άμεση Διαθεσιμότητα`,
    description: `${product.shortDesc} Τιμή ${product.price}€ με ΦΠΑ, εγγύηση ${product.warranty}. Παραγγελία τηλεφωνικά με εξειδικευμένη υποστήριξη στη Θεσσαλονίκη.`,
    path: `/proionta/${product.slug}`,
    keywords: [
      `${product.name} τιμή`,
      `${product.brand} Ελλάδα`,
      `${product.name} χαρακτηριστικά`,
      product.subtitle,
      `αγορά ${product.name}`,
    ],
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const pct = discountPct(product);
  const categoryLabel =
    CATEGORIES.find((c) => c.id === product.category)?.label ?? product.category;

  /** Product JSON-LD με offers + priceValidUntil για πλούσια αποτελέσματα */
  const yearEnd = new Date(new Date().getFullYear(), 11, 31).toISOString().slice(0, 10);
  const PRODUCT_LD = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.shortDesc,
    image: `${SITE_URL}${product.image}`,
    brand: { "@type": "Brand", name: product.brand },
    category: categoryLabel,
    ...(pct
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "EUR",
            lowPrice: product.price,
            highPrice: product.oldPrice,
            offerCount: 1,
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "EUR",
              availability:
                product.stock === "in"
                  ? "https://schema.org/InStock"
                  : "https://schema.org/PreOrder",
              itemCondition: "https://schema.org/NewCondition",
              priceValidUntil: yearEnd,
              url: `${SITE_URL}/proionta/${product.slug}`,
              seller: { "@type": "Organization", name: SITE_NAME },
            },
          },
        }
      : {
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "EUR",
            availability:
              product.stock === "in"
                ? "https://schema.org/InStock"
                : "https://schema.org/PreOrder",
            itemCondition: "https://schema.org/NewCondition",
            priceValidUntil: yearEnd,
            url: `${SITE_URL}/proionta/${product.slug}`,
            seller: { "@type": "Organization", name: SITE_NAME },
          },
        }),
  };

  const BREADCRUMB_LD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Αρχική", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Προϊόντα", item: `${SITE_URL}/proionta` },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${SITE_URL}/proionta/${product.slug}`,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={PRODUCT_LD} />
      <JsonLd data={BREADCRUMB_LD} />
      <SiteHeader />

      <main className="flex-1 bg-[#f5f3ec] pt-[72px]">
        {/* Breadcrumbs ορατά */}
        <nav aria-label="Ιεραρχία σελίδων" className="border-b border-border bg-white/70">
          <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-4 py-3 text-sm sm:px-6 lg:px-8">
            <li>
              <Link href="/" className="font-semibold text-muted-foreground transition-colors hover:text-[#0d4c74]">
                Αρχική
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
            </li>
            <li>
              <Link href="/proionta" className="font-semibold text-muted-foreground transition-colors hover:text-[#0d4c74]">
                Προϊόντα
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
            </li>
            <li>
              <Link href={`/proionta#${product.category}`} className="font-semibold text-muted-foreground transition-colors hover:text-[#0d4c74]">
                {categoryLabel}
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
            </li>
            <li aria-current="page" className="font-bold text-[#0d4c74]">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Κύρια ενότητα προϊόντος */}
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Εικόνα */}
              <Reveal>
                <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-white to-[#eef1ea] p-8 shadow-lg shadow-[#0d4c74]/5 sm:min-h-[440px]">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    width={560}
                    height={560}
                    priority
                    className="max-h-full w-auto object-contain"
                  />
                  <div className="absolute left-4 top-4 flex flex-col gap-2">
                    {pct && (
                      <span className="rounded-xl bg-[#b3392f] px-3 py-1.5 text-sm font-extrabold text-white shadow-lg">
                        ΕΚΠΤΩΣΗ -{pct}%
                      </span>
                    )}
                    {product.badge && !pct && (
                      <span className="rounded-xl bg-[#0d4c74] px-3 py-1.5 text-sm font-extrabold text-white shadow-lg">
                        {BADGE_LABEL[product.badge]}
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>

              {/* Πληροφορίες */}
              <Reveal delay={0.1}>
                <div className="flex h-full flex-col">
                  <p className="text-sm font-bold uppercase tracking-wider text-[#2c7a3e]">
                    {product.brand} · {product.subtitle}
                  </p>
                  <h1 className="mt-2 font-heading text-2xl font-extrabold leading-tight text-[#0d4c74] sm:text-3xl">
                    {product.name}
                  </h1>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    {product.shortDesc}
                  </p>

                  {/* Τιμή + έκπτωση */}
                  <div className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <PriceTag product={product} size="lg" />
                    <p className="mt-1.5 text-sm font-medium text-muted-foreground">
                      Τελική τιμή με ΦΠΑ 24%
                      {product.oldPrice && (
                        <> · εξοικονομείτε {(product.oldPrice - product.price).toLocaleString("el-GR")}€</>
                      )}
                    </p>

                    {/* Διαθεσιμότητα */}
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold">
                      {product.stock === "in" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#e9f3eb] px-2.5 py-1 text-[#256d34]">
                          <PackageCheck className="h-4 w-4" aria-hidden />
                          Άμεση παραλαβή από την αποθήκη μας
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#eaf2f8] px-2.5 py-1 text-[#0d4c74]">
                          <Truck className="h-4 w-4" aria-hidden />
                          Παράδοση 10–15 εργάσιμες ημέρες
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#eaf2f8] px-2.5 py-1 text-[#0d4c74]">
                        <ShieldCheck className="h-4 w-4" aria-hidden />
                        {product.warranty}
                      </span>
                    </div>

                    {/* Ενέργειες */}
                    <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                      <AddToCartButton
                        slug={product.slug}
                        name={product.name}
                        size="lg"
                        className="h-13 flex-1 justify-center text-base"
                      />
                      <a href="tel:+302310644512" className="flex-1">
                        <Button
                          size="lg"
                          variant="outline"
                          className="h-13 w-full justify-center gap-2 rounded-xl border-[#0d4c74]/30 font-heading text-base font-bold text-[#0d4c74] hover:bg-[#0d4c74] hover:text-white"
                        >
                          <Phone className="h-5 w-5" aria-hidden />
                          2310 644 512
                        </Button>
                      </a>
                    </div>

                    <p className="mt-3 flex items-start gap-2 text-[13px] leading-relaxed text-muted-foreground">
                      <ShoppingCart className="mt-0.5 h-4 w-4 shrink-0 text-[#2c7a3e]" aria-hidden />
                      Χωρίς online πληρωμή: προσθέτετε στο καλάθι, αφήνετε τα στοιχεία σας και
                      σας καλούμε εμείς για επιβεβαίωση, έκπτωση &amp; προγραμματισμό παράδοσης.
                    </p>
                  </div>

                  {/* Κορυφαία χαρακτηριστικά */}
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {product.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 rounded-xl bg-white/70 p-3 text-sm font-semibold text-[#17324a]"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2c7a3e]" aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Περιγραφή + Χαρακτηριστικά */}
        <section className="bg-white py-12 sm:py-16" aria-label="Περιγραφή και χαρακτηριστικά">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr]">
              {/* Περιγραφή */}
              <Reveal>
                <div>
                  <h2 className="font-heading text-xl font-extrabold text-[#0d4c74] sm:text-2xl">
                    Περιγραφή
                  </h2>
                  <div className="mt-4 space-y-4">
                    {product.description.map((para) => (
                      <p key={para.slice(0, 40)} className="text-[15px] leading-relaxed text-muted-foreground">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Περιλαμβάνονται (πακέτα) */}
                  {product.includes && (
                    <div className="mt-8">
                      <h3 className="flex items-center gap-2 font-heading text-lg font-extrabold text-[#0d4c74]">
                        <FileText className="h-5 w-5 text-[#2c7a3e]" aria-hidden />
                        Τι περιλαμβάνεται στο πακέτο
                      </h3>
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {product.includes.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 rounded-xl border border-[#2c7a3e]/15 bg-[#e9f3eb]/50 p-3 text-sm font-semibold text-[#256d34]"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Reveal>

              {/* Πίνακας χαρακτηριστικών */}
              <Reveal delay={0.1}>
                <div>
                  <h2 className="font-heading text-xl font-extrabold text-[#0d4c74] sm:text-2xl">
                    Τεχνικά Χαρακτηριστικά
                  </h2>
                  <dl className="mt-4 overflow-hidden rounded-2xl border border-border">
                    {product.specs.map((spec, i) => (
                      <div
                        key={spec.label}
                        className={`grid grid-cols-2 gap-3 px-4 py-3 text-sm sm:px-5 ${
                          i % 2 === 0 ? "bg-[#f8f7f2]" : "bg-white"
                        }`}
                      >
                        <dt className="font-bold text-[#17324a]">{spec.label}</dt>
                        <dd className="text-muted-foreground">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#eaf2f8] p-4 text-sm text-[#0d4c74]">
                    <BadgePercent className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    <p>
                      Για ποσότητες άνω των 10 τεμαχίων ή για συνδυασμένη προσφορά με εγκατάσταση,
                      καλούμε στο <a href="tel:+302310644512" className="font-bold underline">2310 644 512</a> — η
                      τελική τιμή βγαίνει καλύτερη πάντα στο τηλέφωνο.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Σχετικά προϊόντα */}
        {related.length > 0 && (
          <section className="bg-[#f5f3ec] py-12 sm:py-16" aria-label="Σχετικά προϊόντα">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <div className="mb-8 text-center">
                  <p className="text-sm font-bold uppercase tracking-wider text-[#2c7a3e]">
                    Συνδυάστε σωστά
                  </p>
                  <h2 className="mt-1 font-heading text-2xl font-extrabold text-[#0d4c74] sm:text-3xl">
                    Σχετικά Προϊόντα που Αναβαθμίζουν το Σύστημά σας
                  </h2>
                  <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                    Προτάσεις 100% συμβατές με το {product.name} — επιλεγμένες από τους μηχανικούς μας,
                    όχι τυχαίες.
                  </p>
                </div>
              </Reveal>
              <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((rel) => (
                  <RevealItem key={rel.slug} className="h-full">
                    <ProductCard product={rel} />
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
