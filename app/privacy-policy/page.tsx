import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Privacy Policy | Sunny Chadha, REALTOR®",
  description: "Privacy policy for sunnychadha.ca",
};

// TODO(CJ/Anmol): This is placeholder copy only. Replace with the final
// drafted privacy policy (to be provided separately) before launch, and have
// it reviewed against PIPEDA / CASL requirements and Century 21 /
// brokerage-level policy obligations.
export default function PrivacyPolicyPage() {
  return (
    <div className="py-16">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          Legal
        </p>
        <h1 className="mt-2 font-serif text-4xl text-navy">Privacy Policy</h1>
        <p className="mt-2 text-sm text-navy/50">
          Last updated: Draft — pending final legal review
        </p>

        <div className="prose mt-8 space-y-6 text-navy/70">
          <p>
            This Privacy Policy explains how Sunny Chadha and Century 21
            Coastal Realty Ltd. (&quot;we&quot;, &quot;us&quot;) collect,
            use, and disclose personal information you provide through this
            website, in accordance with applicable Canadian privacy law,
            including the Personal Information Protection and Electronic
            Documents Act (PIPEDA) and Canada&apos;s Anti-Spam Legislation
            (CASL).
          </p>

          <div>
            <h2 className="font-serif text-xl text-navy">
              Information We Collect
            </h2>
            <p className="mt-2">
              When you submit a contact form, showing request, or newsletter
              sign-up on this site, we collect the information you provide —
              typically your name, email address, phone number, and any
              message details.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">
              How We Use Your Information
            </h2>
            <p className="mt-2">
              We use the information you provide to respond to your
              inquiries, schedule showings, and, where you have consented,
              to contact you by call, email, and text regarding real estate
              services. Your information may be stored in our customer
              relationship management (CRM) system, Follow Up Boss.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">
              Consent &amp; Opting Out
            </h2>
            <p className="mt-2">
              By submitting a form on this site with the consent checkbox
              selected, you agree to be contacted by Century 21 Canada and
              Sunny Chadha via call, email, and text for real estate
              services. You may opt out at any time by replying
              &quot;stop&quot; to any text message, replying
              &quot;help&quot; for assistance, or by clicking the
              unsubscribe link included in our emails. Message and data
              rates may apply, and message frequency may vary.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">
              Sharing of Information
            </h2>
            <p className="mt-2">
              We do not sell your personal information. It may be shared
              with Century 21 Coastal Realty Ltd. and service providers who
              support our business operations (such as our CRM provider),
              solely for the purposes described in this policy.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">Your Rights</h2>
            <p className="mt-2">
              You may request access to, correction of, or deletion of your
              personal information at any time by contacting us using the
              details on our{" "}
              <a
                href="/contact"
                className="text-accent underline underline-offset-2"
              >
                Contact page
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">Contact Us</h2>
            <p className="mt-2">
              Questions about this policy can be directed to Sunny Chadha at
              sunny.chadha@century21.ca or (604) 555-1234.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
