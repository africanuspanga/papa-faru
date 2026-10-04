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

/** Bank of Tanzania mean rates for 4 Oct 2026, used only if BoT is unreachable. */
export const FALLBACK_MEAN: Record<string, number> = {
  USD: 2639.25,
  EUR: 2969.42,
  GBP: 3489.88,
  SAR: 702.92,
  CNY: 393.65,
  KES: 20.33,
  UGX: 0.6615,
  CAD: 1854.32,
  CHF: 3187.5,
  AUD: 1839.29,
  ZAR: 158.59,
};
