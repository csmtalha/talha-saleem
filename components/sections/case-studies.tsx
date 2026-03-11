"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const CASE_STUDIES = [
  {
    title: "Al Ibrahim Travel",
    url: "https://www.alibrahimtravel.com/",
    image: "/images/projects/alibrahimtravels.png",
    problem:
      "Client needed a dynamic travel CMS to manage destinations, packages, and content with fast updates and strong SEO.",
    solution:
      "Built a Next.js travel platform with Firebase (Firestore, Cloud Functions, Hosting) for real-time content, Google APIs integration, and responsive UX.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Firebase", "Firestore"],
    outcome:
      "A fast, SEO-optimized travel platform with scalable CMS architecture and improved content publishing workflow. Lighthouse 90+, faster page loads, and easier content updates for the team.",
  },
  {
    title: "Creexio",
    url: "https://www.creexio.com/",
    image: "/images/projects/creexio.png",
    problem:
      "Business required a modern, scalable web application with a professional presence and reliable performance.",
    solution:
      "Developed a React/Next.js application with clean architecture, responsive design, and maintainable codebase.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    outcome:
      "A fast, scalable web application with improved performance and maintainable codebase. Supports business growth with a strong user experience.",
  },
  {
    title: "Butler Engineering",
    url: "https://butlerme.com/",
    image: "/images/projects/butlerengineer.png",
    problem:
      "Engineering firm needed a professional website to showcase services and expertise with easy content updates.",
    solution:
      "Delivered a custom WordPress site with tailored theme, clear information architecture, and mobile-first design.",
    technologies: ["WordPress", "PHP", "Custom Theme", "Responsive Design"],
    outcome:
      "A professional, accessible website that reflects the brand. Easier content updates for the team and stronger mobile presence.",
  },
  {
    title: "Mortgage Industry Chatbot",
    url: "",
    image: "/images/projects/mortgagemvp.png",
    problem:
      "Mortgage businesses needed a way to qualify leads and answer customer questions at scale, with multi-tenant support for multiple investors.",
    solution:
      "Built a full-featured mortgage chatbot web application with multi-tenant architecture, admin dashboard for users and investors, role-based access, and integration with third-party chatbot APIs and custom REST APIs. Deployed on Vercel as an enterprise SaaS solution.",
    technologies: ["Next.js", "Tailwind CSS", "ShadCN UI", "PostgreSQL", "Prisma", "REST APIs", "Vercel"],
    outcome:
      "An enterprise SaaS chatbot platform that helps mortgage teams qualify leads and support customers, with scalable architecture and clear separation per tenant.",
  },
];

export default function CaseStudies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();
  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="case-studies"
      className="w-full bg-gradient-to-b from-muted/20 to-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-dots-pattern opacity-[0.02]" />
      <motion.div
        ref={ref}
        className="section-container relative z-10"
        variants={containerVariants}
        animate={controls}
      >
        <motion.div
          variants={itemVariants}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Featured Case Studies
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            See how problems were solved, problem, solution, tech stack, and outcome for each project.
          </p>
        </motion.div>

        <div className="space-y-6">
          {CASE_STUDIES.map((study, index) => (
            <motion.div key={study.title} variants={itemVariants}>
              <Card className="border-0 shadow-xl overflow-hidden glass-effect hover:shadow-2xl transition-shadow duration-300">
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="relative h-56 md:min-h-[280px] md:col-span-2 overflow-hidden">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:from-transparent md:via-transparent md:to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                        {study.title}
                      </h3>
                      {study.url && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="mt-2 gap-1"
                          asChild
                        >
                          <a
                            href={study.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Live
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-6 md:p-8 md:col-span-3">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">
                          Problem
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {study.problem}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">
                          Solution
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {study.solution}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {study.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="text-xs bg-primary/10 text-primary border-primary/20"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">
                          Outcome
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {study.outcome}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
