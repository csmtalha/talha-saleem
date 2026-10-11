import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Linkedin } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getAllPosts } from "@/lib/posts";
import { LINKEDIN_FOLLOWERS, LINKEDIN_POSTS } from "@/lib/linkedin-posts";
import { SITE } from "@/lib/site";

const BOOKS = [
  {
    id: "ai-productivity",
    title: "AI Productivity for Businesses: Practical Operations",
    blurb: "How teams actually get more done with AI: operations, handoffs and SOPs, without the hype.",
    cover: "/images/AI-Business.jpg",
    url: "https://www.amazon.com/dp/B0GX34T63R",
  },
  {
    id: "stay-productive",
    title: "How to Stay Productive as a Developer",
    blurb: "Real-world strategies to protect deep work, ship consistently and avoid burnout under deadline pressure.",
    cover: "/images/how-to-stay-productive.jpg",
    url: "https://www.amazon.com/How-Stay-Productive-Developer-Real-World-ebook/dp/B0FLNNZV6C/",
  },
] as const;

const bookSchema = (b: (typeof BOOKS)[number]) => ({
  "@context": "https://schema.org",
  "@type": "Book",
  name: b.title,
  author: { "@type": "Person", name: "Talha Saleem", url: SITE.url },
  image: `${SITE.url}${b.cover}`,
  url: b.url,
  inLanguage: "en",
  bookFormat: "https://schema.org/EBook",
});

const fmt = (d: string, month: "short" | "long" = "short") =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month, day: "numeric", timeZone: "UTC" });

export default function Writing() {
  const posts = getAllPosts()
    .filter((p) => p.metadata?.date)
    .sort((a, b) => +new Date(b.metadata.date) - +new Date(a.metadata.date))
    .slice(0, 3);
  const linkedin = LINKEDIN_POSTS.slice(0, 4);

  return (
    <section id="writing" className="section-y relative">
      {BOOKS.map((b) => (
        <script key={b.id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema(b)) }} />
      ))}

      <div className="container-x">
        <SectionHeading
          index="06"
          eyebrow="Writing"
          title={
            <>
              I write about <span className="text-gradient">what I ship.</span>
            </>
          }
          description="Two books on Amazon Kindle, long-form articles here, and shorter notes on LinkedIn."
        >
          <Link href="/articles-and-insights" className="btn-ghost">
            All articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </SectionHeading>

        {/* Books */}
        <Stagger className="grid gap-5 md:grid-cols-2">
          {BOOKS.map((b) => (
            <StaggerItem key={b.id}>
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="spotlight glass group flex h-full gap-5 rounded-2xl p-4 transition-transform duration-500 hover:-translate-y-1 sm:p-5"
              >
                <div className="relative aspect-[2/3] w-24 shrink-0 overflow-hidden rounded-lg shadow-xl shadow-black/30 ring-1 ring-border sm:w-28">
                  <Image
                    src={b.cover}
                    alt={`${b.title} cover`}
                    fill
                    sizes="112px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="eyebrow text-[10px]">
                    <BookOpen className="h-3 w-3" /> Kindle book
                  </span>
                  <h3 className="mt-2 text-base font-semibold leading-snug sm:text-lg">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.blurb}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-primary">
                    View on Amazon
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-5 grid gap-5 lg:grid-cols-5">
          {/* Long-form articles */}
          <Stagger className="grid gap-5 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-1">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/articles-and-insights/${post.slug}`}
                  className="spotlight glass group flex h-full flex-col gap-4 rounded-2xl p-3 transition-transform duration-500 hover:-translate-y-1 lg:flex-row lg:items-center"
                >
                  {post.metadata.image && (
                    <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-xl lg:aspect-[4/3] lg:w-44">
                      <Image
                        src={post.metadata.image}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 33vw, 160px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="min-w-0 px-1 pb-1 lg:py-1 lg:pr-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      Article · {fmt(post.metadata.date)}
                    </p>
                    <h3 className="mt-1.5 line-clamp-2 text-[15px] font-semibold leading-snug transition-colors group-hover:text-primary">
                      {post.metadata.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{post.metadata.description}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          {/* LinkedIn feed */}
          <Reveal className="lg:col-span-2" delay={0.1}>
            <div className="glass flex h-full flex-col rounded-2xl p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#0A66C2] text-white">
                    <Linkedin className="h-4 w-4" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold">Latest on LinkedIn</p>
                    <p className="text-xs text-muted-foreground">{LINKEDIN_FOLLOWERS} followers</p>
                  </div>
                </div>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#0A66C2]/40 px-3 py-1 text-xs font-medium text-[#0A66C2] transition-colors hover:bg-[#0A66C2] hover:text-white dark:text-[#5aa9f5]"
                >
                  Follow
                </a>
              </div>

              <ul className="mt-4 divide-y divide-border/60">
                {linkedin.map((p) => (
                  <li key={p.url}>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block py-3.5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{fmt(p.date)}</p>
                      <p className="mt-1 flex items-start justify-between gap-3 text-sm font-medium leading-snug transition-colors group-hover:text-primary">
                        <span className="line-clamp-2">{p.title}</span>
                        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{p.blurb}</p>
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={`${SITE.linkedin}recent-activity/all/`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                See all posts
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
