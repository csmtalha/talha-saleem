/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://talhasaleem.dev", // keep in sync with SITE.url in lib/site.ts
  generateRobotsTxt: true,
  // /work redirects to the homepage; API routes and generated images aren't pages
  exclude: ["/work", "/llms.txt", "/api/*", "/*/opengraph-image*", "/*/twitter-image*", "/opengraph-image*", "/twitter-image*", "/*/*/opengraph-image*", "/*/*/twitter-image*"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
  },
  transform: async (config, path) => {
    let priority = 0.6;
    let changefreq = "monthly";
    if (path === "/") {
      priority = 1.0;
      changefreq = "weekly";
    } else if (path.startsWith("/work/")) {
      priority = 0.8;
    } else if (path === "/articles-and-insights") {
      priority = 0.7;
      changefreq = "weekly";
    } else if (path.startsWith("/articles-and-insights/")) {
      priority = 0.7;
    }
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
