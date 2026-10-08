import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import Stats from "@/components/sections/stats";
import Experience from "@/components/sections/experience";
import CaseStudies from "@/components/sections/case-studies";
import Projects from "@/components/sections/projects";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Blog from "@/components/sections/blog";
import BookPromo from "@/components/sections/book-promo";
import Availability from "@/components/sections/availability";
import Contact from "@/components/sections/contact";
import CtaSection from "@/components/sections/cta-section";
import Header from "@/components/sections/header";
import ScrollToTop from "@/components/scroll-to-top";

const TITLE = "Talha Saleem | Lead Full-Stack Engineer (React, Next.js, Node.js, NestJS)";
const DESCRIPTION =
  "Lead Full-Stack Engineer with 6+ years shipping TypeScript products end to end: React/Next.js, Node.js/NestJS, PostgreSQL, AI integrations, tests and AWS deploys. Open to remote senior and lead roles.";

export const metadata: Metadata = {
  metadataBase: new URL("https://talha-saleem.vercel.app"),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Talha Saleem",
    "Lead Full-Stack Engineer",
    "Senior Full-Stack Engineer remote",
    "Senior React Next.js developer",
    "NestJS Node.js engineer",
    "TypeScript full-stack engineer Pakistan",
    "PostgreSQL Prisma Supabase",
    "AI integration engineer RAG pgvector",
    "multi-tenant SaaS engineer",
    "remote software engineer PST overlap",
  ],
  authors: [{ name: "Talha Saleem", url: "https://talha-saleem.vercel.app" }],
  creator: "Talha Saleem",
  verification: {
    google: "DLA0_IP3Hsut84nJRmawwY7w18Tp7lAZeqGafn8IBH4",
  },
  alternates: {
    canonical: "https://talha-saleem.vercel.app",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://talha-saleem.vercel.app",
    siteName: "Talha Saleem",
    type: "profile",
    locale: "en_US",
    images: [
      {
        url: "https://talha-saleem.vercel.app/images/talha-saleem.jpg",
        width: 1254,
        height: 1254,
        alt: "Talha Saleem - Lead Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Talha Saleem | Lead Full-Stack Engineer",
    description: DESCRIPTION,
    images: ["https://talha-saleem.vercel.app/images/talha-saleem.jpg"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Talha Saleem",
  url: "https://talha-saleem.vercel.app",
  image: "https://talha-saleem.vercel.app/images/talha-saleem.jpg",
  jobTitle: "Lead Full-Stack Engineer",
  worksFor: { "@type": "Organization", name: "Cloudpacer" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Lahore" },
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  email: "mailto:csmtalha@gmail.com",
  sameAs: [
    "https://www.linkedin.com/in/csmtalha",
    "https://github.com/csmtalha",
  ],
  description: DESCRIPTION,
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "Prisma",
    "Supabase",
    "Retrieval-augmented generation",
    "Multi-tenant SaaS",
    "AWS",
    "Stripe",
  ],
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Header />
      <Hero />
      <Stats />
      <CaseStudies />
      <Experience />
      <Projects />
      <Skills />
      <About />
      <Availability />
      <Blog />
      <BookPromo />
      <Contact />
      <CtaSection />
      <ScrollToTop />
    </main>
  );
}
