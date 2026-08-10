"use client";

import { useState } from "react";

import HeroSpaceSwitcher, { type HeroStat } from "@/components/HeroSpaceSwitcher";
import ServicesGrid, { type ServiceItem } from "@/components/ServicesGrid";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import ProcessTimeline, { type ProcessStep } from "@/components/ProcessTimeline";
import WhyUs, { type Reason } from "@/components/WhyUs";
import LocationsGrid, { type City } from "@/components/LocationsGrid";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import FAQSection from "@/components/FAQSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactDetails, { type NextStep } from "@/components/ContactDetails";
import PromoBanner from "@/components/PromoBanner";
import RegionsDirectory, { type Region } from "@/components/RegionsDirectory";
import { type FAQItem } from "@/components/FAQAccordion";
import ContactModal from "@/components/ContactModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RenderTree } from "@/render/RenderTree";

// ============================================================
// Renders a CMS page's blocks using the site's own components.
//
// This is a client component so it can own the contact-modal
// state and hand `onOpenContact` to the sections that need it —
// exactly as the hand-coded pages do. Without it those buttons
// would silently degrade to plain links.
// ============================================================

export type PageBlock = { blockType?: string; [key: string]: unknown };

/** Empty strings and empty arrays mean "unset", so the component keeps its default. */
const val = <T,>(v: unknown): T | undefined => {
  if (v === null || v === undefined) return undefined;
  if (typeof v === "string" && v.trim() === "") return undefined;
  if (Array.isArray(v) && v.length === 0) return undefined;
  return v as T;
};

export default function PageBlocks({
  blocks,
  withChrome = false,
}: {
  blocks: PageBlock[];
  /** Render the site navbar and footer around the blocks. */
  withChrome?: boolean;
}) {
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = () => setContactOpen(true);

  return (
    <>
      {withChrome ? <Navbar onOpenContact={openContact} /> : null}
      {blocks.map((block, i) => {
        switch (block.blockType) {
          case "hero":
            return (
              <HeroSpaceSwitcher
                key={i}
                onOpenContact={openContact}
                eyebrow={val<string>(block.eyebrow)}
                titleLine1={val<string>(block.titleLine1)}
                titleLine2={val<string>(block.titleLine2)}
                body={val<string>(block.body)}
                primaryLabel={val<string>(block.primaryLabel)}
                ctaHref={val<string>(block.ctaHref)}
                secondaryLabel={val<string>(block.secondaryLabel)}
                secondaryHref={val<string>(block.secondaryHref)}
                spacesLabel={val<string>(block.spacesLabel)}
                spaces={val<{ key: string; name: string; image: string }[]>(block.spaces)}
                statsIntro={val<string>(block.statsIntro)}
                stats={val<HeroStat[]>(block.stats)}
              />
            );

          case "servicesGrid":
            return (
              <ServicesGrid
                key={i}
                onOpenContact={openContact}
                eyebrow={val<string>(block.eyebrow)}
                title={val<string>(block.title)}
                intro={val<string>(block.intro)}
                featureImage={val<string>(block.featureImage)}
                statLabel={val<string>(block.statLabel)}
                statValue={val<string>(block.statValue)}
                statBody={val<string>(block.statBody)}
                ctaLabel={val<string>(block.ctaLabel)}
                ctaHref={val<string>(block.ctaHref)}
                services={val<ServiceItem[]>(block.services)}
              />
            );

          case "portfolio":
            return <PortfolioShowcase key={i} />;

          case "process":
            return <ProcessTimeline key={i} steps={val<ProcessStep[]>(block.steps)} />;

          case "whyUs":
            return <WhyUs key={i} reasons={val<Reason[]>(block.reasons)} />;

          case "locations":
            return <LocationsGrid key={i} cities={val<City[]>(block.cities)} />;

          case "cta":
            return <CTASection key={i} onOpenContact={openContact} bgImage={val<string>(block.bgImage)} />;

          case "pageHero": {
            const crumbs = val<{ label: string; href?: string }[]>(block.breadcrumbs);
            return (
              <PageHero
                key={i}
                title={String(block.title ?? "")}
                badge={val<string>(block.badge)}
                subtitle={val<string>(block.subtitle)}
                bgImage={val<string>(block.bgImage)}
                // An empty href means "current page" — PageHero renders it as plain text.
                breadcrumbs={crumbs?.map((c) => ({ label: c.label, href: val<string>(c.href) }))}
                primaryCtaText={val<string>(block.primaryCtaText)}
                primaryCtaHref={val<string>(block.primaryCtaHref)}
                secondaryCtaText={val<string>(block.secondaryCtaText)}
                secondaryCtaHref={val<string>(block.secondaryCtaHref)}
              />
            );
          }

          case "faqSection":
            return (
              <FAQSection
                key={i}
                items={val<FAQItem[]>(block.items)}
                askTitle={val<string>(block.askTitle)}
                askBody={val<string>(block.askBody)}
                askLabel={val<string>(block.askLabel)}
                askHref={val<string>(block.askHref)}
              />
            );

          case "projectsSection":
            return <ProjectsSection key={i} />;

          case "contactDetails":
            return (
              <ContactDetails
                key={i}
                eyebrow={val<string>(block.eyebrow)}
                title={val<string>(block.title)}
                body={val<string>(block.body)}
                phone={val<string>(block.phone)}
                email={val<string>(block.email)}
                address={val<string>(block.address)}
                hours={val<string>(block.hours)}
                nextStepsLabel={val<string>(block.nextStepsLabel)}
                nextSteps={val<NextStep[]>(block.nextSteps)}
              />
            );

          case "promoBanner":
            return (
              <PromoBanner
                key={i}
                eyebrow={val<string>(block.eyebrow)}
                title={val<string>(block.title)}
                body={val<string>(block.body)}
                ctaLabel={val<string>(block.ctaLabel)}
                ctaHref={val<string>(block.ctaHref)}
                spacing={val<"normal" | "loose">(block.spacing)}
                cardShadow={val<"sm" | "md">(block.cardShadow)}
                showArrow={val<boolean>(block.showArrow)}
              />
            );

          case "regionsDirectory": {
            // Payload arrays can't hold bare strings, so specialties arrive wrapped.
            const regions = val<(Omit<Region, "specialties"> & { specialties?: { value: string }[] })[]>(
              block.regions,
            );
            return (
              <RegionsDirectory
                key={i}
                regions={regions?.map((r) => ({
                  ...r,
                  specialties: (r.specialties ?? []).map((s) => s.value),
                }))}
                specialtiesLabel={val<string>(block.specialtiesLabel)}
                ctaHref={val<string>(block.ctaHref)}
              />
            );
          }

          case "canvas":
            return block.content ? <RenderTree key={i} data={JSON.stringify(block.content)} /> : null;

          default:
            return null;
        }
      })}

      {withChrome ? <Footer /> : null}

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
