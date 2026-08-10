import React from "react";
import Image from "next/image";

// A split band: copy plus category/spec rows on one side, a photograph on the
// other. Sibling of CardListFeature, for specification lists rather than
// descriptive cards.

export interface Spec {
  category: string;
  options: string;
}

export interface SpecFeatureProps {
  eyebrow: string;
  title: string;
  body: string;
  specs: Spec[];
  image: string;
  imageAlt: string;
}

export default function SpecFeature({
  eyebrow,
  title,
  body,
  specs,
  image,
  imageAlt,
}: SpecFeatureProps) {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f3efea] text-[#18181b] border-t border-black/10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[#18181b] leading-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#6b6559] font-normal leading-relaxed">
            {body}
          </p>

          <div className="space-y-3.5 pt-2">
            {specs.map((m, idx) => (
              <div key={idx} className="p-4 bg-white/90 border border-black/10 rounded-xl shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8a8578] block mb-1">
                  {m.category}
                </span>
                <p className="text-sm text-[#18181b] font-medium m-0">{m.options}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 relative min-h-[380px] h-full rounded-3xl overflow-hidden border border-black/10 shadow-2xl group">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
