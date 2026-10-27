import { getT } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: `Common Global Ministries Board (UCC/DOC) — UAECNE`,
};

export default async function CommonGlobalMinistriesBoardPage() {
  const tx = await getT();
  return <ComingSoon name={tx("Common Global Ministries Board (UCC/DOC)")} />;
}
