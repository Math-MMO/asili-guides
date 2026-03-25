import path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";

const articlesDirectory = path.join(process.cwd(), "content/articles");

export async function getAllArticles() {
  const files = await fs.readdir(articlesDirectory);

  const articles = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const filePath = path.join(articlesDirectory, file);
        const fileContents = await fs.readFile(filePath, "utf8");
        const { data } = matter(fileContents);
        return data;
      })
  );

  return articles
    .filter((article) => article.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getArticleBySlug(slug) {
  const files = await fs.readdir(articlesDirectory);

  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const filePath = path.join(articlesDirectory, file);
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);
    if (data.slug === slug) {
      return { frontmatter: data, content };
    }
  }

  return null;
}

export async function getAllSlugs() {
  const articles = await getAllArticles();
  return articles.map((article) => article.slug);
}
