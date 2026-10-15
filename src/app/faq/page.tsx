import Link from "next/link";
import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { FaqSection } from "@/components/site/faq";
import { FAQ_ITEMS } from "@/lib/faq-data";
import { Reveal } from "@/components/site/reveal";
import { JsonLd } from "@/components/site/json-ld";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Συχνές Ερωτήσεις για Φωτοβολταϊκά — Κόστος, Απόσβεση, Μπαταρίες",
  description:
    "Όλες οι απαντήσεις για φωτοβολταϊκά συστήματα: πόσο κοστίζουν, σε πόσα χρόνια αποσβένονται, ποια μπαταρία χρειάζεστε, τι γίνεται σε blackout, άδειες και επιδοτήσεις.",
  path: "/faq",
  keywords: [
    "συχνές ερωτήσεις φωτοβολταϊκά",
    "πόσο κοστίζει φωτοβολταϊκό",
    "επιδότηση φωτοβολταϊκών",
    "άδειες φωτοβολταϊκού",
    "φωτοβολταϊκά blackout",
    "καθαρισμός φωτοβολταϊκών πάνελ",
  ],
});

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={FAQ_SCHEMA} />
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Συχνές Ερωτήσεις"
          title="Όλες οι Απαντήσεις για τα Φωτοβολταϊκά, με Απλά Λόγια"
          lead="Από το κόστος και την απόσβεση έως τις μπαταρίες, τις άδειες και τις επιδοτήσεις — οι πιο συνηθισμένες ερωτήσεις των πελατών μας, απαντημένες με σαφήνεια."
          crumbs={[{ name: "Συχνές Ερωτήσεις", path: "/faq" }]}
        />

        <section className="bg-white py-14 sm:py-20" aria-label="Ερωτήσεις και απαντήσεις">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <FaqSection />
            </Reveal>

            {/* Δεν βρήκτε απάντηση */}
            <Reveal delay={0.1} className="mt-10">
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#2c7a3e]/25 bg-[#e9f3eb]/70 p-7 text-center sm:flex-row sm:text-left">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#2c7a3e]">
                  <MessageCircleQuestion className="h-8 w-8 text-white" aria-hidden />
                </span>
                <div className="flex-1">
                  <h2 className="font-heading text-lg font-extrabold text-[#256d34]">
                    Δεν βρήκατε την απάντηση που ψάχνατε;
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/75">
                    Ρωτήστε μας οτιδήποτε — οι μηχανικοί μας απαντούν προσωπικά σε
                    κάθε ερώτημα, ακόμα κι αν δεν αφορά άμεση αγορά.
                  </p>
                </div>
                <Link href="/epikoinonia">
                  <Button
                    size="lg"
                    className="h-12 shrink-0 rounded-xl bg-[#2c7a3e] px-6 font-heading font-bold shadow-lg shadow-[#2c7a3e]/25 hover:bg-[#256d34]"
                  >
                    Κάντε την ερώτησή σας
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
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
