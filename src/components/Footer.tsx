import Link from "next/link";
import Logo from "@/components/Logo";
import { ADDRESS, PHONE_DISPLAY, PHONE_TEL } from "@/lib/format";

const LINKS = [
  { href: "/rates", label: "Exchange Rates" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/8 bg-surface text-ink">
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-14 sm:px-6 lg:px-8 lg:pb-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Your trusted exchange partner in Dar es Salaam, where trust meets value.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-red">Explore</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-red">Visit Us</h3>
            <p className="mt-4 text-sm text-muted">{ADDRESS}</p>
            <a href={`tel:${PHONE_TEL}`} className="mt-3 inline-block text-lg font-semibold text-ink transition-colors hover:text-red">
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-black/8 pt-6">
          <p className="text-xs leading-relaxed text-muted">
            Exchange rates displayed online are indicative and subject to change. Final
            transaction rates are confirmed at our Mayfair Plaza branch.
          </p>
          <p className="mt-3 text-xs text-muted">
            © {new Date().getFullYear()} Papa Faru Bureau de Change. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
