import type { Metadata } from "next";
import AdvicePageLayout from "@/components/AdvicePageLayout";

export const metadata: Metadata = {
  title: "Buying Advice | Sunny Chadha, REALTOR®",
  description:
    "A step-by-step look at the home buying process on the North Shore.",
};

export default function BuyingAdvicePage() {
  return (
    <AdvicePageLayout
      eyebrow="Get Advice"
      title="Buying a Home"
      intro="Buying a home is one of the biggest decisions you'll make. Here's how I help clients move through the process with confidence."
      ctaText="Ready to start your home search?"
    >
      <div>
        <h2 className="font-serif text-xl text-navy">1. Get Pre-Approved</h2>
        <p className="mt-2 leading-relaxed text-navy/70">
          Before touring homes, connect with a mortgage broker or lender to
          understand your real budget. A pre-approval also shows sellers
          you&apos;re a serious, qualified buyer — an advantage in a competitive
          offer situation.
        </p>
      </div>
      <div>
        <h2 className="font-serif text-xl text-navy">
          2. Define What You Need
        </h2>
        <p className="mt-2 leading-relaxed text-navy/70">
          We&apos;ll talk through must-haves versus nice-to-haves: neighbourhood,
          school catchment, commute, property type, and timeline. This keeps
          your search focused and efficient.
        </p>
      </div>
      <div>
        <h2 className="font-serif text-xl text-navy">3. Tour & Evaluate</h2>
        <p className="mt-2 leading-relaxed text-navy/70">
          I&apos;ll set up showings for homes that fit your criteria and walk you
          through what to look for — condition, strata health for condos and
          townhomes, and resale considerations.
        </p>
      </div>
      <div>
        <h2 className="font-serif text-xl text-navy">4. Make an Offer</h2>
        <p className="mt-2 leading-relaxed text-navy/70">
          I&apos;ll help you build a competitive, well-structured offer and
          negotiate on your behalf, including price, deposit, subjects, and
          possession date.
        </p>
      </div>
      <div>
        <h2 className="font-serif text-xl text-navy">
          5. Subjects & Closing
        </h2>
        <p className="mt-2 leading-relaxed text-navy/70">
          Once accepted, we&apos;ll work through financing, inspection, and any
          other subject conditions before moving to a smooth completion and
          possession day.
        </p>
      </div>
    </AdvicePageLayout>
  );
}
