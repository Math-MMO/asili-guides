/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://guide.asili.immo",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
