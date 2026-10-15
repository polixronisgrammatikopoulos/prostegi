import Link from "next/link";
import { PlugZap, Network, BatteryCharging, Warehouse, Check, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { Process, SectionHeader } from "@/components/site/sections";
import { Reveal } from "@/components/site/reveal";
import { JsonLd } from "@/components/site/json-ld";
import { Button } from "@/components/ui/button";
import { buildPageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title:
    "Φωτοβολταϊκά Συστήματα — Αυτόνομα, Net Billing & Υβριδικά στη Θεσσαλονίκη",
  description:
    "Αναλυτικός οδηγός φωτοβολταϊκών συστημάτων: αυτόνομα (Off-Grid), διασυνδεδεμένα (Net Billing), υβριδικά με μπαταρίες και επαγγελματικές εγκαταστάσεις. Σχεδιασμός & εγκατάσταση από την ProΣτέγη στη Θεσσαλονίκη.",
  path: "/fotovoltaika",
  keywords: [
    "αυτόνομο φωτοβολταϊκό σύστημα",
    "φωτοβολταϊκά net billing",
    "φωτοβολταϊκά net metering",
    "υβριδικό φωτοβολταϊκό",
    "φωτοβολταϊκά για εξοχικό",
    "αγροτικά φωτοβολταϊκά",
    "φωτοβολταϊκά θερμοκήπια",
    "μπαταρίες αποθήκευσης ενέργειας",
  ],
});

const SOLUTION_DETAILS = [
  {
    id: "autonomo",
    icon: PlugZap,
    eyebrow: "Off-Grid",
    title: "Αυτόνομα Φωτοβολταϊκά Συστήματα (Off-Grid)",
    paragraphs: [
      "Τα αυτόνομα φωτοβολταϊκά συστήματα σας προσφέρουν πλήρη ενεργειακή ανεξαρτησία: δεν συνδέονται καθόλου με το δίκτυο, οπότε δεν υπάρχει καν λογαριασμός ρεύματος. Η ενέργεια που παράγουν τα πάνελ τη μέρα τροφοδοτεί άμεσα το σπίτι σας και ταυτόχρονα φορτίζει τις μπαταρίες λιθίου, που σας καλύπτουν καθ' όλη τη διάρκεια της νύχτας.",
      "Η σωστή διαστασιολόγηση είναι το κλειδί σε αυτά τα συστήματα: οι μηχανικοί μας αναλύουν το προφίλ κατανάλωσής σας (συσκευές, ώρες χρήσης, εποχικότητα) και σχεδιάζουν το σύστημα ώστε να έχετε ενέργεια 365 μέρες τον χρόνο, ακόμα και στα βροχερά χειμερινά διαστήματα. Ιδανικά για εξοχικά, αγροτικά σπίτια, απομακρυσμένες καλύβες και οτιδήποτε βρίσκεται εκτός δικτύου.",
    ],
    points: [
      "Μηδενικός λογαριασμός ρεύματος — για πάντα",
      "Πλήρης ανεξαρτησία από διακοπές και αυξήσεις τιμών",
      "Μπαταρίες LiFePO4 με 6.000+ κύκλους ζωής",
      "Ιδανικό για εξοχικά, αγροκτήματα & απομακρυσμένες περιοχές",
    ],
  },
  {
    id: "net-billing",
    icon: Network,
    eyebrow: "Πιο δημοφιλές",
    title: "Διασυνδεδεμένα Φωτοβολταϊκά (Net Billing)",
    featured: true,
    paragraphs: [
      "Τα διασυνδεδεμένα συστήματα Net Billing είναι η πιο αποδοτική και δημοφιλής λύση για σταθερή καθημερινή κατανάλωση: καταναλώνετε πρώτα την ενέργεια που παράγετε και η πλεονάζουσα διοχετεύεται στο δίκτυο, όπου πωλείται στην τιμή αγοράς. Έτσι κάθε kWh που παράγετε αξιοποιείται — είτε το χρησιμοποιείτε εσείς είτε αποζημιώνεστε για αυτό.",
      "Η εγκατάσταση είναι απλούστερη και το αρχικό κόστος χαμηλότερο σε σχέση με τα υβριδικά, καθώς δεν απαιτούνται μπαταρίες. Μπορείτε πάντα να προσθέσετε μπαταρίες αργότερα, αναβαθμίζοντας σε υβριδικό σύστημα. Αναλαμβάνουμε ολόκληρη τη διαδικασία: μελέτη, αίτηση στον Διαχειριστή, άδειες, εγκατάσταση και ενεργοποίηση του μέτρου.",
    ],
    points: [
      "Άμεση αποζημίωση της πλεονάζουσας ενέργειας",
      "Χαμηλότερο αρχικό κόστος χωρίς μπαταρίες",
      "Ιδανικό για νοικοκυριά, καταστήματα & γραφεία",
      "Δυνατότητα μελλοντικής αναβάθμισης με μπαταρίες",
    ],
  },
  {
    id: "ybridiko",
    icon: BatteryCharging,
    eyebrow: "Μέγιστη αυτονομία",
    title: "Υβριδικά Φωτοβολταϊκά με Αποθήκευση",
    paragraphs: [
      "Τα υβριδικά συστήματα συνδυάζουν το καλύτερο και των δύο κόσμων: φωτοβολταϊκά πάνελ + μπαταρίες αποθήκευσης + σύνδεση με το δίκτυο. Η αυτοκατανάλωση αγγίζει το 85–90%, γιατί η ενέργεια του μεσημεριού αποθηκεύεται και σας εξυπηρετεί το βράδυ, όταν οι τιμές του ρεύματος είναι υψηλότερες.",
      "Το πιο σημαντικό πλεονέκτημα: αυτόματο backup. Όταν πέσει το ρεύμα από το δίκτυο, ο υβριδικός inverter Deye αλλάζει σε λειτουργία island μέσα σε χιλιοστά του δευτερολέπτου — το ψυγείο, τα φώτα, ο λέβητας και το ίντερνετ συνεχίζουν να λειτουργούν αδιάκοπα. Οι έξυπνες συσκευές Deye διαχειρίζονται αυτόματα τις ενεργειακές ροές μέσω εφαρμογής στο κινητό σας.",
    ],
    points: [
      "Αυτοκατανάλωση έως 85–90%",
      "Αυτόματο backup σε κάθε διακοπή ρεύματος",
      "Έξυπνη διαχείριση ενέργειας από εφαρμογή κινητού",
      "Προστασία από την ανοδική πορεία των τιμών kWh",
    ],
  },
  {
    id: "epixeirimatika",
    icon: Warehouse,
    eyebrow: "Μεγάλης κλίμακας",
    title: "Επαγγελματικές & Αγροτικές Εγκαταστάσεις",
    paragraphs: [
      "Για επιχειρήσεις, βιομηχανικούς χώρους, θερμοκήπια, αντλιοστάσια και αγροκτήματα, το φωτοβολταϊκό σύστημα είναι από τις πιο αποδοτικές επενδύσεις που μπορείτε να κάνετε: μειώνει δραστικά το λειτουργικό κόστος, σας προστατεύει από τις αυξήσεις των τιμών ενέργειας και αυξάνει την ανταγωνιστικότητά σας.",
      "Σχεδιάζουμε και υλοποιούμε συστήματα από λίγα kW έως και εκατοντάδες kW, με high-voltage racks αποθήκευσης Deye για μεγάλες ενεργειακές απαιτήσεις, παρακολούθηση απόδοσης σε πραγματικό χρόνο και προγράμματα προληπτικής συντήρησης. Αναλαμβάνουμε επίσης όλη τη γραφειοκρατία: μελέτες, άδειες παραγωγής, συνδέσεις με τον Διαχειριστή.",
    ],
    points: [
      "Συστήματα έως και εκατοντάδες kW",
      "Σημαντική μείωση λειτουργικού κόστους",
      "High-Voltage racks αποθήκευσης Deye",
      "Πλήρης αναδόχηση μελετών & αδειών",
    ],
  },
];

const COMPARISON = {
  caption: "Σύγκριση τύπων φωτοβολταϊκών συστημάτων",
  headers: ["Χαρακτηριστικό", "Αυτόνομο (Off-Grid)", "Net Billing", "Υβριδικό"],
  rows: [
    ["Αρχικό κόστος", "Μεσαίο", "Το χαμηλότερο", "Το υψηλότερο"],
    ["Λογαριασμός ρεύματος", "Μηδενικός", "Μειωμένος κατά 40–70%", "Μειωμένος έως 90%"],
    ["Αυτοκατανάλωση", "100% (αποθηκευμένη)", "40–50%", "85–90%"],
    ["Backup σε blackout", "Ναι (πλήρες)", "Όχι", "Ναι (αυτόματο)"],
    ["Σύνδεση με δίκτυο", "Δεν χρειάζεται", "Απαιτείται", "Απαιτείται"],
    ["Ιδανικό για", "Εξοχικά, απομακρυσμένα", "Σταθερή ημερήσια κατανάλωση", "Μέγιστη εξοικονόμηση & ασφάλεια"],
  ],
};

const SERVICE_LD = serviceJsonLd({
  name: "Φωτοβολταϊκά Συστήματα — Σχεδιασμός & Εγκατάσταση",
  description:
    "Αυτόνομα, διασυνδεδεμένα (Net Billing) και υβριδικά φωτοβολταϊκά συστήματα με μπαταρίες λιθίου στη Θεσσαλονίκη και τη Βόρεια Ελλάδα.",
  path: "/fotovoltaika",
  serviceTypes: [
    "Αυτόνομα φωτοβολταϊκά (Off-Grid)",
    "Διασυνδεδεμένα φωτοβολταϊκά (Net Billing)",
    "Υβριδικά φωτοβολταϊκά με αποθήκευση",
    "Επαγγελματικές & αγροτικές εγκαταστάσεις",
  ],
});

export default function FotovoltaikaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={SERVICE_LD} />
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Φωτοβολταϊκά Συστήματα"
          title="Οδηγός Φωτοβολταϊκών Συστημάτων — Βρείτε τη Λύση που σας Ταιριάζει"
          lead="Από πλήρη ενεργειακή αυτονομία Off-Grid έως έξυπνα διασυνδεδεμένα Net Billing και υβριδικά με μπαταρίες: κάθε λύση εξηγημένη με απλά λόγια, ώστε να επιλέξετε με σιγουριά."
          crumbs={[{ name: "Φωτοβολταϊκά", path: "/fotovoltaika" }]}
        />

        {/* Εισαγωγή — γιατί φωτοβολταϊκά */}
        <section className="bg-white py-14 sm:py-20" aria-label="Γιατί να επιλέξετε φωτοβολταϊκά">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <Reveal>
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[#0d4c74] text-balance sm:text-4xl">
                Γιατί η Ελλάδα είναι ιδανική για φωτοβολταϊκά
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  Η Ελλάδα είναι από τις πιο ηλιόλουστες χώρες της Ευρώπης: κάθε
                  εγκατεστημένο kW φωτοβολταϊκής ισχύος παράγει κατά μέσο όρο
                  <strong className="font-semibold text-foreground"> 1.400–1.600 kWh ετησίως</strong>,
                  σημαντικά περισσότερο απ' ό,τι στη Βόρεια Ευρώπη. Αυτό σημαίνει
                  ταχύτερη απόσβεση της επένδυσης — συνήθως σε 4 έως 7 χρόνια — και
                  25+ χρόνια καθαρής εξοικονόμησης.
                </p>
                <p>
                  Την τελευταία πενταετία, οι τιμές του ηλεκτρικού ρεύματος έχουν
                  εκτοξευθεί, κάνοντας την ενεργειακή αυτονομία από πολυτέλεια
                  αναγκαιότητα. Ένα καλά σχεδιασμένο φωτοβολταϊκό σύστημα μειώνει τον
                  λογαριασμό σας από 40% έως και 100%, ανάλογα με τον τύπο που θα
                  επιλέξετε — και σας προστατεύει από κάθε επόμενη ανατίμηση.
                </p>
                <p>
                  Στη <strong className="font-semibold text-foreground">ProΣτέγη</strong>{" "}
                  εξειδικευόμαστε ακριβώς σε αυτό: σχεδιάζουμε, εγκαθιστούμε και
                  συντηρούμε συστήματα που αποδίδουν πραγματικά — με πιστοποιημένο
                  εξοπλισμό Deye &amp; V-TAC και τοπική υποστήριξη στη Θεσσαλονίκη
                  και σε όλη τη Βόρεια Ελλάδα.
                </p>
              </div>
            </Reveal>

            {/* Πίνακας σύγκρισης */}
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-[#0d4c74]/5">
                <div className="bg-[#0d4c74] px-5 py-4">
                  <h3 className="font-heading text-base font-bold text-white">
                    {COMPARISON.caption}
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] text-sm">
                    <thead>
                      <tr className="bg-[#f5f3ec] text-left">
                        {COMPARISON.headers.map((h) => (
                          <th
                            key={h}
                            className="px-4 py-3 font-heading text-[13px] font-bold text-[#0d4c74]"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON.rows.map((row, i) => (
                        <tr
                          key={row[0]}
                          className={i % 2 === 0 ? "bg-white" : "bg-[#fbfaf6]"}
                        >
                          {row.map((cell, j) => (
                            <td
                              key={j}
                              className={
                                j === 0
                                  ? "px-4 py-3 font-bold text-foreground"
                                  : "px-4 py-3 text-muted-foreground"
                              }
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Οι 4 λύσεις — αναλυτικά */}
        <section className="bg-[#f5f3ec] py-14 sm:py-20" aria-label="Τύποι συστημάτων">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Οι Λύσεις μας"
              title="Τέσσερις Τύποι Συστημάτων, μία Σωστή Επιλογή"
              subtitle="Κάθε ακίνητο και κάθε κατανάλωση είναι διαφορετική. Δείτε αναλυτικά τι προσφέρει κάθε τύπος συστήματος."
            />

            <div className="flex flex-col gap-8">
              {SOLUTION_DETAILS.map((solution) => (
                <Reveal key={solution.id}>
                  <article
                    id={solution.id}
                    className={`scroll-mt-28 overflow-hidden rounded-2xl border bg-card shadow-lg shadow-[#0d4c74]/5 ${
                      solution.featured ? "border-[#2c7a3e]/50" : "border-border"
                    }`}
                  >
                    <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[auto_1fr] lg:gap-10">
                      <div className="flex lg:flex-col lg:items-center">
                        <span
                          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                            solution.featured
                              ? "bg-[#2c7a3e] text-white shadow-lg shadow-[#2c7a3e]/30"
                              : "bg-accent text-[#2c7a3e]"
                          }`}
                        >
                          <solution.icon className="h-7 w-7" aria-hidden />
                        </span>
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#2c7a3e]">
                          {solution.eyebrow}
                        </span>
                        <h3 className="mt-1.5 font-heading text-2xl font-extrabold text-[#0d4c74]">
                          {solution.title}
                        </h3>
                        {solution.paragraphs.map((p) => (
                          <p key={p.slice(0, 40)} className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                            {p}
                          </p>
                        ))}
                        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                          {solution.points.map((point) => (
                            <li key={point} className="flex items-start gap-2 text-sm font-medium text-foreground/85">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2c7a3e]" aria-hidden />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15} className="mt-12 flex justify-center">
              <Link href="/epikoinonia">
                <Button
                  size="lg"
                  className="h-13 rounded-xl bg-[#2c7a3e] px-8 font-heading text-base font-bold shadow-xl shadow-[#2c7a3e]/25 hover:bg-[#256d34]"
                >
                  Ποια λύση μου ταιριάζει; Ζητήστε δωρεάν μελέτη
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
                </Button>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Διαδικασία */}
        <Process />

        {/* CTA */}
        <section className="bg-brand-gradient py-14 sm:py-16" aria-label="Επικοινωνία">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="font-heading text-3xl font-extrabold text-white text-balance sm:text-4xl">
                Δεν είστε σίγουροι ποιο σύστημα σας ταιριάζει;
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-lg text-white/75">
                Οι μηχανικοί μας θα αναλύσουν την κατανάλωση και τον χώρο σας και
                θα σας προτείνουν τη βέλτιστη λύση — δωρεάν και χωρίς δέσμευση.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/epikoinonia">
                  <Button
                    size="lg"
                    className="h-13 rounded-xl bg-white px-7 font-heading text-base font-bold text-[#256d34] hover:bg-[#f2f0e9]"
                  >
                    Ζητήστε Δωρεάν Μελέτη
                  </Button>
                </Link>
                <Link href="/ypologistis">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-13 rounded-xl border-white/40 px-7 font-heading text-base font-bold text-white hover:bg-white/10 hover:text-white"
                  >
                    Υπολογίστε την Εξοικονόμηση
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
