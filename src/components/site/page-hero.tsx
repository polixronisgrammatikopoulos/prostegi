import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";

type Crumb = { name: string; path: string };

/**
 * Ενιαίο hero banner για τις εσωτερικές σελίδες, με breadcrumbs,
 * eyebrow, τίτλο H1 και lead περιγραφή.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  crumbs: Crumb[];
}) {
  const allCrumbs: Crumb[] = [{ name: "Αρχική", path: "/" }, ...crumbs];

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[#f5f3ec] via-[#fbfaf6] to-[#fbfaf6] pt-[72px]">
      {/* διακοσμητικά σχήματα */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[#2c7a3e]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 bottom-0 h-72 w-72 rounded-full bg-[#0d4c74]/10 blur-3xl"
      />
      {/* ηλιακές ακτίνες */}
      <svg
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-10 hidden h-28 w-28 opacity-25 lg:block"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="18" fill="#ffcf7a" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI) / 6;
          return (
            <line
              key={i}
              x1={50 + Math.cos(angle) * 24}
              y1={50 + Math.sin(angle) * 24}
              x2={50 + Math.cos(angle) * 44}
              y2={50 + Math.sin(angle) * 44}
              stroke="#ffcf7a"
              strokeWidth="4"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8 lg:pb-16 lg:pt-16">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-muted-foreground">
            {allCrumbs.map((crumb, i) => {
              const isLast = i === allCrumbs.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />}
                  {isLast ? (
                    <span aria-current="page" className="font-semibold text-[#2c7a3e]">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.path}
                      className="transition-colors hover:text-[#0d4c74]"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <Reveal className="max-w-3xl">
          <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-accent-foreground">
            {eyebrow}
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[1.14] tracking-tight text-[#0d4c74] text-balance sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {lead}
          </p>
        </Reveal>
      </div>

      {/* BreadcrumbList JSON-LD */}
      <JsonLd data={breadcrumbJsonLd(allCrumbs)} />
    </section>
  );
}
