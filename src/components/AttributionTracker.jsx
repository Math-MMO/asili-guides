"use client";

import { useEffect } from "react";
import { trackAttribution, flattenAttribution } from "@/lib/attribution";

/**
 * Mount au layout racine. Au premier render :
 *  - met a jour le cookie d'attribution partage .asili.immo
 *  - marque visited_guide = true
 *  - log la session cote serveur via /api/track-visit
 */
export default function AttributionTracker() {
  useEffect(() => {
    const attr = trackAttribution({ markVisitedGuide: true });
    if (!attr) return;

    const payload = {
      ...flattenAttribution(attr),
      path: window.location.pathname,
      url: window.location.href,
    };

    // fire-and-forget, n'attend pas la reponse
    fetch("/api/track-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }, []);

  return null;
}
