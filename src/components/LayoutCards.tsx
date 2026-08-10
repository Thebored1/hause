import React from "react";

// A four-up grid of numbered cards that each carry a "best for" qualifier.

export interface LayoutOption {
  name: string;
  bestFor: string;
  desc: string;
}

export interface LayoutCardsProps {
  eyebrow: string;
  title: string;
  intro: string;
  bestForLabel?: string;
  options: LayoutOption[];
}

export default function LayoutCards({
  eyebrow,
  title,
  intro,
  bestForLabel = "Best For:",
  options,
}: LayoutCardsProps) {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
      <div className="max-w-[1280px] mx-auto space-y-16">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[#18181b] leading-tight">
            {title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6b6559] font-normal leading-relaxed">
            {intro}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((k, idx) => (
            <div key={idx} className="p-8 bg-white border border-black/10 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#8a8578] block mb-4 font-semibold">0{idx + 1}</span>
                <h3 className="text-lg font-medium text-[#18181b] mb-1.5">{k.name}</h3>
                <span className="text-[11px] font-semibold text-[#8a8578] uppercase tracking-wider block mb-3">
                  {bestForLabel} {k.bestFor}
                </span>
                <p className="text-xs sm:text-sm text-[#6b6559] font-normal leading-relaxed">
                  {k.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
