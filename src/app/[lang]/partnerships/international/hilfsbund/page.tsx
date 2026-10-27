import { getT } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: `Hilfsbund — 2 branches — UAECNE`,
};

export default async function HilfsbundPage() {
  const tx = await getT();
  return <ComingSoon name={tx("Hilfsbund — 2 branches")} />;
}
