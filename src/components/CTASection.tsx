"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  onOpenContact?: () => void;
  bgImage?: string;
}

export default function CTASection({
  onOpenContact,
  bgImage = "/images/jaiswal/jaiswal-07.jpg",
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
            Get Started
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl md:text-[52px] font-light tracking-[-0.03em] leading-[1.1] text-white text-balance">
            Ready to see your space differently?
          </h2>
          <p className="mt-5 text-base text-neutral-200/85 leading-[1.7] max-w-[520px]">
            Tell us about your home or workspace, and we&apos;ll get back to you within 24 hours with next steps and a free consultation slot.
          </p>
        </div>

        <div className="md:col-span-5 flex flex-col gap-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="text-[11px] tracking-[0.22em] uppercase text-white/50 font-semibold">
                Studio
              </div>
              <div className="mt-2.5 text-sm sm:text-base text-white leading-[1.6]">
                2nd A 255 Nehru Nagar<br />Ghaziabad, 201001, U.P.
              </div>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.22em] uppercase text-white/50 font-semibold">
                Get in touch
              </div>
              <div className="mt-2.5 text-sm sm:text-base text-white leading-[1.6]">
                +91 80065 59900<br />interiors@hause.agency
              </div>
            </div>
          </div>

          {onOpenContact ? (
            <button
              onClick={onOpenContact}
              className="self-start inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black hover:bg-neutral-200 transition-all border-none cursor-pointer shadow-lg mt-2"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <Link
              href="/contact"
              className="self-start inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black hover:bg-neutral-200 transition-all shadow-lg mt-2"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
