import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";
import {
  Compass,
  Sliders,
  Award,
  Users,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  MapPin,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Hause Interiors | Interior Design Studio Delhi NCR",
  description:
    "Learn about Hause Interiors — our story, design philosophy, in-house team, and how we bring architectural rigor and transparent execution to homes and workspaces across Delhi NCR and pan-India.",
};

const PHILOSOPHIES = [
  {
    num: "01",
    title: "Form Follows Function, Always",
    desc: "A beautiful space that does not work for your daily routine is an incomplete design. We start with circulation, ergonomic flow, and storage before layering finishes and aesthetics.",
    icon: Compass,
  },
  {
    num: "02",
    title: "Honesty in Materials & Pricing",
    desc: "We specify genuine materials — BWP marine-grade plywood, authentic quartz, branded hardware — and cost them transparently in an itemised BOQ so you never face hidden surprises.",
    icon: Sliders,
  },
  {
    num: "03",
    title: "Single-Point Accountability",
    desc: "No finger-pointing between designers and contractors. We own the design, civil work, carpentry, MEP coordination, and final styling under one unified team.",
    icon: ShieldCheck,
  },
  {
    num: "04",
    title: "Rigorous Site Supervision",
    desc: "Great design lives or dies in execution. Every project across Delhi NCR is personally overseen by permanent on-site supervisors to ensure millimeter precision.",
    icon: Award,
  },
];

const VALUES = [
  {
    title: "Transparency First",
    desc: "Zero hidden markups. You see itemised costs, material brand grades, and milestone schedules before signing.",
  },
  {
    title: "Design Rigor",
    desc: "We balance timeless architectural aesthetics with practical daily usability tailored to your lifestyle.",
  },
  {
    title: "Reliability & Timelines",
    desc: "We commit to locked delivery milestones and back our timelines with daily on-ground project tracking.",
  },
  {
    title: "Client-First Collaboration",
    desc: "We don't impose cookie-cutter trends. Your functional priorities, habits, and tastes guide every decision.",
  },
];

const GALLERY_PREVIEWS = [
  { src: "/images/jaiswal/jaiswal-06.jpg", title: "Living & Media Lounge", tag: "Architectural Joinery" },
  { src: "/images/jaiswal/jaiswal-12.jpg", title: "Master Suite & Paneling", tag: "Warm Minimalism" },
  { src: "/images/jaiswal/jaiswal-18.jpg", title: "Gourmet Modular Kitchen", tag: "Custom Cabinetry" },
  { src: "/images/jaiswal/jaiswal-24.jpg", title: "Accent Lighting & Textures", tag: "Material Craft" },
];

export default function AboutPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="About Hause Interiors"
          title="Spaces designed with purpose. Delivered with precision."
          subtitle="We are an interior design and turnkey execution studio based in Delhi NCR. We bridge the gap between high-end architectural design and disciplined on-ground delivery."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "About Us" },
          ]}
          bgImage="/images/jaiswal/jaiswal-01.jpg"
          primaryCtaText="Book a Free Consultation"
          primaryCtaHref="/contact"
          secondaryCtaText="View Our Work"
          secondaryCtaHref="/projects"
        />

        {/* SECTION 1: Studio Story (Crisp Light Ivory Background: #f9f8f6) */}
        <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[#18181b] leading-tight">
                Born from digital precision. Built for physical spaces.
              </h2>
              <p className="text-sm sm:text-base text-[#6b6559] font-normal leading-relaxed">
                Hause Interiors grew out of a digital design and technology studio built on measurable outcomes, obsessive attention to detail, and transparent communication. We realized that while 3D interior renders look stunning on screen, physical execution in India was plagued by broken promises, hidden costs, and chaotic contractor hand-offs.
              </p>
              <p className="text-sm sm:text-base text-[#6b6559] font-normal leading-relaxed">
                We built Hause Interiors to provide a single, accountable partner for homeowners and businesses — combining spatial architecture, photorealistic 3D visualization, detailed Bill of Quantities (BOQ) costing, and end-to-end site execution under one roof.
              </p>
              
              <div className="pt-6 grid grid-cols-3 gap-6 border-t border-black/10 text-xs">
                <div>
                  <div className="text-3xl font-light text-[#18181b]">100+</div>
                  <div className="text-[#8a8578] mt-1 uppercase tracking-wider font-medium">Spaces Delivered</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-[#18181b]">5 Metros</div>
                  <div className="text-[#8a8578] mt-1 uppercase tracking-wider font-medium">Delhi NCR Hubs</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-[#18181b]">Pan-India</div>
                  <div className="text-[#8a8578] mt-1 uppercase tracking-wider font-medium">Delivery Network</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-black/10 shadow-2xl group">
              <Image
                src="/images/jaiswal/jaiswal-03.jpg"
                alt="Hause Interiors Executed Living Space"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/80 font-semibold block">
                  Featured Project
                </span>
                <p className="text-sm font-medium mt-1">
                  Living room joinery, ambient lighting &amp; fluted wall paneling executed in Delhi NCR.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Guiding Principles (Warm Sand / Stone Beige Background: #f3efea) */}
        <section className="py-28 px-6 sm:px-12 md:px-16 bg-[#f3efea] text-[#18181b] border-t border-black/10">
          <div className="max-w-[1280px] mx-auto space-y-16">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                Guiding Principles
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-normal tracking-tight text-[#18181b] leading-tight">
                Our Design Philosophy
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#6b6559] font-normal leading-relaxed">
                We believe exceptional spaces are born from deliberate constraints, relentless attention to detail, and a deep empathy for the people who inhabit them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PHILOSOPHIES.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.num}
                    className="p-8 sm:p-10 bg-white/90 backdrop-blur-sm border border-black/10 hover:border-black/25 rounded-2xl transition-all shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-full bg-[#18181b] text-white flex items-center justify-center shadow-md">
                          <Icon size={20} />
                        </div>
                        <span className="text-xs font-mono text-[#8a8578] tracking-widest font-semibold">{p.num}</span>
                      </div>
                      <h3 className="text-xl font-medium text-[#18181b] mb-3 tracking-tight">
                        {p.title}
                      </h3>
                      <p className="text-sm text-[#6b6559] font-normal leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: Execution Network & Craftsmanship (Dark Obsidian: #0c0d0e) */}
        <section className="py-28 px-6 sm:px-12 md:px-16 bg-[#0c0d0e] text-[#f3efea] border-t border-white/10">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative aspect-square rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
              <Image
                src="/images/jaiswal/jaiswal-10.jpg"
                alt="Design and Project Supervision Team"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/70 font-semibold block">
                  On-Site Craftsmanship
                </span>
                <p className="text-sm font-medium mt-1">
                  100% on-ground site supervision by dedicated project architects.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold tracking-[0.22em] text-white/50 uppercase">
                The People Behind The Craft
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white leading-tight">
                Our Team &amp; Execution Network
              </h2>
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                Hause Interiors is run by an in-house team of interior designers and project managers, supported by empanelled architects, site supervisors, and a vetted network of carpentry, electrical, civil, and fabrication partners.
              </p>
              
              <div className="space-y-3.5 pt-2 text-xs sm:text-sm text-white/80">
                <div className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-white/60 shrink-0" />
                  <span>Dedicated in-house spatial designers &amp; photorealistic 3D renderers</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-white/60 shrink-0" />
                  <span>Permanent on-site supervisors assigned to every Delhi NCR project</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-white/60 shrink-0" />
                  <span>Empanelled MEP and structural engineering consultants</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-white/60 shrink-0" />
                  <span>Factory-partnered modular cabinetry production facilities in NCR</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Visual Gallery Ribbon (Photo Showcase from Jaiswal Portfolio) */}
        <section className="py-20 px-6 sm:px-12 md:px-16 bg-[#121316] border-t border-white/10">
          <div className="max-w-[1280px] mx-auto space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-semibold tracking-[0.22em] text-white/50 uppercase">
                  Craft &amp; Detailing
                </span>
                <h3 className="mt-2 text-2xl sm:text-3xl font-medium text-white">
                  Materials, Joinery &amp; Built Environments
                </h3>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-white hover:text-white/80 transition-colors"
              >
                <span>View Full Portfolio</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {GALLERY_PREVIEWS.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-[#18191c] shadow-lg cursor-pointer"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[10px] uppercase tracking-wider text-white/60 font-semibold block">
                      {item.tag}
                    </span>
                    <h4 className="text-sm font-medium text-white mt-1">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: Values Grid (Crisp Light Ivory Background: #f9f8f6) */}
        <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b] border-t border-black/10">
          <div className="max-w-[1280px] mx-auto space-y-14">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                What We Stand For
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-normal tracking-tight text-[#18181b] leading-tight">
                Our Values
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map((val, idx) => (
                <div
                  key={idx}
                  className="p-7 bg-white border border-black/10 rounded-2xl shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono text-[#8a8578] block mb-4 font-semibold">0{idx + 1}</span>
                    <h3 className="text-lg font-medium text-[#18181b] mb-2.5">{val.title}</h3>
                    <p className="text-xs sm:text-sm text-[#6b6559] font-normal leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Where We Work Overview */}
        <section className="py-20 px-6 sm:px-12 md:px-16 bg-[#0c0d0e] border-t border-white/10">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-semibold tracking-[0.22em] text-white/50 uppercase">
                Location &amp; Reach
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium text-white">
                Serving All of Delhi NCR &amp; Select Pan-India Projects
              </h2>
              <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                Headquartered in Ghaziabad with on-ground execution teams actively operating across Delhi, Gurugram, Noida, Greater Noida, and Faridabad.
              </p>
            </div>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black text-xs font-semibold tracking-wider uppercase hover:bg-neutral-200 transition-colors rounded-full shadow-lg shrink-0"
            >
              <span>Explore Locations</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Global CTA */}
        <CTASection bgImage="/images/jaiswal/jaiswal-01.jpg" />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
