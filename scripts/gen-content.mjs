import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const write = (rel, content) => {
  const p = join(root, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
};

const categories = [
  {
    slug: "general-dentistry", title: "General Dentistry",
    summary: "Preventive and everyday care to keep your smile healthy for life.",
    services: [
      ["exams-cleanings", "Exams & Cleanings", "Routine exams and professional cleanings that catch problems early and keep teeth and gums healthy."],
      ["nightguards", "Nightguards", "Custom nightguards to protect your teeth from grinding and clenching while you sleep."],
      ["tmj-treatment", "TMJ Treatment", "Conservative care for jaw pain, clicking, and TMJ disorders."],
    ],
  },
  {
    slug: "cosmetic-dentistry", title: "Cosmetic Dentistry",
    summary: "Natural-looking enhancements that respect and preserve your healthy tooth structure.",
    services: [
      ["teeth-whitening", "Teeth Whitening", "Safe, professional whitening for a brighter, natural-looking smile."],
      ["veneers", "Veneers", "Thin, custom porcelain veneers to reshape and brighten your smile conservatively."],
      ["bonding", "Dental Bonding", "Quick, minimally invasive repair for chips, gaps, and discoloration."],
      ["inlays-onlays", "Inlays & Onlays", "Conservative, tooth-preserving alternatives to full crowns."],
      ["porcelain-crowns", "Porcelain Crowns", "Durable, natural-looking crowns that restore damaged teeth."],
    ],
  },
  {
    slug: "restorative-dentistry", title: "Restorative Dentistry",
    summary: "Restoring function and comfort while preserving as much natural tooth as possible.",
    services: [
      ["dental-implants", "Dental Implants", "Permanent, natural-feeling replacements for missing teeth."],
      ["bridges", "Bridges", "Fixed restorations that replace one or more missing teeth."],
      ["dentures", "Dentures", "Comfortable, natural-looking full dentures."],
      ["denture-partials", "Partial Dentures", "Removable partials that replace several missing teeth."],
      ["root-canals", "Root Canals", "Gentle root canal therapy that saves your natural tooth."],
      ["extractions", "Extractions", "Careful tooth removal only when truly necessary."],
    ],
  },
  {
    slug: "orthodontic-services", title: "Orthodontic Services",
    summary: "Modern, discreet options to straighten teeth for all ages.",
    services: [
      ["invisalign", "Invisalign", "Clear, removable aligners to straighten teeth discreetly."],
      ["invisalign-for-teens", "Invisalign for Teens", "Clear aligners designed for teenage smiles and lifestyles."],
    ],
  },
  {
    slug: "pediatric-dentistry", title: "Pediatric Dentistry",
    summary: "Gentle, positive dental care that helps kids build lifelong healthy habits.",
    services: [
      ["preventative-dentistry", "Preventative Dentistry", "Cleanings, exams, and guidance to protect young smiles."],
      ["cavities-fillings", "Cavities & Fillings", "Gentle, tooth-colored fillings for children."],
      ["sealants", "Sealants", "Protective sealants that guard against cavities."],
      ["sports-mouthguards", "Sports Mouthguards", "Custom mouthguards to protect active kids and teens."],
    ],
  },
  {
    slug: "periodontal-services", title: "Periodontal Services",
    summary: "Healthy gums are the foundation of a healthy smile.",
    services: [
      ["scaling-root-planing", "Scaling & Root Planing", "Deep cleaning to treat and reverse early gum disease."],
    ],
  },
];

const clamp = (s) => (s.length > 160 ? s.slice(0, 157) + "..." : s);

let count = 0;
for (const cat of categories) {
  // category hub page
  const catMeta = clamp(`${cat.summary} Conservative, tooth-preserving ${cat.title.toLowerCase()} in Bellevue at Overlake Family Dentistry.`);
  write(`src/content/services/${cat.slug}.mdx`, `---
title: "${cat.title} in Bellevue, WA | Overlake Family Dentistry"
metaDescription: "${catMeta}"
keyword: "${cat.title.toLowerCase()} bellevue"
category: "${cat.title}"
categorySlug: "${cat.slug}"
isCategory: true
heading: "${cat.title}"
summary: "${cat.summary}"
faq: []
order: 0
---

${cat.summary} At Overlake Family Dentistry, we approach ${cat.title.toLowerCase()} the same way we approach everything — conservatively, honestly, and gently. *(Draft copy — Phase 5.)*
`);
  count++;

  cat.services.forEach(([slug, name, summary], i) => {
    const meta = clamp(`${summary} Conservative ${name.toLowerCase()} in Bellevue's Bel-Red corridor at Overlake Family Dentistry.`);
    write(`src/content/services/${cat.slug}/${slug}.mdx`, `---
title: "${name} in Bellevue, WA | Overlake Family Dentistry"
metaDescription: "${meta}"
keyword: "${name.toLowerCase()} bellevue"
category: "${cat.title}"
categorySlug: "${cat.slug}"
isCategory: false
heading: "${name}"
summary: "${summary}"
faq:
  - q: "Is ${name.toLowerCase()} right for me?"
    a: "During your visit we'll assess your needs honestly and recommend the most conservative option that's right for you. Draft answer — Phase 5."
order: ${i + 1}
---

${summary}

*(Draft copy — full content and provider review in Phase 5/6.)*
`);
    count++;
  });
}

// Locations
const locs = [
  ["bellevue", "Bellevue", "Serving families across Bellevue and the Bel-Red corridor for over 30 years.", "We're located on NE Bel-Red Rd. at 148th Ave NE in Forest Office Park, minutes from Downtown Bellevue with free building parking."],
  ["redmond", "Redmond", "Convenient, conservative dental care for Redmond and Overlake families and Microsoft-area professionals.", "A short drive west on NE Bel-Red Rd. from the Overlake/Microsoft campus area — easy access with free parking."],
  ["kirkland", "Kirkland", "Trusted family dentistry for Kirkland, Rose Hill, and South Kirkland residents.", "Easily reached via 148th Ave NE and NE Bel-Red Rd., just south of Kirkland with free building parking."],
  ["sammamish", "Sammamish", "Comprehensive, gentle dental care for Sammamish and Plateau families.", "A convenient drive via I-90 or SR-520 to our Bel-Red location, with free dedicated parking."],
];
for (const [slug, suburb, summary, directions] of locs) {
  const meta = clamp(`Dentist in ${suburb}, WA. Conservative, tooth-preserving family dentistry at Overlake Family Dentistry — trusted for 25+ years. Call (425) 883-3040.`);
  write(`src/content/locations/${slug}.mdx`, `---
title: "Dentist in ${suburb}, WA | Overlake Family Dentistry"
metaDescription: "${meta}"
keyword: "dentist ${suburb.toLowerCase()}"
suburb: "${suburb}"
heading: "Your ${suburb} Family Dentist"
summary: "${summary}"
directions: "${directions}"
faq:
  - q: "How far is Overlake Family Dentistry from ${suburb}?"
    a: "${directions}"
---

${summary}

*(Draft copy — localized detail and patient stories added in Phase 5.)*
`);
  count++;
}

// Blog seeds
const posts = [
  ["what-is-conservative-dentistry", "What Is Conservative Dentistry — And Why It Matters", "Conservative dentistry means preserving as much of your natural tooth as possible. Here's what that looks like in practice."],
  ["choosing-a-family-dentist-bellevue", "How to Choose a Family Dentist in Bellevue", "Moving to the Eastside? Here's what to look for in a dentist your whole family can trust for years."],
  ["preventive-care-saves-teeth", "How Preventive Care Saves Teeth (and Money)", "Regular exams and cleanings catch small problems before they become big ones. Here's why prevention pays off."],
];
posts.forEach(([slug, heading, excerpt], i) => {
  const meta = clamp(`${excerpt} From the team at Overlake Family Dentistry in Bellevue.`);
  write(`src/content/blog/${slug}.mdx`, `---
title: "${heading} | Overlake Family Dentistry"
metaDescription: "${meta}"
keyword: "${slug.replace(/-/g, " ")}"
heading: "${heading}"
date: "2026-09-0${i + 1}"
excerpt: "${excerpt}"
---

${excerpt}

*(Draft article — full content in Phase 5.)*
`);
  count++;
});

console.log(`Generated ${count} content files.`);
