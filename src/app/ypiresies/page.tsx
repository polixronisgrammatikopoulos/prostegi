import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardCheck,
  HardHat,
  FileCheck2,
  Wrench,
  BatteryCharging,
  MonitorSmartphone,
  ArrowRight,
  Sun,
} from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, RevealStagger, RevealItem } from "@/components/site/reveal";
import { Package3DExplorer } from "@/components/site/package-3d-explorer";
import { JsonLd } from "@/components/site/json-ld";
import { Button } from "@/components/ui/button";
import { buildPageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Υπηρεσίες Φωτοβολταϊκών — Μελέτη, Εγκατάσταση, Συντήρηση | Θεσσαλονίκη",
  description:
    "Πλήρεις υπηρεσίες φωτοβολταϊκών: δωρεάν μελέτη, άδειες ΡΑΕ & ΔΕΔΔΗΕ, πιστοποιημένη εγκατάσταση, συντήρηση & monitoring, αναβαθμίσεις μπαταριών. Ολοκληρωμένα πακέτα συστημάτων για κατοικίες και επιχειρήσεις.",
  path: "/ypiresies",
  keywords: [
    "υπηρεσίες φωτοβολταϊκών",
    "εγκατάσταση φωτοβολταϊκών Θεσσαλονίκη",
    "μελέτη φωτοβολταϊκού συστήματος",
    "άδειες φωτοβολταϊκών ΡΑΕ",
    "συντήρηση φωτοβολταϊκών",
    "φωτοβολταϊκά πακέτα με εγκατάσταση",
    "ολοκληρωμένα συστήματα φωτοβολταϊκών",
  ],
});

const SERVICES_LD = serviceJsonLd({
  name: "Υπηρεσίες Φωτοβολταϊκών Συστημάτων",
  description:
    "Μελέτη, εγκατάσταση, σύνδεση, συντήρηση και αναβαθμίσεις φωτοβολταϊκών συστημάτων στη Θεσσαλονίκη και τη Βόρεια Ελλάδα.",
  path: "/ypiresies",
  serviceTypes: [
    "Μελέτη & σχεδιασμός φωτοβολταϊκού",
    "Άδειες & σύνδεση ΔΕΔΔΗΕ",
    "Εγκατάσταση φωτοβολταϊκού συστήματος",
    "Συντήρηση & monitoring",
    "Αναβάθμιση με μπαταρίες λιθίου",
    "Επισκευή & τεχνική υποστήριξη",
  ],
});

const SERVICES = [
  {
    icon: ClipboardCheck,
    title: "Δωρεάν Μελέτη & Σχεδιασμός",
    text: "Αναλύουμε τους λογαριασμούς ρεύματος, τη σκίαση και τον προσανατολισμό της στέγης σας και σχεδιάζουμε το σύστημα που αποδίδει το μέγιστο — με πραγματικούς αριθμούς, όχι εκτιμήσεις «στο πόδι».",
    points: ["Ανάλυση κατανάλωσης 12μήνου", "Πρόταση 2–3 εναλλακτικών σεναρίων", "Υπολογισμός απόσβεσης"],
  },
  {
    icon: FileCheck2,
    title: "Άδειες & Σύνδεση ΔΕΔΔΗΕ",
    text: "Αναλαμβάνουμε όλη τη γραφειοκρατία: αίτηση στον ΔΕΔΔΗΕ, σύμβαση με την ΔΕΗ/πάροχο, έγκριση ΡΑΕ για μεγαλύτερα συστήματα. Εσείς υπογράφετε μία φορά — τα υπόλοιπα τα κάνουμε εμείς.",
    points: ["Αίτηση ΔΕΔΔΗΕ & πάροχου", "Διαδικασίες net billing", "Πιστοποιητικά & τεύχη μελέτης"],
  },
  {
    icon: HardHat,
    title: "Επαγγελματική Εγκατάσταση",
    text: "Πιστοποιημένο συνεργείο με δικά μας εργαλεία και εναέρια πλατφόρμα όπου χρειάζεται. Καθαρό εργοτάξιο, σωστές στεγανώσεις στις κεραμίδια και τακτοί συνδεσμοί — όπως σε δικό μας σπίτι.",
    points: ["Χρόνος εγκατάστασης 1–3 ημέρες", "Στεγανώσεις με εγγύηση", "Παράδοση με φωτογραφική τεκμηρίωση"],
  },
  {
    icon: MonitorSmartphone,
    title: "Monitoring & Παρακολούθηση",
    text: "Στήνουμε τη δωρεάν εφαρμογή στο κινητό σας και σας μαθαίνουμε να διαβάζετε την παραγωγή. Παρακολουθούμε και εμείς εξ αποστάσεως — αν κάτι πάει στραβά, συχνά το μαθαίνουμε πριν το προσέξετε.",
    points: ["Ρύθμιση εφαρμογής iOS/Android", "Τηλεπισκόπηση από την ομάδα μας", "Ετήσια αναφορά απόδοσης"],
  },
  {
    icon: BatteryCharging,
    title: "Αναβάθμιση με Μπαταρίες",
    text: "Έχετε ήδη φωτοβολταϊκό και θέλετε αποθήκευση; Συνδέουμε μπαταρίες λιθίου σε υπάρχοντα συστήματα — και με διαφορετικό inverter, με λύση DC-coupled ή AC-coupled ανά περίπτωση.",
    points: ["Συμβατότητα με κάθε μάρκα inverter", "Επέκταση χωρητικότητας αργότερα", "Επιδότηση εκπτώσεων ΔΕΔΔΗΕ"],
  },
  {
    icon: Wrench,
    title: "Συντήρηση & Service",
    text: "Καθαρισμός πάνελ, έλεγχος συνδέσεων, θερμογραφία inverter και ενημέρωση firmware. Προγράμματα συντήρησης για οικιακά και επαγγελματικά συστήματα με ετήσια ή εξαμηνιαία συχνότητα.",
    points: ["Θερμογραφική απεικόνιση", "Έλεγχος DC/AC προστασιών", "Άμεση ανταπόκριση σε βλάβες"],
  },
];

export default function YpiresiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={SERVICES_LD} />
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Υπηρεσίες & Πακέτα"
          title="Ό,τι Χρειάζεστε για Φωτοβολταϊκό — σε Ένα Σχέδιο Εργασιών"
          lead="Από τη μελέτη και τις άδειες έως την εγκατάσταση και τη συντήρηση, αναλαμβάνουμε τον κύκλο ολόκληρο. Δείτε σε 3D πώς «δένει» κάθε ολοκληρωμένο πακέτο — πάνελ, inverter και μπαταρίες σαν ένα σύστημα."
          crumbs={[{ name: "Υπηρεσίες", path: "/ypiresies" }]}
        />

        {/* 3D Εξερευνητής πακέτων */}
        <section className="bg-[#f5f3ec] py-12 sm:py-16" aria-label="Ολοκληρωμένα πακέτα σε 3D">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-9 text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#2c7a3e]/25 bg-[#e9f3eb] px-4 py-1.5 text-sm font-semibold text-[#256d34]">
                  <Sun className="h-4 w-4" aria-hidden />
                  Διαδραστικό 3D — επιλέξτε πακέτο
                </span>
                <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-[#0d4c74] sm:text-4xl">
                  Ολοκληρωμένα Πακέτα, Ζωντανά Μπροστά σας
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                  Επιλέξτε τύπο συστήματος και δείτε ακριβώς τι θα τοποθετηθεί στο σπίτι ή
                  την επιχείρησή σας. Κάθε πακέτο είναι έτοιμο — με τιμή, εξοπλισμό και
                  εγκατάσταση περιλαμβανομένων.
                </p>
              </div>
            </Reveal>
            <Package3DExplorer />
          </div>
        </section>

        {/* Υπηρεσίες */}
        <section className="bg-white py-14 sm:py-20" aria-label="Υπηρεσίες">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-10 text-center">
                <p className="text-sm font-bold uppercase tracking-wider text-[#2c7a3e]">
                  Οι Υπηρεσίες μας
                </p>
                <h2 className="mt-1 font-heading text-2xl font-extrabold text-[#0d4c74] sm:text-3xl">
                  Ένας Εταίρος για Όλη τη Διάρκεια Ζωής του Συστήματος
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                  Δεν «πουλάμε κούτες» — σχεδιάζουμε, εγκαθιστούμε και στηρίζουμε κάθε
                  σύστημα για τα επόμενα 25+ χρόνια, από την ίδια ομάδα εδώ στη Θεσσαλονίκη.
                </p>
              </div>
            </Reveal>

            <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => (
                <RevealItem key={service.title} className="h-full">
                  <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0d4c74]/8">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                      <service.icon className="h-6 w-6 text-[#2c7a3e]" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-heading text-lg font-extrabold text-[#0d4c74]">
                      {service.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.text}
                    </p>
                    <ul className="mt-4 space-y-1.5 border-t border-border pt-4">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-center gap-2 text-[13px] font-semibold text-[#256d34]">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2c7a3e]" aria-hidden />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#f5f3ec] py-14 sm:py-20" aria-label="Ζητήστε προσφορά">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="font-heading text-2xl font-extrabold text-[#0d4c74] sm:text-3xl">
                Δεν είστε σίγουροι ποιο πακέτο σας ταιριάζει;
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                Στείλτε μας τον τελευταίο λογαριασμό ρεύματος (ή απλά καλέστε μας) και θα
                σας προτείνουμε το σύστημα με τη καλύτερη απόδοση για τα δικά σας δεδομένα —
                δωρεάν, χωρίς δέσμευση.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/paketa">
                  <Button
                    size="lg"
                    className="h-13 rounded-xl bg-[#2c7a3e] px-8 font-heading text-base font-bold text-white shadow-xl shadow-[#2c7a3e]/25 hover:bg-[#256d34]"
                  >
                    Πακέτα 5–20 kW & Τιμές
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
                  </Button>
                </Link>
                <Link href="/epikoinonia">
                  <Button
                    size="lg"
                    className="h-13 rounded-xl bg-[#2c7a3e] px-8 font-heading text-base font-bold text-white shadow-xl shadow-[#2c7a3e]/25 hover:bg-[#256d34]"
                  >
                    Ζητήστε Δωρεάν Μελέτη
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
                  </Button>
                </Link>
                <Link href="/proionta">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-13 rounded-xl border-[#0d4c74]/30 px-8 font-heading text-base font-bold text-[#0d4c74] hover:bg-[#0d4c74] hover:text-white"
                  >
                    Δείτε τον Κατάλογο E-shop
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
