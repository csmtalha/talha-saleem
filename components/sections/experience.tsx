"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Award, FileText, GraduationCap } from "lucide-react";
import { Reveal, SpotlightCard } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SITE } from "@/lib/site";

interface Role {
  company: string;
  type: string;
  position: string;
  period: string;
  summary: string;
  highlights: string[];
  skills: string[];
  current?: boolean;
}

const ROLES: Role[] = [
  {
    company: "Cloudpacer",
    type: "Full-time",
    position: "Lead Full-Stack Engineer",
    period: "Aug 2022 — Present",
    current: true,
    summary:
      "Software services company building SaaS for US and local clients. Promoted from Software Engineer to Lead; I own architecture and delivery on internal platforms and client builds.",
    highlights: [
      "HRMS: designed and built the company's complete HRMS as primary engineer (430+ of 475 commits). 100+ data models, 220+ API routes, 240+ test files and CI-gated blue-green deploys to AWS.",
      "GEIA CSA/DOT Score Improvement Platform for an insurer's trucking clients: co-built the multi-tenant NestJS API (16 modules, ~147 endpoints, JWT → tenant → role guards) and wired both React portals (73 of 200 commits).",
      "AI Proposal CRM: architected the Next.js + Supabase foundation (RLS-secured schema, can() permission engine, onboarding guide and 50-ticket plan) for a Claude + pgvector proposal CRM that four engineers built on.",
      "Client platforms under NDA: a multi-tenant AI assistant for mortgage lending guidelines, a charter-coach booking marketplace and a student wellbeing analytics app.",
      "Neblo AI: sole developer moving the marketing site from Framer to Next.js 16 with embedded Sanity Studio and webhook-driven ISR (live at neblo.ai).",
      "Earlier: a multi-tenant mortgage AI SaaS, AWS Textract finance-report automation, a Next.js + Firebase travel CMS, a PHP-to-Next.js migration and a Google Chat HR assistant.",
    ],
    skills: ["TypeScript", "Next.js", "NestJS", "PostgreSQL", "Prisma", "Supabase", "pgvector", "Claude / OpenAI", "Vitest", "Playwright", "GitHub Actions", "AWS"],
  },
  {
    company: "Napollo Software Design",
    type: "Full-time",
    position: "Frontend Developer",
    period: "Jul 2021 — Aug 2022",
    summary: "Delivered client projects end to end, from requirements through deployment.",
    highlights: [
      "Built React interfaces from Figma designs and contributed shared components reused across client projects.",
      "Built custom WordPress themes and plugins, WooCommerce and Shopify Liquid storefronts, payment integrations and hosting setups for small-business clients, with a focus on page speed and SEO.",
    ],
    skills: ["React", "JavaScript", "WordPress", "WooCommerce", "Shopify Liquid", "PHP", "Figma"],
  },
  {
    company: "Spadasoft",
    type: "Full-time",
    position: "Web Developer",
    period: "Feb 2020 — Jun 2021",
    summary: "Built and maintained client-facing web applications.",
    highlights: [
      "Integrated REST APIs, built responsive layouts, and improved load times with code splitting, image optimization and lazy loading.",
    ],
    skills: ["JavaScript", "React", "HTML/CSS", "SCSS", "REST APIs", "Git"],
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="experience" className="section-y relative">
      <div className="container-x">
        <SectionHeading
          index="03"
          eyebrow="Experience"
          title={
            <>
              6+ years, from client sites to <span className="text-gradient">leading platforms.</span>
            </>
          }
        >
          <a href={SITE.cv} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <FileText className="h-4 w-4" />
            Full CV (PDF)
          </a>
        </SectionHeading>

        <div ref={ref} className="relative">
          {/* timeline rail */}
          <div aria-hidden className="absolute bottom-2 left-[11px] top-2 w-px bg-border md:left-[211px]" />
          <motion.div
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-gradient-to-b from-primary via-primary to-signal shadow-[0_0_12px_hsl(var(--primary))] md:left-[211px]"
          />

          <ol className="space-y-10">
            {ROLES.map((role) => (
              <li key={role.company} className="relative grid gap-4 pl-10 md:grid-cols-[180px_1fr] md:gap-16 md:pl-0">
                <span
                  aria-hidden
                  className="absolute left-[5px] top-2 h-[13px] w-[13px] rounded-full border-2 border-background bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.2),0_0_18px_hsl(var(--primary)/0.8)] md:left-[205px]"
                />
                <Reveal className="md:sticky md:top-28 md:self-start md:text-right">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{role.period}</p>
                  <p className="mt-1.5 text-base font-semibold">{role.company}</p>
                  <p className="text-xs text-muted-foreground">{role.type}</p>
                  {role.current && (
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] font-medium text-emerald-500 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      Current
                    </span>
                  )}
                </Reveal>

                <Reveal delay={0.08}>
                  <SpotlightCard lift={false} className="p-6 sm:p-7">
                    <h3 className="text-xl font-semibold tracking-tight">{role.position}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{role.summary}</p>
                    <ul className="mt-5 space-y-3">
                      {role.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-foreground/85">
                          <span aria-hidden className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-primary" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Skills used">
                      {role.skills.map((s) => (
                        <li key={s} className="chip px-2 py-0.5 text-[11px]">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-12 grid gap-4 md:ml-[244px] md:grid-cols-2">
          <div className="glass flex items-center gap-4 rounded-2xl p-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold">BS Computer Science</p>
              <p className="text-sm text-muted-foreground">University of Lahore · 2018 — 2022</p>
            </div>
          </div>
          <div className="glass flex items-center gap-4 rounded-2xl p-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-400/10 text-amber-500 dark:text-amber-400">
              <Award className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold">Employee of the Year 2024</p>
              <p className="text-sm text-muted-foreground">Cloudpacer</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
