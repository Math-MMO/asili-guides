import { getAllArticles } from "@/lib/articles";

export default async function sitemap() {
  const articles = await getAllArticles();

  const articleUrls = articles.map((article) => ({
    url: `https://guide.asili.immo/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://guide.asili.immo",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...articleUrls,
  ];
}
