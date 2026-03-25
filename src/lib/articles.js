import path from "path";
import fs from "fs";
import matter from "gray-matter";

const articlesDirectory = path.join(process.cwd(), "content", "articles");

export function getAllArticles() {
  const files = fs.readdirSync(articlesDirectory);

  const articles = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(articlesDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      return data;
    })
    .filter((article) => article.published === true)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return articles;
}

export function getArticleBySlug(slug) {
  const files = fs.readdirSync(articlesDirectory);

  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const filePath = path.join(articlesDirectory, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    if (data.slug === slug) {
      return { frontmatter: data, content };
    }
  }

  return null;
}

export function getAllSlugs() {
  const articles = getAllArticles();
  return articles.map((article) => article.slug);
}
