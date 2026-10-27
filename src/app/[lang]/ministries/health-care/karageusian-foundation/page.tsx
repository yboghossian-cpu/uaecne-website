import { getT } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: `Karageusian Foundation — Lebanon, Syria — UAECNE`,
};

export default async function KarageusianFoundationPage() {
  const tx = await getT();
  return <ComingSoon name={tx("Karageusian Foundation — Lebanon, Syria")} />;
}
