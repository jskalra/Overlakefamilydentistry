# Overlake Family Dentistry — Website Spec

**Version:** 1.0 · **Date:** 2026-09-04 · **Status:** Draft

---

## 1. Overview

New marketing website for **Overlake Family Dentistry**, replacing the current site
(drbrianbrooks.com). The site's job is to convert local searchers into booked patients
and to reinforce the practice's core identity: a trusted, experienced team that has cared
for the same families for decades.

- **Practice name:** Overlake Family Dentistry
- **Prior site (reference / content source):** https://drbrianbrooks.com/
- **Region:** Bellevue / Overlake, WA area

### Design & benchmark references
| Purpose | Reference |
|---|---|
| SEO / ranking benchmark | https://www.bellevuefamilydentist.com/ |
| Look & feel — clean, warm, modern | https://www.hellotend.com/site/home |
| Look & feel — friendly, bold | https://www.longobraces.com/ |
| Look & feel — calm, premium, trustworthy | https://mysmile.ca/ |

---

## 2. Core positioning (USP)

The messaging pivots on three pillars — every page should ladder up to at least one:

1. **Multi-decade patient loyalty** — families who have trusted the practice for 20, 30+
   years; multi-generational (grandparents → grandkids in the same chair).
2. **Experienced, long-tenured team** — low turnover, familiar faces, deep expertise.
3. **Comprehensive dentistry, actually practiced** — real breadth of services delivered
   in-house, not just referred out.

**Tagline direction (draft options):**
- "Your family's dentist — for generations."
- "The same trusted faces, decade after decade."
- "Comprehensive dentistry. Familiar faces. Since [YEAR]."

### Target audiences
1. **Families / multi-generational** (primary) — reinforce the loyalty USP.
2. **New local movers** — people new to Overlake/Bellevue searching for a dentist;
   SEO-driven acquisition.

---

## 3. Tech stack & hosting

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Astro** | Content-first, ships ~zero JS by default → top Core Web Vitals & SEO |
| Styling | **Tailwind CSS** | Utility-first; consistent design tokens |
| Interactive bits | **React islands** (via `@astrojs/react`) | Only where needed (review carousel, mobile nav) |
| Hosting | **Vercel** | Git-push deploys, global CDN, auto HTTPS |
| Domain | **GoDaddy** (registration) → pointed at Vercel | Target: `overlakefamilydentistry.com` (confirm availability) |
| Content | Markdown / MDX via Astro Content Collections | Blog + service pages authored as content files |
| Forms | Contact form via serverless (Vercel function) + email (e.g. Resend) | **No PHI** collected on-site — see §7 |
| Reviews | Google reviews integration (see §6) | |
| Analytics | Google Analytics 4 + Google Search Console | Plus Vercel Analytics for Web Vitals |

> **HIPAA note:** The marketing site must not store protected health info (PHI). No online
> intake or medical questionnaires at launch. Any future booking/intake flows go through a
> HIPAA-compliant third party (NexHealth, LocalMed, etc.) with a signed BAA — never the
> Vercel host.

---

## 4. Launch scope (features)

**In scope for v1:**
- [x] Marketing pages (see §5 sitemap)
- [x] **Blog / articles** — SEO content engine (Astro Content Collections)
- [x] **Reviews integration** — display Google reviews + curated testimonials
- [x] Contact form (non-PHI) + click-to-call + map/directions
- [x] Full on-page SEO + local SEO + schema markup (§8)

**Explicitly out of scope for v1 (future phases):**
- [ ] Online booking / live scheduling (link out to phone/request form at launch)
- [ ] Online patient intake forms (offer downloadable PDFs instead)
- [ ] Patient portal / logins

---

## 5. Sitemap & page specs

**Launch page count: ~47 pages** = 8 core + 6 service category + 21 service detail +
10 suburb/location + 4 system pages (blog posts added on top). Adding the recommended
4 Core Eastside suburb pages → ~51.

### Core pages (8)
```
/                       Home
/about                  About the practice (the story / the decades)
/team                   Meet the team — single page, group photo + bios, tenure highlighted
/services               Services overview (hub → links to 6 categories)
/new-patients           New patient info + downloadable forms + what to expect
/reviews                Testimonials + Google reviews
/blog                   Article index
/contact                Contact, hours, map, directions, insurance/financing
```

### Service pages — 6 categories + 21 individual SEO landing pages
Each treatment gets its own keyword-targeted, individually indexable page (with FAQ +
schema). Category pages are hubs that link to their treatments.

```
/services/general-dentistry
    /services/general-dentistry/exams-cleanings
    /services/general-dentistry/nightguards
    /services/general-dentistry/tmj-treatment
/services/cosmetic-dentistry
    /services/cosmetic-dentistry/teeth-whitening
    /services/cosmetic-dentistry/veneers
    /services/cosmetic-dentistry/bonding
    /services/cosmetic-dentistry/inlays-onlays
    /services/cosmetic-dentistry/porcelain-crowns
/services/restorative-dentistry
    /services/restorative-dentistry/dental-implants
    /services/restorative-dentistry/bridges
    /services/restorative-dentistry/dentures
    /services/restorative-dentistry/denture-partials
    /services/restorative-dentistry/root-canals
    /services/restorative-dentistry/extractions
/services/orthodontic-services
    /services/orthodontic-services/invisalign
    /services/orthodontic-services/invisalign-for-teens
/services/pediatric-dentistry
    /services/pediatric-dentistry/preventative-dentistry
    /services/pediatric-dentistry/cavities-fillings
    /services/pediatric-dentistry/sealants
    /services/pediatric-dentistry/sports-mouthguards
/services/periodontal-services
    /services/periodontal-services/scaling-root-planing
```
> 6 category pages + 21 detail pages = **27 service pages**. All authored as MDX in
> `src/content/services/` with frontmatter (title, category, keyword, meta, image, FAQ).

### Blog
```
/blog/{slug}            Article (MDX). 0 at launch; seed 3–5 starter posts recommended.
```

### Location / suburb pages — 10 (local SEO + LSA service-area alignment)
One landing page per service area, targeting "dentist in {suburb}" style queries and
mirroring the LSA service-area list (§8b). Each page: localized H1, distance/directions
from that suburb, local landmarks/neighborhoods, services offered, suburb-specific
testimonials where available, NAP, map, `LocalBusiness` + `FAQPage` schema, and a CTA.
Content must be genuinely differentiated per suburb — **not** duplicate/spun text
(duplicate doorway pages violate Google policy and hurt both SEO and LSA standing).

```
/dentist/issaquah
/dentist/newcastle
/dentist/mercer-island
/dentist/bothell
/dentist/woodinville
/dentist/kenmore
/dentist/medina
/dentist/clyde-hill
/dentist/yarrow-point
/dentist/hunts-point
```
> **Recommended addition (not yet selected):** Core Eastside — Bellevue, Redmond,
> Kirkland, Sammamish. These are the closest, highest-search-volume areas and typically
> the highest-ROI local pages. Suggest adding these 4 (→ 14 suburb pages total).

### System pages (4)
```
/404                    Not-found page
/privacy-policy
/cookie-policy
/accessibility          Accessibility statement
```

### Home
- Hero: warm photo of team/office, tagline, primary CTA ("Request an Appointment" →
  contact/phone), secondary CTA ("Meet the Team").
- Trust bar: years in practice, # of families served, avg. patient tenure, Google rating.
- USP section: the three pillars (§2) with supporting imagery.
- Services snapshot: grid linking to top service pages.
- "The decades" story teaser → About.
- Featured reviews (Google) carousel.
- Meet-the-team teaser.
- New patient welcome + insurance/financing note.
- Location/hours + map + strong footer CTA.

### About
- Origin story, years established, philosophy of comprehensive care.
- Emphasis on continuity: same team, returning families, generational patients.
- Community/local ties (Bellevue/Overlake).

### Team
- Dentist(s) + hygienists + staff. **Tenure prominently displayed** ("With the practice
  since 19XX"). Photos, credentials, a personal line each.

### Services (hub + detail pages)
- Hub: categorized grid (General / Preventive, Cosmetic, Restorative, etc.).
- Each detail page = SEO landing page: H1 with keyword, what it is, who it's for, what to
  expect, FAQ, CTA. Individually indexable and schema-tagged.

### New Patients
- What to expect on first visit, downloadable intake PDFs, insurance accepted, financing,
  office policies, CTA to call/request.

### Reviews
- Google reviews feed + curated long-form testimonials (ideal: multi-decade patients).

### Blog
- SEO articles targeting local + dental-health keywords. Categories/tags, author, date,
  related posts, schema.

### Contact
- Address, map (directions link), phone (click-to-call), hours, contact form (non-PHI),
  parking/access notes, insurance & financing summary.

---

## 6. Reviews integration

- Pull Google Business Profile reviews (via Google Places API, or a service like
  Elfsight/Trustindex, or a periodic static fetch cached at build time — preferred for
  performance).
- Display: star rating, reviewer name, snippet, date; link to full Google profile.
- Curated testimonials (with permission) highlighted separately — prioritize long-tenure
  patient stories to reinforce the USP.

---

## 7. Contact form (non-PHI)

- Fields: name, email, phone, preferred contact method, message. **No medical/health
  fields.**
- Anti-spam: honeypot + rate limit (and/or hCaptcha).
- Submission via Vercel serverless function → email to practice (Resend/SendGrid).
- Clear disclaimer: "Do not include medical or personal health information."

---

## 8. SEO requirements (benchmark: bellevuefamilydentist.com)

**Technical**
- Server-rendered/static HTML, fast Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP good).
- Clean semantic HTML, one H1/page, logical heading hierarchy.
- `sitemap.xml` (Astro sitemap integration) + `robots.txt`.
- Canonical URLs, descriptive slugs, no orphan pages.
- Responsive/mobile-first; AA accessibility (contrast, alt text, focus states, ARIA).
- Optimized images (Astro `<Image>`, WebP/AVIF, lazy load).

**On-page**
- Unique title + meta description per page.
- Open Graph + Twitter cards.
- Keyword-targeted service & location pages (e.g. "family dentist Bellevue",
  "dentist Overlake WA").

**Local SEO**
- **Structured data (JSON-LD):** `Dentist` / `LocalBusiness`, `MedicalOrganization`,
  `BreadcrumbList`, `FAQPage` (service pages), `Review`/`AggregateRating`, `Article` (blog).
- NAP (Name, Address, Phone) consistent site-wide + in schema.
- Google Business Profile alignment; embedded map.
- Location signals in copy, titles, and footer.

**Content**
- Blog engine for ongoing keyword coverage.
- Internal linking between services ↔ blog ↔ contact.

**Measurement**
- GA4 + Google Search Console + Vercel Web Vitals. Track calls, form submits, directions.

---

## 8b. Google Local Services Ads (LSA) compliance

LSA for dentists (Google Screened) is administered mainly in the **LSA dashboard**, but
the website must align with and reinforce every LSA signal. Two parts: what happens in the
dashboard (client action) and what the site must guarantee (build scope).

### Dashboard / verification (client action — not code, but tracked here)
- Google Screened verification: business & owner **background check**, **license
  verification** (WA dental license), and **insurance/liability** proof.
- Business profile: legal name, address, phone consistent with the site (NAP).
- Define **service areas** — must match the suburb pages (§5) and site copy.
- Enable/route **Google reviews** (LSA rank is heavily review-driven).
- Set business hours, services offered, and budget/leads settings.

### Website requirements to support LSA (build scope)
- **NAP consistency** — identical Name, Address, Phone in header/footer, Contact page,
  schema, and Google Business Profile. Single source of truth in `src/data/site`.
- **Service-area coverage** — the 10 (→14) suburb pages match the LSA service areas.
- **Trust & credentials** — visible license info, credentials, years in practice,
  associations; a "Google Screened"/"Google Guaranteed" badge slot once approved.
- **Real, verifiable reviews** — Google reviews surfaced site-wide (§6); no fake/incentivized reviews (violation).
- **Clear services & contact path** — prominent phone (click-to-call), hours, and a
  low-friction contact/request CTA on every page (LSA sends call/message leads).
- **Fast, mobile-first, accessible** — LSA traffic is mobile-heavy; meets §8 Web Vitals + AA.
- **Legitimate business signals** — privacy policy, real address + embedded map, HTTPS,
  no misleading claims, no doorway/duplicate suburb pages.
- **Lead tracking** — call tracking + form-submit events (GA4) so LSA lead quality is measurable.
- **Honest, non-deceptive content** — claims about services/experience must be truthful
  (LSA suspends for misrepresentation).

> Note: LSA ad placement itself is not "coded" on the site — it's a Google ad unit. The
> site's job is to make the practice **verifiable, consistent, trustworthy, and fast** so
> LSA approval holds and lead conversion is high.

## 8c. Quality checks & local testing

Everything below runs on your machine before anything ships; the same checks run in CI on
each push (Vercel preview deploy per branch).

### Local development
| Command | What it does |
|---|---|
| `npm run dev` | Live dev server at `localhost:4321`, hot reload — build & preview as you edit |
| `npm run build` | Production build (catches broken links, bad imports, type errors) |
| `npm run preview` | Serves the built output locally — exact production behavior |

### Automated quality gates (`npm run check` runs all)
- **Astro type/diagnostics** — `astro check` (broken imports, content-collection schema errors).
- **Lint & format** — ESLint + Prettier (consistent code).
- **Link checker** — no broken internal/external links (e.g. `astro build` link
  integrity + a crawler like `linkinator` on the preview server).
- **Accessibility** — automated a11y scan (axe / pa11y) against key pages; target WCAG AA.
- **Lighthouse CI** — Performance / SEO / Best Practices / Accessibility budgets
  (fail build if Performance < 90 or SEO < 100). Enforces §8 Core Web Vitals.
- **HTML validation** — valid, semantic markup.
- **Structured-data validation** — JSON-LD checked against schema.org (Rich Results
  test / `schema-dts` types) so LSA/SEO markup is valid.
- **Content-schema validation** — Astro Content Collections enforce required frontmatter
  (title, meta description, keyword, image) on every service/location/blog file — a page
  missing SEO fields fails the build.

### Manual QA checklist (pre-launch)
- Cross-browser (Chrome, Safari, Firefox, Edge) + real mobile devices.
- Every CTA / phone link / form tested; form email delivery confirmed.
- NAP identical across header, footer, Contact, schema, Google Business Profile.
- All 47+ pages render, correct titles/meta, no orphan/duplicate content.
- 404, redirects (old→new URLs) verified.
- Google Search Console + GA4 receiving data post-launch.

### Suggested local setup
- Node LTS + npm. `git clone` → `npm install` → `npm run dev`.
- Pre-commit hook (husky + lint-staged) runs lint/format/type-check before each commit.
- CI (GitHub Actions or Vercel) runs `npm run check` + Lighthouse CI on every PR;
  Vercel posts a preview URL per branch for visual review before merge to production.

## 9. Design direction

- **Tone:** warm, trustworthy, established but modern — blend Tend's clean airiness with
  mysmile's premium calm; avoid clinical/cold.
- **Color:** soft, welcoming palette (to be set from brand assets) — likely a calm
  blue/teal or warm neutral base with a friendly accent. Define Tailwind design tokens.
- **Typography:** one friendly humanist sans for body; optional warmer display face for
  headings. Large, readable type.
- **Imagery:** real photos of the actual team, office, and (with consent) long-time
  patients > stock. Authenticity supports the USP.
- **Layout:** generous whitespace, rounded cards, clear CTAs, sticky click-to-call on
  mobile.
- **Accessibility:** WCAG 2.1 AA.

> **Image assets:** to be supplied by client (logo, team photos, office photos, brand
> colors/fonts if any). Placeholder assets used until provided.

---

## 10. Content migration

- Audit drbrianbrooks.com: inventory services, bios, hours, insurance list, existing copy.
- Rewrite/refresh copy around the three USP pillars; keep factual details (services,
  credentials, hours, insurance).
- Preserve/redirect any ranking URLs (301 map old → new paths).

---

## 11. Project structure (proposed)

```
/
├── astro.config.mjs
├── tailwind.config.mjs
├── src/
│   ├── layouts/          # Base, Page, Article layouts
│   ├── components/       # Header, Footer, Hero, ServiceCard, ReviewCarousel, CTA, SEO
│   ├── pages/            # Route files per §5 sitemap
│   ├── content/
│   │   ├── services/     # MDX per service
│   │   ├── locations/    # MDX per suburb (localized landing pages)
│   │   └── blog/         # MDX per article
│   ├── data/             # site config: NAP, hours, insurance, socials
│   └── styles/
├── public/               # images, favicons, robots.txt, downloadable forms (PDF)
└── SPEC.md
```

---

## 12. Milestones

1. **Setup** — Astro + Tailwind + Vercel + domain + integrations (sitemap, react, image).
2. **Design system** — tokens, layout, core components.
3. **Core pages** — Home, About, Team, Contact, New Patients (8 core).
4. **Services** — 6 category hubs + 21 detail pages + FAQ/schema (27 pages).
5. **Blog + Reviews** — content collections, review integration.
6. **SEO pass** — schema, meta, sitemap, Search Console, redirects.
7. **Content load** — migrate + rewrite copy, real assets.
8. **QA & launch** — a11y, Web Vitals, cross-device, DNS cutover, analytics live.

---

## 13. Open items / needs from client

- [ ] Confirm domain (`overlakefamilydentistry.com`?) and provide GoDaddy access.
- [ ] Brand assets: logo, colors, fonts (if any), team & office photos.
- [ ] Final service list + any pricing/financing/insurance details.
- [ ] Year established + headline stats (families served, avg. tenure) for trust bar.
- [ ] Google Business Profile access (reviews + verification).
- [ ] Signed testimonials, ideally from multi-decade patients.
- [ ] Downloadable new-patient form PDFs.
- [ ] **LSA:** WA dental license #, liability insurance proof, owner info for Google
      Screened background check (dashboard, client-side).
- [ ] Confirm final service-area/suburb list (currently 10; recommend adding Core
      Eastside 4 → 14).
- [ ] Per-suburb differentiators (local landmarks, patient stories) so location pages are
      unique, not duplicated.
