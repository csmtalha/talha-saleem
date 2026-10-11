import { CATEGORY_LABEL, FEATURED, OTHER_PROJECTS, creditLine, formatProjectDate } from "@/lib/projects";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt: a plain-text profile for AI assistants and answer engines
 * (see llmstxt.org). Generated from the same data as the site.
 */
export function GET() {
  const line = (p: (typeof FEATURED)[number]) =>
    `- [${p.name}](${SITE.url}/work/${p.slug}): ${p.summary} (${CATEGORY_LABEL[p.category]}, ${formatProjectDate(p.date)}; ${creditLine(p)}; stack: ${p.stack.slice(0, 6).join(", ")})`;

  const body = `# Talha Saleem

> Lead Full-Stack Engineer in Lahore, Pakistan (UTC+5) with 6+ years shipping SaaS and AI products end to end: TypeScript, React, Next.js, Node.js, NestJS, PostgreSQL, Prisma, Supabase, retrieval-augmented generation with pgvector, tests and AWS deploys. Employee of the Year 2024 at Cloudpacer. Available for remote senior/lead roles and contract builds, with 4–6 hours of daily overlap with US Pacific time.

## Contact

- Email: ${SITE.email}
- WhatsApp: ${SITE.whatsappDisplay}
- LinkedIn: ${SITE.linkedin}
- GitHub: ${SITE.github}
- CV (PDF): ${SITE.url}${SITE.cv}

## Selected work (newest first)

${FEATURED.map(line).join("\n")}

## More projects

${OTHER_PROJECTS.map(line).join("\n")}

## Writing

- Articles: ${SITE.url}/articles-and-insights
- Book: AI Productivity for Businesses: Practical Operations (https://www.amazon.com/dp/B0GX34T63R)
- Book: How to Stay Productive as a Developer (https://www.amazon.com/How-Stay-Productive-Developer-Real-World-ebook/dp/B0FLNNZV6C/)

## Notes

Some client products are described generically to respect confidentiality.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
