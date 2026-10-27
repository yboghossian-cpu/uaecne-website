import { getT } from "@/lib/i18n/server";
import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: `GZB — UAECNE`,
};

export default async function GzbPage() {
  const tx = await getT();
  return <ComingSoon name={tx("GZB")} />;
}
