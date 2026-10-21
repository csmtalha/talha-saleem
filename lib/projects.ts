/**
 * Every project on the site, in one place. The homepage cards and the
 * /work/[slug] case-study pages both read from here.
 *
 * Copy format (in this order): the problem it solved, my specific
 * contribution, the outcome or scale, then the tech stack.
 * Numbers come from the code and git history, not estimates.
 *
 * Naming rule: products where my commits are in the repo use their real
 * name. Client products I developed without commits in the repo I can see
 * are marked `confidential` and described generically. Never put the real
 * product, client or vendor name of a confidential project anywhere in
 * this file, including image paths.
 */

export type ProjectCategory = "saas" | "web" | "migrations" | "wordpress" | "shopify" | "django";

/** Icons available for generated covers (projects without a shareable screenshot). */
export type CoverIcon =
  | "building"
  | "bus"
  | "calculator"
  | "chart"
  | "graduation"
  | "home"
  | "landmark"
  | "leaf"
  | "paw"
  | "pill"
  | "plane"
  | "scan"
  | "shield"
  | "sparkles"
  | "users";

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  featured?: boolean;
  /** Most recent work on it, "YYYY-MM" (or "YYYY" when only the year is known). Drives sort order. */
  date: string;
  /** Where and in what capacity, e.g. "Primary engineer" */
  role: string;
  /** Prefix for the "… by Talha Saleem" line; matches how much I actually built */
  credit: "Built" | "Co-built" | "Architected" | "Developed" | "Migrated" | "UI/UX";
  /** Screenshot. Omit for confidential products: a generated cover is shown instead. */
  image?: string;
  imageFit?: "cover" | "contain";
  /** Extra product screenshots, shown on the case-study page */
  gallery?: { src: string; caption: string }[];
  /** Generated-cover icon and module labels (used when there is no image) */
  icon?: CoverIcon;
  modules?: string[];
  /** Real name is withheld; the product is described generically */
  confidential?: boolean;
  /** Outcome-first, one sentence. Used on cards. */
  summary: string;
  problem: string;
  contribution: string;
  outcome: string;
  /** What I built (or, for confidential team products, what the platform does) */
  highlights?: string[];
  note?: string;
  metrics?: { value: string; label: string }[];
  stack: string[];
  live?: string;
  github?: string;
}

export const CATEGORIES: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "saas", label: "SaaS & AI" },
  { id: "web", label: "Websites" },
  { id: "migrations", label: "Migrations" },
  { id: "wordpress", label: "WordPress" },
  { id: "shopify", label: "Shopify" },
  { id: "django", label: "Django" },
];

export const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  saas: "SaaS & AI",
  web: "Website",
  migrations: "Migration",
  wordpress: "WordPress",
  shopify: "Shopify",
  django: "Django",
};

export const PROJECTS: Project[] = [
  // ── Featured: latest and most important ─────────────────────
  {
    slug: "hrms",
    date: "2026-10",
    name: "HRMS",
    category: "saas",
    featured: true,
    role: "Primary engineer",
    credit: "Built",
    image: "/images/projects/hrms/attendance-analytics.png",
    gallery: [
      { src: "/images/projects/hrms/attendance-analytics.png", caption: "Attendance analytics across the organisation, fed by the biometric devices" },
      { src: "/images/projects/hrms/role-permissions.png", caption: "Role permissions: every module switched on or off per role, with defaults and approval rules" },
      { src: "/images/projects/hrms/admin-settings.png", caption: "Admin settings: payroll rules, leave types, attendance sync, integrations and the audit log" },
      { src: "/images/projects/hrms/user-guide.png", caption: "A built-in, role-aware user guide covering 56 screens" },
    ],
    icon: "users",
    modules: ["Attendance & shifts", "Leave", "Payroll", "Performance", "Helpdesk", "Audit log"],
    summary:
      "One HR platform in place of spreadsheets: attendance, leave, payroll and reviews, with 240+ test files gating every deploy.",
    problem:
      "The company ran HR across spreadsheets and separate tools. Attendance was exported from biometric devices, payroll was rebuilt by hand every month, and leave, reviews and helpdesk requests lived somewhere else. None of it was connected or auditable.",
    contribution:
      "Designed and built the complete HRMS as primary engineer (430+ of 475 commits) on Next.js, Prisma and PostgreSQL. Attendance flows in from biometric devices into an append-only punch log, the payroll engine reproduces the finance team's salary sheet, and module-level permissions cover every role from Employee to Super Admin.",
    outcome:
      "The whole employee lifecycle in one system: 100+ data models, 220+ API routes and 80+ pages. 240+ test files, including integration suites against a real Postgres, gate every deploy, and CI ships blue-green releases to AWS.",
    highlights: [
      "Employee records, attendance and shifts, leave, overtime, payroll, performance reviews, training, letter and asset requests, announcements and audit logs.",
      "Biometric devices push punches to an ADMS endpoint or are pulled by a LAN agent; raw punches are never overwritten.",
      "Payroll matches the finance team's sheet for tax withholding and day-rate rules, and marking a run as paid is idempotent.",
      "Slack and web-push notifications, Excel and PDF exports for finance.",
      "Blue-green releases to AWS via SSM, gated by unit, integration and end-to-end tests.",
    ],
    note:
      "Payroll is only as trustworthy as its inputs. Attendance devices go offline and re-send punches, so every raw punch is kept in an append-only log and attendance is derived from it. A rule can be fixed and a whole month of payroll recomputed without losing the source of truth.",
    metrics: [
      { value: "100+", label: "data models" },
      { value: "220+", label: "API routes" },
      { value: "240+", label: "test files" },
    ],
    stack: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "node-cron", "Vitest", "GitHub Actions", "AWS", "ZKTeco ADMS"],
  },
  {
    slug: "ai-proposal-crm",
    date: "2026-10",
    name: "AI Proposal CRM",
    category: "saas",
    featured: true,
    role: "Architect",
    credit: "Architected",
    image: "/images/projects/ai-proposal-crm.png",
    imageFit: "contain",
    summary:
      "An internal knowledge base and lead CRM that finds the agency's most relevant past work for each job post and drafts a grounded proposal with Claude.",
    problem:
      "The sales team wrote every proposal from scratch, even when the company had shipped something similar before. Knowledge of past work lived in people's heads and scattered documents.",
    contribution:
      "Designed the system and wrote its 70-file foundation: the Supabase schema and row-level-security migrations, seed data, the can() permission engine with tests, auth and the app shell. Specified the retrieval flow (Claude breaks a job post into requirements, embeddings in pgvector find the closest past projects, the app drafts a grounded proposal), wrote the onboarding guide and a 50-ticket plan, and owned the repo, reviewing and merging the team's PRs.",
    outcome:
      "Four engineers built features in parallel on that foundation. The schema has grown to 24 tables and 80+ RLS policies, and a parity test fails CI if app rules and database policies drift apart.",
    highlights: [
      "pgvector with an HNSW index for similarity search over past projects.",
      "Assigning a lead emails the technical owner and holds a 45-minute Google Calendar slot.",
      "Access is enforced twice, in the app and in Postgres, and CI fails if the two disagree.",
      "Found and fixed a row-level-security leak on the embeddings table.",
    ],
    metrics: [
      { value: "24", label: "tables" },
      { value: "80+", label: "RLS policies" },
      { value: "4", label: "engineers unblocked" },
    ],
    stack: ["Next.js 16", "Supabase", "PostgreSQL RLS", "pgvector", "Anthropic Claude", "OpenAI Embeddings", "Google Calendar API", "Vitest", "Playwright", "Vercel"],
  },
  {
    slug: "mortgage-guidelines-ai-assistant",
    date: "2026-10",
    name: "Multi-tenant AI Assistant for Mortgage Lending Guidelines",
    category: "saas",
    featured: true,
    confidential: true,
    role: "Developer",
    credit: "Developed",
    icon: "landmark",
    modules: ["Tenant branding", "Bot workflows", "Broker workspaces", "Guide review", "Stripe billing", "Newsletter AI"],
    summary:
      "Mortgage teams ask lending-guideline questions in plain English and get answers from the right sources, on one platform serving many branded lenders.",
    problem:
      "Loan officers lose hours searching long, frequently updated agency and investor guideline documents, and every lender layers its own overlays on top. Each new lender used to mean another separate front end.",
    contribution:
      "Developer on the platform. Built admin and user dashboards and the AI chat experience, and worked on its tenancy model: the tenant is resolved from the domain, branding and feature flags live in configuration, and every record is scoped to its tenant so lenders' data never mixes.",
    outcome:
      "One platform where single-client front ends became tenants: 250+ API handlers, 96 pages, 40 data models and 480+ automated test cases, with 17 scheduled jobs running billing, retention and guideline-update checks.",
    highlights: [
      "Database-driven bot workflow engine (overlay, parallel and summarizer steps) that queries several guideline sources at once and streams one combined answer.",
      "Self-serve broker workspaces: admins create assistants from uploaded PDFs and manage users, trials, add-ons and token usage.",
      "A structured review of an investor guide across 48 attributes that flags conflicts, takes corrections and exports a workbook.",
      "Stripe subscriptions with free-tier limits, an embeddable chat widget, voice input and an AI newsletter pipeline.",
    ],
    metrics: [
      { value: "250+", label: "API handlers" },
      { value: "96", label: "app pages" },
      { value: "480+", label: "test cases" },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "tRPC", "Prisma", "PostgreSQL", "NextAuth", "Stripe", "OpenAI", "Sanity", "AWS", "Vitest"],
  },
  {
    slug: "pms-integration-factory",
    date: "2026-10",
    name: "AI-Assisted Integration Factory for Property-Management Systems",
    category: "saas",
    featured: true,
    confidential: true,
    role: "Developer · client engagement",
    credit: "Developed",
    icon: "building",
    modules: ["LLM research agent", "Code generator", "Contract tests", "Event bus", "GitOps deploys"],
    summary:
      "Turns a vendor's API docs into a tested, contract-compliant integration service, graded automatically against real recorded event traffic.",
    problem:
      "Every property-management-system integration was a bespoke service with no shared contract and no automated proof that it spoke the same event format as the integrations already in production.",
    contribution:
      "Developer on the team that built the factory: an LLM research agent that maps a vendor API into a reviewable capability map, a deterministic NestJS generator that keeps regenerated code apart from hand-written seams, an LLM-assisted fill loop, and a harness that replays redacted event-bus traffic to grade every build.",
    outcome:
      "New connectors became repeatable and verifiable: two integrations generated so far, 25 event types under a typed contract, 15 validation gates and 330+ test files, deployed to dev and stage through GitOps.",
    highlights: [
      "Failures are classified four ways (contract, payload, ordering, missing fixture), and contract drift is detected automatically.",
      "Typed wire contract in Zod with JSON Schema export and reference fixtures.",
      "The capability map files an epic and per-feature tickets, so planning comes out of the same source as the code.",
      "11 architecture decision records document the design.",
    ],
    metrics: [
      { value: "25", label: "event types" },
      { value: "15", label: "validation gates" },
      { value: "330+", label: "test files" },
    ],
    stack: ["TypeScript", "NestJS", "NATS JetStream", "Zod", "PostgreSQL", "Anthropic Claude", "Turborepo", "Jest", "Docker", "Kubernetes", "Argo CD"],
  },
  {
    slug: "neblo-ai",
    date: "2026-08",
    name: "Neblo AI Marketing Site",
    category: "web",
    featured: true,
    role: "Sole developer",
    credit: "Built",
    image: "/images/projects/neblo-ai.png",
    summary:
      "Moved an AI freight startup off Framer to a Next.js site its team publishes to without a developer: 13 pages live, new posts live in seconds.",
    problem:
      "Neblo AI, an early-stage freight-brokerage automation startup, had outgrown its Framer site and needed a CMS-driven blog and SEO landing pages without losing its design.",
    contribution:
      "Sole developer on the Next.js 16 rebuild (React 19, Tailwind CSS v4). Kept pages as server components with Framer Motion isolated in client components, embedded Sanity Studio with 7 schemas, draft mode and a revalidation webhook for ISR, and added programmatic-SEO landing pages, a sitemap, RSS and a SendGrid contact form.",
    outcome: "13 pages live at neblo.ai. The team publishes in Sanity and new posts go live seconds later.",
    highlights: [
      "Sanity Studio embedded at /studio, so content and code deploy together.",
      "Webhook-driven incremental static regeneration instead of full rebuilds.",
      "Programmatic SEO landing pages generated from structured content.",
    ],
    metrics: [
      { value: "13", label: "pages live" },
      { value: "7", label: "content schemas" },
    ],
    stack: ["Next.js 16", "React 19", "Tailwind CSS v4", "Sanity", "Framer Motion", "SendGrid", "Vercel"],
    live: "https://neblo.ai",
  },
  {
    slug: "geia-csa-dot-platform",
    date: "2026-06",
    name: "GEIA CSA/DOT Score Improvement Platform",
    category: "saas",
    featured: true,
    role: "Co-builder",
    credit: "Co-built",
    image: "/images/projects/fleetsafety.png",
    summary:
      "A multi-tenant platform that helps an insurer's trucking clients lower FMCSA CSA/DOT safety scores through evidence, corrective plans, driver training and DataQs challenges.",
    problem:
      "Carriers insured by GEIA need a repeatable, auditable way to lower their CSA BASIC scores: evidence intake, corrective plans, driver training and DataQs challenges, all tracked per carrier. The work ran on spreadsheets and email, with filing deadlines tracked by hand.",
    contribution:
      "Co-built it with one other engineer (73 of 200 commits across three repos). On the NestJS API I built the Users module with invites and 6-role RBAC, granular staff permissions, SendGrid and Twilio notifications, the Training module (modules, quizzes, assignments, attestations), password reset, refresh tokens and support tickets. I also wired both React portals to the live API, including the 6-step DataQs submission wizard.",
    outcome:
      "A hardened API of 16 modules, 40 entities and ~147 endpoints behind a staff console and a carrier portal, with tenant-scoped data, an audit trail and daily KPI snapshots.",
    highlights: [
      "Every request passes a JWT → tenant → role guard chain over tenant-scoped, soft-delete entities.",
      "Security hardening: Helmet, CORS, rate limiting and refresh-token rotation.",
      "Moved TypeORM auto-sync to versioned migrations, writing 6 of the first 10.",
      "Hashed evidence files and an audit trail per dispute.",
    ],
    note:
      "FMCSA data doesn't fit a generic document tracker. CSA scores are percentiles per BASIC category and DataQs requests follow their own review process, so the schema models violations, disputes and evidence per carrier.",
    metrics: [
      { value: "~147", label: "endpoints" },
      { value: "16", label: "API modules" },
      { value: "6", label: "RBAC roles" },
    ],
    stack: ["NestJS", "TypeORM", "PostgreSQL", "React 18", "Vite", "Tailwind CSS", "SendGrid", "Twilio", "Playwright"],
  },

  // ── SaaS & AI ───────────────────────────────────────────────
  {
    slug: "microfinance-loan-management",
    date: "2026-06",
    name: "Loan Management System for a 14-Branch Lender",
    category: "saas",
    role: "Freelance engagement",
    credit: "Built",
    image: "/images/projects/lms.png",
    summary:
      "One branch-scoped system for a microfinance lender's whole loan lifecycle, with regulator-ready reports on demand instead of a quarterly scramble.",
    problem:
      "A microfinance lender ran loans across 14 branches on paper forms, WhatsApp and spreadsheets. KYC was inconsistent, EMI schedules were error-prone and regulatory reporting was a quarterly scramble.",
    contribution:
      "Delivered a five-phase platform: a NestJS + Prisma + PostgreSQL API with JWT auth and role guards, and a Next.js front end. It covers KYC with CNIC verification, configurable loan products, multi-level approvals, reducing-balance EMI schedules, disbursement, and collections with PAR-bucket tracking and a nightly overdue-detection job.",
    outcome:
      "The full loan lifecycle across all 14 branches in one system, with branch-scoped access for field staff, an audit trail behind every change and regulator-style reports exported to Excel or PDF.",
    highlights: [
      "Branch, staff and borrower management with KYC document uploads.",
      "PDF loan agreements generated from approved applications.",
      "Branch and officer dashboards, plus SMS notifications.",
    ],
    note:
      "Microfinance lending in Pakistan follows SECP NBFC rules, not Western fintech conventions. Markup calculations differ from APR, KYC runs on CNIC data, and reporting fields differ from IFRS, so these rules have to be modelled from the start.",
    metrics: [
      { value: "14", label: "branches" },
      { value: "5", label: "delivery phases" },
    ],
    stack: ["NestJS", "Next.js 16", "Prisma", "PostgreSQL", "TypeScript", "Zustand", "Recharts", "Tailwind CSS"],
  },
  {
    slug: "pharmacist-care-management",
    date: "2026-06",
    name: "Pharmacist-Led Care Management & Medical Billing Platform",
    category: "saas",
    confidential: true,
    role: "Developer · client engagement",
    credit: "Developed",
    icon: "pill",
    modules: ["Patient roster", "Care programs", "CGM sync", "Claims", "HL7 alerts"],
    summary:
      "Pharmacist teams run patient programs, track clinical data and bill encounters as electronic claims, all on one multi-tenant platform.",
    problem:
      "Pharmacist-led chronic-care programs juggled rosters, care plans, device data, payer eligibility and claims across spreadsheets and separate billing tools.",
    contribution: "Developer on the product team, working across the Rails API and the React/TypeScript front end.",
    outcome:
      "A long-running healthcare platform of 151 tables, 134 controllers and 72 service objects, with 17 scheduled jobs and integrations into clinical and billing networks.",
    highlights: [
      "Patient profiles with medications, labs, vitals and immunizations, bulk import and fine-grained privileges per organization.",
      "Care-program builder with weekly pathways, task queues and questionnaires.",
      "Continuous glucose monitor data synced every three hours with pre-calculated glucose statistics.",
      "Encounter notes become CMS-1500 claims with CPT/NDC pricing and electronic submission; HL7 v2 discharge alerts arrive over SFTP.",
    ],
    stack: ["Ruby on Rails", "PostgreSQL", "React", "TypeScript", "Tailwind CSS", "AWS (S3, SQS, SES)", "HL7 v2", "RSpec"],
  },
  {
    slug: "ai-recruitment-platform",
    date: "2026-06",
    name: "AI Recruitment & Applicant Tracking Platform",
    category: "saas",
    confidential: true,
    role: "Developer",
    credit: "Developed",
    icon: "users",
    modules: ["Resume parsing", "AI match score", "Kanban pipeline", "HR chatbot"],
    summary:
      "Resume intake to onboarding in one platform, with GPT-4o parsing and ranking candidates and an HR assistant that cites its sources.",
    problem:
      "Recruiters spent hours screening resumes by hand and answering the same policy questions, across tools that didn't talk to each other.",
    contribution: "Developer on the platform's FastAPI backend and Next.js front end.",
    outcome:
      "Parsing, ranking, scheduling, pipeline, HR chat, onboarding and analytics in one multi-tenant product: 47 API endpoints over 17 tables, shipped with Docker Compose.",
    highlights: [
      "PDF and DOCX resumes become structured candidate records through GPT-4o extraction.",
      "A 0–100 match score per job with strengths and gaps, and one-click ranking of every applicant.",
      "Kanban pipeline, interview scheduling and onboarding plans.",
      "An HR assistant over policy documents (pgvector embeddings) that answers with citations; four-role RBAC.",
    ],
    stack: ["Next.js 15", "FastAPI", "SQLAlchemy", "PostgreSQL", "pgvector", "OpenAI GPT-4o", "LangChain", "Docker"],
  },
  {
    slug: "datalyze",
    date: "2026-04",
    name: "Datalyze",
    category: "saas",
    role: "Solo product build",
    credit: "Built",
    image: "/images/projects/datalyzer.png",
    summary:
      "A self-serve analytics SaaS shipped solo in one week: upload a spreadsheet or document, get charts and AI-written insights, billed through Stripe.",
    problem: "Small teams wanted insights from their spreadsheets and documents without learning a BI tool.",
    contribution:
      "Built it alone on Next.js and Supabase, with email and Google sign-in and row-level security on every table. It parses CSV, Excel, PDF, Word and JSON, infers column types, then produces charts, correlations and outlier detection, with GPT-4o-mini writing the trend summary. Stripe checkout, customer portal and webhooks drive Free, Pro and Team plans with per-plan limits.",
    outcome: "A complete SaaS codebase, from upload to billing, in one week. The source is public on GitHub.",
    stack: ["Next.js 16", "Supabase", "Stripe", "OpenAI", "TypeScript", "Recharts", "Plotly"],
    github: "https://github.com/csmtalha/datalyzer",
  },
  {
    slug: "b2b-lead-discovery",
    date: "2026-03",
    name: "B2B Lead Discovery & Enrichment Platform",
    category: "saas",
    confidential: true,
    role: "Own product build",
    credit: "Built",
    icon: "scan",
    modules: ["Map search", "Site scraping", "Lead scoring", "CSV export"],
    summary:
      "Finds local businesses by area and industry, pulls contact details from their sites, scores each lead and exports a clean list.",
    problem: "Building local B2B lead lists by hand is slow: search a map, open every site, copy contacts into a sheet.",
    contribution:
      "Built the FastAPI backend and Next.js dashboard: geocoded map search with caching, website scraping for emails and phones, quality and confidence scoring, and seven Celery background tasks on Redis.",
    outcome: "Lead lists that took an afternoon come out of one search, scored and ready to export: 19 API endpoints over 7 tables.",
    stack: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Celery", "Redis", "Next.js", "shadcn/ui", "Docker"],
  },
  {
    slug: "mednotes",
    date: "2026-03",
    name: "MedNotes",
    category: "saas",
    role: "Prototype build",
    credit: "Built",
    image: "/images/projects/mednotemvp.png",
    summary:
      "Turns one recorded doctor–patient visit into a transcript, a structured SOAP note, suggested ICD-10 codes and a follow-up plan.",
    problem: "Physicians spend a large share of their day writing up visit notes and looking up diagnosis codes.",
    contribution:
      "Built the prototype end to end: in-browser audio recording posting to a FastAPI backend on PostgreSQL, Whisper for multilingual transcription, and GPT-4o-mini drafting the SOAP note with ICD-10/CPT suggestions, medication warnings and follow-up items. Patient records keep visit history; JWT auth lives in HTTP-only cookies.",
    outcome: "A working, Dockerized prototype where a single recording produces the full clinical write-up.",
    stack: ["Next.js", "FastAPI", "OpenAI Whisper", "GPT-4o-mini", "PostgreSQL", "Docker"],
  },
  {
    slug: "google-chat-hr-assistant",
    date: "2026",
    name: "Google Chat HR Assistant",
    category: "saas",
    role: "Internal tool",
    credit: "Built",
    image: "/images/projects/google-chat-hr-bot.png",
    summary:
      "Employees get leave balances, payroll dates and policy answers inside Google Chat, with no new app, login or server.",
    problem:
      "Employees looked up HR policies, leave balances and payroll dates across disconnected tools, and sent HR the same questions again and again.",
    contribution:
      "Built a serverless assistant in six Apps Script modules. A two-call GPT-4o-mini pipeline turns a question into search queries, then answers from live Notion policy pages; employee and leave data come live from Google Sheets; answers render as interactive Google Chat cards. Handled service-account JWT auth, merged-header column mapping and spreadsheet timezone quirks.",
    outcome: "HR answers in the chat tool the company already uses, with nothing to deploy or host.",
    stack: ["Google Apps Script", "OpenAI GPT-4o-mini", "Notion API", "Google Sheets", "Google Chat"],
  },
  {
    slug: "three-sided-job-marketplace",
    date: "2025-07",
    name: "Three-Sided Job Marketplace for Seekers, Companies and Recruiters",
    category: "saas",
    confidential: true,
    role: "Developer · client engagement",
    credit: "Developed",
    icon: "users",
    modules: ["Seeker portal", "Company portal", "Recruiter portal", "e-ID verification", "Subscriptions"],
    summary:
      "A bilingual job marketplace that connects job seekers, hiring companies and recruiters, with identity-verified users, chat and paid subscriptions.",
    problem: "Hiring parties needed one place to post jobs, search candidates and transact, with every user's identity verified.",
    contribution: "Developer on the Next.js front end and its server actions.",
    outcome: "Three portals in one app: 107 routes and 89 server actions, in English and Swedish.",
    highlights: [
      "Jobs, job groups and freelance gigs, with candidate search for companies and recruiters.",
      "National e-ID verification with QR code, auto-start and polling.",
      "Real-time chat and notifications; Stripe subscriptions, orders and transactions.",
    ],
    stack: ["Next.js 14", "React 18", "Redux Toolkit", "MUI", "next-intl", "Firebase", "Stripe"],
  },
  {
    slug: "merchant-onboarding-portal",
    date: "2025-03",
    name: "Merchant Onboarding & Sales-Agent Admin Portal",
    category: "saas",
    confidential: true,
    role: "Developer · client engagement",
    credit: "Developed",
    icon: "shield",
    modules: ["Applications", "E-signature", "PDF agreements", "Role-scoped access"],
    summary:
      "Takes merchant processing applications from lead to signed PDF agreement, with role-scoped access for resellers and their agents.",
    problem: "Payment resellers collected merchant applications by hand, with no audit trail and no per-agent access control.",
    contribution: "Developer on the Next.js admin portal and its Node/Express API.",
    outcome: "A multi-section application flow that ends in a filled, signed agreement stored in S3, with four roles and per-tab permissions.",
    stack: ["Next.js 15", "React 19", "shadcn/ui", "NextAuth", "Node.js", "Express", "MongoDB", "pdf-lib", "AWS S3"],
  },
  {
    slug: "student-wellbeing-analytics",
    date: "2025-02",
    name: "Student Wellbeing & Mood Analytics Platform for Schools",
    category: "saas",
    confidential: true,
    role: "Developer",
    credit: "Developed",
    icon: "graduation",
    modules: ["Mood check-ins", "Journals", "Trend analytics", "Students to watch"],
    summary:
      "Students check in on how they feel; educators get class, group and student emotional trends plus early alerts on who needs attention.",
    problem: "Teachers had no structured, timely view of how students feel, so wellbeing issues surfaced late.",
    contribution: "Developer on the educator web app (Next.js, Redux), including session check-ins, data grids and mood filters.",
    outcome: "An analytics-heavy school product of 87 pages calling 82 API endpoints, with heatmaps, sentiment and topic views.",
    highlights: [
      "Scheduled check-in sessions with repeat rules and custom questions.",
      "Mood and sentiment breakdowns by class, group and day of week; calendar heatmaps and word clouds.",
      "School admin: educators, classes, groups, students and the academic calendar.",
    ],
    stack: ["Next.js", "React 18", "Redux", "Ant Design", "MUI", "D3", "ApexCharts", "Docker"],
  },
  {
    slug: "contact-center-planning-backend",
    date: "2024-08",
    name: "Contact-Center Scenario Planning: Real-Time API",
    category: "saas",
    confidential: true,
    role: "Backend developer · client engagement",
    credit: "Developed",
    icon: "chart",
    modules: ["OTP auth", "Kafka consumers", "Socket.IO push", "Presence"],
    summary:
      "The backend for a contact-center planning tool: streams scenario results and alerts to users the moment they're ready, with live presence on every scenario.",
    problem: "Planning teams running what-if scenarios on an analytics engine needed secure multi-user access and live results without polling.",
    contribution: "Backend developer on the NestJS API.",
    outcome: "An event-driven API of 41 endpoints that turns engine results on Kafka into real-time Socket.IO updates.",
    highlights: [
      "Email one-time-password login with JWT; admin and employer user management.",
      "Call centers, contact types and staff types synced to the external modelling engine.",
      "Redis presence showing who is viewing or editing each scenario; support tickets with S3 attachments.",
    ],
    stack: ["NestJS", "TypeScript", "TypeORM", "PostgreSQL", "Redis", "Kafka", "Socket.IO", "AWS S3"],
  },
  {
    slug: "dose-symptom-tracker",
    date: "2024-05",
    name: "Patient Dose & Symptom Tracker with Dispensary Integrations",
    category: "saas",
    confidential: true,
    role: "Developer · client engagement",
    credit: "Developed",
    icon: "leaf",
    modules: ["Dose sessions", "Symptom tracking", "13 POS integrations", "Loyalty sync"],
    summary:
      "A mobile app where patients log doses and symptom relief per product; aggregated outcomes feed product insights and dispensary menu integrations.",
    problem: "Patients had no data on which products actually relieved their symptoms, and dispensaries had no outcome data on their menus.",
    contribution: "Developer on the Django backend and the React/Cordova mobile app.",
    outcome: "A consumer app plus partner backend: 127 data models, menus imported from 13 POS systems and rewards synced with 3 loyalty platforms.",
    highlights: [
      "Before/after symptom tracking per dose, insights, reminders and barcode scanning.",
      "Lab-profile product catalog and product finder.",
      "Aggregate effectiveness scoring per product and symptom, computed in Celery jobs.",
    ],
    stack: ["React", "Redux", "Cordova", "Python", "Django", "Django REST Framework", "Celery", "PostgreSQL", "Redis", "Docker"],
  },
  {
    slug: "regional-job-board",
    date: "2024-02",
    name: "Regional Job Board & Talent Marketplace",
    category: "saas",
    confidential: true,
    role: "Developer · client engagement",
    credit: "Developed",
    icon: "building",
    modules: ["Candidate profiles", "Employer dashboard", "ATS sync", "Terraform infra"],
    summary:
      "A city-focused job platform connecting candidates, employers and open roles, with jobs and companies synced automatically from recruiting systems.",
    problem: "Local job seekers and employers lacked one region-specific place to find roles and candidates.",
    contribution: "Developer on the Node/Express API, the React front end and the sync jobs.",
    outcome: "A full-stack product with 49 API endpoints over 23 data models and 12 scheduled syncs, deployed with Terraform on AWS.",
    stack: ["TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "React", "React Query", "AWS ECS", "Terraform"],
  },
  {
    slug: "maritime-basing-planner",
    date: "2024-02",
    name: "Maritime Fleet Basing & Route Planner",
    category: "saas",
    confidential: true,
    role: "Developer · client engagement",
    credit: "Built",
    icon: "plane",
    modules: ["Scenario planning", "A* routing", "Base selection", "Cost model"],
    summary:
      "A map tool that plans where to base a fleet of range-limited vehicles over water and computes routes, range, cost and crew for each scenario.",
    problem: "Planning staging bases for range-limited vehicles over water was manual spreadsheet work.",
    contribution:
      "Built the planner: a Leaflet map for placing home and staging bases, scenario and vehicle management, a land/water grid with ε-weighted A* pathfinding and path smoothing, and the multi-base plan calculation.",
    outcome: "Scenarios that took a spreadsheet afternoon now compute on the map, with distances and costs per base.",
    stack: ["Django", "Django REST Framework", "NumPy", "React 18", "Leaflet"],
  },
  {
    slug: "text-to-sql-banking-assistant",
    date: "2024-01",
    name: "Natural-Language Banking Data Assistant (Text-to-SQL)",
    category: "saas",
    confidential: true,
    role: "Prototype · client engagement",
    credit: "Developed",
    icon: "sparkles",
    modules: ["LLM chat", "Text-to-SQL", "Auto charts", "Golden records"],
    summary: "Business users ask questions about banking data in plain English and get SQL-backed answers rendered as charts.",
    problem: "Business users couldn't query warehouse data without writing SQL or waiting on analysts.",
    contribution: "Developer on the prototype: LLM chat with function calling over a self-hosted text-to-SQL engine, and the admin pages.",
    outcome: "A working prototype with automatic chart selection, deployed to AWS ECS with Terraform.",
    stack: ["Python", "Streamlit", "LangChain", "Azure OpenAI", "Snowflake", "ECharts", "Terraform", "AWS ECS"],
  },
  {
    slug: "charter-coach-booking",
    date: "2023-08",
    name: "Charter Coach Booking Marketplace & Operator Portal",
    category: "saas",
    confidential: true,
    role: "Developer",
    credit: "Developed",
    icon: "bus",
    modules: ["Booking engine", "Dynamic pricing", "Stripe Connect", "Operator portal"],
    summary:
      "Travellers request and pay for private coach charters online, while operators quote, price and manage trips and fleets in their own portal.",
    problem: "Group charter bookings ran on phone calls and emailed quotes; operators needed one place to receive requests, price them consistently and get paid.",
    contribution: "Developer on the NestJS booking API and the Angular operator and admin portals.",
    outcome: "A five-service marketplace (two APIs, three Angular apps) with card payments, operator payouts and bank linking.",
    highlights: [
      "Embeddable booking engine for multi-stop, multi-day itineraries with distance lookups.",
      "Per-trip pricing from distance, deadhead miles, hours, date and vehicle type.",
      "Stripe payment intents, Stripe Connect payouts to operators and Plaid bank linking.",
    ],
    stack: ["TypeScript", "NestJS", "Sequelize", "PostgreSQL", "Python", "Flask", "Angular", "Stripe Connect", "Plaid", "Google Cloud Run"],
  },
  {
    slug: "dealership-accounting-automation",
    date: "2023-05",
    name: "Automotive Dealership Accounting Automation Platform",
    category: "saas",
    confidential: true,
    role: "Developer · client engagement",
    credit: "Developed",
    icon: "calculator",
    modules: ["OCR intake", "350 parsers", "Transform pipelines", "DMS export"],
    summary:
      "Turns car dealers' vendor statements and PDFs into journal entries ready for their dealer-management system, through 350 format parsers.",
    problem: "Dealership accounting teams re-typed hundreds of floorplan, warranty, tax and vendor statements into their dealer-management system every month.",
    contribution: "Developer on the serverless Node.js services and the React dashboard.",
    outcome: "A long-running product with 350 document parsers, 117 transform rule types and 14 Lambda services feeding three dealer-management formats.",
    highlights: [
      "PDFs, scans (OCR via AWS Textract) and email attachments come in, and the document type is detected automatically.",
      "Per-division transform and reconciliation pipelines output journal entries in each DMS's layout.",
      "Multi-tenant dashboard with live job status over WebSockets.",
    ],
    stack: ["Node.js", "React", "Redux", "AWS Lambda", "AWS Textract", "PostgreSQL", "MongoDB", "Redis", "Serverless Framework"],
  },

  // ── Websites ────────────────────────────────────────────────
  {
    slug: "finwise-pro",
    date: "2026-10",
    name: "FinWise Pro",
    category: "web",
    role: "Owner & sole developer",
    credit: "Built",
    icon: "calculator",
    modules: ["54 calculators", "4 tools", "Guides", "Tax by country"],
    summary: "A free personal-finance site with 54 calculators, interactive tools and guides, tuned for search and live at finwisepro.online.",
    problem: "People want accurate tax, loan, mortgage and retirement calculators in one place, without signing up.",
    contribution:
      "Own product: built and run it on Next.js. Added the guides library, a Pakistan income-tax calculator, analytics and ads, and the SEO work behind unique per-page titles and Search Console fixes.",
    outcome: "Live with 54 calculator pages, 4 interactive tools and income-tax calculators for six countries.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Google Analytics"],
    live: "https://www.finwisepro.online",
  },
  {
    slug: "creexio",
    date: "2026-10",
    name: "Creexio",
    category: "web",
    role: "Own studio site",
    credit: "Built",
    image: "/images/projects/creexio.png",
    summary: "A fast, search-friendly studio site with services, case studies, a markdown blog and a spam-protected contact form.",
    problem: "My freelance studio needed a fast site that ranks, explains the services clearly and turns visitors into enquiries.",
    contribution:
      "Customized a Next.js 16 theme with Tailwind CSS v4: service and case-study pages, a markdown blog with gray-matter, an auto-generated sitemap, and a contact form protected by reCAPTCHA v3 that sends through SMTP with Nodemailer.",
    outcome: "Live at creexio.com with a growing blog and a contact form that keeps spam out.",
    stack: ["Next.js 16", "React 19", "Tailwind CSS v4", "Nodemailer", "reCAPTCHA v3"],
    live: "https://www.creexio.com/",
  },
  {
    slug: "al-ibrahim-travels",
    date: "2025-02",
    name: "Al Ibrahim Travels",
    category: "web",
    role: "Main contributor (152 of 186 commits)",
    credit: "Built",
    image: "/images/projects/alibrahimtravels.png",
    summary: "A travel agency's Umrah-package site that the agency updates on its own, live at alibrahimtravel.com.",
    problem: "A travel agency needed to update packages, destinations and blog posts without waiting on a developer.",
    contribution:
      "Turned a Next.js travel template into a self-managed site: a CMS on Firestore with security rules, Cloud Functions for background tasks, Google Maps and Places integration, and server-rendered pages for packages, destinations, bookings and posts.",
    outcome: "Live and maintained by the agency itself, with SEO-friendly pages for every package and destination.",
    stack: ["Next.js", "React", "Firebase", "Cloud Functions", "Google Maps", "Tailwind CSS"],
    live: "https://www.alibrahimtravel.com/",
  },

  // ── Migrations ──────────────────────────────────────────────
  {
    slug: "school-management-vue3-migration",
    date: "2025-07",
    name: "School Management System: Vue 2 → Vue 3 Migration",
    category: "migrations",
    confidential: true,
    role: "Vue 2 → Vue 3 migration",
    credit: "Migrated",
    icon: "graduation",
    modules: ["Vue 3.5", "Vite 5", "Vuex 4", "Element Plus", "PrimeVue"],
    summary: "A 1,000+ component school-management portal moved from end-of-life Vue 2 to Vue 3 and Vite, module by module, without a feature freeze.",
    problem: "A large staff portal (admissions, attendance, timetables, exams, finance, payroll) was stuck on Vue 2, Vue CLI and a UI kit with no Vue 3 version.",
    contribution:
      "Migrated it module by module, from Dashboard and Schedule through Staff, Students, Admissions, Courses and Attendance: Vue 3.5 with the Composition API, Vue Router 4, Vuex 4 and Vite 5. Replaced plugins that had no Vue 3 versions and removed filters and deprecated patterns.",
    outcome: "A supported, faster-building codebase across 1,011 components and 66 page modules.",
    stack: ["Vue 3", "Vite", "Vuex 4", "Vue Router 4", "Element Plus", "PrimeVue", "AG Grid"],
  },
  {
    slug: "golden-era-insurance",
    date: "2024-09",
    name: "Golden Era Insurance Agency",
    category: "migrations",
    role: "Legacy site → Next.js",
    credit: "Migrated",
    image: "/images/php-to-next.png",
    summary: "An insurance agency's legacy PHP site rebuilt on Next.js, with 17 coverage pages and a spam-protected quote form.",
    problem: "The agency's public site ran on a legacy PHP codebase that was slow and hard to change, with no reliable way to capture quote requests.",
    contribution:
      "Wrote the Next.js rebuild (the first commit contained the whole app), carried the content across into 17 coverage and policy pages, and added the Nodemailer contact API with reCAPTCHA.",
    outcome: "A faster, maintainable site, containerized and shipped to AWS through the team's GitHub Actions pipeline.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Nodemailer", "reCAPTCHA", "Docker", "AWS"],
  },

  // ── Django ──────────────────────────────────────────────────
  {
    slug: "bigeq",
    date: "2024-10",
    name: "BigEq",
    category: "django",
    role: "UI/UX improvements",
    credit: "UI/UX",
    image: "/images/projects/Bigeq.png",
    summary: "A clearer browsing and buying flow for an online horse marketplace, without rebuilding its Django backend.",
    problem: "An equine marketplace built on Django had a dated interface and a confusing buying flow.",
    contribution:
      "Reworked layouts and page structure in Django templates with HTML, CSS and vanilla JavaScript, cleaned up the listing and browsing flow, and moved listings to SEO-friendly slug URLs.",
    outcome: "A more consistent marketplace experience on the existing backend, delivered without a rewrite.",
    stack: ["Django", "Python", "Django REST Framework", "JavaScript", "CSS"],
  },

  // ── WordPress ───────────────────────────────────────────────
  {
    slug: "nordwood",
    date: "2022",
    name: "Nordwood",
    category: "wordpress",
    role: "Custom theme build",
    credit: "Built",
    image: "/images/projects/thuka.png",
    summary: "A responsive brand site on a custom WordPress theme that the team edits without touching code.",
    problem: "Nordwood needed a modern, responsive site to present its brand and services.",
    contribution: "Built a custom WordPress theme with responsive layouts and structured content, so every page is editable from the dashboard.",
    outcome: "A live brand site with consistent design and flexible content editing.",
    stack: ["WordPress", "PHP", "Custom Theme", "Responsive CSS"],
    live: "https://thuka.com/",
  },
  {
    slug: "fimi-pro",
    date: "2022",
    name: "Fimi Pro",
    category: "wordpress",
    role: "Custom theme build",
    credit: "Built",
    image: "/images/projects/fimipro.png",
    summary: "A branded product and company site the client manages on its own.",
    problem: "The company needed a branded site to showcase its products and company information.",
    contribution: "Built a custom WordPress theme aligned with the brand, with responsive layouts and the plugin functionality the content needed.",
    outcome: "A live, responsive site with straightforward content management.",
    stack: ["WordPress", "PHP", "Custom Theme", "Responsive CSS"],
    live: "https://fimipro.com/",
  },
  {
    slug: "chez-yiamme-catering",
    date: "2022",
    name: "Chez Yiamme Catering",
    category: "wordpress",
    role: "Site build",
    credit: "Built",
    image: "/images/projects/chezyiammecatering.png",
    summary: "Menus, services and events for a catering business, organized so customers can find what they need on any device.",
    problem: "A catering business needed to present its menus, services and events online.",
    contribution: "Built a WordPress site with structured menu sections, event pages and a mobile-first layout.",
    outcome: "A live catering site that gives customers a clear path from menu to enquiry.",
    stack: ["WordPress", "PHP", "Responsive CSS"],
    live: "https://chezyiammecatering.com/",
  },
  {
    slug: "napollo",
    date: "2022",
    name: "Napollo",
    category: "wordpress",
    role: "Company site build",
    credit: "Built",
    image: "/images/projects/Napollo.png",
    summary: "A software company's site with clear navigation and accessible, easy-to-update pages.",
    problem: "A software company needed a clear, professional web presence that its team could keep current.",
    contribution: "Built a WordPress site with structured navigation, accessibility considerations and a clean UI.",
    outcome: "A live corporate site with clear information architecture and simple content updates.",
    stack: ["WordPress", "PHP", "Accessibility"],
    live: "https://napollo.com/",
  },
  {
    slug: "butler-engineering",
    date: "2022",
    name: "Butler Engineering",
    category: "wordpress",
    role: "Custom theme build",
    credit: "Built",
    image: "/images/projects/butlerengineer.png",
    summary: "A professional site that presents an engineering firm's services and expertise clearly.",
    problem: "The engineering firm needed a professional site that matched its standing in the industry.",
    contribution: "Built a custom WordPress theme with structured service pages and responsive layouts.",
    outcome: "A live corporate site that communicates the firm's services clearly.",
    stack: ["WordPress", "PHP", "Custom Theme", "Responsive CSS"],
    live: "https://butlerme.com/",
  },
  {
    slug: "salvation-beauty-ink",
    date: "2022",
    name: "Salvation Beauty Ink",
    category: "wordpress",
    role: "Figma → WordPress",
    credit: "Built",
    image: "/images/projects/salvationbeauty.png",
    summary: "A Figma design turned into a pixel-accurate, responsive WordPress site.",
    problem: "The client had a finished Figma design and needed it working as a real website.",
    contribution: "Built a custom WordPress theme from the Figma file, matching the design closely across screen sizes.",
    outcome: "A live site that looks the way it was designed, on every device.",
    stack: ["WordPress", "Figma", "Custom Theme", "Responsive CSS"],
    live: "https://salvationbeautyink.com/",
  },

  // ── Shopify ─────────────────────────────────────────────────
  {
    slug: "fit-for-a-king",
    date: "2022",
    name: "Fit For A King",
    category: "shopify",
    role: "Shopify store build",
    credit: "Built",
    image: "/images/projects/fitforakingband.png",
    summary: "A merch store that lets a band's fans buy straight from the band.",
    problem: "A music band needed its own store to sell merchandise to fans.",
    contribution: "Customized a Shopify theme to the band's identity, built out the merchandise catalog and streamlined checkout.",
    outcome: "A live store where fans can buy band merchandise directly.",
    stack: ["Shopify", "Liquid", "E-commerce"],
    live: "https://fitforakingband.com/",
  },
  {
    slug: "pet-one-shop",
    date: "2022",
    name: "Pet One Shop",
    category: "shopify",
    role: "Shopify store build",
    credit: "Built",
    image: "/images/projects/petoneshop.jpeg",
    summary: "An online pet-products store with a full catalog and checkout.",
    problem: "The client needed an online store to sell pet products.",
    contribution: "Set up and customized the Shopify store: theme, product listings and checkout flow.",
    outcome: "A working store that let the client start selling online.",
    stack: ["Shopify", "Liquid", "E-commerce"],
  },
];

const byLatest = (a: Project, b: Project) => b.date.localeCompare(a.date);

/** Most important work, newest first. */
export const FEATURED = PROJECTS.filter((p) => p.featured).sort(byLatest);
/** Everything else, newest first. */
export const OTHER_PROJECTS = PROJECTS.filter((p) => !p.featured).sort(byLatest);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatProjectDate(date: string) {
  const [y, m] = date.split("-");
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : y;
}

/** Worked on within the last four months (relative to build time). */
export function isRecent(date: string, now = new Date()) {
  const [y, m] = date.split("-");
  if (!m) return false;
  const months = (now.getFullYear() - Number(y)) * 12 + (now.getMonth() + 1 - Number(m));
  return months <= 4;
}

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export function creditLine(p: Project) {
  return `${p.credit} by Talha Saleem`;
}
