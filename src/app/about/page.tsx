import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/format";

export const metadata: Metadata = {
  title: "About | Papa Faru Bureau de Change",
  description: "Papa Faru Bureau de Change, your trusted exchange partner in Dar es Salaam.",
};

export default function AboutPage() {
  return (
    <div className="pb-20 pt-42 lg:pb-28 lg:pt-46">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">About Papa Faru</p>
            <h1 className="font-display mt-6 text-4xl leading-[1.05] text-ink sm:text-6xl">
              A bureau named after the rhino.
            </h1>
            <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
              <p>
                Papa Faru Bureau de Change is a foreign exchange bureau at Mayfair
                Plaza on Mwai Kibaki Road, Dar es Salaam. We buy and sell the major
                world currencies and the regional ones our customers travel and
                trade in — US dollars, euros and pounds, Saudi riyals and Chinese
                yuan, Kenyan and Ugandan shillings.
              </p>
              <p>
                <em className="font-semibold not-italic text-ink">Faru</em> is
                Kiswahili for rhino. We chose it because a good bureau should be the
                same: steady, dependable and hard to push around. Our rates follow
                the Bank of Tanzania reference rate, we show both what we buy at and
                what we sell at, and we give every customer the same straight answer
                at the counter.
              </p>
              <p>
                Rates on this website are indicative. The rate for your transaction
                is confirmed when you&apos;re with us.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/rates" className="btn btn-primary">
                See today&apos;s rates
              </Link>
              <a href={`tel:${PHONE_TEL}`} className="btn btn-outline">
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[4px]">
              <Image
                src="/photos/street-market.jpg"
                alt="A busy street in Dar es Salaam"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <div className="mt-6 flex items-center gap-4">
              <Image src="/rhino-mark.png" alt="" width={510} height={510} className="h-12 w-12" />
              <p className="text-sm text-muted">The Papa Faru rhino, from our sign at Mayfair Plaza.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
