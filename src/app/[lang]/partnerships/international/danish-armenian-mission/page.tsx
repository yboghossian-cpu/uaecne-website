import { getT, tMeta } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export async function generateMetadata(): Promise<Metadata> {
  return tMeta({
  title: `Danish Armenian Mission — UAECNE`,
});
}

export default async function DanishArmenianMissionPage() {
  const tx = await getT();
  return <ComingSoon name={tx("Danish Armenian Mission")} />;
}
