import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// The commitment band used on /process — a wide statement with one button.

export interface CommitmentBarProps {
  eyebrow?: string;
  title?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function CommitmentBar({
  eyebrow = "The Hause Commitment",
  title = "Locked BOQs. No Cost Escalations.",
  body = "Once the scope of work and 3D visualization are approved, our Bill of Quantities remains locked. No mid-project price surprises or hidden contractor markups.",
  ctaLabel = "Book Discovery Call",
  ctaHref = "/contact",
}: CommitmentBarProps) {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f3efea] text-[#18181b] border-t border-black/10">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal text-[#18181b]">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-[#6b6559] font-normal leading-relaxed">
            {body}
          </p>
        </div>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#18181b] text-white text-xs font-bold tracking-wider uppercase hover:bg-black transition-colors rounded-full shadow-lg shrink-0"
        >
          <span>{ctaLabel}</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
