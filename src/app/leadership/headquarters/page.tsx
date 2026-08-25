import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Headquarters — UAECNE",
};

export default function HeadquartersPage() {
  return <ComingSoon name="Headquarters" />;
}
