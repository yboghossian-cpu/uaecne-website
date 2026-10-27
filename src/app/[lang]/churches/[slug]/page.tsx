import { getL } from "@/lib/i18n/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getChurch, getChurchContent, getChurches } from "@/lib/server/content";
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
  return getChurches().map((church) => ({ slug: church.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const L = await getL();
  const church = L(getChurch(slug));
  if (!church) return { title: "Church — UAECNE" };
  const content = L(getChurchContent(slug));
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
  const church = getChurch(slug);

  // Should never actually trigger — every slug reaching this route was
  // generated from churches.ts's own 25 entries.
  if (!church) notFound();

  const contentEn = getChurchContent(slug);
  // Locked church template: every church — full profile or directory-only —
  // renders the same sections in the same order with the same labels.
  // Structure and wording come from buildChurchView, never per-church data.
  // Built from the English data (the template's rules read English role
  // names), then translated as a whole for the current language.
  const L = await getL();
  const view = L(buildChurchView(church, contentEn));
  const content = L(contentEn);
  const churchL = L(church);

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
        church={churchL}
        masthead={view.masthead}
        logo={view.logo}
        heroPhoto={view.heroPhoto}
        factsBar={view.factsBar}
      />
      <AnniversaryBand anniversary={content?.anniversary ?? null} />
      <ChurchAbout about={view.about} pastorCard={view.pastorCard} />
      <WorshipTodayNotice notice={content?.worshipToday ?? null} />
      <ChurchContactSection
        church={churchL}
        mapsQuery={`${church.name} ${church.address.split("\n")[0] ?? ""}`}
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
