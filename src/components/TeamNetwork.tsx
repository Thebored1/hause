import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

// The team and execution network band used on /about.

export interface TeamNetworkProps {
  image?: string;
  imageAlt?: string;
  imageEyebrow?: string;
  imageCaption?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  points?: string[];
}

export const DEFAULT_TEAM_POINTS = [
  "Dedicated in-house spatial designers & photorealistic 3D renderers",
  "Permanent on-site supervisors assigned to every Delhi NCR project",
  "Empanelled MEP and structural engineering consultants",
  "Factory-partnered modular cabinetry production facilities in NCR",
];

export const TEAM_NETWORK_DEFAULTS = {
  image: "/images/jaiswal/jaiswal-10.jpg",
  imageAlt: "Design and Project Supervision Team",
  imageEyebrow: "On-Site Craftsmanship",
  imageCaption: "100% on-ground site supervision by dedicated project architects.",
  eyebrow: "The People Behind The Craft",
  title: "Our Team & Execution Network",
  body: "Hause Interiors is run by an in-house team of interior designers and project managers, supported by empanelled architects, site supervisors, and a vetted network of carpentry, electrical, civil, and fabrication partners.",
};

export default function TeamNetwork({
  image = TEAM_NETWORK_DEFAULTS.image,
  imageAlt = TEAM_NETWORK_DEFAULTS.imageAlt,
  imageEyebrow = TEAM_NETWORK_DEFAULTS.imageEyebrow,
  imageCaption = TEAM_NETWORK_DEFAULTS.imageCaption,
  eyebrow = TEAM_NETWORK_DEFAULTS.eyebrow,
  title = TEAM_NETWORK_DEFAULTS.title,
  body = TEAM_NETWORK_DEFAULTS.body,
  points = DEFAULT_TEAM_POINTS,
}: TeamNetworkProps) {
  return (
    <section className="py-28 px-6 sm:px-12 md:px-16 bg-[#0c0d0e] text-[#f3efea] border-t border-white/10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative aspect-square rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/70 font-semibold block">
              {imageEyebrow}
            </span>
            <p className="text-sm font-medium mt-1">
              {imageCaption}
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-semibold tracking-[0.22em] text-white/50 uppercase">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white leading-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
            {body}
          </p>

          <div className="space-y-3.5 pt-2 text-xs sm:text-sm text-white/80">
            {points.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle size={16} className="text-white/60 shrink-0" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
