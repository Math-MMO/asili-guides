"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProjectForm from "./ProjectForm";

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
  const [showForm, setShowForm] = useState(false);

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

  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://guide.asili.immo/${frontmatter.slug}`;

  function handleCopy() {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(frontmatter.title + " - " + currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(frontmatter.title)}&url=${encodeURIComponent(currentUrl)}`,
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
          <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight text-gray-900">
            {frontmatter.title}
          </h1>
        </header>

        {/* Image hero */}
        {frontmatter.image ? (
          <img
            src={frontmatter.image}
            alt={frontmatter.title}
            className="w-full h-48 md:h-64 object-cover rounded-xl mb-8"
          />
        ) : (
          <div className="w-full h-32 md:h-48 rounded-xl mb-8 bg-gradient-to-br from-amber-400 to-orange-500 flex items-end p-6">
            <span className="text-white text-sm font-medium opacity-80">
              {country === "senegal" ? "🇸🇳 Sénégal" : country === "maroc" ? "🇲🇦 Maroc" : countryLabel}
            </span>
          </div>
        )}

        {/* CTA discret */}
        <div className="my-8 p-5 bg-amber-50 border border-amber-100 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-900 text-sm">
              Vous avez un projet {country === "senegal" ? "au Sénégal" : country === "maroc" ? "au Maroc" : "immobilier"} ?
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Décrivez-le en 2 minutes — mise en relation avec une agence vérifiée sous 24h.
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="shrink-0 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
          >
            Décrire mon projet →
          </button>
        </div>

        {/* Corps article */}
        <div className="
          prose max-w-none
          prose-headings:font-serif
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

        {/* CTA après contenu */}
        <div className="my-8 p-5 bg-amber-50 border border-amber-100 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-900 text-sm">
              Vous avez un projet {country === "senegal" ? "au Sénégal" : country === "maroc" ? "au Maroc" : "immobilier"} ?
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Décrivez-le en 2 minutes — mise en relation avec une agence vérifiée sous 24h.
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="shrink-0 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
          >
            Décrire mon projet →
          </button>
        </div>

        {/* CTA visible */}
        <div className="my-10 p-6 bg-gray-900 rounded-2xl text-white text-center">
          <p className="font-bold text-lg mb-1">Prêt à concrétiser votre projet ?</p>
          <p className="text-gray-400 text-sm mb-5">
            Un conseiller ASILI vous contacte sous 24h. Gratuit, sans engagement.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors inline-flex items-center gap-2 text-sm"
          >
            Démarrer mon projet →
          </button>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-500">
            <span>✓ Réponse sous 24h</span>
            <span>✓ Agences vérifiées</span>
            <span>✓ Sans engagement</span>
          </div>
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

      <ProjectForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        defaultCountry={country || ""}
      />
    </div>
  );
}
