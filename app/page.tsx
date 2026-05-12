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
import BookPromo, { BOOK_COVER } from "@/components/sections/book-promo";
import Availability from "@/components/sections/availability";
import Contact from "@/components/sections/contact";
import CtaSection from "@/components/sections/cta-section";
import Header from "@/components/sections/header";
import ScrollToTop from "@/components/scroll-to-top";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.talha-saleem.vercel.app"),
  title:
    "Lead Full Stack Engineer | Scalable SaaS & Multi-Tenant Platforms | React · Next.js · Vue.js · Node.js · NestJS | AWS | WordPress & Shopify",
  description:
    "Lead Full Stack Engineer with 5+ years building scalable SaaS. Led a multi-tenant mortgage platform from scratch-architecture, RBAC, Stripe, AI, AWS. Remote, PST overlap, founder-led teams. Week-one impact. Author of the Kindle book AI Productivity for Businesses: Practical Operations—AI productivity for teams and operations.",
  keywords: [
    "Lead Full Stack Engineer",
    "Multi-tenant SaaS",
    "React Developer",
    "Next.js Developer",
    "Vue.js",
    "Node.js",
    "NestJS",
    "AWS",
    "Stripe",
    "WordPress developer",
    "Shopify developer",
    "remote developer",
    "AI Productivity for Businesses",
    "AI productivity for businesses",
    "AI for operations",
    "business AI Kindle",
    "practical AI workflows",
    "Talha Saleem author",
  ],
  verification: {
    google: "DLA0_IP3Hsut84nJRmawwY7w18Tp7lAZeqGafn8IBH4",
  },
  openGraph: {
    title:
      "Lead Full Stack Engineer | Scalable SaaS & Multi-Tenant Platforms | React · Next.js · Vue.js · Node.js · NestJS | AWS | WordPress & Shopify",
    description:
      "Lead Full Stack Engineer with 5+ years building scalable SaaS. Multi-tenant platforms, RBAC, Stripe, AI, AWS. Author: AI Productivity for Businesses: Practical Operations (Kindle). Remote, PST overlap.",
    type: "website",
    images: [
      {
        url: BOOK_COVER.src,
        width: BOOK_COVER.width,
        height: BOOK_COVER.height,
        alt: "AI Productivity for Businesses: Practical Operations - Kindle ebook cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Lead Full Stack Engineer | Scalable SaaS & Multi-Tenant Platforms | React · Next.js · Vue.js · Node.js · NestJS | AWS | WordPress & Shopify",
    description:
      "Lead Full Stack Engineer, scalable SaaS & AI in production. Author: AI Productivity for Businesses (Kindle). Remote, PST overlap.",
    images: [BOOK_COVER.src],
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <Hero />
      <Stats />
      <CaseStudies />
      <MvpProjects />
      <CareerSnapshot />
      <Services />
      <Availability />
      <Projects />
      <About />
      <Skills />
      <EngineeringExperience />
      <Blog />
      <BookPromo />
      <Contact />
      <CtaSection />
      <ScrollToTop />
    </main>
  );
}
