import { getT } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: `BSL (Bible Society) — UAECNE`,
};

export default async function BslPage() {
  const tx = await getT();
  return <ComingSoon name={tx("BSL (Bible Society)")} />;
}
