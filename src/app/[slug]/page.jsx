import { getAllSlugs, getArticleBySlug } from "@/lib/articles";
import { MDXRemote } from "next-mdx-remote/rsc";
import ArticleTemplate from "@/components/ArticleTemplate";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};

  const { frontmatter } = article;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `https://guide.asili.immo/${frontmatter.slug}`,
      type: "article",
    },
    alternates: {
      canonical: `https://guide.asili.immo/${frontmatter.slug}`,
    },
  };
}

export default async function ArticlePage({ params }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const { frontmatter, content } = article;

  return (
    <ArticleTemplate frontmatter={frontmatter}>
      <MDXRemote source={content} components={{ h1: () => null }} />
    </ArticleTemplate>
  );
}
