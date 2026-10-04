// Client-safe formatting helpers and shared constants.

export const PHONE_DISPLAY = "+255 766 993 985";
export const PHONE_TEL = "+255766993985";
export const WHATSAPP_NUMBER = "255766993985";
export const ADDRESS = "Mayfair Plaza, Mwai Kibaki Rd, Dar es Salaam";

export function formatTzs(value: number): string {
  const decimals = value < 100 ? 2 : 0;
  return `TZS ${value.toLocaleString("en-TZ", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

export function formatRateNumber(value: number): string {
  const decimals = value < 100 ? 2 : 0;
  return value.toLocaleString("en-TZ", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Africa/Dar_es_Salaam",
  });
}

/** "2026-10-04" → "04 Oct 2026" (date-only, no timezone shift). */
export function formatRateDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
