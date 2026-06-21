"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Rocket, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

const AUDIENCES = [
  {
    icon: Trophy,
    tag: "For Hiring Teams",
    title: "A Lead Engineer Who Owns the Outcome",
    description:
      "Led a multi-tenant SaaS from zero to production — architecture, RBAC, Stripe, AI integration, and AWS infrastructure. I don't just write features; I own the system. Available from week one, PST overlap.",
    cta: "View Experience",
    href: "#engineering-experience",
    color: "from-primary/20 to-purple-500/20",
    iconColor: "text-primary bg-primary/10",
  },
  {
    icon: Rocket,
    tag: "For Startups & Founders",
    title: "MVP to Production, Fast",
    description:
      "30+ products shipped across SaaS, compliance platforms, marketplaces, and marketing sites. I move fast, write clean code, and I'm still there after launch when things need fixing.",
    cta: "See Case Studies",
    href: "#case-studies",
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-600 dark:text-green-400 bg-green-500/10",
  },
  {
    icon: Layers,
    tag: "For Clients & Agencies",
    title: "One Engineer, the Whole Stack",
    description:
      "React, Next.js, NestJS, WordPress, Shopify, AWS — I handle the full stack so you don't need five contractors. Clear communication, consistent delivery, no surprises.",
    cta: "View Services",
    href: "#services",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-600 dark:text-blue-400 bg-blue-500/10",
  },
];

export default function CareerSnapshot() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <section
      id="career-snapshot"
      className="w-full bg-gradient-to-b from-muted/20 to-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-dots-pattern opacity-[0.02]" />
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
            Whether you're hiring, building a product, or need a reliable engineer — here's the case.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {AUDIENCES.map((a) => (
            <motion.div key={a.tag} variants={itemVariants}>
              <Card className="h-full border-0 shadow-lg glass-effect card-hover overflow-hidden group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${a.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <CardContent className="relative z-10 p-6 sm:p-8 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`rounded-xl p-3 shrink-0 ${a.iconColor}`}>
                      <a.icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-1">
                      {a.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 gradient-text">{a.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm flex-1">{a.description}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-6 self-start px-0 hover:px-3 transition-all duration-200 gap-1 text-primary"
                    asChild
                  >
                    <Link href={a.href}>
                      {a.cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
