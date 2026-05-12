import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ExternalLink } from "lucide-react";

const SITE_ORIGIN = "https://www.talha-saleem.vercel.app";

const AMAZON_BOOK_URL = "https://www.amazon.com/dp/B0GX34T63R";

/** Matches `public/images/AI-Business.jpg` (asset dimensions). */
export const BOOK_COVER = {
  src: "/images/AI-Business.jpg",
  width: 1024,
  height: 1536,
} as const;

const BOOK_TITLE =
  "AI Productivity for Businesses: Practical Operations";

const bookJsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: BOOK_TITLE,
  author: {
    "@type": "Person",
    name: "Talha Saleem",
    url: "https://linkedin.com/in/csmtalha/",
  },
  image: `${SITE_ORIGIN}${BOOK_COVER.src}`,
  url: AMAZON_BOOK_URL,
  inLanguage: "en",
  bookFormat: "https://schema.org/EBook",
  description:
    "A Kindle ebook on AI productivity for businesses: practical workflows, operations, and applying AI where teams ship work faster.",
  offers: {
    "@type": "Offer",
    url: AMAZON_BOOK_URL,
    availability: "https://schema.org/OnlineOnly",
    category: "Kindle Store",
  },
};

export default function BookPromo() {
  return (
    <section
      id="book"
      aria-labelledby="book-promo-heading"
      className="section-container bg-gradient-to-b from-background to-muted/20 relative overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <header className="text-center mb-12 md:mb-14">
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            <Badge
              variant="secondary"
              className="text-xs bg-primary/10 text-primary border-primary/20"
            >
              Kindle ebook
            </Badge>
            <Badge variant="outline" className="text-xs">
              AI for business
            </Badge>
            <Badge variant="outline" className="text-xs">
              Operations
            </Badge>
          </div>
          <h2
            id="book-promo-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-5"
          >
            {BOOK_TITLE}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A concise, practical guide to{" "}
            <strong className="text-foreground font-semibold">
              AI productivity for businesses
            </strong>
            -from day-to-day operations to workflows that compound. Ideal for
            leaders and builders who want actionable ideas, not hype, on using AI
            where work actually happens.
          </p>
        </header>

        <Card className="glass-effect border-0 shadow-xl overflow-hidden max-w-5xl mx-auto">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-[minmax(200px,280px)_1fr] gap-0">
              <div className="flex items-center justify-center bg-muted p-6 md:p-8 min-h-[280px]">
                <Image
                  src={BOOK_COVER.src}
                  alt={`${BOOK_TITLE} - Kindle ebook cover`}
                  width={BOOK_COVER.width}
                  height={BOOK_COVER.height}
                  className="h-auto w-full max-w-[280px] rounded-md shadow-lg"
                  sizes="(max-width: 768px) min(90vw, 400px), 280px"
                  quality={90}
                />
              </div>
              <article className="p-6 md:p-10 flex flex-col justify-center gap-5">
                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  Why read it
                </h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm md:text-base leading-relaxed marker:text-primary">
                  <li>
                    Maps how teams can improve productivity with AI in real
                    business contexts-operations, handoffs, and execution.
                  </li>
                  <li>
                    Grounded framing for decision-makers evaluating AI tools,
                    SOPs, and internal adoption without drowning in buzzwords.
                  </li>
                  <li>
                    Written for builders and operators who care about shipping:
                    same lens I bring to full-stack SaaS and multi-tenant
                    platforms.
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Available on Amazon Kindle. Follow the link for the latest
                  pricing and regional availability.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Button size="lg" className="gap-2" asChild>
                    <a
                      href={AMAZON_BOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BookOpen className="h-5 w-5 shrink-0" aria-hidden />
                      View on Amazon
                      <ExternalLink className="h-4 w-4 opacity-80 shrink-0" aria-hidden />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="glass-effect" asChild>
                    <Link href="#contact">Work with me</Link>
                  </Button>
                </div>
              </article>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
