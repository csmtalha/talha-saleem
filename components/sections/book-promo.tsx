import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink } from "lucide-react";

const SITE_ORIGIN = "https://talha.creexio.com";

/** Still exported so page.tsx JSON-LD can reference it if needed */
export const BOOK_COVER = {
  src: "/images/AI-Business.jpg",
  width: 1024,
  height: 1536,
} as const;

const BOOKS = [
  {
    id: "ai-productivity",
    title: "AI Productivity for Businesses: Practical Operations",
    description:
      "A concise, practical guide to AI productivity for businesses - from day-to-day operations to workflows that compound. Ideal for leaders and builders who want actionable ideas, not hype.",
    bullets: [
      "Maps how teams can improve productivity with AI in real business contexts - operations, handoffs, and execution.",
      "Grounded framing for decision-makers evaluating AI tools, SOPs, and internal adoption without drowning in buzzwords.",
      "Written for builders and operators who care about shipping.",
    ],
    cover: { src: "/images/AI-Business.jpg", width: 1024, height: 1536 },
    url: "https://www.amazon.com/dp/B0GX34T63R",
    badges: ["AI for business", "Operations", "Kindle"],
    schema: {
      "@context": "https://schema.org",
      "@type": "Book",
      name: "AI Productivity for Businesses: Practical Operations",
      author: { "@type": "Person", name: "Talha Saleem", url: "https://talha.creexio.com" },
      image: `${SITE_ORIGIN}/images/AI-Business.jpg`,
      url: "https://www.amazon.com/dp/B0GX34T63R",
      inLanguage: "en",
      bookFormat: "https://schema.org/EBook",
    },
  },
  {
    id: "stay-productive",
    title: "How to Stay Productive as a Developer: Real-World Strategies to Code Better and Avoid Burnout",
    description:
      "Real-world strategies for developers to stay focused, ship consistently, and avoid the burnout that kills momentum. Built from years of leading teams under real deadline pressure.",
    bullets: [
      "Practical focus systems that actually work in a world of Slack pings, context switches, and shifting priorities.",
      "How to protect deep work time while staying unblocked as a team contributor.",
      "Burnout prevention strategies for engineers who care too much to coast.",
    ],
    cover: { src: "/images/how-to-stay-productive.jpg", width: 1024, height: 1536 },
    url: "https://www.amazon.com/How-Stay-Productive-Developer-Real-World-ebook/dp/B0FLNNZV6C/",
    badges: ["Developer productivity", "Burnout", "Kindle"],
    schema: {
      "@context": "https://schema.org",
      "@type": "Book",
      name: "How to Stay Productive as a Developer: Real-World Strategies to Code Better and Avoid Burnout",
      author: { "@type": "Person", name: "Talha Saleem", url: "https://talha.creexio.com" },
      image: `${SITE_ORIGIN}/images/how-to-stay-productive.jpg`,
      url: "https://www.amazon.com/How-Stay-Productive-Developer-Real-World-ebook/dp/B0FLNNZV6C/",
      inLanguage: "en",
      bookFormat: "https://schema.org/EBook",
    },
  },
] as const;

export default function BookPromo() {
  return (
    <section
      id="book"
      aria-labelledby="book-promo-heading"
      className="section-container bg-gradient-to-b from-background to-muted/20 relative overflow-hidden"
    >
      {BOOKS.map((book) => (
        <script
          key={book.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(book.schema) }}
        />
      ))}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <header className="text-center mb-12 md:mb-14">
          <div className="flex justify-center mb-4">
            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
              Kindle books by Talha Saleem
            </Badge>
          </div>
          <h2
            id="book-promo-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4"
          >
            Published on Amazon
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Two books on the things that slow engineers down - AI adoption and staying sharp under pressure.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {BOOKS.map((book) => (
            <div
              key={book.id}
              className="glass-effect rounded-2xl border border-border/40 shadow-xl overflow-hidden flex flex-col"
            >
              {/* Cover */}
              <div className="flex items-center justify-center bg-muted/50 px-8 pt-8 pb-6">
                <Image
                  src={book.cover.src}
                  alt={`${book.title} - Kindle ebook cover`}
                  width={book.cover.width}
                  height={book.cover.height}
                  className="h-56 w-auto rounded-md shadow-lg object-cover"
                  quality={90}
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col gap-4 flex-1">
                <div className="flex flex-wrap gap-2">
                  {book.badges.map((b) => (
                    <Badge key={b} variant="outline" className="text-xs">
                      {b}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-lg md:text-xl font-bold text-foreground leading-snug">
                  {book.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {book.description}
                </p>

                <ul className="space-y-2">
                  {book.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5 shrink-0">→</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 mt-auto">
                  <Button size="default" className="gap-2 w-full" asChild>
                    <a href={book.url} target="_blank" rel="noopener noreferrer">
                      <BookOpen className="h-4 w-4 shrink-0" />
                      View on Amazon
                      <ExternalLink className="h-3.5 w-3.5 opacity-80 shrink-0" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" className="glass-effect" asChild>
            <Link href="#contact">Work with me</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
