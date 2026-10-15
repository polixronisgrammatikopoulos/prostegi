import { MapPin, PhoneCall, Mail, Clock, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/site/reveal";
import { JsonLd } from "@/components/site/json-ld";
import { Card, CardContent } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Επικοινωνία — Δωρεάν Μελέτη Φωτοβολταϊκού στη Θεσσαλονίκη",
  description:
    "Επικοινωνήστε με την ProΣτέγη για δωρεάν μελέτη και προσφορά φωτοβολταϊκού συστήματος. Καραολή & Δημητρίου 242, Εύοσμος Θεσσαλονίκης · Τηλ. 2310 644 512 · info@prostegi.gr",
  path: "/epikoinonia",
  keywords: [
    "φωτοβολταϊκά τηλέφωνο Θεσσαλονίκη",
    "δωρεάν μελέτη φωτοβολταϊκού",
    "προσφορά φωτοβολταϊκού συστήματος",
    "καταστήματα φωτοβολταϊκών Θεσσαλονίκη",
  ],
});

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: "Διεύθυνση",
    lines: ["Καραολή & Δημητρίου 242", "Εύοσμος 56431, Θεσσαλονίκη"],
    href: "https://maps.google.com/?q=Καραολή+και+Δημητρίου+242,+Εύοσμος+56431",
    action: "Οδηγίες",
  },
  {
    icon: PhoneCall,
    title: "Τηλέφωνα",
    lines: ["2310 644 512", "6947 166 244"],
    href: "tel:+302310644512",
    action: "Καλέστε μας",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@prostegi.gr"],
    href: "mailto:info@prostegi.gr",
    action: "Στείλτε email",
  },
  {
    icon: Clock,
    title: "Εξυπηρέτηση",
    lines: ["Δευτέρα – Παρασκευή", "Σάββατο: με ραντεβού"],
    href: "tel:+302310644512",
    action: "Κλείστε ραντεβού",
  },
];

export default function EpikoinoniaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Επικοινωνία"
          title="Ζητήστε τη Δωρεάν σας Μελέτη"
          lead="Συμπληρώστε τη φόρμα ή καλέστε μας απευθείας — σας απαντάμε εντός μίας εργάσιμης ημέρας και σχεδιάζουμε μαζί το δικό σας σύστημα."
          crumbs={[{ name: "Επικοινωνία", path: "/epikoinonia" }]}
        />

        {/* Φόρμα + στοιχεία */}
        <section className="bg-white py-14 sm:py-20" aria-label="Στοιχεία επικοινωνίας και φόρμα">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
              {/* Info cards */}
              <Reveal className="flex flex-col gap-4">
                {CONTACT_INFO.map((item) => (
                  <Card
                    key={item.title}
                    className="border-border shadow-sm transition-shadow hover:shadow-md"
                  >
                    <CardContent className="flex items-start gap-4 p-5">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent">
                        <item.icon className="h-6 w-6 text-[#2c7a3e]" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <h2 className="font-heading text-base font-extrabold text-[#0d4c74]">
                          {item.title}
                        </h2>
                        {item.lines.map((line) => (
                          <p
                            key={line}
                            className="text-[15px] leading-relaxed text-muted-foreground"
                          >
                            {line}
                          </p>
                        ))}
                        <a
                          href={item.href}
                          className="mt-1.5 inline-block text-sm font-bold text-[#2c7a3e] underline-offset-4 hover:underline"
                        >
                          {item.action} →
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </Reveal>

              {/* Form */}
              <Reveal delay={0.1}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Περιοχή εξυπηρέτησης */}
        <section className="bg-[#f5f3ec] py-14 sm:py-16" aria-label="Περιοχή εξυπηρέτησης">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <Reveal>
                <h2 className="font-heading text-2xl font-extrabold text-[#0d4c74] text-balance sm:text-3xl">
                  Εξυπηρετούμε όλη τη Βόρεια Ελλάδα
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  Η έδρα μας βρίσκεται στον Εύοσμο Θεσσαλονίκης, με πλήρη κάλυψη
                  σε όλο τον νομό: Θεσσαλονίκη, Καλαμαριά, Πυλαία, Θέρμη, Ωραιόκαστρο,
                  Χορτιάτη, Λαγκαδά και τις γύρω περιοχές. Για μεγαλύτερα projects
                  αναλαμβάνουμε εγκαταστάσεις σε όλη τη Βόρεια Ελλάδα και τη Χαλκιδική.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  Επισκεπτόμαστε τον χώρο σας, πραγματοποιούμε την αυτοψία δωρεάν
                  και σας παραδίδουμε αναλυτική προσφορά με ενδεικτική παραγωγή,
                  εξοικονόμηση και χρόνο απόσβεσης — χωρίς καμία δέσμευση.
                </p>
              </Reveal>

              {/* Χάρτης */}
              <Reveal delay={0.1}>
                <div className="overflow-hidden rounded-2xl border border-border shadow-lg shadow-[#0d4c74]/10">
                  <iframe
                    title="Χάρτης — ProΣτέγη, Καραολή & Δημητρίου 242, Εύοσμος Θεσσαλονίκης"
                    src="https://maps.google.com/maps?q=%CE%9A%CE%B1%CF%81%CE%B1%CE%BF%CE%BB%CE%AE%20%CE%BA%CE%B1%CE%B9%20%CE%94%CE%B7%CE%BC%CE%B7%CF%84%CF%81%CE%AF%CE%BF%CF%85%20242%20%CE%95%CF%8D%CE%BF%CF%83%CE%BC%CE%BF%CF%82%2056431&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="320"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block w-full border-0"
                    allowFullScreen
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
