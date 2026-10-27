import type { Metadata } from "next";
import HistoryHero from "@/components/history/HistoryHero";
import HistoryOpening from "@/components/history/HistoryOpening";
import HistoryGeography from "@/components/history/HistoryGeography";
import HistoryPillars from "@/components/history/HistoryPillars";
import HistoryQuote from "@/components/history/HistoryQuote";
import HistoryPartners from "@/components/history/HistoryPartners";
import HistoryGovernance from "@/components/history/HistoryGovernance";
import HistoryClose from "@/components/history/HistoryClose";

export const metadata: Metadata = {
  title: "History of the UAECNE — UAECNE",
};

export default function HistoryPage() {
  return (
    <>
      <HistoryHero />
      <HistoryOpening />
      <HistoryGeography />
      <HistoryPillars />
      <HistoryQuote />
      <HistoryPartners />
      <HistoryGovernance />
      <HistoryClose />
    </>
  );
}
