import Link from "next/link";
import { Sun, BatteryCharging, Compass, Home, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { SavingsCalculator } from "@/components/site/calculator";
import { Reveal } from "@/components/site/reveal";
import { SectionHeader } from "@/components/site/sections";
import { JsonLd } from "@/components/site/json-ld";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Υπολογιστής Εξοικονόμησης Φωτοβολταϊκού — Παραγωγή, Κόστος & Απόσβεση",
  description:
    "Υπολογίστε δωρεάν πόσο ενέργεια παράγει, πόσα χρήματα εξοικονομεί και σε πόσα χρόνια αποσβένεται ένα φωτοβολταϊκό σύστημα, ανάλογα με την ισχύ (kW) και τις μπαταρίες αποθήκευσης.",
  path: "/ypologistis",
  keywords: [
    "υπολογισμός φωτοβολταϊκού",
    "πόσο παράγει φωτοβολταϊκό",
    "απόσβεση φωτοβολταϊκού",
    "φωτοβολταϊκό κόστος kW",
    "παραγωγή kWh kWp Ελλάδα",
    "εξοικονόμηση ρεύματος",
  ],
});

const FACTORS = [
  {
    icon: Sun,
    title: "Ηλιοφάνεια της περιοχής",
    text: "Στη Βόρεια Ελλάδα η ετήσια παραγωγή κυμαίνεται γύρω στα 1.400–1.500 kWh/kWp, ενώ στη Νότια Ελλάδα και τα νησιά αγγίζει τα 1.600 kWh/kWp. Η ηλιοφάνεια είναι ο πιο καθοριστικός παράγοντας της απόδοσης.",
  },
  {
    icon: Compass,
    title: "Προσανατολισμός & κλίση",
    text: "Η βέλτιστη διάταξη στην Ελλάδα είναι νότιος προσανατολισμός με κλίση 25–35 μοιρών. Οι ανατολικές ή δυτικές στέγες έχουν 10–15% χαμηλότερη απόδοση — κάτι που υπολογίζουμε με ακρίβεια στη δωρεάν μελέτη.",
  },
  {
    icon: Home,
    title: "Προφίλ κατανάλωσης",
    text: "Πόσο ρεύμα καταναλώνετε και πότε; Αν είστε περισσότεροι το βράδυ, οι μπαταρίες αποθήκευσης ανεβάζουν δραματικά την αυτοκατανάλωση από 40% στο 85–90%, αξιοποιώντας την ενέργεια του μεσημεριού.",
  },
  {
    icon: BatteryCharging,
    title: "Τύπος συστήματος & εξοπλισμός",
    text: "Το Net Billing έχει το χαμηλότερο αρχικό κόστος, ενώ τα υβριδικά με μπαταρίες μεγιστοποιούν την εξοικονόμηση μακροπρόθεσμα. Η ποιότητα των πάνελ και του inverter επηρεάζει άμεσα την ετήσια παραγωγή.",
  },
];

export default function YpologistisPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Διαδραστικό Εργαλείο"
          title="Υπολογίστε την Εξοικονόμηση από Φωτοβολταϊκά"
          lead="Μετακινήστε τον διακόπτη για να δείτε πόση ενέργεια παράγει, πόσα χρήματα εξοικονομεί και σε πόσα χρόνια αποσβένεται ένα σύστημα — ανάλογα με την ισχύ και τις μπαταρίες."
          crumbs={[{ name: "Υπολογιστής", path: "/ypologistis" }]}
        />

        {/* Ο υπολογιστής */}
        <section className="bg-white py-14 sm:py-20" aria-label="Υπολογιστής εξοικονόμησης">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SavingsCalculator />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
                Οι υπολογισμοί βασίζονται σε μέσους όρους Ελλάδας (~1.500 kWh/kWp
                ετησίως, τιμή kWh ~0,18 €, αυτοκατανάλωση 40% χωρίς μπαταρίες και
                85% με μπαταρίες). Το πραγματικό κόστος εξαρτάται από τον
                εξοπλισμό, τον χώρο και τις άδειες — ζητήστε δωρεάν μελέτη για
                εξατομικευμένους αριθμούς.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 flex justify-center">
              <Link href="/epikoinonia">
                <Button
                  size="lg"
                  className="h-13 rounded-xl bg-[#2c7a3e] px-8 font-heading text-base font-bold shadow-xl shadow-[#2c7a3e]/25 hover:bg-[#256d34]"
                >
                  Θέλω ακριβή προσφορά για το σπίτι μου
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
                </Button>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Παράγοντες */}
        <section className="bg-[#f5f3ec] py-14 sm:py-20" aria-label="Παράγοντες απόδοσης">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Πίσω από τους αριθμούς"
              title="Ποιοι Παράγοντες Καθορίζουν την Πραγματική σας Εξοικονόμηση"
              subtitle="Ο υπολογιστής δίνει ενδεικτικά νούμερα. Δείτε τι επηρεάζει την τελική απόδοση του δικού σας συστήματος."
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {FACTORS.map((factor, i) => (
                <Reveal key={factor.title} delay={i * 0.08}>
                  <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-[#0d4c74]/10">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                      <factor.icon className="h-6 w-6 text-[#2c7a3e]" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-heading text-lg font-extrabold text-[#0d4c74]">
                      {factor.title}
                    </h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                      {factor.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
