import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";
import { Check, Sparkles, ShieldCheck, Box, Layers, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Modular Kitchen & Wardrobe Designers Delhi NCR | Hause Interiors",
  description:
    "Custom modular kitchens and wardrobes in Delhi NCR — straight, L-shaped, U-shaped and island kitchens; sliding, hinged and walk-in wardrobes built with BWP marine-grade plywood and premium hardware.",
};

const KITCHEN_LAYOUTS = [
  {
    name: "L-Shaped Kitchen",
    bestFor: "Small to mid-sized apartments",
    desc: "Optimizes corner space while leaving the kitchen open to adjacent dining or living areas.",
  },
  {
    name: "Parallel / Galley Kitchen",
    bestFor: "Long, narrow kitchen rooms",
    desc: "The most ergonomically efficient work triangle with opposing counters for prep and cooking.",
  },
  {
    name: "U-Shaped Kitchen",
    bestFor: "Independent homes and larger flats",
    desc: "Maximum countertop workspace, continuous continuous storage, and dedicated appliance zones.",
  },
  {
    name: "Island Kitchen",
    bestFor: "Open-plan luxury residences",
    desc: "A freestanding central counter that doubles as a social gathering spot and extra culinary prep surface.",
  },
];

const WARDROBE_TYPES = [
  {
    title: "Sliding Door Wardrobes",
    desc: "Space-saving designs ideal for compact bedrooms, with smooth soft-close bottom/top roller tracks.",
  },
  {
    title: "Hinged / Swing Door Wardrobes",
    desc: "Classic full-access design allowing you to view the entire wardrobe interior simultaneously.",
  },
  {
    title: "Walk-in Dressing Suites",
    desc: "Dedicated dressing rooms with integrated island jewelry drawers, bronze glass shutters, and sensor illumination.",
  },
  {
    title: "Loft & Over-Door Storage",
    desc: "Custom overhead cabinetry utilizing full vertical ceiling height for seasonal bedding and luggage storage.",
  },
];

const MATERIALS = [
  {
    category: "Carcass Core",
    options: "Boiling Water Proof (BWP) 710 Marine-Grade Plywood, HDHMR for wet zones",
  },
  {
    category: "External Finishes",
    options: "High-Gloss Acrylic, Anti-Fingerprint Matte Laminates, PU Paint, Natural Wood Veneer",
  },
  {
    category: "Countertops",
    options: "Engineered Quartz, Brazilian Granite, Nano White Slabs, Sintered Stone",
  },
  {
    category: "Hardware & Fittings",
    options: "Hettich, Blum, Hafele soft-close tandem boxes, lift-up shutters & pull-out pantries",
  },
];

export default function ModularKitchenServicePage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Kitchens & Wardrobes"
          title="Kitchens and wardrobes built to actually hold your life."
          subtitle="Storage needs to be engineered around the way you cook, dress, and live. Hause Interiors designs and executes precision modular kitchens and customized wardrobe systems across Delhi NCR using marine-grade materials and premium hardware."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Modular Kitchen & Wardrobe Design" },
          ]}
          bgImage="/images/jaiswal/jaiswal-18.jpg"
          primaryCtaText="Design Your Kitchen"
          primaryCtaHref="/contact"
          secondaryCtaText="View Kitchen Portfolio"
          secondaryCtaHref="/projects"
        />

        {/* SECTION 1: Kitchen Layouts (Crisp Light Ivory Background: #f9f8f6) */}
        <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
          <div className="max-w-[1280px] mx-auto space-y-16">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                Ergonomics &amp; Work Triangle
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[#18181b] leading-tight">
                Modular Kitchen Layouts
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#6b6559] font-normal leading-relaxed">
                Every layout is tailored to your cooking habits, appliance requirements, and spatial dimensions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {KITCHEN_LAYOUTS.map((k, idx) => (
                <div key={idx} className="p-8 bg-white border border-black/10 rounded-2xl shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-[#8a8578] block mb-4 font-semibold">0{idx + 1}</span>
                    <h3 className="text-lg font-medium text-[#18181b] mb-1.5">{k.name}</h3>
                    <span className="text-[11px] font-semibold text-[#8a8578] uppercase tracking-wider block mb-3">
                      Best For: {k.bestFor}
                    </span>
                    <p className="text-xs sm:text-sm text-[#6b6559] font-normal leading-relaxed">
                      {k.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: Materials & Hardware (Warm Sand Background: #f3efea) */}
        <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f3efea] text-[#18181b] border-t border-black/10">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                Engineered for Longevity
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[#18181b] leading-tight">
                Materials &amp; Hardware That Endure
              </h2>
              <p className="text-sm sm:text-base text-[#6b6559] font-normal leading-relaxed">
                Indian cooking demands materials that withstand moisture, heat, and turmeric stains. We never compromise on core marine-grade plywood or branded German/Austrian hardware.
              </p>

              <div className="space-y-3.5 pt-2">
                {MATERIALS.map((m, idx) => (
                  <div key={idx} className="p-4 bg-white/90 border border-black/10 rounded-xl shadow-sm">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8a8578] block mb-1">
                      {m.category}
                    </span>
                    <p className="text-sm text-[#18181b] font-medium m-0">{m.options}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative min-h-[380px] h-full rounded-3xl overflow-hidden border border-black/10 shadow-2xl group">
              <Image
                src="/images/jaiswal/jaiswal-21.jpg"
                alt="Modular Kitchen Detail & Quartz Worktop"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </section>

        {/* SECTION 3: Custom Wardrobes (Dark Obsidian Background: #0c0d0e) */}
        <section className="py-28 px-6 sm:px-12 md:px-16 bg-[#0c0d0e] text-[#f3efea] border-t border-white/10">
          <div className="max-w-[1280px] mx-auto space-y-16">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.22em] text-white/50 uppercase">
                Bespoke Storage
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-medium tracking-tight text-white leading-tight">
                Custom Wardrobe Systems
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/60 font-light leading-relaxed">
                Wardrobe interiors customized down to the millimeter for your specific collection of garments, accessories, shoes, and jewelry.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WARDROBE_TYPES.map((w, idx) => (
                <div key={idx} className="p-8 bg-[#141618] border border-white/10 rounded-2xl flex flex-col justify-between shadow-md">
                  <div>
                    <span className="text-xs font-mono text-white/30 block mb-4">0{idx + 1}</span>
                    <h3 className="text-lg font-medium text-white mb-2.5">{w.title}</h3>
                    <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                      {w.desc}
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
