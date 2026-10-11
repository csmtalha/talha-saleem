import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Articles & Insights",
  description:
    "Engineering articles, tutorials, and insights from Talha Saleem - covering Next.js, React, Node.js, SaaS architecture, AI tooling, and modern web development.",
  alternates: {
    canonical: `${SITE.url}/articles-and-insights`,
  },
  openGraph: {
    title: "Articles & Insights | Talha Saleem",
    description:
      "Engineering articles, tutorials, and insights from Talha Saleem - covering Next.js, React, Node.js, SaaS architecture, AI tooling, and modern web development.",
    url: `${SITE.url}/articles-and-insights`,
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts().sort(
    (a, b) => +new Date(b.metadata.date) - +new Date(a.metadata.date)
  );

  return (
    <main className="relative min-h-screen">
      <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px]" />

      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 md:py-16">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow">Writing</p>
          <h1 className="mt-4 text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
            Articles &amp; <span className="text-gradient-animated">insights</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Notes from building production software: Next.js, migrations, AI in real workflows, and how I make engineering calls.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.slug}>
              <Link href={`/articles-and-insights/${post.slug}`}>
                <Card className="card-hover glass-effect spotlight rounded-2xl border-0 overflow-hidden group h-full">
                  <CardContent className="p-0">
                    {/* Featured Image */}
                    {post.metadata.image && (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={post.metadata.image}
                          alt={post.metadata.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )}

                    <div className="p-6">
                      {/* Tags */}
                      {post.metadata.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.metadata.tags
                            .slice(0, 3)
                            .map((tag: string, index: number) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                              >
                                {tag}
                              </Badge>
                            ))}
                          {post.metadata.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{post.metadata.tags.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                        {post.metadata.title}
                      </h2>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {post.metadata.description}
                      </p>

                      {/* Date */}
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          {new Date(post.metadata.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <div className="text-primary group-hover:translate-x-1 transition-transform duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold mb-2">No articles yet</h3>
            <p className="text-muted-foreground">
              New content is on the way. Check back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
