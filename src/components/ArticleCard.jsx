import Link from "next/link";

const countryLabels = {
  senegal: "Sénégal",
  maroc: "Maroc",
};

const categoryLabels = {
  "avant-acheter": "Avant d'acheter",
  financement: "Financement",
  fiscalite: "Fiscalité",
  juridique: "Juridique",
};

export default function ArticleCard({ article }) {
  return (
    <Link href={`/${article.slug}`} className="group block">
      <article className="rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-amber-300 hover:shadow-lg">
        <div className="mb-3 flex flex-wrap gap-2">
          {article.country && (
            <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
              {countryLabels[article.country] || article.country}
            </span>
          )}
          {article.category && (
            <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800">
              {categoryLabels[article.category] || article.category}
            </span>
          )}
        </div>
        <h2 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
          {article.title}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {article.description}
        </p>
      </article>
    </Link>
  );
}
