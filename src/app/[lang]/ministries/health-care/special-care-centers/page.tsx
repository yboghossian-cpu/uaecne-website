import { getT, tMeta } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export async function generateMetadata(): Promise<Metadata> {
  return tMeta({
  title: `Special Care Centers — UAECNE`,
});
}

export default async function SpecialCareCentersPage() {
  const tx = await getT();
  return <ComingSoon name={tx("Special Care Centers")} />;
}
