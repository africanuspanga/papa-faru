"use client";

import { useMemo, useState } from "react";
import type { CurrencyRate } from "@/lib/rates";

interface ExchangeCalculatorProps {
  rates: CurrencyRate[];
}

function formatAmount(value: number): string {
  const decimals = value < 100 ? 2 : 0;
  return new Intl.NumberFormat("en-TZ", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Dark "counter display" panel: what you hand over → what you get back. */
export default function ExchangeCalculator({ rates }: ExchangeCalculatorProps) {
  const rateMap = useMemo(() => new Map(rates.map((r) => [r.currency.code, r])), [rates]);

  const [haveCode, setHaveCode] = useState<string>(
    rates.some((r) => r.currency.code === "USD") ? "USD" : rates[0]?.currency.code ?? "TZS"
  );
  const [wantCode, setWantCode] = useState<string>("TZS");
  const [amountInput, setAmountInput] = useState<string>("100");

  const amount = parseFloat(amountInput.replace(/,/g, ""));
  const hasAmount = amountInput.trim() !== "" && Number.isFinite(amount) && amount > 0;

  // Bureau buys your foreign currency at its buying rate, sells at its selling rate.
  const toTzs = (code: string, value: number): number => {
    if (code === "TZS") return value;
    const rate = rateMap.get(code);
    return rate ? value * rate.buyingRate : NaN;
  };
  const fromTzs = (code: string, tzs: number): number => {
    if (code === "TZS") return tzs;
    const rate = rateMap.get(code);
    return rate ? tzs / rate.sellingRate : NaN;
  };

  const result = hasAmount ? fromTzs(wantCode, toTzs(haveCode, amount)) : null;

  const indicativeRate = ((): string | null => {
    if (haveCode === wantCode) return null;
    if (haveCode === "TZS") {
      const rate = rateMap.get(wantCode);
      return rate ? `1 ${wantCode} = ${formatAmount(rate.sellingRate)} TZS (we sell)` : null;
    }
    if (wantCode === "TZS") {
      const rate = rateMap.get(haveCode);
      return rate ? `1 ${haveCode} = ${formatAmount(rate.buyingRate)} TZS (we buy)` : null;
    }
    const from = rateMap.get(haveCode);
    const to = rateMap.get(wantCode);
    if (!from || !to) return null;
    return `1 ${haveCode} = ${formatAmount(from.buyingRate / to.sellingRate)} ${wantCode}`;
  })();

  const swap = () => {
    setHaveCode(wantCode);
    setWantCode(haveCode);
  };

  const options = (
    <>
      <option value="TZS">TZS · Tanzanian Shilling</option>
      {rates.map((r) => (
        <option key={r.currency.code} value={r.currency.code}>
          {r.currency.code} · {r.currency.name}
        </option>
      ))}
    </>
  );

  return (
    <div className="board p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <div>
          <label htmlFor="calc-have" className="board-label">
            You hand over
          </label>
          <select
            id="calc-have"
            value={haveCode}
            onChange={(e) => setHaveCode(e.target.value)}
            className="field-dark mt-2 font-semibold"
          >
            {options}
          </select>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
            aria-label={`Amount in ${haveCode}`}
            className="field-dark tabular mt-2 font-mono text-lg"
          />
        </div>

        <button
          type="button"
          onClick={swap}
          aria-label="Swap currencies"
          className="mx-auto flex h-11 w-11 items-center justify-center rounded-[3px] border border-white/15 text-flap-text transition hover:border-red hover:text-white sm:mb-1"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 rotate-90 sm:rotate-0" aria-hidden="true">
            <path strokeLinecap="square" d="M7 7h12m0 0-4-4m4 4-4 4M17 17H5m0 0 4-4m-4 4 4 4" />
          </svg>
        </button>

        <div>
          <label htmlFor="calc-want" className="board-label">
            You get back
          </label>
          <select
            id="calc-want"
            value={wantCode}
            onChange={(e) => setWantCode(e.target.value)}
            className="field-dark mt-2 font-semibold"
          >
            {options}
          </select>
          <output
            htmlFor="calc-have calc-want"
            aria-live="polite"
            className="tabular mt-2 block truncate rounded-[3px] bg-black px-3.5 py-3 font-mono text-lg font-semibold text-flap-text"
          >
            {result !== null && Number.isFinite(result) ? formatAmount(result) : "—"}
          </output>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2 border-t border-white/8 pt-5 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="tabular font-mono text-flap-text/80">{indicativeRate ?? "Choose two different currencies"}</p>
        <p className="text-xs text-flap-text/50">Indicative. Confirmed at the counter.</p>
      </div>
    </div>
  );
}
