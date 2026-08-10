import React from "react";

// An intro plus a grid of numbered cards. Shared by the service detail pages,
// so it takes its content rather than defaulting to any one page's copy.

export interface NumberedCard {
  title: string;
  desc: string;
}

export interface NumberedCardsProps {
  eyebrow: string;
  title: string;
  intro: string;
  cards: NumberedCard[];
  /** Columns at the md breakpoint. */
  columns?: 2 | 3 | 4;
  tone?: "ivory" | "sand";
}

const COLUMN_CLASS: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export default function NumberedCards({
  eyebrow,
  title,
  intro,
  cards,
  columns = 3,
  tone = "sand",
}: NumberedCardsProps) {
  // Ordered to match the hand-written markup exactly.
  const bg = tone === "sand" ? "bg-[#f3efea]" : "bg-[#f9f8f6]";
  const border = tone === "sand" ? " border-t border-black/10" : "";

  return (
    <section className={`py-28 px-6 sm:px-12 md:px-16 ${bg} text-[#18181b]${border}`}>
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

        <div className={`grid grid-cols-1 ${COLUMN_CLASS[columns]} gap-8`}>
          {cards.map((s, idx) => (
            <div key={idx} className="p-8 bg-white border border-black/10 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-xs font-mono text-[#8a8578] block mb-4 font-semibold">0{idx + 1}</span>
                <h3 className="text-xl font-medium text-[#18181b] mb-3">{s.title}</h3>
                <p className="text-sm text-[#6b6559] font-normal leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
