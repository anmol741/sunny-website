import Link from "next/link";
import type { NewsArticle } from "@/lib/types";
import PropertyPhoto from "@/components/PropertyPhoto";

export default function NewsCard({
  article,
  index = 0,
}: {
  article: NewsArticle;
  index?: number;
}) {
  const date = new Date(article.date).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/news/${article.slug}`}
      className="group block overflow-hidden rounded-xl border border-navy/10 bg-white shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="h-44 overflow-hidden">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-110">
          <PropertyPhoto seed={index} className="h-full w-full" />
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          {article.category}
        </p>
        <p className="mt-2 font-serif text-lg text-navy">{article.title}</p>
        <p className="mt-2 text-sm text-navy/60">{article.excerpt}</p>
        <p className="mt-4 text-xs text-navy/40">{date}</p>
      </div>
    </Link>
  );
}
