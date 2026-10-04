import Image from "next/image";
import Link from "next/link";

export default function FaruStory() {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-6 lg:py-6">
          <Image src="/rhino-mark.png" alt="" width={510} height={510} className="h-20 w-20 sm:h-24 sm:w-24" />

          <p className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-display text-5xl text-ink sm:text-6xl">faru</span>
            <span className="font-mono text-sm text-muted">/ˈfa.ru/</span>
            <span className="text-sm italic text-muted">noun, Kiswahili</span>
          </p>
          <p className="mt-3 text-lg text-ink">
            Rhinoceros. Heavy-set, steady, hard to push around.
          </p>

          <div className="mt-8 h-[3px] w-12 bg-red" />

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            We liked that for a bureau de change. Our rates follow the Bank of
            Tanzania reference, the board shows what we buy at and what we sell at,
            and the counter at Mayfair Plaza treats fifty dollars with the same care
            as five thousand.
          </p>

          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-ink underline decoration-red decoration-2 underline-offset-[6px] hover:text-red"
          >
            More about Papa Faru
          </Link>
        </div>

        <div className="relative min-h-[380px] overflow-hidden rounded-[4px] lg:col-span-6">
          <Image
            src="/photos/street-market.jpg"
            alt="A busy street in Dar es Salaam"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
