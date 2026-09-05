import { site, doctors } from "../data/site";

// Convert "7:30 AM" -> "07:30" (24h) for schema.org openingHoursSpecification.
function to24(t: string): string | null {
  const m = t.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = m[2];
  const ap = m[3].toUpperCase();
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${min}`;
}

const openingHours = site.hours
  .filter((h) => to24(h.open) && to24(h.close))
  .map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${h.day}`,
    opens: to24(h.open),
    closes: to24(h.close),
  }));

// Primary LocalBusiness / Dentist entity — the NAP source of truth in structured form.
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${site.domain}/#dentist`,
  name: site.name,
  alternateName: "Formerly the Practice of Dr. Brian Brooks",
  url: site.domain,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  areaServed: ["Bellevue", "Redmond", "Kirkland", "Sammamish", "Bel-Red"].map((n) => ({
    "@type": "City",
    name: n,
  })),
  openingHoursSpecification: openingHours,
  member: doctors.map((d) => ({
    "@type": "Person",
    name: d.name,
    jobTitle: "Dentist",
    alumniOf: d.credentialLine,
  })),
};

export function faqSchema(faq: { q: string; a: string }[]) {
  if (!faq.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.domain}${it.url}`,
    })),
  };
}
