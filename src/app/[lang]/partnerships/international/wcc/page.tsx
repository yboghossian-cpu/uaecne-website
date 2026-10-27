import { getT } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: `WCC — UAECNE`,
};

export default async function WccPage() {
  const tx = await getT();
  return <ComingSoon name={tx("WCC")} />;
}
