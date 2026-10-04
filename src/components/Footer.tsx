import Image from "next/image";
import Link from "next/link";
import { ADDRESS, PHONE_DISPLAY, PHONE_TEL } from "@/lib/format";

const LINKS = [
  { href: "/rates", label: "Exchange rates" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-16 sm:px-6 lg:px-8 lg:pb-14">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-4">
              <Image src="/rhino-mark-white.png" alt="" width={510} height={510} className="h-14 w-14" />
              <div>
                <p className="font-display text-2xl leading-none">Papa Faru</p>
                <p className="mt-1 text-sm font-semibold text-red">Bureau de Change</p>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
              Where trust meets value.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <ul className="flex flex-col gap-3">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="text-sm text-white/70">{ADDRESS}</p>
            <a href={`tel:${PHONE_TEL}`} className="tabular mt-3 inline-block font-mono text-lg font-semibold hover:text-red">
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/45 sm:flex-row sm:justify-between">
          <p>Rates shown online are indicative. The final rate is confirmed at our Mayfair Plaza counter.</p>
          <p>© {new Date().getFullYear()} Papa Faru Bureau de Change</p>
        </div>
      </div>
    </footer>
  );
}
