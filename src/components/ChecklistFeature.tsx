import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

// A split band: copy plus a two-column checklist on one side, a photograph on
// the other. Shared by the service detail pages, so unlike the single-use
// sections this one takes its content rather than defaulting to any one page.

export interface ChecklistFeatureProps {
  eyebrow: string;
  title: string;
  body: string;
  items: string[];
  image: string;
  imageAlt: string;
  /** Which side the photograph sits on. */
  imageSide?: "left" | "right";
  /** Background tone of the band. */
  tone?: "ivory" | "sand";
}

export default function ChecklistFeature({
  eyebrow,
  title,
  body,
  items,
  image,
  imageAlt,
  imageSide = "right",
  tone = "ivory",
}: ChecklistFeatureProps) {
  // Built so the emitted class string matches the hand-written markup exactly:
  // no trailing space when a conditional is empty, and the same order.
  const bg = tone === "sand" ? "bg-[#f3efea]" : "bg-[#f9f8f6]";
  const border = tone === "sand" ? " border-t border-black/10" : "";

  const text = (
    <div className={`lg:col-span-6 space-y-6${imageSide === "left" ? " lg:order-2" : ""}`}>
      <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
        {eyebrow}
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[#18181b] leading-tight">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-[#6b6559] font-normal leading-relaxed">
        {body}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#18181b]">
            <Check size={16} className="text-[#8a8578] shrink-0 mt-0.5" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const photo = (
    <div
      className={`lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-black/10 shadow-2xl group${
        imageSide === "left" ? " lg:order-1" : ""
      }`}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );

  return (
    <section className={`py-24 px-6 sm:px-12 md:px-16 ${bg} text-[#18181b]${border}`}>
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {text}
        {photo}
      </div>
    </section>
  );
}
