import { getT } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: `Armenian Apostolic Church — UAECNE`,
};

export default async function ArmenianApostolicChurchPage() {
  const tx = await getT();
  return <ComingSoon name={tx("Armenian Apostolic Church")} />;
}
