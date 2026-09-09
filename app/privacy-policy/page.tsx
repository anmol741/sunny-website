import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Privacy Policy | Sunny Chadha, REALTOR®",
  description: "Privacy policy for sunnychadha.com",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          Legal
        </p>
        <h1 className="mt-2 font-serif text-4xl text-navy">Privacy Policy</h1>
        <p className="mt-2 text-sm text-navy/50">
          Last updated: September 10, 2026
        </p>

        <div className="prose mt-8 space-y-6 text-navy/70">
          <p>
            Sunny Chadha, REALTOR® (Century 21 Canada) (&quot;we,&quot;
            &quot;us,&quot; &quot;our&quot;) respects your privacy. This
            policy explains what information we collect through
            sunnychadha.com and how we use it.
          </p>

          <div>
            <h2 className="font-serif text-xl text-navy">
              Information We Collect
            </h2>
            <p className="mt-2">
              When you submit a form, call, text, or email us through this
              website, we may collect:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Name, phone number, email address</li>
              <li>Property preferences (buying, selling, financing needs)</li>
              <li>Messages you send us</li>
              <li>
                Basic browsing data (pages visited, device/browser type) via
                standard analytics tools
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">
              How We Use Your Information
            </h2>
            <p className="mt-2">We use your information only to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Respond to your inquiry and provide real estate services</li>
              <li>
                Follow up on listings, showings, or financing questions
                you&apos;ve raised
              </li>
              <li>
                Send you relevant property updates or market information, if
                you&apos;ve opted in
              </li>
              <li>Improve this website and our services</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">
              We Do Not Sell or Share Your Data for Marketing
            </h2>
            <p className="mt-2">
              <strong>
                We do not sell, rent, or share your personal information
                with third parties for their own promotional or marketing
                purposes.
              </strong>{" "}
              Your information is used solely by Sunny Chadha and Century 21
              Canada to provide the real estate services you&apos;ve
              requested.
            </p>
            <p className="mt-2">We may share your information with:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Service providers who help us operate (e.g., our CRM
                platform, Follow Up Boss) — solely to deliver our services
                to you, under confidentiality obligations
              </li>
              <li>Century 21 Canada, as required for brokerage compliance</li>
              <li>Legal or regulatory authorities, if required by law</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">
              Communication Preferences (SMS/Email/Call)
            </h2>
            <p className="mt-2">
              By submitting a form on this site, you agree to be contacted
              by Century 21 Canada and Sunny Chadha via call, email, and
              text for real estate services. You can opt out at any time:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Reply <strong>STOP</strong> to any text message to opt out
              </li>
              <li>
                Reply <strong>HELP</strong> for assistance
              </li>
              <li>Click the unsubscribe link in any email</li>
              <li>
                Message and data rates may apply. Message frequency may vary.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">Your Rights</h2>
            <p className="mt-2">
              Under Canadian privacy law (PIPEDA), you have the right to
              access, correct, or request deletion of your personal
              information. To do so, contact us at{" "}
              <a
                href="mailto:sunny.chadha@century21.ca"
                className="text-accent underline underline-offset-2"
              >
                sunny.chadha@century21.ca
              </a>{" "}
              or{" "}
              <a
                href="tel:+16045994888"
                className="text-accent underline underline-offset-2"
              >
                (604) 599-4888
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">
              Cookies &amp; Analytics
            </h2>
            <p className="mt-2">
              This site may use cookies or similar technologies to
              understand site usage and improve user experience. You can
              disable cookies in your browser settings.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">Contact Us</h2>
            <p className="mt-2">
              Questions about this policy? Contact:
              <br />
              <strong>Sunny Chadha</strong>
              <br />
              REALTOR® | Century 21 Canada
              <br />
              <a
                href="mailto:sunny.chadha@century21.ca"
                className="text-accent underline underline-offset-2"
              >
                sunny.chadha@century21.ca
              </a>
              <br />
              <a
                href="tel:+16045994888"
                className="text-accent underline underline-offset-2"
              >
                (604) 599-4888
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy">
              Changes to This Policy
            </h2>
            <p className="mt-2">
              We may update this policy from time to time. The &quot;Last
              updated&quot; date above reflects the most recent revision.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
