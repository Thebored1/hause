"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  bgImage?: string;
  primaryCtaText?: string;
  primaryCtaAction?: () => void;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export default function PageHero({
  badge,
  title,
  subtitle,
  breadcrumbs = [{ label: "Home", href: "/" }],
  bgImage,
  primaryCtaText,
  primaryCtaAction,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
}: PageHeroProps) {
  return (
    <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 px-6 sm:px-12 md:px-16 overflow-hidden border-b border-white/10 bg-[#0c0d0e]">
      {/* Background Image with Balanced Medium Overlay Opacity */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt={title}
            className="w-full h-full object-cover object-center opacity-55 scale-105 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d0e]/90 via-[#0c0d0e]/65 to-[#0c0d0e]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-transparent to-black/30" />
        </div>
      )}

      {/* Subtle radial ambient glow for pages without background images */}
      {!bgImage && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#22262a]/40 to-transparent blur-3xl pointer-events-none rounded-full" />
      )}

      <div className="relative z-10 max-w-[1408px] mx-auto">
        {/* Breadcrumb Bar */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-8 font-medium tracking-wide">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight size={14} className="text-white/30" />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-md text-[11px] font-semibold tracking-[0.2em] text-[#d4d4d4] uppercase mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80"></span>
            {badge}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] text-[#f3efea] max-w-4xl leading-[1.12] text-balance drop-shadow-sm">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-6 text-base sm:text-lg md:text-xl text-[#d4d4d4]/90 max-w-2xl font-light leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* CTAs */}
        {(primaryCtaText || secondaryCtaText) && (
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {primaryCtaText && primaryCtaHref && (
              <Link
                href={primaryCtaHref}
                className="inline-flex items-center gap-2 bg-[#f3efea] text-[#0c0d0e] px-7 py-3.5 text-xs font-semibold tracking-[0.16em] uppercase hover:bg-white transition-all rounded-full shadow-lg"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight size={14} />
              </Link>
            )}
            {primaryCtaText && primaryCtaAction && !primaryCtaHref && (
              <button
                onClick={primaryCtaAction}
                className="inline-flex items-center gap-2 bg-[#f3efea] text-[#0c0d0e] px-7 py-3.5 text-xs font-semibold tracking-[0.16em] uppercase hover:bg-white transition-all cursor-pointer border-none rounded-full shadow-lg"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight size={14} />
              </button>
            )}
            {secondaryCtaText && secondaryCtaHref && (
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center gap-2 border border-white/25 bg-black/40 backdrop-blur-md text-[#f3efea] px-7 py-3.5 text-xs font-semibold tracking-[0.16em] uppercase hover:border-white hover:bg-white/10 transition-all rounded-full"
              >
                <span>{secondaryCtaText}</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
