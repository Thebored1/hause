"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const defaultFAQs: FAQItem[] = [
  {
    category: "Cost & Pricing",
    question: "What does interior design cost in Delhi NCR?",
    answer:
      "Cost depends on the scope (design-only vs. turnkey), the materials chosen, and the size of the space. We share a detailed, itemised Bill of Quantities (BOQ) after the discovery visit, so you know exactly what each component costs with no hidden fees later.",
  },
  {
    category: "Timelines",
    question: "How long does a typical project take?",
    answer:
      "A single room can typically be completed in 2–4 weeks, while a full-home interior usually takes 8–14 weeks depending on scope, customized carpentry, and material availability. Commercial fit-outs are scoped individually based on size and operational requirements.",
  },
  {
    category: "Locations",
    question: "Do you only work in Delhi NCR, or also pan-India?",
    answer:
      "Delhi NCR (Delhi, Gurugram, Noida, Ghaziabad, Faridabad) is where we offer full hands-on site supervision. For other cities across India, we take on select projects through a structured remote design and project management process, working with vetted local execution partners.",
  },
  {
    category: "Services",
    question: "Do you offer design only, or execution as well?",
    answer:
      "Both. You can engage Hause Interiors for design and 3D visualization alone, or for a full turnkey project that includes design, civil work, carpentry, electrical, and styling under one unified team with single-point accountability.",
  },
  {
    category: "Consultation",
    question: "Do you charge for the initial consultation?",
    answer:
      "The first consultation and site discussion is completely free. Charges for detailed architectural design and 3D visualization are shared upfront and typically adjusted against the final project cost if you proceed with execution.",
  },
  {
    category: "Warranty & Quality",
    question: "Is there a warranty on the work?",
    answer:
      "Yes. We offer structured warranty protection covering modular cabinetry, factory hardware fittings, and workmanship. All materials used (such as BWP/BWR marine plywood and branded hardware) carry their respective manufacturer warranties alongside our execution guarantee.",
  },
  {
    category: "Site Management",
    question: "How many site visits will I get during execution?",
    answer:
      "For Delhi NCR projects, our team conducts regular, scheduled site visits throughout execution at every crucial milestone, in addition to live photo/video progress updates. Pan-India projects follow a milestone-based visit schedule agreed at project kickoff.",
  },
  {
    category: "Process",
    question: "Can I make changes once execution has started?",
    answer:
      "Minor adjustments can usually be accommodated smoothly. Structural or major design changes once site execution has begun may impact the cost and timeline, and will always be transparently discussed, itemised in a revised BOQ, and approved with you before proceeding.",
  },
];

interface FAQAccordionProps {
  items?: FAQItem[];
  showCategoryFilter?: boolean;
  theme?: "light" | "dark";
}

export default function FAQAccordion({
  items = defaultFAQs,
  showCategoryFilter = false,
  theme = "dark",
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const isLight = theme === "light";
  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category || "General")))];

  const filteredItems = selectedCategory === "All"
    ? items
    : items.filter((i) => i.category === selectedCategory);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {showCategoryFilter && categories.length > 2 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(0);
              }}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                selectedCategory === cat
                  ? isLight
                    ? "bg-[#18181b] text-white shadow-md"
                    : "bg-white text-black shadow-md"
                  : isLight
                  ? "bg-black/5 text-[#18181b] hover:bg-black/10 border border-black/10"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div
        className={`rounded-3xl p-6 sm:p-10 shadow-xl ${
          isLight
            ? "bg-white border border-black/10 divide-y divide-black/10"
            : "bg-[#141618] border border-white/10 divide-y divide-white/10"
        }`}
      >
        {filteredItems.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="group transition-colors">
              <button
                onClick={() => toggleItem(idx)}
                className="w-full py-6 md:py-7 flex items-start justify-between gap-6 text-left focus:outline-none cursor-pointer bg-transparent border-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`text-xs font-mono pt-1 tracking-wider ${
                      isLight ? "text-[#8a8578]" : "text-white/40"
                    }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={`text-base sm:text-lg md:text-xl font-normal leading-snug transition-colors ${
                      isLight
                        ? "text-[#18181b] group-hover:text-black"
                        : "text-[#f3efea] group-hover:text-white"
                    }`}
                  >
                    {item.question}
                  </h3>
                </div>
                <div
                  className={`p-2 rounded-full border transition-transform duration-300 shrink-0 ${
                    isOpen
                      ? isLight
                        ? "rotate-180 bg-black/5 border-black/20 text-[#18181b]"
                        : "rotate-180 bg-white/10 border-white/20 text-white"
                      : isLight
                      ? "border-black/10 text-[#6b6559] group-hover:text-[#18181b]"
                      : "border-white/10 text-white/60 group-hover:text-white"
                  }`}
                >
                  <ChevronDown size={16} />
                </div>
              </button>

              {isOpen && (
                <div
                  className={`pb-7 pl-9 md:pl-10 pr-6 text-sm sm:text-base font-normal leading-relaxed animate-in fade-in duration-200 ${
                    isLight ? "text-[#6b6559]" : "text-white/70 font-light"
                  }`}
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
