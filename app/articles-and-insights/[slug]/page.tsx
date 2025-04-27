import { getAllPosts } from "@/lib/posts";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { notFound } from "next/navigation";
import Image from "next/image";
import Head from "next/head"; // For SEO meta tags
import "./blog-styles.css"; // Optional for custom styling

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }: Props) {
  const posts = getAllPosts();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Enhanced Markdown processing with proper HTML sanitization
  const processedContent = await unified()
    .use(remarkParse) // Parse Markdown
    .use(remarkRehype) // Convert to HTML
    .use(rehypeStringify) // Convert to string
    .process(post.content);

  const contentHtml = processedContent.toString();

  // SEO Metadata
  const articleUrl = `https://protalha.com/articles-and-insights/${post.slug}`;
  const imageUrl = post.metadata.image || "/images/default-image.jpg"; // Default image if no image exists
  const categories = post.metadata.categories.join(", ");
  const tags = post.metadata.tags.join(", ");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* SEO Meta Tags */}
      <Head>
        <title>{post.metadata.title} | Talha Saleem</title>
        <meta name="description" content={post.metadata.description} />
        <meta property="og:title" content={post.metadata.title} />
        <meta property="og:description" content={post.metadata.description} />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:title" content={post.metadata.title} />
        <meta name="twitter:description" content={post.metadata.description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={articleUrl} />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.metadata.title,
              description: post.metadata.description,
              datePublished: post.metadata.date,
              dateModified: post.metadata.date,
              author: {
                "@type": "Person",
                name: "Talha Saleem",
              },
              image: post.metadata.image || "/images/default-image.jpg",
              mainEntityOfPage: articleUrl,
              articleSection: categories,
              keywords: tags,
            }),
          }}
        />
      </Head>

      {/* Article Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.metadata.title}
        </h1>
        <div className="flex items-center text-gray-500 dark:text-gray-400 space-x-4">
          <span>
            Published on{" "}
            {new Date(post.metadata.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </header>

      {/* Featured Image */}
      {post.metadata.image && (
        <div className="relative w-full h-96 mb-12 rounded-xl overflow-hidden">
          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article Content */}
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>

      {/* Sharing Options */}
      <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Share this post
        </h3>
        <div className="flex space-x-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              post.metadata.title
            )}&url=${encodeURIComponent(articleUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600"
          >
            Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              articleUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800"
          >
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
