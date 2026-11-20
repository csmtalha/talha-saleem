import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/site";

/**
 * Native sitemap with real per-URL lastmod from the actual content dates,
 * so Google gets a trustworthy freshness signal instead of a uniform build time.
 */

// Project dates are "YYYY", "YYYY-MM"; post dates are "YYYY-MM-DD". Normalise to a Date.
function toDate(d: string): Date {
  if (/^\d{4}$/.test(d)) return new Date(`${d}-12-01T00:00:00Z`);
  if (/^\d{4}-\d{2}$/.test(d)) return new Date(`${d}-01T00:00:00Z`);
  const parsed = new Date(d);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getAllPosts();

  const postDates = posts.map((p) => toDate(p.metadata.updated ?? p.metadata.date));
  const latestPost = postDates.length
    ? new Date(Math.max(...postDates.map((d) => d.getTime())))
    : now;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${SITE.url}/articles-and-insights`,
      lastModified: latestPost,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const work: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${SITE.url}/work/${p.slug}`,
    lastModified: toDate(p.date),
    changeFrequency: "monthly",
    priority: p.featured ? 0.8 : 0.6,
  }));

  const articles: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}/articles-and-insights/${p.slug}`,
    lastModified: toDate(p.metadata.updated ?? p.metadata.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...work, ...articles];
}
