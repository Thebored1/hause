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
import PillarsGrid, { type Pillar } from "@/components/PillarsGrid";
import ComparisonColumns from "@/components/ComparisonColumns";
import RatingBar from "@/components/RatingBar";
import TestimonialsGrid, { type Testimonial } from "@/components/TestimonialsGrid";
import PhotoStrip, { type CompletedPhoto } from "@/components/PhotoStrip";
import ProcessDeepDive, { type ProcessDeepStep } from "@/components/ProcessDeepDive";
import CommitmentBar from "@/components/CommitmentBar";
import ServicesShowcase, { type ServiceEntry } from "@/components/ServicesShowcase";
import AssuranceRibbon, { type AssuranceCard } from "@/components/AssuranceRibbon";
import StudioStory, { type StoryStat } from "@/components/StudioStory";
import PhilosophyGrid, { type Philosophy } from "@/components/PhilosophyGrid";
import TeamNetwork from "@/components/TeamNetwork";
import GalleryRibbon, { type GalleryItem } from "@/components/GalleryRibbon";
import ValuesGrid, { type Value } from "@/components/ValuesGrid";
import ReachBar from "@/components/ReachBar";
import ChecklistFeature from "@/components/ChecklistFeature";
import NumberedCards, { type NumberedCard } from "@/components/NumberedCards";
import CardListFeature, { type FeatureCard } from "@/components/CardListFeature";
import IconCards, { type IconCard } from "@/components/IconCards";
import StageGrid, { type Stage } from "@/components/StageGrid";
import LayoutCards, { type LayoutOption } from "@/components/LayoutCards";
import SpecFeature, { type Spec } from "@/components/SpecFeature";
import DarkCardGrid, { type DarkCard } from "@/components/DarkCardGrid";
import PropertyCards, { type PropertyType } from "@/components/PropertyCards";
import ProjectRibbon, { type ProjectPhoto } from "@/components/ProjectRibbon";
import DarkStepCards, { type DarkStep } from "@/components/DarkStepCards";
import { type FAQItem } from "@/components/FAQAccordion";
import ContactModal from "@/components/ContactModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RenderTree } from "@/render/RenderTree";
import { HEADER_DEFAULTS, FOOTER_DEFAULTS, type HeaderContent, type FooterContent } from "@/lib/chrome";

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

/** Payload stores string lists as [{value}] — flatten them back. */
const list = (v: unknown): string[] | undefined => {
  const rows = val<{ value: string }[]>(v);
  return rows?.map((r) => r.value);
};

export default function PageBlocks({
  blocks,
  withChrome = false,
  contactModal = true,
  activePath,
  header = HEADER_DEFAULTS,
  footer = FOOTER_DEFAULTS,
}: {
  blocks: PageBlock[];
  /** Render the site navbar and footer around the blocks. */
  withChrome?: boolean;
  /**
   * Whether the nav and CTA buttons open the contact modal. The home page
   * does; the inner pages link straight to /contact instead, so a CMS page
   * standing in for one must be able to turn this off.
   */
  contactModal?: boolean;
  /** The route this page stands in for, so the nav highlights the right link. */
  activePath?: string;
  /** Nav and footer content. Both fall back to the copy the site ships with. */
  header?: HeaderContent;
  footer?: FooterContent;
}) {
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = contactModal ? () => setContactOpen(true) : undefined;

  return (
    <>
      {withChrome ? <Navbar onOpenContact={openContact} activePath={activePath} header={header} /> : null}
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

          case "pillarsGrid": {
            const rows = val<(Omit<Pillar, "details"> & { details?: { value: string }[] })[]>(block.pillars);
            return (
              <PillarsGrid
                key={i}
                eyebrow={val<string>(block.eyebrow)}
                title={val<string>(block.title)}
                pillars={rows?.map((r) => ({ ...r, details: (r.details ?? []).map((d) => d.value) }))}
              />
            );
          }

          case "comparisonColumns":
            return (
              <ComparisonColumns
                key={i}
                eyebrow={val<string>(block.eyebrow)}
                title={val<string>(block.title)}
                negativeLabel={val<string>(block.negativeLabel)}
                negatives={list(block.negatives)}
                positiveLabel={val<string>(block.positiveLabel)}
                positives={list(block.positives)}
              />
            );

          case "ratingBar":
            return (
              <RatingBar
                key={i}
                stars={val<number>(block.stars)}
                summary={val<string>(block.summary)}
                facts={list(block.facts)}
              />
            );

          case "testimonialsGrid": {
            const rows = val<(Omit<Testimonial, "tags"> & { tags?: { value: string }[] })[]>(block.testimonials);
            return (
              <TestimonialsGrid
                key={i}
                testimonials={rows?.map((r) => ({ ...r, tags: (r.tags ?? []).map((t) => t.value) }))}
              />
            );
          }

          case "photoStrip":
            return (
              <PhotoStrip
                key={i}
                eyebrow={val<string>(block.eyebrow)}
                title={val<string>(block.title)}
                linkLabel={val<string>(block.linkLabel)}
                linkHref={val<string>(block.linkHref)}
                photos={val<CompletedPhoto[]>(block.photos)}
              />
            );

          case "processDeepDive": {
            const rows = val<(Omit<ProcessDeepStep, "deliverables"> & { deliverables?: { value: string }[] })[]>(block.steps);
            return (
              <ProcessDeepDive
                key={i}
                eyebrow={val<string>(block.eyebrow)}
                title={val<string>(block.title)}
                deliverablesLabel={val<string>(block.deliverablesLabel)}
                steps={rows?.map((r) => ({ ...r, deliverables: (r.deliverables ?? []).map((d) => d.value) }))}
              />
            );
          }

          case "commitmentBar":
            return (
              <CommitmentBar
                key={i}
                eyebrow={val<string>(block.eyebrow)}
                title={val<string>(block.title)}
                body={val<string>(block.body)}
                ctaLabel={val<string>(block.ctaLabel)}
                ctaHref={val<string>(block.ctaHref)}
              />
            );

          case "servicesShowcase": {
            const rows = val<(Omit<ServiceEntry, "features"> & { features?: { value: string }[] })[]>(block.services);
            return (
              <ServicesShowcase
                key={i}
                eyebrow={val<string>(block.eyebrow)}
                title={val<string>(block.title)}
                services={rows?.map((r) => ({ ...r, features: (r.features ?? []).map((f) => f.value) }))}
              />
            );
          }

          case "assuranceRibbon":
            return <AssuranceRibbon key={i} cards={val<AssuranceCard[]>(block.cards)} />;

          case "studioStory":
            return (
              <StudioStory
                key={i}
                eyebrow={val<string>(block.eyebrow)}
                title={val<string>(block.title)}
                body1={val<string>(block.body1)}
                body2={val<string>(block.body2)}
                stats={val<StoryStat[]>(block.stats)}
                image={val<string>(block.image)}
                imageAlt={val<string>(block.imageAlt)}
                imageEyebrow={val<string>(block.imageEyebrow)}
                imageCaption={val<string>(block.imageCaption)}
              />
            );

          case "philosophyGrid":
            return (
              <PhilosophyGrid
                key={i}
                eyebrow={val<string>(block.eyebrow)}
                title={val<string>(block.title)}
                intro={val<string>(block.intro)}
                philosophies={val<Philosophy[]>(block.philosophies)}
              />
            );

          case "teamNetwork":
            return (
              <TeamNetwork
                key={i}
                eyebrow={val<string>(block.eyebrow)}
                title={val<string>(block.title)}
                body={val<string>(block.body)}
                points={list(block.points)}
                image={val<string>(block.image)}
                imageAlt={val<string>(block.imageAlt)}
                imageEyebrow={val<string>(block.imageEyebrow)}
                imageCaption={val<string>(block.imageCaption)}
              />
            );

          case "galleryRibbon":
            return (
              <GalleryRibbon
                key={i}
                eyebrow={val<string>(block.eyebrow)}
                title={val<string>(block.title)}
                linkLabel={val<string>(block.linkLabel)}
                linkHref={val<string>(block.linkHref)}
                items={val<GalleryItem[]>(block.items)}
              />
            );

          case "valuesGrid":
            return (
              <ValuesGrid
                key={i}
                eyebrow={val<string>(block.eyebrow)}
                title={val<string>(block.title)}
                values={val<Value[]>(block.values)}
              />
            );

          case "reachBar":
            return (
              <ReachBar
                key={i}
                eyebrow={val<string>(block.eyebrow)}
                title={val<string>(block.title)}
                body={val<string>(block.body)}
                ctaLabel={val<string>(block.ctaLabel)}
                ctaHref={val<string>(block.ctaHref)}
              />
            );

          case "checklistFeature":
            return (
              <ChecklistFeature
                key={i}
                eyebrow={String(block.eyebrow ?? "")}
                title={String(block.title ?? "")}
                body={String(block.body ?? "")}
                items={list(block.items) ?? []}
                image={String(block.image ?? "")}
                imageAlt={String(block.imageAlt ?? "")}
                imageSide={val<"left" | "right">(block.imageSide)}
                tone={val<"ivory" | "sand">(block.tone)}
              />
            );

          case "numberedCards":
            return (
              <NumberedCards
                key={i}
                eyebrow={String(block.eyebrow ?? "")}
                title={String(block.title ?? "")}
                intro={String(block.intro ?? "")}
                cards={val<NumberedCard[]>(block.cards) ?? []}
                // Stored as a string because Payload selects are string-valued.
                columns={val<string>(block.columns) ? (Number(block.columns) as 2 | 3 | 4) : undefined}
                tone={val<"ivory" | "sand">(block.tone)}
              />
            );

          case "cardListFeature":
            return (
              <CardListFeature
                key={i}
                eyebrow={String(block.eyebrow ?? "")}
                title={String(block.title ?? "")}
                body={String(block.body ?? "")}
                cards={val<FeatureCard[]>(block.cards) ?? []}
                image={String(block.image ?? "")}
                imageAlt={String(block.imageAlt ?? "")}
              />
            );

          case "iconCards":
            return (
              <IconCards
                key={i}
                eyebrow={String(block.eyebrow ?? "")}
                title={String(block.title ?? "")}
                intro={val<string>(block.intro)}
                cards={val<IconCard[]>(block.cards) ?? []}
                titleTracking={val<"tight" | "normal">(block.titleTracking)}
              />
            );

          case "stageGrid":
            return (
              <StageGrid
                key={i}
                eyebrow={String(block.eyebrow ?? "")}
                title={String(block.title ?? "")}
                intro={String(block.intro ?? "")}
                stages={val<Stage[]>(block.stages) ?? []}
              />
            );

          case "layoutCards":
            return (
              <LayoutCards
                key={i}
                eyebrow={String(block.eyebrow ?? "")}
                title={String(block.title ?? "")}
                intro={String(block.intro ?? "")}
                bestForLabel={val<string>(block.bestForLabel)}
                options={val<LayoutOption[]>(block.options) ?? []}
              />
            );

          case "specFeature":
            return (
              <SpecFeature
                key={i}
                eyebrow={String(block.eyebrow ?? "")}
                title={String(block.title ?? "")}
                body={String(block.body ?? "")}
                specs={val<Spec[]>(block.specs) ?? []}
                image={String(block.image ?? "")}
                imageAlt={String(block.imageAlt ?? "")}
              />
            );

          case "darkCardGrid":
            return (
              <DarkCardGrid
                key={i}
                eyebrow={String(block.eyebrow ?? "")}
                title={String(block.title ?? "")}
                intro={String(block.intro ?? "")}
                cards={val<DarkCard[]>(block.cards) ?? []}
              />
            );

          case "propertyCards":
            return (
              <PropertyCards
                key={i}
                eyebrow={String(block.eyebrow ?? "")}
                title={String(block.title ?? "")}
                intro={String(block.intro ?? "")}
                types={val<PropertyType[]>(block.types) ?? []}
              />
            );

          case "projectRibbon":
            return (
              <ProjectRibbon
                key={i}
                eyebrow={String(block.eyebrow ?? "")}
                title={String(block.title ?? "")}
                linkLabel={String(block.linkLabel ?? "")}
                linkHref={String(block.linkHref ?? "")}
                photos={val<ProjectPhoto[]>(block.photos) ?? []}
              />
            );

          case "darkStepCards":
            return (
              <DarkStepCards
                key={i}
                eyebrow={String(block.eyebrow ?? "")}
                title={String(block.title ?? "")}
                intro={String(block.intro ?? "")}
                steps={val<DarkStep[]>(block.steps) ?? []}
              />
            );

          case "canvas":
            return block.content ? <RenderTree key={i} data={JSON.stringify(block.content)} /> : null;

          default:
            return null;
        }
      })}

      {withChrome ? <Footer footer={footer} /> : null}

      {contactModal ? (
        <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      ) : null}
    </>
  );
}
