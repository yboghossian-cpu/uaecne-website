import type { Metadata } from "next";
import { educationCouncilContent } from "@/data/higherEdContent";
import CouncilHero from "@/components/highered/CouncilHero";
import CouncilAbout from "@/components/highered/CouncilAbout";
import CouncilStructure from "@/components/highered/CouncilStructure";
import CouncilSecretary from "@/components/highered/CouncilSecretary";
import HigherEdCTA from "@/components/highered/HigherEdCTA";

export const metadata: Metadata = {
  title: `${educationCouncilContent.heading} — UAECNE`,
};

export default function EducationCouncilLebanonPage() {
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
