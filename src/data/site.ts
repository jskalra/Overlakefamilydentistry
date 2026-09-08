// Single source of truth for NAP + site data. Keep 100% consistent with GBP & LSA docs.
export const site = {
  name: "Overlake Family Dentistry",
  heritage: "Formerly the Practice of Dr. Brian Brooks",
  tagline: "Conservative, Tooth-Preserving Care",
  transitionBanner:
    "Continuing 30+ Years of Conservative, Patient-First Care in Bellevue",
  phone: "(425) 883-3040",
  phoneHref: "tel:+14258833040",
  emergencyPhone: "(571) 341-0957",
  emergencyPhoneHref: "tel:+15713410957",
  email: "info@drkaurdds.com",
  address: {
    street: "14655 NE Bel-Red Rd., Bldg. F, Ste. 101",
    city: "Bellevue",
    state: "WA",
    zip: "98007",
  },
  hours: [
    { day: "Monday", open: "8:00 AM", close: "5:00 PM" },
    { day: "Tuesday", open: "7:30 AM", close: "4:30 PM" },
    { day: "Wednesday", open: "7:30 AM", close: "4:30 PM" },
    { day: "Thursday", open: "7:00 AM", close: "2:00 PM" },
    { day: "Friday", open: "Closed", close: "" },
    { day: "Saturday", open: "Closed", close: "" },
    { day: "Sunday", open: "Closed", close: "" },
  ],
  domain: "https://overlakefamilydentistry.com",
  googleProfile: "https://share.google/aJE7u7wdrqUzLuinB",
} as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "Doctors", href: "/doctors" },
  { label: "Team", href: "/team" },
  { label: "Services", href: "/services" },
  { label: "New Patients", href: "/new-patients" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const doctors = [
  {
    name: "Dr. Ravneet Kaur Kalra",
    credential: "DDS",
    credentialLine: "Columbia University College of Dental Medicine",
    imageKey: "kalra",
    bio: [
      "Dr. Brooks selected Dr. Kaur because of her exceptional clinical skill and her commitment to conservative, honest dental care. She brings a wealth of experience in modern, comfortable dental technology. More importantly, she is a kind and compassionate person.",
      "She first completed postgraduate training in orthodontics in India, then earned her Doctor of Dental Surgery (DDS) at Columbia University College of Dental Medicine in New York after moving to the United States in 2014. Since relocating to the Pacific Northwest in 2020, she has been an active, valued member of the local dental community.",
      "She is passionate about care that is both honest and minimally invasive — preserving natural tooth structure whenever possible. Outside the office, she enjoys traveling, reading, and spending time with her family and her twelve-year-old son.",
    ],
    memberships: [],
  },
  {
    name: "Dr. Brian Brooks",
    credential: "DDS",
    credentialLine: "University of Washington School of Dentistry",
    imageKey: "brooks",
    bio: [
      "Dr. Brooks has served the Bellevue–Redmond area for over 30 years, building a large and loyal patient following through honest treatment assessments, high-quality care, and a gentle, compassionate approach. He strongly believes that healthy, functional teeth and gums can add years to your life — and make those years pain-free, with a smile worth sharing.",
      "Dr. Brooks grew up in Ellensburg, Washington, where his father served as President of Central Washington University for many years. He earned his undergraduate degree from the University of Washington and went on to receive his DDS from the prestigious University of Washington School of Dentistry in 1986. After three years practicing in Tucson, Arizona, he returned to the Pacific Northwest to begin private practice.",
      "He continuously attends educational courses and seminars to stay current with the constant evolution of modern dentistry, and holds membership in the American Dental Association, the Washington State Dental Association, and the Seattle/King County Dental Association.",
      "Dr. Brooks makes his home in Bellevue. He is married with four grown children and one grandchild (so far!). In his spare time he enjoys traveling, sporting events, boating, and projects around the house.",
    ],
    memberships: [
      "American Dental Association",
      "Washington State Dental Association",
      "Seattle/King County Dental Association",
    ],
  },
] as const;

export const serviceAreas = [
  { label: "Bellevue", href: "/dentist/bellevue" },
  { label: "Redmond", href: "/dentist/redmond" },
  { label: "Kirkland", href: "/dentist/kirkland" },
  { label: "Sammamish", href: "/dentist/sammamish" },
] as const;

export const serviceCategories = [
  { title: "General Dentistry", href: "/services/general-dentistry" },
  { title: "Cosmetic Dentistry", href: "/services/cosmetic-dentistry" },
  { title: "Restorative Dentistry", href: "/services/restorative-dentistry" },
  { title: "Orthodontic Services", href: "/services/orthodontic-services" },
  { title: "Pediatric Dentistry", href: "/services/pediatric-dentistry" },
  { title: "Periodontal Services", href: "/services/periodontal-services" },
] as const;
