export interface Currency {
  code: string;
  name: string;
  flag: string;
}

/** Currencies BoT publishes reference rates for that Papa Faru quotes. */
export const CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "KES", name: "Kenyan Shilling", flag: "🇰🇪" },
  { code: "UGX", name: "Ugandan Shilling", flag: "🇺🇬" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦" },
];

/**
 * Buy/sell spread applied around BoT's mean rate, and a static fallback mean
 * (used only if BoT is unreachable) so the page never breaks.
 *
 * These margin percentages are PLACEHOLDER EXAMPLES, mirroring how a bureau
 * typically marks up a mid-rate. Papa Faru management should confirm the
 * real commercial margin per currency.
 */
export const MARGIN_PERCENT = 1.2;

export const FALLBACK_MEAN: Record<string, number> = {
  USD: 2630,
  EUR: 3070,
  GBP: 3595,
  SAR: 702.5,
  CNY: 369,
  KES: 20.5,
  UGX: 0.745,
  CAD: 1925,
  CHF: 2950,
  AUD: 1715,
  ZAR: 147.5,
};
