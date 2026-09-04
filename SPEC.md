# Overlake Family Dentistry — Website Spec

**Version:** 1.2 · **Date:** 2026-09-04 · **Status:** Active Draft
**Authoritative source of truth. Do not edit in parallel — supersedes all prior versions.**

---

## 1. Overview

New marketing website for **Overlake Family Dentistry** (DBA), replacing the prior site
(`drbrianbrooks.com`). The site converts local Eastside searchers into booked patients,
establishes Google Ads / Local Services Ads (LSA) verifiability, and reinforces the
practice's identity: a trusted, conservative dental home that has cared for the same
families for decades.

- **Practice Name (DBA):** Overlake Family Dentistry
- **Heritage reference:** Practice of Brian D. Brooks, DDS
- **Address:** 14655 Bel-Red Road, Bldg. F, Ste. 101, Bellevue, WA 98007
- **Phone:** (425) 883-3040
- **Primary domain:** `overlakefamilydentistry.com`
- **Prior site (redirect source):** https://drbrianbrooks.com/
- **Region:** Bellevue / Bel-Red corridor, Eastside WA

### Design & benchmark references
| Purpose | Reference |
|---|---|
| SEO / ranking benchmark | https://www.bellevuefamilydentist.com/ |
| Look & feel — clean, warm, modern | https://www.hellotend.com/site/home |
| Look & feel — friendly, bold | https://www.longobraces.com/ |
| Look & feel — calm, premium, trustworthy | https://mysmile.ca/ |

---

## 2. Core positioning & USP

Four pillars — every page ladders up to at least one:

1. **Conservative, tooth-preserving dentistry (core USP):** minimal-prep restorations,
   honest second opinions, zero high-pressure sales or unnecessary upsells. Preserve
   natural tooth structure whenever possible.
2. **Multi-decade patient loyalty:** families who have trusted the practice 20–30+ years;
   multi-generational care (grandparents → grandkids in the same chair).
3. **Experienced, long-tenured team:** familiar faces, low turnover, gentle expertise.
4. **Comprehensive in-house care:** full breadth of general, restorative, preventive care
   under one roof in the Bel-Red corridor.

### Target audiences
1. **Families / multi-generational** (primary) — reinforce loyalty + conservative care.
2. **New local movers** — Eastside searchers new to the area; SEO/LSA acquisition.

### Heritage & transition banner (mandatory)
To preserve 20+ years of review equity and prevent confusion among returning patients, a
visible transition callout appears in the header/hero and footer:
> *"Overlake Family Dentistry — Continuing 25+ Years of Conservative, Patient-First Care
> in Bellevue (Formerly the Practice of Dr. Brian Brooks)."*

---

## 3. Tech stack & hosting

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Astro** | Content-first, ~zero JS by default → top Core Web Vitals & SEO |
| Styling | **Tailwind CSS** | Utility-first; consistent design tokens |
| Interactive bits | **React islands** (`@astrojs/react`) | Only where needed (review carousel, mobile nav, cookie banner) |
| Hosting | **Vercel** | Git-push deploys, global CDN, auto HTTPS |
| Domain | **GoDaddy** → Vercel | `overlakefamilydentistry.com` |
| Content | Markdown / MDX via Astro Content Collections | Services, locations, blog authored as content files |
| Forms | Serverless function (Vercel) + email (Resend/SendGrid) | **No PHI** collected on-site — see §7 |
| Reviews | Google Reviews (build-time cached fetch preferred) | §6 |
| Analytics | GA4 + Google Search Console + Vercel Web Vitals | Consent-gated — see §9 |

> **HIPAA note:** the marketing site stores no protected health info (PHI). No online
> intake/medical questionnaires at launch. Future booking/intake routes through a
> HIPAA-compliant third party (NexHealth, LocalMed) with a signed BAA — never the host.

---

## 4. Launch scope & sitemap

**Total launch pages: ~43** = 8 core + 6 service category + 21 service detail + 4 suburb
+ 4 system pages (blog posts on top).

**In scope v1:** marketing pages, blog engine, Google reviews, contact form (non-PHI) +
click-to-call, full on-page/local SEO + schema, LSA alignment, consent management.
**Out of scope v1 (phase 2):** online booking/scheduling, online intake forms (PDF
downloads at launch), patient portal/logins.

### Core pages (8)
```
/                Home (conservative philosophy + transition banner)
/about           About — history, heritage, philosophy
/team            Meet the team — single page, group photo + bios, tenure highlighted
/services        Services hub → 6 categories
/new-patients    New patient info, what to expect, policies, PDF forms
/reviews         Testimonials + verified Google reviews
/blog            Article index
/contact         Contact, hours, map, Bel-Red directions & parking
```

### Service pages — 6 categories + 21 detail (27 total)
Each treatment = keyword-targeted, individually indexable page (FAQ + schema). MDX in
`src/content/services/` with frontmatter (title, category, keyword, meta, image, FAQ).
```
/services/general-dentistry           → exams-cleanings, nightguards, tmj-treatment
/services/cosmetic-dentistry          → teeth-whitening, veneers, bonding, inlays-onlays, porcelain-crowns
/services/restorative-dentistry       → dental-implants, bridges, dentures, denture-partials, root-canals, extractions
/services/orthodontic-services        → invisalign, invisalign-for-teens
/services/pediatric-dentistry         → preventative-dentistry, cavities-fillings, sealants, sports-mouthguards
/services/periodontal-services        → scaling-root-planing
```

### Location / suburb pages — 4 (Core Eastside)
Strictly 4 high-ROI communities with **unique, localized** content (landmarks, commute
routes via Bel-Red Rd / I-405, neighborhood directions) — no doorway/duplicate text.
```
/dentist/bellevue     Bellevue & Bel-Red corridor (core catchment)
/dentist/redmond      Redmond & Overlake / Microsoft campus area
/dentist/kirkland     Kirkland, Rose Hill & South Kirkland
/dentist/sammamish    Sammamish & the Plateau
```

### System pages (4)
```
/404   /privacy-policy   /cookie-policy   /accessibility (statement)
```

### Home page structure
- **Top notice bar:** transition banner (§2).
- **Hero:** warm team photo, headline (*"Gentle, Conservative Dentistry in Bellevue"*),
  CTAs `[Call (425) 883-3040]` + `[Request an Appointment]`.
- **Conservative-dentistry pillar:** minimal intervention, tooth preservation, honest
  second opinions.
- **Trust bar:** 25+ years local heritage | Google rating | free dedicated building parking.
- **Service grid**, **"the decades" story teaser → About**, **featured reviews**,
  **meet-the-team teaser**, **new-patient welcome + insurance note**.
- **Location & access:** embedded map, Bel-Red access between Downtown Bellevue & Redmond.

---

## 5. Reviews integration

- Pull Google Business Profile reviews (Places API or Elfsight/Trustindex; **build-time
  cached fetch preferred** for performance).
- Display star rating, name, snippet, date; link to Google profile.
- Curated long-form testimonials (with permission) highlighted separately — prioritize
  multi-decade patient stories.
- **No fake/incentivized reviews** (LSA + FTC violation).

---

## 6. Contact form (non-PHI)

- Fields: name, email, phone, preferred contact method, message. **No medical/health fields.**
- Anti-spam: honeypot + rate limit (and/or hCaptcha).
- Serverless function → email to practice (Resend/SendGrid); verify SPF/DKIM for deliverability.
- Disclaimer: "Do not include medical or personal health information."

---

## 7. SEO requirements (benchmark: bellevuefamilydentist.com)

**Technical:** static HTML, Core Web Vitals (LCP < 2.5s, CLS < 0.1, good INP); semantic
HTML, one H1/page; `sitemap.xml` + `robots.txt`; canonical URLs, descriptive slugs, no
orphan pages; mobile-first; optimized images (Astro `<Image>`, WebP/AVIF, image weight budget).

**On-page:** unique title + meta description/page; Open Graph + Twitter cards;
keyword-targeted service & location pages ("family dentist Bellevue", "dentist Bel-Red").

**Local SEO / structured data (JSON-LD):** `Dentist`/`LocalBusiness`,
`MedicalOrganization`, `BreadcrumbList`, `FAQPage` (service/location), `Review`/
`AggregateRating`, `Article` (blog). NAP consistent site-wide + in schema. GBP alignment;
embedded map; location signals in copy/titles/footer.

**Content:** blog for ongoing keyword coverage; internal linking services ↔ blog ↔ locations ↔ contact.

---

## 8. LSA & Google Ads compliance

**Dashboard / verification (client action):** Google Screened background check, WA dental
license verification, liability insurance proof; GBP profile matching NAP; define service
areas matching the 4 suburb pages; route Google reviews; set hours/services/budget.

**Website requirements (build scope):**
- **NAP consistency** — identical Name / Address (14655 Bel-Red Road, Bldg. F, Ste. 101) /
  Phone ((425) 883-3040) across code, schema, GBP, LSA docs. Single source in `src/data/site`.
- **DBA verification** — license + insurance list *Overlake Family Dentistry* as active DBA.
- **No doorway pages** — 4 location pages carry genuinely unique local content.
- **Trust & credentials** — visible license info, credentials, years in practice;
  "Google Screened" badge slot once approved.
- **Real reviews** surfaced site-wide (§5); prominent click-to-call + low-friction CTA on
  every page (LSA sends call/message leads); fast, mobile-first, accessible.
- **Honest, non-deceptive content** — truthful claims (LSA suspends for misrepresentation).

> LSA ad placement is a Google ad unit, not site code. The site's job: make the practice
> verifiable, consistent, trustworthy, and fast so LSA approval holds and leads convert.

---

## 9. Compliance & legal (CRITICAL)

### 9a. ADA / accessibility (Title III)
- Dental practices are active targets for ADA website-accessibility litigation. Treat
  **WCAG 2.1 AA as a legal compliance requirement**, not just a quality goal.
- `/accessibility` statement page with contact method for accessibility issues.
- Automated (axe/pa11y) + manual keyboard/screen-reader testing before launch (§11).
- Named owner accountable for ongoing accessibility as content changes.

### 9b. Washington My Health My Data Act (MHMDA) + privacy
- WA's MHMDA (2024) governs "consumer health data," broadly defined, and reaches website
  trackers/pixels for health-adjacent businesses. **Requires legal review before enabling
  any ad/analytics pixels.**
- **Consent management:** cookie/consent banner (opt-in) gating GA4 and any ad pixels;
  no non-essential trackers fire pre-consent. Honor Global Privacy Control.
- **Privacy policy** covering data collected, trackers, third parties, and a distinct
  **Consumer Health Data Privacy Policy** if MHMDA applies (per legal counsel).
- Cookie policy page enumerating cookies/trackers and purposes.
- Form data: TLS in transit; no PHI stored; documented retention for contact submissions.

### 9c. Rebrand migration & SEO preservation (CRITICAL — highest risk)
Changing both domain and brand name is the single biggest ranking risk. Plan:
- **Google Business Profile: RENAME the existing profile — never create a new one**
  (recreating forfeits 20+ years of reviews/ranking). Update name/URL, keep the listing ID.
- **301 redirect map**: every old `drbrianbrooks.com` URL → its new equivalent, 1:1 where
  possible (see §12 content migration). Keep `drbrianbrooks.com` registered and redirecting.
- Preserve inbound backlinks; request updates from key referrers/directories.
- Search Console: verify both domains; submit new sitemap; use Change of Address if same entity.
- NAP citation cleanup across directories (Yelp, Healthgrades, insurance directories).
- Post-launch rank/traffic monitoring vs. pre-launch baseline.

### 9d. Conversion & call tracking
- Define conversions: phone calls, form submits, appointment-request clicks, directions clicks.
- **Call tracking**: dynamic number insertion (DNI) that preserves NAP consistency, or a
  consistent tracked number matching GBP — decide with SEO/LSA constraints in mind.
- GA4 events for each conversion; Google Ads tag + conversion import for LSA/PPC; UTM
  conventions for campaigns. All analytics consent-gated per §9b.

---

## 10. Design direction

- **Tone:** warm, trustworthy, established-but-modern — Tend's airiness + mysmile's calm;
  avoid clinical/cold. Emphasize gentle, conservative, no-pressure care.
- **Color:** soft welcoming palette (from brand assets) — calm blue/teal or warm neutral
  base + friendly accent. Define Tailwind tokens.
- **Typography:** humanist sans body; optional warmer display face for headings; large, readable.
- **Imagery:** real team/office/patient photos > stock (authenticity supports USP). See asset gaps in §14.
- **Layout:** generous whitespace, rounded cards, clear CTAs, sticky click-to-call on mobile.
- **Accessibility:** WCAG 2.1 AA (see §9a).

---

## 11. Quality checks & local testing

Runs locally before shipping; same checks in CI on each push (Vercel preview per branch).

| Command | Purpose |
|---|---|
| `npm run dev` | Live dev server `localhost:4321`, hot reload |
| `npm run build` | Production build (fails on broken links, bad imports, schema errors) |
| `npm run preview` | Serves built output — exact production behavior |
| `npm run check` | Runs all quality gates below |

**Automated gates:** `astro check` (types/content-schema); ESLint + Prettier; link checker
(linkinator); accessibility scan (axe/pa11y, WCAG AA); **Lighthouse CI** (fail if
Performance < 90 or SEO < 100); HTML validation; JSON-LD schema validation (Rich Results /
`schema-dts`); Content Collections enforce required SEO frontmatter (missing → build fails).

**Manual pre-launch checklist:** cross-browser (Chrome/Safari/Firefox/Edge) + real mobile;
keyboard + screen-reader pass (§9a); every CTA/phone/form tested + email delivery
confirmed; NAP identical across header/footer/contact/schema/GBP; all pages render with
correct titles/meta; 404 + 301 redirects verified; consent banner blocks pre-consent
trackers; staging `noindex` removed; Search Console verified + sitemap submitted; GA4/Ads
receiving data.

**Setup:** Node LTS + npm; `git clone` → `npm install` → `npm run dev`; husky + lint-staged
pre-commit hook (lint/format/type-check); CI (GitHub Actions/Vercel) runs `npm run check` +
Lighthouse CI per PR with a preview URL before merge to production.

**Deployment path:** code lives in a **GitHub repo** connected to Vercel (auto-deploy +
per-branch preview URLs + rollbacks). Repo initialized locally; GitHub + Vercel connection
is a later non-blocking step. (CLI-only `vercel deploy` is possible but loses previews/CI.)

### Phase gates — every phase ends green & running before proceeding
| # | Phase | Test run (output shown) | Client verifies |
|---|---|---|---|
| 1 | Scaffold | `npm install` + `npm run build` (exit 0) + `npm run dev` boots | `localhost:4321` loads |
| 2 | Design system | `npm run build` + `/styleguide` page renders tokens/fonts | Colors + fonts correct |
| 3 | Core components | `npm run build` + `npm run check` (lint + a11y) | Hero/header banner/footer render |
| 4 | Page structure | `npm run build` + link checker (no 404s) + sitemap lists ~43 URLs | Nav → every page opens |
| 5 | Copy + review-doc | Content-schema check + review-doc report | Copy reads well |
| 6 | Clinical review | — | Dentist signs off on claims |
| 7 | SEO + compliance | Lighthouse CI (SEO=100, Perf≥90) + schema + a11y green | Consent banner + privacy pages |
| 8 | Pre-launch QA | Full `npm run check` green + cross-browser screenshots | Final click-through |
| 9 | Launch | Live URL 200s + Search Console/GA4 receiving data | Site live on domain |

**Rule:** a failing gate blocks the next phase — fixed before advancing. After each phase
the client gets a running `npm run dev` (or Vercel preview URL) to click through.

---

## 12. Content migration & interactive content build

### Migration
- Audit `drbrianbrooks.com`: inventory services, bios, hours, insurance list, existing copy.
- Build the **301 redirect map** (§9c) as a tracked deliverable.
- Keep factual details (services, credentials, hours, insurance); rewrite around the four USP pillars.

### Interactive content build (client-collaborative)
Rather than dumping placeholder copy, page content is produced through a **guided,
page-by-page interactive workflow**:
1. **Intake per page/template** — I prompt with targeted questions (service specifics,
   local details for each suburb, patient stories, differentiators).
2. **Draft** — I generate copy in the MDX frontmatter/body structure, on-brand and
   SEO-targeted (keyword, meta, FAQ).
3. **Review loop** — you edit/approve inline; the build's content-schema check enforces
   required fields so no page ships missing SEO metadata.
4. **Provider clinical review** — all dental/medical claims reviewed and approved by the
   dentist before publish (accuracy + LSA honesty requirement).
5. Repeat per service (21), suburb (4), and blog seed (3–5).

---

## 13. Project structure (proposed)

```
/
├── astro.config.mjs
├── tailwind.config.mjs
├── src/
│   ├── layouts/          # Base, Page, Article
│   ├── components/       # Header, Footer, Hero, ServiceCard, ReviewCarousel, CTA, SEO, CookieBanner
│   ├── pages/            # Routes per §4
│   ├── content/
│   │   ├── services/     # MDX per service
│   │   ├── locations/    # MDX per suburb
│   │   └── blog/         # MDX per article
│   ├── data/             # site.ts: NAP (single source), hours, insurance, socials
│   └── styles/
├── public/               # images, favicons, robots.txt, PDF forms
└── SPEC.md
```

---

## 14. Milestones

1. **Setup** — Astro + Tailwind + Vercel + domain + integrations (sitemap, react, image).
2. **Design system** — tokens, layout, core components (needs brand assets first).
3. **Core pages** — Home, About, Team, Contact, New Patients (8 core).
4. **Services** — 6 category hubs + 21 detail pages + FAQ/schema (27 pages).
5. **Locations + Blog + Reviews** — 4 suburb pages, content collections, review integration.
6. **Compliance** — consent banner, privacy/cookie/accessibility pages, MHMDA legal review, ADA pass.
7. **SEO + migration** — schema, meta, sitemap, 301 map, GBP rename, Search Console, conversion tracking.
8. **Content build** — interactive per-page copy (§12) + provider review, real assets.
9. **QA & launch** — a11y, Web Vitals, cross-device, redirect verification, DNS cutover, analytics live.

---

## 15. Success metrics (KPIs)

Baseline captured pre-launch; reviewed monthly post-launch.
- New-patient calls/mo and form submissions/mo (vs. baseline).
- LSA/PPC: leads, cost per lead, Google Screened status.
- Organic: rankings for target keywords, GBP views/calls/direction requests.
- Site: Core Web Vitals in field data, conversion rate, bounce.

---

## 16. Open items / needs from client

- [ ] Confirm domain purchase + GoDaddy/DNS access; confirm `drbrianbrooks.com` control (for redirects).
- [ ] Confirm Overlake Family Dentistry is the **same legal entity/GBP listing** as Dr. Brooks (rename, not new).
- [ ] Brand assets: **new logo** (current is old Brooks brand), colors, fonts, real team/office photos.
- [ ] Individual staff names + tenure (for team page) — group photo already captured.
- [ ] Insurance accepted list + financing details (structured data source).
- [ ] Year established + trust-bar stats (families served, avg. tenure).
- [ ] GBP access (reviews + rename + verification).
- [ ] Signed testimonials, ideally multi-decade patients; per-suburb local details.
- [ ] New-patient form PDFs.
- [ ] **LSA:** WA dental license #, liability insurance proof, owner info (Google Screened).
- [ ] **Legal review** for MHMDA / consumer-health-data privacy policy + consent (§9b).
- [ ] Multilingual? (Eastside has significant Chinese/Spanish/Russian populations — decide yes/no.)
- [ ] Phase-2 booking: confirm practice management system (Dentrix/Eaglesoft/Open Dental) for future integration.
