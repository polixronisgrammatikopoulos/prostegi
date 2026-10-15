/**
 * ProΣτέγη — Ολοκληρωμένα Πακέτα Εγκαταστάσεων Φωτοβολταϊκών
 * Η στάνταρ σειρά πακέτων 5–20 kW για σπίτι και επιχείρηση.
 *
 * Κάθε πακέτο εμφανίζεται στην σελίδα /paketa με πανομοιότυπη
 * τρισδιάστατη απεικόνιση (τα χρώματα του λογότυπου) και την
 * ένδειξη ισχύος (π.χ. «10kW») μέσα στην εικόνα.
 *
 * Τιμές: `price: null` σημαίνει «Ρωτήστε τιμή» — ο πελάτης
 * συμπληρώνει αναδιπλούμενη φόρμα και εξειδικευμένος εκπρόσωπος
 * τον καλεί τηλεφωνικά για τελική προσφορά.
 */

export type PackageAudience = "home" | "home-business" | "business";

export type PvPackage = {
  id: string;
  kw: number;
  /** Ένδειξη μέσα στην 3D εικόνα, π.χ. «10kW» */
  kwLabel: string;
  name: string;
  audience: PackageAudience;
  audienceLabel: string;
  /** null → «Ρωτήστε τιμή» */
  price: number | null;
  priceNote: string;
  badge?: string;
  panels: number;
  panelW: number;
  kwp: string;
  inverter: string;
  battery: string;
  production: string;
  roofArea: string;
  bullets: string[];
  description: string;
};

export const AUDIENCE_LABEL: Record<PackageAudience, string> = {
  home: "Ιδανικό για Σπίτι",
  "home-business": "Σπίτι & Επιχείρηση",
  business: "Ιδανικό για Επιχείρηση",
};

export const PAKETA: PvPackage[] = [
  {
    id: "paketo-5kw",
    kw: 5,
    kwLabel: "5kW",
    name: "Ολοκληρωμένο Φωτοβολταϊκό Σύστημα 5 kW",
    audience: "home",
    audienceLabel: AUDIENCE_LABEL.home,
    price: null,
    priceNote: "Ρωτήστε τιμή",
    panels: 10,
    panelW: 500,
    kwp: "5,0 kWp",
    inverter: "Υβριδικός 6 kW",
    battery: "Μπαταρία 5 kWh",
    production: "~7.500 kWh/έτος",
    roofArea: "~20 τ.μ. στέγης",
    bullets: [
      "10 × πάνελ 500W μονοκρυσταλλικά",
      "Υβριδικός inverter 6 kW με MPPT",
      "Μπαταρία λιθίου 5 kWh",
    ],
    description:
      "Το ολοκληρωμένο φωτοβολταϊκό σύστημα 5 kW είναι η δημοφιλής επιλογή για κατοικίες έως 120 τ.μ. με ετήσια κατανάλωση έως 9.000 kWh. Δέκα πάνελ 500W, υβριδικός inverter 6 kW και μπαταρία 5 kWh καλύπτουν το μεγαλύτερο μέρος της ημερήσιας κατανάλωσης, με πλήρη εγκατάσταση, άδειες και σύνδεση ΔΕΔΔΗΕ περιλαμβανομένων.",
  },
  {
    id: "paketo-10kw",
    kw: 10,
    kwLabel: "10kW",
    name: "Ολοκληρωμένο Φωτοβολταϊκό Σύστημα 10 kW",
    audience: "home-business",
    audienceLabel: AUDIENCE_LABEL["home-business"],
    price: 8500,
    priceNote: "Τελική τιμή με ΦΠΑ 24%",
    badge: "ΔΗΜΟΦΙΛΕΣ",
    panels: 20,
    panelW: 500,
    kwp: "10,0 kWp",
    inverter: "Υβριδικός 10 kW",
    battery: "Έτοιμο για μπαταρία",
    production: "~15.000 kWh/έτος",
    roofArea: "~38 τ.μ. στέγης",
    bullets: [
      "20 × πάνελ 500W μονοκρυσταλλικά",
      "Υβριδικός inverter 10 kW",
      "Προετοιμασία για προσθήκη μπαταρίας",
    ],
    description:
      "Το ολοκληρωμένο φωτοβολταϊκό σύστημα 10 kW είναι το best seller μας για μεγάλα σπίτια με αντλία θερμότητας και καταστήματα: 20 πάνελ 500W, υβριδικός inverter 10 kW και υποδομή για μελλοντική προσθήκη μπαταρίας αποθήκευσης. Ετήσια παραγωγή περίπου 15.000 kWh με τελική τιμή 8.500€ που περιλαμβάνει εξοπλισμό, μελέτη, άδειες και πλήρη εγκατάσταση.",
  },
  {
    id: "paketo-12kw",
    kw: 12,
    kwLabel: "12kW",
    name: "Ολοκληρωμένο Φωτοβολταϊκό Σύστημα 12 kW",
    audience: "home-business",
    audienceLabel: AUDIENCE_LABEL["home-business"],
    price: null,
    priceNote: "Ρωτήστε τιμή",
    panels: 24,
    panelW: 500,
    kwp: "12,0 kWp",
    inverter: "Τριφασικός 12 kW",
    battery: "Έτοιμο για μπαταρία",
    production: "~18.000 kWh/έτος",
    roofArea: "~46 τ.μ. στέγης/δώματος",
    bullets: [
      "24 × πάνελ 500W μονοκρυσταλλικά",
      "Τριφασικός υβριδικός inverter 12 kW",
      "Ιδανικό για μεγάλες κατοικίες",
    ],
    description:
      "Το ολοκληρωμένο φωτοβολταϊκό σύστημα 12 kW απευθύνεται σε μεγάλες κατοικίες και επαγγελματικούς χώρους με τριφασική παροχή: 24 πάνελ 500W και τριφασικός υβριδικός inverter 12 kW με παραγωγή περίπου 18.000 kWh ετησίως. Με πλήρη μελέτη, άδειες και εγκατάσταση από τα δικά μας συνεργεία.",
  },
  {
    id: "paketo-16kw",
    kw: 16,
    kwLabel: "16kW",
    name: "Ολοκληρωμένο Φωτοβολταϊκό Σύστημα 16 kW",
    audience: "business",
    audienceLabel: AUDIENCE_LABEL.business,
    price: null,
    priceNote: "Ρωτήστε τιμή",
    panels: 32,
    panelW: 500,
    kwp: "16,0 kWp",
    inverter: "Τριφασικός 16 kW",
    battery: "Έτοιμο για μπαταρία",
    production: "~24.000 kWh/έτος",
    roofArea: "~60 τ.μ. δώματος",
    bullets: [
      "32 × πάνελ 500W μονοκρυσταλλικά",
      "Τριφασικός υβριδικός inverter 16 kW",
      "Για επιχειρήσεις με υψηλή κατανάλωση",
    ],
    description:
      "Το ολοκληρωμένο φωτοβολταϊκό σύστημα 16 kW είναι σχεδιασμένο για επιχειρήσεις — βιοτεχνίες, αρτοποιεία, ψυκτικούς θαλάμους και καταστήματα λιανικής — που θέλουν να κόψουν το κόστος της αιχμής. 32 πάνελ 500W, τριφασικός inverter 16 kW και παραγωγή περίπου 24.000 kWh ετησίως, με απόσβεση που συχνά δεν ξεπερνά τα 4–5 έτη.",
  },
  {
    id: "paketo-20kw",
    kw: 20,
    kwLabel: "20kW",
    name: "Ολοκληρωμένο Φωτοβολταϊκό Σύστημα 20 kW",
    audience: "business",
    audienceLabel: AUDIENCE_LABEL.business,
    price: 14000,
    priceNote: "Τελική τιμή με ΦΠΑ 24%",
    badge: "ΕΠΙΧΕΙΡΗΣΕΙΣ",
    panels: 40,
    panelW: 500,
    kwp: "20,0 kWp",
    inverter: "Τριφασικός 20 kW",
    battery: "Έτοιμο για μπαταρία",
    production: "~30.000 kWh/έτος",
    roofArea: "~75 τ.μ. δώματος",
    bullets: [
      "40 × πάνελ 500W μονοκρυσταλλικά",
      "Τριφασικός υβριδικός inverter 20 kW",
      "Μέγιστη απόδοση για επιχειρήσεις",
    ],
    description:
      "Το ολοκληρωμένο φωτοβολταϊκό σύστημα 20 kW είναι η κορυφαία στάνταρ διαμόρφωσή μας για επιχειρήσεις: 40 πάνελ 500W και τριφασικός υβριδικός inverter 20 kW με ετήσια παραγωγή περίπου 30.000 kWh. Τελική τιμή 14.000€ με ΦΠΑ, εξοπλισμό, μελέτη, άδειες και πλήρη εγκατάσταση — χωρίς κρυφά κόστη.",
  },
];

/** Ετικέτα τιμής για εμφάνιση στην κάρτα */
export function packagePriceLabel(p: PvPackage): string {
  if (p.price === null) return "Ρωτήστε τιμή";
  return new Intl.NumberFormat("el-GR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(p.price);
}

export function getPackage(id: string): PvPackage | undefined {
  return PAKETA.find((p) => p.id === id);
}
