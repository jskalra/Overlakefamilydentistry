// ============================================================================
//  REVIEWS — EDIT THIS FILE to add/update patient reviews (single source).
//  Used by the homepage and the /reviews page.
//
//  ⚠️ The entries below are ILLUSTRATIVE PLACEHOLDERS. Before launch, replace
//  them with REAL, permissioned Google reviews (FTC / Google LSA compliance —
//  no fabricated or incentivized reviews).
//
//  To add a real review, copy an object and fill it in:
//    { name: "First L.", years: "12 years", text: "Their exact words..." }
//  - name:  reviewer's name as shown on Google (or first name + last initial)
//  - years: optional — how long they've been a patient (omit if unknown)
//  - text:  the review text
// ============================================================================

export interface Review {
  name: string;
  text: string;
  years?: string;
}

export const isPlaceholder = true; // set to false once real reviews are in

export const reviews: Review[] = [
  { name: "Illustrative example", years: "sample", text: "Three generations of our family see this team. They never push treatment we don't need — that trust is why we've stayed for years." },
  { name: "Illustrative example", years: "sample", text: "Gentle, honest, and thorough. They took a conservative approach when another office pushed bigger treatment." },
  { name: "Illustrative example", years: "sample", text: "New to Bellevue and found a dental home. The same friendly faces every visit — you feel remembered." },
  { name: "Illustrative example", years: "sample", text: "The team has cared for our whole family for years. Honest advice every time." },
];
