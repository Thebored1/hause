import React from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

import FAQAccordion, { type FAQItem } from "@/components/FAQAccordion";

// The FAQ band used on /faqs — accordion plus the "still have questions" card.
// Every prop defaults to the copy the page already shipped, so the hard-coded
// page and a CMS page render identically.

export interface FAQSectionProps {
  items?: FAQItem[];
  askTitle?: string;
  askBody?: string;
  askLabel?: string;
  askHref?: string;
}

export const FAQ_SECTION_DEFAULTS = {
  askTitle: "Have a specific question not answered here?",
  askBody: "Our design directors are happy to answer your specific spatial, timeline, or material queries.",
  askLabel: "Ask Us Directly",
  askHref: "/contact",
};

export default function FAQSection({
  items,
  askTitle = FAQ_SECTION_DEFAULTS.askTitle,
  askBody = FAQ_SECTION_DEFAULTS.askBody,
  askLabel = FAQ_SECTION_DEFAULTS.askLabel,
  askHref = FAQ_SECTION_DEFAULTS.askHref,
}: FAQSectionProps) {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
      <div className="max-w-[1000px] mx-auto space-y-16">
        <FAQAccordion theme="light" items={items} />

        {/* Still have questions card (Warm Sand: #f3efea) */}
        <div className="p-8 sm:p-10 bg-[#f3efea] border border-black/10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-medium text-[#18181b]">{askTitle}</h3>
            <p className="text-xs sm:text-sm text-[#6b6559] font-normal">{askBody}</p>
          </div>
          <Link
            href={askHref}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#18181b] text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors rounded-full shadow-lg shrink-0"
          >
            <MessageSquare size={14} />
            <span>{askLabel}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
