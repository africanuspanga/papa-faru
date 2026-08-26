import type { Metadata } from "next";
import { getRates } from "@/lib/rates";
import ExchangeCalculator from "@/components/ExchangeCalculator";
import RateCard from "@/components/home/RateCard";

export const metadata: Metadata = {
  title: "Exchange Rates | Papa Faru Bureau de Change",
  description: "Today's indicative buying and selling rates at Papa Faru Bureau de Change, Dar es Salaam.",
};

export default async function RatesPage() {
  const { rates, transactionDate, source } = await getRates();

  return (
    <div className="bg-surface pb-20 pt-32 lg:pb-28 lg:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow">Today&apos;s Rates</p>
        <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          Foreign Exchange Rates
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Indicative rates for major currencies, derived from Bank of Tanzania reference
          rates. Final rates are confirmed at our Mayfair Plaza branch.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <ExchangeCalculator rates={rates} />

          <div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {rates.map((rate) => (
                <RateCard key={rate.currency.code} rate={rate} />
              ))}
            </div>

            <p className="mt-6 text-xs leading-relaxed text-muted">
              Rates are indicative and subject to change with market conditions.
              {source === "bot" && transactionDate
                ? ` BoT reference date: ${transactionDate}.`
                : " Showing recent indicative rates. Live BoT feed temporarily unavailable."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
