import { ADDRESS, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER } from "@/lib/format";

const STEPS = [
  { n: "01", title: "Check Today's Rate", body: "View the latest Papa Faru buying and selling rates online." },
  { n: "02", title: "Come to Mayfair Plaza", body: "Find us on Mwai Kibaki Rd, easy to reach and easy to park." },
  { n: "03", title: "Exchange & Go", body: "Our team completes your transaction quickly and securely." },
];

export default function VisitCta() {
  return (
    <section className="bg-ink py-20 text-white lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow eyebrow-light">Visit Us</p>
          <h2 className="mt-4 font-display text-4xl font-black tracking-tight sm:text-5xl">
            Exchanging In Simple Steps
          </h2>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6">
          {STEPS.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl font-black text-red">{s.n}</span>
                <div className="h-px flex-1 bg-white/12" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{s.body}</p>
              {i < STEPS.length - 1 && (
                <span className="absolute -right-3 top-2 hidden text-white/20 sm:block">→</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-red">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.1 7-11a7 7 0 10-14 0c0 5.9 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Mayfair Plaza
            </p>
            <p className="mt-2 max-w-sm text-lg font-semibold">{ADDRESS}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={`tel:${PHONE_TEL}`} className="btn btn-primary">
              Call {PHONE_DISPLAY}
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
