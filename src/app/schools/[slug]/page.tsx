import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { schools } from "@/data/schools";
import { schoolContent } from "@/data/schoolContent";
import Medallion from "@/components/shared/Medallion";
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
import SchoolInquiry from "@/components/school/SchoolInquiry";
import SchoolPullQuoteBand from "@/components/school/SchoolPullQuoteBand";
import SchoolVintageBand from "@/components/school/SchoolVintageBand";
import SchoolLanguages from "@/components/school/SchoolLanguages";
import SchoolEvents from "@/components/school/SchoolEvents";
import SchoolProgramChips from "@/components/school/SchoolProgramChips";
import SchoolVisionMission from "@/components/school/SchoolVisionMission";
import SuccessionList from "@/components/church/SuccessionList";
import WhiteChurchFeature from "@/components/church/WhiteChurchFeature";
import ChurchGalleryLightbox from "@/components/church/ChurchGalleryLightbox";
import styles from "./page.module.css";

type PageParams = { slug: string };

export function generateStaticParams() {
  return schools.map((school) => ({ slug: school.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const school = schools.find((s) => s.slug === slug);
  return { title: school ? `${school.name} — UAECNE` : "School — UAECNE" };
}

export default async function SchoolDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const school = schools.find((s) => s.slug === slug);

  // Should never actually trigger — every slug reaching this route was
  // generated from schools.ts's own 4 entries.
  if (!school) notFound();

  const content = schoolContent[slug] ?? null;

  if (!content) {
    // 1 of 4 schools doesn't have a SchoolContent entry yet (Central High).
    // schools.ts carries no contact/address fields at all — render the
    // school name only, never invented prose, never a 404.
    return (
      <>
        <ChurchBreadcrumb country={school.country} section="Schools" />
        <section className={styles.minimalTop}>
          <h1 className={styles.minimalHeading}>{school.name}</h1>
          <div className={styles.minimalMeta}>{school.country}</div>
        </section>
        <section className={styles.pending}>
          <Medallion size={64} className={styles.pendingGlyph} />
          <h2 className={styles.pendingHeading}>Full Page Content Coming Soon</h2>
          <p className={styles.pendingBody}>
            We&rsquo;re preparing a full profile for this school, including its
            history, leadership, and programs.
          </p>
        </section>
      </>
    );
  }

  // ACG's mockup weaves photo/text "magazine" rows and moves Contact down
  // near the Gallery rather than right after About — a different section
  // order than the other 3 schools' own designs use. Rather than reorder
  // the shared JSX below (which would move Contact for every school),
  // `hasMagazineSections` renders Contact in one of two fixed slots: its
  // original spot (existing schools) or the later spot (ACG-style
  // schools). Every other new call below (`introFeature`, `pullQuoteBand`,
  // `vintageBand`, `splitRows`, `languages`, `events`, `gallery`) is a
  // no-op for the other 3 schools since those fields are unset for them,
  // so it's safe to insert them at fixed positions without any per-school
  // branching.
  // Every magazine-style Syria school (ACG, Bethel, Emmanuel al-Ressaleh,
  // Damascus Kenats/Al-Hayat) sets `introFeature` in place of `about`
  // (see the conditional just above) — using that single field as the
  // late-Contact trigger, rather than checking `splitRows`/`academicsRows`
  // specifically, means a school with NO other split rows besides
  // About/Intro (Damascus has none — no Events/Gallery either) still gets
  // the correct late Contact position, matching its own mockup's order
  // (About → Pull-quote → History → Leadership → Contact → CTA).
  const hasMagazineSections = Boolean(content.introFeature);

  // Bethel Secondary School's, Emmanuel al-Ressaleh's, and Damascus
  // Kenats/Al-Hayat's vintage-band photos have no sepia treatment in
  // their own mockup CSS, unlike ACG's (see `SchoolVintageBand`'s own
  // comment) — a real per-mockup difference, not an oversight.
  const NO_SEPIA_SLUGS = [
    "bethel-secondary-school",
    "emmanuel-al-ressaleh-school",
    "damascus-kenats-al-hayat-school",
  ];
  const vintageSepia = !NO_SEPIA_SLUGS.includes(slug);

  return (
    <>
      <ChurchBreadcrumb country={school.country} section="Schools" />
      <SchoolTopBlock
        school={school}
        masthead={content.masthead}
        logo={content.logo}
        heroPhoto={content.heroPhoto}
        factsBar={content.factsBar}
      />
      {content.introFeature ? (
        // reverse: the mockup's own About/Intro row is authored text-first,
        // photo-second in the DOM with no `.rev` class — unlike the 4
        // Student Life rows below (which use `.rev` to CSS-reorder back to
        // photo-left, see `splitRows`' own comment), so this row alone
        // renders text-left/photo-right, opposite WhiteChurchFeature's
        // photo-left default.
        <WhiteChurchFeature
          feature={content.introFeature}
          photoWidth={content.introFeature.photo.width}
          photoHeight={content.introFeature.photo.height}
          reverse
          dropcapFirst
        />
      ) : (
        <SchoolAbout about={content.about} principalCard={content.principalCard} />
      )}
      {!hasMagazineSections && (
        <SchoolContactSection
          location={content.location}
          contactRows={content.contactRows}
          schoolName={school.name}
        />
      )}
      <SchoolPullQuoteBand pullQuoteBand={content.pullQuoteBand} />
      <SchoolVintageBand vintageBand={content.vintageBand} sepia={vintageSepia} />
      <SchoolMissionValues missionValues={content.missionValues} />
      <SchoolLeadershipGrid leaders={content.leadership} />
      <SchoolMission mission={content.mission} />
      <SchoolAcademics
        academicHeritage={content.academicHeritage}
        sideArt={slug === "armenian-evangelical-secondary-school-anjar"}
      />
      <SchoolSupportServices supportServices={content.supportServices} />
      <SchoolSignaturePrograms signaturePrograms={content.signaturePrograms} />
      <SchoolFaithCommunity faithCommunity={content.faithCommunity} />
      {content.splitRows?.map((row, i) => (
        <WhiteChurchFeature
          key={`split-${i}`}
          feature={row}
          photoWidth={row.photo.width}
          photoHeight={row.photo.height}
          reverse={row.reverse}
          dropcapFirst={row.dropcapFirst}
        />
      ))}
      {/* Bethel Secondary School's section-scoped row groups — see the
          `SchoolSplitRow`/`academicsRows` etc. comments in schoolContent.ts.
          Each field is null for every other school, so these blocks are
          no-ops there. */}
      {content.academicsRows?.map((row, i) => (
        <WhiteChurchFeature
          key={`academics-${i}`}
          feature={row}
          photoWidth={row.photo.width}
          photoHeight={row.photo.height}
          reverse={row.reverse}
          dropcapFirst={row.dropcapFirst}
        />
      ))}
      <SchoolLanguages languages={content.languages} />
      <SchoolProgramChips programChips={content.programChips} />
      {content.curriculumRows?.map((row, i) => (
        <WhiteChurchFeature
          key={`curriculum-${i}`}
          feature={row}
          photoWidth={row.photo.width}
          photoHeight={row.photo.height}
          reverse={row.reverse}
          dropcapFirst={row.dropcapFirst}
        />
      ))}
      {content.worshipRows?.map((row, i) => (
        <WhiteChurchFeature
          key={`worship-${i}`}
          feature={row}
          photoWidth={row.photo.width}
          photoHeight={row.photo.height}
          reverse={row.reverse}
          dropcapFirst={row.dropcapFirst}
        />
      ))}
      <SchoolPullQuoteBand pullQuoteBand={content.pullQuoteBand2} />
      {content.faithRows?.map((row, i) => (
        <WhiteChurchFeature
          key={`faith-${i}`}
          feature={row}
          photoWidth={row.photo.width}
          photoHeight={row.photo.height}
          reverse={row.reverse}
          dropcapFirst={row.dropcapFirst}
        />
      ))}
      {content.heritageRows?.map((row, i) => (
        <WhiteChurchFeature
          key={`heritage-${i}`}
          feature={row}
          photoWidth={row.photo.width}
          photoHeight={row.photo.height}
          reverse={row.reverse}
          dropcapFirst={row.dropcapFirst}
        />
      ))}
      <SchoolVisionMission visionMission={content.visionMission} />
      <SchoolEvents events={content.events} />
      {hasMagazineSections && (
        <SchoolContactSection
          location={content.location}
          contactRows={content.contactRows}
          schoolName={school.name}
        />
      )}
      <SuccessionList succession={content.directorsArchive} variant="panel" />
      <SchoolInquiry
        inquiry={content.inquiry}
        heroPhoto={content.heroPhoto}
        schoolName={school.name}
      />
      <ChurchGalleryLightbox gallery={content.gallery ?? null} />
      <ChurchCTA cta={content.cta} />
    </>
  );
}
