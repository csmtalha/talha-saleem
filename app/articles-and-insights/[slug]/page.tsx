import { getAllPosts } from "@/lib/posts";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import "./blog-styles.css";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

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

  const articleUrl = `https://talha.creexio.com/articles-and-insights/${post.slug}`;
  const imageUrl = post.metadata.image || "/images/default-image.jpg";

  return {
    title: `${post.metadata.title} | Talha Saleem`,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      url: articleUrl,
      type: "article",
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

  // Enhanced Markdown processing with proper HTML sanitization
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(post.content);

  const contentHtml = processedContent.toString();

  // SEO Metadata
  const articleUrl = `https://talha.creexio.com/articles-and-insights/${post.slug}`;
  const imageUrl = post.metadata.image || "/images/default-image.jpg"; // Default image if no image exists
  const categories = post.metadata.categories?.join(", ") || "";
  const tags = post.metadata.tags?.join(", ") || "";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
        <div className="relative w-full h-[600px] mb-12 rounded-xl overflow-hidden">
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
