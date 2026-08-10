import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// The dark "where we work" band used on /about. Same shape as CommitmentBar
// but on obsidian with an inverted button.

export interface ReachBarProps {
  eyebrow?: string;
  title?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export const REACH_BAR_DEFAULTS = {
  eyebrow: "Location & Reach",
  title: "Serving All of Delhi NCR & Select Pan-India Projects",
  body: "Headquartered in Ghaziabad with on-ground execution teams actively operating across Delhi, Gurugram, Noida, Greater Noida, and Faridabad.",
  ctaLabel: "Explore Locations",
  ctaHref: "/locations",
};

export default function ReachBar({
  eyebrow = REACH_BAR_DEFAULTS.eyebrow,
  title = REACH_BAR_DEFAULTS.title,
  body = REACH_BAR_DEFAULTS.body,
  ctaLabel = REACH_BAR_DEFAULTS.ctaLabel,
  ctaHref = REACH_BAR_DEFAULTS.ctaHref,
}: ReachBarProps) {
  return (
    <section className="py-20 px-6 sm:px-12 md:px-16 bg-[#0c0d0e] border-t border-white/10">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-semibold tracking-[0.22em] text-white/50 uppercase">
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-white">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
            {body}
          </p>
        </div>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black text-xs font-semibold tracking-wider uppercase hover:bg-neutral-200 transition-colors rounded-full shadow-lg shrink-0"
        >
          <span>{ctaLabel}</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
