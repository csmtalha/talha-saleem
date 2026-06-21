"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectDetailModal } from "@/components/project-detail-modal";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

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
      title: "Al Ibrahim Travel",
      description: "Dynamic travel CMS with Next.js and Firebase for content management and SEO.",
      image: "/images/projects/alibrahimtravels.png",
      tags: ["Next.js", "React", "Tailwind CSS", "Firebase"],
      details:
        "Situation: The client needed a scalable travel platform to manage destinations, packages, and dynamic content with strong SEO performance.\n\nTask: Build a modern CMS-driven travel website with fast updates and optimized UX.\n\nAction: Developed a Next.js platform integrated with Firebase services including Firestore, Cloud Functions, and Hosting. Implemented responsive UI, optimized routing, and structured content for SEO.\n\nResult: Delivered a fast, SEO-friendly travel platform with efficient content management and scalable architecture.",
      github: "https://github.com/csmtalha",
      demo: "https://www.alibrahimtravel.com/",
      category: "webapps",
    },
    {
      title: "Creexio",
      description: "Modern web application built with React and Next.js for scalability and performance.",
      image: "/images/projects/creexio.png",
      tags: ["React", "Next.js", "TypeScript"],
      details:
        "Situation: The business required a modern web application to present services professionally while supporting future product growth.\n\nTask: Build a scalable and maintainable web platform with strong performance and responsive UI.\n\nAction: Developed the application using React and Next.js with TypeScript. Designed reusable components, optimized layout responsiveness, and ensured clean architecture for maintainability.\n\nResult: Delivered a fast, scalable web application with a professional interface and improved user experience.",
      github: "https://github.com/csmtalha",
      demo: "https://www.creexio.com/",
      category: "webapps",
    },
    {
      title: "Regent",
      description: "Web platform for operational planning, logistics, and ship navigation with interactive maps.",
      image: "/images/projects/regent.png",
      tags: ["React.js", "Leaflet.js", "Logistics", "Route Planning"],
      details:
        "Situation: Logistics teams needed a platform to manage operations, routes, and ship navigation with spatial visualization.\n\nTask: Build an operational web platform with interactive maps and route planning capabilities.\n\nAction: Developed the platform using React.js and integrated Leaflet.js for interactive mapping and spatial visualization. Implemented features for route planning, vehicle tracking, and logistics management.\n\nResult: Delivered a functional operations platform enabling efficient planning, navigation, and route visualization.",
      github: "https://github.com/csmtalha",
      demo: "#",
      category: "webapps",
    },
    // {
    //   title: "Assignment Assistance",
    //   description: "Next.js application for assignment assistance, streamlined workflows and modern UX.",
    //   image: "/images/projects/assignment.png",
    //   tags: ["Next.js", "React", "TypeScript"],
    //   details:
    //     "Situation: Students needed a streamlined platform to request academic assistance with efficient workflows.\n\nTask: Develop a modern application with clear user flows and scalable frontend architecture.\n\nAction: Built the platform using Next.js, React, and TypeScript with clean UI components and optimized workflows for submissions and tracking.\n\nResult: Delivered a user-friendly platform with improved navigation, clear workflows, and scalable architecture.",
    //   github: "https://github.com/csmtalha",
    //   demo: "#",
    //   category: "webapps",
    // },
    // {
    //   title: "Solumatic Solution",
    //   description: "Custom solution platform built with modern web technologies.",
    //   image: "/images/projects/solumatic.png",
    //   tags: ["Next.js", "React", "Web Application"],
    //   details:
    //     "Situation: The organization required a custom web solution to manage internal workflows and digital operations.\n\nTask: Build a reliable and scalable web platform with maintainable architecture.\n\nAction: Developed the application using modern web technologies including Next.js and React, focusing on modular components, performance, and clear user flows.\n\nResult: Delivered a scalable platform with maintainable codebase and improved operational efficiency.",
    //   github: "https://github.com/csmtalha",
    //   demo: "#",
    //   category: "webapps",
    // },
    {
      title: "Mortgage Buddy",
      description: "AI chatbot for mortgage customers, lead qualification and support at scale with multi-tenant SaaS.",
      image: "/images/projects/mortgagemvp.png",
      tags: ["Next.js", "Tailwind CSS", "ShadCN UI", "PostgreSQL", "Prisma", "Vercel", "SaaS"],
      details:
        "Situation: Mortgage companies needed an automated way to qualify leads and handle high volumes of customer inquiries.\n\nTask: Build a scalable SaaS chatbot platform supporting multiple investors and organizations.\n\nAction: Developed a multi-tenant chatbot system using Next.js, PostgreSQL, and Prisma. Implemented role-based access, admin dashboards, third-party chatbot API integrations, and REST APIs.\n\nResult: Delivered an enterprise SaaS chatbot platform enabling automated lead qualification, customer support, and scalable multi-tenant management.",
      github: "https://github.com/csmtalha",
      demo: "#",
      category: "webapps",
    },
    {
      title: "MedNotes",
      description: "Converts doctor–patient conversations into structured medical reports. AI-powered documentation.",
      image: "/images/projects/mednotemvp.png",
      tags: ["MVP", "AI", "Healthcare", "Documentation"],
      details:
        "Situation: Doctors spend significant time manually documenting patient conversations into formal medical records.\n\nTask: Create an AI-powered solution to convert doctor–patient conversations into structured reports.\n\nAction: Designed an MVP system that processes conversation data and transforms it into structured medical documentation aligned with clinical workflows.\n\nResult: Delivered a prototype healthcare documentation tool that reduces manual work and improves reporting efficiency.",
      github: "https://github.com/csmtalha",
      demo: "#",
      category: "webapps",
    },
    {
      title: "Loan Management System (LMS)",
      description: "Multi-branch LMS for a microfinance NBFC - full loan lifecycle from borrower registration to SECP-style regulatory reporting across 14 branches.",
      image: "/images/projects/lms.png",
      tags: ["NestJS", "Next.js 16", "Prisma", "PostgreSQL", "TypeScript", "Tailwind CSS", "Multi-tenant", "SaaS"],
      details:
        "Situation: A microfinance NBFC with 14 branches and 100+ field staff needed to digitize their entire loan lifecycle, managed manually across disconnected systems.\n\nTask: Build a production-ready, multi-branch loan management platform covering every stage from borrower onboarding to regulatory reporting.\n\nAction: Delivered a 5-phase full-stack system. NestJS + Prisma + PostgreSQL API with JWT/Passport auth and role-based guards. Next.js 16 App Router frontend with Zustand and Recharts. Phases covered: branch/staff/borrower management with KYC document upload; loan product configuration, multi-level approval, disbursement, EMI calculation, and PDF agreement generation; payment collection with PAR bucket tracking and nightly overdue-detection cron; dashboard KPIs, branch comparison, officer performance, and SECP compliance reports with Excel/PDF exports; searchable audit trail with SMS notifications.\n\nResult: A complete, production-grade LMS handling the full loan lifecycle across 14 branches with regulatory-ready exports, automated overdue detection, and clean branch-scoped multi-tenant architecture.",
      github: "https://github.com/csmtalha",
      demo: "#",
      category: "webapps",
    },
    {
      title: "Neblo AI - Marketing Site",
      description: "Full marketing website for an AI-powered freight broker automation platform, built with Next.js 16, Sanity CMS, and Framer Motion.",
      image: "/images/projects/neblo-ai.png",
      tags: ["Next.js 16", "Tailwind CSS v4", "Framer Motion", "Sanity CMS", "Resend", "Vercel", "ISR", "SSG"],
      details:
        "Situation: Neblo AI, an early-stage freight broker automation startup, needed a complete marketing website balancing brand storytelling, SEO performance, and developer experience.\n\nTask: Design and build the full marketing site from scratch - Home, Features, Copilot, Blog, FAQ, Contact, Privacy, and Terms pages.\n\nAction: Built with Next.js 16 App Router and Turbopack, Tailwind CSS v4, and deployed on Vercel. Kept all page.tsx files as pure server components by isolating Framer Motion v12 animations in dedicated client components - achieving scroll-triggered animations with zero hydration tax. Integrated Sanity CMS for the blog with ISR and live webhooks so new posts go live within seconds of publishing in Sanity Studio without a rebuild. Added Resend for transactional email and an auto-generated sitemap that dynamically includes all blog posts for full SEO coverage.\n\nResult: Delivered a fully static, SEO-optimized marketing site with best-in-class performance, a live CMS-driven blog, and a clean architecture that separates server and client concerns.",
      github: "https://github.com/csmtalha",
      demo: "https://neblo.ai",
      category: "webapps",
    },
    {
      title: "Google Chat HR Assistant",
      description: "AI-powered HR bot inside Google Chat - answers leave, payroll, and policy questions live from Google Sheets and Notion.",
      image: "/images/projects/google-chat-hr-bot.png",
      tags: ["Google Apps Script", "OpenAI GPT-4o", "Notion API", "Google Sheets", "Google Chat", "AI Automation"],
      details:
        "Situation: Cloudpacer employees had to manually look up HR policies, leave balances, and payroll info across disconnected tools, causing delays and repeated questions to HR staff.\n\nTask: Build an AI-powered HR assistant that lives inside Google Chat - no external apps, no dashboards, no new logins.\n\nAction: Built a fully serverless system using 6 modular Google Apps Script files. Integrated Google Sheets for live employee and leave data, Notion API as an HR knowledge base, and a 2-call OpenAI GPT-4o-mini pipeline - the first call extracts smart search queries from the user's question, the second answers using real policy content. Rendered responses as interactive Google Chat Cards v2 with buttons and quick replies. Handled JWT-based service account auth, merged-header column mapping in Sheets, Excel serial date timezone corrections, and Notion's verbatim title search limitations.\n\nResult: Delivered a production HR assistant where employees get instant answers to leave balances, salary info, WFH policy, payroll dates, and benefits - entirely inside a tool they already use, with zero frontend or deployment overhead.",
      github: "https://github.com/csmtalha",
      demo: "#",
      category: "webapps",
    },
    {
      title: "Fleet Safety & FMCSA Compliance Platform",
      description: "Full-stack SaaS for trucking companies to monitor CSA scores, manage DataQs cases, and stay FMCSA compliant.",
      image: "/images/projects/fleetsafety.png",
      tags: ["NestJS", "React", "TypeScript", "PostgreSQL", "TypeORM", "Tailwind CSS", "SaaS", "Multi-tenant"],
      details:
        "Situation: Trucking carriers struggled to manage FMCSA compliance, monitor CSA/BASIC scores, and handle DataQs disputes through fragmented manual processes.\n\nTask: Build a multi-tenant SaaS platform translating complex federal regulations into workflows carriers could actually use.\n\nAction: Developed a full-stack platform with NestJS, TypeORM, and PostgreSQL on the backend and React + TypeScript + Tailwind CSS on the frontend. Implemented multi-tenant architecture with JWT authentication and rotating refresh tokens, separate portals for GEIA staff and carrier clients, DataQs and CPDP case management with evidence uploads, corrective action plan tracking, and automated email/SMS notifications.\n\nResult: Delivered a production SaaS platform enabling trucking companies to monitor FMCSA CSA scores and BASIC percentiles, manage compliance cases end-to-end, and maintain complete audit history - reducing compliance risk through automation and domain-driven software design.",
      github: "https://github.com/csmtalha",
      demo: "#",
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
      description: "Django ecommerce platform with product catalog, cart, and checkout.",
      image: "/images/projects/Bigeq.png",
      tags: ["Django", "Python", "E-commerce", "PostgreSQL"],
      details:
        "Situation: The client required a custom ecommerce platform with full control over backend functionality.\n\nTask: Develop a scalable ecommerce system with product management and checkout features.\n\nAction: Built the platform using Django and PostgreSQL, implementing product catalog, cart, checkout, and admin management.\n\nResult: Delivered a scalable ecommerce backend capable of supporting future integrations and frontend applications.",
      github: "https://github.com/csmtalha",
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
        "Situation: The legacy insurance platform built in PHP faced performance and maintainability limitations.\n\nTask: Modernize the application with a scalable frontend framework.\n\nAction: Migrated the system to Next.js, refactoring legacy code, improving routing, and optimizing frontend performance.\n\nResult: Delivered a modernized platform with improved performance, scalability, and user experience.",
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
            Web applications, WordPress sites, and Shopify stores, with live links and technologies used.
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
