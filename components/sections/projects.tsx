"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectDetailModal } from "@/components/project-detail-modal";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";

const PROJECTS_PER_PAGE = 6;

export type ProjectCategory = "all" | "webapps" | "wordpress" | "shopify" | "django" | "migrations";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  details: string;
  github: string;
  demo: string;
  category: Exclude<ProjectCategory, "all">;
}

const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "webapps", label: "Web Applications" },
  { id: "wordpress", label: "WordPress" },
  { id: "shopify", label: "Shopify" },
  { id: "django", label: "Django" },
  { id: "migrations", label: "Migrations" },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const projects: Project[] = [
    // Web Applications (React / Next.js)
    {
      title: "AttendanceIQ - Complete HRMS",
      description: "Company-wide HRMS: employees, attendance and shifts, leave, payroll, performance, learning, helpdesk and audit. 100 data models, 207 API routes, 202 test files.",
      image: "/images/projects/attendanceiq.png",
      tags: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Vitest", "GitHub Actions", "AWS"],
      details:
        "Situation: Cloudpacer ran HR across spreadsheets and disconnected tools. Attendance was exported from biometric devices and payroll was rebuilt by hand every month.\n\nTask: Design and build one HRMS covering the whole employee lifecycle, with payroll the finance team could trust.\n\nAction: Built it as primary engineer (361 of 403 commits) on Next.js 16, Prisma and PostgreSQL: employee records, attendance and shifts, leave, payroll, performance reviews, learning, asset and helpdesk requests, announcements and audit logs, with module-level permissions for Admin, HR, Manager and Employee. Attendance flows in from biometric devices (ADMS push or LAN pull) into an append-only punch log. The payroll engine matches the finance team's salary sheet for tax withholding and day-rate rules, and marking a run as paid is idempotent. Slack and web-push notifications, Excel/PDF exports.\n\nResult: 100 Prisma models, 207 API route handlers and 82 pages. 202 test files, including 41 integration suites against real Postgres, gate every deploy, and CI ships blue-green releases to AWS via SSM.",
      github: "",
      demo: "#",
      category: "webapps",
    },
    {
      title: "AI Proposal CRM",
      description: "Lead CRM that drafts proposals grounded in past projects: Claude requirement breakdown, pgvector similarity search, Supabase with 80 row-level-security policies.",
      image: "/images/projects/ai-proposal-crm.png",
      tags: ["Next.js 16", "Supabase", "PostgreSQL RLS", "pgvector", "Anthropic Claude", "OpenAI Embeddings", "Playwright"],
      details:
        "Situation: Cloudpacer's sales team wrote every proposal from scratch, even when the company had built something similar before.\n\nTask: Design a CRM that finds relevant past work for each job post and drafts a grounded proposal, safe for multiple roles to use.\n\nAction: Designed the system and wrote its foundation: the database schema, 80 row-level-security policies over 24 tables, an app-level permission layer mirrored by Postgres RLS, Supabase clients and the UI shell. Specified the retrieval flow (Claude breaks a job post into requirements, OpenAI embeddings in pgvector find similar projects, the app drafts a proposal), and wrote the developer onboarding guide and a 50-ticket plan.\n\nResult: Four engineers built features in parallel on that foundation. A parity test fails CI if app rules and database policies drift, and I later found and fixed an RLS leak on the embeddings table.",
      github: "",
      demo: "#",
      category: "webapps",
    },
    {
      title: "Fleet Safety & FMCSA Compliance Platform",
      description: "Multi-tenant SaaS a US compliance firm uses to dispute FMCSA violations for trucking carriers. NestJS API with 16 modules and ~147 endpoints, two React front ends.",
      image: "/images/projects/fleetsafety.png",
      tags: ["NestJS", "React", "TypeScript", "PostgreSQL", "TypeORM", "Tailwind CSS", "Multi-tenant", "RBAC"],
      details:
        "Situation: A US compliance firm managed FMCSA violation disputes (DataQs) for trucking carriers through spreadsheets and email.\n\nTask: Co-build a multi-tenant platform with a staff console and a carrier portal.\n\nAction: Wrote ~80 commits (~33k lines) across the NestJS 10 + TypeORM + PostgreSQL API and both React 18 + Vite front ends. Every request passes a JWT, tenant and role guard chain over tenant-scoped, soft-delete entities. Shipped user invites and 6-role RBAC, granular staff permissions, SendGrid and Twilio notifications, a training module with quizzes and attestations, a 6-step dispute-submission wizard, password reset and a data-retention cron. Hardened the API with Helmet, CORS, rate limiting and refresh-token rotation, and replaced TypeORM auto-sync with versioned migrations.\n\nResult: An API of 16 modules, 40 entities and ~147 endpoints, ready for the first pilot carrier with strict tenant isolation.",
      github: "",
      demo: "#",
      category: "webapps",
    },
    {
      title: "Loan Management System (Freelance)",
      description: "Full loan lifecycle for a 14-branch microfinance lender, from KYC and approvals to EMI schedules, collections and regulator-ready reports.",
      image: "/images/projects/lms.png",
      tags: ["NestJS", "Next.js 16", "Prisma", "PostgreSQL", "TypeScript", "Tailwind CSS", "Cron Jobs"],
      details:
        "Situation: A microfinance lender with 14 branches managed loans on paper forms, WhatsApp and disconnected spreadsheets.\n\nTask: Build one platform for the full loan lifecycle, from borrower onboarding to regulatory reporting.\n\nAction: Delivered a five-phase system as a freelance engagement. NestJS + Prisma + PostgreSQL API with JWT/Passport auth and role guards; Next.js 16 App Router front end with Zustand and Recharts. Covers branch, staff and borrower management with KYC uploads; configurable loan products, multi-level approval, disbursement, reducing-balance EMI schedules and PDF agreements; collections with PAR-bucket tracking and a nightly overdue-detection cron; branch and officer dashboards; regulator-style reports with Excel/PDF export; and a searchable audit trail with SMS notifications.\n\nResult: One branch-scoped system for the whole loan lifecycle, with regulatory reports generated on demand instead of assembled by hand.",
      github: "",
      demo: "#",
      category: "webapps",
    },
    {
      title: "RecruitIQ",
      description: "Multi-tenant AI recruiting platform: GPT-4o resume parsing, candidate ranking, Kanban pipeline, and an HR assistant over policy PDFs with pgvector.",
      image: "/images/projects/reqiq.png",
      tags: ["Next.js 15", "FastAPI", "PostgreSQL", "pgvector", "OpenAI GPT-4o", "LangChain", "Celery", "Docker"],
      details:
        "Situation: HR teams screened resumes by hand, scheduled interviews over email and answered the same policy questions repeatedly.\n\nTask: Build a multi-tenant recruiting platform with AI at each stage of the pipeline.\n\nAction: FastAPI backend with SQLAlchemy, Alembic, Celery and PostgreSQL 17 + pgvector; Next.js 15 front end with TanStack Query and Zustand. GPT-4o parses PDF/DOCX resumes into structured records and scores candidates against the job description. Kanban pipeline, interview scheduling, onboarding templates, time-to-hire analytics with CSV export, and four-role RBAC. The HR assistant embeds policy documents with OpenAI embeddings and answers with source citations via LangChain.\n\nResult: Resume ingestion to onboarding in one platform, shipped with Docker Compose and auto-generated OpenAPI docs.",
      github: "",
      demo: "#",
      category: "webapps",
    },
    {
      title: "Datalyze",
      description: "Self-serve analytics SaaS: upload CSV, Excel, PDF or Word files and get charts plus AI-written insights. Stripe subscriptions with per-plan usage limits.",
      image: "/images/projects/datalyzer.png",
      tags: ["Next.js 16", "Supabase", "Stripe", "OpenAI", "TypeScript", "Recharts", "Plotly"],
      details:
        "Situation: Small teams wanted insights from their spreadsheets and documents without learning a BI tool.\n\nTask: Build a self-serve analytics SaaS with file parsing, AI insights and subscription billing.\n\nAction: Next.js 16 with Supabase Auth (email and Google OAuth) and row-level security on every table. Parses CSV, XLSX, PDF, DOCX and JSON (ExcelJS, pdf-parse, mammoth), infers column types, then produces charts (Recharts, Plotly 3D), correlations and outlier detection, with GPT-4o-mini writing the trend summary. Stripe checkout, customer portal and webhooks drive Free, Pro and Team plans with per-plan file-size and row limits and PDF/Excel export.\n\nResult: A complete SaaS codebase, from upload to billing, built solo in one week. Source on GitHub.",
      github: "https://github.com/csmtalha/datalyzer",
      demo: "#",
      category: "webapps",
    },
    {
      title: "MedNotes",
      description: "Records a doctor-patient visit in the browser, transcribes it with Whisper and drafts a structured SOAP note with ICD-10 suggestions.",
      image: "/images/projects/mednotemvp.png",
      tags: ["Next.js", "FastAPI", "OpenAI Whisper", "GPT-4o-mini", "PostgreSQL", "Docker", "Healthcare AI"],
      details:
        "Situation: Physicians spend a large share of their day writing up visit notes and looking up diagnosis codes.\n\nTask: Prototype a tool that turns a recorded visit into a structured clinical note.\n\nAction: Browser audio recording posts to a FastAPI backend (SQLAlchemy, PostgreSQL). Whisper transcribes the conversation in multiple languages, and GPT-4o-mini drafts a SOAP note (Subjective, Objective, Assessment, Plan) with ICD-10/CPT suggestions, medication warnings and follow-up items. Patient records keep visit history. JWT auth in HTTP-only cookies with bcrypt, Dockerized with docker-compose.\n\nResult: A working prototype where one recording produces a transcript, SOAP note, suggested codes and a follow-up plan.",
      github: "",
      demo: "#",
      category: "webapps",
    },
    {
      title: "Neblo AI - Marketing Site",
      description: "Migrated an AI freight-brokerage startup's site from Framer to Next.js 16 with an embedded Sanity Studio, ISR and programmatic-SEO landing pages.",
      image: "/images/projects/neblo-ai.png",
      tags: ["Next.js 16", "React 19", "Tailwind CSS v4", "Sanity v5", "Framer Motion", "SendGrid", "Vercel", "ISR"],
      details:
        "Situation: Neblo AI, an early-stage freight-brokerage automation startup, had outgrown its Framer site and needed a CMS-driven blog and SEO landing pages.\n\nTask: Rebuild the site in code without losing the design, and let the team publish without a developer.\n\nAction: Sole developer on a Next.js 16 App Router rebuild with Tailwind CSS v4 and React 19. Kept pages as server components, with Framer Motion isolated in client components. Embedded Sanity v5 Studio at /studio with 7 schemas, draft mode and a revalidation webhook for ISR. Added programmatic-SEO landing pages, a sitemap and RSS feed, and a SendGrid contact form. Deployed on Vercel.\n\nResult: 13 pages live at neblo.ai; new posts go live seconds after publishing in Sanity.",
      github: "",
      demo: "https://neblo.ai",
      category: "webapps",
    },
    {
      title: "Multi-tenant Mortgage AI SaaS",
      description: "AI assistant platform for mortgage lenders: admin and user dashboards, chat interface, and a subdomain-based multi-tenant design.",
      image: "/images/projects/mortgagemvp.png",
      tags: ["Next.js", "Tailwind CSS", "shadcn/ui", "PostgreSQL", "Prisma", "Vercel", "Multi-tenant"],
      details:
        "Situation: A US mortgage-technology client needed an AI assistant that multiple lender groups could use under their own branding.\n\nTask: Build the dashboards and chat experience, and design how one codebase serves many tenants.\n\nAction: Built admin and user dashboards and the AI chat interface in Next.js with shadcn/ui, PostgreSQL and Prisma, including role-based access and user management. Wrote the multi-tenant design: tenant resolved from the subdomain, per-tenant branding and feature flags in configuration, and users linked to a tenant in a shared schema.\n\nResult: A single codebase that new lender groups can be onboarded to by configuration rather than a new build.",
      github: "",
      demo: "#",
      category: "webapps",
    },
    {
      title: "Al Ibrahim Travels",
      description: "Travel and Umrah-package site with a self-managed CMS on Next.js and Firebase. Main contributor (152 of 186 commits).",
      image: "/images/projects/alibrahimtravels.png",
      tags: ["Next.js", "React", "Firebase", "Cloud Functions", "Google Maps", "Tailwind CSS"],
      details:
        "Situation: A travel agency needed to update packages, destinations and blog content without waiting on developers.\n\nTask: Turn a Next.js travel template into a self-managed site with a real content backend.\n\nAction: Built the CMS on Firestore with security rules, Cloud Functions for background tasks, Google Maps and Places integration, and Firebase Hosting. Dynamic pages for Umrah packages, destinations, bookings and blog posts, server-rendered for SEO.\n\nResult: A live site at alibrahimtravel.com that the agency updates on its own.",
      github: "",
      demo: "https://www.alibrahimtravel.com/",
      category: "webapps",
    },
    {
      title: "Google Chat HR Assistant",
      description: "AI HR bot inside Google Chat that answers leave, payroll and policy questions from Google Sheets and Notion.",
      image: "/images/projects/google-chat-hr-bot.png",
      tags: ["Google Apps Script", "OpenAI GPT-4o-mini", "Notion API", "Google Sheets", "Google Chat"],
      details:
        "Situation: Cloudpacer employees looked up HR policies, leave balances and payroll dates across disconnected tools, sending the same questions to HR.\n\nTask: Answer those questions inside Google Chat, with no new app or login.\n\nAction: Built a serverless assistant in 6 modular Apps Script files. A two-call GPT-4o-mini pipeline first turns the question into search queries, then answers from live Notion policy pages. Employee and leave data come live from Google Sheets. Responses render as interactive Google Chat Cards v2. Handled service-account JWT auth, merged-header column mapping, spreadsheet date and timezone quirks, and Notion's exact-title search limits.\n\nResult: Employees get leave balances, payroll dates and policy answers in the chat tool they already use, with nothing to deploy or host.",
      github: "",
      demo: "#",
      category: "webapps",
    },
    {
      title: "Creexio",
      description: "Personal studio site on Next.js 16: service pages, a markdown blog with 13 posts, reCAPTCHA-protected contact form and SEO setup.",
      image: "/images/projects/creexio.png",
      tags: ["Next.js 16", "React 19", "Tailwind CSS v4", "Nodemailer", "reCAPTCHA v3", "SEO"],
      details:
        "Situation: I needed a fast, SEO-friendly site for my freelance studio.\n\nTask: Customize a Next.js theme into a site with services, case studies, a blog and a spam-safe contact form.\n\nAction: Built on Next.js 16 and Tailwind CSS v4. Markdown blog with gray-matter (13 posts), service and case-study pages, an auto-generated sitemap, and a contact form protected by reCAPTCHA v3 that sends through SMTP with Nodemailer.\n\nResult: Live at creexio.com.",
      github: "",
      demo: "https://www.creexio.com/",
      category: "webapps",
    },
    // WordPress
    {
      title: "Nordwood",
      description: "Custom WordPress site with modern design and responsive experience.",
      image: "/images/projects/thuka.png",
      tags: ["WordPress", "Custom Theme", "Responsive Design"],
      details:
        "Situation: The client required a modern, responsive website to represent their brand and showcase services online.\n\nTask: Build a custom WordPress website with strong design consistency and easy content management.\n\nAction: Developed a custom WordPress theme with responsive layouts and structured content management.\n\nResult: Delivered a professional website with improved usability and flexible content updates.",
      github: "https://github.com/csmtalha",
      demo: "https://thuka.com/",
      category: "wordpress",
    },
    {
      title: "Fimi Pro",
      description: "WordPress website with custom functionality and branding.",
      image: "/images/projects/fimipro.png",
      tags: ["WordPress", "Custom Theme", "Responsive Design"],
      details:
        "Situation: The company needed a branded website to showcase products and company information.\n\nTask: Develop a customizable WordPress site aligned with brand identity.\n\nAction: Built a custom WordPress theme and integrated responsive layouts and plugin functionality.\n\nResult: Delivered a responsive website enabling easy content management and improved online presence.",
      github: "https://github.com/csmtalha",
      demo: "https://fimipro.com/",
      category: "wordpress",
    },
    {
      title: "Chez Yiamme Catering",
      description: "WordPress site for catering with menus, events, and booking.",
      image: "/images/projects/chezyiammecatering.png",
      tags: ["WordPress", "Catering", "Responsive Design"],
      details:
        "Situation: A catering business required a website to present menus, services, and events.\n\nTask: Build a structured and responsive WordPress platform for content and bookings.\n\nAction: Developed a WordPress site with organized menu sections, event pages, and mobile-friendly design.\n\nResult: Delivered a professional catering website improving customer engagement and service visibility.",
      github: "https://github.com/csmtalha",
      demo: "https://chezyiammecatering.com/",
      category: "wordpress",
    },
    {
      title: "Napollo",
      description: "WordPress site for Napollo with clear navigation and accessibility.",
      image: "/images/projects/Napollo.png",
      tags: ["WordPress", "Software Company", "Accessibility"],
      details:
        "Situation: A software company needed a clear and professional web presence.\n\nTask: Build a website that communicates services clearly and allows easy updates.\n\nAction: Developed a WordPress site with structured navigation, accessibility considerations, and clean UI.\n\nResult: Delivered a corporate website with clear information architecture and easy content management.",
      github: "https://github.com/csmtalha",
      demo: "https://napollo.com/",
      category: "wordpress",
    },
    {
      title: "Butler Engineering",
      description: "Professional WordPress site showcasing services and expertise.",
      image: "/images/projects/butlerengineer.png",
      tags: ["WordPress", "Engineering", "Responsive Design"],
      details:
        "Situation: The engineering firm required a professional website to showcase expertise and services.\n\nTask: Develop a clean and responsive website aligned with their industry presence.\n\nAction: Built a custom WordPress website with structured service pages and responsive layouts.\n\nResult: Delivered a modern corporate website that effectively communicates the company's services.",
      github: "https://github.com/csmtalha",
      demo: "https://butlerme.com/",
      category: "wordpress",
    },
    {
      title: "Salvation Beauty Ink",
      description: "Figma-to-WordPress conversion with seamless design integration.",
      image: "/images/projects/salvationbeauty.png",
      tags: ["WordPress", "Figma", "Custom Theme", "Responsive Design"],
      details:
        "Situation: The client had a Figma design that needed to be transformed into a fully functional website.\n\nTask: Convert the design into a responsive WordPress implementation.\n\nAction: Developed a custom WordPress theme based on the Figma design, ensuring pixel accuracy and mobile responsiveness.\n\nResult: Delivered a visually consistent website with seamless design implementation.",
      github: "https://github.com/csmtalha",
      demo: "https://salvationbeautyink.com/",
      category: "wordpress",
    },
    // Shopify
    {
      title: "Pet One Shop",
      description: "Shopify store with product catalog and checkout.",
      image: "/images/projects/petoneshop.jpeg",
      tags: ["Shopify", "E-commerce", "Liquid"],
      details:
        "Situation: The client required an online store to sell pet products.\n\nTask: Build and customize a Shopify store with product catalog and checkout functionality.\n\nAction: Configured the Shopify store, customized the theme, and set up product listings and checkout flows.\n\nResult: Delivered a fully functional ecommerce store enabling online product sales.",
      github: "https://github.com/csmtalha",
      demo: "#",
      category: "shopify",
    },
    {
      title: "Fit for A King",
      description: "Shopify store for band merchandise and e-commerce.",
      image: "/images/projects/fitforakingband.png",
      tags: ["Shopify", "E-commerce", "Merchandise"],
      details:
        "Situation: A music band required an ecommerce store to sell merchandise to fans.\n\nTask: Build a Shopify store optimized for product sales and brand identity.\n\nAction: Customized Shopify theme, implemented merchandise catalog, and optimized checkout flow.\n\nResult: Delivered an ecommerce platform enabling fans to easily purchase band merchandise.",
      github: "https://github.com/csmtalha",
      demo: "https://fitforakingband.com/",
      category: "shopify",
    },
    // {
    //   title: "Best Machine FR",
    //   description: "Shopify store for Best Machine (France) with localized e-commerce.",
    //   image: "/placeholder.jpg",
    //   tags: ["Shopify", "E-commerce", "Localization"],
    //   details:
    //     "Built the Best Machine France Shopify store with theme customization and localization.",
    //   github: "https://github.com/csmtalha",
    //   demo: "https://bestmachine-fr.com/",
    //   category: "shopify",
    // },
    // Django
    {
      title: "Bigeq",
      description: "UI and UX improvements for a Django equine e-commerce marketplace.",
      image: "/images/projects/Bigeq.png",
      tags: ["Django", "Python", "Django Templates", "JavaScript", "E-commerce"],
      details:
        "Situation: An online horse marketplace built on Django had a dated interface and a confusing buying flow.\n\nTask: Improve the storefront UI and UX without a full rebuild.\n\nAction: Reworked layouts and page structure in Django templates with HTML, CSS and vanilla JavaScript, and cleaned up the listing and browsing flow.\n\nResult: A clearer, more consistent marketplace experience on the existing Django backend.",
      github: "",
      demo: "#",
      category: "django",
    },
    // Migrations
    {
      title: "Golden Insurance",
      description: "PHP to Next.js migration, business insurance platform modernized for performance and scalability.",
      image: "/images/php-to-next.png",
      tags: ["Next.js", "PHP", "Migration", "Performance", "React"],
      details:
        "Situation: The insurance company's public site ran on a legacy PHP codebase that was slow and hard to change.\n\nTask: Rebuild it on a modern framework and automate deployment.\n\nAction: Rebuilt the site in Next.js 14, refactoring the legacy page logic and routing, and set up a GitHub Actions pipeline that builds a Docker image and deploys it to AWS ECS.\n\nResult: A faster, maintainable site with push-to-deploy releases.",
      github: "https://github.com/csmtalha",
      demo: "#",
      category: "migrations",
    },
    {
      title: "ilerno",
      description: "Vue 2 to Vue 3 migration, School & Learning Management system with dashboard, analytics, and operations.",
      image: "/images/projects/ilerno.png",
      tags: ["Vue 2", "Vue 3", "Migration", "Composition API", "Learning Management"],
      details:
        "Situation: The LMS platform built with Vue 2 required modernization and improved performance.\n\nTask: Upgrade the system to Vue 3 with modern architecture.\n\nAction: Migrated components to Vue 3 using the Composition API, refactored legacy logic, and optimized performance across dashboard and operations modules.\n\nResult: Delivered a modernized LMS platform with improved maintainability and performance.",
      github: "https://github.com/csmtalha",
      demo: "#",
      category: "migrations",
    },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE) || 1;
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );

  return (
    <section
      id="projects"
      className="w-full bg-gradient-to-b from-background to-muted/20 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dots-pattern opacity-[0.02]"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>

      <motion.div
        ref={ref}
        className="section-container relative z-10"
        variants={containerVariants}
        animate={controls}
      >
        <motion.div
          variants={itemVariants}
          className="mb-12 md:mb-16 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Project Portfolio
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Production SaaS platforms, AI-powered tools, and full-stack systems - across fintech, healthcare, freight, and e-commerce.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 transition-all ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-primary to-purple-500 text-primary-foreground shadow-md"
                  : "hover:bg-muted/80"
              }`}
            >
              {cat.label}
            </Button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {paginatedProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full flex flex-col overflow-hidden card-hover glass-effect border-0 shadow-lg">
                <div className="relative h-48 sm:h-52 lg:h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={480}
                    height={288}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    quality={82}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                      onClick={() => setSelectedProject(project)}
                    >
                      Details
                    </Button>
                    {project.demo && project.demo !== "#" && (
                      <Button variant="secondary" size="sm" className="gap-1" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          Live <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    )}
                    {project.github && project.github !== "https://github.com/csmtalha" && (
                      <Button variant="secondary" size="sm" className="gap-1" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          Code <Github className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <CardContent className="flex-grow p-6">
                  <h3 className="text-xl font-bold mb-3 text-glow">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="px-2 py-1 text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 sm:gap-4 mt-10"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Button>
            <span className="text-sm text-muted-foreground px-2">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}

        <ProjectDetailModal
          project={selectedProject}
          open={!!selectedProject}
          onOpenChange={(open) => !open && setSelectedProject(null)}
        />
      </motion.div>
    </section>
  );
}
