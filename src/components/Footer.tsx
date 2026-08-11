"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { FOOTER_DEFAULTS, type FooterContent, type FooterLink } from "@/lib/chrome";

/** Strips everything a `tel:` href cannot carry. */
const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

function FooterLinkItem({ link }: { link: FooterLink }) {
  const className = link.emphasis
    ? "text-white/80 hover:text-white inline-flex items-center gap-1 pt-1 font-medium"
    : link.arrow
      ? "hover:text-white transition-colors inline-flex items-center gap-1"
      : "hover:text-white transition-colors";

  const content = link.arrow ? (
    <>
      {link.label} <ArrowUpRight size={12} />
    </>
  ) : (
    link.label
  );

  return (
    <li>
      {link.external ? (
        <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
          {content}
        </a>
      ) : (
        <Link href={link.href} className={className}>
          {content}
        </Link>
      )}
    </li>
  );
}

export default function Footer({ footer = FOOTER_DEFAULTS }: { footer?: FooterContent }) {
  const currentYear = new Date().getFullYear();
  const { logo, columns, contact, bottom } = footer;

  return (
    <footer className="bg-[#08090a] text-white/70 py-20 px-6 sm:px-12 md:px-16 border-t border-white/10">
      <div className="max-w-[1408px] mx-auto flex flex-col gap-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <Link
              href="/"
              aria-label="Hause Interiors — Home"
              className="inline-block hover:opacity-90 transition-opacity"
            >
              <Image
                src={logo}
                alt="Hause Interiors"
                width={331}
                height={310}
                className="h-36 sm:h-44 w-auto"
              />
            </Link>
          </div>

          {/* Link columns. The last one also carries the contact block. */}
          {columns.map((column, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/90">
                {column.heading}
              </h4>
              <ul className="space-y-2.5 text-xs text-white/60">
                {column.links.map((link, li) => (
                  <FooterLinkItem key={li} link={link} />
                ))}
              </ul>

              {idx === columns.length - 1 ? (
                <div className="space-y-3 pt-2 border-t border-white/10 text-xs text-white/60">
                  <div className="flex items-start gap-3">
                    <MapPin size={15} className="text-white/40 shrink-0 mt-0.5" />
                    <span>{contact.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={15} className="text-white/40 shrink-0" />
                    <a href={telHref(contact.phone)} className="hover:text-white transition-colors">
                      {contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={15} className="text-white/40 shrink-0" />
                    <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                      {contact.email}
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            &copy; {currentYear} {bottom.companyName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {bottom.notes.map((note, i) => (
              <React.Fragment key={i}>
                {i > 0 ? <span>•</span> : null}
                <span>{note}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
