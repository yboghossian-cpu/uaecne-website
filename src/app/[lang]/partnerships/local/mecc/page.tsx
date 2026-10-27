import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: `MECC — UAECNE`,
};

export default function MeccPage() {
  return <ComingSoon name="MECC" />;
}
