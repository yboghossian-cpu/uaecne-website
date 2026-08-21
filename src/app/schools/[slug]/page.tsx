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
import SchoolAcademics from "@/components/school/SchoolAcademics";
import SchoolInquiry from "@/components/school/SchoolInquiry";
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
    // 2 of 4 schools don't have a SchoolContent entry yet (Central High,
    // AESSA/Anjar). schools.ts carries no contact/address fields at all —
    // render the school name only, never invented prose, never a 404.
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
      <SchoolAbout about={content.about} principalCard={content.principalCard} />
      <SchoolContactSection location={content.location} contactRows={content.contactRows} />
      <SchoolLeadershipGrid leaders={content.leadership} />
      <SchoolMission mission={content.mission} />
      <SchoolAcademics academicHeritage={content.academicHeritage} />
      <SchoolInquiry
        inquiry={content.inquiry}
        heroPhoto={content.heroPhoto}
        schoolName={school.name}
      />
      <ChurchCTA cta={content.cta} />
    </>
  );
}
