import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";
import { Check, Building2, Clock, Users, ShieldAlert, ArrowRight, LayoutGrid, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Commercial & Office Interior Designers in Delhi NCR | Hause Interiors",
  description:
    "Commercial, office, retail and hospitality interior design and turnkey fit-outs in Delhi NCR — designed for team productivity, brand presence, and minimal downtime.",
};

const COMMERCIAL_TYPES = [
  {
    title: "Corporate Offices & Tech Workspaces",
    desc: "Agile desks, private acoustic focus booths, boardrooms, and open collaboration areas built for high-performing teams.",
  },
  {
    title: "Co-Working & Managed Spaces",
    desc: "Flexible, high-density layouts optimized for spatial efficiency, hot-desking, shared breakout lounges, and community cafes.",
  },
  {
    title: "Retail Stores & Brand Showrooms",
    desc: "Customer-first spatial flow, spotlight display fixtures, seamless POS zones, and luxury trial rooms that elevate brand perception.",
  },
  {
    title: "Cafes, Restaurants & Dining Spaces",
    desc: "Atmospheric layered lighting, acoustic control, ergonomic seating, commercial kitchen layouts, and guest circulation planning.",
  },
  {
    title: "Clinics & Professional Practice Studios",
    desc: "Hygienic, anti-microbial finishes, calming reception waiting lounges, sound-isolated consultation chambers, and organized utility storage.",
  },
];

const COMMERCIAL_PILLARS = [
  {
    title: "Minimal Disruption & Fast Delivery",
    desc: "We understand that business downtime costs money. We plan phased fit-outs, weekend work schedules, and pre-fabricated modular joinery to minimize handover delays.",
    icon: Clock,
  },
  {
    title: "Brand-First Design",
    desc: "Your workspace is the physical expression of your company culture and values. We integrate your brand identity into materials, signage, and environmental design.",
    icon: LayoutGrid,
  },
  {
    title: "Integrated MEP & Acoustic Planning",
    desc: "HVAC distribution, structured data cabling, emergency lighting, and acoustic dampening are planned seamlessly alongside aesthetic elements.",
    icon: Zap,
  },
];

export default function CommercialServicePage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Commercial & Office"
          title="Workspaces that work as hard as your team."
          subtitle="An office is not just desks and chairs — it's where your team collaborates, your clients form impressions, and your culture is lived. Hause Interiors delivers commercial interiors across Delhi NCR designed for productivity and brand impact."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Commercial & Office" },
          ]}
          bgImage="/images/service-commercial.jpg"
          primaryCtaText="Discuss Your Office Fit-Out"
          primaryCtaHref="/contact"
          secondaryCtaText="View Commercial Portfolio"
          secondaryCtaHref="/projects"
        />

        {/* SECTION 1: Commercial Scope (Crisp Light Ivory Background: #f9f8f6) */}
        <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                Tailored Commercial Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[#18181b] leading-tight">
                Spaces We Design &amp; Fit Out
              </h2>
              <p className="text-sm sm:text-base text-[#6b6559] font-normal leading-relaxed">
                From fast-scaling tech companies to bespoke luxury retail showrooms, we provide full turnkey fit-out and architectural interior services.
              </p>

              <div className="space-y-4 pt-2">
                {COMMERCIAL_TYPES.map((item, idx) => (
                  <div key={idx} className="p-5 bg-white border border-black/10 rounded-2xl shadow-sm">
                    <h3 className="text-base font-medium text-[#18181b] mb-1">{item.title}</h3>
                    <p className="text-xs text-[#6b6559] font-normal leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative min-h-[380px] h-full rounded-3xl overflow-hidden border border-black/10 shadow-2xl group">
              <Image
                src="/images/service-commercial.jpg"
                alt="Modern Tech Office Fit-Out"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </section>

        {/* SECTION 2: Why Businesses Choose Hause (Warm Sand Background: #f3efea) */}
        <section className="py-28 px-6 sm:px-12 md:px-16 bg-[#f3efea] text-[#18181b] border-t border-black/10">
          <div className="max-w-[1280px] mx-auto space-y-16">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                Commercial Advantage
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-normal tracking-tight text-[#18181b] leading-tight">
                Why Businesses Choose Hause Interiors
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#6b6559] font-normal leading-relaxed">
                We treat commercial projects with strict project governance, clear milestones, and complete fiscal transparency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {COMMERCIAL_PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-8 bg-white border border-black/10 rounded-2xl flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-full bg-[#18181b] text-white flex items-center justify-center mb-6 shadow-md">
                        <Icon size={20} />
                      </div>
                      <h3 className="text-xl font-medium text-[#18181b] mb-3 tracking-tight">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-[#6b6559] font-normal leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
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
