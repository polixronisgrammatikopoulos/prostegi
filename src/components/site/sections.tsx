import Image from "next/image";
import Link from "next/link";
import {
  PlugZap,
  Network,
  BatteryCharging,
  Warehouse,
  FileSearch,
  FileText,
  HardHat,
  LifeBuoy,
  ShieldCheck,
  MapPinned,
  HandCoins,
  SunMedium,
  Award,
  Check,
  BadgeCheck,
  Quote,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Reveal,
  RevealStagger,
  RevealItem,
  GrowLine,
} from "@/components/site/reveal";
import { ProductCard } from "@/components/site/product-card";
import {
  PRODUCTS,
  FEATURED_SLUGS,
  getProduct,
} from "@/lib/products-data";
import { cn } from "@/lib/utils";

/* ---------------- Section header ---------------- */

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "mb-10 flex flex-col gap-3 sm:mb-14",
        align === "center" ? "items-center text-center" : "items-start text-left"
      )}
    >
      <span
        className={cn(
          "rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wider",
          dark ? "bg-white/10 text-[#7fc795]" : "bg-accent text-accent-foreground"
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          "font-heading text-3xl font-extrabold tracking-tight text-balance sm:text-4xl",
          dark ? "text-white" : "text-[#0d4c74]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-lg leading-relaxed",
            dark ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

/* ---------------- Εγγυήσεις (TrustBar) ---------------- */

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "10 Χρόνια Εγγύηση",
    text: "Πλήρη εγγύηση εξοπλισμού σε κάθε εγκατάσταση — με γραπτή δέσμευση.",
  },
  {
    icon: BadgeCheck,
    title: "Πιστοποιημένοι Εγκαταστάτες",
    text: "Μηχανικοί και τεχνίτες με πολυετή εμπειρία αποκλειστικά σε ΑΠΕ.",
  },
  {
    icon: SunMedium,
    title: "Premium Εξοπλισμός",
    text: "Αυστηρά επιλεγμένα Deye & V-TAC με ευρωπαϊκές πιστοποιήσεις.",
  },
  {
    icon: MapPinned,
    title: "Τοπική Υποστήριξη",
    text: "Γρήγορη εξυπηρέτηση σε Θεσσαλονίκη και όλη τη Βόρεια Ελλάδα.",
  },
];

export function TrustBar() {
  return (
    <section className="border-b border-border bg-white py-12 sm:py-14" aria-label="Εγγυήσεις και πιστοποιήσεις">
      <RevealStagger className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-6 lg:px-8">
        {TRUST_ITEMS.map((item) => (
          <RevealItem key={item.title} className="h-full">
            <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0d4c74]/10">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2c7a3e] shadow-md shadow-[#2c7a3e]/25">
                <item.icon className="h-6 w-6 text-white" aria-hidden />
              </span>
              <div>
                <h3 className="font-heading text-[15px] font-extrabold leading-snug text-[#0d4c74]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  );
}

/* ---------------- Μαρτυρίες Πελατών ---------------- */

/* Ενδεικτικές μαρτυρίες — αντικαταστήστε τις με πραγματικές κριτικές πελατών. */
const TESTIMONIALS = [
  {
    initials: "ΓΜ",
    name: "Γιώργος Μ.",
    place: "Εξοχικό · Χαλκιδική",
    color: "bg-[#2c7a3e]",
    text:
      "Μας έστησαν αυτόνομο σύστημα 10 kW στο εξοχικό μέσα σε τρεις εβδομάδες από την παραγγελία. Καθαρή δουλειά, καθημερινή ενημέρωση, και το σύστημα τρέχει άψογα από τον πρώτο καλοκαίρι.",
  },
  {
    initials: "ΜΚ",
    name: "Μαρία Κ.",
    place: "Κατοικία · Πανόραμα",
    color: "bg-[#0d4c74]",
    text:
      "Ο λογαριασμός του ρεύματος έπεσε από 210 σε 34 ευρώ τον πρώτο χρόνο. Η προσφορά είχε αναλυτικά όλα τα κόστη — εξοπλισμό, άδειες, εργασία — χωρίς καμία έκπληξη στο τέλος.",
  },
  {
    initials: "ΔΤ",
    name: "Δημήτρης Τ.",
    place: "Αγρόκτημα · Σέρρες",
    color: "bg-[#256d34]",
    text:
      "Είχα ζητήσει προσφορές από τρεις εταιρείες. Η ProΣτέγη ήταν η μόνη που ήρθε στο χωράφι, μέτρησε την κατανάλωση του αντλιοστασίου και πρότεινε το μέγεθος που πραγματικά χρειαζόμουν.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-[#f5f3ec] py-16 sm:py-24" aria-label="Μαρτυρίες πελατών">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Μαρτυρίες Πελατών"
          title="Τι Λένε Όσοι Μας Εμπιστεύθηκαν"
          subtitle="Εγκαταστάσεις σε σπίτια, εξοχικά και αγροκτήματα σε όλη τη Βόρεια Ελλάδα — αυτό λένε οι ίδιοι."
        />

        <RevealStagger className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <RevealItem key={t.name} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#0d4c74]/10">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5" aria-label="Αξιολόγηση 5 από 5 αστέρια">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#f0b429] text-[#f0b429]" aria-hidden />
                    ))}
                  </div>
                  <Quote className="h-7 w-7 text-[#2c7a3e]/15" aria-hidden />
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/85">
                  «{t.text}»
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <span
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full font-heading text-sm font-extrabold text-white",
                      t.color
                    )}
                    aria-hidden
                  >
                    {t.initials}
                  </span>
                  <div>
                    <p className="font-heading text-sm font-extrabold text-[#0d4c74]">{t.name}</p>
                    <p className="text-xs font-medium text-muted-foreground">{t.place}</p>
                  </div>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

/* ---------------- Λύσεις ---------------- */

const SOLUTIONS = [
  {
    icon: PlugZap,
    slug: "autonomo",
    title: "Αυτόνομα Συστήματα (Off-Grid)",
    description:
      "Πλήρης ενεργειακή ανεξαρτησία, χωρίς λογαριασμό ρεύματος. Η ενέργεια της ημέρας αποθηκεύεται σε μπαταρίες LFP και καλύπτει τις ανάγκες σας όλο το 24ωρο.",
    points: ["Ιδανικό για εξοχικά & απομακρυσμένες περιοχές", "Μηδενικός λογαριασμός ρεύματος", "Ανεξάρτητο από το δίκτυο"],
    featured: false,
  },
  {
    icon: Network,
    slug: "net-billing",
    title: "Διασυνδεδεμένα (Net Billing)",
    description:
      "Καταναλώνετε άμεσα την ενέργεια που παράγετε και πουλάτε την πλεονάζουσα στο δίκτυο σε τιμή αγοράς. Η πιο αποδοτική λύση για σταθερή καθημερινή κατανάλωση.",
    points: ["Άμεση αποζημίωση πλεονάζουσας ενέργειας", "Χαμηλότερο αρχικό κόστος", "Ιδανικό για νοικοκυριά & επιχειρήσεις"],
    featured: true,
  },
  {
    icon: BatteryCharging,
    slug: "ybridiko",
    title: "Υβριδικά με Αποθήκευση",
    description:
      "Ο συνδυασμός που μεγιστοποιεί την αυτονομία: φωτοβολταϊκά + μπαταρίες + δίκτυο, με αυτόματο backup σε κάθε διακοπή ρεύματος.",
    points: ["Αυτοκατανάλωση έως 90%", "Backup σε κάθε διακοπή", "Έξυπνη διαχείριση ενέργειας"],
    featured: false,
  },
  {
    icon: Warehouse,
    slug: "epixeirimatika",
    title: "Επαγγελματικές & Αγροτικές Εγκαταστάσεις",
    description:
      "Συστήματα μεγάλου μεγέθους για επιχειρήσεις, θερμοκήπια, αντλιοστάσια και αγροκτήματα — με ισχύ έως και εκατοντάδες kW.",
    points: ["Σημαντική μείωση λειτουργικού κόστους", "Προστασία από αυξήσεις τιμών", "Απόσβεση σε σύντομο χρονικό ορίζοντα"],
    featured: false,
  },
];

export function Solutions() {
  return (
    <section id="lyseis" className="bg-white py-16 sm:py-24" aria-label="Λύσεις">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Λύσεις"
          title="Ποια λύση ταιριάζει σε εσάς;"
          subtitle="Από πλήρη ενεργειακή αυτονομία έως έξυπνη διασύνδεση με το δίκτυο — σχεδιάζουμε το σύστημα που καλύπτει ακριβώς τις ανάγκες σας."
        />

        <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS.map((solution) => (
            <RevealItem key={solution.title} className="h-full">
              <article
                className={cn(
                  "group flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1.5",
                  solution.featured
                    ? "border-[#2c7a3e] bg-[#2c7a3e] shadow-xl shadow-[#2c7a3e]/25"
                    : "border-border bg-card shadow-sm hover:shadow-xl hover:shadow-[#0d4c74]/10"
                )}
              >
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                    solution.featured ? "bg-white/15" : "bg-accent"
                  )}
                >
                  <solution.icon
                    className={cn("h-6 w-6", solution.featured ? "text-[#7fc795]" : "text-[#2c7a3e]")}
                    aria-hidden
                  />
                </span>
                <h3
                  className={cn(
                    "mt-4 font-heading text-lg font-extrabold leading-snug",
                    solution.featured ? "text-white" : "text-[#0d4c74]"
                  )}
                >
                  {solution.title}
                </h3>
                <p
                  className={cn(
                    "mt-2.5 flex-1 text-[15px] leading-relaxed",
                    solution.featured ? "text-white/80" : "text-muted-foreground"
                  )}
                >
                  {solution.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {solution.points.map((point) => (
                    <li
                      key={point}
                      className={cn(
                        "flex items-start gap-2 text-sm font-medium",
                        solution.featured ? "text-white/90" : "text-foreground/80"
                      )}
                    >
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          solution.featured ? "text-[#7fc795]" : "text-[#2c7a3e]"
                        )}
                        aria-hidden
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/fotovoltaika#${solution.slug}`}
                  className={cn(
                    "mt-5 inline-flex items-center gap-1 text-sm font-bold underline decoration-2 underline-offset-4 transition-colors",
                    solution.featured
                      ? "text-white decoration-white/50 hover:decoration-white"
                      : "text-[#2c7a3e] decoration-[#2c7a3e]/40 hover:text-[#256d34] hover:decoration-[#256d34]"
                  )}
                >
                  Μάθετε περισσότερα →
                </Link>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

/* ---------------- Προϊόντα (E-shop showcase) ---------------- */

const FEATURED = FEATURED_SLUGS.map((s) => getProduct(s)!).filter(Boolean);

export function Products() {
  return (
    <section id="proionta" className="bg-[#f5f3ec] py-16 sm:py-24" aria-label="Προϊόντα">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="E-shop & Προϊόντα"
          title="Εξοπλισμός Κορυφαίων Μαρκών, με Διαφανείς Τιμές"
          subtitle="Συνεργαζόμαστε με τους πιο αξιόπιστους κατασκευαστές παγκοσμίως — Deye, V-TAC, Tier-1 πάνελ — ώστε κάθε εγκατάσταση να λειτουργεί αψεγίδιαστα για δεκαετίες. Προσθέστε στο καλάθι και σας καλούμε εμείς."
        />

        <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((product) => (
            <RevealItem key={product.slug} className="h-full">
              <ProductCard product={product} />
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal delay={0.2} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/proionta">
            <Button
              size="lg"
              className="h-13 rounded-xl bg-[#2c7a3e] px-7 font-heading text-base font-bold shadow-xl shadow-[#2c7a3e]/25 hover:bg-[#256d34]"
            >
              Ολόκληρος Κατάλογος E-shop
            </Button>
          </Link>
          <Link href="/ypiresies">
            <Button
              size="lg"
              variant="outline"
              className="h-13 rounded-xl border-[#0d4c74]/30 px-7 font-heading text-base font-bold text-[#0d4c74] hover:bg-[#0d4c74] hover:text-white"
            >
              Υπηρεσίες &amp; Πακέτα με Εγκατάσταση
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Διαδικασία ---------------- */

const STEPS = [
  {
    icon: FileSearch,
    title: "Δωρεάν Μελέτη",
    description:
      "Αναλύουμε την κατανάλωσή σας, τον χώρο και τον προσανατολισμό της στέγης σας για να προτείνουμε το βέλτιστο μέγεθος συστήματος.",
  },
  {
    icon: FileText,
    title: "Σαφής Προσφορά",
    description:
      "Λαμβάνετε αναλυτική προσφορά χωρίς κρυφά κόστη: εξοπλισμός, υλικά, εργασία, άδειες και προβλεπόμενες αποδόσεις.",
  },
  {
    icon: HardHat,
    title: "Επαγγελματική Εγκατάσταση",
    description:
      "Οι πιστοποιημένοι μηχανικοί και τεχνικοί μας αναλαμβάνουν την πλήρη εγκατάσταση, τις άδειες και τη σύνδεση με το δίκτυο.",
  },
  {
    icon: LifeBuoy,
    title: "Διά Βίου Υποστήριξη",
    description:
      "Παρακολούθηση απόδοσης, προληπτική συντήρηση και άμεση τεχνική υποστήριξη — είμαστε δίπλα σας μετά την εγκατάσταση.",
  },
];

export function Process() {
  return (
    <section id="diadikasia" className="bg-white py-16 sm:py-24" aria-label="Η διαδικασία μας">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Πώς Λειτουργούμε"
          title="Από τη Μελέτη στην Εγκατάσταση, σε 4 Βήματα"
          subtitle="Απλή, διαφανής και γρήγορη διαδικασία — εσείς κερδίζετε χρόνο και χρήμα."
        />

        <RevealStagger className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* γραμμή σύνδεσης που "ζωγραφίζεται" στο scroll (desktop) */}
          <GrowLine className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-[#2c7a3e]/20 via-[#2c7a3e]/50 to-[#2c7a3e]/20 lg:block" />
          {STEPS.map((step, i) => (
            <RevealItem key={step.title} className="relative">
              <div className="flex h-full flex-col items-start">
                <div className="relative z-10 flex items-center gap-4">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#2c7a3e] text-white shadow-lg shadow-[#2c7a3e]/30 transition-transform duration-300 hover:rotate-3 hover:scale-105">
                    <step.icon className="h-7 w-7" aria-hidden />
                  </span>
                  <span className="font-heading text-5xl font-extrabold text-[#0d4c74]/10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-lg font-extrabold text-[#0d4c74]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

/* ---------------- Γιατί εμάς ---------------- */

const REASONS = [
  {
    icon: ShieldCheck,
    title: "10 Χρόνια Εγγύηση",
    text: "Γραπτή εγγύηση εξοπλισμού 10 ετών σε κάθε εγκατάσταση — επένδυση προστατευμένη σε βάθος χρόνου.",
  },
  {
    icon: Award,
    title: "Εξειδίκευση στην Αυτονομία",
    text: "Επικεντρωνόμαστε σε αυτόνομα και υβριδικά συστήματα — τη μεγαλύτερη τεχνογνωσία που απαιτεί η σωστή διαστασιολόγηση μπαταριών.",
  },
  {
    icon: MapPinned,
    title: "Τοπική Ομάδα στη Θεσσαλονίκη",
    text: "Είμαστε δίπλα σας για επίσκεψη, εγκατάσταση και άμεση υποστήριξη σε όλη τη Βόρεια Ελλάδα.",
  },
  {
    icon: HandCoins,
    title: "Διαφάνεια στις Τιμές",
    text: "Αναλυτικές προσφορές χωρίς κρυφά κόστη. Ξέρετε ακριβώς τι πληρώνετε — και τι θα εξοικονομήσετε.",
  },
];

export function WhyUs() {
  return (
    <section id="giati-emas" className="bg-brand-gradient py-16 sm:py-24" aria-label="Γιατί ProΣτέγη">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Image */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-2xl">
            <Image
              src="/technician.jpg"
              alt="Τεχνικός της ProΣτέγη εγκαθιστά φωτοβολταϊκά πάνελ σε στέγη"
              width={1152}
              height={864}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 rounded-2xl bg-[#f2f0e9] p-5 shadow-xl sm:right-8">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2c7a3e]">
                <SunMedium className="h-7 w-7 text-white" aria-hidden />
              </span>
              <div>
                <p className="font-heading text-2xl font-extrabold leading-none text-[#0d4c74]">
                  25–30 έτη
                </p>
                <p className="mt-1 text-xs font-semibold text-muted-foreground">
                  διάρκεια ζωής πάνελ με εγγύηση απόδοσης
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <SectionHeader
            eyebrow="Γιατί ProΣτέγη"
            title="Ο Σωστός Συνεργάτης για την Ενέργειά σας"
            align="left"
            dark
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
            <RevealStagger className="contents">
              {REASONS.map((reason) => (
                <RevealItem key={reason.title} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:bg-white/10">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2c7a3e]">
                      <reason.icon className="h-6 w-6 text-white" aria-hidden />
                    </span>
                    <h3 className="mt-3.5 font-heading text-base font-extrabold text-white">
                      {reason.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/75">{reason.text}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
          <Reveal delay={0.25} className="mt-8">
            <a href="/epikoinonia">
              <Button
                size="lg"
                className="h-13 rounded-xl bg-[#2c7a3e] px-7 font-heading text-base font-bold shadow-xl shadow-black/20 hover:bg-[#256d34]"
              >
                Μιλήστε με τους Ειδικούς μας
              </Button>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
