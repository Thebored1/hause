import React from "react";

// A grid of numbered stage cards. A stage flagged `wide` spans the full row —
// used to give an odd trailing card the whole width rather than leaving a gap.

export interface Stage {
  num: string;
  title: string;
  desc: string;
  wide?: boolean;
}

export interface StageGridProps {
  eyebrow: string;
  title: string;
  intro: string;
  stages: Stage[];
}

export default function StageGrid({ eyebrow, title, intro, stages }: StageGridProps) {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stages.map((s) => (
            <div
              key={s.num}
              className={`p-8 bg-white border border-black/10 rounded-2xl shadow-sm flex flex-col justify-between ${
                s.wide ? "md:col-span-2 lg:col-span-3" : ""
              }`}
            >
              <div>
                <span className="text-xs font-mono text-[#8a8578] block mb-4 font-semibold">{s.num}</span>
                <h3 className="text-lg font-medium text-[#18181b] mb-2">{s.title}</h3>
                <p className="text-xs sm:text-sm text-[#6b6559] font-normal leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
