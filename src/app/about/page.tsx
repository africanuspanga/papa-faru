import type { Metadata } from "next";
import { ADDRESS, PHONE_DISPLAY, PHONE_TEL } from "@/lib/format";

export const metadata: Metadata = {
  title: "About | Papa Faru Bureau de Change",
  description: "Papa Faru Bureau de Change, your trusted exchange partner in Dar es Salaam.",
};

const VALUES = ["Competitive rates", "Fast & secure transactions", "Reliable, honest service"];

export default function AboutPage() {
  return (
    <div className="pb-20 pt-42 lg:pb-28 lg:pt-46">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow">About Us</p>
        <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          Where Trust Meets Value
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Papa Faru Bureau de Change is a foreign currency exchange bureau based at
          Mayfair Plaza on Mwai Kibaki Rd, Dar es Salaam. We help individuals and
          businesses exchange major foreign currencies quickly, securely, and at
          competitive rates.
        </p>

        <ul className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-black/8 pt-6 text-sm font-medium text-foreground">
          {VALUES.map((v, i) => (
            <li key={v} className="flex items-center gap-5">
              {i > 0 && <span className="h-4 w-px bg-black/12" aria-hidden="true" />}
              {v}
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl bg-ink p-8 text-white">
          <h2 className="font-display text-2xl font-bold">Visit Our Branch</h2>
          <p className="mt-2 text-white/70">{ADDRESS}</p>
          <a href={`tel:${PHONE_TEL}`} className="mt-4 inline-block text-lg font-semibold text-red">
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </div>
  );
}
