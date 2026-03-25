import { getAllArticles } from "@/lib/articles";
import PageHero from "@/components/PageHero";
import ArticlesList from "@/components/ArticlesList";

export default async function HomePage() {
  const articles = await getAllArticles();

  return (
    <>
      <PageHero
        title="Guides & Repères"
        description="Comprendre le marché immobilier en Afrique pour acheter en toute confiance."
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ArticlesList articles={articles} />
      </div>
    </>
  );
}
