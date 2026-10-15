import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { JsonLd } from "@/components/site/json-ld";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { CORE_KEYWORDS, SITE_NAME, SITE_URL } from "@/lib/seo";

const headingFont = Manrope({
  variable: "--font-heading",
  subsets: ["greek", "latin"],
  display: "swap",
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["greek", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "ProΣτέγη | Φωτοβολταϊκά Συστήματα Θεσσαλονίκης — Αυτόνομα, Net Billing & Υβριδικά",
    template: "%s | ProΣτέγη",
  },
  description:
    "Η ProΣτέγη σχεδιάζει και εγκαθιστά αυτόνομα, διασυνδεδεμένα (Net Billing) και υβριδικά φωτοβολταϊκά συστήματα με εξοπλισμό Deye & V-TAC στη Θεσσαλονίκη και σε όλη τη Βόρεια Ελλάδα. Δωρεάν μελέτη, πιστοποιημένος εξοπλισμός, διά βίου υποστήριξη.",
  keywords: CORE_KEYWORDS,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    telephone: true,
    email: true,
  },
  icons: {
    icon: "/logo-square.png",
    apple: "/logo-square.png",
  },
  openGraph: {
    title: `${SITE_NAME} | Ηλιακή Ενέργεια, Ανεξάρτητη Ζωή`,
    description:
      "Αυτόνομα & διασυνδεδεμένα φωτοβολταϊκά συστήματα με Deye & V-TAC εξοπλισμό. Ζήστε με αυτονομία και εξοικονόμηση.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "el_GR",
    images: [{ url: "/hero-solar.jpg", width: 1466, height: 574 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Φωτοβολταϊκά Θεσσαλονίκης`,
    description:
      "Αυτόνομα, Net Billing & Υβριδικά φωτοβολταϊκά συστήματα στη Θεσσαλονίκη. Δωρεάν μελέτη & προσφορά.",
    images: ["/hero-solar.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  other: {
    "geo.region": "GR-B",
    "geo.placename": "Θεσσαλονίκη",
    "geo.position": "40.6725;22.9305",
    ICBM: "40.6725, 22.9305",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d4c74",
};

/* ---------- Structured Data: Οργανισμός + Τοπική Επιχείρηση + Ιστότοπος ---------- */

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-square.png`,
  description:
    "Σχεδιασμός, εγκατάσταση και συντήρηση αυτόνων και διασυνδεδεμένων φωτοβολταϊκών συστημάτων στη Θεσσαλονίκη.",
  knowsAbout: [
    "αυτόνομα φωτοβολταϊκά συστήματα",
    "net billing",
    "υβριδικά φωτοβολταϊκά",
    "μπαταρίες λιθίου LiFePO4",
    "inverter Deye",
    "ενεργειακή αυτονομία",
    "φωτοβολταϊκά για εξοχικό",
    "φωτοβολταϊκά για αγρόκτημα",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+302310644512",
    contactType: "sales",
    areaServed: "GR",
    availableLanguage: ["el"],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ElectricalContractor",
  "@id": `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  image: `${SITE_URL}/logo.png`,
  logo: `${SITE_URL}/logo-square.png`,
  url: SITE_URL,
  telephone: "+302310644512",
  email: "info@prostegi.gr",
  priceRange: "€€",
  description:
    "Εγκατάσταση αυτόνων, διασυνδεδεμένων (Net Billing) και υβριδικών φωτοβολταϊκών συστημάτων με μπαταρίες λιθίου Deye & V-TAC στη Θεσσαλονίκη και τη Βόρεια Ελλάδα.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Καραολή & Δημητρίου 242",
    addressLocality: "Εύοσμος",
    addressRegion: "Θεσσαλονίκη",
    postalCode: "56431",
    addressCountry: "GR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.6725,
    longitude: 22.9305,
  },
  areaServed: [
    { "@type": "City", name: "Θεσσαλονίκη" },
    { "@type": "AdministrativeArea", name: "Κεντρική Μακεδονία" },
    { "@type": "AdministrativeArea", name: "Δυτική Μακεδονία" },
    { "@type": "AdministrativeArea", name: "Ανατολική Μακεδονία & Θράκη" },
  ],
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Φωτοβολταϊκές Υπηρεσίες",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Αυτόνομα φωτοβολταϊκά συστήματα (Off-Grid)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Διασυνδεδεμένα φωτοβολταϊκά (Net Billing)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Υβριδικά φωτοβολταϊκά με μπαταρίες αποθήκευσης" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Επαγγελματικές & αγροτικές φωτοβολταϊκές εγκαταστάσεις" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Συντήρηση & υποστήριξη φωτοβολταϊκών" } },
    ],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: "Φωτοβολταϊκά συστήματα στη Θεσσαλονίκη — αυτόνομα, Net Billing, υβριδικά.",
  inLanguage: "el-GR",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" suppressHydrationWarning>
      <body
        className={`${headingFont.variable} ${bodyFont.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ScrollProgress />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={localBusinessJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
