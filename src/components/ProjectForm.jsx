"use client";

import { useState } from "react";
import { X, ArrowRight, CheckCircle, Loader2 } from "lucide-react";

export default function ProjectForm({ isOpen, onClose, defaultCountry = "" }) {
  const [form, setForm] = useState({
    firstName: "",
    phone: "",
    country: defaultCountry,
    projectType: "",
    budget: "",
    timeframe: "",
    message: "",
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.consent) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="font-bold text-gray-900 text-lg leading-tight">
              Décrivez votre projet
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              On revient vers vous sous 24h
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">
              Demande envoyée !
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Un conseiller ASILI vous contacte sur WhatsApp sous 24h.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium text-sm transition-colors"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            {/* Prénom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Prénom *
              </label>
              <input
                required
                type="text"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                placeholder="Votre prénom"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                N° WhatsApp *
              </label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+33 6 12 34 56 78"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>

            {/* Pays */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Pays ciblé *
              </label>
              <select
                required
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
              >
                <option value="">Sélectionnez un pays</option>
                <option value="senegal">🇸🇳 Sénégal</option>
                <option value="maroc">🇲🇦 Maroc</option>
                <option value="cote-divoire">🇨🇮 Côte d&apos;Ivoire</option>
                <option value="cameroun">🇨🇲 Cameroun</option>
                <option value="congo">🇨🇬 Congo</option>
              </select>
            </div>

            {/* Type de projet */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Type de projet *
              </label>
              <select
                required
                value={form.projectType}
                onChange={(e) =>
                  setForm({ ...form, projectType: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
              >
                <option value="">Sélectionnez un type</option>
                <option value="appartement_maison">
                  Investissement appartement / maison
                </option>
                <option value="terrain_urbain">Achat terrain urbain</option>
                <option value="terrain_touristique">
                  Achat terrain touristique
                </option>
                <option value="location_courte_duree">
                  Location courte durée
                </option>
                <option value="location_longue_duree">
                  Location longue durée
                </option>
                <option value="residence_principale">
                  Résidence principale
                </option>
                <option value="autre">Autre projet</option>
              </select>
            </div>

            {/* Budget + Horizon */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Budget *
                </label>
                <select
                  required
                  value={form.budget}
                  onChange={(e) =>
                    setForm({ ...form, budget: e.target.value })
                  }
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                >
                  <option value="">Budget...</option>
                  <option value="moins_10k">- de 10 000 €</option>
                  <option value="10k_25k">10 000 - 25 000 €</option>
                  <option value="25k_50k">25 000 - 50 000 €</option>
                  <option value="50k_100k">50 000 - 100 000 €</option>
                  <option value="100k_200k">100 000 - 200 000 €</option>
                  <option value="plus_200k">+ de 200 000 €</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Horizon *
                </label>
                <select
                  required
                  value={form.timeframe}
                  onChange={(e) =>
                    setForm({ ...form, timeframe: e.target.value })
                  }
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                >
                  <option value="">Délai...</option>
                  <option value="immediat">- de 3 mois</option>
                  <option value="3_6_mois">3 à 6 mois</option>
                  <option value="6_12_mois">6 à 12 mois</option>
                  <option value="1_2_ans">1 à 2 ans</option>
                  <option value="plus_2_ans">+ de 2 ans</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Détails{" "}
                <span className="font-normal text-gray-400">— Optionnel</span>
              </label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Précisez vos critères (surface, quartier, etc.)"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              />
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                required
                checked={form.consent}
                onChange={(e) =>
                  setForm({ ...form, consent: e.target.checked })
                }
                className="mt-0.5 accent-amber-500"
              />
              <span className="text-xs text-gray-500 leading-relaxed">
                J&apos;accepte d&apos;être recontacté sur WhatsApp concernant
                mon projet immobilier.
              </span>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-4 py-2.5 rounded-xl">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !form.consent}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Envoi en
                  cours...
                </>
              ) : (
                <>
                  Envoyer ma demande <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
