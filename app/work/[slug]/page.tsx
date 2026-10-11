import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Lightbulb, MessageCircle } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { BrowserFrame } from "@/components/projects/browser-frame";
import { TechIcon, iconFor } from "@/components/icons/tech-icons";
import { CATEGORY_LABEL, PROJECTS, creditLine, formatProjectDate, getProject } from "@/lib/projects";
import { SITE } from "@/lib/site";
import { ARCHITECTURES } from "@/lib/architectures";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project not found" };
  const url = `${SITE.url}/work/${p.slug}`;
  // Preview images come from ./opengraph-image.tsx (generated per project)
  return {
    title: `${p.name}: ${CATEGORY_LABEL[p.category]} case study`,
    description: p.summary,
    keywords: [...p.stack, CATEGORY_LABEL[p.category], "case study", "Talha Saleem"],
    alternates: { canonical: url },
    openGraph: {
      title: `${p.name} | Talha Saleem`,
      description: p.summary,
      url,
      type: "article",
      authors: ["Talha Saleem"],
    },
    twitter: { card: "summary_large_image", title: `${p.name} | Talha Saleem`, description: p.summary },
  };
}

function Block({ label, index, children }: { label: string; index: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-3 border-t border-border/60 py-10 md:grid-cols-[200px_1fr] md:gap-10">
      <p className="eyebrow self-start">
        <span className="text-primary">{index}</span>
        <span className="h-px w-5 bg-border" />
        {label}
      </p>
      <div className="text-[17px] leading-relaxed text-foreground/85">{children}</div>
    </Reveal>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = PROJECTS.findIndex((x) => x.slug === p.slug);
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  // Same category first, then the most recent others: keeps internal links relevant.
  const related = [
    ...PROJECTS.filter((x) => x.slug !== p.slug && x.slug !== next.slug && x.category === p.category),
    ...PROJECTS.filter((x) => x.slug !== p.slug && x.slug !== next.slug && x.category !== p.category && x.featured),
  ].slice(0, 3);

  const url = `${SITE.url}/work/${p.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: p.name,
        headline: p.name,
        description: p.summary,
        abstract: `${p.problem} ${p.outcome}`,
        url,
        image: `${url}/opengraph-image`,
        dateModified: p.date.length === 4 ? `${p.date}-12-01` : `${p.date}-01`,
        author: { "@type": "Person", "@id": `${SITE.url}/#person`, name: "Talha Saleem", url: SITE.url },
        keywords: p.stack.join(", "),
        genre: CATEGORY_LABEL[p.category],
        ...(p.live ? { sameAs: p.live } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Work", item: `${SITE.url}/#work` },
          { "@type": "ListItem", position: 3, name: p.name, item: url },
        ],
      },
    ],
  };

  return (
    <article className="relative pb-10 pt-32 sm:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px]" />

      <div className="container-x">
        <Reveal>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/#work" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              All work
            </Link>
            <span aria-hidden className="text-border">/</span>
            <span className="truncate text-foreground/70" aria-current="page">
              {p.name}
            </span>
          </nav>
        </Reveal>

        <header className="mt-8 max-w-4xl">
          <Reveal blur delay={0.05}>
            <p className="eyebrow">
              <span className="text-primary">{CATEGORY_LABEL[p.category]}</span>
              <span className="h-px w-5 bg-border" />
              {p.role}
              <span className="h-px w-5 bg-border" />
              <time dateTime={p.date}>{formatProjectDate(p.date)}</time>
            </p>
            <h1 className="mt-4 text-balance text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.045em]">{p.name}</h1>
            <p className="mt-6 max-w-3xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">{p.summary}</p>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-3">
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn-glow h-11 px-5 text-sm">
                Visit live site
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-ghost h-11 text-sm">
                <Github className="h-4 w-4" />
                Source on GitHub
              </a>
            )}
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <span className="relative h-6 w-6 overflow-hidden rounded-full ring-1 ring-border">
                <Image src={SITE.photo} alt="" fill sizes="24px" className="object-cover" />
              </span>
              {creditLine(p)}
            </span>
          </Reveal>
        </header>

        {p.metrics && (
          <Stagger className="mt-12 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60">
            {p.metrics.map((m) => (
              <StaggerItem key={m.label} className="bg-background/85 p-5">
                <p className="text-gradient text-3xl font-semibold tracking-tight sm:text-4xl">{m.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        <Reveal y={40} delay={0.1} className="relative mt-14">
          <div aria-hidden className="absolute -inset-x-10 -inset-y-10 -z-10 rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.18),transparent)]" />
          <BrowserFrame project={p} priority sizes="(max-width: 1200px) 94vw, 1100px" className="rounded-2xl" />
        </Reveal>

        <div className="mt-16">
          {(() => {
            const screens = p.gallery ?? (ARCHITECTURES[p.slug] && p.image ? [{ src: p.image, caption: p.name }] : []);
            let n = 0;
            const idx = () => String(++n).padStart(2, "0");
            const bullets = (items: string[]) => (
              <ul className="mt-6 space-y-3">
                {items.map((h) => (
                  <li key={h} className="flex gap-3 text-[15px] text-muted-foreground">
                    <span aria-hidden className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {h}
                  </li>
                ))}
              </ul>
            );
            return (
              <>
                <Block index={idx()} label="The problem">
                  <p>{p.problem}</p>
                </Block>
                <Block index={idx()} label="My contribution">
                  <p>{p.contribution}</p>
                  {p.highlights && !p.confidential && bullets(p.highlights)}
                </Block>
                {p.highlights && p.confidential && (
                  <Block index={idx()} label="The platform">
                    <p className="text-muted-foreground">What the product does. Details are kept generic to respect the client&apos;s confidentiality.</p>
                    {bullets(p.highlights)}
                  </Block>
                )}
                <Block index={idx()} label="Outcome">
                  <p>{p.outcome}</p>
                </Block>
                {screens.length > 0 && (
                  <Block index={idx()} label="Product screens">
                    <div className="grid gap-5 sm:grid-cols-2">
                      {screens.map((sc) => (
                        <figure key={sc.src} className="group">
                          <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-xl shadow-black/20">
                            <div className="flex h-6 items-center gap-1 border-b border-border/70 bg-muted/60 px-2.5">
                              <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
                              <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
                              <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
                            </div>
                            <a href={sc.src} target="_blank" rel="noopener noreferrer" className="relative block aspect-[16/9] overflow-hidden">
                              <Image
                                src={sc.src}
                                alt={sc.caption}
                                fill
                                sizes="(max-width: 640px) 92vw, 440px"
                                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                              />
                            </a>
                          </div>
                          <figcaption className="mt-2.5 text-sm leading-snug text-muted-foreground">{sc.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  </Block>
                )}
                {p.note && (
                  <Block index={idx()} label="Engineering note">
                    <div className="glass flex gap-4 rounded-2xl p-5 text-[15px] text-muted-foreground">
                      <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-signal" />
                      <p>{p.note}</p>
                    </div>
                  </Block>
                )}
                <Block index={idx()} label="Tech stack">
                  <ul className="flex flex-wrap gap-2">
                    {p.stack.map((t) => {
                      const icon = iconFor(t);
                      return (
                        <li key={t} className="chip py-1.5 text-[13px]">
                          {icon && <TechIcon name={icon} className="h-3.5 w-3.5" />}
                          {t}
                        </li>
                      );
                    })}
                  </ul>
                </Block>
              </>
            );
          })()}
        </div>

        {/* Signature + CTA */}
        <Reveal className="mt-6">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-primary/25 p-8 sm:p-12">
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_120%_at_0%_0%,hsl(var(--primary)/0.2),transparent_60%)]" />
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-1 ring-border">
                  <Image src={SITE.photo} alt="Talha Saleem" fill sizes="64px" className="object-cover" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">{creditLine(p)}</p>
                  <p className="mt-1 text-balance text-2xl font-semibold tracking-tight">Want something like this built for you?</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/#contact" className="btn-glow">
                  Let&apos;s Work Together
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-16">
            <h2 id="related-heading" className="eyebrow">
              Related work
            </h2>
            <Stagger className="mt-5 grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <StaggerItem key={r.slug}>
                  <Link
                    href={`/work/${r.slug}`}
                    className="spotlight glass group flex h-full flex-col rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {CATEGORY_LABEL[r.category]} · {formatProjectDate(r.date)}
                    </span>
                    <span className="mt-2 text-base font-semibold leading-snug transition-colors group-hover:text-primary">{r.name}</span>
                    <span className="mt-2 line-clamp-2 text-sm text-muted-foreground">{r.summary}</span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        )}

        <Reveal className="mt-6">
          <Link
            href={`/work/${next.slug}`}
            className="spotlight glass group flex items-center justify-between gap-6 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <div>
              <p className="eyebrow">Next project</p>
              <p className="mt-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">{next.name}</p>
              <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{next.summary}</p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
