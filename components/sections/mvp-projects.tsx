"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MVP_PROJECTS = [
  {
    title: "Datalyze",
    description:
      "Self-serve analytics SaaS - upload any file, get AI-powered charts and insights instantly. Stripe billing, three-tier subscriptions, OpenAI GPT-4.",
    image: "/images/projects/datalyzer.png",
    tags: ["Next.js", "Supabase", "OpenAI GPT-4", "Stripe", "Recharts", "Plotly.js", "TypeScript", "SaaS"],
    details:
      "Users upload CSV, XLSX, PDF, DOCX, JSON files and receive auto-generated charts, correlation analysis, outlier detection, and GPT-4 trend summaries. Stripe handles Free / Pro ($12/mo) / Team ($29/mo) plans with per-user usage limits, file size gates, and PDF/Excel export. Supabase Auth with Google OAuth and server-side session refresh.",
  },
  {
    title: "RecruitIQ",
    description:
      "Multi-tenant AI recruitment platform - resume parsing, candidate ranking, Kanban pipeline, RAG HR chatbot, onboarding workflows, and analytics.",
    image: "/images/projects/reqiq.png",
    tags: ["Next.js 15", "FastAPI", "PostgreSQL", "pgvector", "GPT-4o", "LangChain", "Docker", "RBAC"],
    details:
      "7 production feature systems in one platform. GPT-4o parses resumes from PDF/DOCX, scores candidates against job descriptions, and ranks them by match percentage. Kanban drag-and-drop pipeline. RAG chatbot ingests policy PDFs and answers HR questions with source citations via pgvector + LangChain. Onboarding templates with task tracking. Time-to-hire analytics with CSV export. Full RBAC with 4 roles.",
  },
  {
    title: "MedNotes",
    description:
      "Records doctor–patient visits via browser audio, transcribes with Whisper, and generates structured SOAP notes with ICD-10 codes automatically.",
    image: "/images/projects/mednotemvp.png",
    tags: ["Next.js", "FastAPI", "OpenAI Whisper", "GPT-4", "PostgreSQL", "Docker", "Cloud Run", "Healthcare AI"],
    details:
      "Browser-based audio recording → Whisper transcription → GPT-4 SOAP note generation with ICD-10/CPT codes, medication warnings, and risk alerts. Full patient management with visit history. JWT auth with bcrypt. Deployed on Vercel + Cloud Run via Docker. Physicians get a complete structured clinical record from one voice recording.",
  },
];

export default function MvpProjects() {
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
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="mvp-projects"
      className="w-full bg-gradient-to-b from-background to-muted/20 relative overflow-hidden"
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
            Products & SaaS Builds
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Full production systems - monetized SaaS, AI platforms, and healthcare tooling shipped end-to-end.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {MVP_PROJECTS.map((project) => (
            <motion.div key={project.title} variants={itemVariants}>
              <Card className="h-full border-0 shadow-lg glass-effect card-hover overflow-hidden">
                <div className="relative h-44 sm:h-52 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl font-semibold mb-2 gradient-text">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-primary/10 text-primary border-primary/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.details}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
