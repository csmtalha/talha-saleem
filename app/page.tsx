import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import Stats from "@/components/sections/stats";
import CareerSnapshot from "@/components/sections/career-snapshot";
import WhyTalha from "@/components/sections/why-talha";
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
    "Talha Saleem | AI-Powered SaaS & Compliance Platforms | Fintech, Freight & Healthcare",
  description:
    "I build multi-tenant SaaS platforms, AI automation pipelines, and compliance systems for fintech, freight, and healthcare companies. Production-ready. Shipped to real clients. Based in Lahore, Pakistan.",
  keywords: [
    "fintech SaaS development agency Pakistan",
    "FMCSA compliance software development",
    "multi-tenant NestJS SaaS development",
    "AI automation for microfinance loan management",
    "compliance platform development regulated industries",
    "AI-powered SaaS agency",
    "NestJS Next.js agency",
    "loan management system development",
    "freight compliance software",
    "healthcare AI automation",
    "Talha Saleem",
    "AI Productivity for Businesses",
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
      "Talha Saleem | AI-Powered SaaS & Compliance Platforms | Fintech, Freight & Healthcare",
    description:
      "I build multi-tenant SaaS platforms, AI automation pipelines, and compliance systems for fintech, freight, and healthcare companies. Production-ready. Shipped to real clients.",
    url: "https://talha.creexio.com",
    siteName: "Talha Saleem - AI SaaS Agency",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://talha.creexio.com/images/profilepic.jpeg",
        width: 1200,
        height: 630,
        alt: "Talha Saleem - AI-Powered SaaS Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Talha Saleem | AI-Powered SaaS & Compliance Platforms",
    description:
      "Multi-tenant SaaS, AI automation, and compliance platforms for fintech, freight, and healthcare. Production-ready. Based in Lahore, Pakistan.",
    images: ["https://talha.creexio.com/images/profilepic.jpeg"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Talha Saleem - AI SaaS Agency",
  url: "https://talha.creexio.com",
  founder: {
    "@type": "Person",
    name: "Talha Saleem",
    jobTitle: "Lead Full Stack Engineer & Founder",
    sameAs: [
      "https://www.linkedin.com/in/talhasaleem-dev",
      "https://github.com/csmtalha",
    ],
  },
  description:
    "I build multi-tenant SaaS platforms, AI automation pipelines, and compliance systems for fintech, freight, and healthcare companies. Production-ready. Based in Lahore, Pakistan.",
  areaServed: "Worldwide",
  knowsAbout: [
    "AI Automation",
    "Multi-tenant SaaS",
    "Compliance Platforms",
    "Fintech Software",
    "FMCSA Compliance",
    "Loan Management Systems",
    "NestJS",
    "Next.js",
    "React",
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
      <WhyTalha />
      {/* <CareerSnapshot /> */}
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
