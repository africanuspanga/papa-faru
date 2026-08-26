import Image from "next/image";
import Link from "next/link";
import type { CurrencyRate } from "@/lib/rates";
import ExchangeCalculator from "@/components/ExchangeCalculator";

interface HeroProps {
  rates: CurrencyRate[];
}

export default function Hero({ rates }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-20">
      <div className="absolute inset-0">
        <Image
          src="/photos/hero-citylights.jpg"
          alt="Dar es Salaam skyline at dusk"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="hero-scrim absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="grid items-end gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-up">
            <p className="eyebrow eyebrow-light">Bureau de Change — Dar es Salaam</p>
            <h1 className="mt-5 font-display text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl">
              Your Trusted
              <br />
              <span className="text-red">Exchange Partner.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Where trust meets value. Get competitive exchange rates and fast,
              secure service at Papa Faru Bureau de Change. Check today&apos;s
              rates online, then visit us at Mayfair Plaza.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/rates" className="btn btn-primary">
                View Today&apos;s Rates
              </Link>
              <Link href="/contact" className="btn btn-ghost-light">
                Visit Our Branch
              </Link>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm text-white/60">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0 text-red">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.1 7-11a7 7 0 10-14 0c0 5.9 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Mayfair Plaza, Mwai Kibaki Rd, Dar es Salaam
            </p>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "150ms" }}>
            <ExchangeCalculator rates={rates} />
          </div>
        </div>
      </div>
    </section>
  );
}
