import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Articles & Insights - Talha Saleem",
  description: "Articles, tutorials, and thoughts from Talha.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-glow delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16 lg:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-animated">
            Articles & Insights ✍️
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Talha&apos;s thoughts, experiences, and insights on web development,
            technology trends, and the journey of building modern applications.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
