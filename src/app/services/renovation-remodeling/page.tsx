import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";
import { Check, Layers, ShieldCheck, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Home Renovation & Remodeling in Delhi NCR | Hause Interiors",
  description:
    "Expert home, kitchen and bathroom renovations across Delhi NCR — modernizing older homes, improving layouts, and upgrading MEP with minimal disruption.",
};

const RENOVATION_SERVICES = [
  "Full-home structural & cosmetic renovations",
  "Modular kitchen modernizations & layout expansions",
  "Luxury bathroom remodels with thermostatic fixtures",
  "Flooring upgrades (Italian marble, tiles, engineered wood)",
  "Full electrical re-wiring & plumbing replacement",
  "Structural partition removals & beam reinforcements",
  "Custom carpentry, false ceilings & door replacements",
  "Balcony waterproofings & sunroom enclosures",
];

const OCCUPIED_STRATEGIES = [
  {
    title: "Phased Zone-Wise Execution",
    desc: "We seal off active work zones with dust barriers and tackle rooms sequentially so your daily living isn't completely upended.",
  },
  {
    title: "Strict Noise Time-Boxing",
    desc: "Heavy civil demolition and tile cutting are strictly restricted to permitted society hours (10:00 AM – 5:00 PM).",
  },
  {
    title: "Daily Site Cleanups",
    desc: "Debris and construction waste are cleared daily, keeping hallways, elevators, and living areas neat and presentable.",
  },
];

export default function RenovationServicePage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Renovation & Remodeling"
          title="Give your space a second life."
          subtitle="You don't always need a new home to get the space you want. Hause Interiors renovates and remodels residential and commercial properties across Delhi NCR — modernising older layouts, upgrading electrical and plumbing, and delivering fresh aesthetics with minimal disruption."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Renovation & Remodeling" },
          ]}
          bgImage="/images/jaiswal/jaiswal-13.jpg"
          primaryCtaText="Plan Your Renovation"
          primaryCtaHref="/contact"
          secondaryCtaText="View Renovation Projects"
          secondaryCtaHref="/projects"
        />

        {/* SECTION 1: Renovation Scope (Crisp Light Ivory Background: #f9f8f6) */}
        <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                Revitalize &amp; Modernize
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[#18181b] leading-tight">
                What We Renovate
              </h2>
              <p className="text-sm sm:text-base text-[#6b6559] font-normal leading-relaxed">
                From targeted single-room overhauls to full structural renovations of decades-old homes in Delhi NCR.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {RENOVATION_SERVICES.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#18181b]">
                    <Check size={16} className="text-[#8a8578] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-black/10 shadow-2xl group">
              <Image
                src="/images/service-renovation.jpg"
                alt="Bathroom and Living Renovation"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </section>

        {/* SECTION 2: Living Through A Remodel (Warm Sand Background: #f3efea) */}
        <section className="py-28 px-6 sm:px-12 md:px-16 bg-[#f3efea] text-[#18181b] border-t border-black/10">
          <div className="max-w-[1280px] mx-auto space-y-16">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                Living Through A Remodel
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-normal tracking-tight text-[#18181b] leading-tight">
                Renovating in Occupied Spaces
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#6b6559] font-normal leading-relaxed">
                If you are living in the home while remodeling takes place, we follow strict dust-containment and noise-mitigation protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {OCCUPIED_STRATEGIES.map((s, idx) => (
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

        {/* Global CTA */}
        <CTASection />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
