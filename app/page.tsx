import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import Proof from "@/components/sections/proof";
import FeaturedWork from "@/components/sections/featured-work";
import WhatIBuild from "@/components/sections/what-i-build";
import ManualProcess from "@/components/sections/manual-process";
import CtaBand from "@/components/sections/cta-band";
import Projects from "@/components/sections/projects";
import Experience from "@/components/sections/experience";
import Skills from "@/components/sections/skills";
import About from "@/components/sections/about";
import Writing from "@/components/sections/writing";
import Contact from "@/components/sections/contact";
import { FloatingActions } from "@/components/effects/floating-actions";
import { FEATURED } from "@/lib/projects";
import { SITE } from "@/lib/site";

const SITE_URL = SITE.url;
const TITLE = "Talha Saleem | Lead Full-Stack Engineer (React, Next.js, Node.js, NestJS)";
const DESCRIPTION =
  "Lead Full-Stack Engineer with 6+ years shipping SaaS and AI products end to end: React/Next.js, Node.js/NestJS, PostgreSQL, RAG with pgvector, tests and AWS deploys. Hire me for remote senior roles or contract builds.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "Talha Saleem",
    "Lead Full-Stack Engineer",
    "hire full-stack developer",
    "Senior Full-Stack Engineer remote",
    "Next.js developer for hire",
    "React Next.js consultant",
    "NestJS Node.js engineer",
    "TypeScript full-stack engineer Pakistan",
    "SaaS developer Lahore",
    "AI integration engineer RAG pgvector",
    "multi-tenant SaaS engineer",
    "HRMS payroll software developer",
    "remote software engineer PST overlap",
  ],
  authors: [{ name: "Talha Saleem", url: SITE_URL }],
  creator: "Talha Saleem",
  category: "technology",
  verification: {
    google: "DLA0_IP3Hsut84nJRmawwY7w18Tp7lAZeqGafn8IBH4",
  },
  alternates: {
    canonical: SITE_URL,
  },
  // Preview images come from app/opengraph-image.tsx and app/twitter-image.tsx
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Talha Saleem",
    type: "profile",
    locale: "en_US",
    firstName: "Talha",
    lastName: "Saleem",
    username: "csmtalha",
  },
  twitter: {
    card: "summary_large_image",
    title: "Talha Saleem | Lead Full-Stack Engineer",
    description: DESCRIPTION,
  },
};

const person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Talha Saleem",
  url: SITE_URL,
  image: `${SITE_URL}/images/talha-saleem.jpg`,
  jobTitle: "Lead Full-Stack Engineer",
  worksFor: { "@type": "Organization", name: "Cloudpacer" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Lahore" },
  award: "Employee of the Year 2024, Cloudpacer",
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  email: `mailto:${SITE.email}`,
  sameAs: [
    SITE.linkedin,
    "https://github.com/csmtalha",
    "https://www.instagram.com/talhasaleem.dev/",
    "https://www.creexio.com",
    "https://www.amazon.com/dp/B0GX34T63R",
  ],
  description: DESCRIPTION,
  hasOccupation: {
    "@type": "Occupation",
    name: "Lead Full-Stack Engineer",
    occupationLocation: { "@type": "Country", name: "Pakistan" },
    skills: "TypeScript, React, Next.js, Node.js, NestJS, PostgreSQL, Prisma, Supabase, RAG, AWS",
  },
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
    "Row-level security",
    "AWS",
    "Stripe",
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    person,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Talha Saleem",
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile`,
      url: SITE_URL,
      name: TITLE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
      dateModified: new Date().toISOString().slice(0, 10),
    },
    {
      "@type": "ItemList",
      name: "Selected work by Talha Saleem",
      itemListElement: FEATURED.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/work/${p.slug}`,
        name: p.name,
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <Proof />
      <WhatIBuild />
      <FeaturedWork />
      <CtaBand />
      <Projects />
      <Experience />
      <Skills />
      <About />
      <Writing />
      <ManualProcess />
      <Contact />
      <FloatingActions />
    </>
  );
}
