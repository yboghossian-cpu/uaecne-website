import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  campsContent,
  youthWorkContent,
  socialActionContent,
} from "@/data/outreachContent";
import OutreachTopBlock from "@/components/outreach/OutreachTopBlock";
import RedLabelBlock from "@/components/outreach/RedLabelBlock";
import CampsHistory from "@/components/outreach/CampsHistory";
import PullNote from "@/components/outreach/PullNote";
import ScrollGallery from "@/components/outreach/ScrollGallery";
import OutreachCTA from "@/components/outreach/OutreachCTA";
import YouthWorkAbout from "@/components/outreach/YouthWorkAbout";
import StatSection from "@/components/outreach/StatSection";
import ProgramPills from "@/components/outreach/ProgramPills";
import SACAbout from "@/components/outreach/SACAbout";
import ProgramPillar from "@/components/outreach/ProgramPillar";
import ChildProgramCards from "@/components/outreach/ChildProgramCards";

const SLUGS = [campsContent.slug, youthWorkContent.slug, socialActionContent.slug] as const;

type PageParams = { slug: string };

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === campsContent.slug) return { title: `${campsContent.title} — UAECNE` };
  if (slug === youthWorkContent.slug) return { title: `${youthWorkContent.title} — UAECNE` };
  if (slug === socialActionContent.slug) return { title: `${socialActionContent.title} — UAECNE` };
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
  const { slug } = await params;

  if (slug === campsContent.slug) {
    const c = campsContent;
    return (
      <>
        <OutreachTopBlock
          crumbLabel={c.title}
          title={c.title}
          subtitlePlain={c.subtitlePlain}
          subtitleBold={c.subtitleBold}
          heroPhoto={c.heroPhoto}
          heroVariant="wide"
          heroIcon="ic-edu"
        />
        <RedLabelBlock label={c.campsites.label} paragraphs={c.campsites.paragraphs} />
        <CampsHistory history={c.history} />
        <PullNote eyebrow={c.purpose.eyebrow} body={c.purpose.body} />
        <ScrollGallery
          eyebrow={c.gallery.eyebrow}
          heading={c.gallery.heading}
          photos={c.gallery.photos}
        />
        <OutreachCTA cta={c.cta} />
      </>
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
        <PullNote eyebrow={s.refugees.eyebrow} body={s.refugees.body} />
        <OutreachCTA cta={s.cta} />
      </>
    );
  }

  // Should never actually trigger — every slug reaching this route was
  // generated from SLUGS above.
  notFound();
}
