import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";
import { ShieldCheck, FileCheck, Target, Eye, Globe, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Why Choose Hause Interiors | Interior Design Company Delhi NCR",
  description:
    "Transparent costing, single-point accountability, and on-time delivery — here's why homeowners and businesses across Delhi NCR choose Hause Interiors.",
};

const PILLARS = [
  {
    num: "01",
    title: "Single Point of Responsibility",
    tag: "Zero Vendor Friction",
    desc: "Design and execution sit under one team, so there's no gap between the person who designed your space and the person building it — and no finger-pointing when something needs to change.",
    details: [
      "In-house architectural designers and site civil supervisors",
      "No vendor hand-off gaps or conflicting timelines",
      "One dedicated project manager as your single point of contact",
    ],
    icon: ShieldCheck,
  },
  {
    num: "02",
    title: "Transparent, BOQ-Based Costing",
    tag: "No Hidden Surprises",
    desc: "Every project is costed against a detailed Bill of Quantities before work begins, so you know what you're paying for at every stage — not just a lump-sum estimate with room for surprises.",
    details: [
      "Itemised breakdown for civil, carpentry, electrical, and paint",
      "Transparent material brand grades and hardware models",
      "Milestone-linked disbursements aligned with site progress",
    ],
    icon: FileCheck,
  },
  {
    num: "03",
    title: "Design with a Business Mindset",
    tag: "Rigorous Delivery Discipline",
    desc: "Hause Interiors grew out of a digital agency built on measurable outcomes. We bring that same discipline to interiors — clear scopes, realistic timelines, and decisions grounded in your budget and how the space will actually be used.",
    details: [
      "Pragmatic material selection that balances luxury and longevity",
      "Strict scope discipline preventing mid-project budget runaway",
      "Spatial circulation designed around daily ergonomic utility",
    ],
    icon: Target,
  },
  {
    num: "04",
    title: "On-Ground Site Supervision",
    tag: "Hands-On Quality Assurance",
    desc: "Projects in Delhi NCR are personally supervised at every key stage, from civil work to final styling — not managed purely over phone calls and photos.",
    details: [
      "Permanent site supervisors at Delhi NCR locations",
      "Daily checklist inspections and weekly photo/video reports",
      "Zero tolerance for substandard joinery, misalignments, or finishing flaws",
    ],
    icon: Eye,
  },
  {
    num: "05",
    title: "Pan-India Delivery Capability",
    tag: "Scale & Consistency",
    desc: "For clients outside Delhi NCR, we combine remote design and project management with vetted on-ground execution partners, so the same process and accountability apply wherever the project is.",
    details: [
      "Comprehensive drawing packages and 3D specifications",
      "Video walkthrough milestone reviews with clients anywhere in the world",
      "Empanelled, vetted local execution teams across major Indian metros",
    ],
    icon: Globe,
  },
];

export default function WhyHausePage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Why Choose Hause"
          title="More than a design studio — a space partner."
          subtitle="Anyone can make a space look good in a render. What's harder is delivering it on time, on budget, and exactly as designed. That's the gap Hause Interiors is built to close."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Why Us" },
          ]}
          bgImage="/images/jaiswal/jaiswal-02.jpg"
          primaryCtaText="Talk to Us About Your Project"
          primaryCtaHref="/contact"
          secondaryCtaText="Explore Our Work"
          secondaryCtaHref="/projects"
        />

        {/* SECTION 1: 5 Pillars (Crisp Light Ivory Background: #f9f8f6) */}
        <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
          <div className="max-w-[1280px] mx-auto space-y-16">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                The Hause Foundation
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[#18181b] leading-tight">
                Built on five core principles of accountability.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                const isSpanTwo = idx === 0 || idx === 3;

                return (
                  <div
                    key={pillar.num}
                    className={`p-8 sm:p-10 bg-white border border-black/10 hover:border-black/25 rounded-2xl transition-all flex flex-col justify-between shadow-sm ${
                      isSpanTwo ? "lg:col-span-2" : "lg:col-span-1"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-full bg-[#18181b] text-white flex items-center justify-center shadow-md">
                          <Icon size={22} />
                        </div>
                        <span className="text-xs font-mono text-[#8a8578] tracking-widest font-semibold">{pillar.num}</span>
                      </div>

                      <span className="text-[10px] font-semibold tracking-wider text-[#8a8578] uppercase block mb-1">
                        {pillar.tag}
                      </span>
                      <h3 className="text-2xl font-medium text-[#18181b] mb-3 tracking-tight">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-[#6b6559] font-normal leading-relaxed mb-6">
                        {pillar.desc}
                      </p>

                      <div className="border-t border-black/10 pt-4 space-y-2">
                        {pillar.details.map((d, di) => (
                          <div key={di} className="flex items-start gap-2.5 text-xs text-[#18181b]/85">
                            <CheckCircle2 size={14} className="text-[#8a8578] shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 2: Comparison (Warm Sand Background: #f3efea) */}
        <section className="py-28 px-6 sm:px-12 md:px-16 bg-[#f3efea] text-[#18181b] border-t border-black/10">
          <div className="max-w-[1280px] mx-auto space-y-12">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                The Difference
              </span>
              <h3 className="mt-3 text-3xl sm:text-4xl font-normal text-[#18181b] leading-tight">
                Traditional Interior Contractors vs. Hause Interiors
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white border border-red-500/30 rounded-2xl space-y-4 shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-red-600">
                  Traditional Multi-Vendor Route
                </span>
                <ul className="space-y-3 text-xs sm:text-sm text-[#6b6559]">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>Designer hands off blueprints to third-party contractor with no supervision.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>Lump-sum estimates that balloon with 30-50% extra &quot;variation&quot; charges mid-project.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>Finger-pointing between carpenter, plumber, and electrician when measurements fail.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>Deadlines slipping months past handover with zero financial accountability.</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-[#18181b] text-white border border-black/20 rounded-2xl space-y-4 shadow-xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
                  The Hause Interiors Standard
                </span>
                <ul className="space-y-3 text-xs sm:text-sm text-white/90">
                  <li className="flex items-start gap-2">
                    <span className="text-white font-bold">✓</span>
                    <span>Single accountable team managing 3D design, civil work, carpentry, and styling.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white font-bold">✓</span>
                    <span>Itemised BOQ before signing with locked material pricing and zero hidden costs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white font-bold">✓</span>
                    <span>Permanent on-site supervisors ensuring joinery matches 3D renders with mm precision.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white font-bold">✓</span>
                    <span>Contractual delivery milestones and weekly transparent progress reporting.</span>
                  </li>
                </ul>
              </div>
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
