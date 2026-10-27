import { getL } from "@/lib/i18n/server";
import type { Metadata } from "next";
import { educationCouncilContent as educationCouncilContent__en } from "@/data/higherEdContent";
import CouncilHero from "@/components/highered/CouncilHero";
import CouncilAbout from "@/components/highered/CouncilAbout";
import CouncilStructure from "@/components/highered/CouncilStructure";
import CouncilSecretary from "@/components/highered/CouncilSecretary";
import HigherEdCTA from "@/components/highered/HigherEdCTA";

export const metadata: Metadata = {
  title: `${educationCouncilContent__en.heading} — UAECNE`,
};

export default async function EducationCouncilLebanonPage() {
  const L = await getL();
  const educationCouncilContent = L(educationCouncilContent__en);
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
