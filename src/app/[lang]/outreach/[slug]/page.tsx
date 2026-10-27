import { getT, getL } from "@/lib/i18n/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  campsContent as campsContent__en,
  youthWorkContent as youthWorkContent__en,
  socialActionContent as socialActionContent__en,
  boardingHomeContent as boardingHomeContent__en,
} from "@/data/outreachContent";
import OutreachTopBlock from "@/components/outreach/OutreachTopBlock";
import RedLabelBlock from "@/components/outreach/RedLabelBlock";
import ScrollGallery from "@/components/outreach/ScrollGallery";
import OutreachCTA from "@/components/outreach/OutreachCTA";
import YouthWorkAbout from "@/components/outreach/YouthWorkAbout";
import StatSection from "@/components/outreach/StatSection";
import ProgramPills from "@/components/outreach/ProgramPills";
import SACAbout from "@/components/outreach/SACAbout";
import ProgramPillar from "@/components/outreach/ProgramPillar";
import ChildProgramCards from "@/components/outreach/ChildProgramCards";
import BoardingHomeMasthead from "@/components/outreach/BoardingHomeMasthead";
import BoardingHomeHero from "@/components/outreach/BoardingHomeHero";
import BoardingHomeFacts from "@/components/outreach/BoardingHomeFacts";
import BoardingHomeAbout from "@/components/outreach/BoardingHomeAbout";
import BoardingHomeHistory from "@/components/outreach/BoardingHomeHistory";
import BoardingHomeLeadership from "@/components/outreach/BoardingHomeLeadership";
import BoardingHomeMission from "@/components/outreach/BoardingHomeMission";
import BoardingHomeClosing from "@/components/outreach/BoardingHomeClosing";
import BoardingHomeContact from "@/components/outreach/BoardingHomeContact";
import KchagStory from "@/components/kchag/KchagStory";
import { SOCIAL_ORDER } from "@/lib/social";

const SLUGS = [
  campsContent__en.slug,
  youthWorkContent__en.slug,
  socialActionContent__en.slug,
  boardingHomeContent__en.slug,
] as const;

type PageParams = { slug: string };

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const L = await getL();
  const campsContent = L(campsContent__en);
  const youthWorkContent = L(youthWorkContent__en);
  const socialActionContent = L(socialActionContent__en);
  const boardingHomeContent = L(boardingHomeContent__en);
  const { slug } = await params;
  if (slug === campsContent.slug) return { title: `${campsContent.title} — UAECNE` };
  if (slug === youthWorkContent.slug) return { title: `${youthWorkContent.title} — UAECNE` };
  if (slug === socialActionContent.slug) return { title: `${socialActionContent.title} — UAECNE` };
  if (slug === boardingHomeContent.slug) return { title: `${boardingHomeContent.title} — UAECNE` };
  return { title: "Outreach — UAECNE" };
}

// Three fundamentally different page shapes — branched by slug rather
// than forced into one generic template. See
// src/data/outreachContent.ts for the full content-model rationale.
export default async function OutreachDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const L = await getL();
  const campsContent = L(campsContent__en);
  const youthWorkContent = L(youthWorkContent__en);
  const socialActionContent = L(socialActionContent__en);
  const boardingHomeContent = L(boardingHomeContent__en);
  const tx = await getT();
  const { slug } = await params;

  if (slug === campsContent.slug) {
    const c = campsContent;
    const social = SOCIAL_ORDER.filter((o) => c.social?.[o.key]).map((o) => ({
      href: c.social![o.key]!,
      label: tx(o.label),
    }));
    return (
      <KchagStory
        story={c.story}
        campsites={c.campsites.paragraphs}
        kessab={
          c.kessab
            ? { eyebrow: c.kessab.eyebrow, heading: c.kessab.heading, intro: c.kessab.intro ?? "", eras: c.kessab.eras }
            : null
        }
        life={{ eyebrow: c.gallery.eyebrow, photos: c.gallery.photos }}
        cta={{ heading: c.cta.heading, body: c.cta.body }}
        social={social}
        labels={{
          crumbSection: tx("Outreach"),
          crumbPage: c.title,
          open: tx("Open"),
          close: tx("Close"),
          previous: tx("Previous"),
          next: tx("Next"),
          photoOf: tx("{n} of {total}"),
        }}
      />
    );
  }

  if (slug === youthWorkContent.slug) {
    const y = youthWorkContent;
    return (
      <>
        <OutreachTopBlock
          crumbLabel={y.title}
          title={y.title}
          subtitlePlain={y.subtitlePlain}
          subtitleBold={y.subtitleBold}
          heroPhoto={y.heroPhoto}
          heroVariant="wide"
          heroIcon="ic-people"
        />
        <YouthWorkAbout about={y.about} director={y.director} />
        <RedLabelBlock label={y.ceUnion.label} paragraphs={y.ceUnion.paragraphs} wash />
        <StatSection cards={y.stats} wash />
        <ProgramPills programs={y.programs} />
        <ScrollGallery
          eyebrow={y.gallery.eyebrow}
          heading={y.gallery.heading}
          photos={y.gallery.photos}
        />
        <OutreachCTA cta={y.cta} />
      </>
    );
  }

  if (slug === socialActionContent.slug) {
    const s = socialActionContent;
    return (
      <>
        <OutreachTopBlock
          crumbLabel={s.title}
          title={s.title}
          subtitlePlain={s.subtitlePlain}
          subtitleBold={s.subtitleBold}
          heroPhoto={s.heroPhoto}
          heroVariant="tall"
          heroIcon="ic-heart"
        />
        <SACAbout about={s.about} />
        <StatSection
          eyebrow={s.impact.eyebrow}
          heading={s.impact.heading}
          cards={s.impact.stats}
          wash
        />
        <ProgramPillar pillars={s.pillars} />
        <ChildProgramCards children={s.children} />
        <OutreachCTA cta={s.cta} />
      </>
    );
  }

  if (slug === boardingHomeContent.slug) {
    const b = boardingHomeContent;
    return (
      <>
        <BoardingHomeMasthead content={b} />
        <BoardingHomeHero />
        <BoardingHomeFacts factsBar={b.factsBar} />
        <BoardingHomeAbout about={b.about} director={b.director} />
        <BoardingHomeHistory history={b.history} />
        <BoardingHomeLeadership leadership={b.leadership} />
        <BoardingHomeMission mission={b.mission} />
        <BoardingHomeClosing closing={b.closing} />
        <BoardingHomeContact contact={b.contact} />
        <OutreachCTA cta={b.cta} />
      </>
    );
  }

  // Should never actually trigger — every slug reaching this route was
  // generated from SLUGS above.
  notFound();
}
