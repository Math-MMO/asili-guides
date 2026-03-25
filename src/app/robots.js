export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://guide.asili.immo/sitemap.xml",
  };
}
