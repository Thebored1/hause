import React from "react";

// A three-up grid of step cards on obsidian, leading with a large numeral.
// Sibling of DarkCardGrid, which is four-up with a small mono number.

export interface DarkStep {
  step: string;
  title: string;
  desc: string;
}

export interface DarkStepCardsProps {
  eyebrow: string;
  title: string;
  intro: string;
  steps: DarkStep[];
}

export default function DarkStepCards({ eyebrow, title, intro, steps }: DarkStepCardsProps) {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#0c0d0e] border-t border-white/10">
      <div className="max-w-[1280px] mx-auto space-y-14">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.step}
              className="p-8 bg-[#141618] border border-white/10 rounded-2xl flex flex-col justify-between shadow-md"
            >
              <div>
                <span className="text-2xl font-light text-white/40 block mb-4 font-mono">
                  {step.step}
                </span>
                <h3 className="text-xl font-medium text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
