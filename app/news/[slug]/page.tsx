import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionReveal from "@/components/SectionReveal";
import PropertyPhoto from "@/components/PropertyPhoto";
import CTAButton from "@/components/CTAButton";
import { newsArticles } from "@/data/news";

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/news/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: `${article.title} | Sunny Chadha, REALTOR®`,
    description: article.excerpt,
  };
}

export default async function NewsArticlePage(
  props: PageProps<"/news/[slug]">,
) {
  const { slug } = await props.params;
  const article = newsArticles.find((a) => a.slug === slug);

  if (!article) notFound();

  const index = newsArticles.findIndex((a) => a.slug === slug);
  const date = new Date(article.date).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="py-12">
      <Container className="max-w-3xl">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {article.category} &middot; {date}
          </p>
          <h1 className="mt-2 font-serif text-3xl text-navy sm:text-4xl">
            {article.title}
          </h1>
        </SectionReveal>

        <SectionReveal delay={0.06} className="mt-8 h-64 overflow-hidden rounded-2xl sm:h-80">
          <PropertyPhoto seed={index} className="h-full w-full" />
        </SectionReveal>

        <SectionReveal delay={0.1} className="prose mt-8 space-y-5">
          {article.content.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-navy/75">
              {paragraph}
            </p>
          ))}
        </SectionReveal>

        <SectionReveal delay={0.14}>
          <div className="mt-14 rounded-2xl bg-navy p-8 text-center text-white">
            <p className="font-serif text-2xl">
              Have questions about your local market?
            </p>
            <div className="mt-6">
              <CTAButton href="/contact">Talk to Sunny</CTAButton>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </div>
  );
}
