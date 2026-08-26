import Image from "next/image";

const FACTS = [
  "Bank of Tanzania–referenced rates",
  "Fast, same-day service",
  "Professional, licensed team",
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <p className="eyebrow">Where Trust Meets Value</p>
            <h2 className="mt-4 font-display text-4xl font-black leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              The bureau Dar es Salaam trusts for a fair exchange.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Every rate at Papa Faru is checked against Bank of Tanzania
              references before it reaches the board, so there are no
              surprises when you reach the counter. Our team at Mayfair Plaza
              handles each transaction quickly and securely, whether
              you&apos;re changing fifty dollars or five thousand.
            </p>

            <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-black/8 pt-6 text-sm font-medium text-foreground">
              {FACTS.map((fact, i) => (
                <li key={fact} className="flex items-center gap-5">
                  {i > 0 && <span className="h-4 w-px bg-black/12" aria-hidden="true" />}
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-2xl">
            <Image
              src="/photos/street-market.jpg"
              alt="A street in Dar es Salaam near Papa Faru Bureau de Change"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-6">
              <p className="text-sm font-semibold text-white">We value our customers.</p>
              <p className="mt-1 text-xs text-white/70">Mayfair Plaza, Mwai Kibaki Rd — Dar es Salaam</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
