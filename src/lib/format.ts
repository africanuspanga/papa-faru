// Client-safe formatting helpers and shared constants.

export const PHONE_DISPLAY = "+255 766 993 985";
export const PHONE_TEL = "+255766993985";
export const WHATSAPP_NUMBER = "255766993985";
export const ADDRESS = "Mayfair Plaza, Mwai Kibaki Rd, Dar es Salaam";

export function formatTzs(value: number): string {
  const decimals = value < 10 ? 2 : 0;
  return `TZS ${value.toLocaleString("en-TZ", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

export function formatRateNumber(value: number): string {
  const decimals = value < 10 ? 2 : 0;
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
