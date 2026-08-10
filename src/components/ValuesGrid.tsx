import React from "react";

// The four-up values grid used on /about.

export interface Value {
  title: string;
  desc: string;
}

export const DEFAULT_VALUES: Value[] = [
  {
    title: "Transparency First",
    desc: "Zero hidden markups. You see itemised costs, material brand grades, and milestone schedules before signing.",
  },
  {
    title: "Design Rigor",
    desc: "We balance timeless architectural aesthetics with practical daily usability tailored to your lifestyle.",
  },
  {
    title: "Reliability & Timelines",
    desc: "We commit to locked delivery milestones and back our timelines with daily on-ground project tracking.",
  },
  {
    title: "Client-First Collaboration",
    desc: "We don't impose cookie-cutter trends. Your functional priorities, habits, and tastes guide every decision.",
  },
];

export interface ValuesGridProps {
  eyebrow?: string;
  title?: string;
  values?: Value[];
}

export default function ValuesGrid({
  eyebrow = "What We Stand For",
  title = "Our Values",
  values = DEFAULT_VALUES,
}: ValuesGridProps) {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b] border-t border-black/10">
      <div className="max-w-[1280px] mx-auto space-y-14">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-normal tracking-tight text-[#18181b] leading-tight">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="p-7 bg-white border border-black/10 rounded-2xl shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-[#8a8578] block mb-4 font-semibold">0{idx + 1}</span>
                <h3 className="text-lg font-medium text-[#18181b] mb-2.5">{val.title}</h3>
                <p className="text-xs sm:text-sm text-[#6b6559] font-normal leading-relaxed">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
