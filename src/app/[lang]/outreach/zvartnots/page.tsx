import { getT, tMeta } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export async function generateMetadata(): Promise<Metadata> {
  return tMeta({
  title: `Zvartnots — UAECNE`,
});
}

export default async function ZvartnotsPage() {
  const tx = await getT();
  return <ComingSoon name={tx("Zvartnots")} />;
}
