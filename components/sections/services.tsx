"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const PACKAGES = [
  {
    tag: "Package 01",
    title: "AI Automation Sprint",
    problem:
      "Your team answers the same 40 questions a week. Your HR policy lives in a PDF no one reads. Your field agents copy data between three systems by hand. I automate the pipeline.",
    includes: [
      "Process and workflow audit (up to 3 workflows)",
      "AI pipeline design using GPT-4o or Claude",
      "Integration with your existing tools - Slack, Google Workspace, Notion, Sheets, HubSpot",
      "Serverless deployment on AWS Lambda or Vercel",
      "Handoff documentation and admin training session",
    ],
    for: "Operations-heavy SMBs, HR teams, logistics coordinators, loan processors",
  },
  {
    tag: "Package 02",
    title: "Production SaaS Platform",
    problem:
      "You have a validated idea and a willing customer. You need a full-stack platform - not a no-code prototype that breaks at 200 users and can't be extended.",
    includes: [
      "Full architecture design and PostgreSQL schema",
      "Next.js + NestJS full-stack build",
      "Multi-tenancy with RBAC and workspace isolation",
      "Stripe billing and subscription management",
      "Admin dashboards and user management console",
      "AWS deployment with CI/CD pipeline",
    ],
    for: "SaaS founders, PE-backed operators, agencies productizing a service",
  },
  {
    tag: "Package 03",
    title: "Compliance & Fintech Platform",
    problem:
      "Off-the-shelf software wasn't built for your regulatory environment. Your team is managing FMCSA violations, SECP reporting, or loan audits in spreadsheets - and auditors are getting closer.",
    includes: [
      "Domain-specific data model and regulatory workflow design",
      "Automated reporting pipelines (SECP, FMCSA, or custom)",
      "Multi-branch / multi-tenant architecture",
      "Nightly cron jobs and full audit trail logging",
      "KYC, EMI calculation, document management",
      "Examiner-ready export formats and compliance dashboard",
    ],
    for: "Microfinance NBFCs, trucking carriers, healthcare ops teams, lenders",
  },
];

export default function Services() {
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
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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
      id="services"
      className="w-full bg-gradient-to-b from-background to-muted/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
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
            Services & Packages
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Every engagement starts with a specific business problem. I scope and deliver against outcomes - not hourly estimates.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <motion.div key={pkg.title} variants={itemVariants} className="flex">
              <Card className="h-full w-full border-0 shadow-lg glass-effect card-hover overflow-hidden group flex flex-col">
                <CardContent className="p-6 sm:p-8 flex flex-col h-full gap-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {pkg.tag}
                  </p>

                  <h3 className="text-xl font-semibold gradient-text leading-tight">
                    {pkg.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed italic">
                    &ldquo;{pkg.problem}&rdquo;
                  </p>

                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                      What&apos;s included
                    </p>
                    <ul className="space-y-2">
                      {pkg.includes.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-0.5 shrink-0 text-xs">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-1">
                      Best for
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pkg.for}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm mb-4">
            Not sure which package fits? Let&apos;s talk through your problem first - no commitment required.
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 text-primary-foreground text-sm font-semibold rounded-lg shadow-lg transition-all duration-300"
          >
            Get a Free Audit
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
