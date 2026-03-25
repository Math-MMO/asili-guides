import { getAllArticles } from "@/lib/articles";
import ArticlesList from "@/components/ArticlesList";

export default async function HomePage() {
  const articles = await getAllArticles();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Guides & Repères
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Comprendre le marché immobilier en Afrique pour acheter en toute
          confiance.
        </p>
      </div>

      <ArticlesList articles={articles} />
    </div>
  );
}
