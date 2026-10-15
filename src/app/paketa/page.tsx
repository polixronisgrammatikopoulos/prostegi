import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  FileCheck2,
  HardHat,
  Phone,
  ShieldCheck,
  Sun,
  Zap,
} from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { PaketaGrid } from "@/components/site/paketa-grid";
import { Reveal, RevealStagger, RevealItem } from "@/components/site/reveal";
import { FaqSection } from "@/components/site/faq";
import { JsonLd } from "@/components/site/json-ld";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo";
import { PAKETA } from "@/lib/paketa-data";

export const metadata = buildPageMetadata({
  title:
    "Ολοκληρωμένα Πακέτα Φωτοβολταϊκών 5–20 kW — Τιμές | Σπίτι & Επιχείρηση",
  description:
    "Ολοκληρωμένα φωτοβολταϊκά πακέτα με εγκατάσταση: σύστημα 10 kW στα 8.500€, σύστημα 20 kW στα 14.000€ και λύσεις 5–16 kW για σπίτι και επιχείρηση. Πάνελ, inverter, άδειες ΔΕΔΔΗΕ και πιστοποιημένο συνεργείο — τελική τιμή με ΦΠΑ, 10 χρόνια εγγύηση.",
  path: "/paketa",
  keywords: [
    "ολοκληρωμένα πακέτα φωτοβολταϊκών",
    "φωτοβολταϊκό σύστημα 10kw τιμή",
    "φωτοβολταϊκό πακέτο 5kw",
    "φωτοβολταϊκό σύστημα 12kw",
    "φωτοβολταϊκό σύστημα 16kw",
    "φωτοβολταϊκό σύστημα 20kw τιμή",
    "πακέτο φωτοβολταϊκών με εγκατάσταση",
    "φωτοβολταϊκά για επιχειρήσεις",
    "φωτοβολταϊκά για το σπίτι",
    "τιμή φωτοβολταϊκού συστήματος",
    "πακέτα φωτοβολταϊκών Θεσσαλονίκη",
  ],
});

/* ---------------- JSON-LD ---------------- */

const PAKETA_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ολοκληρωμένα Πακέτα Φωτοβολταϊκών Συστημάτων 5–20 kW",
  description:
    "Έτοιμα πακέτα φωτοβολταϊκών συστημάτων με εξοπλισμό, μελέτη, άδειες και πλήρη εγκατάσταση, για κατοικίες και επιχειρήσεις.",
  itemListElement: PAKETA.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.name,
      description: p.description,
      url: `https://www.prostegi.gr/paketa#${p.id}`,
      brand: { "@type": "Brand", name: "ProΣτέγη" },
      category: "Φωτοβολταϊκά Συστήματα",
      ...(p.price !== null
        ? {
            offers: {
              "@type": "Offer",
              price: p.price,
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              priceValidUntil: "2026-12-31",
              url: `https://www.prostegi.gr/paketa#${p.id}`,
              seller: {
                "@type": "Organization",
                name: "ProΣτέγη",
              },
            },
          }
        : {}),
    },
  })),
};

const PAKETA_FAQ = [
  {
    question: "Πόσο κοστίζει ένα ολοκληρωμένο φωτοβολταϊκό σύστημα 10 kW;",
    answer:
      "Το ολοκληρωμένο φωτοβολταϊκό σύστημα 10 kW κοστίζει 8.500€ τελική τιμή με ΦΠΑ 24%. Η τιμή περιλαμβάνει 20 πάνελ 500W, υβριδικό inverter 10 kW, στηρίγματα, καλωδιώσεις, μελέτη, άδειες ΔΕΔΔΗΕ και πλήρη εγκατάσταση από πιστοποιημένο συνεργείο.",
  },
  {
    question: "Πόσο κοστίζει ένα φωτοβολταϊκό σύστημα 20 kW για επιχείρηση;",
    answer:
      "Το ολοκληρωμένο φωτοβολταϊκό σύστημα 20 kW κοστίζει 14.000€ με ΦΠΑ 24% και περιλαμβάνει 40 πάνελ 500W, τριφασικό υβριδικό inverter 20 kW, μελέτη, άδειες και πλήρη εγκατάσταση. Με ετήσια παραγωγή περίπου 30.000 kWh, η απόσβεση για επιχείρηση συχνά δεν ξεπερνά τα 4–5 έτη.",
  },
  {
    question: "Τι σημαίνει «Ρωτήστε τιμή» στα πακέτα 5, 12 και 16 kW;",
    answer:
      "Για τα πακέτα 5 kW, 12 kW και 16 kW η τελική τιμή διαμορφώνεται ανάλογα με τη στέγη, την περιοχή και τις ιδιαίτερες απαιτήσεις της εγκατάστασης. Συμπληρώνετε την αναδιπλούμενη φόρμα στην κάρτα του πακέτου και εξειδικευμένος εκπρόσωπός μας σας καλεί τηλεφωνικά με συγκεκριμένη, δεσμευτική προσφορά — χωρίς καμία δέσμευση.",
  },
  {
    question: "Τι περιλαμβάνει κάθε ολοκληρωμένο πακέτο φωτοβολταϊκών;",
    answer:
      "Κάθε πακέτο περιλαμβάνει φωτοβολταϊκά πάνελ, inverter, στηρίγματα, πλήρη καλωδίωση και προστασίες, μελέτη, άδειες ΡΑΕ & ΔΕΔΔΗΕ, πλήρη εγκατάσταση, παράδοση σε λειτουργία, ρύθμιση εφαρμογής παρακολούθησης στο κινητό και 10 χρόνια εγγύηση εξοπλισμού.",
  },
  {
    question: "Σε πόσο χρόνο γίνεται η εγκατάσταση του πακέτου;",
    answer:
      "Από την υπογραφή της σύμβασης μέχρι την παράδοση σε λειτουργία μεσολαβούν συνήθως 30–45 ημέρες, κυρίως λόγω των διαδικασιών άδειας και σύνδεσης στον ΔΕΔΔΗΕ που αναλαμβάνουμε εξ ολοκλήρου εμείς. Η ίδια η εγκατάσταση ολοκληρώνεται σε 1–3 ημέρες.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PAKETA_FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

/* ---------------- Περιεχόμενο ---------------- */

const INCLUDED = [
  {
    icon: Sun,
    title: "Φωτοβολταϊκά Πάνελ",
    text: "Μονοκρυσταλλικά πάνελ τελευταίας γενιάς, με εγγύηση απόδοσης 25 ετών.",
  },
  {
    icon: Zap,
    title: "Inverter Deye",
    text: "Υβριδικός αντιστροφέας με monitoring στο κινητό και έτοιμη υποδομή για μπαταρία.",
  },
  {
    icon: FileCheck2,
    title: "Μελέτη & Άδειες",
    text: "Δωρεάν μελέτη και πλήρης ανάληψη των διαδικασιών ΡΑΕ & ΔΕΔΔΗΕ.",
  },
  {
    icon: HardHat,
    title: "Πλήρης Εγκατάσταση",
    text: "Πιστοποιημένο συνεργείο, παράδοση σε λειτουργία και εκπαίδευση στην εφαρμογή.",
  },
];

const WHY = [
  {
    icon: BadgeCheck,
    title: "Μία Τιμή, Χωρίς Έκπληξη",
    text: "Η τιμή του πακέτου είναι τελική: εξοπλισμός, υλικά, εργασία, άδειες και παράδοση σε λειτουργία — όλα μέσα. Δεν εμφανίζονται «έξοδα» που δεν είδατε στην προσφορά.",
  },
  {
    icon: ShieldCheck,
    title: "10 Χρόνια Εγγύηση",
    text: "Διπλάσια εγγύηση από το συνηθισμένο της αγοράς, για εξοπλισμό και εγκατάσταση. Στη Θεσσαλονίκη είμαστε δίπλα σας — δεν εξαφανιζόμαστε μετά την πώληση.",
  },
  {
    icon: Phone,
    title: "Τηλεφωνική Εξυπηρέτηση από Ειδικό",
    text: "Δεν σας αφήνουμε με φόρμες και email. Συμπληρώνετε το αίτημά σας και εξειδικευμένος εκπρόσωπος σας καλεί για να τακτοποιήσουμε όλα τα ερωτήματά σας.",
  },
  {
    icon: CalendarClock,
    title: "Σαφές Χρονοδιάγραμμα",
    text: "30–45 ημέρες από τη σύμβαση έως την παράδοση, με ενημερώσεις σε κάθε στάδιο: μελέτη, άδεια, προμήθεια, εγκατάσταση, σύνδεση.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Επιλέγετε Πακέτο",
    text: "Βρίσκετε την ισχύ που ταιριάζει στην κατανάλωσή σας — ή αφήνετε τον υπολογιστή εξοικονόμησης να σας προτείνει.",
  },
  {
    n: "2",
    title: "Σας Καλεί Εκπρόσωπος",
    text: "Συμπληρώνετε τη φόρμα κλήσης και εξειδικευμένος εκπρόσωπός μας επιβεβαιώνει τα στοιχεία και σας δίνει τελική προσφορά.",
  },
  {
    n: "3",
    title: "Δωρεάν Μελέτη & Άδειες",
    text: "Επισκεπτόμαστε τον χώρο, υπογράφουμε σύμβαση και αναλαμβάνουμε εξ ολοκλήρου ΔΕΔΔΗΕ και πάροχο.",
  },
  {
    n: "4",
    title: "Εγκατάσταση σε 1–3 Ημέρες",
    text: "Το συνεργείο μας εγκαθιστά, παραδίδει σε λειτουργία και σας εκπαιδεύει στην εφαρμογή παρακολούθησης.",
  },
];

export default function PaketaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={PAKETA_LD} />
      <JsonLd data={FAQ_SCHEMA} />
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Ολοκληρωμένα Πακέτα"
          title="Ολοκληρωμένα Φωτοβολταϊκά Πακέτα 5–20 kW για Σπίτι & Επιχείρηση"
          lead="Έτοιμες διαμορφώσεις με πάνελ, inverter, μελέτη, άδειες και πλήρη εγκατάσταση — σε μία τελική τιμή. Επιλέξτε πακέτο, αφήστε το τηλέφωνό σας και εξειδικευμένος εκπρόσωπός μας θα σας καλέσει άμεσα."
          crumbs={[{ name: "Πακέτα", path: "/paketa" }]}
        />

        {/* Τι περιλαμβάνει κάθε πακέτο */}
        <section className="border-b border-border bg-white py-12 sm:py-14" aria-label="Τι περιλαμβάνει κάθε πακέτο">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {INCLUDED.map((item) => (
                <RevealItem key={item.title}>
                  <div className="flex h-full items-start gap-3.5 rounded-2xl border border-border bg-[#faf9f4] p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent">
                      <item.icon className="h-5 w-5 text-[#2c7a3e]" aria-hidden />
                    </span>
                    <div>
                      <h2 className="font-heading text-[15px] font-extrabold text-[#0d4c74]">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* Πλέγμα πακέτων */}
        <section id="paketa" className="bg-[#f5f3ec] py-12 sm:py-16" aria-label="Ολοκληρωμένα πακέτα 5–20 kW">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-9 text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#2c7a3e]/25 bg-[#e9f3eb] px-4 py-1.5 text-sm font-semibold text-[#256d34]">
                  <Sun className="h-4 w-4" aria-hidden />
                  5 Έτοιμα Πακέτα · Τελικές Τιμές με ΦΠΑ
                </span>
                <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-[#0d4c74] sm:text-4xl">
                  Επιλέξτε την Ισχύ που σας Ταιριάζει
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                  Από το 5 kW για το οικογενειακό σπίτι έως το 20 kW για επιχείρηση —
                  όλα τα πακέτα περιλαμβάνουν πλήρη εγκατάσταση. Πατήστε «Ζητήστε
                  Κλήση Εκπροσώπου» και θα τα πούμε τηλεφωνικά.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <PaketaGrid />
            </Reveal>
          </div>
        </section>

        {/* Γιατί πακέτο ProΣτέγη */}
        <section className="bg-white py-14 sm:py-20" aria-label="Γιατί να επιλέξετε πακέτο ProΣτέγη">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-10 text-center">
                <p className="text-sm font-bold uppercase tracking-wider text-[#2c7a3e]">
                  Γιατί Πακέτο ProΣτέγη
                </p>
                <h2 className="mt-1 font-heading text-2xl font-extrabold text-[#0d4c74] sm:text-3xl">
                  Όλα Έτοιμα, Όλα Διαφανή, Όλα Εγγυημένα
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                  Έχετε ακούσει ιστορίες για προσφορές που «φουσκώνουν» μετά; Εδώ δεν
                  θα τις ζήσετε. Κάθε πακέτο είναι συμβόλαιο με σαφήνεια — η τιμή που
                  βλέπετε είναι η τιμή που θα πληρώσετε.
                </p>
              </div>
            </Reveal>

            <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {WHY.map((item) => (
                <RevealItem key={item.title} className="h-full">
                  <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0d4c74]/8">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                      <item.icon className="h-6 w-6 text-[#2c7a3e]" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-heading text-lg font-extrabold text-[#0d4c74]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </article>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* Πώς προχωράτε */}
        <section className="bg-[#f5f3ec] py-14 sm:py-20" aria-label="Πώς προχωρά η παραγγελία">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-10 text-center">
                <p className="text-sm font-bold uppercase tracking-wider text-[#2c7a3e]">
                  Απλά Βήματα
                </p>
                <h2 className="mt-1 font-heading text-2xl font-extrabold text-[#0d4c74] sm:text-3xl">
                  Από την Επιλογή στο Ρεύμα του Ήλιου — σε 4 Βήματα
                </h2>
              </div>
            </Reveal>

            <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step) => (
                <RevealItem key={step.n} className="h-full">
                  <article className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0d4c74] font-heading text-lg font-extrabold text-white shadow-lg shadow-[#0d4c74]/20">
                      {step.n}
                    </span>
                    <h3 className="mt-4 font-heading text-base font-extrabold text-[#0d4c74]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>
                  </article>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* Συχνές ερωτήσεις πακέτων */}
        <section className="bg-white py-14 sm:py-20" aria-label="Συχνές ερωτήσεις για τα πακέτα">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-8 text-center">
                <p className="text-sm font-bold uppercase tracking-wider text-[#2c7a3e]">
                  Ερωτήσεις & Απαντήσεις
                </p>
                <h2 className="mt-1 font-heading text-2xl font-extrabold text-[#0d4c74] sm:text-3xl">
                  Ό,τι Θέλετε να Ρωτήσετε στο Τηλέφωνο — Απαντημένο Εδώ
                </h2>
              </div>
            </Reveal>
            <Reveal>
              <FaqSection items={PAKETA_FAQ} />
            </Reveal>
          </div>
        </section>

        {/* CTA — άγκυρα για τη λωρίδα «κατά μέτρηση» */}
        <section
          id="epikoinonia-strip"
          className="bg-leaf-gradient py-14 sm:py-16"
          aria-label="Επικοινωνία για πακέτα"
        >
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl">
                Δεν ξέρετε ποια ισχύς σας ταιριάζει;
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
                Καλέστε μας ή αφήστε το τηλέφωνό σας: αναλύουμε τον λογαριασμό σας
                και σας προτείνουμε το πακέτο με την καλύτερη απόδοση για τα δικά σας
                δεδομένα — δωρεάν και χωρίς δέσμευση.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <a href="tel:+302310644512">
                  <Button
                    size="lg"
                    className="h-13 gap-2 rounded-xl bg-white px-7 font-heading text-base font-bold text-[#256d34] shadow-xl hover:bg-[#f2f0e9]"
                  >
                    <Phone className="h-5 w-5" aria-hidden />
                    2310 644 512
                  </Button>
                </a>
                <Link href="/epikoinonia">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-13 rounded-xl border-white/40 bg-transparent px-7 font-heading text-base font-bold text-white hover:bg-white/10 hover:text-white"
                  >
                    Φόρμα Επικοινωνίας
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
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
