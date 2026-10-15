import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { CartView } from "@/components/site/cart-view";

/** Ο αρχικός τίτλος/robots: το καλάθι ΔΕΝ πρέπει να δείχνει στην Google */
export const metadata: Metadata = {
  title: "Καλάθι Αγορών | ProΣτέγη",
  description: "Το καλάθι αγορών σας για φωτοβολταϊκό εξοπλισμό.",
  robots: { index: false, follow: true },
};

export default function KalathiPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-[#f5f3ec] pt-[72px]">
        <PageHero
          eyebrow="Καλάθι Αγορών"
          title="Τα Προϊόντα που Επιλέξατε"
          lead="Ελέγξτε τις ποσότητες και προχωρήστε στην ολοκλήρωση — χωρίς πληρωμή online. Σας καλούμε εμείς για την τελική επιβεβαίωση."
          crumbs={[{ name: "Καλάθι", path: "/kalathi" }]}
        />
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <CartView />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
