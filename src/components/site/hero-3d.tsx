"use client";

import dynamic from "next/dynamic";
import { ArrowRight, BadgeCheck, ChevronDown, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { useReducedMotion } from "framer-motion";

/* Φόρτωση 3D σκηνής μόνο στον client (χωρίς SSR) */
const Solar3DCanvas = dynamic(() => import("@/components/site/solar-3d"), {
  ssr: false,
  loading: () => <HeroCanvasFallback />,
});

function HeroCanvasFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#bfe3f7] via-[#fdf3e0] to-[#eef0e0]">
      <div className="flex animate-pulse flex-col items-center gap-3">
        <Sun className="h-12 w-12 text-[#ffcf7a]" aria-hidden />
        <p className="text-sm font-semibold text-[#0d4c74]/60">Φόρτωση 3D σκηνής…</p>
      </div>
    </div>
  );
}

const TRUST_POINTS = [
  "Δωρεάν μελέτη με πραγματικά δεδομένα κατανάλωσης",
  "Εξοπλισμός Deye · V-TAC — 10 χρόνια εγγύηση",
  "Τοπική ομάδα στη Θεσσαλονίκη",
];

export function Hero3D() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="arxiki"
      className="relative overflow-hidden bg-[#fbfaf6] pt-[72px]"
      aria-label="Εισαγωγή"
    >
      {/* διακοσμητικά background shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#2c7a3e]/8 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/2 h-[380px] w-[380px] rounded-full bg-[#0d4c74]/8 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pb-24 lg:pt-16">
        {/* Αριστερά — κείμενο */}
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2c7a3e]/25 bg-[#e9f3eb] px-4 py-1.5 text-sm font-semibold text-[#256d34]">
            <Sun className="h-4 w-4" aria-hidden />
            Ειδικοί σε Αυτόνομα &amp; Υβριδικά Φωτοβολταϊκά
          </span>

          <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.12] tracking-tight text-[#0d4c74] text-balance sm:text-5xl lg:text-[3.4rem]">
            Ηλιακή Ενέργεια,{" "}
            <span className="relative inline-block text-[#2c7a3e]">
              Ανεξάρτητη Ζωή
              <svg
                aria-hidden
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9C60 3 240 3 298 9"
                  stroke="#2c7a3e"
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity="0.35"
                />
              </svg>
            </span>
            .
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Στην <strong className="font-semibold text-foreground">ProΣτέγη</strong>{" "}
            σχεδιάζουμε και εγκαθιστούμε φωτοβολταϊκά συστήματα για κατοικίες,
            επιχειρήσεις και αγροκτήματα — στη Θεσσαλονίκη και σε όλη τη Βόρεια
            Ελλάδα. Μελέτη με πραγματικά δεδομένα, πιστοποιημένο εξοπλισμό Deye
            &amp; V-TAC και υποστήριξη που δεν σταματά στην εγκατάσταση.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="/epikoinonia">
              <Button
                size="lg"
                className="h-13 gap-2 rounded-xl bg-[#2c7a3e] px-7 font-heading text-base font-bold shadow-xl shadow-[#2c7a3e]/25 hover:bg-[#256d34]"
              >
                Ζητήστε Δωρεάν Προσφορά
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Button>
            </a>
            <a href="/proionta">
              <Button
                size="lg"
                variant="outline"
                className="h-13 rounded-xl border-[#0d4c74]/30 px-7 font-heading text-base font-bold text-[#0d4c74] hover:bg-[#0d4c74] hover:text-white"
              >
                Δείτε τα Προϊόντα
              </Button>
            </a>
          </div>

          <ul className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {TRUST_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-[15px] font-medium text-foreground/80"
              >
                <BadgeCheck className="h-5 w-5 shrink-0 text-[#2c7a3e]" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Δεξιά — 3D σκηνή */}
        <Reveal delay={0.15} className="relative">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#2c7a3e]/15 to-[#0d4c74]/15"
            />
            <div className="bg-sky-scene relative h-[300px] overflow-hidden rounded-[1.75rem] shadow-2xl shadow-[#0d4c74]/20 sm:h-[380px] lg:h-[440px]">
              <Solar3DCanvas reduceMotion={!!reduceMotion} />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d4c74]/10 via-transparent to-transparent"
              />
              {/* badge 3D */}
              <span className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#0d4c74] shadow-sm backdrop-blur">
                3D Εμπειρία · Περιστρέψτε με το ποντίκι
              </span>
            </div>

            {/* floating card — παραγωγή */}
            <div className="animate-float absolute -left-3 top-8 flex items-center gap-3 rounded-2xl bg-white/95 p-3.5 shadow-xl shadow-[#0d4c74]/15 backdrop-blur sm:-left-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9f3eb]">
                <Sun className="h-6 w-6 text-[#2c7a3e]" aria-hidden />
              </span>
              <div>
                <p className="font-heading text-lg font-extrabold leading-none text-[#0d4c74]">
                  1.400–1.600 kWh
                </p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">
                  ετησίως ανά 1 kWp εγκατεστημένο
                </p>
              </div>
            </div>

            {/* floating card — απόσβεση */}
            <div className="animate-float-delayed absolute -bottom-5 right-4 flex items-center gap-3 rounded-2xl bg-white/95 p-3.5 shadow-xl shadow-[#0d4c74]/15 backdrop-blur">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf2f8]">
                <BadgeCheck className="h-6 w-6 text-[#0d4c74]" aria-hidden />
              </span>
              <div>
                <p className="font-heading text-lg font-extrabold leading-none text-[#0d4c74]">
                  4–7 χρόνια
                </p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">
                  μέση απόσβεση επένδυσης
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* οδηγός κύλισης */}
      {!reduceMotion && (
        <a
          href="#statistika"
          aria-label="Κάντε scroll για να δείτε περισσότερα"
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[#0d4c74]/55 transition-colors hover:text-[#0d4c74] lg:flex"
        >
          <span className="text-[11px] font-bold uppercase tracking-widest">Εξερευνήστε</span>
          <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden />
        </a>
      )}
    </section>
  );
}
