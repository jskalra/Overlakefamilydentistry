import dentistVisit from "../assets/dentist-visit.jpg";
import family from "../assets/family.jpg";
import childBrushing from "../assets/services/preventative-dentistry.jpg";

// Hero image per blog post, keyed by post slug.
export const blogImages: Record<string, { src: ImageMetadata; alt: string }> = {
  "what-is-conservative-dentistry": { src: dentistVisit, alt: "A smiling patient talking with her dentist during an exam" },
  "choosing-a-family-dentist-bellevue": { src: family, alt: "A smiling family of four" },
  "preventive-care-saves-teeth": { src: childBrushing, alt: "A young girl smiling while brushing her teeth" },
};
