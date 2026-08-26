import { getRates } from "@/lib/rates";
import Hero from "@/components/home/Hero";
import RatesSection from "@/components/home/RatesSection";
import WhyChoose from "@/components/home/WhyChoose";
import VisitCta from "@/components/home/VisitCta";

export default async function Home() {
  const ratesResult = await getRates();

  return (
    <>
      <Hero rates={ratesResult.rates} />
      <RatesSection {...ratesResult} />
      <WhyChoose />
      <VisitCta />
    </>
  );
}
