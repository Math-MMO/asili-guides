"use client";

import { useState } from "react";
import ArticleCard from "@/components/ArticleCard";

export default function HomePage() {
  return <HomeContent />;
}

function HomeContent() {
  const [countryFilter, setCountryFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [articles, setArticles] = useState(null);

  if (articles === null) {
    fetch("/api/articles")
      .then((res) => res.json())
      .then(setArticles);
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 text-center text-gray-500">
        Chargement...
      </div>
    );
  }

  const filtered = articles.filter((a) => {
    if (countryFilter !== "all" && a.country !== countryFilter) return false;
    if (categoryFilter !== "all" && a.category !== categoryFilter) return false;
    return true;
  });

  const countries = [...new Set(articles.map((a) => a.country))];
  const categories = [...new Set(articles.map((a) => a.category))];

  const countryLabels = { senegal: "Sénégal", maroc: "Maroc" };
  const categoryLabels = {
    "avant-acheter": "Avant d'acheter",
    financement: "Financement",
    fiscalite: "Fiscalité",
    juridique: "Juridique",
  };

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

      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={() => setCountryFilter("all")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            countryFilter === "all"
              ? "bg-orange-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Tous les pays
        </button>
        {countries.map((c) => (
          <button
            key={c}
            onClick={() => setCountryFilter(c)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              countryFilter === c
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {countryLabels[c] || c}
          </button>
        ))}

        <div className="w-px bg-gray-300 mx-1" />

        <button
          onClick={() => setCategoryFilter("all")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            categoryFilter === "all"
              ? "bg-amber-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Toutes catégories
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategoryFilter(c)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              categoryFilter === c
                ? "bg-amber-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {categoryLabels[c] || c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          Aucun article ne correspond à ces filtres.
        </p>
      )}
    </div>
  );
}
