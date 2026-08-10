import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// The craft-and-detailing gallery ribbon used on /about.

export interface GalleryItem {
  src: string;
  title: string;
  tag: string;
}

export const DEFAULT_GALLERY: GalleryItem[] = [
  { src: "/images/jaiswal/jaiswal-06.jpg", title: "Living & Media Lounge", tag: "Architectural Joinery" },
  { src: "/images/jaiswal/jaiswal-12.jpg", title: "Master Suite & Paneling", tag: "Warm Minimalism" },
  { src: "/images/jaiswal/jaiswal-18.jpg", title: "Gourmet Modular Kitchen", tag: "Custom Cabinetry" },
  { src: "/images/jaiswal/jaiswal-24.jpg", title: "Accent Lighting & Textures", tag: "Material Craft" },
];

export interface GalleryRibbonProps {
  eyebrow?: string;
  title?: string;
  linkLabel?: string;
  linkHref?: string;
  items?: GalleryItem[];
}

export default function GalleryRibbon({
  eyebrow = "Craft & Detailing",
  title = "Materials, Joinery & Built Environments",
  linkLabel = "View Full Portfolio",
  linkHref = "/projects",
  items = DEFAULT_GALLERY,
}: GalleryRibbonProps) {
  return (
    <section className="py-20 px-6 sm:px-12 md:px-16 bg-[#121316] border-t border-white/10">
      <div className="max-w-[1280px] mx-auto space-y-10">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
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
  );
}
