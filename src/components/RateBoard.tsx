import type { CSSProperties } from "react";
import type { CurrencyRate } from "@/lib/rates";
import { formatRateDate, formatRateNumber } from "@/lib/format";

interface RateBoardProps {
  rates: CurrencyRate[];
  transactionDate: string | null;
  source: "bot" | "fallback";
}

/** One split-flap tile per character; separators (, .) sit between tiles. */
function Flaps({ text, start, code = false }: { text: string; start: number; code?: boolean }) {
  return (
    <span className="flaps" aria-hidden="true">
      {[...text].map((ch, i) =>
        ch === "," || ch === "." ? (
          <span key={i} className="flap-sep">
            {ch}
          </span>
        ) : (
          <span
            key={i}
            className={`flap ${code ? "flap-code" : ""}`}
            style={{ "--i": start + i } as CSSProperties}
          >
            {ch}
          </span>
        )
      )}
    </span>
  );
}

export default function RateBoard({ rates, transactionDate, source }: RateBoardProps) {
  const dateLabel =
    source === "bot" && transactionDate ? `BoT ref ${formatRateDate(transactionDate)}` : "Indicative";

  return (
    <div className="board overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-white/8 px-4 py-3 sm:px-6">
        <p className="board-label whitespace-nowrap">Papa Faru<span className="hidden sm:inline"> · Mayfair Plaza</span></p>
        <p className="board-label flex items-center gap-2 whitespace-nowrap">
          <span className="h-1.5 w-1.5 rounded-full bg-red" aria-hidden="true" />
          {dateLabel}
        </p>
      </div>

      <table className="w-full border-collapse [--flap-size:0.85rem] min-[360px]:[--flap-size:0.95rem] sm:[--flap-size:1.3rem] lg:[--flap-size:1.55rem]">
        <caption className="sr-only">
          Papa Faru buying and selling rates in Tanzanian shillings. {dateLabel}.
        </caption>
        <thead>
          <tr className="text-left">
            <th scope="col" className="board-label pb-2 pl-3 pr-1 pt-4 font-medium sm:px-6">Currency</th>
            <th scope="col" className="hidden w-full md:table-cell" />
            <th scope="col" className="board-label pb-2 pl-2 pr-3 pt-4 text-right font-medium sm:pl-4 sm:pr-12">We buy</th>
            <th scope="col" className="board-label pb-2 pl-2 pr-3 pt-4 text-right font-medium sm:px-6">We sell</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate, row) => {
            const buy = formatRateNumber(rate.buyingRate);
            const sell = formatRateNumber(rate.sellingRate);
            const base = row * 6;
            return (
              <tr key={rate.currency.code} className="border-t border-white/[0.05]">
                <th scope="row" className="py-2 pl-3 pr-1 text-left sm:px-6 sm:py-2.5">
                  <Flaps text={rate.currency.code} start={base} code />
                  <span className="sr-only">{rate.currency.name}</span>
                </th>
                <td className="hidden w-full py-2 pl-2 text-sm text-flap-text/55 md:table-cell">{rate.currency.name}</td>
                <td className="py-2 pl-2 pr-3 text-right sm:py-2.5 sm:pl-4 sm:pr-12">
                  <Flaps text={buy} start={base + 3} />
                  <span className="sr-only">Buy {buy}</span>
                </td>
                <td className="py-2 pl-2 pr-3 text-right sm:px-6 sm:py-2.5">
                  <Flaps text={sell} start={base + 4} />
                  <span className="sr-only">Sell {sell}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="board-label border-t border-white/8 px-4 py-3 normal-case tracking-normal sm:px-6">
        TZS per unit. Indicative — the final rate is confirmed at the counter.
        {source === "fallback" && " Live Bank of Tanzania feed is unavailable right now."}
      </p>
    </div>
  );
}
