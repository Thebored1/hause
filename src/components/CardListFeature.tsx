import React from "react";
import Image from "next/image";

// A split band: copy plus a stack of titled cards on one side, a photograph
// on the other. Sibling of ChecklistFeature, for when each item needs a
// description rather than a single line.

export interface FeatureCard {
  title: string;
  desc: string;
}

export interface CardListFeatureProps {
  eyebrow: string;
  title: string;
  body: string;
  cards: FeatureCard[];
  image: string;
  imageAlt: string;
}

export default function CardListFeature({
  eyebrow,
  title,
  body,
  cards,
  image,
  imageAlt,
}: CardListFeatureProps) {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
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

          <div className="space-y-4 pt-2">
            {cards.map((item, idx) => (
              <div key={idx} className="p-5 bg-white border border-black/10 rounded-2xl shadow-sm">
                <h3 className="text-base font-medium text-[#18181b] mb-1">{item.title}</h3>
                <p className="text-xs text-[#6b6559] font-normal leading-relaxed">{item.desc}</p>
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
