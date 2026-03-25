"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ArticleLayout({ frontmatter, children }) {
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

  return (
    <>
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600 z-50 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />

      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm text-gray-500 hover:text-orange-600 transition-colors"
        >
          <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux guides
        </Link>

        <div className="mb-6 flex flex-wrap gap-2">
          {frontmatter.country && (
            <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
              {frontmatter.country === "senegal" ? "Sénégal" : frontmatter.country === "maroc" ? "Maroc" : frontmatter.country}
            </span>
          )}
          {frontmatter.date && (
            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              {new Date(frontmatter.date).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        </div>

        <div className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900">
          {children}
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6">
          <p className="mb-3 text-sm font-medium text-gray-700">
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
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {copied ? "Lien copié !" : "Copier le lien"}
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
