"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, FileText, GraduationCap } from "lucide-react";

interface Role {
  company: string;
  position: string;
  period: string;
  summary: string;
  highlights: string[];
  skills: string[];
}

const ROLES: Role[] = [
  {
    company: "Cloudpacer · Full-time",
    position: "Lead Full-Stack Engineer",
    period: "Aug 2022 - Present",
    summary:
      "Software services company building SaaS for US and local clients. Promoted from Software Engineer to Lead; I own architecture and delivery on internal platforms and client builds.",
    highlights: [
      "AttendanceIQ: designed and built the company's complete HRMS as primary engineer (361 of 403 commits): employee records, attendance and shifts, leave, payroll, performance, learning, helpdesk and audit. 100 Prisma models, 207 API routes, 202 test files, CI-gated blue-green deploys to AWS.",
      "Fleet safety & FMCSA compliance platform for US trucking carriers: co-built the multi-tenant NestJS API (16 modules, ~147 endpoints, JWT → tenant → role guards) and both React front ends; shipped RBAC, notifications, training and a 6-step dispute wizard.",
      "AI proposal CRM: architected the Next.js + Supabase foundation (80 RLS policies over 24 tables, permission layer, onboarding guide and 50-ticket plan) for a Claude + pgvector retrieval flow that four engineers built on.",
      "Neblo AI: sole developer migrating the marketing site from Framer to Next.js 16 with embedded Sanity Studio, webhook-driven ISR and programmatic-SEO pages (live at neblo.ai).",
      "Earlier: a multi-tenant mortgage AI SaaS (dashboards, chat, tenant design), AWS Textract finance-report automation, a Next.js + Firebase travel CMS, a PHP-to-Next.js migration, and a Google Chat HR assistant.",
    ],
    skills: ["TypeScript", "Next.js", "React", "NestJS", "Node.js", "PostgreSQL", "Prisma", "Supabase", "pgvector", "Claude / OpenAI", "Vitest", "Playwright", "GitHub Actions", "AWS", "Docker", "Vercel"],
  },
  {
    company: "Napollo Software Design · Full-time",
    position: "Frontend Developer",
    period: "Jul 2021 - Aug 2022",
    summary:
      "Delivered client projects end to end, from requirements through deployment.",
    highlights: [
      "Built React interfaces from Figma designs and contributed shared components reused across client projects.",
      "Built custom WordPress themes and plugins, WooCommerce and Shopify Liquid storefronts, payment integrations and hosting setups for small-business clients, with a focus on page speed and SEO.",
    ],
    skills: ["React", "JavaScript", "WordPress", "WooCommerce", "Shopify Liquid", "PHP", "Figma"],
  },
  {
    company: "Spadasoft · Full-time",
    position: "Web Developer",
    period: "Feb 2020 - Jun 2021",
    summary: "Built and maintained client-facing web applications.",
    highlights: [
      "Integrated REST APIs, built responsive layouts, and improved load times with code splitting, image optimization and lazy loading.",
    ],
    skills: ["JavaScript", "React", "HTML/CSS", "SCSS", "REST APIs", "Git"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <section
      id="experience"
      className="w-full bg-gradient-to-b from-background to-muted/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <motion.div
        ref={ref}
        className="section-container relative z-10"
        variants={containerVariants}
        animate={controls}
      >
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            6+ years across three companies, from client websites to leading full-stack platforms.
          </p>
        </motion.div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {ROLES.map((role) => (
            <motion.div key={role.company} variants={itemVariants}>
              <Card className="overflow-hidden border border-border/50 border-l-4 border-l-primary bg-card/50">
                <CardHeader className="p-6 pb-3">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full shrink-0">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{role.position}</h3>
                        <p className="text-muted-foreground">{role.company}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="self-start px-3 py-1 whitespace-nowrap">
                      {role.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-sm text-muted-foreground italic mb-3">{role.summary}</p>
                  <ul className="space-y-2 mb-4">
                    {role.highlights.map((item) => (
                      <li key={item} className="flex items-start text-sm leading-relaxed">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {role.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-border/50 bg-card/50 p-5"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">BS Computer Science, University of Lahore</p>
                <p className="text-sm text-muted-foreground">2018 - 2022 · Employee of the Year 2024, Cloudpacer</p>
              </div>
            </div>
            <Button variant="outline" className="glass-effect gap-2" asChild>
              <a href="/files/Talha-Saleem-CV.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4" />
                Full CV (PDF)
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
