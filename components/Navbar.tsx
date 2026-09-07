"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import NavLink from "@/components/NavLink";
import { useContactModal } from "@/components/ContactModalContext";

const ADVICE_LINKS = [
  { href: "/advice/buying", label: "Buying" },
  { href: "/advice/selling", label: "Selling" },
  { href: "/advice/financing", label: "Financing & Mortgages" },
  { href: "/advice/market-reports", label: "Market Reports" },
];

const NAV_LINKS = [
  { href: "/listings", label: "Listings" },
  { href: "/news", label: "Neighbourhood News" },
  { href: "/about", label: "About Me" },
  { href: "/testimonials", label: "Testimonials" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adviceOpen, setAdviceOpen] = useState(false);
  const pathname = usePathname();
  const { open } = useContactModal();

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-xl text-navy">Sunny Chadha</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-accent">
            Century 21 Coastal Realty
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <NavLink href="/" className="text-navy">
            Home
          </NavLink>
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} className="text-navy">
              {link.label}
            </NavLink>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setAdviceOpen(true)}
            onMouseLeave={() => setAdviceOpen(false)}
          >
            <button
              type="button"
              className={`group relative flex items-center gap-1 py-2 text-sm font-medium tracking-wide text-navy ${
                pathname.startsWith("/advice") ? "text-accent" : ""
              }`}
            >
              Get Advice
              <svg
                viewBox="0 0 24 24"
                className={`h-3.5 w-3.5 transition-transform ${adviceOpen ? "rotate-180" : ""}`}
                fill="none"
              >
                <path
                  d="m6 9 6 6 6-6"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                  pathname.startsWith("/advice") ? "scale-x-100" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {adviceOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full w-56 -translate-x-1/2 rounded-lg border border-navy/10 bg-white p-2 shadow-lg"
                >
                  <Link
                    href="/advice"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-navy hover:bg-neutral"
                  >
                    All Advice
                  </Link>
                  {ADVICE_LINKS.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block rounded-md px-3 py-2 text-sm text-navy/80 hover:bg-neutral"
                    >
                      {l.label}
                    </Link>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+16045551234"
            className="text-sm font-medium text-navy/70 hover:text-accent"
          >
            (604) 555-1234
          </a>
          <button
            type="button"
            onClick={open}
            className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent"
          >
            Contact
          </button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-navy lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            {mobileOpen ? (
              <path
                d="M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-navy/10 bg-white lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-navy hover:bg-neutral"
              >
                Home
              </Link>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-2 py-2.5 text-sm font-medium text-navy hover:bg-neutral"
                >
                  {link.label}
                </Link>
              ))}
              <p className="mt-2 px-2 text-xs font-semibold uppercase tracking-wide text-navy/40">
                Get Advice
              </p>
              {ADVICE_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-2 py-2.5 text-sm text-navy/80 hover:bg-neutral"
                >
                  {l.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  open();
                }}
                className="mt-3 rounded-full bg-navy px-5 py-2.5 text-center text-sm font-semibold text-white"
              >
                Contact
              </button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
