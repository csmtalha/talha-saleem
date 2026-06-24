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
  technologies: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Fleet Safety & FMCSA Compliance Platform",
    url: "",
    image: "/images/projects/fleetsafety.png",
    problem:
      "Mid-size trucking carriers were managing FMCSA compliance, CSA scores, and DataQs disputes across spreadsheets and email threads - discovering violations only after the contest window had closed.",
    impact:
      "A single uncontested DataQs violation can raise a CSA score by 8–12 points. Carriers above FMCSA intervention thresholds face targeted roadside inspections and conditional safety ratings that can freeze fleet operations. The cost of inaction wasn't a fine - it was operational paralysis.",
    solution:
      "Built a multi-tenant NestJS + React SaaS platform that aggregates CSA scores across all BASIC categories, tracks DataQs dispute timelines with automated deadline reminders, and maintains a full audit history per carrier. JWT auth with multi-tenant data isolation keeps each carrier's compliance record private. Architected to serve multiple carriers from a single deployment.",
    outcome:
      "Dispute resolution workflows reduced from multi-day manual processes to under one hour. Carriers replaced 17+ disconnected spreadsheets with a single auditable source of truth. DataQs deadlines that were previously missed are now tracked automatically - giving safety officers time to respond rather than react.",
    expertNote:
      "FMCSA's data model is not intuitive. CSA scores are weighted differently across BASIC categories and DataQs has specific procedural windows tied to federal register citations. A developer without logistics compliance exposure would build the wrong schema. An AI code generator would produce a generic document tracker - not a multi-tenant platform built around federal safety management systems.",
    technologies: ["NestJS", "TypeORM", "PostgreSQL", "React", "TypeScript", "Tailwind CSS", "JWT", "Multi-tenant"],
  },
  {
    title: "Loan Management System - 14-Branch Microfinance NBFC",
    url: "",
    image: "/images/projects/lms.png",
    problem:
      "A Pakistani microfinance NBFC was running a growing loan portfolio across 14 branches with 100+ field officers on paper forms, WhatsApp, and disconnected spreadsheets. KYC was inconsistent, EMI schedules were miscalculated, and SECP reporting was a quarterly scramble.",
    impact:
      "Field officers were spending 40–60% of their day on manual data entry and chasing approval signatures - causing loan disbursements to take days instead of hours. At the regulatory level, SECP-compliant reporting required machine-readable accuracy that spreadsheets couldn't deliver reliably. Every new branch added compliance risk.",
    solution:
      "A five-phase NestJS + Next.js 16 platform deployed across all 14 branches and accessible to 100+ field agents via mobile-optimized web. Covers KYC with CNIC verification, loan origination with configurable product types, automated EMI schedule generation (reducing-balance), disbursement tracking, delinquency flagging, and SECP-style regulatory reporting via nightly cron jobs with examiner-ready audit trails.",
    outcome:
      "Loan disbursement time for returning borrowers dropped from days to under 3 minutes. 100+ field agents onboarded across all 14 branches within two weeks of launch. EMI disputes dropped to near zero. SECP reporting moved from a weeks-long manual scramble to automated nightly pipelines - a one-click export on demand.",
    expertNote:
      "Microfinance lending in Pakistan follows SECP NBFC regulations, not generic fintech conventions. Markup rate calculations differ from Western APR standards. KYC requires CNIC data formats. SECP reporting fields diverge from IFRS. A developer without this domain exposure would produce a system that passes a demo and fails an audit.",
    technologies: ["NestJS", "Next.js 16", "PostgreSQL", "Prisma", "TypeScript", "Tailwind CSS", "SECP Reporting", "Multi-tenant"],
  },
  {
    title: "Google Chat HR Assistant",
    url: "",
    image: "/images/projects/google-chat-hr-bot.png",
    problem:
      "Employees had to manually look up HR policies, leave balances, and payroll info across disconnected tools - creating delays and high volumes of repetitive HR queries.",
    solution:
      "A fully serverless AI assistant using 6 modular Google Apps Script files. A 2-call GPT-4o-mini pipeline first extracts smart search queries from the user's question, then answers using live policy content from Notion API. Employee and leave data is pulled live from Google Sheets. Responses render as interactive Google Chat Cards v2 - no new app, no training, no deployment.",
    outcome:
      "Employees get instant answers to HR questions inside a tool they already use every day. Zero new apps, zero dashboards - semantic search across Notion policies with real employee data from Sheets.",
    technologies: ["Google Apps Script", "OpenAI GPT-4o", "Notion API", "Google Sheets", "Google Chat Cards v2"],
  },
  {
    title: "Neblo AI - Marketing Site",
    url: "https://neblo.ai",
    image: "/images/projects/neblo-ai.png",
    problem:
      "An early-stage AI freight broker startup needed a complete marketing site balancing brand storytelling, SEO performance, and a live content-managed blog - fast.",
    solution:
      "Built with Next.js 16 App Router. Framer Motion v12 animations isolated in client components keep page.tsx files as pure server components - zero hydration tax on initial load. Blog runs on Sanity CMS with ISR and live webhooks so posts go live within seconds of publishing.",
    outcome:
      "A fully static, SEO-optimized site across 8 pages with a live CMS-driven blog and clean server/client separation. Auto-generated sitemap includes all blog posts dynamically.",
    technologies: ["Next.js 16", "Tailwind CSS v4", "Framer Motion", "Sanity CMS", "ISR", "Resend", "Vercel"],
  },
  {
    title: "Datalyze - Self-Serve Analytics SaaS",
    url: "",
    image: "/images/projects/datalyzer.png",
    problem:
      "Business teams needed to extract insights from CSV, Excel, and PDF files without writing code - but enterprise BI tools were too expensive and no-code tools broke above 10K rows.",
    impact:
      "Manual data analysis in spreadsheets meant hours of work per report, no audit trail, and zero collaboration. Teams were building one-off Excel macros that only the original author understood. Every analyst re-solving the same ETL problems from scratch.",
    solution:
      "Built a production SaaS on Next.js + Supabase. Users upload CSV, XLSX, PDF, DOCX, JSON files and receive auto-generated charts (bar, line, pie, scatter, histogram), correlation analysis, outlier detection, and GPT-4-powered trend summaries. Analytics run server-side to prevent data exposure. Three-tier Stripe billing gates features: file size limits (5MB / 50MB / 100MB), row caps (1K / 100K / 500K), PDF/Excel export, and team collaboration for up to 10 members. Google OAuth + email auth via Supabase with server-side JWT refresh.",
    outcome:
      "A live monetized SaaS - Stripe webhooks managing subscription state, per-user usage enforcement, saved project management, and PDF export - shipped end-to-end as a solo engineer.",
    expertNote:
      "Multi-file parsing is deceptively hard. CSV column type inference, Excel merged cells, PDF table extraction, and DOCX structure all require different parsing strategies. Plugging GPT-4 into raw file bytes produces garbage. The insight pipeline only works because column types are detected and normalized first - numeric columns get statistical summaries, categorical columns get frequency distributions, date columns get trend lines.",
    technologies: ["Next.js", "Supabase", "PostgreSQL", "OpenAI GPT-4", "Stripe", "Recharts", "Plotly.js", "TypeScript"],
  },
  {
    title: "RecruitIQ - AI-Powered Recruitment Platform",
    url: "",
    image: "/images/projects/reqiq.png",
    problem:
      "HR teams were manually screening hundreds of resumes, copy-pasting candidate data into spreadsheets, and answering the same policy questions repeatedly - while using four separate tools that didn't talk to each other.",
    impact:
      "A recruiter processing 200 applications per week was spending 60% of their time on data entry and keyword matching rather than actual assessment. Interview scheduling lived in email. Onboarding checklists in Google Docs. Policy answers in a shared drive no one had time to search.",
    solution:
      "A multi-tenant FastAPI + Next.js 15 platform covering the full hiring lifecycle. Resume parser (PDF/DOCX → GPT-4o) extracts 12+ structured fields and creates or updates a candidate record automatically. Candidate ranking scores match percentage, strengths, weaknesses, and missing skills against the job description. Kanban drag-and-drop pipeline with react-beautiful-dnd. RAG-based HR chatbot: upload policy PDFs, store as pgvector embeddings, answer questions with source citations via LangChain. Employee onboarding templates with task categories (HR, IT, Training, Equipment) and due-date calculation from start date. Automated analytics: time-to-hire, pipeline conversion rates, recruiter performance, CSV/JSON export. Full RBAC: admin, recruiter, hiring manager, viewer. Dockerized with Docker Compose.",
    outcome:
      "Seven production-grade feature systems in a single platform: resume parsing, candidate ranking, interview scheduling, Kanban pipeline, RAG chatbot, onboarding workflows, and reporting - each with its own data model, API surface, and UI.",
    expertNote:
      "Semantic candidate search is not a keyword problem. A resume that says 'built distributed systems at scale' and a job that says 'microservices architecture' won't match on keywords but do on meaning. pgvector with OpenAI embeddings solves this - but only if the embedding input is normalized post-parse. Raw resume text fed to an embeddings model produces noisy vectors because formatting, whitespace, and filler text dominate the signal.",
    technologies: ["Next.js 15", "FastAPI", "PostgreSQL", "pgvector", "OpenAI GPT-4o", "LangChain", "Docker", "Zustand", "TanStack Query"],
  },
  {
    title: "MedNotes - AI Clinical Documentation",
    url: "",
    image: "/images/projects/mednotemvp.png",
    problem:
      "Physicians were spending 30–40% of their working day documenting patient visits - manually writing SOAP notes, looking up ICD-10 codes, and tracking follow-ups after each appointment.",
    impact:
      "Documentation burden was forcing clinics to limit daily patient slots. Rushed manual notes introduced errors and gaps that downstream billing and compliance teams had to fix. Physicians leaving at 8PM to finish charts was normalized.",
    solution:
      "Browser-based audio recording captures the patient visit. A FastAPI backend (Python 3.9+, SQLAlchemy 2.0, Docker) receives the audio and runs it through OpenAI Whisper for multi-language transcription. GPT-4 then generates a structured SOAP note (Subjective, Objective, Assessment, Plan), extracts ICD-10/CPT codes, flags medication interaction warnings, and identifies clinical risk alerts - all from a single API call chain. Patients are linked to a full visit history with status tracking. JWT auth with bcrypt, HTTP-only cookies. Frontend on Vercel, backend on Cloud Run.",
    outcome:
      "A physician captures a complete structured medical record - transcript, SOAP note, diagnosis codes, medication warnings, follow-up plan - from one voice recording. Zero manual typing. The full note is available before the patient leaves the room.",
    technologies: ["Next.js", "FastAPI", "OpenAI Whisper", "GPT-4", "PostgreSQL", "SQLAlchemy", "Docker", "Vercel", "Cloud Run"],
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
            Real problems, real constraints, measurable outcomes - from FMCSA compliance systems to AI-powered healthcare documentation.
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
                          Client Problem
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
                          Measurable Outcome
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {study.outcome}
                        </p>
                      </div>
                      {study.expertNote && (
                        <div className="bg-primary/5 border border-primary/10 rounded-lg p-3">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                            Why Deep Domain Expertise Mattered
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
