import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// The "proof of work" photo strip used on /testimonials.

export interface CompletedPhoto {
  src: string;
  title: string;
}

export const DEFAULT_COMPLETED_PHOTOS: CompletedPhoto[] = [
  { src: "/images/jaiswal/jaiswal-04.jpg", title: "Living & Media Unit — Vaishali" },
  { src: "/images/jaiswal/jaiswal-10.jpg", title: "Master Bed & Lighting — Sector 62" },
  { src: "/images/jaiswal/jaiswal-19.jpg", title: "Dining & Fluted Paneling — GK" },
];

export interface PhotoStripProps {
  eyebrow?: string;
  title?: string;
  linkLabel?: string;
  linkHref?: string;
  photos?: CompletedPhoto[];
}

export default function PhotoStrip({
  eyebrow = "Proof of Work",
  title = "Handed-Over Residential & Commercial Spaces",
  linkLabel = "View Full Portfolio",
  linkHref = "/projects",
  photos = DEFAULT_COMPLETED_PHOTOS,
}: PhotoStripProps) {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#0c0d0e] border-t border-white/10 text-white">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-[0.22em] text-white/50 uppercase">
              {eyebrow}
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-medium text-white">
              {title}
            </h3>
          </div>
          <Link
            href={linkHref}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-white hover:text-white/80 transition-colors"
          >
            <span>{linkLabel}</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {photos.map((p, idx) => (
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
  );
}
