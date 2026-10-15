import Link from "next/link";
import { Target, Handshake, Leaf, Award, MapPinned, ShieldCheck, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { WhyUs, Process, SectionHeader } from "@/components/site/sections";
import { Reveal } from "@/components/site/reveal";
import { JsonLd } from "@/components/site/json-ld";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Η Εταιρεία — ProΣτέγη Φωτοβολταϊκά Θεσσαλονίκης",
  description:
    "Γνωρίστε την ProΣτέγη: εξειδικευμένη ομάδα φωτοβολταϊκών στη Θεσσαλονίκη, με εμπειρία σε αυτόνομα και υβριδικά συστήματα, πιστοποιημένο εξοπλισμό Deye & V-TAC και τοπική υποστήριξη.",
  path: "/etaireia",
  keywords: [
    "εταιρεία φωτοβολταϊκά Θεσσαλονίκη",
    "εγκαταστάτες φωτοβολταϊκών",
    "τεχνική εταιρεία ηλιακών",
    "ProΣτέγη",
  ],
});

const VALUES = [
  {
    icon: Target,
    title: "Αποστολή μας",
    text: "Κάνουμε την ενεργειακή αυτονομία προσιτή σε κάθε νοικοκυριό και επιχείρηση της Βόρεια Ελλάδας — με συστήματα που αποδίδουν πραγματικά και τιμές που συζητιούνται ανοιχτά.",
  },
  {
    icon: Handshake,
    title: "Δέσμευσή μας",
    text: "Κάθε πελάτης είναι μόνιμη σχέση, όχι συναλλαγή. Παραμένουμε δίπλα σας με συντήρηση, αναβαθμίσεις και άμεση υποστήριξη — χρόνια μετά την εγκατάσταση.",
  },
  {
    icon: Leaf,
    title: "Περιβαλλοντική ευθύνη",
    text: "Κάθε σύστημα που εγκαθιστούμε αποφεύγει κατά μέσο όρο πάνω από 1,5 τόνους CO2 ετησίως. Η ηλιακή ενέργεια είναι το πιο απτό βήμα για ένα καθαρότερο αύριο.",
  },
];

const VALUES_LD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Η Εταιρεία ProΣτέγη",
  url: "https://www.prostegi.gr/etaireia",
  description:
    "Εξειδικευμένη εταιρεία φωτοβολταϊκών συστημάτων στη Θεσσαλονίκη — αυτόνομα, Net Billing και υβριδικά συστήματα με Deye & V-TAC εξοπλισμό.",
  inLanguage: "el-GR",
};

export default function EtaireiaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={VALUES_LD} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "Αρχική", path: "/" },
        { name: "Η Εταιρεία", path: "/etaireia" },
      ])} />
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Η Εταιρεία μας"
          title="Ποιοι Είμαστε — Ο Τοπικός σας Συνεργάτης στην Ηλιακή Ενέργεια"
          lead="Η ProΣτέγη είναι μια εξειδικευμένη τεχνική εταιρεία φωτοβολταϊκών με έδρα τον Εύοσμο Θεσσαλονίκης. Ασχολούμαστε αποκλειστικά με ηλιακή ενέργεια — και αυτό φαίνεται σε κάθε λεπτομέρεια."
          crumbs={[{ name: "Η Εταιρεία", path: "/etaireia" }]}
        />

        {/* Ιστορία & πορεία */}
        <section className="bg-white py-14 sm:py-20" aria-label="Ποιοι είμαστε">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <Reveal className="relative">
              <div className="relative overflow-hidden rounded-[1.75rem] shadow-2xl shadow-[#0d4c74]/15">
                <Image
                  src="/technician.jpg"
                  alt="Τεχνικός της ProΣτέγη εγκαθιστά φωτοβολταϊκά πάνελ σε μεσογειακή στέγη"
                  width={1152}
                  height={864}
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[#0d4c74] text-balance sm:text-4xl">
                Εξειδίκευση, όχι γενικότητες
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  Στην ProΣτέγη δεν κάνουμε «τα πάντα» — κάνουμε ένα πράγμα
                  εξαιρετικά: φωτοβολταϊκά συστήματα για σπίτια, εξοχικά και
                  επιχειρήσεις. Η εστίασή μας στα αυτόνομα και υβριδικά συστήματα
                  απαιτεί βαθιά γνώση διαστασιολόγησης μπαταριών και διαχείρισης
                  ενέργειας — γνώση που αποκτήθηκε δουλεύοντας στον χώρο εδώ και
                  χρόνια.
                </p>
                <p>
                  Είμαστε τοπική εταιρεία με έδρα τον Εύοσμο Θεσσαλονίκης. Αυτό
                  σημαίνει ότι όταν χρειαστείτε υποστήριξη, δεν μιλάτε με call
                  center του εξωτερικού — μιλάτε με τους ίδιους ανθρώπους που
                  εγκατέστησαν το σύστημά σας, και μπορούμε να βρισκόμαστε στον
                  χώρο σας γρήγορα, οπουδήποτε στη Βόρεια Ελλάδα.
                </p>
                <p>
                  Συνεργαζόμαστε μόνο με κατασκευαστές με αποδεδειγμένη
                  αξιοπιστία — Deye για υβριδικούς inverter και αποθήκευση, V-TAC
                  για μπαταρίες λιθίου — και όλες οι εγκαταστάσεις γίνονται από
                  πιστοποιημένους μηχανικούς και τεχνικούς με πλήρη
                  ασφαλιστική κάλυψη.
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl border border-border bg-[#fbfaf6] p-4">
                  <MapPinned className="h-8 w-8 shrink-0 text-[#2c7a3e]" aria-hidden />
                  <div>
                    <p className="font-heading text-sm font-bold text-foreground">Έδρα</p>
                    <p className="text-xs text-muted-foreground">Εύοσμος, Θεσσαλονίκη</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-[#fbfaf6] p-4">
                  <Award className="h-8 w-8 shrink-0 text-[#2c7a3e]" aria-hidden />
                  <div>
                    <p className="font-heading text-sm font-bold text-foreground">Εξειδίκευση</p>
                    <p className="text-xs text-muted-foreground">Αυτόνομα & υβριδικά συστήματα</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Αξίες */}
        <section className="bg-[#f5f3ec] py-14 sm:py-20" aria-label="Οι αξίες μας">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Οι Αξίες μας"
              title="Τι μας Κάνει Διαφορετικούς"
              subtitle="Τρεις αρχές που καθοδηγούν κάθε εγκατάσταση, κάθε προσφορά και κάθε επικοινωνία με εσάς."
            />
            <div className="grid gap-5 md:grid-cols-3">
              {VALUES.map((value, i) => (
                <Reveal key={value.title} delay={i * 0.08}>
                  <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0d4c74]/10">
                      <value.icon className="h-6 w-6 text-[#0d4c74]" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-heading text-lg font-extrabold text-[#0d4c74]">
                      {value.title}
                    </h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                      {value.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <WhyUs />

        {/* Διαδικασία */}
        <Process />

        {/* CTA */}
        <section className="bg-leaf-gradient py-14 sm:py-16" aria-label="Επικοινωνία">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="font-heading text-3xl font-extrabold text-white text-balance sm:text-4xl">
                Ας συζητήσουμε το δικό σας project
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-lg text-white/80">
                Είτε είναι ένα εξοχικό που χρειάζεται ενέργεια, είτε μια επιχείρηση
                που θέλει να κόψει το λειτουργικό κόστος — ξεκινάμε με μια δωρεάν
                συζήτηση.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/epikoinonia">
                  <Button
                    size="lg"
                    className="h-13 rounded-xl bg-white px-7 font-heading text-base font-bold text-[#256d34] hover:bg-[#f2f0e9]"
                  >
                    Επικοινωνήστε μαζί μας
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
