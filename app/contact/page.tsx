import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionReveal from "@/components/SectionReveal";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Contact | Sunny Chadha, REALTOR®",
  description:
    "Get in touch with Sunny Chadha, REALTOR® with Century 21 Coastal Realty Ltd., serving North and West Vancouver, BC.",
};

export default function ContactPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-5">
          <SectionReveal className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Contact
            </p>
            <h1 className="mt-2 font-serif text-4xl text-navy">
              Let&apos;s Talk
            </h1>
            <p className="mt-4 text-navy/60">
              Whether you&apos;re just starting to think about a move or ready to
              list this month, I&apos;d love to hear from you.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <div>
                <p className="font-semibold text-navy">Phone</p>
                <a href="tel:+16045551234" className="text-navy/60 hover:text-accent">
                  (604) 599-4888
                </a>
              </div>
              <div>
                <p className="font-semibold text-navy">Email</p>
                <a
                  href="mailto:sunny.chadha@century21.ca"
                  className="text-navy/60 hover:text-accent"
                >
                  sunny.chadha@century21.ca
                </a>
              </div>
              <div>
                <p className="font-semibold text-navy">Brokerage</p>
                <p className="text-navy/60">Century 21 Coastal Realty Ltd.</p>
                <p className="text-navy/60">North &amp; West Vancouver, BC</p>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08} className="lg:col-span-3">
            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
              <LeadForm formType="contact" />
            </div>
          </SectionReveal>
        </div>
      </Container>
    </div>
  );
}
