// Single source of truth for NAP + site data. Keep 100% consistent with GBP & LSA docs.
export const site = {
  name: "Overlake Family Dentistry",
  heritage: "Formerly the Practice of Dr. Brian Brooks",
  tagline: "Conservative, Tooth-Preserving Care",
  transitionBanner:
    "Continuing 25+ Years of Conservative, Patient-First Care in Bellevue",
  phone: "(425) 883-3040",
  phoneHref: "tel:+14258833040",
  email: "info@overlakefamilydentistry.com",
  address: {
    street: "14655 Bel-Red Road, Bldg. F, Ste. 101",
    city: "Bellevue",
    state: "WA",
    zip: "98007",
  },
  hours: [
    { day: "Monday", open: "8:00 AM", close: "5:00 PM" },
    { day: "Tuesday", open: "8:00 AM", close: "5:00 PM" },
    { day: "Wednesday", open: "8:00 AM", close: "5:00 PM" },
    { day: "Thursday", open: "8:00 AM", close: "5:00 PM" },
    { day: "Friday", open: "8:00 AM", close: "2:00 PM" },
    { day: "Saturday", open: "Closed", close: "" },
    { day: "Sunday", open: "Closed", close: "" },
  ],
  domain: "https://overlakefamilydentistry.com",
} as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Services", href: "/services" },
  { label: "New Patients", href: "/new-patients" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const serviceCategories = [
  { title: "General Dentistry", href: "/services/general-dentistry" },
  { title: "Cosmetic Dentistry", href: "/services/cosmetic-dentistry" },
  { title: "Restorative Dentistry", href: "/services/restorative-dentistry" },
  { title: "Orthodontic Services", href: "/services/orthodontic-services" },
  { title: "Pediatric Dentistry", href: "/services/pediatric-dentistry" },
  { title: "Periodontal Services", href: "/services/periodontal-services" },
] as const;
