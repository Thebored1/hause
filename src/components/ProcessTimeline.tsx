"use client";

import React from "react";

const STEPS = [
  {
    n: "01",
    title: "Discovery & site visit",
    body: "We visit the site (or review it remotely for pan-India projects), understand how the space will be used, and discuss budget, timelines and must-haves before any design work begins.",
  },
  {
    n: "02",
    title: "Design & 3D visualization",
    body: "Layouts, mood boards and detailed renders let you see and approve the design before execution starts.",
  },
  {
    n: "03",
    title: "Material selection & costing",
    body: "Every material and finish is selected and costed into a detailed Bill of Quantities, so you know exactly what you're paying for before work begins.",
  },
  {
    n: "04",
    title: "Execution & site management",
    body: "Civil, electrical, carpentry and finishing work carried out under continuous supervision, with scheduled progress updates.",
  },
  {
    n: "05",
    title: "Handover & styling",
    body: "A defect-check walkthrough followed by final styling — soft furnishings, decor and finishing touches — so the space is ready to move into, not just structurally complete.",
  },
];

export default function ProcessTimeline() {
  return (
    <section id="process" className="bg-[#0c0d0e] text-white py-28 px-6 sm:px-12 md:px-16">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <span className="text-xs font-semibold tracking-[0.22em] text-white/45 uppercase">
              Our Process
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-[44px] font-light tracking-[-0.03em] leading-[1.12] text-white max-w-[620px]">
              A process built for spaces that actually get delivered.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="m-0 text-sm sm:text-base text-white/55 leading-[1.7] max-w-[420px]">
              Interior projects go wrong when nobody owns the timeline. Ours is built so nothing falls through the cracks.
            </p>
          </div>
        </div>

        {/* Steps Timeline List */}
        <div className="flex flex-col">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-start py-8 border-t border-white/14 first:border-t hover:bg-white/[0.02] transition-colors"
            >
              <div className="md:col-span-1">
                <span className="text-xs text-white/40 tracking-[0.1em] font-mono pt-1.5 block">
                  {step.n}
                </span>
              </div>
              <div className="md:col-span-5">
                <h3 className="m-0 text-xl sm:text-2xl font-normal text-white tracking-[-0.02em]">
                  {step.title}
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="m-0 text-sm sm:text-base text-white/55 leading-[1.7]">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
