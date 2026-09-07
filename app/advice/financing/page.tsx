import type { Metadata } from "next";
import AdvicePageLayout from "@/components/AdvicePageLayout";

export const metadata: Metadata = {
  title: "Financing & Mortgage Basics | Sunny Chadha, REALTOR®",
  description:
    "The fundamentals of mortgages, rates, and down payments explained simply.",
};

export default function FinancingAdvicePage() {
  return (
    <AdvicePageLayout
      eyebrow="Get Advice"
      title="Financing & Mortgage Basics"
      intro="Understanding financing is the foundation of a confident home search. Here's a plain-language overview of the essentials."
      ctaText="Want an introduction to a trusted mortgage broker?"
    >
      <div>
        <h2 className="font-serif text-xl text-navy">Down Payment</h2>
        <p className="mt-2 leading-relaxed text-navy/70">
          In Canada, minimum down payments are 5% on the first $500,000 of a
          home&apos;s price, 10% on the portion between $500,000 and $1.5 million,
          and 20% above $1.5 million. Anything under 20% typically requires
          mortgage default insurance.
        </p>
      </div>
      <div>
        <h2 className="font-serif text-xl text-navy">
          Fixed vs. Variable Rates
        </h2>
        <p className="mt-2 leading-relaxed text-navy/70">
          A fixed rate stays the same for your term, offering predictability.
          A variable rate moves with the lender&apos;s prime rate — it can save
          money over time but carries more uncertainty. The right choice
          depends on your risk tolerance and financial plan.
        </p>
      </div>
      <div>
        <h2 className="font-serif text-xl text-navy">Pre-Approval</h2>
        <p className="mt-2 leading-relaxed text-navy/70">
          A mortgage pre-approval gives you a clear budget and often locks in
          a rate for a set period, protecting you if rates rise while you
          shop.
        </p>
      </div>
      <div>
        <h2 className="font-serif text-xl text-navy">
          Closing Costs to Budget For
        </h2>
        <p className="mt-2 leading-relaxed text-navy/70">
          Beyond your down payment, plan for BC Property Transfer Tax, legal
          fees, home inspection, appraisal, and moving costs — typically
          1.5–4% of the purchase price in total.
        </p>
      </div>
      <p className="text-sm text-navy/50">
        This overview is general information, not financial advice. Speak
        with a licensed mortgage professional for guidance specific to your
        situation.
      </p>
    </AdvicePageLayout>
  );
}
