import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// A three-up landscape photo ribbon with a heading and a link out. Sibling of
// GalleryRibbon, which is portrait and carries a tag per item.

export interface ProjectPhoto {
  src: string;
  title: string;
}

export interface ProjectRibbonProps {
  eyebrow: string;
  title: string;
  linkLabel: string;
  linkHref: string;
  photos: ProjectPhoto[];
}

export default function ProjectRibbon({
  eyebrow,
  title,
  linkLabel,
  linkHref,
  photos,
}: ProjectRibbonProps) {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {photos.map((g, idx) => (
            <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group">
              <Image
                src={g.src}
                alt={g.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-sm font-medium">{g.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
