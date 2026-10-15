import type { Metadata } from "next";
import { PhoneCall, ShieldCheck, Clock, PiggyBank } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { CheckoutForm } from "@/components/site/checkout-form";

/** Η σελίδα ολοκλήρωσης ΔΕΝ δείχνει στην Google */
export const metadata: Metadata = {
  title: "Ολοκλήρωση Παραγγελίας | ProΣτέγη",
  description: "Ολοκληρώστε την παραγγελία φωτοβολταϊκού εξοπλισμού — τηλεφωνική επιβεβαίωση.",
  robots: { index: false, follow: false },
};

const STEPS = [
  {
    icon: PhoneCall,
    title: "Σας καλούμε",
    text: "Επιβεβαιώνουμε τη διαθεσιμότητα και τις τελικές τιμές — σε συνδυασμούς η τιμή βγαίνει καλύτερη.",
  },
  {
    icon: PiggyBank,
    title: "Κλείνουμε την καλύτερη προσφορά",
    text: "Ποσότητες, συνδυασμοί και εγκατάσταση υπολογίζονται μαζί για τη χαμηλότερη συνολική τιμή.",
  },
  {
    icon: Clock,
    title: "Παράδοση ή εγκατάσταση",
    text: "Ορίζουμε μαζί ημερομηνία παράδοσης ή εγκατάστασης από το πιστοποιημένο συνεργείο μας.",
  },
];

export default function OloklirosiPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-[#f5f3ec] pt-[72px]">
        <PageHero
          eyebrow="Ολοκλήρωση Παραγγελίας"
          title="Απλά τα Στοιχεία σας — Για Όλα τα Άλλα Αναλαμβάνουμε Εμείς"
          lead="Δεν κάνουμε online χρέωση. Μετά την υποβολή, ένας εξειδικευμένος συνεργάτης σας καλεί για επιβεβαίωση, απαντήσεις σε απορίες και τον προγραμματισμό παράδοσης."
          crumbs={[
            { name: "Προϊόντα", path: "/proionta" },
            { name: "Καλάθι", path: "/kalathi" },
            { name: "Ολοκλήρωση", path: "/oloklirosi-paraggelias" },
          ]}
        />

        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Γιατί τηλεφωνικά */}
            <div className="mb-10 grid gap-4 sm:grid-cols-3">
              {STEPS.map((step) => (
                <div
                  key={step.title}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e9f3eb]">
                    <step.icon className="h-5 w-5 text-[#2c7a3e]" aria-hidden />
                  </span>
                  <div>
                    <h2 className="font-heading text-base font-extrabold text-[#0d4c74]">
                      {step.title}
                    </h2>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <CheckoutForm />

            <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm font-semibold text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-[#2c7a3e]" aria-hidden />
              Τα δεδομένα σας φυλάσσονται σε υποδομή εντός ΕΕ και δεν κοινοποιούνται σε τρίτους.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
