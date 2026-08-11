"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// The portfolio teaser on the home page. The cards used to be written out as
// JSX; they are data now, but the layout is still fixed — the first feature
// card spans two rows, the next two stack beside it, and the strip below holds
// two images plus the note card.

export interface PortfolioCard {
  /** Small label above the title. */
  tag: string;
  title: string;
  image: string;
  href?: string;
}

/** An image-only card in the strip below the features. */
export interface PortfolioStripImage {
  image: string;
  alt: string;
  href?: string;
}

export interface PortfolioShowcaseProps {
  eyebrow?: string;
  title?: string;
  intro?: string;
  /** Exactly three read well: one large, two stacked beside it. */
  cards?: PortfolioCard[];
  strip?: PortfolioStripImage[];
  note?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export const DEFAULT_PORTFOLIO_CARDS: PortfolioCard[] = [
  {
    tag: "Retail & Showroom",
    title: "Qutone Experience Centre",
    image: "/images/service-residential.jpg",
  },
  {
    tag: "Retail & Showroom",
    title: "Varmora Tile Collection",
    image: "/images/service-commercial.jpg",
  },
  {
    tag: "Commercial",
    title: "Varmora Consultation Bar",
    image: "/images/service-kitchen.jpg",
  },
];

export const DEFAULT_PORTFOLIO_STRIP: PortfolioStripImage[] = [
  { image: "/images/service-turnkey.jpg", alt: "Pavit Reception" },
  { image: "/images/service-renovation.jpg", alt: "Dimore Material Wall" },
];

export const PORTFOLIO_SHOWCASE_DEFAULTS = {
  eyebrow: "Portfolio",
  title: "Spaces we've designed and delivered.",
  intro:
    "Homes, offices, retail and hospitality spaces across Delhi NCR — designed, built and personally supervised through to handover.",
  note: "100+ spaces designed across 5+ cities, every one personally supervised on site.",
  ctaLabel: "View Full Portfolio",
  ctaHref: "/projects",
};

export default function PortfolioShowcase({
  eyebrow = PORTFOLIO_SHOWCASE_DEFAULTS.eyebrow,
  title = PORTFOLIO_SHOWCASE_DEFAULTS.title,
  intro = PORTFOLIO_SHOWCASE_DEFAULTS.intro,
  cards = DEFAULT_PORTFOLIO_CARDS,
  strip = DEFAULT_PORTFOLIO_STRIP,
  note = PORTFOLIO_SHOWCASE_DEFAULTS.note,
  ctaLabel = PORTFOLIO_SHOWCASE_DEFAULTS.ctaLabel,
  ctaHref = PORTFOLIO_SHOWCASE_DEFAULTS.ctaHref,
}: PortfolioShowcaseProps) {
  const [feature, ...rest] = cards;

  return (
    <section id="work" className="bg-[#f3efea] text-[#18181b] py-24 px-6 sm:px-12 md:px-16 border-t border-black/10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14">
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
              {eyebrow}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-[44px] font-normal tracking-[-0.03em] leading-[1.12] text-[#18181b] max-w-[560px]">
              {title}
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="m-0 text-sm sm:text-base text-[#6b6559] leading-[1.7] max-w-[420px]">
              {intro}
            </p>
          </div>
        </div>

        {/* Portfolio Masonry/Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-6 min-h-[580px]">
          {/* Main Large Card */}
          {feature ? (
            <Link
              href={feature.href ?? ctaHref}
              className="md:col-span-7 md:row-span-2 rounded-3xl overflow-hidden relative min-h-[300px] group cursor-pointer block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={feature.image}
                alt={feature.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute left-8 bottom-8 text-white">
                <span className="text-xs tracking-[0.22em] uppercase text-white/75 font-semibold">
                  {feature.tag}
                </span>
                <div className="text-2xl sm:text-3xl font-medium tracking-[-0.02em] mt-1.5 flex items-center gap-2">
                  <span>{feature.title}</span>
                  <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          ) : null}

          {/* Stacked beside it */}
          {rest.map((card, i) => (
            <Link
              key={i}
              href={card.href ?? ctaHref}
              className="md:col-span-5 rounded-3xl overflow-hidden relative min-h-[250px] group cursor-pointer block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute left-6 bottom-6 text-white">
                <span className="text-xs tracking-[0.22em] uppercase text-white/75 font-semibold">
                  {card.tag}
                </span>
                <div className="text-lg font-medium mt-1 flex items-center gap-1.5">
                  <span>{card.title}</span>
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Secondary 3 Card Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {strip.map((item, i) => (
            <Link
              key={i}
              href={item.href ?? ctaHref}
              className="md:col-span-4 rounded-3xl overflow-hidden relative min-h-[220px] group cursor-pointer block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </Link>
          ))}

          <div className="md:col-span-4 rounded-3xl bg-white border border-black/6 p-8 flex flex-col justify-between min-h-[220px]">
            <p className="m-0 text-base text-[#6b6559] leading-[1.65]">
              {note}
            </p>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#18181b] hover:opacity-80 transition-opacity mt-4"
            >
              <span>{ctaLabel}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
