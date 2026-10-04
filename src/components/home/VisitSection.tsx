import { ADDRESS, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER } from "@/lib/format";

interface VisitSectionProps {
  /** Render the heading as the page's h1 (contact page) instead of an h2. */
  asPageTitle?: boolean;
}

export default function VisitSection({ asPageTitle = false }: VisitSectionProps) {
  const Heading = asPageTitle ? "h1" : "h2";
  const mapQuery = encodeURIComponent("Mayfair Plaza, Mwai Kibaki Road, Dar es Salaam");

  return (
    <section className={asPageTitle ? "pb-20 pt-42 lg:pb-28 lg:pt-46" : "py-20 lg:py-28"}>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <p className="eyebrow">Find the counter</p>
          <Heading className="font-display mt-6 text-4xl leading-[1.05] text-ink sm:text-5xl">
            Mayfair Plaza,
            <br />
            Mwai Kibaki Rd.
          </Heading>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
            {ADDRESS}. Hours can change on public holidays, so call ahead if
            you&apos;re making a special trip or changing a large amount.
          </p>

          <dl className="mt-10 border-t-2 border-ink">
            <div className="flex items-baseline justify-between gap-4 border-b border-black/10 py-4">
              <dt className="text-sm font-semibold text-muted">Phone</dt>
              <dd>
                <a href={`tel:${PHONE_TEL}`} className="tabular font-mono text-lg font-semibold text-ink hover:text-red">
                  {PHONE_DISPLAY}
                </a>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-black/10 py-4">
              <dt className="text-sm font-semibold text-muted">WhatsApp</dt>
              <dd>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-ink hover:text-red"
                >
                  Message us
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:${PHONE_TEL}`} className="btn btn-primary">
              Call the bureau
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Open in Google Maps
            </a>
          </div>
        </div>

        <div className="min-h-[360px] overflow-hidden rounded-[4px] border-2 border-ink lg:col-span-7">
          <iframe
            title="Map showing Papa Faru Bureau de Change at Mayfair Plaza"
            src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-full min-h-[360px] w-full grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
