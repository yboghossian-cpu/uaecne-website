import { getT } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: `Armenian Catholic Church — UAECNE`,
};

export default async function ArmenianCatholicChurchPage() {
  const tx = await getT();
  return <ComingSoon name={tx("Armenian Catholic Church")} />;
}
