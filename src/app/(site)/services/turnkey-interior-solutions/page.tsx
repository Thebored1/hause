import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";
import { Check, ShieldCheck, Layers, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Turnkey Interior Solutions Delhi NCR | Hause Interiors",
  description:
    "End-to-end turnkey interior design and execution in Delhi NCR — one team handling design, civil, electrical, carpentry, paint and styling with zero hassle.",
};

const TURNKEY_STAGES = [
  {
    num: "01",
    title: "Detailed 3D Renders & Technical Blueprints",
    desc: "Complete architectural drawings, 2D electrical/plumbing layouts, and photorealistic 3D visualization.",
  },
  {
    num: "02",
    title: "Civil & Structural Modifications",
    desc: "Demolition, partition creation, flooring leveling, waterproofing, and tile/marble laying.",
  },
  {
    num: "03",
    title: "Electrical, Plumbing & HVAC Integration",
    desc: "Concealed conduit wiring, switchboard placement, plumbing fixtures, and AC drainage routing.",
  },
  {
    num: "04",
    title: "False Ceiling & Architectural Lighting",
    desc: "Gypsum board framing, cove lighting, magnetic track lights, and profile LED illumination.",
  },
  {
    num: "05",
    title: "Custom Carpentry & Modular Joinery",
    desc: "Modular kitchens, sliding/hinged wardrobes, vanity counters, and bespoke media consoles.",
  },
  {
    num: "06",
    title: "Painting, Wall Textures & Finishes",
    desc: "Wall putty, primer coats, premium emulsions, fluted paneling, wallpaper, and PU finishes.",
  },
  {
    num: "07",
    title: "Deep Cleaning, Styling & Handover",
    desc: "Post-construction chemical deep clean, soft furnishing placement, and final snag-list walkthrough.",
  },
];

const WHO_IS_IT_FOR = [
  {
    title: "Busy Professionals & Families",
    desc: "Clients who don't have the time to coordinate with 5 different contractors, carpenters, and painters every weekend.",
  },
  {
    title: "Out-of-Town & NRI Homeowners",
    desc: "Property owners living outside Delhi NCR or overseas who require rigorous local site management and digital milestone reporting.",
  },
  {
    title: "Fixed-Budget Projects",
    desc: "Clients who want guaranteed cost certainty through a locked Bill of Quantities before work starts.",
  },
];

export default function TurnkeyServicePage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Turnkey Solutions"
          title="One design partner. Zero coordination headaches."
          subtitle="Managing an interior project shouldn't feel like a full-time job. Hause Interiors delivers complete turnkey interior solutions across Delhi NCR — from design concept to final handover, managed by one team under one timeline."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Turnkey Interior Solutions" },
          ]}
          bgImage="/images/jaiswal/jaiswal-07.jpg"
          primaryCtaText="Book a Turnkey Consultation"
          primaryCtaHref="/contact"
          secondaryCtaText="View Our Projects"
          secondaryCtaHref="/projects"
        />

        {/* SECTION 1: What's Included (Crisp Light Ivory Background: #f9f8f6) */}
        <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
          <div className="max-w-[1280px] mx-auto space-y-16">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                End-to-End Scope
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[#18181b] leading-tight">
                What&apos;s Included in Our Turnkey Service
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#6b6559] font-normal leading-relaxed">
                We take total responsibility for your site from day one to key handover.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TURNKEY_STAGES.map((s, idx) => (
                <div
                  key={s.num}
                  className={`p-8 bg-white border border-black/10 rounded-2xl shadow-sm flex flex-col justify-between ${
                    idx === 6 ? "md:col-span-2 lg:col-span-3" : ""
                  }`}
                >
                  <div>
                    <span className="text-xs font-mono text-[#8a8578] block mb-4 font-semibold">{s.num}</span>
                    <h3 className="text-lg font-medium text-[#18181b] mb-2">{s.title}</h3>
                    <p className="text-xs sm:text-sm text-[#6b6559] font-normal leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: Ideal For (Warm Sand Background: #f3efea) */}
        <section className="py-28 px-6 sm:px-12 md:px-16 bg-[#f3efea] text-[#18181b] border-t border-black/10">
          <div className="max-w-[1280px] mx-auto space-y-16">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                Ideal For
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-normal tracking-tight text-[#18181b] leading-tight">
                Who Is Turnkey Right For?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {WHO_IS_IT_FOR.map((w, idx) => (
                <div key={idx} className="p-8 bg-white border border-black/10 rounded-2xl flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-[#18181b] text-white flex items-center justify-center mb-6 shadow-md">
                      <CheckCircle2 size={20} />
                    </div>
                    <h3 className="text-xl font-medium text-[#18181b] mb-3">{w.title}</h3>
                    <p className="text-sm text-[#6b6559] font-normal leading-relaxed">
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
