import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionReveal from "@/components/SectionReveal";
import CTAButton from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "About Sunny Chadha | REALTOR®",
  description:
    "Learn about Sunny Chadha, REALTOR® with Century 21 Coastal Realty Ltd., serving North and West Vancouver, BC.",
};

const CREDENTIALS = [
  "Licensed REALTOR® in British Columbia",
  "Member, Real Estate Board of Greater Vancouver",
  "Century 21 Coastal Realty Ltd.",
];

const SERVICE_AREAS = [
  "North Vancouver",
  "West Vancouver",
  "Lynn Valley",
  "Deep Cove",
  "Central Lonsdale",
  "Lower Lonsdale",
  "British Properties",
  "Ambleside & Dundarave",
];

export default function AboutPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-3">
          <SectionReveal className="lg:col-span-1">
            <div className="sticky top-24">
              {/* TODO(CJ): Swap for Sunny's real headshot once provided. */}
              <div className="flex h-56 w-56 items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-accent font-serif text-6xl text-white">
                SC
              </div>
              <p className="mt-6 font-serif text-2xl text-navy">
                Sunny Chadha
              </p>
              <p className="text-sm font-medium uppercase tracking-wide text-accent">
                REALTOR®
              </p>
              <div className="mt-4 space-y-1 text-sm text-navy/60">
                <a href="tel:+16045551234" className="block hover:text-accent">
                  (604) 555-1234
                </a>
                <a
                  href="mailto:sunny.chadha@century21.ca"
                  className="block hover:text-accent"
                >
                  sunny.chadha@century21.ca
                </a>
              </div>
              <div className="mt-6">
                <CTAButton href="/contact">Get in Touch</CTAButton>
              </div>
            </div>
          </SectionReveal>

          <div className="space-y-10 lg:col-span-2">
            <SectionReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                About Me
              </p>
              <h1 className="mt-2 font-serif text-4xl text-navy">
                Local expertise, personal service
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.06} className="space-y-4 text-navy/70">
              <p>
                Sunny Chadha is a REALTOR® with Century 21 Coastal Realty
                Ltd., specializing in residential real estate across North
                and West Vancouver. With a deep knowledge of the North
                Shore&apos;s distinct neighbourhoods — from the family-friendly
                streets of Lynn Valley to the waterfront estates of West
                Vancouver — Sunny brings clients clear, honest guidance
                through every stage of buying or selling.
              </p>
              <p>
                Sunny&apos;s approach is straightforward: listen first, advise
                honestly, and negotiate hard on behalf of every client.
                Whether you&apos;re purchasing your first condo or selling a
                long-time family home, you&apos;ll get the same level of
                attention and communication throughout.
              </p>
              <p>
                Outside of real estate, Sunny is an active member of the
                North Shore community and stays closely connected to the
                local market — the schools, transit changes, development
                projects, and everything else that shapes property values
                here.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h2 className="font-serif text-xl text-navy">Credentials</h2>
              <ul className="mt-4 space-y-2">
                {CREDENTIALS.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-2 text-sm text-navy/70"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {c}
                  </li>
                ))}
              </ul>
            </SectionReveal>

            <SectionReveal delay={0.14}>
              <h2 className="font-serif text-xl text-navy">Service Areas</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {SERVICE_AREAS.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-navy/15 px-3.5 py-1.5 text-sm text-navy/70"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.18}>
              <h2 className="font-serif text-xl text-navy">Brokerage</h2>
              <p className="mt-3 text-navy/70">
                Century 21 Coastal Realty Ltd. — an independently owned and
                operated brokerage serving the Lower Mainland.
              </p>
            </SectionReveal>
          </div>
        </div>
      </Container>
    </div>
  );
}
