import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

import ContactForm from "@/components/ContactForm";

// The contact band used on /contact — studio details, "what happens next",
// and the enquiry form. Every prop defaults to the copy already shipped.

export interface NextStep {
  step: string;
  title: string;
  desc: string;
}

export const DEFAULT_NEXT_STEPS: NextStep[] = [
  {
    step: "01",
    title: "24-Hour Review",
    desc: "We review your requirements and reach out within 24 hours to schedule a discovery discussion.",
  },
  {
    step: "02",
    title: "Discovery Call or Site Visit",
    desc: "We conduct an in-depth conversation or physical site measurement to understand your vision and constraints.",
  },
  {
    step: "03",
    title: "Concept & Ballpark Estimate",
    desc: "We share a preliminary spatial concept and transparent ballpark estimate — completely free of charge.",
  },
];

export interface ContactDetailsProps {
  eyebrow?: string;
  title?: string;
  body?: string;
  phone?: string;
  email?: string;
  /** Newline-separated; rendered as separate lines. */
  address?: string;
  hours?: string;
  nextStepsLabel?: string;
  nextSteps?: NextStep[];
}

/** Strips everything a `tel:` href can't carry. */
const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const CONTACT_DETAILS_DEFAULTS = {
  eyebrow: "Studio & Direct Details",
  title: "Reach our design directors directly.",
  body: "We look forward to discussing your upcoming residential or commercial project. Reach out by phone, email, or visit our studio in Ghaziabad.",
  phone: "+91 80065 59900",
  email: "interiors@hause.agency",
  address: "2nd A 255 Nehru Nagar,\nGhaziabad, 201001, Uttar Pradesh",
  hours: "Monday – Saturday: 10:00 AM – 7:00 PM IST",
  nextStepsLabel: "What Happens Next?",
};

export default function ContactDetails({
  eyebrow = CONTACT_DETAILS_DEFAULTS.eyebrow,
  title = CONTACT_DETAILS_DEFAULTS.title,
  body = CONTACT_DETAILS_DEFAULTS.body,
  phone = CONTACT_DETAILS_DEFAULTS.phone,
  email = CONTACT_DETAILS_DEFAULTS.email,
  address = CONTACT_DETAILS_DEFAULTS.address,
  hours = CONTACT_DETAILS_DEFAULTS.hours,
  nextStepsLabel = CONTACT_DETAILS_DEFAULTS.nextStepsLabel,
  nextSteps = DEFAULT_NEXT_STEPS,
}: ContactDetailsProps) {
  const addressLines = address.split("\n");

  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
        {/* Left: Direct Info & Next Steps */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                {eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#18181b] tracking-tight">
                {title}
              </h2>
              <p className="text-sm text-[#6b6559] font-normal leading-relaxed">{body}</p>
            </div>

            {/* Direct Info List */}
            <div className="space-y-4 border-t border-black/10 pt-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#18181b] shrink-0 shadow-sm">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-xs text-[#8a8578] uppercase tracking-wider block font-semibold">Phone / WhatsApp</span>
                  <a
                    href={telHref(phone)}
                    className="text-base font-medium text-[#18181b] hover:text-black transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#18181b] shrink-0 shadow-sm">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-xs text-[#8a8578] uppercase tracking-wider block font-semibold">Email Inquiries</span>
                  <a
                    href={`mailto:${email}`}
                    className="text-base font-medium text-[#18181b] hover:text-black transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#18181b] shrink-0 shadow-sm">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-xs text-[#8a8578] uppercase tracking-wider block font-semibold">Office &amp; Material Studio</span>
                  <p className="text-sm text-[#18181b] leading-relaxed m-0 font-normal">
                    {addressLines.map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < addressLines.length - 1 ? <br /> : null}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#18181b] shrink-0 shadow-sm">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="text-xs text-[#8a8578] uppercase tracking-wider block font-semibold">Working Hours</span>
                  <p className="text-sm text-[#18181b] leading-relaxed m-0 font-normal">{hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* What Happens Next - Stretches dynamically to match Form height */}
          <div className="border-t border-black/10 pt-5 flex-1 flex flex-col justify-between mt-4">
            <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase block mb-3">
              {nextStepsLabel}
            </span>
            <div className="flex-1 flex flex-col justify-between gap-3">
              {nextSteps.map((s) => (
                <div key={s.step} className="p-4 bg-white border border-black/10 rounded-2xl shadow-sm flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-[#8a8578] font-semibold">{s.step}</span>
                    <h4 className="text-sm font-medium text-[#18181b]">{s.title}</h4>
                  </div>
                  <p className="text-xs text-[#6b6559] font-normal leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Comprehensive Interactive Form */}
        <div className="lg:col-span-7 h-full flex flex-col">
          <ContactForm theme="light" />
        </div>
      </div>
    </section>
  );
}
