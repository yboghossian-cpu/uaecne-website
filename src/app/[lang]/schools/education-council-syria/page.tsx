import { getL } from "@/lib/i18n/server";
import type { Metadata } from "next";
import { syriaEducationalCouncilContent as syriaEducationalCouncilContent__en } from "@/data/higherEdContent";
import SyriaCouncilHero from "@/components/highered/SyriaCouncilHero";
import SyriaCouncilOverview from "@/components/highered/SyriaCouncilOverview";
import SyriaCouncilAreas from "@/components/highered/SyriaCouncilAreas";
import SyriaCouncilSchools from "@/components/highered/SyriaCouncilSchools";
import SyriaCouncilRoster from "@/components/highered/SyriaCouncilRoster";
import SchoolVisionMission from "@/components/school/SchoolVisionMission";
import SchoolContactSection from "@/components/school/SchoolContactSection";
import HigherEdCTA from "@/components/highered/HigherEdCTA";

export const metadata: Metadata = {
  title: `${syriaEducationalCouncilContent__en.heading} — UAECNE`,
};

export default async function EducationCouncilSyriaPage() {
  const L = await getL();
  const syriaEducationalCouncilContent = L(syriaEducationalCouncilContent__en);
  const s = syriaEducationalCouncilContent;
  return (
    <>
      <SyriaCouncilHero
        heading={s.heading}
        headingHy={s.headingHy}
        subheading={s.subheading}
        metaLine={s.metaLine}
        logo={s.logo}
      />
      <SyriaCouncilOverview overview={s.overview} factsBar={s.factsBar} />
      <SchoolVisionMission visionMission={s.missionVision} />
      <SyriaCouncilAreas areas={s.areas} />
      <SyriaCouncilSchools schools={s.schools} />
      <SyriaCouncilRoster roster={s.roster} />
      <SchoolContactSection
        location={s.location}
        contactRows={s.contactRows}
        schoolName={s.heading}
        social={s.social}
      />
      <HigherEdCTA cta={s.cta} />
    </>
  );
}
