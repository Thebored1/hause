"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PortfolioShowcase() {
  return (
    <section id="work" className="bg-[#f3efea] text-[#18181b] py-24 px-6 sm:px-12 md:px-16 border-t border-black/10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14">
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
              Portfolio
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-[44px] font-normal tracking-[-0.03em] leading-[1.12] text-[#18181b] max-w-[560px]">
              Spaces we&apos;ve designed and delivered.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="m-0 text-sm sm:text-base text-[#6b6559] leading-[1.7] max-w-[420px]">
              Homes, offices, retail and hospitality spaces across Delhi NCR — designed, built and personally supervised through to handover.
            </p>
          </div>
        </div>

        {/* Portfolio Masonry/Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-6 min-h-[580px]">
          {/* Main Large Card */}
          <div className="md:col-span-7 md:row-span-2 rounded-3xl overflow-hidden relative min-h-[300px] group cursor-pointer">
            <img
              src="/images/service-residential.jpg"
              alt="Qutone Experience Centre"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute left-8 bottom-8 text-white">
              <span className="text-xs tracking-[0.22em] uppercase text-white/75 font-semibold">
                Retail &amp; Showroom
              </span>
              <div className="text-2xl sm:text-3xl font-medium tracking-[-0.02em] mt-1.5">
                Qutone Experience Centre
              </div>
            </div>
          </div>

          {/* Top Right Card */}
          <div className="md:col-span-5 rounded-3xl overflow-hidden relative min-h-[250px] group cursor-pointer">
            <img
              src="/images/service-commercial.jpg"
              alt="Varmora Tile Collection"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute left-6 bottom-6 text-white">
              <span className="text-xs tracking-[0.22em] uppercase text-white/75 font-semibold">
                Retail &amp; Showroom
              </span>
              <div className="text-lg font-medium mt-1">
                Varmora Tile Collection
              </div>
            </div>
          </div>

          {/* Bottom Right Card */}
          <div className="md:col-span-5 rounded-3xl overflow-hidden relative min-h-[250px] group cursor-pointer">
            <img
              src="/images/service-kitchen.jpg"
              alt="Varmora Consultation Bar"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute left-6 bottom-6 text-white">
              <span className="text-xs tracking-[0.22em] uppercase text-white/75 font-semibold">
                Commercial
              </span>
              <div className="text-lg font-medium mt-1">
                Varmora Consultation Bar
              </div>
            </div>
          </div>
        </div>

        {/* Secondary 3 Card Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 rounded-3xl overflow-hidden relative min-h-[220px] group cursor-pointer">
            <img
              src="/images/service-turnkey.jpg"
              alt="Pavit Reception"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          </div>

          <div className="md:col-span-4 rounded-3xl overflow-hidden relative min-h-[220px] group cursor-pointer">
            <img
              src="/images/service-renovation.jpg"
              alt="Dimore Material Wall"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          </div>

          <div className="md:col-span-4 rounded-3xl bg-white border border-black/6 p-8 flex flex-col justify-between min-h-[220px]">
            <p className="m-0 text-base text-[#6b6559] leading-[1.65]">
              100+ spaces designed across 5+ cities, every one personally supervised on site.
            </p>
            <Link
              href="#visit"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#18181b] hover:opacity-80 transition-opacity mt-4"
            >
              <span>View our portfolio</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
