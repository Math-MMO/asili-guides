import { getAllArticles } from "@/lib/articles";
import PageHero from "@/components/PageHero";
import ArticlesList from "@/components/ArticlesList";

export const metadata = {
  title: "Guides Immobilier Afrique | ASILI — Acheter en toute confiance",
  alternates: {
    canonical: "https://guide.asili.immo",
  },
};

export default async function HomePage() {
  const articles = await getAllArticles();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "ASILI Guides",
            url: "https://guide.asili.immo",
            description:
              "Guides pratiques pour acheter un bien immobilier au Sénégal ou au Maroc depuis la France.",
            publisher: {
              "@type": "Organization",
              name: "ASILI",
              url: "https://asili.immo",
            },
          }),
        }}
      />
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
