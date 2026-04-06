"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const HIGHLIGHTS = [
  "Lead Full Stack Engineer - React, Next.js, Vue.js, Node.js, NestJS, AWS",
  "Led multi-tenant mortgage SaaS from scratch: architecture, RBAC, Stripe, AI, AWS",
  "Built 30+ production websites and applications across SaaS, startups, and enterprise",
  "Strong focus on scalable systems, performance, and shipping with founder-led teams",
  "WordPress, Shopify, Django, and legacy migrations - remote, PST overlap",
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
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { x: -16, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
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
        <motion.div
          variants={itemVariants}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Career Snapshot
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Why work with Talha, his experience, scope of work, and what he brings to your team or project.
          </p>
        </motion.div>

        <ul className="max-w-3xl mx-auto space-y-4">
          {HIGHLIGHTS.map((item, i) => (
            <motion.li
              key={i}
              variants={itemVariants}
              className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/20 hover:bg-card/80 transition-colors duration-300"
            >
              <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <span className="text-foreground/90 leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
