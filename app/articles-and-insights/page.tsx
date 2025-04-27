import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Articles & Insights - Talha Saleem",
  description: "Articles, tutorials, and thoughts from Talha.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-7xl mx-auto px-6 py-6">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
        Articles & Insights ✍️
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/articles-and-insights/${post.slug}`}
            className="group p-6 border rounded-2xl hover:shadow-lg transition transform hover:scale-105"
          >
            {/* Featured Image */}
            {post.metadata.image && (
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={post.metadata.image}
                  alt={post.metadata.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform"
                />
              </div>
            )}

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-primary transition">
              {post.metadata.title}
            </h2>

            {/* Description */}
            <p className="mt-2 text-gray-600 dark:text-gray-400 group-hover:text-gray-700">
              {post.metadata.description}
            </p>

            {/* Date */}
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
              {new Date(post.metadata.date).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
