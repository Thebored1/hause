import React from "react";

// A four-up grid of numbered cards on obsidian — the dark counterpart to
// LayoutCards, used where a section needs to break the light rhythm.

export interface DarkCard {
  title: string;
  desc: string;
}

export interface DarkCardGridProps {
  eyebrow: string;
  title: string;
  intro: string;
  cards: DarkCard[];
}

export default function DarkCardGrid({ eyebrow, title, intro, cards }: DarkCardGridProps) {
  return (
    <section className="py-28 px-6 sm:px-12 md:px-16 bg-[#0c0d0e] text-[#f3efea] border-t border-white/10">
      <div className="max-w-[1280px] mx-auto space-y-16">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-[0.22em] text-white/50 uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-medium tracking-tight text-white leading-tight">
            {title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60 font-light leading-relaxed">
            {intro}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((w, idx) => (
            <div key={idx} className="p-8 bg-[#141618] border border-white/10 rounded-2xl flex flex-col justify-between shadow-md">
              <div>
                <span className="text-xs font-mono text-white/30 block mb-4">0{idx + 1}</span>
                <h3 className="text-lg font-medium text-white mb-2.5">{w.title}</h3>
                <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                  {w.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
