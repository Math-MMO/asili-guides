"use client";

import { useState } from "react";
import ArticleCard from "@/components/ArticleCard";

const countryLabels = { senegal: "Sénégal", maroc: "Maroc" };
const categoryLabels = {
  "avant-acheter": "Avant d'acheter",
  financement: "Financement",
  fiscalite: "Fiscalité",
  juridique: "Juridique",
};

export default function ArticlesList({ articles }) {
  const [countryFilter, setCountryFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = articles.filter((a) => {
    if (countryFilter !== "all" && a.country !== countryFilter) return false;
    if (categoryFilter !== "all" && a.category !== categoryFilter) return false;
    return true;
  });

  const countries = [...new Set(articles.map((a) => a.country))];
  const categories = [...new Set(articles.map((a) => a.category))];

  return (
    <>
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
    </>
  );
}
