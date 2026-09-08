# Session Handoff — Overlake Family Dentistry Website

**Last updated:** 2026-09-05
**Repo:** https://github.com/jskalra/Overlakefamilydentistry
**Live:** https://overlakefamilydentistry.com (Vercel, auto-deploys on push to `main`)

> Resume from any machine: `git clone` this repo, `cd Overlakefamilydentistry`, `npm install`,
> then open Claude Code in the folder and say: *"Read SESSION.md and SPEC.md and let's continue."*

---

## What this is
Marketing website for **Overlake Family Dentistry** (Bellevue, WA) — rebrand of the practice
formerly known as Dr. Brian Brooks, DDS. Core USP: **conservative, tooth-preserving care**,
multi-decade patient loyalty, experienced team. Full spec in **SPEC.md**.

## Stack
Astro 7 (static) + Tailwind v4 + React islands + MDX. Hosted on **Vercel**, domain via
**Namecheap** DNS. ~48 pages. Design: mysmile.ca-inspired (Playfair headings + Inter body;
navy/slate/sage/cream tokens in `src/styles/global.css`).

## Commands
- `npm run dev` — local dev (localhost:4321)
- `npm run build` — production build
- `npm run check` — astro check + build (quality gate)

## Where things live
- `src/data/site.ts` — NAP, hours, nav, doctors (bios/credentials/imageKey), service categories, service areas, Google profile URL
- `src/data/reviews.ts` — Google reviews (single edit point; `isPlaceholder=false`, real reviews in)
- `src/content/services/` — 6 category + 21 detail pages (MDX). **Detail pages have thin draft copy — NOT final.**
- `src/content/locations/` — 4 suburb pages (Bellevue, Redmond, Kirkland, Sammamish) — real unique copy
- `src/components/` — Header (nav + heritage banner + tagline), Footer, Hero, ReviewCarousel, CookieBanner, ContactForm, Analytics
- `src/pages/` — routes; `doctors.astro` (Kalra listed first, w/ Columbia + UW logos), contact, about, team, reviews, blog, system pages
- `src/lib/schema.ts` — JSON-LD (LocalBusiness/Dentist, FAQ, breadcrumb)
- `astro.config.mjs` + `vercel.json` — 301 redirect map (legacy drbrianbrooks.com paths → new)

## Env vars (set in Vercel → Settings → Environment Variables; see .env.example)
- `PUBLIC_WEB3FORMS_KEY` — contact form (already hardcoded fallback `45cbc7e7-...`; form sends to info@drbrianbrooks.com)
- `PUBLIC_GTM_ID` — Google Tag Manager (consent-gated). **Live via hardcoded fallback `GTM-M6XQFBJR`** in `Analytics.astro` (no env var needed). Preferred over GA4-direct.
- `PUBLIC_GA_ID` — GA4 direct (legacy fallback, only used if GTM id blank). Not set.

## Analytics / Ads (Google) — setup state
- **GTM container:** `GTM-M6XQFBJR` — loaded consent-gated (hard gate: nothing loads until cookie-banner Accept; Consent Mode v2 denied→granted). Owner Google acct: hiravneet@gmail.com.
- **GA4 property (new site):** Measurement ID `G-4CNJER32XH`, stream "Overlake Family Dentistry" (fix typo "…dentisyry" in GA4 Admin → Data streams if not done). Legacy site has separate property `G-61CL1HFCYV` — do NOT mix; leave as historical archive.
- **GTM tags (published v3):** `GA4 - Google Tag-New` (pageview, All Pages) · `GA4 Event - Contact Form` (event `contact_form_submit`, trigger `CE - contact_form_submit`) · `GA4 Event - Phone Click` (event `call_click`, trigger `CE - call_click`). Site pushes these + `appointment_cta_click`/`directions_click` to dataLayer (see `src/components/Analytics.astro`).
- **Verified working:** call_click + contact_form_submit confirmed in GA4 Realtime (tested on mobile). Consent Accept required or nothing fires.
- **⬜ NEXT (blocked on GA4's ~24h data lag):** In GA4 Admin → Events → Recent events, **star** `call_click` and `contact_form_submit` to mark as key events (this GA4 UI has no "create key event by name" option, so must wait for them to list). Then in Google Ads → conversion setup → "Select events" → pick both → create conversions → set **Contact Form Submit = Primary**, **Phone Click = Secondary**. (Decision: phone click is Secondary since a click ≠ answered call; consider Google Ads call reporting w/ forwarding number later for true call conversions.)

## Phase status (see SPEC.md §14 + phase gates in §11)
- ✅ 1 Scaffold · 2 Design system · 3 Core components · 4 Page structure · 5 Content + review-doc · 7 SEO/schema · 8 QA
- ✅ Deployed live on Vercel + custom domain (SSL auto-issued)
- ⬜ **Phase 6 — clinical/claims review**: dentist must sign off on all medical claims/bios before final launch
- 🟡 Quality: Lighthouse (mobile) 96/100/100/100 (Perf/A11y/BP/SEO); static audit 0 issues; 0 broken internal links

## Remaining work / TODO
1. **Flesh out the 21 service detail pages** — currently thin draft copy (`src/content/services/<category>/<slug>.mdx`). Each needs real what/who/expect + FAQ.
2. **Phase 6 clinical sign-off** — dentist reviews bios + all service/medical claims.
3. **Google Search Console** — verify domain (TXT record already in Namecheap DNS), submit `https://overlakefamilydentistry.com/sitemap-index.xml`.
4. **GBP rename** — USER will do this themselves (rename existing profile, do NOT create new — preserves reviews).
5. **Analytics/Ads** — GTM + GA4 live (see "Analytics / Ads" section above). Remaining: star the 2 key events in GA4 (24h lag), then finish Google Ads conversions.
6. Optional: add exams-cleanings service image (only detail page without one); consider a UW wordmark to match Columbia logo style; real office/patient photography to replace stock service images.
7. Manual pre-launch: real cross-browser + phone tap-through, screen-reader pass.

## Key decisions made
- Suburbs: 4 Core Eastside only (Bellevue/Redmond/Kirkland/Sammamish).
- Tenure claim standardized to "30+ years"; address "14655 NE Bel-Red Rd., Bldg. F, Ste. 101".
- Reviews are REAL now (from Google); no fabricated content.
- Contact form: Web3Forms client-side submit → info@drbrianbrooks.com (no PHI; mailto fallback if key missing).
- Assets: originals in `assets/`, optimized copies used via Astro `<Image>` in `src/assets/`.
- `SPEC old.md` is a stale v1.0 backup — can be deleted.
