import type { Metadata } from "next";
import { syriaEducationalCouncilContent } from "@/data/higherEdContent";
import SyriaCouncilHero from "@/components/highered/SyriaCouncilHero";
import SyriaCouncilOverview from "@/components/highered/SyriaCouncilOverview";
import SyriaCouncilAreas from "@/components/highered/SyriaCouncilAreas";
import SyriaCouncilSchools from "@/components/highered/SyriaCouncilSchools";
import SyriaCouncilRoster from "@/components/highered/SyriaCouncilRoster";
import SchoolVisionMission from "@/components/school/SchoolVisionMission";
import SchoolContactSection from "@/components/school/SchoolContactSection";
import HigherEdCTA from "@/components/highered/HigherEdCTA";

export const metadata: Metadata = {
  title: `${syriaEducationalCouncilContent.heading} — UAECNE`,
};

export default function EducationCouncilSyriaPage() {
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
      />
      <HigherEdCTA cta={s.cta} />
    </>
  );
}
