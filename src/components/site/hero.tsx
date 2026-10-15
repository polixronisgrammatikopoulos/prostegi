"use client";

import { BadgeCheck, Sun, Timer, Zap } from "lucide-react";
import { Counter, RevealStagger, RevealItem } from "@/components/site/reveal";

const STATS = [
  {
    icon: Sun,
    to: 1500,
    suffix: "+",
    decimals: 0,
    label: "kWh ετήσια παραγωγή ανά kWp στην Ελλάδα",
  },
  {
    icon: Timer,
    text: "4–7",
    label: "χρόνια μέση απόσβεση της επένδυσης",
  },
  {
    icon: Zap,
    to: 85,
    suffix: "%",
    decimals: 0,
    label: "αυτοκατανάλωση με μπαταρίες αποθήκευσης",
  },
  {
    icon: BadgeCheck,
    to: 25,
    suffix: "+",
    decimals: 0,
    label: "χρόνια διάρκεια ζωής φωτοβολταϊκών πάνελ",
  },
] as const;

export function StatsBar() {
  return (
    <section id="statistika" className="bg-brand-gradient" aria-label="Βασικά μεγέθη">
      <RevealStagger className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8 lg:py-12">
        {STATS.map((stat) => (
          <RevealItem
            key={stat.label}
            className="flex flex-col items-center gap-2 text-center"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <stat.icon className="h-6 w-6 text-[#7fc795]" aria-hidden />
            </span>
            <p className="font-heading text-3xl font-extrabold text-white lg:text-4xl">
              {"to" in stat && typeof stat.to === "number" ? (
                <Counter to={stat.to} suffix={"suffix" in stat ? stat.suffix : ""} />
              ) : (
                (stat as { text: string }).text
              )}
            </p>
            <p className="max-w-[220px] text-sm leading-snug text-white/70">{stat.label}</p>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  );
}
