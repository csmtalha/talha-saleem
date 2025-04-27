import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";

export const metadata: Metadata = {
  title: "Talha Saleem | Full-Stack Developer",
  description:
    "Experienced Full-Stack Developer specializing in React, Next.js, and WordPress. Building scalable, high-performance web applications with modern technologies.",
  keywords: [
    "React developer",
    "Next.js developer",
    "Full-stack developer",
    "WordPress developer",
    "Frontend engineer",
  ],
  verification: {
    google: "DLA0_IP3Hsut84nJRmawwY7w18Tp7lAZeqGafn8IBH4",
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {" "}
      <Header />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}
