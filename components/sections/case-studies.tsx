"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface CaseStudy {
  title: string;
  url: string;
  image: string;
  problem: string;
  impact?: string;
  solution: string;
  outcome: string;
  expertNote?: string;
  imageFit?: "cover" | "contain";
  technologies: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    title: "AttendanceIQ - Complete HRMS",
    url: "",
    image: "/images/projects/attendanceiq.png",
    imageFit: "contain",
    problem:
      "Cloudpacer ran HR across spreadsheets and separate tools: attendance exported from biometric devices, payroll rebuilt by hand each month, and leave, reviews and helpdesk requests tracked elsewhere. Nothing was connected or auditable.",
    solution:
      "Designed and built a complete HRMS as primary engineer (361 of 403 commits) on Next.js 16, Prisma and PostgreSQL: employee records, attendance and shifts, leave, payroll, performance reviews, learning, asset and helpdesk requests, announcements and audit logs. Module-level permissions for Admin, HR, Manager and Employee, Slack and web-push notifications, and Excel/PDF exports. Attendance comes in from biometric devices, pushed to an ADMS endpoint or pulled by a LAN agent.",
    outcome:
      "100 Prisma models, 207 API route handlers and 82 pages in about three months. Payroll matches the finance team's own salary sheet for tax withholding and day-rate rules, and marking a run as paid is idempotent. 202 test files, including 41 integration suites against real Postgres, gate every deploy, and releases go out blue-green to AWS via SSM.",
    expertNote:
      "Payroll is only as trustworthy as its inputs. Attendance devices go offline and re-send punches, so every raw punch is kept in an append-only log and attendance is derived from it. A rule can be fixed and a whole month of payroll recomputed without losing the source of truth.",
    technologies: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "node-cron", "Vitest", "GitHub Actions", "AWS", "ZKTeco ADMS"],
  },
  {
    title: "AI Proposal CRM - RAG over Past Projects",
    url: "",
    image: "/images/projects/ai-proposal-crm.png",
    imageFit: "contain",
    problem:
      "Cloudpacer's sales team answered every job post from scratch, even when the company had shipped something similar before. Knowledge of past work lived in people's heads and scattered documents.",
    solution:
      "I designed the system and wrote its foundation on Next.js 16 and Supabase. In the retrieval flow, Claude breaks a job post into requirements, OpenAI embeddings in pgvector (HNSW index) find the closest past projects, and the app drafts a proposal grounded in them. Assigning a lead emails the technical owner and holds a 45-minute Google Calendar slot. Access is enforced twice, by an app-level permission layer and by Postgres row-level security.",
    outcome:
      "My ~12k-line foundation (schema, 80 RLS policies over 24 tables, the permission layer, Supabase clients and UI shell), plus a developer onboarding guide and 50-ticket plan, let four engineers build features in parallel. A parity test fails CI if app rules and database policies drift apart. I later found and fixed an RLS leak on the embeddings table.",
    technologies: ["Next.js 16", "Supabase", "PostgreSQL RLS", "pgvector", "Anthropic Claude", "OpenAI Embeddings", "Google Calendar API", "Vitest", "Playwright"],
  },
  {
    title: "Fleet Safety & FMCSA Compliance Platform",
    url: "",
    image: "/images/projects/fleetsafety.png",
    problem:
      "A US compliance firm disputes FMCSA roadside-inspection violations (DataQs) on behalf of trucking carriers to lower their CSA scores. The work ran on spreadsheets and email, with filing deadlines tracked by hand.",
    solution:
      "Co-built with one other engineer; I wrote ~80 commits (~33k lines) across three repos. The NestJS 10 + TypeORM + PostgreSQL API has 16 modules, 40 entities and ~147 endpoints. Every request passes a JWT, then tenant, then role guard chain, and every entity extends a tenant-scoped soft-delete base, so one carrier can never read another's data. Two React 18 + Vite front ends serve the compliance staff and the carriers.",
    outcome:
      "I shipped user invites with 6-role RBAC and granular staff permissions, SendGrid and Twilio notifications, a training module with quizzes and attestations, a 6-step dispute-submission wizard, password reset and a data-retention cron. I also hardened the API (Helmet, CORS, rate limiting, refresh-token rotation) and replaced TypeORM auto-sync with versioned migrations ahead of the first pilot carrier.",
    expertNote:
      "FMCSA data doesn't fit a generic document tracker. CSA scores are percentiles per BASIC category and DataQs requests follow their own review process, so the schema models violations, disputes and evidence per carrier, backed by hashed evidence files and an audit trail.",
    technologies: ["NestJS", "TypeORM", "PostgreSQL", "React", "Vite", "Tailwind CSS", "SendGrid", "Twilio", "Multi-tenant"],
  },
  {
    title: "Loan Management System - 14-Branch Microfinance Lender (Freelance)",
    url: "",
    image: "/images/projects/lms.png",
    problem:
      "A Pakistani microfinance lender ran loans across 14 branches on paper forms, WhatsApp and spreadsheets. KYC was inconsistent, EMI schedules were error-prone and regulatory reporting was a quarterly scramble.",
    solution:
      "A five-phase NestJS + Next.js 16 platform on Prisma and PostgreSQL. It covers KYC with CNIC verification, configurable loan products, multi-level approvals, reducing-balance EMI schedules, disbursement tracking, collections with PAR-bucket tracking, a nightly overdue-detection cron, and regulator-style reports with an audit trail behind every change.",
    outcome:
      "One system for the whole loan lifecycle across all 14 branches, with branch-scoped access for field staff and regulatory reports exportable to Excel or PDF on demand instead of assembled by hand.",
    expertNote:
      "Microfinance lending in Pakistan follows SECP NBFC rules, not Western fintech conventions. Markup calculations differ from APR, KYC runs on CNIC data, and reporting fields differ from IFRS, so these rules have to be modelled from the start.",
    technologies: ["NestJS", "Next.js 16", "PostgreSQL", "Prisma", "TypeScript", "Tailwind CSS", "Cron Jobs", "Excel/PDF Export"],
  },
  {
    title: "RecruitIQ - AI Recruitment Platform",
    url: "",
    image: "/images/projects/reqiq.png",
    problem:
      "HR teams screened resumes by hand, tracked candidates in spreadsheets and answered the same policy questions repeatedly, across four tools that didn't talk to each other.",
    solution:
      "A multi-tenant FastAPI + Next.js 15 platform covering the hiring lifecycle. GPT-4o parses PDF/DOCX resumes into structured candidate records and scores each candidate against the job description (match percentage, strengths, gaps). A Kanban pipeline tracks stages. An HR assistant answers policy questions with source citations using pgvector embeddings and LangChain. Onboarding templates, time-to-hire analytics and four-role RBAC round it out.",
    outcome:
      "Resume parsing, candidate ranking, interview scheduling, pipeline, retrieval-augmented HR chat, onboarding and reporting in one platform, each with its own data model and API, shipped with Docker Compose and auto-generated OpenAPI docs.",
    expertNote:
      "Semantic candidate search isn't a keyword problem: 'built distributed systems at scale' should match 'microservices architecture'. Embeddings only work well if resume text is normalized after parsing; raw formatting and filler otherwise dominate the vectors.",
    technologies: ["Next.js 15", "FastAPI", "PostgreSQL", "pgvector", "OpenAI GPT-4o", "LangChain", "Celery", "Docker"],
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
            Systems I designed, built or co-built, with numbers taken from the code, not a pitch deck.
          </p>
        </motion.div>

        <div className="space-y-6">
          {CASE_STUDIES.map((study, index) => (
            <motion.div key={study.title} variants={itemVariants}>
              <Card className="border-0 shadow-xl overflow-hidden glass-effect hover:shadow-2xl transition-shadow duration-300">
                <div className="grid md:grid-cols-5 gap-0">
                  <div className={`relative h-56 md:min-h-[280px] md:col-span-2 overflow-hidden ${study.imageFit === "contain" ? "bg-[#0b1220]" : ""}`}>
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className={study.imageFit === "contain" ? "object-contain object-top md:object-center" : "object-cover object-center"}
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:from-transparent md:via-transparent md:to-transparent" />
                    <div className={`absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 ${study.imageFit === "contain" ? "hidden" : ""}`}>
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
                      {study.imageFit === "contain" && (
                        <h3 className="text-xl md:text-2xl font-bold gradient-text">{study.title}</h3>
                      )}
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">
                          Problem
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {study.problem}
                        </p>
                      </div>
                      {study.impact && (
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">
                            Business Impact Without a Solution
                          </h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {study.impact}
                          </p>
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">
                          What I Built
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {study.solution}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">
                          Outcome
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {study.outcome}
                        </p>
                      </div>
                      {study.expertNote && (
                        <div className="bg-primary/5 border border-primary/10 rounded-lg p-3">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                            Engineering Note
                          </h4>
                          <p className="text-muted-foreground text-xs leading-relaxed italic">
                            {study.expertNote}
                          </p>
                        </div>
                      )}
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
