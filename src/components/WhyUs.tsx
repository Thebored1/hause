"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    title: "Design with a business mindset",
    body: "Born from a digital studio built on measurable outcomes — clear scopes, realistic timelines, and practical budgets.",
  },
  {
    title: "On-ground site supervision",
    body: "Delhi NCR projects are personally supervised at every stage, from civil work to final styling.",
  },
  {
    title: "Pan-India delivery capability",
    body: "Structured remote design paired with vetted local partners, so the same accountability applies anywhere.",
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

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {REASONS.map((r, i) => (
            <div key={i} className="flex flex-col justify-between border-t border-white/10 pt-6">
              <div>
                <span className="text-[11px] font-mono text-white/30 block mb-3">0{i + 1}</span>
                <h4 className="m-0 text-sm sm:text-base font-semibold text-white leading-snug">
                  {r.title}
                </h4>
                <p className="mt-3 text-xs sm:text-sm text-white/50 leading-[1.65]">
                  {r.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex justify-end">
          <Link
            href="/why-hause-interiors"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-white hover:text-white/80 transition-colors"
          >
            <span>Learn More About Why Hause</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
