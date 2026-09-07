import Link from "next/link";

/**
 * TODO(CJ): Confirm required Century 21 Coastal Realty Ltd. brokerage
 * disclosure text and logo placement with the board/brokerage before launch —
 * many real estate boards require brokerage branding/disclosure even on an
 * agent's independently-owned website. Update the office address, brokerage
 * logo, and license disclosure copy below once confirmed.
 */
export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <p className="font-serif text-xl">Sunny Chadha</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold">
            REALTOR®
          </p>
          <p className="mt-4 text-sm text-white/60">
            Century 21 Coastal Realty Ltd.
            <br />
            North &amp; West Vancouver, BC
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <Link href="/listings" className="hover:text-gold">
                Listings
              </Link>
            </li>
            <li>
              <Link href="/advice" className="hover:text-gold">
                Get Advice
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-gold">
                Neighbourhood News
              </Link>
            </li>
            <li>
              <Link href="/testimonials" className="hover:text-gold">
                Testimonials
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
            About
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <Link href="/about" className="hover:text-gold">
                About Sunny
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gold">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-gold">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Get in Touch
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <a href="tel:+16045551234" className="hover:text-gold">
                (604) 555-1234
              </a>
            </li>
            <li>
              <a
                href="mailto:sunny.chadha@century21.ca"
                className="hover:text-gold"
              >
                sunny.chadha@century21.ca
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 text-center text-xs text-white/40 lg:px-10">
          <p>
            &copy; {new Date().getFullYear()} Sunny Chadha, REALTOR®. Not
            intended to solicit properties currently listed for sale.
          </p>
          <p>
            {/* TODO(CJ): insert Century 21 Coastal Realty Ltd. brokerage
            logo + full disclosure block here per board requirements. */}
            Independently owned website. Brokerage: Century 21 Coastal Realty
            Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
