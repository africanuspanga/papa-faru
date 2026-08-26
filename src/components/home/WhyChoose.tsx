import Image from "next/image";

const FEATURES = [
  {
    title: "Competitive Exchange Rates",
    description: "Get the best value for your money, updated from Bank of Tanzania reference rates.",
  },
  {
    title: "Fast & Secure Transactions",
    description: "Quick, safe and reliable service every time you visit our branch.",
  },
  {
    title: "Reliable Service You Can Count On",
    description: "Professional support and honest dealing every step of the way.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow">Where Trust Meets Value</p>
            <h2 className="mt-4 font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              Why Choose Papa Faru
            </h2>

            <ul className="mt-10 flex flex-col gap-7">
              {FEATURES.map((f) => (
                <li key={f.title} className="border-l-2 border-red pl-5">
                  <h3 className="font-display text-lg font-bold text-foreground">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-2xl lg:min-h-full">
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
