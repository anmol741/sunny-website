import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionReveal from "@/components/SectionReveal";
import NewsCard from "@/components/NewsCard";
import { newsArticles } from "@/data/news";

export const metadata: Metadata = {
  title: "Neighbourhood News | Sunny Chadha, REALTOR®",
  description:
    "Local market updates and real estate tips for North and West Vancouver.",
};

export default function NewsPage() {
  return (
    <div className="py-16">
      <Container>
        <SectionReveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Neighbourhood News
          </p>
          <h1 className="mt-2 font-serif text-4xl text-navy">
            Local Insight &amp; Market Updates
          </h1>
          <p className="mt-4 text-lg text-navy/60">
            Timely market reports and practical tips for the North Shore
            real estate community.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((article, i) => (
            <SectionReveal key={article.slug} delay={(i % 6) * 0.06}>
              <NewsCard article={article} index={i} />
            </SectionReveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
