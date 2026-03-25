import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "ASILI Guides — Immobilier en Afrique",
    template: "%s | ASILI Guides",
  },
  description:
    "Comprendre le marché immobilier en Afrique pour acheter en toute confiance.",
  metadataBase: new URL("https://guide.asili.immo"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${inter.className} min-h-screen bg-gray-50 text-gray-900 antialiased`}
      >
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-gray-900"
            >
              <span className="text-orange-600">ASILI</span>{" "}
              <span className="font-normal text-gray-500">Guides</span>
            </Link>
            <a
              href="https://asili.immo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-orange-600 transition-colors"
            >
              asili.immo &rarr;
            </a>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t border-gray-200 bg-white mt-16">
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 text-center">
            <p className="text-sm text-gray-500">
              Asili est une plateforme d&apos;information. Elle n&apos;intervient
              pas dans les transactions.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
