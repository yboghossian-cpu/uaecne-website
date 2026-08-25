import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: `WCC — UAECNE`,
};

export default function WccPage() {
  return <ComingSoon name="WCC" />;
}
