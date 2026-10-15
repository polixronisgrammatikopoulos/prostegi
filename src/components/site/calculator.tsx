"use client";

import { useMemo, useState } from "react";
import {
  Banknote,
  BatteryCharging,
  Leaf,
  Sun,
  Zap,
  Info,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Ενδεικτικός υπολογιστής φωτοβολταϊκού συστήματος.
 * Βάσεις υπολογισμού (μέσοι όροι Ελλάδας):
 *  - Παραγωγή: ~1.500 kWh ανά kWp ετησίως (εύρος 1.400–1.600)
 *  - Τιμή ρεύματος: ~0,18 €/kWh
 *  - Αυτοκατανάλωση: 40% χωρίς μπαταρίες, 85% με μπαταρίες
 *  - Κόστος: ~1.000 €/kW χωρίς αποθήκευση, ~1.700 €/kW με αποθήκευση
 */
const KWH_PER_KWP = 1500;
const PRICE_PER_KWH = 0.18;
const SELF_CONSUMPTION_NO_BATTERY = 0.4;
const SELF_CONSUMPTION_WITH_BATTERY = 0.85;
const COST_PER_KW_NO_BATTERY = 1000;
const COST_PER_KW_WITH_BATTERY = 1700;

function fmt(n: number, digits = 0) {
  return n.toLocaleString("el-GR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function SavingsCalculator() {
  const [kw, setKw] = useState(5);
  const [withBattery, setWithBattery] = useState(true);

  const result = useMemo(() => {
    const annualProduction = kw * KWH_PER_KWP;
    const selfConsumption = withBattery
      ? SELF_CONSUMPTION_WITH_BATTERY
      : SELF_CONSUMPTION_NO_BATTERY;
    const selfUsed = annualProduction * selfConsumption;
    const annualSavings = selfUsed * PRICE_PER_KWH;
    const totalCost = kw * (withBattery ? COST_PER_KW_WITH_BATTERY : COST_PER_KW_NO_BATTERY);
    const payback = annualSavings > 0 ? totalCost / annualSavings : 0;
    const co2 = annualProduction * 0.4; // kg CO2 αποφεύγεται ανά kWh (ενδεικτικά)

    return {
      annualProduction,
      annualSavings,
      payback,
      co2,
      selfConsumption,
      totalCost,
      selfUsed,
    };
  }, [kw, withBattery]);

  return (
    <Card className="overflow-hidden border-0 shadow-xl shadow-[#0d4c74]/10">
      <CardContent className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:p-10">
        {/* Inputs */}
        <div className="flex flex-col justify-center gap-8">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <Label htmlFor="kw-slider" className="font-heading text-base font-bold text-foreground">
                Ισχύς συστήματος
              </Label>
              <span className="rounded-lg bg-accent px-3 py-1 font-heading text-lg font-extrabold text-accent-foreground">
                {kw} kW
              </span>
            </div>
            <Slider
              id="kw-slider"
              min={1}
              max={20}
              step={1}
              value={[kw]}
              onValueChange={(v) => setKw(v[0] ?? kw)}
              aria-label="Επιλογή ισχύος συστήματος σε kW"
            />
            <div className="mt-2 flex justify-between text-xs font-medium text-muted-foreground">
              <span>1 kW</span>
              <span>20 kW</span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border bg-muted/50 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0d4c74]/10">
                <BatteryCharging className="h-5 w-5 text-[#0d4c74]" aria-hidden />
              </span>
              <div>
                <Label htmlFor="battery-switch" className="font-heading text-sm font-bold text-foreground">
                  Με μπαταρίες αποθήκευσης
                </Label>
                <p className="text-xs text-muted-foreground">
                  Αυξάνουν την αυτοκατανάλωση στο 85%
                </p>
              </div>
            </div>
            <Switch
              id="battery-switch"
              checked={withBattery}
              onCheckedChange={setWithBattery}
              aria-label="Συμπερίληψη μπαταριών αποθήκευσης"
            />
          </div>

          <div className="flex items-start gap-2 rounded-lg bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <p>
              Οι τιμές είναι <strong className="text-foreground">ενδεικτικές</strong> και βασίζονται
              σε μέσους όρους Ελλάδας (~1.500 kWh/kWp ετησίως, τιμή kWh ~0,18 €). Η τελική
              μελέτη γίνεται δωρεάν από τους μηχανικούς μας.
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <ResultTile
            icon={<Sun className="h-5 w-5" aria-hidden />}
            label="Ετήσια παραγωγή"
            value={`${fmt(result.annualProduction)} kWh`}
            tone="navy"
          />
          <ResultTile
            icon={<Banknote className="h-5 w-5" aria-hidden />}
            label="Ετήσια εξοικονόμηση"
            value={`${fmt(result.annualSavings)} €`}
            tone="green"
          />
          <ResultTile
            icon={<Zap className="h-5 w-5" aria-hidden />}
            label="Αυτοκατανάλωση"
            value={`${Math.round(result.selfConsumption * 100)}%`}
            tone="green"
          />
          <ResultTile
            icon={<Leaf className="h-5 w-5" aria-hidden />}
            label="CO₂ που αποφεύγεται"
            value={`${fmt(result.co2 / 1000, 1)} τ/έτος`}
            tone="navy"
          />

          <div className="col-span-2 rounded-xl bg-[#0d4c74] p-4 text-white sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-heading text-sm font-semibold text-white/80">
                Ενδεικτική απόσβεση επένδυσης
              </span>
              <span className="font-heading text-2xl font-extrabold sm:text-3xl">
                {result.payback.toFixed(1)} χρόνια
              </span>
            </div>
            <p className="mt-2 text-xs text-white/70">
              Με ενδεικτικό κόστος {fmt(result.totalCost)} €, το σύστημα αποσβένεται
              μέσα σε {result.payback.toFixed(1)} έτη — και συνεχίζει να εξοικονομεί
              για 25+ χρόνια.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ResultTile({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "green" | "navy";
}) {
  const green = tone === "green";
  return (
    <div
      className={`rounded-xl border p-4 ${
        green ? "border-[#2c7a3e]/20 bg-[#e9f3eb]" : "border-[#0d4c74]/15 bg-[#eaf2f8]"
      }`}
    >
      <span
        className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg ${
          green ? "bg-[#2c7a3e]/15 text-[#256d34]" : "bg-[#0d4c74]/15 text-[#0d4c74]"
        }`}
      >
        {icon}
      </span>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p
        className={`font-heading text-lg font-extrabold sm:text-xl ${
          green ? "text-[#256d34]" : "text-[#0d4c74]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
