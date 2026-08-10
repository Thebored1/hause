import React from "react";
import {
  Clock,
  LayoutGrid,
  Zap,
  ShieldCheck,
  Users,
  Building2,
  Sparkles,
  Layers,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

// An intro plus a grid of icon cards. Sibling of NumberedCards, for sections
// that lead with an icon rather than a number. Shared by the service detail
// pages, so it takes its content.

/** Icons a card may use, keyed by the name stored in the CMS. */
export const CARD_ICONS: Record<string, LucideIcon> = {
  clock: Clock,
  "layout-grid": LayoutGrid,
  zap: Zap,
  "shield-check": ShieldCheck,
  users: Users,
  building: Building2,
  sparkles: Sparkles,
  layers: Layers,
  "check-circle": CheckCircle2,
};

export interface IconCard {
  icon: string;
  title: string;
  desc: string;
}

export interface IconCardsProps {
  eyebrow: string;
  title: string;
  /** Omit to render the heading with no lead paragraph. */
  intro?: string;
  cards: IconCard[];
  /** Card headings are tracked tight unless told otherwise. */
  titleTracking?: "tight" | "normal";
}

export default function IconCards({
  eyebrow,
  title,
  intro,
  cards,
  titleTracking = "tight",
}: IconCardsProps) {
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
          {intro ? (
            <p className="mt-3 text-sm sm:text-base text-[#6b6559] font-normal leading-relaxed">
              {intro}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = CARD_ICONS[card.icon] ?? Clock;
            return (
              <div
                key={idx}
                className="p-8 bg-white border border-black/10 rounded-2xl flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#18181b] text-white flex items-center justify-center mb-6 shadow-md">
                    <Icon size={20} />
                  </div>
                  <h3
                    className={`text-xl font-medium text-[#18181b] mb-3${
                      titleTracking === "tight" ? " tracking-tight" : ""
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#6b6559] font-normal leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
