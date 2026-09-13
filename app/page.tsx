import Hero from "@/components/Hero";
import Container from "@/components/Container";
import SectionReveal from "@/components/SectionReveal";
import PropertyCard from "@/components/PropertyCard";
import TestimonialCard from "@/components/TestimonialCard";
import NewsCard from "@/components/NewsCard";
import CTAButton from "@/components/CTAButton";
import { getFeaturedListings } from "@/lib/listings";
import { testimonials } from "@/data/testimonials";
import { newsArticles } from "@/data/news";

export default function Home() {
  const featured = getFeaturedListings();

  return (
    <>
      <Hero />

      <section className="bg-neutral py-20">
        <Container>
          <SectionReveal className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                Featured
              </p>
              <h2 className="mt-2 font-serif text-3xl text-navy">
                Featured Listings
              </h2>
            </div>
            <CTAButton href="/listings" variant="ghost">
              View All Listings
            </CTAButton>
          </SectionReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing, i) => (
              <SectionReveal key={listing.slug} delay={i * 0.08}>
                <PropertyCard listing={listing} index={i} />
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionReveal className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Client Stories
            </p>
            <h2 className="mt-2 font-serif text-3xl text-navy">
              What Clients Say
            </h2>
          </SectionReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <SectionReveal key={t.id} delay={i * 0.08}>
                <TestimonialCard t={t} />
              </SectionReveal>
            ))}
          </div>
          <SectionReveal className="mt-10 text-center">
            <CTAButton href="/testimonials" variant="ghost">
              Read More Testimonials
            </CTAButton>
          </SectionReveal>
        </Container>
      </section>

      <section className="bg-neutral py-20">
        <Container>
          <SectionReveal className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                Local Insight
              </p>
              <h2 className="mt-2 font-serif text-3xl text-navy">
                Neighbourhood News
              </h2>
            </div>
            <CTAButton href="/news" variant="ghost">
              View All Articles
            </CTAButton>
          </SectionReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsArticles.slice(0, 3).map((a, i) => (
              <SectionReveal key={a.slug} delay={i * 0.08}>
                <NewsCard article={a} index={i} />
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy py-20 text-white">
        <Container className="text-center">
          <SectionReveal>
            <h2 className="font-serif text-3xl sm:text-4xl">
              Thinking about buying or selling?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              Let&apos;s talk about your goals and put together a plan that
              works for your timeline and budget.
            </p>
            <div className="mt-8">
              <CTAButton href="/contact">Get in Touch</CTAButton>
            </div>
          </SectionReveal>
        </Container>
      </section>
    </>
  );
}
