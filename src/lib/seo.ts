import type { Metadata } from "next";

export const SITE_URL = "https://www.prostegi.gr";
export const SITE_NAME = "ProΣτέγη";

/** Βασικές λέξεις-κλειδιά που χρησιμοποιούνται σε όλο το site */
export const CORE_KEYWORDS = [
  "φωτοβολταϊκά",
  "φωτοβολταϊκά συστήματα",
  "φωτοβολταϊκά Θεσσαλονίκη",
  "αυτόνομα φωτοβολταϊκά",
  "διασυνδεδεμένα φωτοβολταϊκά",
  "net billing",
  "net metering",
  "υβριδικά φωτοβολταϊκά",
  "μπαταρίες λιθίου",
  "φωτοβολταϊκά πάνελ",
  "inverter Deye",
  "V-TAC",
  "ενεργειακή αυτονομία",
  "εξοικονόμηση ενέργειας",
  "ηλιακή ενέργεια",
  "εγκατάσταση φωτοβολταϊκών",
  "φωτοβολταϊκά Βόρεια Ελλάδα",
  "δωρεάν μελέτη φωτοβολταϊκού",
];

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

/** Χτίζει πλήρες Metadata ανά σελίδα: τίτλος, περιγραφή, canonical, OG, Twitter */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetaInput): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const allKeywords = Array.from(new Set([...keywords, ...CORE_KEYWORDS]));

  return {
    title,
    description,
    keywords: allKeywords,
    alternates: {
      canonical: path === "/" ? "/" : path,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "el_GR",
      images: [{ url: "/hero-solar.jpg", width: 1466, height: 574, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: ["/hero-solar.jpg"],
    },
  };
}

/** JSON-LD breadcrumb trail για εσωτερικές σελίδες */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}

/** JSON-LD για υπηρεσία (Service) */
export function serviceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  serviceTypes?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    provider: {
      "@type": "ElectricalContractor",
      name: SITE_NAME,
      url: SITE_URL,
      telephone: "+302310644512",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Καραολή & Δημητρίου 242",
        addressLocality: "Εύοσμος, Θεσσαλονίκη",
        postalCode: "56431",
        addressCountry: "GR",
      },
    },
    areaServed: [
      { "@type": "City", name: "Θεσσαλονίκη" },
      { "@type": "AdministrativeArea", name: "Κεντρική Μακεδονία" },
      { "@type": "AdministrativeArea", name: "Βόρεια Ελλάδα" },
    ],
    ...(opts.serviceTypes ? { hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Φωτοβολταϊκές Λύσεις",
      itemListElement: opts.serviceTypes.map((t) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: t },
      })),
    } } : {}),
  };
}
