import Link from "next/link";
import type { RatesResult } from "@/lib/rates";
import RateCard from "./RateCard";

export default function RatesSection({ rates, transactionDate, source }: RatesResult) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">Today&apos;s Rates</p>
          <h2 className="mt-4 font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            Foreign Exchange Rates
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Check the latest Papa Faru buying and selling rates before visiting our branch.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rates.map((rate) => (
            <RateCard key={rate.currency.code} rate={rate} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <Link href="/rates" className="btn btn-dark">
            See All Exchange Rates
          </Link>
          <p className="max-w-xl text-xs leading-relaxed text-muted">
            Rates are indicative and sourced from Bank of Tanzania reference rates. Please
            contact or visit our branch to confirm the final transaction rate.
          </p>
          {source === "bot" && transactionDate && (
            <span className="badge">BoT reference date: {transactionDate}</span>
          )}
          {source === "fallback" && (
            <span className="badge">Showing recent indicative rates. Live BoT feed temporarily unavailable.</span>
          )}
        </div>
      </div>
    </section>
  );
}
