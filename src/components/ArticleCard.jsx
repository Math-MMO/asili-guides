import Link from "next/link";

const countryLabels = {
  senegal: "Sénégal",
  maroc: "Maroc",
  "cote-divoire": "Côte d'Ivoire",
  cameroun: "Cameroun",
  congo: "Congo",
};

const badgeColors = {
  senegal: "bg-amber-100 text-amber-800",
  maroc: "bg-blue-100 text-blue-800",
  "cote-divoire": "bg-green-100 text-green-800",
  cameroun: "bg-purple-100 text-purple-800",
  congo: "bg-orange-100 text-orange-800",
};

export default function ArticleCard({ article }) {
  const badgeColor = badgeColors[article.country] || "bg-gray-100 text-gray-800";
  const countryLabel = countryLabels[article.country] || article.country;

  return (
    <Link href={`/${article.slug}`} className="group block">
      <article className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 p-6 transition-all duration-200 flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="mb-3 flex flex-wrap gap-2">
            {article.country && (
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${badgeColor}`}>
                {countryLabel}
              </span>
            )}
          </div>
          <h2 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors mb-1">
            {article.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {article.description}
          </p>
          {article.date && (
            <p className="text-xs text-gray-400 mt-2">
              {new Date(article.date).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </div>
        <span className="text-gray-300 group-hover:text-orange-600 transition-colors mt-1 shrink-0">
          &rarr;
        </span>
      </article>
    </Link>
  );
}
