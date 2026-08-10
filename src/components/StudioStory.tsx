import React from "react";
import Image from "next/image";

// The studio story band used on /about — copy, three stats, and a
// captioned feature photograph.

export interface StoryStat {
  value: string;
  label: string;
}

export const DEFAULT_STORY_STATS: StoryStat[] = [
  { value: "100+", label: "Spaces Delivered" },
  { value: "5 Metros", label: "Delhi NCR Hubs" },
  { value: "Pan-India", label: "Delivery Network" },
];

export interface StudioStoryProps {
  eyebrow?: string;
  title?: string;
  body1?: string;
  body2?: string;
  stats?: StoryStat[];
  image?: string;
  imageAlt?: string;
  imageEyebrow?: string;
  imageCaption?: string;
}

export const STUDIO_STORY_DEFAULTS = {
  eyebrow: "Our Story",
  title: "Born from digital precision. Built for physical spaces.",
  body1: "Hause Interiors grew out of a digital design and technology studio built on measurable outcomes, obsessive attention to detail, and transparent communication. We realized that while 3D interior renders look stunning on screen, physical execution in India was plagued by broken promises, hidden costs, and chaotic contractor hand-offs.",
  body2: "We built Hause Interiors to provide a single, accountable partner for homeowners and businesses — combining spatial architecture, photorealistic 3D visualization, detailed Bill of Quantities (BOQ) costing, and end-to-end site execution under one roof.",
  image: "/images/jaiswal/jaiswal-03.jpg",
  imageAlt: "Hause Interiors Executed Living Space",
  imageEyebrow: "Featured Project",
  imageCaption: "Living room joinery, ambient lighting & fluted wall paneling executed in Delhi NCR.",
};

export default function StudioStory({
  eyebrow = STUDIO_STORY_DEFAULTS.eyebrow,
  title = STUDIO_STORY_DEFAULTS.title,
  body1 = STUDIO_STORY_DEFAULTS.body1,
  body2 = STUDIO_STORY_DEFAULTS.body2,
  stats = DEFAULT_STORY_STATS,
  image = STUDIO_STORY_DEFAULTS.image,
  imageAlt = STUDIO_STORY_DEFAULTS.imageAlt,
  imageEyebrow = STUDIO_STORY_DEFAULTS.imageEyebrow,
  imageCaption = STUDIO_STORY_DEFAULTS.imageCaption,
}: StudioStoryProps) {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[#18181b] leading-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#6b6559] font-normal leading-relaxed">
            {body1}
          </p>
          <p className="text-sm sm:text-base text-[#6b6559] font-normal leading-relaxed">
            {body2}
          </p>

          <div className="pt-6 grid grid-cols-3 gap-6 border-t border-black/10 text-xs">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-light text-[#18181b]">{s.value}</div>
                <div className="text-[#8a8578] mt-1 uppercase tracking-wider font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-black/10 shadow-2xl group">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/80 font-semibold block">
              {imageEyebrow}
            </span>
            <p className="text-sm font-medium mt-1">
              {imageCaption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
