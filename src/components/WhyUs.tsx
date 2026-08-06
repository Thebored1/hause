"use client";

import React from "react";

const REASONS = [
  {
    title: "Single point of responsibility",
    body: "One team for design and execution, so nothing gets lost between the architect, contractor and carpenter.",
  },
  {
    title: "Transparent, BOQ-based costing",
    body: "You see exactly what you're paying for, itemised against a detailed Bill of Quantities, before work begins.",
  },
  {
    title: "On-time delivery discipline",
    body: "Timelines are set upfront and tracked at every site visit.",
  },
  {
    title: "Pan-India execution network",
    body: "Delhi NCR site supervision, with the systems and vetted partners to run projects in other cities too.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-[#141618] text-white py-24 px-6 sm:px-12 md:px-16 border-t border-white/10">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-xs font-semibold tracking-[0.22em] text-white/45 uppercase block mb-5">
          More than a design studio — a space partner
        </span>
        <h3 className="m-0 text-2xl sm:text-3xl md:text-[32px] font-light tracking-[-0.03em] leading-[1.2] text-white max-w-[760px] text-balance">
          Anyone can make a space look good in a render. What&apos;s harder is delivering it on time, on budget, and exactly as designed. That&apos;s the gap Hause Interiors is built to close.
        </h3>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {REASONS.map((r, i) => (
            <div key={i} className="flex flex-col">
              <h4 className="m-0 text-base font-semibold text-white">
                {r.title}
              </h4>
              <p className="mt-3 text-sm text-white/50 leading-[1.7]">
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
