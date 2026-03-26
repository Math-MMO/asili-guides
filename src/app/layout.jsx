import { Inter, DM_Serif_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
});

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
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${dmSerif.variable} font-sans min-h-screen bg-stone-50 text-gray-900 antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
