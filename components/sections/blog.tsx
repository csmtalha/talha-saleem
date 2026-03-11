import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Blog() {
  const posts = getAllPosts().slice(0, 3); // Show only latest 3 posts

  if (posts.length === 0) {
    return null; // Don't show section if no posts
  }

  return (
    <section
      id="blog"
      className="section-container bg-gradient-to-b from-muted/20 to-background relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse-glow delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse-glow delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Articles & Insights
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Next.js performance, migrating legacy apps to modern stacks, and
            lessons from upgrades like Vue 2 to Vue 3 and more from building
            production applications.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {posts.map((post) => (
            <div key={post.slug}>
              <Link href={`/articles-and-insights/${post.slug}`}>
                <Card className="card-hover glass-effect border-0 shadow-lg overflow-hidden group h-full">
                  <CardContent className="p-0">
                    {/* Featured Image */}
                    {post.metadata.image && (
                      <div className="relative h-48 overflow-hidden">
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
                            .slice(0, 2)
                            .map((tag: string, index: number) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                              >
                                {tag}
                              </Badge>
                            ))}
                          {post.metadata.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{post.metadata.tags.length - 2} more
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                        {post.metadata.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                        {post.metadata.description}
                      </p>

                      {/* Date */}
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {new Date(post.metadata.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <div className="text-primary group-hover:translate-x-1 transition-transform duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
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

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="glass-effect hover:scale-105 transition-transform duration-300"
            asChild
          >
            <Link href="/articles-and-insights">
              View All Articles
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
                className="ml-2"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
