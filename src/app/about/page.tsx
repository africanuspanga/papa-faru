import type { Metadata } from "next";
import { ADDRESS, PHONE_DISPLAY, PHONE_TEL } from "@/lib/format";

export const metadata: Metadata = {
  title: "About | Papa Faru Bureau de Change",
  description: "Papa Faru Bureau de Change, your trusted exchange partner in Dar es Salaam.",
};

const VALUES = [
  {
    title: "Competitive Rates",
    body: "We work to give you the best value for your money on every exchange.",
  },
  {
    title: "Fast & Secure",
    body: "Quick, safe transactions handled by a professional team you can trust.",
  },
  {
    title: "Reliable Service",
    body: "Consistent, honest service. We value every customer who walks through our door.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-20 pt-32 lg:pb-28 lg:pt-36">
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

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="card p-6">
              <h3 className="font-display text-lg font-bold text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
            </div>
          ))}
        </div>

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
