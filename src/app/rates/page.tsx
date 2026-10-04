import type { Metadata } from "next";
import { getRates } from "@/lib/rates";
import RateBoard from "@/components/RateBoard";
import ExchangeCalculator from "@/components/ExchangeCalculator";

export const metadata: Metadata = {
  title: "Exchange Rates | Papa Faru Bureau de Change",
  description: "Today's indicative buying and selling rates at Papa Faru Bureau de Change, Dar es Salaam.",
};

export default async function RatesPage() {
  const { rates, transactionDate, source } = await getRates();

  return (
    <div className="pb-20 pt-42 lg:pb-28 lg:pt-46">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Today&apos;s board</p>
            <h1 className="font-display mt-6 text-4xl leading-[1.05] text-ink sm:text-6xl">
              Exchange rates
            </h1>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-muted lg:col-span-5 lg:pb-2">
            &ldquo;We buy&rdquo; is what we pay for your foreign currency. &ldquo;We
            sell&rdquo; is what you pay us for it. Both in Tanzanian shillings.
          </p>
        </div>

        <div className="mt-12">
          <RateBoard rates={rates} transactionDate={transactionDate} source={source} />
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl leading-tight text-ink">Work out an amount</h2>
            <p className="mt-3 text-muted">
              Uses the rates on the board above. The counter confirms the final figure.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ExchangeCalculator rates={rates} />
          </div>
        </div>
      </div>
    </div>
  );
}
