import dentistVisit from "../assets/dentist-visit.jpg";
import family from "../assets/family.jpg";
import childBrushing from "../assets/services/preventative-dentistry.jpg";
import smilingPatient from "../assets/smile.jpg";
import holidaySmile from "../assets/campaign/holiday-smile.jpg";

// Hero image per blog post, keyed by post slug.
export const blogImages: Record<string, { src: ImageMetadata; alt: string }> = {
  "what-is-conservative-dentistry": { src: dentistVisit, alt: "A smiling patient talking with her dentist during an exam" },
  "choosing-a-family-dentist-bellevue": { src: family, alt: "A smiling family of four" },
  "invisalign-vs-braces": { src: smilingPatient, alt: "A smiling patient in the dental chair" },
  "holiday-dental-tips": { src: holidaySmile, alt: "A woman with a bright smile in a cozy winter sweater" },
  "preventive-care-saves-teeth": { src: childBrushing, alt: "A young girl smiling while brushing her teeth" },
};
