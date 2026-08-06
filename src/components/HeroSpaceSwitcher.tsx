"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SpaceItem {
  id: string;
  name: string;
  image: string;
}

const SPACES: SpaceItem[] = [
  { id: "architectural-atrium", name: "Living Rooms", image: "/images/sp-living.jpg" },
  { id: "living-sanctuary", name: "Bedrooms", image: "/images/sp-bedroom.jpg" },
  { id: "executive-lounge", name: "Offices", image: "/images/sp-office.jpg" },
  { id: "gourmet-atelier", name: "Modular Kitchens", image: "/images/sp-kitchen.jpg" },
  { id: "dining-pavilion", name: "Dining", image: "/images/sp-dining.jpg" },
  { id: "wellness-bath", name: "Bathrooms", image: "/images/sp-bathroom.jpg" },
];

interface HeroSpaceSwitcherProps {
  onOpenContact: () => void;
}

export default function HeroSpaceSwitcher({ onOpenContact }: HeroSpaceSwitcherProps) {
  const [activeSpaceIndex, setActiveSpaceIndex] = useState(0);

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0c0d0e]">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0 select-none">
        {SPACES.map((space, idx) => (
          <div
            key={space.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              idx === activeSpaceIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={space.image}
              alt={space.name}
              className="absolute inset-0 w-full h-full object-cover object-center brightness-90"
            />
          </div>
        ))}
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-black/20 to-black/35 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-[1408px] mx-auto px-6 sm:px-12 md:px-16 pt-32 md:pt-40 pb-14 my-auto">
        <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-white/60 mb-7">
          Interior Design Studio · Delhi NCR · Projects Pan India
        </span>

        <h1 className="m-0 text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-normal text-white tracking-[-0.035em] leading-[1.06] max-w-[900px] text-balance">
          We design spaces<br />that feel like home.
        </h1>

        <p className="mt-8 text-base sm:text-lg text-neutral-200/95 max-w-[560px] font-normal leading-[1.65]">
          Hause Interiors brings the same obsession with strategy and craft that built Hause&apos;s digital work into the physical spaces you live and work in. Thoughtful design, honest execution, and interiors built to last — from the first sketch to the final handover.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={onOpenContact}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-black hover:bg-neutral-200 transition-all shadow-xl cursor-pointer"
          >
            <span>Book a Free Design Consultation</span>
            <ArrowRight size={18} />
          </button>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full border border-white/45 bg-white/[0.04] backdrop-blur-sm px-7 py-3.5 text-base font-medium text-white hover:bg-white/15 hover:border-white/75 transition-all"
          >
            Explore Our Services
          </Link>
        </div>

        {/* Spaces Switcher Pills */}
        <div className="mt-9 flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 mr-2 font-medium">
            Spaces
          </span>
          {SPACES.map((space, idx) => {
            const isActive = idx === activeSpaceIndex;
            return (
              <button
                key={space.id}
                onClick={() => setActiveSpaceIndex(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all ${
                  isActive
                    ? "bg-white text-black border-none shadow-md"
                    : "bg-black/40 text-neutral-300 border border-white/15 hover:bg-black/60 hover:text-white"
                }`}
              >
                {space.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Stats Banner */}
      <div className="relative z-20 w-full bg-gradient-to-t from-black/85 via-black/40 to-transparent">
        <div className="max-w-[1408px] mx-auto px-6 sm:px-12 md:px-16 pb-12">
          <div className="border-t border-white/14 pt-8 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
            <div className="md:col-span-5">
              <p className="m-0 text-sm text-neutral-300/90 leading-[1.65] font-light max-w-sm">
                Residential and commercial interiors designed and delivered end to end — from the first sketch to the final handover, under one accountable team.
              </p>
            </div>
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-7">
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-[-0.02em]">100+</div>
                <div className="text-xs text-neutral-400 mt-1.5 tracking-wider">Spaces Designed</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-[-0.02em]">5+</div>
                <div className="text-xs text-neutral-400 mt-1.5 tracking-wider">Cities Served Across India</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-[-0.02em]">8+</div>
                <div className="text-xs text-neutral-400 mt-1.5 tracking-wider">Years of Design &amp; Delivery</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-[-0.02em]">100%</div>
                <div className="text-xs text-neutral-400 mt-1.5 tracking-wider">Personally Supervised</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
