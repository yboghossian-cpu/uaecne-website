import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { schools } from "@/data/schools";
import { schoolContent } from "@/data/schoolContent";
import { pageMetadata, summarize } from "@/lib/site";
import { buildSchoolView } from "@/lib/schoolTemplate";
import ChurchBreadcrumb from "@/components/church/ChurchBreadcrumb";
import ChurchCTA from "@/components/church/ChurchCTA";
import SchoolTopBlock from "@/components/school/SchoolTopBlock";
import SchoolAbout from "@/components/school/SchoolAbout";
import SchoolContactSection from "@/components/school/SchoolContactSection";
import SchoolLeadershipGrid from "@/components/school/SchoolLeadershipGrid";
import SchoolMission from "@/components/school/SchoolMission";
import SchoolMissionValues from "@/components/school/SchoolMissionValues";
import SchoolAcademics from "@/components/school/SchoolAcademics";
import SchoolSupportServices from "@/components/school/SchoolSupportServices";
import SchoolSignaturePrograms from "@/components/school/SchoolSignaturePrograms";
import SchoolFaithCommunity from "@/components/school/SchoolFaithCommunity";
import SchoolPullQuoteBand from "@/components/school/SchoolPullQuoteBand";
import SchoolVintageBand from "@/components/school/SchoolVintageBand";
import SchoolLanguages from "@/components/school/SchoolLanguages";
import SchoolEvents from "@/components/school/SchoolEvents";
import SchoolProgramChips from "@/components/school/SchoolProgramChips";
import SchoolVisionMission from "@/components/school/SchoolVisionMission";
import SuccessionList from "@/components/church/SuccessionList";
import WhiteChurchFeature from "@/components/church/WhiteChurchFeature";
import ChurchGalleryLightbox from "@/components/church/ChurchGalleryLightbox";

type PageParams = { slug: string };

export function generateStaticParams() {
  return schools.filter((school) => schoolContent[school.slug]).map((school) => ({ slug: school.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const school = schools.find((s) => s.slug === slug);
  if (!school) return { title: "School — UAECNE" };
  const content = schoolContent[slug];
  return pageMetadata({
    title: `${school.name} — UAECNE`,
    // Verbatim from the page's own About text — no new copy.
    description: content?.about.paragraphs[0] ? summarize(content.about.paragraphs[0]) : undefined,
    image: content?.heroPhoto?.src ?? school.photo,
    path: `/schools/${slug}`,
  });
}

export default async function SchoolDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const school = schools.find((s) => s.slug === slug);
  const content = schoolContent[slug];
  if (!school || !content) notFound();

  // Locked school template — same spine as the churches. Structure and
  // template wording come from buildSchoolView, never per-school branching.
  const view = buildSchoolView(school, content);

  // "Syria (Kessab)" is a display-grouping value — Kessab schools show a
  // 4th crumb segment ("Ministries › Schools › Syria › Kessab").
  const breadcrumbCountry = school.country === "Syria (Kessab)" ? "Syria" : school.country;
  const breadcrumbSubregion = school.country === "Syria (Kessab)" ? "Kessab" : null;

  // Archival history photos keep the sepia treatment; modern photos used in
  // a history band don't (a property of the photo, not a layout choice).
  const NO_SEPIA_SLUGS = [
    "bethel-secondary-school",
    "emmanuel-al-ressaleh-school",
    "damascus-kenats-al-hayat-school",
    "syriac-evangelical-school",
    "kessab-martyrs-school",
  ];

  return (
    <>
      <ChurchBreadcrumb country={breadcrumbCountry} subregion={breadcrumbSubregion} section="Schools" />
      <SchoolTopBlock
        school={school}
        masthead={view.masthead}
        logo={view.logo}
        heroPhoto={view.heroPhoto}
        factsBar={view.factsBar}
      />
      <SchoolAbout about={view.about} principalCard={view.principalCard} />
      <SchoolContactSection
        location={view.location}
        contactRows={view.contactRows}
        schoolName={school.name}
        note={view.contactNote}
      />
      <SchoolLeadershipGrid leaders={view.leadership} />

      {/* The school's own content blocks — fixed order, each renders only
          when the school has that real content. */}
      <SchoolPullQuoteBand pullQuoteBand={view.quoteBand} />
      <SchoolVintageBand vintageBand={content.vintageBand ?? null} sepia={!NO_SEPIA_SLUGS.includes(slug)} />
      <SchoolMissionValues missionValues={content.missionValues} />
      <SchoolMission mission={content.mission} />
      <SchoolVisionMission visionMission={content.visionMission ?? null} />
      <SchoolAcademics academicHeritage={content.academicHeritage} sideArt artVariant="medallion" />
      <SchoolSupportServices supportServices={content.supportServices} />
      <SchoolSignaturePrograms signaturePrograms={content.signaturePrograms} />
      <SchoolFaithCommunity faithCommunity={content.faithCommunity} />
      {view.photoRows.map((row, i) => (
        <WhiteChurchFeature
          key={`row-${i}`}
          feature={row}
          photoWidth={row.photo.width}
          photoHeight={row.photo.height}
          reverse={row.reverse}
          dropcapFirst={false}
        />
      ))}
      <SchoolLanguages languages={content.languages ?? null} />
      <SchoolProgramChips programChips={content.programChips ?? null} />
      <SchoolPullQuoteBand pullQuoteBand={view.quoteBand2} />
      <SchoolEvents events={content.events ?? null} />

      <SuccessionList succession={view.directorsArchive} variant="panel" />
      <ChurchGalleryLightbox gallery={view.gallery} />
      <ChurchCTA cta={view.cta} />
    </>
  );
}
