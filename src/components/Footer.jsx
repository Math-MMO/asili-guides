import React from "react";
import Link from "next/link";
import { LifeBuoy } from "lucide-react";

const ASILI_URL = "https://asili.immo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6926d34fc8112c409d32c74d/b60f090ea_LOGO-ASILI.png"
                alt="Asili"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm">
              La plateforme immobiliere pensee pour la diaspora africaine.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explorer</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href={`${ASILI_URL}/Search?listing_type=sale`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Acheter
                </a>
              </li>
              <li>
                <a href={`${ASILI_URL}/Search?listing_type=rent`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Louer
                </a>
              </li>
              <li>
                <a href={`${ASILI_URL}/Search`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Rechercher
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Propriétaires</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href={`${ASILI_URL}/CreateProperty`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Publier une annonce
                </a>
              </li>
              <li>
                <a href={`${ASILI_URL}/Dashboard`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Tableau de bord
                </a>
              </li>
              <li>
                <a href={`${ASILI_URL}/AgencyOnboarding`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Espace agence
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Ressources</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  Guides & repères
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href={`${ASILI_URL}/Support`} target="_blank" rel="noopener noreferrer" className="hover:text-white inline-flex items-center gap-2">
                  <LifeBuoy className="h-4 w-4" />
                  Support
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/asili-immo" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/asili.immo" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a href={`${ASILI_URL}/CGU`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
              CGU
            </a>
            <span className="text-gray-600">&bull;</span>
            <a href={`${ASILI_URL}/CGV`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
              CGV
            </a>
            <span className="text-gray-600">&bull;</span>
            <a href={`${ASILI_URL}/PrivacyPolicy`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
              Politique de confidentialité
            </a>
            <span className="text-gray-600">&bull;</span>
            <a href={`${ASILI_URL}/FAQ`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
              FAQ
            </a>
          </div>

          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Asili. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
