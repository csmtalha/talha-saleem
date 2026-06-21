"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MVP_PROJECTS = [
  // {
  //   title: "Mortgage Industry Chatbot",
  //   description:
  //     "AI chatbot designed to help mortgage customers with questions and lead qualification.",
  //   image: "/images/projects/mortgagemvp.png",
  //   tags: ["Next.js", "Tailwind CSS", "ShadCN UI", "PostgreSQL", "Prisma", "Vercel", "SaaS"],
  //   details:
  //     "Full-featured mortgage chatbot with multi-tenant architecture, admin dashboard, and role-based access. Integrated third-party chatbot APIs and custom REST APIs. Deployed on Vercel as an enterprise SaaS solution.",
  // },
  {
    title: "MedNotes",
    description:
      "System that converts doctor–patient conversations into structured medical reports.",
    image: "/images/projects/mednotemvp.png",
    tags: ["MVP", "AI", "Healthcare", "Documentation"],
    details:
      "Turns doctor–patient conversations into structured, formal medical reports. Streamlines documentation and supports clinical workflow.",
  },
  {
    title: "Loan Management System (LMS)",
    description:
      "Multi-branch loan management platform for a microfinance NBFC — covers the full lifecycle from KYC to SECP-style regulatory reporting.",
    image: "/images/projects/lms.png",
    tags: ["NestJS", "Next.js 16", "Prisma", "PostgreSQL", "TypeScript", "Multi-tenant", "@nestjs/schedule"],
    details:
      "5-phase system across 14 branches and 100+ field staff. Covers borrower registration, KYC, loan origination, multi-level approval, disbursement, EMI calculation, PAR bucket collections, nightly overdue cron, Excel/PDF regulatory exports, and a searchable audit trail.",
  },
  {
    title: "Fleet Safety & FMCSA Compliance Platform",
    description:
      "Full-stack SaaS that helps trucking carriers monitor CSA scores, manage DataQs cases, and stay FMCSA compliant.",
    image: "/images/projects/fleetsafety.png",
    tags: ["NestJS", "React", "TypeScript", "PostgreSQL", "Multi-tenant", "SaaS", "FMCSA"],
    details:
      "Multi-tenant compliance platform with separate portals for staff and carriers. Covers DataQs and CPDP case management, evidence uploads, corrective action tracking, audit history, and automated email/SMS notifications. JWT auth with rotating refresh tokens.",
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
            MVP & Innovation Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Startup and innovation work, from chatbots to healthcare documentation.
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
