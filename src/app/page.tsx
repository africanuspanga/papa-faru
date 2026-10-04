import { getRates } from "@/lib/rates";
import Hero from "@/components/home/Hero";
import FaruStory from "@/components/home/FaruStory";
import CounterSection from "@/components/home/CounterSection";
import VisitSection from "@/components/home/VisitSection";

export default async function Home() {
  const ratesResult = await getRates();

  return (
    <>
      <Hero {...ratesResult} />
      <FaruStory />
      <CounterSection rates={ratesResult.rates} />
      <VisitSection />
    </>
  );
}
