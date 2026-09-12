import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import SectionReveal from "@/components/SectionReveal";

export const metadata: Metadata = {
  title: "Get Advice | Sunny Chadha, REALTOR®",
  description:
    "Buying, selling, financing, and market report resources for Lower Mainland and Fraser Valley real estate.",
};

const TOPICS = [
  {
    href: "/advice/buying",
    title: "Buying",
    description:
      "A step-by-step look at the home buying process, from pre-approval to possession.",
  },
  {
    href: "/advice/selling",
    title: "Selling",
    description:
      "How to prepare, price, and market your home for the strongest possible outcome.",
  },
  {
    href: "/advice/financing",
    title: "Financing & Mortgage Basics",
    description:
      "The fundamentals of mortgages, rates, and down payments explained simply.",
  },
  {
    href: "/advice/market-reports",
    title: "Market Reports",
    description:
      "Regular updates on Lower Mainland and Fraser Valley pricing trends, inventory, and what they mean for you.",
  },
];

export default function AdviceIndexPage() {
  return (
    <div className="py-16">
      <Container>
        <SectionReveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Resources
          </p>
          <h1 className="mt-2 font-serif text-4xl text-navy">Get Advice</h1>
          <p className="mt-4 text-lg text-navy/60">
            Straightforward guidance on buying, selling, and financing
            residential and commercial property across the Lower Mainland and
            Fraser Valley — no jargon, no pressure.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {TOPICS.map((topic, i) => (
            <SectionReveal key={topic.href} delay={i * 0.06}>
              <Link
                href={topic.href}
                className="group block h-full rounded-2xl border border-navy/10 bg-white p-7 shadow-sm transition-shadow hover:shadow-lg"
              >
                <p className="font-serif text-2xl text-navy">{topic.title}</p>
                <p className="mt-2 text-sm text-navy/60">
                  {topic.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Read more
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
