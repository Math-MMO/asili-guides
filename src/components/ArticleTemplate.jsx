"use client";

import { useEffect, useState } from "react";
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

export default function ArticleTemplate({ frontmatter, children }) {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const articleUrl =
    typeof window !== "undefined" ? window.location.href : "";

  function handleCopy() {
    navigator.clipboard.writeText(articleUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(frontmatter.title + " " + articleUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(frontmatter.title)}&url=${encodeURIComponent(articleUrl)}`,
  };

  const country = frontmatter.country;
  const badgeColor = badgeColors[country] || "bg-gray-100 text-gray-800";
  const countryLabel = countryLabels[country] || country;

  return (
    <div className="bg-stone-50 min-h-screen">
      <div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-600 z-50 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm px-6 md:px-12 py-12 my-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm text-gray-500 hover:text-orange-600 transition-colors"
        >
          <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux guides
        </Link>

        {/* Header */}
        <header className="border-b border-gray-100 mb-8 pb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {country && (
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${badgeColor}`}>
                {countryLabel}
              </span>
            )}
            {frontmatter.date && (
              <span className="text-xs text-gray-400">
                {new Date(frontmatter.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold leading-tight text-gray-900">
            {frontmatter.title}
          </h1>
        </header>

        {/* Corps article */}
        <div className="
          prose max-w-none
          prose-headings:font-playfair
          prose-h1:text-2xl prose-h1:font-bold prose-h1:mt-10 prose-h1:mb-4
          prose-h2:text-xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-3 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-2
          prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-2 prose-h3:font-sans
          prose-p:text-[17px] prose-p:leading-8 prose-p:mb-5 prose-p:text-gray-700
          prose-ul:ml-6 prose-ul:mb-5 prose-ul:space-y-2
          prose-ol:ml-6 prose-ol:mb-5 prose-ol:space-y-2
          prose-li:text-[17px] prose-li:leading-7 prose-li:text-gray-700
          prose-strong:font-semibold prose-strong:text-gray-900
          prose-blockquote:border-l-4 prose-blockquote:border-amber-400 prose-blockquote:pl-5 prose-blockquote:py-3 prose-blockquote:my-6 prose-blockquote:bg-amber-50 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:not-italic
          prose-table:w-full prose-table:border-collapse prose-table:my-6 prose-table:text-sm
          prose-th:bg-gray-50 prose-th:px-4 prose-th:py-2 prose-th:border prose-th:border-gray-200 prose-th:text-left prose-th:font-semibold
          prose-td:px-4 prose-td:py-2 prose-td:border prose-td:border-gray-200
          prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
          prose-hr:border-gray-100
        ">
          {children}
        </div>

        {/* Footer article — partage */}
        <div className="mt-12 border-t border-gray-100 pt-8">
          <p className="mb-4 text-sm font-medium text-gray-700">
            Partager cet article
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Facebook
            </a>
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
            >
              Twitter
            </a>
            <button
              onClick={handleCopy}
              className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {copied ? "Lien copié !" : "Copier le lien"}
            </button>
          </div>
          <p className="mt-6 text-xs text-gray-400">
            Publié sur ASILI Guides — guide.asili.immo
          </p>
        </div>
      </div>
    </div>
  );
}
