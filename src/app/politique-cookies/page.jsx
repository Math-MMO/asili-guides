import CookieDeclaration from "@/components/CookieDeclaration";

export const metadata = {
  title: "Politique de cookies",
  description:
    "Liste détaillée des cookies utilisés sur ASILI Guides et finalités associées.",
  alternates: {
    canonical: "/politique-cookies",
  },
};

export default function PolitiqueCookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl md:text-5xl mb-6 text-gray-900">
        Politique de cookies
      </h1>
      <p className="text-gray-600 text-base mb-10 leading-relaxed">
        Cette page liste l&apos;ensemble des cookies déposés sur ASILI Guides,
        leur finalité, leur durée de vie et leur fournisseur. Vous pouvez à tout
        moment modifier vos préférences via le bandeau de consentement.
      </p>
      <div className="prose prose-stone max-w-none">
        <CookieDeclaration />
      </div>
    </div>
  );
}
