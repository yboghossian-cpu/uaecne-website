import { getT } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: `National Sanatorium, Azounieh — UAECNE`,
};

export default async function NationalSanatoriumAzouniehPage() {
  const tx = await getT();
  return <ComingSoon name={tx("National Sanatorium, Azounieh")} />;
}
