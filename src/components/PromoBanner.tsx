import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// A wide card band — eyebrow, heading, body and one button. Used for the
// studio-visit invitation on /contact, and reusable anywhere the same shape
// is needed. Defaults to the copy already shipped on /contact.

export interface PromoBannerProps {
  eyebrow?: string;
  title?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Vertical rhythm of the band. */
  spacing?: "normal" | "loose";
  cardShadow?: "sm" | "md";
  showArrow?: boolean;
}

const isExternal = (href: string) => /^(https?:)?\/\/|^mailto:|^tel:/.test(href);

export const PROMO_BANNER_DEFAULTS = {
  eyebrow: "In-Person Consultations",
  title: "Visit Our Studio & Experience Materials Hands-On",
  body: "Feel high-gloss acrylics, touch textured fluted panels, inspect soft-close German tandem boxes, and compare quartz stone samples before making design decisions.",
  ctaLabel: "Open in Maps",
  ctaHref: "https://maps.google.com/?q=2nd+A+255+Nehru+Nagar+Ghaziabad",
  spacing: "normal" as const,
  cardShadow: "sm" as const,
  showArrow: true,
};

export default function PromoBanner({
  eyebrow = PROMO_BANNER_DEFAULTS.eyebrow,
  title = PROMO_BANNER_DEFAULTS.title,
  body = PROMO_BANNER_DEFAULTS.body,
  ctaLabel = PROMO_BANNER_DEFAULTS.ctaLabel,
  ctaHref = PROMO_BANNER_DEFAULTS.ctaHref,
  spacing = PROMO_BANNER_DEFAULTS.spacing,
  cardShadow = PROMO_BANNER_DEFAULTS.cardShadow,
  showArrow = PROMO_BANNER_DEFAULTS.showArrow,
}: PromoBannerProps) {
  const base =
    "px-7 py-3.5 bg-[#18181b] text-white text-xs font-bold tracking-[0.16em] uppercase hover:bg-black transition-colors rounded-full shadow-lg";
  const cls = showArrow ? `${base} inline-flex items-center gap-2` : base;
  const inner = showArrow ? (
    <>
      <span>{ctaLabel}</span>
      <ArrowRight size={14} />
    </>
  ) : (
    ctaLabel
  );

  return (
    <section
      className={`${spacing === "loose" ? "py-24" : "py-20"} px-6 sm:px-12 md:px-16 bg-[#f3efea] text-[#18181b] border-t border-black/10`}
    >
      <div
        className={`max-w-[1280px] mx-auto p-8 sm:p-12 bg-white border border-black/10 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${cardShadow === "md" ? "shadow-md" : "shadow-sm"}`}
      >
        <div className="md:col-span-8 space-y-3">
          <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
            {eyebrow}
          </span>
          <h3 className="text-2xl sm:text-3xl font-normal text-[#18181b]">{title}</h3>
          <p className="text-sm text-[#6b6559] font-normal leading-relaxed max-w-2xl">{body}</p>
        </div>
        <div className="md:col-span-4 flex md:justify-end">
          {isExternal(ctaHref) ? (
            <a href={ctaHref} target="_blank" rel="noopener noreferrer" className={cls}>
              {inner}
            </a>
          ) : (
            <Link href={ctaHref} className={cls}>
              {inner}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
