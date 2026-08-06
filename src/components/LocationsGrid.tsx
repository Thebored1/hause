"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CITIES = [
  { name: "Delhi", body: "South Delhi apartments to independent floors in older colonies.", tag: "On ground" },
  { name: "Gurugram", body: "High-rise apartments, builder floors and corporate offices.", tag: "On ground" },
  { name: "Noida & Greater Noida", body: "Growing apartment societies, plus office and retail fit-outs.", tag: "On ground" },
  { name: "Ghaziabad", body: "Our home base — the most frequent site oversight.", tag: "Headquarters" },
  { name: "Faridabad", body: "Residential and commercial, same process throughout.", tag: "On ground" },
  { name: "Pan-India", body: "Remote design, milestone site visits and vetted local execution partners.", tag: "Select projects" },
];

export default function LocationsGrid() {
  return (
    <section id="locations" className="bg-[#f9f8f6] text-[#18181b] py-24 px-6 sm:px-12 md:px-16">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14">
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
              Where We Work
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-[44px] font-normal tracking-[-0.03em] leading-[1.12] text-[#18181b] max-w-[560px]">
              Proudly based in Delhi NCR. Building everywhere.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="m-0 text-sm sm:text-base text-[#6b6559] leading-[1.7] max-w-[420px]">
              Headquartered in Ghaziabad, Hause Interiors designs and delivers homes and workspaces across Delhi, Gurugram, Noida, Ghaziabad and Faridabad — and takes on select residential and commercial projects pan-India, with structured remote design and on-ground execution partners.
            </p>
          </div>
        </div>

        {/* Cities Table */}
        <div className="flex flex-col">
          {CITIES.map((city, idx) => {
            const isHq = city.tag === "Headquarters";
            return (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-baseline py-6 border-t border-black/12"
              >
                <div className="md:col-span-4">
                  <span className="text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-[#18181b]">
                    {city.name}
                  </span>
                </div>
                <div className="md:col-span-6">
                  <p className="m-0 text-sm sm:text-base text-[#6b6559] leading-[1.6]">
                    {city.body}
                  </p>
                </div>
                <div className="md:col-span-2 text-left md:text-right">
                  <span
                    className={`text-[11px] tracking-[0.18em] uppercase ${
                      isHq ? "font-semibold text-black" : "text-[#a19c8f] font-medium"
                    }`}
                  >
                    {city.tag}
                  </span>
                </div>
              </div>
            );
          })}

          <div className="border-t border-black/12 pt-8">
            <Link
              href="#visit"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#18181b] hover:opacity-80 transition-opacity"
            >
              <span>Check if we serve your city</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
