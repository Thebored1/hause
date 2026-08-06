import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";
import { Star, MapPin, CheckCircle, ArrowRight, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials | Hause Interiors Delhi NCR",
  description:
    "Read what homeowners and businesses across Delhi NCR say about working with Hause Interiors for their interior design projects.",
};

const TESTIMONIALS = [
  {
    client: "Vikram & Ananya Malhotra",
    designation: "Homeowners",
    project: "3BHK Turnkey Interior",
    location: "Vaishali, Ghaziabad",
    rating: 5,
    quote:
      "What stood out most was the adherence to the initial BOQ. There were zero surprise costs mid-execution. The site supervisor was present every single day, and the finished carpentry and lighting match the 3D renders down to the millimeter.",
    tags: ["Turnkey Interior", "BWP Plywood", "On-Time Handover"],
  },
  {
    client: "Sameer Saxena",
    designation: "Managing Director, CloudTech Solutions",
    project: "Corporate Workspace Fit-Out (4,800 sq. ft.)",
    location: "Cyber City, Gurugram",
    rating: 5,
    quote:
      "Hause Interiors executed our office fit-out on a strict 10-week schedule before our team's move-in date. Their MEP coordination and acoustic partition execution were flawless. Highly recommend them for commercial work.",
    tags: ["Commercial Office", "Acoustic Partitioning", "Minimal Downtime"],
  },
  {
    client: "Pooja & Karan Mehra",
    designation: "Homeowners",
    project: "Parallel Modular Kitchen & Master Suite",
    location: "Sector 62, Noida",
    rating: 5,
    quote:
      "Our kitchen is easily the most used room in our house. The storage ergonomics, soft-close hardware, and quartz countertop prep zones were planned with incredible precision. Truly a functional masterpiece.",
    tags: ["Modular Kitchen", "Acrylic Shutters", "Custom Wardrobes"],
  },
  {
    client: "Rohit Singhal",
    designation: "Villa Owner",
    project: "Structural Renovation & Interior Remodel",
    location: "Greater Kailash, South Delhi",
    rating: 5,
    quote:
      "Renovating a 20-year-old property while keeping structural integrity was daunting. Hause handled the civil alterations, new plumbing, and modern wood finishes with utter professionalism. The house feels brand new.",
    tags: ["Full Renovation", "Italian Marble", "False Ceiling"],
  },
  {
    client: "Deepika Sen",
    designation: "Founder, Bloom Dental Clinic",
    project: "Healthcare Clinic Interior",
    location: "Indirapuram, Ghaziabad",
    rating: 5,
    quote:
      "Patients constantly compliment our clinic's calming, minimalist aesthetic. The soothing lighting, durable anti-microbial surfaces, and efficient reception flow make everyday operations seamless.",
    tags: ["Healthcare Commercial", "Lobby Design", "Custom Cabinetry"],
  },
  {
    client: "Arjun Nambiar",
    designation: "NRI Homeowner (Singapore)",
    project: "Remote Turnkey Apartment Interior",
    location: "Dwarka Expressway, Gurugram",
    rating: 5,
    quote:
      "Managing an interior project from Singapore felt impossible until we partnered with Hause. Weekly video walkthroughs, transparent milestone reports, and flawless handover without me having to travel to India once.",
    tags: ["Remote Turnkey", "Pan-India / NRI", "Video Site Audits"],
  },
];

const COMPLETED_PHOTOS = [
  { src: "/images/jaiswal/jaiswal-04.jpg", title: "Living & Media Unit — Vaishali" },
  { src: "/images/jaiswal/jaiswal-10.jpg", title: "Master Bed & Lighting — Sector 62" },
  { src: "/images/jaiswal/jaiswal-19.jpg", title: "Dining & Fluted Paneling — GK" },
];

export default function TestimonialsPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Client Stories"
          title="What clients say about working with us."
          subtitle="Real reviews from homeowners and business leaders across Delhi NCR who trusted Hause Interiors with their residential and commercial spaces."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Testimonials" },
          ]}
          bgImage="/images/jaiswal/jaiswal-14.jpg"
          primaryCtaText="Book a Free Consultation"
          primaryCtaHref="/contact"
          secondaryCtaText="View Portfolio"
          secondaryCtaHref="/projects"
        />

        {/* SECTION 1: Rating Summary Bar (Warm Sand: #f3efea) */}
        <section className="py-8 px-6 sm:px-12 md:px-16 bg-[#f3efea] text-[#18181b] border-b border-black/10">
          <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="font-semibold text-[#18181b]">4.9 / 5.0 Average Client Satisfaction</span>
            </div>
            <div className="flex items-center gap-6 text-[#6b6559] font-medium">
              <span>100+ Spaces Delivered</span>
              <span>•</span>
              <span>100% On-Ground Site Supervision</span>
            </div>
          </div>
        </section>

        {/* SECTION 2: Testimonials Grid (Crisp Light Ivory Background: #f9f8f6) */}
        <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-8 bg-white border border-black/10 hover:border-black/25 rounded-2xl transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex text-amber-500 gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <Quote size={20} className="text-[#8a8578]/40" />
                  </div>

                  <p className="text-sm text-[#18181b] font-normal leading-relaxed mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {t.tags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="px-3 py-1 bg-[#f3efea] border border-black/5 text-[10px] text-[#6b6559] uppercase tracking-wider rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-black/10 pt-4">
                  <h4 className="text-base font-medium text-[#18181b]">{t.client}</h4>
                  <p className="text-xs text-[#8a8578]">{t.designation}</p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-[#6b6559]">
                    <MapPin size={12} className="text-[#8a8578]" />
                    <span>{t.project} · {t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Completed Spaces Snapshot (Dark Obsidian Background: #0c0d0e) */}
        <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#0c0d0e] border-t border-white/10 text-white">
          <div className="max-w-[1280px] mx-auto space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-semibold tracking-[0.22em] text-white/50 uppercase">
                  Proof of Work
                </span>
                <h3 className="mt-2 text-2xl sm:text-3xl font-medium text-white">
                  Handed-Over Residential &amp; Commercial Spaces
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {COMPLETED_PHOTOS.map((p, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group">
                  <Image
                    src={p.src}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-sm font-medium text-white">{p.title}</p>
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
