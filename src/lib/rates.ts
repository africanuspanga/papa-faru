import "server-only";
import { fetchBotRates } from "@/lib/bot";
import { CURRENCIES, FALLBACK_MEAN, MARGIN_PERCENT, type Currency } from "@/lib/currencies";

export interface CurrencyRate {
  currency: Currency;
  buyingRate: number;
  sellingRate: number;
}

export interface RatesResult {
  rates: CurrencyRate[];
  transactionDate: string | null;
  source: "bot" | "fallback";
}

function round(value: number): number {
  return value < 100 ? Math.round(value * 100) / 100 : Math.round(value);
}

function applyMargin(mean: number): { buyingRate: number; sellingRate: number } {
  return {
    buyingRate: round(mean * (1 - MARGIN_PERCENT / 100)),
    sellingRate: round(mean * (1 + MARGIN_PERCENT / 100)),
  };
}

/**
 * Today's Papa Faru rates: BoT mean rate ± margin, re-fetched at most once an
 * hour (see BOT_CACHE_SECONDS in lib/bot.ts). Falls back to a static mean per
 * currency if BoT is unreachable, so the site never shows a broken page.
 */
export async function getRates(): Promise<RatesResult> {
  const bot = await fetchBotRates();

  if (bot) {
    const meanByCode = new Map(bot.rows.map((r) => [r.currencyCode, r.meanRate]));
    const rates: CurrencyRate[] = CURRENCIES.map((currency) => {
      const mean = meanByCode.get(currency.code) ?? FALLBACK_MEAN[currency.code];
      return { currency, ...applyMargin(mean) };
    });
    return { rates, transactionDate: bot.transactionDate, source: "bot" };
  }

  const rates: CurrencyRate[] = CURRENCIES.map((currency) => ({
    currency,
    ...applyMargin(FALLBACK_MEAN[currency.code]),
  }));
  return { rates, transactionDate: null, source: "fallback" };
}
