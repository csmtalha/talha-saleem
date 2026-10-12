import { getAllPosts } from "@/lib/posts";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ArrowRight, Clock, Linkedin } from "lucide-react";
import { SITE } from "@/lib/site";
import "./blog-styles.css";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const DEFAULT_IMAGE = "/images/talha-saleem.jpg";

function readingMinutes(markdown: string) {
  return Math.max(1, Math.round(markdown.split(/\s+/).filter(Boolean).length / 230));
}

/** Older posts repeat their title as a leading "# H1"; the page already renders one. */
function stripLeadingH1(markdown: string) {
  return markdown.replace(/^\s*#\s+[^\n]+\n+/, "");
}

const newestFirst = <T extends { metadata: { date?: string } }>(a: T, b: T) =>
  +new Date(b.metadata.date ?? 0) - +new Date(a.metadata.date ?? 0);

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const articleUrl = `${SITE.url}/articles-and-insights/${post.slug}`;
  const imageUrl = post.metadata.image || DEFAULT_IMAGE;
  const tags: string[] = post.metadata.tags ?? [];

  return {
    // The root layout's title template appends "| Talha Saleem"
    title: post.metadata.title,
    description: post.metadata.description,
    keywords: tags,
    authors: [{ name: "Talha Saleem", url: SITE.url }],
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      url: articleUrl,
      type: "article",
      publishedTime: post.metadata.date,
      modifiedTime: post.metadata.updated ?? post.metadata.date,
      authors: [SITE.url],
      tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: articleUrl,
    },
  };
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(stripLeadingH1(post.content));

  const contentHtml = processedContent.toString();

  const articleUrl = `${SITE.url}/articles-and-insights/${post.slug}`;
  const imageUrl = post.metadata.image || DEFAULT_IMAGE;
  const tags: string[] = post.metadata.tags ?? [];
  const minutes = readingMinutes(post.content);
  const words = post.content.split(/\s+/).filter(Boolean).length;
  const linkedinUrl: string | undefined = post.metadata.linkedin;
  const related = posts.filter((p) => p.slug !== post.slug).sort(newestFirst).slice(0, 3);
  const published = new Date(post.metadata.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        headline: post.metadata.title,
        description: post.metadata.description,
        datePublished: post.metadata.date,
        dateModified: post.metadata.updated ?? post.metadata.date,
        author: {
          "@type": "Person",
          "@id": `${SITE.url}/#person`,
          name: "Talha Saleem",
          url: SITE.url,
        },
        publisher: { "@id": `${SITE.url}/#person` },
        image: { "@type": "ImageObject", url: `${SITE.url}${imageUrl}`, width: 1200, height: 630 },
        mainEntityOfPage: articleUrl,
        keywords: tags.join(", "),
        wordCount: words,
        timeRequired: `PT${minutes}M`,
        inLanguage: "en",
        ...(linkedinUrl ? { sameAs: linkedinUrl } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Articles", item: `${SITE.url}/articles-and-insights` },
          { "@type": "ListItem", position: 3, name: post.metadata.title, item: articleUrl },
        ],
      },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/articles-and-insights" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          All articles
        </Link>
      </nav>

      {/* Article Header */}
      <header className="mb-10">
        {tags.length > 0 && (
          <ul className="mb-5 flex flex-wrap gap-1.5" aria-label="Topics">
            {tags.slice(0, 4).map((t) => (
              <li key={t} className="chip px-2.5 py-0.5 text-[11px]">
                {t}
              </li>
            ))}
          </ul>
        )}
        <h1 className="text-balance text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
          {post.metadata.title}
        </h1>
        {post.metadata.description && (
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.metadata.description}</p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="relative h-7 w-7 overflow-hidden rounded-full ring-1 ring-border">
              <Image src={SITE.photo} alt="" fill sizes="28px" className="object-cover" />
            </span>
            <span className="font-medium text-foreground">Talha Saleem</span>
          </span>
          <time dateTime={post.metadata.date}>{published}</time>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {minutes} min read
          </span>
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0A66C2] hover:underline dark:text-[#5aa9f5]"
            >
              <Linkedin className="h-3.5 w-3.5" />
              Discussion on LinkedIn
            </a>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {post.metadata.image && (
        <div className="relative mb-12 aspect-[1200/630] w-full overflow-hidden rounded-2xl border border-border/60">
          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article Content */}
      <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-primary prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-medium prose-code:before:content-none prose-code:after:content-none">
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>

      {/* Author / CTA */}
      <aside className="glass mt-16 flex flex-col gap-5 rounded-2xl p-6 sm:flex-row sm:items-center">
        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl ring-1 ring-border">
          <Image src={SITE.photo} alt="Talha Saleem" fill sizes="56px" className="object-cover" />
        </span>
        <div className="flex-1">
          <p className="font-semibold">Written by Talha Saleem</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Lead Full-Stack Engineer. I build and fix SaaS products, AI features and production websites end to end.
          </p>
        </div>
        <Link href="/#contact" className="btn-glow h-11 px-5 text-sm">
          Work with me
          <ArrowRight className="h-4 w-4" />
        </Link>
      </aside>

      {/* Share */}
      <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
        <span className="text-muted-foreground">Share:</span>
        <a
          className="btn-ghost h-9 px-4 text-sm"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="btn-ghost h-9 px-4 text-sm"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.metadata.title)}&url=${encodeURIComponent(articleUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          X
        </a>
        <a
          className="btn-ghost h-9 px-4 text-sm"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section aria-labelledby="more-articles" className="mt-16 border-t border-border/60 pt-10">
          <h2 id="more-articles" className="eyebrow">
            More articles
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/articles-and-insights/${r.slug}`}
                  className="spotlight glass group flex h-full flex-col rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {new Date(r.metadata.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" })}
                  </span>
                  <span className="mt-2 line-clamp-3 text-[15px] font-semibold leading-snug transition-colors group-hover:text-primary">
                    {r.metadata.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
