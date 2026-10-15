import Link from "next/link";
import { Check, ShieldCheck, Wifi, Layers, BatteryCharging, SunMedium, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { CatalogGrid } from "@/components/site/catalog-grid";
import { SectionHeader } from "@/components/site/sections";
import { Reveal } from "@/components/site/reveal";
import { JsonLd } from "@/components/site/json-ld";
import { Button } from "@/components/ui/button";
import { buildPageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import { PRODUCTS } from "@/lib/products-data";

export const metadata = buildPageMetadata({
  title: "E-shop Φωτοβολταϊκών — Inverters Deye, Μπαταρίες & Πάνελ σε Τιμές Χονδρικής",
  description:
    "Αγοράστε φωτοβολταϊκό εξοπλισμό online: υβριδικοί inverters Deye, μπαταρίες λιθίου V-TAC & DEYE, πάνελ 500W–700W και ολοκληρωμένα πακέτα με εγκατάσταση. Χωρίς online πληρωμή — παραγγελία τηλεφωνικά, εξυπηρέτηση από ειδικό.",
  path: "/proionta",
  keywords: [
    "αγορά φωτοβολταϊκών τιμές",
    "eshop φωτοβολταϊκά Ελλάδα",
    "Deye inverter τιμή",
    "μπαταρία λιθίου 10kWh τιμή",
    "φωτοβολταϊκά πάνελ τιμές",
    "υβριδικός inverter προσφορά",
    "φωτοβολταϊκά πακέτα με εγκατάσταση",
    "καλάθι αγορών φωτοβολταϊκά",
  ],
});

/** ItemList + Product JSON-LD με offers/τιμές για πλούσια αποτελέσματα Google */
const CATALOG_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Φωτοβολταϊκός Εξοπλισμός ProΣτέγη",
  numberOfItems: PRODUCTS.length,
  itemListElement: PRODUCTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.name,
      brand: { "@type": "Brand", name: p.brand },
      sku: p.sku,
      description: p.shortDesc,
      image: `${SITE_URL}${p.image}`,
      url: `${SITE_URL}/proionta/${p.slug}`,
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: p.price,
        itemCondition: "https://schema.org/NewCondition",
        availability:
          p.stock === "in"
            ? "https://schema.org/InStock"
            : "https://schema.org/PreOrder",
        seller: { "@type": "Organization", name: SITE_NAME },
      },
    },
  })),
};

const DEEP_DIVES = [
  {
    id: "inverters",
    icon: SunMedium,
    title: "Υβριδικοί Inverters DEYE — ο «εγκέφαλος» του συστήματός σας",
    paragraphs: [
      "Ο inverter είναι η καρδιά κάθε φωτοβολταϊκού: μετατρέπει τη συνεχή τάση (DC) των πάνελ σε εναλλασσόμενο ρεύμα (AC) που χρησιμοποιεί το σπίτι σας. Οι υβριδικοί inverter DEYE που εγκαθιστούμε διαθέτουν ενσωματωμένο controller μπαταρίας, λειτουργία backup χωρίς διακοπή, και μπορούν να συνδεθούν παράλληλα έως και 16 μονάδες για συστήματα μεγάλης ισχύος.",
      "Μέσω της δωρεάν εφαρμογής στο κινητό σας, βλέπετε σε πραγματικό χρόνο πόση ενέργεια παράγεται, καταναλώνεται, αποθηκεύεται ή πωλείται στο δίκτυο. Οι inverter Deye διαθέτουν ευρωπαϊκή πιστοποίηση CE, πιστοποίηση G99/EN50549 για σύνδεση με το δίκτυο και 5+ χρόνια εγγύηση κατασκευαστή.",
    ],
    points: ["Παράλληλη λειτουργία έως 16 μονάδες", "Wi-Fi παρακολούθηση από κινητό", "Backup χωρίς διακοπή (UPS λειτουργία)", "Εγγύηση 5+ ετών"],
  },
  {
    id: "batteries",
    icon: BatteryCharging,
    title: "Μπαταρίες Λιθίου V-TAC & DEYE — ενέργεια που δεν πάει χαμένη",
    paragraphs: [
      "Οι μπαταρίες λιθίου LiFePO4 (LFP) είναι η σύγχρονη, ασφαλής τεχνολογία αποθήκευσης: χωρίς συντήρηση, χωρίς εκπομπές, με 6.000+ κύκλους φόρτισης-εκφόρτισης — δηλαδή 10 έως 15 χρόνια καθημερινής χρήσης. Η ενσωματωμένη ηλεκτρονική μονάδα BMS προστατεύει από υπερφόρτιση, βαθιά εκφόρτιση και υπερθέρμανση.",
      "Το συμπαγές κρεμαστό σχέδιο των μπαταριών V-TAC 10 kWh εξοικονομεί χώρο, ενώ τα high-voltage racks DEYE (200–500V DC) καλύπτουν επαγγελματικές εφαρμογές με επεκτασιμότητα ανά μονάδα. Όλες οι μπαταρίες επικοινωνούν CAN/RS485 με τους inverter Deye για βέλτιστη διαχείριση φόρτισης.",
    ],
    points: ["6.000+ κύκλοι ζωής LiFePO4", "BMS ασφαλείας ενσωματωμένο", "Κρεμαστό συμπαγές design", "Επικοινωνία CAN/RS485 με Deye"],
  },
  {
    id: "panels",
    icon: SunMedium,
    title: "Φωτοβολταϊκά Πάνελ 500W–700W — περισσότερη ενέργεια ανά τ.μ.",
    paragraphs: [
      "Τα μονοκρυσταλλικά πάνελ τελευταίας γενιάς με τεχνολογία PERC/TOPCon προσφέρουν υψηλή απόδοση 21%+, δηλαδή περισσότερη ενέργεια στον ίδιο χώρο. Στην πράξη, ένα σύγχρονο πάνελ 700W παράγει όσο δύο παλιά πάνελ 350W — με λιγότερο χώρο, λιγότερα στηρίγματα και χαμηλότερο κόστος εγκατάστασης.",
      "Όλα τα πάνελ που χρησιμοποιούμε διαθέτουν εγγύηση προϊόντος 15–25 ετών και εγγύηση απόδοσης 25–30 ετών (80–87% της αρχικής ισχύος στο τέλος της περιόδου), πιστοποίηση αντοχής σε χαλάζι (IEC 61215) και επίστρωση ανθεκτική στη γύρη και τη σκόνη.",
    ],
    points: ["Απόδοση 21%+ (PERC/TOPCon)", "Εγγύηση απόδοσης 25–30 ετών", "Αντοχή σε χαλάζι & ισχυρούς ανέμους", "Βέλτιστη απόδοση σε μερική σκίαση"],
  },
  {
    id: "systems",
    icon: Layers,
    title: "Ολοκληρωμένα Πακέτα — όλα από ένα χέρι",
    paragraphs: [
      "Κάθε εγκατάσταση της ProΣτέγη παραδίδεται ως ολοκληρωμένο σύστημα: πάνελ, inverter, μπαταρίες, μεταλλικά στηρίγματα, καλωδιώσεις φωτοβολταϊκών (DC) και εναλλασσόμενου ρεύματος (AC), ασφάλειες, κουτί σύνδεσης, προστασίες υπερτάσης και συστήματος γείωσης.",
      "Δεν «ανακατεύουμε» εξαρτήματα ασυμβίβαστα μεταξύ τους — όλα τα στοιχεία του συστήματός σας είναι επιλεγμένα ώστε να συνεργάζονται άψογα, να διαχειρίζονται από μία εφαρμογή και να υποστηρίζονται από μία ομάδα: τη δική μας, εδώ στη Θεσσαλονίκη.",
    ],
    points: ["Πλήρης εξοπλισμός εγκατάστασης", "Συμβατά εξαρτήματα ενσωματωμένα", "Μία εφαρμογή διαχείρισης", "Τοπική εγγύηση & υποστήριξη"],
  },
];

export default function ProiontaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={CATALOG_LD} />
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="E-shop Φωτοβολταϊκών"
          title="Εξοπλισμός Κορυφαίων Μαρκών, σε Διαφανείς Τιμές"
          lead="Περιηγηθείτε στον πλήρη κατάλογο: τιμές με ΦΠΑ, τεχνικά χαρακτηριστικά και εκπτώσεις με σβησμένη παλιά τιμή. Η παραγγελία ολοκληρώνεται τηλεφωνικά — σας καλούμε εμείς μέσα σε λίγες ώρες για την καλύτερη δυνατή εξυπηρέτηση."
          crumbs={[{ name: "Προϊόντα", path: "/proionta" }]}
        />

        {/* E-shop πλέγμα */}
        <div className="bg-[#f5f3ec] py-4" id="katalogos">
          <CatalogGrid />
        </div>

        {/* Πώς λειτουργεί η παραγγελία */}
        <section className="bg-white py-12" aria-label="Πώς γίνεται η παραγγελία">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="grid gap-6 rounded-2xl border border-[#2c7a3e]/20 bg-[#e9f3eb]/50 p-7 md:grid-cols-3 sm:p-9">
                <div>
                  <span className="font-heading text-3xl font-extrabold text-[#2c7a3e]">1</span>
                  <h3 className="mt-2 font-heading text-lg font-extrabold text-[#0d4c74]">
                    Επιλέγετε προϊόντα
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    Προσθέτετε ό,τι σας ενδιαφέρει στο καλάθι — χωρίς λογαριασμό, χωρίς κάρτα, χωρίς online πληρωμή.
                  </p>
                </div>
                <div>
                  <span className="font-heading text-3xl font-extrabold text-[#2c7a3e]">2</span>
                  <h3 className="mt-2 font-heading text-lg font-extrabold text-[#0d4c74]">
                    Αφήνετε το τηλέφωνό σας
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    Στην ολοκλήρωση συμπληρώνετε απλή φόρμα επικοινωνίας. Δεν χρειάζεται καμία πληρωμή σε αυτό το στάδιο.
                  </p>
                </div>
                <div>
                  <span className="font-heading text-3xl font-extrabold text-[#2c7a3e]">3</span>
                  <h3 className="mt-2 font-heading text-lg font-extrabold text-[#0d4c74]">
                    Σας καλούμε & τα τακτοποιούμε
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    Ένας ειδικός μας σας καλεί, επιβεβαιώνει τη διαθεσιμότητα, απαντά σε απορίες και κανονίζει παράδοση ή εγκατάσταση.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Αναλυτικές ενότητες */}
        <section className="bg-[#f5f3ec] py-14 sm:py-20" aria-label="Αναλυτικά για τον εξοπλισμό">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Γιατί αυτόν τον εξοπλισμό"
              title="Τεχνολογία που Αποδίδει, Μάρκες που Εμπιστεύεστε"
              subtitle="Ό,τι εγκαθιστούμε το επιλέγουμε με ένα και μόνο κριτήριο: να λειτουργεί χωρίς προβλήματα για δεκαετίες."
            />

            <div className="flex flex-col gap-8">
              {DEEP_DIVES.map((section) => (
                <Reveal key={section.id}>
                  <article
                    id={section.id}
                    className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-lg shadow-[#0d4c74]/5 sm:p-8"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent">
                        <section.icon className="h-6 w-6 text-[#2c7a3e]" aria-hidden />
                      </span>
                      <h3 className="font-heading text-xl font-extrabold leading-snug text-[#0d4c74] sm:text-2xl">
                        {section.title}
                      </h3>
                    </div>
                    <div className="mt-4 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                      <div className="space-y-3.5">
                        {section.paragraphs.map((p) => (
                          <p key={p.slice(0, 40)} className="text-[15px] leading-relaxed text-muted-foreground">
                            {p}
                          </p>
                        ))}
                      </div>
                      <ul className="flex flex-col gap-2.5 self-start rounded-xl border border-[#2c7a3e]/20 bg-[#e9f3eb]/60 p-5">
                        {section.points.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-sm font-semibold text-[#256d34]">
                            <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* Πιστοποιήσεις */}
            <Reveal className="mt-10">
              <div className="flex flex-col items-center gap-4 rounded-2xl bg-[#0d4c74] p-7 text-center sm:flex-row sm:text-left">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                  <ShieldCheck className="h-8 w-8 text-[#7fc795]" aria-hidden />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-extrabold text-white">
                    Μόνο πιστοποιημένος εξοπλισμός με ευρωπαϊκή σήμανση CE
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                    Κάθε συσκευή που εγκαθιστούμε φέρει πιστοποιήσεις IEC/EN για
                    την ευρωπαϊκή αγορά, με επίσημη εγγύηση αντιπροσωπείας και
                    πλήρη τεχνική τεκμηρίωση — δείτε τα πιστοποιητικά σε κάθε
                    προσφορά που παραλαμβάνετε.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="mt-10 flex justify-center">
              <Link href="/epikoinonia">
                <Button
                  size="lg"
                  className="h-13 rounded-xl bg-[#2c7a3e] px-8 font-heading text-base font-bold shadow-xl shadow-[#2c7a3e]/25 hover:bg-[#256d34]"
                >
                  Ζητήστε Προσφορά για Εξοπλισμό
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
                </Button>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
