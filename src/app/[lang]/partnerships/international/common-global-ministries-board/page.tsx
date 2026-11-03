import { getT, tMeta } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export async function generateMetadata(): Promise<Metadata> {
  return tMeta({
  title: `Common Global Ministries Board (UCC/DOC) — UAECNE`,
});
}

export default async function CommonGlobalMinistriesBoardPage() {
  const tx = await getT();
  return <ComingSoon name={tx("Common Global Ministries Board (UCC/DOC)")} />;
}
