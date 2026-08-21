import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  educationCouncilContent,
  haigazianContent,
  nestContent,
} from "@/data/higherEdContent";
import HigherEdBreadcrumb from "@/components/highered/HigherEdBreadcrumb";
import HigherEdCTA from "@/components/highered/HigherEdCTA";
import InstitutionTopBlock from "@/components/highered/InstitutionTopBlock";
import InstitutionAbout from "@/components/highered/InstitutionAbout";
import InstitutionHistory from "@/components/highered/InstitutionHistory";
import CouncilHero from "@/components/highered/CouncilHero";
import CouncilAbout from "@/components/highered/CouncilAbout";
import CouncilStructure from "@/components/highered/CouncilStructure";
import CouncilSecretary from "@/components/highered/CouncilSecretary";
import HaigazianMotto from "@/components/highered/HaigazianMotto";
import HaigazianFaculties from "@/components/highered/HaigazianFaculties";
import HaigazianClassBand from "@/components/highered/HaigazianClassBand";
import NestSponsors from "@/components/highered/NestSponsors";
import NestDegrees from "@/components/highered/NestDegrees";
import NestLeadershipPair from "@/components/highered/NestLeadershipPair";

const SLUGS = [
  "educational-council",
  haigazianContent.slug,
  nestContent.slug,
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
  const { slug } = await params;
  if (slug === "educational-council") {
    return { title: `${educationCouncilContent.heading} — UAECNE` };
  }
  if (slug === haigazianContent.slug) {
    return { title: `${haigazianContent.masthead.heading} — UAECNE` };
  }
  if (slug === nestContent.slug) {
    return { title: `${nestContent.masthead.heading} — UAECNE` };
  }
  return { title: "Higher Education — UAECNE" };
}

// Three fundamentally different page shapes (a governing council vs. two
// academic institutions with different distinctive sections) — branched by
// slug rather than forced into one generic template. See
// src/data/higherEdContent.ts for the full content-model rationale.
export default async function HigherEducationDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;

  if (slug === "educational-council") {
    const c = educationCouncilContent;
    return (
      <>
        <CouncilHero heading={c.heading} subheading={c.subheading} />
        <CouncilAbout about={c.about} />
        <CouncilStructure structure={c.structure} />
        <CouncilSecretary secretary={c.secretary} />
        <HigherEdCTA cta={c.cta} />
      </>
    );
  }

  if (slug === haigazianContent.slug) {
    const h = haigazianContent;
    return (
      <>
        <HigherEdBreadcrumb />
        <InstitutionTopBlock
          heading={h.masthead.heading}
          locationLine={h.masthead.locationLine}
          established={h.masthead.established}
          logo={h.logo}
          heroPhoto={h.heroPhoto}
          factsBar={h.factsBar}
        />
        <InstitutionAbout about={h.about} president={h.president} />
        <InstitutionHistory history={h.history} />
        <HaigazianMotto motto={h.motto} />
        <HaigazianFaculties faculties={h.faculties} />
        <HaigazianClassBand classBand={h.classBand} />
        <HigherEdCTA cta={h.cta} />
      </>
    );
  }

  if (slug === nestContent.slug) {
    const n = nestContent;
    return (
      <>
        <HigherEdBreadcrumb />
        <InstitutionTopBlock
          heading={n.masthead.heading}
          locationLine={n.masthead.locationLine}
          established={n.masthead.established}
          logo={n.logo}
          heroPhoto={n.heroPhoto}
          factsBar={n.factsBar}
        />
        <InstitutionAbout about={n.about} president={n.president} />
        <InstitutionHistory history={n.history} />
        <NestSponsors sponsors={n.sponsors} />
        <NestDegrees degrees={n.degrees} />
        <NestLeadershipPair leadership={n.leadership} />
        <HigherEdCTA cta={n.cta} />
      </>
    );
  }

  // Should never actually trigger — every slug reaching this route was
  // generated from SLUGS above.
  notFound();
}
