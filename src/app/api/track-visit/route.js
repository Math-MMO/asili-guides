import { NextResponse } from "next/server";

/**
 * Forward des sessions guide.asili.immo vers base44 (asili.immo).
 *
 * Configuration requise (Vercel > Environment Variables) :
 *   BASE44_TRACK_ENDPOINT  ex: https://asili.immo/api/track-guide-visit
 *   BASE44_TRACK_TOKEN     token Bearer pour authentifier le forward
 *
 * Tant que ces vars ne sont pas posees, l'endpoint accepte les payloads
 * et les ignore silencieusement (pas d'erreur 500 cote client).
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const endpoint = process.env.BASE44_TRACK_ENDPOINT;
    const token = process.env.BASE44_TRACK_TOKEN;

    if (!endpoint) {
      return NextResponse.json({ ok: true, forwarded: false });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      null;
    const userAgent = request.headers.get("user-agent") || null;

    const enriched = {
      ...body,
      ip,
      user_agent: userAgent,
      received_at: new Date().toISOString(),
    };

    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(enriched),
    }).catch(() => {});

    return NextResponse.json({ ok: true, forwarded: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
