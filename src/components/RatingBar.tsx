import React from "react";
import { Star } from "lucide-react";

// The slim rating summary bar used on /testimonials.

export interface RatingBarProps {
  stars?: number;
  summary?: string;
  facts?: string[];
}

export const RATING_BAR_DEFAULTS = {
  stars: 5,
  summary: "4.9 / 5.0 Average Client Satisfaction",
};

export const DEFAULT_RATING_FACTS = [
  "100+ Spaces Delivered",
  "100% On-Ground Site Supervision",
];

export default function RatingBar({
  stars = RATING_BAR_DEFAULTS.stars,
  summary = RATING_BAR_DEFAULTS.summary,
  facts = DEFAULT_RATING_FACTS,
}: RatingBarProps) {
  return (
    <section className="py-8 px-6 sm:px-12 md:px-16 bg-[#f3efea] text-[#18181b] border-b border-black/10">
      <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-6 text-xs sm:text-sm">
        <div className="flex items-center gap-3">
          <div className="flex text-amber-500">
            {[...Array(stars)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <span className="font-semibold text-[#18181b]">{summary}</span>
        </div>
        <div className="flex items-center gap-6 text-[#6b6559] font-medium">
          {facts.map((f, i) => (
            <React.Fragment key={i}>
              {i > 0 ? <span>•</span> : null}
              <span>{f}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
