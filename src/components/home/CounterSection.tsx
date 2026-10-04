import type { CurrencyRate } from "@/lib/rates";
import ExchangeCalculator from "@/components/ExchangeCalculator";

export default function CounterSection({ rates }: { rates: CurrencyRate[] }) {
  return (
    <section className="bg-red py-20 text-white lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <p className="eyebrow eyebrow-light">Before you come in</p>
          <h2 className="font-display mt-6 text-4xl leading-[1.05] sm:text-5xl">
            Know the amount before you queue.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/85">
            Pick what you&apos;re bringing and what you need. We work it out with
            today&apos;s board rates, so you know roughly what to expect at the
            counter.
          </p>
        </div>
        <div className="lg:col-span-7">
          <ExchangeCalculator rates={rates} />
        </div>
      </div>
    </section>
  );
}
