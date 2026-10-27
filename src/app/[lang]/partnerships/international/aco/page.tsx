import { getT } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: `ACO — 2 branches — UAECNE`,
};

export default async function AcoPage() {
  const tx = await getT();
  return <ComingSoon name={tx("ACO — 2 branches")} />;
}
