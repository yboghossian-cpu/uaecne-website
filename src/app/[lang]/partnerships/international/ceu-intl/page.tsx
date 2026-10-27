import { getT } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: `CEU Int'l — UAECNE`,
};

export default async function CeuIntlPage() {
  const tx = await getT();
  return <ComingSoon name={tx("CEU Int'l")} />;
}
