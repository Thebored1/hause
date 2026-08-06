"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#08090a] text-white/60 py-16 px-6 sm:px-12 md:px-16 border-t border-white/10">
      <div className="max-w-[1408px] mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <Link href="#" className="text-3xl font-medium tracking-tight text-white">
              Hause
            </Link>
            <p className="mt-2 text-xs text-white/40 max-w-xs">
              Interior Design Studio · Delhi NCR · Projects Pan-India
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-8">
            <Link href="#overview" className="text-xs font-semibold tracking-wider text-white/70 hover:text-white transition-colors uppercase">
              Services
            </Link>
            <Link href="#work" className="text-xs font-semibold tracking-wider text-white/70 hover:text-white transition-colors uppercase">
              Portfolio
            </Link>
            <Link href="#process" className="text-xs font-semibold tracking-wider text-white/70 hover:text-white transition-colors uppercase">
              Process
            </Link>
            <Link href="#locations" className="text-xs font-semibold tracking-wider text-white/70 hover:text-white transition-colors uppercase">
              Locations
            </Link>
            <Link href="#visit" className="text-xs font-semibold tracking-wider text-white/70 hover:text-white transition-colors uppercase">
              Contact
            </Link>
          </nav>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            &copy; {currentYear} Hause Interiors. All rights reserved.
          </div>
          <div>
            Designed &amp; Delivered with Precision in Delhi NCR
          </div>
        </div>
      </div>
    </footer>
  );
}
