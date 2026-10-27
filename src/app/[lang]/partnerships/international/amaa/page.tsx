import { getT } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: `AMAA — UAECNE`,
};

export default async function AmaaPage() {
  const tx = await getT();
  return <ComingSoon name={tx("AMAA")} />;
}
