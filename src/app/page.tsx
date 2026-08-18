import Hero from "@/components/home/Hero";
import TickerBand from "@/components/home/TickerBand";
import StatsRow from "@/components/home/StatsRow";
import SacredLegacy from "@/components/home/SacredLegacy";
import MinistriesGrid from "@/components/home/MinistriesGrid";
import News from "@/components/home/News";
import SpiritualHeritage from "@/components/home/SpiritualHeritage";
import DonateBand from "@/components/home/DonateBand";

export default function Home() {
  return (
    <>
      <Hero />
      <TickerBand />
      <StatsRow />
      <SacredLegacy />
      <MinistriesGrid />
      <News />
      <SpiritualHeritage />
      <DonateBand />
    </>
  );
}
