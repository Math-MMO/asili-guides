import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  icons: {
    icon: "/logo-asili.png",
    apple: "/logo-asili.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${inter.className} min-h-screen bg-gray-50 text-gray-900 antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
