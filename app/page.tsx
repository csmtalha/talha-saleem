import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import Stats from "@/components/sections/stats";
import CareerSnapshot from "@/components/sections/career-snapshot";
import Services from "@/components/sections/services";
import CaseStudies from "@/components/sections/case-studies";
import Projects from "@/components/sections/projects";
import MvpProjects from "@/components/sections/mvp-projects";
import EngineeringExperience from "@/components/sections/engineering-experience";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Blog from "@/components/sections/blog";
import BookPromo from "@/components/sections/book-promo";
import Availability from "@/components/sections/availability";
import Contact from "@/components/sections/contact";
import CtaSection from "@/components/sections/cta-section";
import Header from "@/components/sections/header";
import ScrollToTop from "@/components/scroll-to-top";

export const metadata: Metadata = {
  metadataBase: new URL("https://talha.creexio.com"),
  title:
    "Talha Saleem | Lead Full Stack Engineer — React, Next.js, Node.js, AWS",
  description:
    "Lead Full Stack Engineer with 5+ years building scalable SaaS & multi-tenant platforms. React, Next.js, Vue.js, Node.js, NestJS, AWS, Stripe. Remote, PST overlap. Author: AI Productivity for Businesses (Kindle).",
  keywords: [
    "Lead Full Stack Engineer",
    "Full Stack Developer",
    "Multi-tenant SaaS",
    "React Developer",
    "Next.js Developer",
    "Vue.js Developer",
    "Node.js Developer",
    "NestJS",
    "AWS",
    "Stripe integration",
    "WordPress developer",
    "Shopify developer",
    "remote developer",
    "Talha Saleem",
    "AI Productivity for Businesses",
    "AI for operations",
    "business AI Kindle",
    "practical AI workflows",
    "SaaS architecture",
    "RBAC",
  ],
  authors: [{ name: "Talha Saleem", url: "https://talha.creexio.com" }],
  creator: "Talha Saleem",
  verification: {
    google: "DLA0_IP3Hsut84nJRmawwY7w18Tp7lAZeqGafn8IBH4",
  },
  alternates: {
    canonical: "https://talha.creexio.com",
  },
  openGraph: {
    title:
      "Talha Saleem | Lead Full Stack Engineer — React, Next.js, Node.js, AWS",
    description:
      "Lead Full Stack Engineer with 5+ years building scalable SaaS. Multi-tenant platforms, RBAC, Stripe, AI, AWS. Author: AI Productivity for Businesses (Kindle). Remote, PST overlap.",
    url: "https://talha.creexio.com",
    siteName: "Talha Saleem — Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/hero-dp.png",
        width: 1200,
        height: 630,
        alt: "Talha Saleem — Lead Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Talha Saleem | Lead Full Stack Engineer — React, Next.js, Node.js, AWS",
    description:
      "Lead Full Stack Engineer, scalable SaaS & AI in production. Author: AI Productivity for Businesses (Kindle). Remote, PST overlap.",
    images: ["/images/hero-dp.png"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Talha Saleem",
  url: "https://talha.creexio.com",
  jobTitle: "Lead Full Stack Engineer",
  description:
    "Lead Full Stack Engineer with 5+ years building scalable SaaS and multi-tenant platforms. React, Next.js, Vue.js, Node.js, NestJS, AWS, Stripe.",
  sameAs: [
    "https://www.linkedin.com/in/talhasaleem-dev",
    "https://github.com/csmtalha",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "Vue.js",
    "Node.js",
    "NestJS",
    "AWS",
    "Stripe",
    "SaaS Architecture",
    "Multi-tenant Platforms",
    "WordPress",
    "Shopify",
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
      <CareerSnapshot />
      <CaseStudies />
      <Services />
      <MvpProjects />
      <Projects />
      <About />
      <Skills />
      <EngineeringExperience />
      <Availability />
      <Blog />
      <BookPromo />
      <Contact />
      <CtaSection />
      <ScrollToTop />
    </main>
  );
}
