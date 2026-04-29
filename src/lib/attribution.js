/**
 * Attribution shared between asili.immo and guide.asili.immo
 * via 1st-party cookie on .asili.immo (parent domain).
 *
 * Cookie name : asili_attr
 * Structure   : { ft, lt, sc, vg, pv }
 *   ft = first-touch  (jamais ecrase)
 *   lt = last-touch   (mis a jour a chaque nouvelle session)
 *   sc = session count
 *   vg = visited guide (bool)
 *   pv = pages viewed
 *
 * Touch object : { s, m, c, r, l, g, t }
 *   s = source, m = medium, c = campaign, r = referrer
 *   l = landing path, g = gclid, t = ISO timestamp
 */

const COOKIE_NAME = "asili_attr";
const COOKIE_DOMAIN = ".asili.immo";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 jours
const SESSION_KEY = "asili_attr_session"; // sessionStorage flag

const ASILI_HOSTS = ["asili.immo", "guide.asili.immo", "www.asili.immo"];

function readCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&") + "=([^;]*)"),
  );
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

function writeCookie(name, value) {
  if (typeof document === "undefined") return;
  const encoded = encodeURIComponent(JSON.stringify(value));
  document.cookie = `${name}=${encoded}; Domain=${COOKIE_DOMAIN}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function parseReferrer(referrer) {
  if (!referrer) return { host: null, isInternal: false };
  try {
    const url = new URL(referrer);
    const host = url.hostname.replace(/^www\./, "");
    const isInternal = ASILI_HOSTS.includes(host);
    return { host, isInternal, url };
  } catch {
    return { host: null, isInternal: false };
  }
}

function detectSourceFromReferrer(host) {
  if (!host) return { source: "(direct)", medium: "(none)" };
  if (/google\./.test(host)) return { source: "google", medium: "organic" };
  if (/bing\.|duckduckgo\.|yahoo\./.test(host)) return { source: host.split(".")[0], medium: "organic" };
  if (/facebook\.|instagram\.|t\.co|twitter\.|x\.com|linkedin\.|tiktok\./.test(host))
    return { source: host.split(".")[0], medium: "social" };
  return { source: host, medium: "referral" };
}

function buildTouch() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");
  const gclid = params.get("gclid");
  const fbclid = params.get("fbclid");

  const ref = parseReferrer(document.referrer);

  let source, medium;
  if (utmSource) {
    source = utmSource;
    medium = utmMedium || "(not set)";
  } else if (gclid) {
    source = "google";
    medium = "cpc";
  } else if (fbclid) {
    source = "facebook";
    medium = "cpc";
  } else {
    const detected = detectSourceFromReferrer(ref.host);
    source = detected.source;
    medium = detected.medium;
  }

  return {
    s: source,
    m: medium,
    c: utmCampaign || null,
    r: ref.host || null,
    l: window.location.pathname,
    g: gclid || null,
    t: new Date().toISOString(),
  };
}

/**
 * Met a jour le cookie d'attribution.
 * - Ouvre une nouvelle session si sessionStorage flag absent.
 * - Preserve le first-touch.
 * - Met a jour le last-touch a chaque nouvelle session OU si UTM/gclid present.
 *
 * @param {{ markVisitedGuide?: boolean }} opts
 * @returns {object|null} attribution courante
 */
export function trackAttribution(opts = {}) {
  if (typeof window === "undefined") return null;

  const ref = parseReferrer(document.referrer);
  const params = new URLSearchParams(window.location.search);
  const hasExplicitSource = params.has("utm_source") || params.has("gclid") || params.has("fbclid");

  const isNewSession = !sessionStorage.getItem(SESSION_KEY);
  if (isNewSession) sessionStorage.setItem(SESSION_KEY, "1");

  const existing = readCookie(COOKIE_NAME);
  const touch = buildTouch();
  if (!touch) return existing;

  let next;
  if (!existing) {
    next = { ft: touch, lt: touch, sc: 1, vg: !!opts.markVisitedGuide, pv: 1 };
  } else {
    next = { ...existing, pv: (existing.pv || 0) + 1 };
    if (opts.markVisitedGuide) next.vg = true;

    const shouldUpdateLast = isNewSession || hasExplicitSource;
    if (shouldUpdateLast && !ref.isInternal) {
      next.lt = touch;
      if (isNewSession) next.sc = (existing.sc || 0) + 1;
    }
    if (!existing.ft) next.ft = touch;
  }

  writeCookie(COOKIE_NAME, next);
  return next;
}

/**
 * Lit l'attribution actuelle sans la modifier.
 */
export function getAttribution() {
  return readCookie(COOKIE_NAME);
}

/**
 * Aplatit l'attribution pour envoi a l'API/DB.
 */
export function flattenAttribution(attr) {
  if (!attr) return {};
  const ft = attr.ft || {};
  const lt = attr.lt || {};
  return {
    first_source: ft.s || null,
    first_medium: ft.m || null,
    first_campaign: ft.c || null,
    first_referrer: ft.r || null,
    first_landing: ft.l || null,
    first_seen_at: ft.t || null,
    last_source: lt.s || null,
    last_medium: lt.m || null,
    last_campaign: lt.c || null,
    last_referrer: lt.r || null,
    last_landing: lt.l || null,
    last_seen_at: lt.t || null,
    gclid: lt.g || ft.g || null,
    visited_guide: !!attr.vg,
    session_count: attr.sc || 1,
    pages_viewed: attr.pv || 1,
  };
}
