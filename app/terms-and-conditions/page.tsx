import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Terms and Conditions | Sunny Chadha, REALTOR®",
  description: "Terms and Conditions for sunnychadha.com",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="py-16">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          Legal
        </p>
        <h1 className="mt-2 font-serif text-4xl text-navy">
          Terms and Conditions
        </h1>
        <p className="mt-2 text-sm text-navy/50">
          Last updated: September 10, 2026
        </p>

        <div className="prose mt-8 space-y-6 text-navy/70">
          <p>
            Welcome to sunnychadha.com (&quot;the Site&quot;), operated by
            Sunny Chadha, REALTOR®, Century 21 Coastal Realty Ltd. By
            accessing or using this Site, you agree to the following Terms
            and Conditions.
          </p>

          <div>
            <h2 className="font-serif text-xl text-navy">Use of This Site</h2>
            <p className="mt-2">
              This Site is provided for informational purposes to help you
              learn about real estate services, browse property listings,
              and contact Sunny Chadha. You agree to use this Site only for
              lawful purposes.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">
              Listing Information
            </h2>
            <p className="mt-2">
              Property listings displayed on this Site are sourced from the
              Multiple Listing Service® (MLS®) and other data providers.
              While we strive for accuracy, listing details (price,
              availability, square footage, etc.) are not guaranteed and may
              change without notice. Always verify details directly with us
              before making decisions.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">
              No Real Estate or Legal Advice
            </h2>
            <p className="mt-2">
              Content on this Site is general information only and does not
              constitute real estate, legal, financial, or tax advice. For
              advice specific to your situation, consult Sunny Chadha
              directly or the appropriate licensed professional.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">
              Intellectual Property
            </h2>
            <p className="mt-2">
              All content on this Site — text, images, graphics, and design
              — is owned by or licensed to Sunny Chadha / Century 21 Coastal
              Realty Ltd. and may not be copied, reproduced, or distributed
              without permission, except property photos/listing content
              which remain the property of their respective listing
              brokerages per MLS® rules.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">
              Third-Party Links
            </h2>
            <p className="mt-2">
              This Site may link to third-party websites (e.g., mortgage
              calculators, neighbourhood resources). We are not responsible
              for the content or practices of external sites.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">
              Limitation of Liability
            </h2>
            <p className="mt-2">
              Sunny Chadha and Century 21 Coastal Realty Ltd. are not liable
              for any damages arising from your use of this Site, including
              reliance on listing information, to the fullest extent
              permitted by law.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">Communications</h2>
            <p className="mt-2">
              By submitting a form on this Site, you consent to be contacted
              by Century 21 Canada and Sunny Chadha via call, email, and text
              as described in our{" "}
              <a
                href="/privacy-policy"
                className="text-accent underline underline-offset-2"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">
              SMS/Text Messaging Terms
            </h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                We use SMS to confirm appointments, send reminders, and
                notify clients of schedule updates or important changes.
              </li>
              <li>
                You can cancel the SMS service at any time. Just text
                &quot;STOP&quot;. After you send the SMS message
                &quot;STOP&quot; to us, we will send you an SMS message to
                confirm that you have been unsubscribed. After this, you
                will no longer receive SMS messages from us. If you want to
                join again, just sign up as you did the first time, and we
                will start sending SMS messages to you again.
              </li>
              <li>
                If you are experiencing issues with the messaging program,
                you can reply with the keyword &quot;HELP&quot; for more
                assistance, or you can get help directly at{" "}
                <a
                  href="mailto:sunny.chadha@century21.ca"
                  className="text-accent underline underline-offset-2"
                >
                  sunny.chadha@century21.ca
                </a>
                .
              </li>
              <li>Carriers are not liable for delayed or undelivered messages.</li>
              <li>
                As always, message and data rates may apply for any messages
                sent to you from us and to us from you. Message frequency
                may vary. If you have any questions about your text plan or
                data plan, it is best to contact your wireless provider.
              </li>
              <li>
                If you have any questions regarding privacy, please read our
                privacy policy:{" "}
                <a
                  href="https://sunnychadha.com/privacy-policy"
                  className="text-accent underline underline-offset-2"
                >
                  https://sunnychadha.com/privacy-policy
                </a>
              </li>
            </ol>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">Governing Law</h2>
            <p className="mt-2">
              These Terms are governed by the laws of British Columbia and
              applicable federal laws of Canada.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">
              Changes to These Terms
            </h2>
            <p className="mt-2">
              We may update these Terms from time to time. Continued use of
              the Site after changes constitutes acceptance of the updated
              Terms.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">Contact</h2>
            <p className="mt-2">
              Questions about these Terms? Contact:
              <br />
              Sunny Chadha, REALTOR® | Century 21 Coastal Realty Ltd.
              <br />
              <a
                href="mailto:sunny.chadha@century21.ca"
                className="text-accent underline underline-offset-2"
              >
                sunny.chadha@century21.ca
              </a>{" "}
              |{" "}
              <a
                href="tel:+16045994888"
                className="text-accent underline underline-offset-2"
              >
                (604) 599-4888
              </a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
