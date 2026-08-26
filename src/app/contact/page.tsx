import type { Metadata } from "next";
import { ADDRESS, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contact | Papa Faru Bureau de Change",
  description: "Visit or contact Papa Faru Bureau de Change at Mayfair Plaza, Mwai Kibaki Rd, Dar es Salaam.",
};

export default function ContactPage() {
  const mapQuery = encodeURIComponent(`Mayfair Plaza, Mwai Kibaki Rd, ${ADDRESS.split(",").pop()?.trim()}`);

  return (
    <div className="pb-20 pt-42 lg:pb-28 lg:pt-46">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          Visit or Reach Us
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-foreground">Location</h2>
              <p className="mt-2 text-muted">{ADDRESS}</p>
            </div>

            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-foreground">Call or WhatsApp</h2>
              <a href={`tel:${PHONE_TEL}`} className="mt-2 block text-xl font-semibold text-red">
                {PHONE_DISPLAY}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
              >
                <svg viewBox="0 0 32 32" fill="currentColor" className="h-4 w-4">
                  <path d="M16.004 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.26.6 4.44 1.73 6.37L3.2 28.8l6.6-1.7a12.75 12.75 0 0 0 6.2 1.58h.005c7.07 0 12.8-5.73 12.8-12.8s-5.73-12.68-12.8-12.68Z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            <p className="text-xs leading-relaxed text-muted">
              Opening hours: please call ahead to confirm. Hours may vary on public holidays.
            </p>
          </div>

          <div className="card overflow-hidden">
            <iframe
              title="Papa Faru Bureau de Change location"
              src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-full min-h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
