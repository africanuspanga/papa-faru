"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/format";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/rates", label: "Exchange Rates" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled || open ? "border-black/10 shadow-[0_1px_0_rgba(0,0,0,0.02)]" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Papa Faru Bureau de Change home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative py-2 text-sm font-medium transition-colors ${
                    active ? "text-ink" : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {link.label}
                  {active && <span className="absolute inset-x-0 -bottom-[1px] h-0.5 bg-red" />}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={`tel:${PHONE_TEL}`} className="text-sm font-semibold text-ink/70 transition-colors hover:text-ink">
            {PHONE_DISPLAY}
          </a>
          <Link href="/contact" className="btn btn-primary">
            Visit Us
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-black/10 bg-white px-4 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium ${
                    pathname === link.href ? "bg-red-soft text-red" : "text-ink/70 hover:bg-surface"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={`tel:${PHONE_TEL}`} className="btn btn-outline mt-4 w-full">
            Call {PHONE_DISPLAY}
          </a>
        </div>
      )}
    </header>
  );
}
