"use client";

import React from "react";
import Link from "next/link";
import { Zap, Globe, Sparkles, Home, Layers, Box, ArrowRight, ArrowUpRight } from "lucide-react";

const ICONS = { home: Home, globe: Globe, sparkles: Sparkles, zap: Zap, layers: Layers, box: Box } as const;
export type ServiceIcon = keyof typeof ICONS;

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  icon: ServiceIcon;
  href: string;
}

/**
 * Content-driven: every prop defaults to the copy this page has
 * always shipped, so existing usage is unchanged, while a CMS can
 * pass the same shape to drive it.
 */
interface ServicesGridProps {
  onOpenContact?: () => void;
  ctaHref?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  featureImage?: string;
  statLabel?: string;
  statValue?: string;
  statBody?: string;
  ctaLabel?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  services?: ServiceItem[];
}

const SERVICES: ServiceItem[] = [
  {
    number: "01",
    title: "Residential Interior Design",
    description: "Full-home and room-wise design for apartments, villas and builder-floor homes — living rooms, bedrooms, kitchens and everything in between.",
    icon: "home",
    href: "/services/residential-interior-design",
  },
  {
    number: "02",
    title: "Commercial & Office Design",
    description: "Offices, retail stores, showrooms, cafes and clinics designed to reflect your brand and support how your team and customers move through the space.",
    icon: "globe",
    href: "/services/commercial-office-interior-design",
  },
  {
    number: "03",
    title: "Modular Kitchens & Wardrobes",
    description: "Custom kitchen and wardrobe layouts engineered for storage, durability, and everyday use — not just a pretty render.",
    icon: "sparkles",
    href: "/services/modular-kitchen-wardrobe-design",
  },
  {
    number: "04",
    title: "Turnkey Interior Solutions",
    description: "One team handles design, civil work, electrical, carpentry, and styling — a single point of accountability from day one to handover.",
    icon: "zap",
    href: "/services/turnkey-interior-solutions",
  },
  {
    number: "05",
    title: "Renovation & Remodeling",
    description: "Refresh a tired home or reconfigure an outdated office layout without starting from scratch.",
    icon: "layers",
    href: "/services/renovation-remodeling",
  },
  {
    number: "06",
    title: "3D Visualization & Design Consultation",
    description: "See your space before it’s built, with detailed 3D visuals and material mock-ups that remove the guesswork from decision-making.",
    icon: "box",
    href: "/services",
  },
];

export default function ServicesGrid({
  onOpenContact,
  ctaHref = "/contact",
  eyebrow = "Services",
  title = "Interior design services that work for the way you live.",
  intro = "Whether it's a first home, a growing office, or a retail space that needs to convert footfall into sales, Hause Interiors designs around how a space is actually used — then builds it to hold up.",
  featureImage = "/images/sp-living.jpg",
  statLabel = "Site Supervision",
  statValue = "100%",
  statBody = "Every project is personally supervised on site by our own team, from the first day of civil work to final styling.",
  ctaLabel = "Book a free consultation",
  viewAllLabel = "View All Services",
  viewAllHref = "/services",
  services = SERVICES,
}: ServicesGridProps) {
  return (
    <section id="overview" className="bg-[#f9f8f6] text-[#18181b] py-24 px-6 sm:px-12 md:px-16">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14">
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
              {eyebrow}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-[44px] font-normal tracking-[-0.03em] leading-[1.12] text-[#18181b] max-w-[620px]">
              {title}
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="m-0 text-sm sm:text-base text-[#6b6559] leading-[1.7] max-w-[420px]">
              {intro}
            </p>
          </div>
        </div>

        {/* Feature Hero Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-8 rounded-3xl overflow-hidden relative min-h-[340px] md:min-h-[420px]">
            <img
              src={featureImage}
              alt="Showroom interior"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-4 rounded-3xl bg-white border border-black/6 p-8 md:p-[36px] flex flex-col justify-between min-h-[340px] md:min-h-[420px]">
            <div>
              <span className="text-xs text-[#8a8578] font-semibold tracking-[0.18em] uppercase">
                {statLabel}
              </span>
              <div className="text-5xl md:text-6xl font-light text-[#18181b] tracking-[-0.03em] mt-3 leading-none">
                {statValue}
              </div>
              <p className="mt-4 text-sm text-[#6b6559] leading-[1.65]">{statBody}</p>
            </div>
            {onOpenContact ? (
              <button onClick={onOpenContact} className="self-start rounded-full bg-[#171717] text-white px-6 py-3 text-xs font-semibold hover:bg-neutral-800 transition-all border-none cursor-pointer mt-6">
                {ctaLabel}
              </button>
            ) : (
              <Link href={ctaHref} className="self-start rounded-full bg-[#171717] text-white px-6 py-3 text-xs font-semibold hover:bg-neutral-800 transition-all border-none cursor-pointer mt-6 inline-block">
                {ctaLabel}
              </Link>
            )}
          </div>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-black/10 rounded-3xl overflow-hidden bg-white/40 backdrop-blur-sm">
          {services.map((srv, idx) => {
            const Icon = ICONS[srv.icon] ?? Home;
            const isBorderLeft = idx % 3 !== 0;
            const isBorderTop = idx >= 3;

            return (
              <Link
                key={srv.number}
                href={srv.href}
                className={`group p-8 sm:p-[36px] flex flex-col justify-between gap-6 transition-colors duration-200 hover:bg-white/80 ${
                  isBorderLeft ? "md:border-l md:border-black/10" : ""
                } ${isBorderTop ? "border-t border-black/10" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-[#18181b] flex group-hover:scale-110 transition-transform">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs tracking-[0.18em] text-[#a19c8f] font-mono">
                    {srv.number}
                  </span>
                </div>
                <div>
                  <h3 className="m-0 text-lg sm:text-xl font-medium text-[#18181b] tracking-[-0.02em] leading-snug group-hover:text-black">
                    {srv.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#6b6559] leading-[1.7] max-w-xs">
                    {srv.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold tracking-wider text-[#18181b] uppercase group-hover:translate-x-1 transition-transform">
                  <span>Explore Service</span>
                  <ArrowUpRight size={13} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Services Link Button */}
        <div className="flex justify-center pt-2">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#18181b] text-white text-xs font-semibold tracking-[0.18em] uppercase rounded-full hover:bg-black transition-all shadow-md"
          >
            <span>{viewAllLabel}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
