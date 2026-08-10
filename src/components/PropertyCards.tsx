import React from "react";

// A four-up grid of numbered cards on sand, with a hover border lift. Used
// for the property types on the residential service page.

export interface PropertyType {
  title: string;
  desc: string;
}

export interface PropertyCardsProps {
  eyebrow: string;
  title: string;
  intro: string;
  types: PropertyType[];
}

export default function PropertyCards({ eyebrow, title, intro, types }: PropertyCardsProps) {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-white border border-black/10 hover:border-black/25 rounded-2xl transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-[#8a8578] block mb-4 font-semibold">0{idx + 1}</span>
                <h3 className="text-lg font-medium text-[#18181b] mb-3">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#6b6559] font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
