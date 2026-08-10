import React from "react";

// The side-by-side comparison used on /why-hause-interiors: the traditional
// multi-vendor route against the Hause standard.

export interface ComparisonColumnsProps {
  eyebrow?: string;
  title?: string;
  negativeLabel?: string;
  negatives?: string[];
  positiveLabel?: string;
  positives?: string[];
}

export const DEFAULT_NEGATIVES = [
  "Designer hands off blueprints to third-party contractor with no supervision.",
  'Lump-sum estimates that balloon with 30-50% extra "variation" charges mid-project.',
  "Finger-pointing between carpenter, plumber, and electrician when measurements fail.",
  "Deadlines slipping months past handover with zero financial accountability.",
];

export const DEFAULT_POSITIVES = [
  "Single accountable team managing 3D design, civil work, carpentry, and styling.",
  "Itemised BOQ before signing with locked material pricing and zero hidden costs.",
  "Permanent on-site supervisors ensuring joinery matches 3D renders with mm precision.",
  "Contractual delivery milestones and weekly transparent progress reporting.",
];

export const COMPARISON_COLUMNS_DEFAULTS = {
  eyebrow: "The Difference",
  title: "Traditional Interior Contractors vs. Hause Interiors",
  negativeLabel: "Traditional Multi-Vendor Route",
  positiveLabel: "The Hause Interiors Standard",
};

export default function ComparisonColumns({
  eyebrow = COMPARISON_COLUMNS_DEFAULTS.eyebrow,
  title = COMPARISON_COLUMNS_DEFAULTS.title,
  negativeLabel = COMPARISON_COLUMNS_DEFAULTS.negativeLabel,
  negatives = DEFAULT_NEGATIVES,
  positiveLabel = COMPARISON_COLUMNS_DEFAULTS.positiveLabel,
  positives = DEFAULT_POSITIVES,
}: ComparisonColumnsProps) {
  return (
    <section className="py-28 px-6 sm:px-12 md:px-16 bg-[#f3efea] text-[#18181b] border-t border-black/10">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
            {eyebrow}
          </span>
          <h3 className="mt-3 text-3xl sm:text-4xl font-normal text-[#18181b] leading-tight">
            {title}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white border border-red-500/30 rounded-2xl space-y-4 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-red-600">
              {negativeLabel}
            </span>
            <ul className="space-y-3 text-xs sm:text-sm text-[#6b6559]">
              {negatives.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 bg-[#18181b] text-white border border-black/20 rounded-2xl space-y-4 shadow-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
              {positiveLabel}
            </span>
            <ul className="space-y-3 text-xs sm:text-sm text-white/90">
              {positives.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-white font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
