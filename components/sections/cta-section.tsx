"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, ArrowRight } from "lucide-react";

export default function CtaSection() {
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
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <section
      id="cta"
      className="w-full bg-gradient-to-b from-muted/20 to-background relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

      <motion.div
        ref={ref}
        className="section-container relative z-10 text-center max-w-3xl mx-auto"
        variants={containerVariants}
        animate={controls}
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Open to new projects · Responds within 24 hrs
          </span>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 gradient-text leading-tight"
        >
          Ready to ship something that matters?
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground mb-4 leading-relaxed"
        >
          Whether you need a Lead Engineer to own your SaaS architecture, a reliable contractor to
          ship a product, or a technical co-builder for your startup - let&apos;s talk.
        </motion.p>

        <motion.p variants={itemVariants} className="text-sm text-muted-foreground/70 mb-10">
          No lengthy intake forms. Just email or LinkedIn - I&apos;ll reply the same day.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 shadow-lg" asChild>
            <a href="mailto:csmtalha@gmail.com">
              <Mail className="h-5 w-5" />
              Email Me
              <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2 glass-effect" asChild>
            <a href="https://linkedin.com/in/csmtalha/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2 glass-effect" asChild>
            <a href="https://github.com/csmtalha" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              GitHub
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
