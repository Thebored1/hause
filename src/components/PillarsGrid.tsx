import React from "react";
import { ShieldCheck, FileCheck, Target, Eye, Globe, CheckCircle2, type LucideIcon } from "lucide-react";

// The five-pillar grid used on /why-hause-interiors. Cards 1 and 4 span two
// columns on large screens, which is what gives the grid its staggered rhythm.

/** Icons a pillar may use, keyed by the name stored in the CMS. */
export const PILLAR_ICONS: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  "file-check": FileCheck,
  target: Target,
  eye: Eye,
  globe: Globe,
};

export interface Pillar {
  num: string;
  title: string;
  tag: string;
  desc: string;
  details: string[];
  icon: string;
}

export const DEFAULT_PILLARS: Pillar[] = [
  {
    num: "01",
    title: "Single Point of Responsibility",
    tag: "Zero Vendor Friction",
    desc: "Design and execution sit under one team, so there's no gap between the person who designed your space and the person building it — and no finger-pointing when something needs to change.",
    details: [
      "In-house architectural designers and site civil supervisors",
      "No vendor hand-off gaps or conflicting timelines",
      "One dedicated project manager as your single point of contact",
    ],
    icon: "shield-check",
  },
  {
    num: "02",
    title: "Transparent, BOQ-Based Costing",
    tag: "No Hidden Surprises",
    desc: "Every project is costed against a detailed Bill of Quantities before work begins, so you know what you're paying for at every stage — not just a lump-sum estimate with room for surprises.",
    details: [
      "Itemised breakdown for civil, carpentry, electrical, and paint",
      "Transparent material brand grades and hardware models",
      "Milestone-linked disbursements aligned with site progress",
    ],
    icon: "file-check",
  },
  {
    num: "03",
    title: "Design with a Business Mindset",
    tag: "Rigorous Delivery Discipline",
    desc: "Hause Interiors grew out of a digital agency built on measurable outcomes. We bring that same discipline to interiors — clear scopes, realistic timelines, and decisions grounded in your budget and how the space will actually be used.",
    details: [
      "Pragmatic material selection that balances luxury and longevity",
      "Strict scope discipline preventing mid-project budget runaway",
      "Spatial circulation designed around daily ergonomic utility",
    ],
    icon: "target",
  },
  {
    num: "04",
    title: "On-Ground Site Supervision",
    tag: "Hands-On Quality Assurance",
    desc: "Projects in Delhi NCR are personally supervised at every key stage, from civil work to final styling — not managed purely over phone calls and photos.",
    details: [
      "Permanent site supervisors at Delhi NCR locations",
      "Daily checklist inspections and weekly photo/video reports",
      "Zero tolerance for substandard joinery, misalignments, or finishing flaws",
    ],
    icon: "eye",
  },
  {
    num: "05",
    title: "Pan-India Delivery Capability",
    tag: "Scale & Consistency",
    desc: "For clients outside Delhi NCR, we combine remote design and project management with vetted on-ground execution partners, so the same process and accountability apply wherever the project is.",
    details: [
      "Comprehensive drawing packages and 3D specifications",
      "Video walkthrough milestone reviews with clients anywhere in the world",
      "Empanelled, vetted local execution teams across major Indian metros",
    ],
    icon: "globe",
  },
];

export interface PillarsGridProps {
  eyebrow?: string;
  title?: string;
  pillars?: Pillar[];
}

export default function PillarsGrid({
  eyebrow = "The Hause Foundation",
  title = "Built on five core principles of accountability.",
  pillars = DEFAULT_PILLARS,
}: PillarsGridProps) {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
      <div className="max-w-[1280px] mx-auto space-y-16">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[#18181b] leading-tight">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = PILLAR_ICONS[pillar.icon] ?? ShieldCheck;
            const isSpanTwo = idx === 0 || idx === 3;

            return (
              <div
                key={pillar.num}
                className={`p-8 sm:p-10 bg-white border border-black/10 hover:border-black/25 rounded-2xl transition-all flex flex-col justify-between shadow-sm ${
                  isSpanTwo ? "lg:col-span-2" : "lg:col-span-1"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#18181b] text-white flex items-center justify-center shadow-md">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-mono text-[#8a8578] tracking-widest font-semibold">{pillar.num}</span>
                  </div>

                  <span className="text-[10px] font-semibold tracking-wider text-[#8a8578] uppercase block mb-1">
                    {pillar.tag}
                  </span>
                  <h3 className="text-2xl font-medium text-[#18181b] mb-3 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#6b6559] font-normal leading-relaxed mb-6">
                    {pillar.desc}
                  </p>

                  <div className="border-t border-black/10 pt-4 space-y-2">
                    {pillar.details.map((d, di) => (
                      <div key={di} className="flex items-start gap-2.5 text-xs text-[#18181b]/85">
                        <CheckCircle2 size={14} className="text-[#8a8578] shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
