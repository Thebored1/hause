"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  onOpenContact?: () => void;
  bgImage?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  studioLabel?: string;
  /** Newline-separated; rendered as separate lines. */
  studioAddress?: string;
  contactLabel?: string;
  /** Newline-separated; rendered as separate lines. */
  contactDetails?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export const CTA_SECTION_DEFAULTS = {
  bgImage: "/images/jaiswal/jaiswal-07.jpg",
  eyebrow: "Get Started",
  title: "Ready to see your space differently?",
  body: "Tell us about your home or workspace, and we'll get back to you within 24 hours with next steps and a free consultation slot.",
  studioLabel: "Studio",
  studioAddress: "2nd A 255 Nehru Nagar\nGhaziabad, 201001, U.P.",
  contactLabel: "Get in touch",
  contactDetails: "+91 80065 59900\ninteriors@hause.agency",
  ctaLabel: "Get a Free Consultation",
  ctaHref: "/contact",
};

/** Renders newline-separated copy as <br />-separated lines. */
function lines(value: string) {
  return value.split("\n").map((line, i, all) => (
    <React.Fragment key={i}>
      {line}
      {i < all.length - 1 ? <br /> : null}
    </React.Fragment>
  ));
}

export default function CTASection({
  onOpenContact,
  bgImage = CTA_SECTION_DEFAULTS.bgImage,
  eyebrow = CTA_SECTION_DEFAULTS.eyebrow,
  title = CTA_SECTION_DEFAULTS.title,
  body = CTA_SECTION_DEFAULTS.body,
  studioLabel = CTA_SECTION_DEFAULTS.studioLabel,
  studioAddress = CTA_SECTION_DEFAULTS.studioAddress,
  contactLabel = CTA_SECTION_DEFAULTS.contactLabel,
  contactDetails = CTA_SECTION_DEFAULTS.contactDetails,
  ctaLabel = CTA_SECTION_DEFAULTS.ctaLabel,
  ctaHref = CTA_SECTION_DEFAULTS.ctaHref,
}: CTASectionProps) {
  return (
    <section id="visit" className="relative overflow-hidden bg-[#0c0d0e] text-white">
      {/* Background Image & Ambient Overlay */}
      <img
        src={bgImage}
        alt="Hause Interiors Studio & Showroom"
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.38]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-black/40 to-black/60 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1408px] mx-auto px-6 sm:px-12 md:px-16 py-28 md:py-36 grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-7">
          <span className="text-xs font-semibold tracking-[0.22em] text-white/55 uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl md:text-[52px] font-light tracking-[-0.03em] leading-[1.1] text-white text-balance">
            {title}
          </h2>
          <p className="mt-5 text-base text-neutral-200/85 leading-[1.7] max-w-[520px]">
            {body}
          </p>
        </div>

        <div className="md:col-span-5 flex flex-col gap-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="text-[11px] tracking-[0.22em] uppercase text-white/50 font-semibold">
                {studioLabel}
              </div>
              <div className="mt-2.5 text-sm sm:text-base text-white leading-[1.6]">
                {lines(studioAddress)}
              </div>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.22em] uppercase text-white/50 font-semibold">
                {contactLabel}
              </div>
              <div className="mt-2.5 text-sm sm:text-base text-white leading-[1.6]">
                {lines(contactDetails)}
              </div>
            </div>
          </div>

          {onOpenContact ? (
            <button
              onClick={onOpenContact}
              className="self-start inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black hover:bg-neutral-200 transition-all border-none cursor-pointer shadow-lg mt-2"
            >
              <span>{ctaLabel}</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <Link
              href={ctaHref}
              className="self-start inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black hover:bg-neutral-200 transition-all shadow-lg mt-2"
            >
              <span>{ctaLabel}</span>
              <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
