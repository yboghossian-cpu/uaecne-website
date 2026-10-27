import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { churches } from "@/data/churches";
import { churchContent } from "@/data/churchContent";
import { pageMetadata, summarize } from "@/lib/site";
import { buildChurchView } from "@/lib/churchTemplate";
import ChurchBreadcrumb from "@/components/church/ChurchBreadcrumb";
import ChurchTopBlock from "@/components/church/ChurchTopBlock";
import AnniversaryBand from "@/components/church/AnniversaryBand";
import ChurchAbout from "@/components/church/ChurchAbout";
import LeadershipGrid from "@/components/church/LeadershipGrid";
import ChurchHistory from "@/components/church/ChurchHistory";
import ChurchPrograms from "@/components/church/ChurchPrograms";
import SpecialProjectBand from "@/components/church/SpecialProjectBand";
import SuccessionList from "@/components/church/SuccessionList";
import ChurchGalleryLightbox from "@/components/church/ChurchGalleryLightbox";
import ChurchContactSection from "@/components/church/ChurchContactSection";
import ChurchCTA from "@/components/church/ChurchCTA";
import MilestoneBand from "@/components/church/MilestoneBand";
import VisionBand from "@/components/church/VisionBand";
import WorshipTodayNotice from "@/components/church/WorshipTodayNotice";
import WhiteChurchFeature from "@/components/church/WhiteChurchFeature";
import MilestoneTimeline from "@/components/church/MilestoneTimeline";

type PageParams = { slug: string };

export function generateStaticParams() {
  return churches.map((church) => ({ slug: church.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const church = churches.find((c) => c.slug === slug);
  if (!church) return { title: "Church — UAECNE" };
  const content = churchContent[slug];
  // Description reuses text already on the page: the About paragraph for
  // churches with a full profile, otherwise the directory's own facts.
  const description = content?.about.paragraphs[0]
    ? summarize(content.about.paragraphs[0])
    : summarize(
        [church.name, church.address.split("\n")[0], church.estYear && `Established ${church.estYear}.`]
          .filter(Boolean)
          .join(" — "),
      );
  return pageMetadata({
    title: `${church.name} — UAECNE`,
    description,
    image: content?.heroPhoto?.src ?? church.photo,
    path: `/churches/${slug}`,
  });
}

export default async function ChurchDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const church = churches.find((c) => c.slug === slug);

  // Should never actually trigger — every slug reaching this route was
  // generated from churches.ts's own 25 entries.
  if (!church) notFound();

  const content = churchContent[slug] ?? null;
  // Locked church template: every church — full profile or directory-only —
  // renders the same sections in the same order with the same labels.
  // Structure and wording come from buildChurchView, never per-church data.
  const view = buildChurchView(church, content);

  // "Syria (Kessab)" is a display-grouping value, not real crumb text (see
  // churches/page.tsx's own `countryDisplayLabel` for the same split) — the
  // Kessab churches show a 4th crumb segment ("Ministries › Churches ›
  // Syria › Kessab"), not a combined 3rd segment.
  const breadcrumbCountry = church.country === "Syria (Kessab)" ? "Syria" : church.country;
  const breadcrumbSubregion = church.country === "Syria (Kessab)" ? "Kessab" : null;

  return (
    <>
      <ChurchBreadcrumb country={breadcrumbCountry} subregion={breadcrumbSubregion} />
      <ChurchTopBlock
        church={church}
        masthead={view.masthead}
        logo={view.logo}
        heroPhoto={view.heroPhoto}
        factsBar={view.factsBar}
      />
      <AnniversaryBand anniversary={content?.anniversary ?? null} />
      <ChurchAbout about={view.about} pastorCard={view.pastorCard} />
      <WorshipTodayNotice notice={content?.worshipToday ?? null} />
      <ChurchContactSection
        church={church}
        contactOverride={content?.contactOverride ?? null}
        serviceTime={view.serviceTime}
      />
      <LeadershipGrid leaders={view.leadership} />
      <ChurchHistory history={view.history} />
      <WhiteChurchFeature feature={content?.feature ?? null} />
      <MilestoneTimeline timeline={content?.timeline ?? null} />
      <WorshipTodayNotice notice={content?.kchag ?? null} variant="gold" />
      <ChurchPrograms programs={view.programs} />
      <SpecialProjectBand specialProject={content?.specialProject ?? null} />
      <SuccessionList succession={view.succession} />
      <MilestoneBand milestone={content?.milestone ?? null} />
      <VisionBand vision={content?.vision ?? null} />
      <ChurchGalleryLightbox gallery={view.gallery} />
      <ChurchCTA cta={view.cta} />
    </>
  );
}
