import { getT, tMeta } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export async function generateMetadata(): Promise<Metadata> {
  return tMeta({
  title: `Old Age Homes — Lebanon, Syria — UAECNE`,
});
}

export default async function OldAgeHomesPage() {
  const tx = await getT();
  return <ComingSoon name={tx("Old Age Homes — Lebanon, Syria")} />;
}
