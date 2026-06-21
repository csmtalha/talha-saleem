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
    title: "Neblo AI - Marketing Site",
    url: "https://neblo.ai",
    image: "/images/projects/neblo-ai.png",
    problem:
      "An early-stage AI freight broker startup needed a complete marketing site balancing brand storytelling, SEO performance, and a live content-managed blog - fast.",
    solution:
      "Built with Next.js 16 App Router and Turbopack. Framer Motion v12 animations are isolated in client components so page.tsx files stay pure server components - zero hydration tax on initial load. Blog runs on Sanity CMS with ISR and live webhooks so posts go live within seconds of publishing. Auto-generated sitemap includes all blog posts dynamically. Transactional email via Resend, deployed on Vercel.",
    technologies: ["Next.js 16", "Tailwind CSS v4", "Framer Motion", "Sanity CMS", "ISR", "Resend", "Vercel", "SSG"],
    outcome:
      "A fully static, SEO-optimized marketing site across 8 pages (Home, Features, Copilot, Blog, FAQ, Contact, Privacy, Terms) with a live CMS-driven blog and clean server/client component separation.",
  },
  {
    title: "Fleet Safety & FMCSA Compliance Platform",
    url: "",
    image: "/images/projects/fleetsafety.png",
    problem:
      "Trucking carriers managed FMCSA compliance, CSA score monitoring, and DataQs disputes through fragmented manual processes - creating compliance risk and wasted hours for operations teams.",
    solution:
      "Built a full-stack multi-tenant SaaS platform with NestJS, TypeORM, and PostgreSQL on the backend and React + TypeScript + Tailwind CSS on the frontend. Implemented JWT auth with rotating refresh tokens, separate portals for GEIA staff and carrier clients, DataQs and CPDP case management with evidence uploads, corrective action plan tracking with audit history, and automated email/SMS notifications.",
    technologies: ["NestJS", "TypeORM", "PostgreSQL", "React", "TypeScript", "Tailwind CSS", "JWT", "Multi-tenant"],
    outcome:
      "A production SaaS platform enabling trucking companies to monitor CSA/BASIC scores, manage compliance cases end-to-end, and maintain full audit history - reducing compliance risk through domain-driven automation.",
  },
  {
    title: "Google Chat HR Assistant",
    url: "",
    image: "/images/projects/google-chat-hr-bot.png",
    problem:
      "Employees had to manually look up HR policies, leave balances, and payroll info across disconnected tools - creating delays and high volumes of repetitive HR queries.",
    solution:
      "Built a fully serverless AI HR assistant using 6 modular Google Apps Script files. A 2-call OpenAI GPT-4o-mini pipeline first extracts smart search queries from the user's question, then answers using live policy content from Notion API. Employee and leave data is pulled live from Google Sheets. Responses render as interactive Google Chat Cards v2 with buttons and quick replies - no frontend, no deployment.",
    technologies: ["Google Apps Script", "OpenAI GPT-4o", "Notion API", "Google Sheets", "Google Chat Cards v2", "JWT"],
    outcome:
      "Employees get instant answers to HR questions inside a tool they already use every day. Zero new apps, zero dashboards - semantic search across Notion policies with real employee data from Sheets.",
  },
  {
    title: "Mortgage Buddy - SaaS Chatbot",
    url: "",
    image: "/images/projects/mortgagemvp.png",
    problem:
      "Mortgage companies needed to qualify leads and answer customer questions at scale, with isolated multi-tenant support for multiple investors.",
    solution:
      "Built a multi-tenant chatbot SaaS with Next.js, PostgreSQL, and Prisma. Implemented role-based access control, admin dashboards, third-party chatbot API integrations, and custom REST APIs. Each tenant gets isolated data and configuration. Deployed on Vercel.",
    technologies: ["Next.js", "Tailwind CSS", "ShadCN UI", "PostgreSQL", "Prisma", "REST APIs", "Vercel"],
    outcome:
      "An enterprise SaaS platform enabling automated lead qualification and customer support at scale, with clean per-tenant data separation and a configurable admin layer.",
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
                      <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg inline-block bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg">
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
