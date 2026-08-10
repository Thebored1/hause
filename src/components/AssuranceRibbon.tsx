import React from "react";
import { ShieldCheck, Clock, Award, type LucideIcon } from "lucide-react";

// The three-card assurance ribbon used on /services.

/** Icons a card may use, keyed by the name stored in the CMS. */
export const RIBBON_ICONS: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  clock: Clock,
  award: Award,
};

export interface AssuranceCard {
  icon: "shield-check" | "clock" | "award";
  title: string;
  body: string;
}

export const DEFAULT_ASSURANCES: AssuranceCard[] = [
  {
    icon: "shield-check",
    title: "Certified Genuine Materials",
    body: "Marine-grade BWP plywood, high-impact acrylics, authentic quartz, and branded European soft-close fittings.",
  },
  {
    icon: "clock",
    title: "Milestone-Locked Timelines",
    body: "Clear start-to-finish project schedules with weekly photo and video reporting from our on-site supervisors.",
  },
  {
    icon: "award",
    title: "Single Accountable Team",
    body: "No contractor finger-pointing. Design, civil work, carpentry, and final handover are owned under one roof.",
  },
];

export default function AssuranceRibbon({
  cards = DEFAULT_ASSURANCES,
}: {
  cards?: AssuranceCard[];
}) {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f3efea] text-[#18181b] border-t border-black/10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {cards.map((c, i) => {
          const Icon = RIBBON_ICONS[c.icon] ?? ShieldCheck;
          return (
            <div key={i} className="p-8 bg-white/90 rounded-2xl border border-black/10 shadow-sm space-y-3">
              <Icon size={28} className="text-[#18181b]" />
              <h4 className="text-lg font-medium text-[#18181b]">{c.title}</h4>
              <p className="text-xs sm:text-sm text-[#6b6559] leading-relaxed">
                {c.body}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
