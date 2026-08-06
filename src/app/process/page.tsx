import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";
import { CheckCircle2, Clock, FileText, Eye, Hammer, Sparkles, ArrowRight, ShieldCheck, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Interior Design Process | Hause Interiors Delhi NCR",
  description:
    "From first consultation to final handover — see how Hause Interiors plans, designs and executes interior projects in Delhi NCR and pan-India.",
};

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery & Site Visit",
    tag: "Phase 1 · Week 1",
    subtitle: "Understanding your lifestyle, constraints, and aspirations.",
    desc: "We visit the site (or conduct high-definition video walkthroughs and architectural drawing analysis for pan-India projects), understand how the space will be used, and discuss budget, timelines and must-haves upfront — before any design work begins.",
    deliverables: [
      "Physical site laser-measurement & structural assessment",
      "Lifestyle & daily routine discovery questionnaire",
      "Preliminary scope document and ballpark budget alignment",
      "Tentative project roadmap with key milestone dates",
    ],
    image: "/images/jaiswal/jaiswal-01.jpg",
    theme: "light",
  },
  {
    num: "02",
    title: "Design & 3D Visualization",
    tag: "Phase 2 · Weeks 2–3",
    subtitle: "Seeing your space with photorealistic clarity before physical work starts.",
    desc: "Layouts, mood boards and detailed 3D renders let you see and approve the design before execution starts, so there are no surprises once work is underway.",
    deliverables: [
      "2D space-planning & furniture circulation layouts",
      "Photorealistic 3D interior renders (lighting, colors, textures)",
      "Detailed CAD working drawings (electrical, plumbing, ceiling)",
      "Material moodboards with physical swatch recommendations",
    ],
    image: "/images/jaiswal/jaiswal-03.jpg",
    theme: "sand",
  },
  {
    num: "03",
    title: "Material Selection & Costing",
    tag: "Phase 3 · Week 3–4",
    subtitle: "Total transparency with zero hidden overheads.",
    desc: "Every material and finish is selected and costed into a detailed Bill of Quantities (BOQ), so you know exactly what you're paying for before work begins.",
    deliverables: [
      "Itemised, line-by-line Bill of Quantities (BOQ)",
      "Material brand specifications (plywood grade, laminate brands, hardware)",
      "Studio material library walkthrough in Ghaziabad",
      "Fixed payment milestone schedule tied directly to site progress",
    ],
    image: "/images/jaiswal/jaiswal-12.jpg",
    theme: "dark",
  },
  {
    num: "04",
    title: "Execution & Site Management",
    tag: "Phase 4 · Weeks 4–12",
    subtitle: "Personal on-ground supervision at every stage.",
    desc: "Civil, electrical, carpentry, and finishing work is carried out under continuous site supervision, with scheduled progress updates so you're never left wondering where the project stands.",
    deliverables: [
      "Dedicated on-site project manager for Delhi NCR projects",
      "Weekly photo & video progress reports delivered to you",
      "Quality assurance inspection at every milestone",
      "Factory-precision modular cabinetry fabrication & assembly",
    ],
    image: "/images/jaiswal/jaiswal-10.jpg",
    theme: "light",
  },
  {
    num: "05",
    title: "Handover & Styling",
    tag: "Phase 5 · Weeks 12–14",
    subtitle: "Moving into a finished home, not a construction site.",
    desc: "Before handover, every space goes through a defect-check walkthrough, followed by final styling — soft furnishings, decor, and finishing touches — so the space is ready to move into, not just structurally complete.",
    deliverables: [
      "100-point rigorous defect-free checklist walkthrough",
      "Deep industrial cleaning and air purification",
      "Soft furnishings styling (drapes, cushions, rugs, lighting, decor)",
      "Warranty documentation pack and formal keys handover",
    ],
    image: "/images/jaiswal/jaiswal-17.jpg",
    theme: "sand",
  },
];

export default function ProcessPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Our Delivery Process"
          title="A process built for spaces that get delivered on time."
          subtitle="Interior projects go over budget and past deadline when there's no single process holding them together. Here's how we structure ours."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Our Process" },
          ]}
          bgImage="/images/jaiswal/jaiswal-09.jpg"
          primaryCtaText="Start With a Discovery Call"
          primaryCtaHref="/contact"
          secondaryCtaText="View Portfolio"
          secondaryCtaHref="/projects"
        />

        {/* 5-Step Process Deep Dive (Alternating Rich Themes) */}
        <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
          <div className="max-w-[1280px] mx-auto space-y-12">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                Five Structured Milestones
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[#18181b] leading-tight">
                From initial site survey to move-in day.
              </h2>
            </div>

            {PROCESS_STEPS.map((step, idx) => {
              const isDark = step.theme === "dark";
              const isSand = step.theme === "sand";

              return (
                <div
                  key={step.num}
                  className={`p-8 sm:p-12 lg:p-14 rounded-3xl transition-all grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-lg ${
                    isDark
                      ? "bg-[#141618] text-white border border-white/10"
                      : isSand
                      ? "bg-[#f3efea] text-[#18181b] border border-black/10"
                      : "bg-white text-[#18181b] border border-black/10"
                  }`}
                >
                  <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className={`text-4xl sm:text-5xl font-light font-mono ${
                        isDark ? "text-white/40" : "text-[#8a8578]"
                      }`}>
                        {step.num}
                      </span>
                      <span className={`px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase ${
                        isDark
                          ? "bg-white/10 text-white border border-white/15"
                          : "bg-black/5 text-[#18181b] border border-black/10"
                      }`}>
                        {step.tag}
                      </span>
                    </div>

                    <h3 className={`text-2xl sm:text-3xl font-normal tracking-tight leading-tight ${
                      isDark ? "text-white" : "text-[#18181b]"
                    }`}>
                      {step.title}
                    </h3>

                    <p className={`text-xs sm:text-sm font-medium ${
                      isDark ? "text-white/60" : "text-[#8a8578]"
                    }`}>
                      {step.subtitle}
                    </p>
                  </div>

                  <div className="lg:col-span-5 space-y-6">
                    <p className={`text-sm sm:text-base font-normal leading-relaxed ${
                      isDark ? "text-white/80 font-light" : "text-[#6b6559]"
                    }`}>
                      {step.desc}
                    </p>

                    <div className={`border-t pt-6 ${
                      isDark ? "border-white/10" : "border-black/10"
                    }`}>
                      <h4 className={`text-xs font-semibold tracking-wider uppercase mb-4 ${
                        isDark ? "text-white/50" : "text-[#8a8578]"
                      }`}>
                        Key Deliverables In This Phase:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.deliverables.map((del, di) => (
                          <div
                            key={di}
                            className={`flex items-start gap-2.5 text-xs ${
                              isDark ? "text-white/80" : "text-[#18181b]/90"
                            }`}
                          >
                            <CheckCircle2 size={15} className={`shrink-0 mt-0.5 ${
                              isDark ? "text-white/50" : "text-[#8a8578]"
                            }`} />
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-3 relative aspect-[4/3] rounded-2xl overflow-hidden border border-black/10 shadow-md group">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION: Strict Quality & Transparency (Warm Sand: #f3efea) */}
        <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f3efea] text-[#18181b] border-t border-black/10">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                The Hause Commitment
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#18181b]">
                Locked BOQs. No Cost Escalations.
              </h2>
              <p className="text-xs sm:text-sm text-[#6b6559] font-normal leading-relaxed">
                Once the scope of work and 3D visualization are approved, our Bill of Quantities remains locked. No mid-project price surprises or hidden contractor markups.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#18181b] text-white text-xs font-bold tracking-wider uppercase hover:bg-black transition-colors rounded-full shadow-lg shrink-0"
            >
              <span>Book Discovery Call</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Global CTA */}
        <CTASection bgImage="/images/jaiswal/jaiswal-24.jpg" />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
