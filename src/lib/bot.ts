import "server-only";

/**
 * Bank of Tanzania reference-rate fetcher.
 *
 * This site has no database or admin panel — every page request re-derives
 * today's rates from BoT's public page (cached for BOT_CACHE_SECONDS via
 * Next's fetch cache) and applies the margin in `currencies.ts`. If BoT is
 * unreachable, callers fall back to the last-known static rates so the page
 * never breaks.
 */

const BOT_URL = "https://www.bot.go.tz/ExchangeRate/excRates";
const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};
const FETCH_TIMEOUT_MS = 15000;
export const BOT_CACHE_SECONDS = 3600; // re-fetch at most once an hour

export interface ParsedBotRow {
  currencyCode: string;
  buyingRate: number;
  sellingRate: number;
  meanRate: number;
}

export interface ParsedBotPage {
  transactionDate: string | null; // YYYY-MM-DD
  rows: ParsedBotRow[];
}

const MONTHS: Record<string, string> = {
  jan: "01", january: "01",
  feb: "02", february: "02",
  mar: "03", march: "03",
  apr: "04", april: "04",
  may: "05",
  jun: "06", june: "06",
  jul: "07", july: "07",
  aug: "08", august: "08",
  sep: "09", september: "09",
  oct: "10", october: "10",
  nov: "11", november: "11",
  dec: "12", december: "12",
};

function stripHtml(fragment: string): string {
  return fragment
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/&#\d+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseNumberCell(text: string): number | null {
  const cleaned = text.replace(/[^\d.,-]/g, "").replace(/,/g, "");
  if (!cleaned || cleaned === "-" || cleaned === ".") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function extractCurrencyCode(text: string): string | null {
  const codes = text.toUpperCase().match(/\b[A-Z]{3}\b/g);
  if (!codes) return null;
  return codes[codes.length - 1];
}

function extractDate(htmlText: string): string | null {
  let m = /(\d{4})-(\d{2})-(\d{2})/.exec(htmlText);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;

  m = /(\d{1,2})-([A-Za-z]{3,9})-(\d{2,4})\b/.exec(htmlText);
  if (m) {
    const month = MONTHS[m[2].toLowerCase()];
    if (month) {
      const year = m[3].length === 2 ? `20${m[3]}` : m[3];
      return `${year}-${month}-${m[1].padStart(2, "0")}`;
    }
  }

  m = /(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)\s*,?\s+(\d{4})/.exec(htmlText);
  if (m) {
    const month = MONTHS[m[2].toLowerCase()];
    if (month) return `${m[3]}-${month}-${m[1].padStart(2, "0")}`;
  }

  m = /\b(\d{1,2})[/.](\d{1,2})[/.](\d{4})\b/.exec(htmlText);
  if (m) {
    const day = Number(m[1]);
    const month = Number(m[2]);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return `${m[3]}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }
  }
  return null;
}

/** Defensive regex/string-based parser for the BoT exchange-rates page. Pure. */
export function parseBotHtml(html: string): ParsedBotPage {
  const rows: ParsedBotRow[] = [];
  const rowMatches = html.match(/<tr[\s\S]*?<\/tr>/gi) ?? [];
  const rowDates: string[] = [];

  for (const rowHtml of rowMatches) {
    const cells = (rowHtml.match(/<t[dh][\s\S]*?<\/t[dh]>/gi) ?? []).map(stripHtml);
    if (cells.length < 3) continue;

    for (const cell of cells) {
      const d = extractDate(cell);
      if (d) {
        rowDates.push(d);
        break;
      }
    }

    const codeIndex = cells.findIndex((c) => extractCurrencyCode(c) !== null && !/^\d/.test(c));
    if (codeIndex === -1) continue;
    const currencyCode = extractCurrencyCode(cells[codeIndex]);
    if (!currencyCode) continue;

    const numericCells = cells
      .map((c) => parseNumberCell(c))
      .filter((v): v is number => v !== null);
    if (numericCells.length < 3) continue;

    let buying: number | null = null;
    let selling: number | null = null;
    let mean: number | null = null;
    for (let i = 0; i + 2 < numericCells.length; i++) {
      const a = numericCells[i];
      const b = numericCells[i + 1];
      const c = numericCells[i + 2];
      if (a < c && b >= c && Math.abs(b - c) / c < 0.5) {
        buying = a; selling = b; mean = c;
        break;
      }
    }
    if (buying === null || selling === null || mean === null) {
      const last3 = numericCells.slice(-3);
      [buying, selling, mean] = last3;
    }

    rows.push({ currencyCode, buyingRate: buying, sellingRate: selling, meanRate: mean });
  }

  const seen = new Set<string>();
  const deduped = rows.filter((r) => {
    if (seen.has(r.currencyCode)) return false;
    seen.add(r.currencyCode);
    return true;
  });

  let transactionDate: string | null = null;
  if (rowDates.length > 0) {
    const counts = new Map<string, number>();
    for (const d of rowDates) counts.set(d, (counts.get(d) ?? 0) + 1);
    transactionDate = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
  }
  if (!transactionDate) {
    transactionDate = extractDate(stripHtml(html));
  }

  return { transactionDate, rows: deduped };
}

/** Fetch + parse BoT's reference rates. Returns null on any failure. */
export async function fetchBotRates(): Promise<ParsedBotPage | null> {
  try {
    const res = await fetch(BOT_URL, {
      headers: FETCH_HEADERS,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      next: { revalidate: BOT_CACHE_SECONDS },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const parsed = parseBotHtml(html);
    if (parsed.rows.length < 5) return null;
    return parsed;
  } catch {
    return null;
  }
}
