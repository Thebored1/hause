import React from "react";
import { Compass, Sliders, ShieldCheck, Award, type LucideIcon } from "lucide-react";

// The guiding-principles grid used on /about.

/** Icons a philosophy may use, keyed by the name stored in the CMS. */
export const PHILOSOPHY_ICONS: Record<string, LucideIcon> = {
  compass: Compass,
  sliders: Sliders,
  "shield-check": ShieldCheck,
  award: Award,
};

export interface Philosophy {
  num: string;
  title: string;
  desc: string;
  icon: string;
}

export const DEFAULT_PHILOSOPHIES: Philosophy[] = [
  {
    num: "01",
    title: "Form Follows Function, Always",
    desc: "A beautiful space that does not work for your daily routine is an incomplete design. We start with circulation, ergonomic flow, and storage before layering finishes and aesthetics.",
    icon: "compass",
  },
  {
    num: "02",
    title: "Honesty in Materials & Pricing",
    desc: "We specify genuine materials — BWP marine-grade plywood, authentic quartz, branded hardware — and cost them transparently in an itemised BOQ so you never face hidden surprises.",
    icon: "sliders",
  },
  {
    num: "03",
    title: "Single-Point Accountability",
    desc: "No finger-pointing between designers and contractors. We own the design, civil work, carpentry, MEP coordination, and final styling under one unified team.",
    icon: "shield-check",
  },
  {
    num: "04",
    title: "Rigorous Site Supervision",
    desc: "Great design lives or dies in execution. Every project across Delhi NCR is personally overseen by permanent on-site supervisors to ensure millimeter precision.",
    icon: "award",
  },
];

export interface PhilosophyGridProps {
  eyebrow?: string;
  title?: string;
  intro?: string;
  philosophies?: Philosophy[];
}

export default function PhilosophyGrid({
  eyebrow = "Guiding Principles",
  title = "Our Design Philosophy",
  intro = "We believe exceptional spaces are born from deliberate constraints, relentless attention to detail, and a deep empathy for the people who inhabit them.",
  philosophies = DEFAULT_PHILOSOPHIES,
}: PhilosophyGridProps) {
  return (
    <section className="py-28 px-6 sm:px-12 md:px-16 bg-[#f3efea] text-[#18181b] border-t border-black/10">
      <div className="max-w-[1280px] mx-auto space-y-16">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-normal tracking-tight text-[#18181b] leading-tight">
            {title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6b6559] font-normal leading-relaxed">
            {intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {philosophies.map((p) => {
            const Icon = PHILOSOPHY_ICONS[p.icon] ?? Compass;
            return (
              <div
                key={p.num}
                className="p-8 sm:p-10 bg-white/90 backdrop-blur-sm border border-black/10 hover:border-black/25 rounded-2xl transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#18181b] text-white flex items-center justify-center shadow-md">
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-mono text-[#8a8578] tracking-widest font-semibold">{p.num}</span>
                  </div>
                  <h3 className="text-xl font-medium text-[#18181b] mb-3 tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#6b6559] font-normal leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
