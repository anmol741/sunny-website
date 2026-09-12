import type { Metadata } from "next";
import AdvicePageLayout from "@/components/AdvicePageLayout";

export const metadata: Metadata = {
  title: "Selling Advice | Sunny Chadha, REALTOR®",
  description:
    "How to prepare, price, and market your home for the strongest outcome.",
};

export default function SellingAdvicePage() {
  return (
    <AdvicePageLayout
      eyebrow="Get Advice"
      title="Selling Your Home"
      intro="A successful sale starts long before your listing goes live. Here's how I help sellers prepare, price, and market their home."
      ctaText="Thinking about listing your home?"
    >
      <div>
        <h2 className="font-serif text-xl text-navy">1. Home Evaluation</h2>
        <p className="mt-2 leading-relaxed text-navy/70">
          I&apos;ll walk through your home and provide a realistic, data-backed
          valuation based on recent comparable sales in your specific
          neighbourhood.
        </p>
      </div>
      <div>
        <h2 className="font-serif text-xl text-navy">
          2. Prepare & Stage
        </h2>
        <p className="mt-2 leading-relaxed text-navy/70">
          Small, targeted improvements — decluttering, fresh paint, minor
          repairs — consistently deliver the best return. I&apos;ll give you a
          prioritized list based on your budget and timeline.
        </p>
      </div>
      <div>
        <h2 className="font-serif text-xl text-navy">
          3. Professional Marketing
        </h2>
        <p className="mt-2 leading-relaxed text-navy/70">
          Professional photography, a compelling listing description, and
          targeted online promotion ensure your home reaches serious buyers
          quickly.
        </p>
      </div>
      <div>
        <h2 className="font-serif text-xl text-navy">4. Negotiate Offers</h2>
        <p className="mt-2 leading-relaxed text-navy/70">
          I&apos;ll present and negotiate every offer with your goals in mind —
          not just price, but subjects, deposit, and timeline that work best
          for you.
        </p>
      </div>
      <div>
        <h2 className="font-serif text-xl text-navy">5. Close with Ease</h2>
        <p className="mt-2 leading-relaxed text-navy/70">
          From accepted offer to possession day, I coordinate with lawyers,
          notaries, and other agents so the process stays on track.
        </p>
      </div>
    </AdvicePageLayout>
  );
}
