import Link from "next/link";
import type { RatesResult } from "@/lib/rates";
import RateBoard from "@/components/RateBoard";

const BOARD_CODES = ["USD", "EUR", "GBP", "SAR", "CNY", "KES"];

export default function Hero({ rates, transactionDate, source }: RatesResult) {
  const boardRates = rates.filter((r) => BOARD_CODES.includes(r.currency.code));

  return (
    <section className="pt-30">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Mayfair Plaza · Mwai Kibaki Rd</p>
            <h1 className="font-display mt-6 text-[2.75rem] leading-[1.02] text-ink sm:text-6xl lg:text-[5.25rem]">
              Where trust
              <br />
              meets <span className="text-red">value.</span>
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pb-3">
            <p className="max-w-md text-lg leading-relaxed text-muted">
              Today&apos;s buying and selling rates, worked out from the Bank of
              Tanzania reference rate. Check the board, then come and change your
              money with us on Mwai Kibaki Road.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/rates" className="btn btn-primary">
                See the full board
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Get directions
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <RateBoard rates={boardRates} transactionDate={transactionDate} source={source} />
        </div>
      </div>
    </section>
  );
}
