import { useState } from "react";

export interface Review {
  name: string;
  text: string;
  years?: string;
}

export default function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [i, setI] = useState(0);
  if (!reviews.length) return null;
  const r = reviews[i];
  const go = (d: number) => setI((p) => (p + d + reviews.length) % reviews.length);

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="text-sage text-2xl">★★★★★</div>
      <blockquote className="mt-4 text-base md:text-lg font-heading text-navy leading-relaxed">
        “{r.text}”
      </blockquote>
      <div className="mt-4 text-slate text-sm">
        {r.name}{r.years ? ` · Patient for ${r.years}` : ""}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <button aria-label="Previous review" onClick={() => go(-1)} className="btn btn-secondary px-4 py-2">‹</button>
        <button aria-label="Next review" onClick={() => go(1)} className="btn btn-secondary px-4 py-2">›</button>
      </div>
    </div>
  );
}
