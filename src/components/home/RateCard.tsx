import type { CurrencyRate } from "@/lib/rates";
import { formatTzs } from "@/lib/format";

interface RateCardProps {
  rate: CurrencyRate;
}

export default function RateCard({ rate }: RateCardProps) {
  return (
    <article className="card p-6 transition-shadow hover:shadow-[0_8px_32px_rgba(10,10,10,0.08)]">
      <div className="flex items-center gap-3">
        <span className="text-3xl leading-none" aria-hidden="true">
          {rate.currency.flag}
        </span>
        <div>
          <h3 className="font-display text-base font-bold text-foreground">{rate.currency.code}</h3>
          <p className="text-xs text-muted">{rate.currency.name}</p>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-black/6 pt-4">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">Buying</dt>
          <dd className="tabular mt-1 text-lg font-bold text-foreground">{formatTzs(rate.buyingRate)}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">Selling</dt>
          <dd className="tabular mt-1 text-lg font-bold text-foreground">{formatTzs(rate.sellingRate)}</dd>
        </div>
      </dl>
    </article>
  );
}
