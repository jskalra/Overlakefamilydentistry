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

export const isPlaceholder = false; // set to false once real reviews are in

export const reviews: Review[] = [
  { name: "Elizabeth Kronoff", text: "Our family has been going to Dr. Brooks for over 10 years. The reception is always friendly, the hygienists always gentle and informative, the exams always thorough. As Dr. Kaur is stepping in, she has taken the time to get to know our family, remembering our histories and concerns, and offering extra support asking after my daughter while she's away at college. I have recommended this office to several colleagues and will continue to do so." },
  { name: "Marilee Hakkinen", text: "As a first time patient to see Dr. Kaur we were impressed with how thorough she was in dealing with Dave's dental and medical history and concerns. Dr. Kaur was committed to talking with his medical doctors to make sure her dental treatment plan would not conflict with any medical treatments. We loved being greeted by Kris at the front desk, who helped put us at ease, and meeting Kristie and Marta, who were also very professional and caring. We look forward to future appointments knowing the care we will receive." },
  { name: "Darrel Spaytho", text: "I’m in my 60s and have been seeing Brian D. Brooks, DDS for about 20 years. I have found him to be the most competent and ethical dentist I’ve ever had. Update (June 10, 2026): I recently visited the office for a cleaning and examination and was seen by Dr. Kaur, who will be taking over the practice from Dr. Brooks. She was professional, thorough, and easy to talk with. Based on my experience, I am confident the practice will continue to provide the high standard of care that I have come to expect over the past 20+ years, and I look forward to having Dr. Kaur as my dentist moving forward." },
  { name: "Chris Fellows", text: "Long time patient, always get the best care from super nice staff. We moved out of the area but still come back for all of our care. Couldn’t be happier." },
];
