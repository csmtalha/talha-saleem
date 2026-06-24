"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Zap, ShieldCheck, Brain, Users, Code2, Clock } from "lucide-react";

const REASONS = [
  {
    icon: Zap,
    title: "Ship Fast",
    description:
      "MVPs in 2–4 weeks. Full SaaS platforms in 6–10. No discovery theater, no bloated sprints - scoped tight, built lean, deployed to production.",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    icon: Brain,
    title: "Domain Expertise",
    description:
      "Six industries deep - fintech, freight, healthcare, real estate, e-commerce, HR tech. I understand the regulatory constraints, data models, and edge cases before writing a line of code.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Production-Ready by Default",
    description:
      "Multi-tenancy, RBAC, audit trails, nightly crons, and examiner-ready exports are first-class citizens - not afterthoughts bolted on before launch.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: Users,
    title: "No Juniors. No Handoffs.",
    description:
      "You talk directly to the engineer building your product. Every decision, every tradeoff, every line of code - owned end-to-end by a senior who has shipped to real clients.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Code2,
    title: "Full-Stack, Truly",
    description:
      "NestJS APIs, Next.js frontends, PostgreSQL schemas, AWS deployments, Stripe billing, CI/CD - one engineer across the entire stack, not a frontend dev pretending.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Clock,
    title: "PST Overlap. Fast Replies.",
    description:
      "Based in Lahore, available with US/EU timezone overlap. Async-first but responsive - most messages answered within a few hours, not a few days.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

export default function WhyTalha() {
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
    visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="why-talha"
      className="w-full bg-gradient-to-b from-muted/20 to-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />

      <motion.div
        ref={ref}
        className="section-container relative z-10"
        variants={containerVariants}
        animate={controls}
      >
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Why Work With Talha?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Most developers can write code. Few can take a business problem from whiteboard to production without losing what matters along the way.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="h-full glass-effect rounded-2xl border border-border/50 p-6 sm:p-8 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className={`w-12 h-12 rounded-xl ${reason.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`h-6 w-6 ${reason.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
