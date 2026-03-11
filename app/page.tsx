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
import Availability from "@/components/sections/availability";
import Contact from "@/components/sections/contact";
import CtaSection from "@/components/sections/cta-section";
import Header from "@/components/sections/header";
import ScrollToTop from "@/components/scroll-to-top";

export const metadata: Metadata = {
  title: "Talha Saleem | Senior Software Engineer | React & Next.js",
  description:
    "Senior Software Engineer specializing in React and Next.js. Talha helps startups and businesses build high-performance web apps, SaaS dashboards, and modern websites. 6+ years experience. Available for remote roles, freelance, and startup MVPs.",
  keywords: [
    "Senior Software Engineer",
    "React Developer",
    "Next.js Developer",
    "SaaS Frontend Engineer",
    "WordPress developer",
    "Shopify developer",
    "remote developer",
    "freelance frontend",
  ],
  verification: {
    google: "DLA0_IP3Hsut84nJRmawwY7w18Tp7lAZeqGafn8IBH4",
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
      <Contact />
      <CtaSection />
      <ScrollToTop />
    </main>
  );
}
