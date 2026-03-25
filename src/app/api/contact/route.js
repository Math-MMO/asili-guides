import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { firstName, phone, country, projectType, budget, timeframe, message } =
    body;

  if (!firstName || !phone || !country || !projectType || !budget || !timeframe) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  const countryLabels = {
    senegal: "🇸🇳 Sénégal",
    maroc: "🇲🇦 Maroc",
    "cote-divoire": "🇨🇮 Côte d'Ivoire",
    cameroun: "🇨🇲 Cameroun",
    congo: "🇨🇬 Congo",
  };

  const projectLabels = {
    appartement_maison: "Appartement / Maison",
    terrain_urbain: "Terrain urbain",
    terrain_touristique: "Terrain touristique",
    location_courte_duree: "Location courte durée",
    location_longue_duree: "Location longue durée",
    residence_principale: "Résidence principale",
    autre: "Autre projet",
  };

  const budgetLabels = {
    moins_10k: "Moins de 10 000 €",
    "10k_25k": "10 000 - 25 000 €",
    "25k_50k": "25 000 - 50 000 €",
    "50k_100k": "50 000 - 100 000 €",
    "100k_200k": "100 000 - 200 000 €",
    plus_200k: "Plus de 200 000 €",
  };

  const timeframeLabels = {
    immediat: "Immédiat (moins de 3 mois)",
    "3_6_mois": "3 à 6 mois",
    "6_12_mois": "6 à 12 mois",
    "1_2_ans": "1 à 2 ans",
    plus_2_ans: "Plus de 2 ans",
  };

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #F59E0B; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">Nouvelle demande de projet — ASILI Guides</h1>
      </div>
      <div style="background: #f9fafb; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; color: #6b7280; font-size: 14px; width: 40%;">Prénom</td>
            <td style="padding: 12px 0; font-weight: 600; font-size: 14px;">${firstName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">WhatsApp</td>
            <td style="padding: 12px 0; font-weight: 600; font-size: 14px;">${phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Pays ciblé</td>
            <td style="padding: 12px 0; font-weight: 600; font-size: 14px;">${countryLabels[country] || country}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Type de projet</td>
            <td style="padding: 12px 0; font-weight: 600; font-size: 14px;">${projectLabels[projectType] || projectType}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Budget</td>
            <td style="padding: 12px 0; font-weight: 600; font-size: 14px;">${budgetLabels[budget] || budget}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Horizon</td>
            <td style="padding: 12px 0; font-weight: 600; font-size: 14px;">${timeframeLabels[timeframe] || timeframe}</td>
          </tr>
          ${
            message
              ? `
          <tr>
            <td style="padding: 12px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Message</td>
            <td style="padding: 12px 0; font-size: 14px;">${message}</td>
          </tr>`
              : ""
          }
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #F59E0B;">
          <p style="margin: 0; font-size: 13px; color: #92400e;">
            📱 Contacter sur WhatsApp : <strong>${phone}</strong>
          </p>
        </div>
        <p style="margin-top: 16px; font-size: 12px; color: #9ca3af; text-align: center;">
          Demande reçue depuis guide.asili.immo
        </p>
      </div>
    </div>
  `;

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Asili", email: "asili@asili.immo" },
        to: [{ email: "asili@asili.immo", name: "ASILI" }],
        subject: `Nouveau projet — ${firstName} — ${countryLabels[country] || country}`,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Brevo error:", error);
      return NextResponse.json(
        { error: "Erreur envoi email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
