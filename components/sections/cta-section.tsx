"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin } from "lucide-react";

export default function CtaSection() {
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
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="cta"
      className="w-full bg-gradient-to-b from-muted/20 to-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <motion.div
        ref={ref}
        className="section-container relative z-10 text-center max-w-2xl mx-auto"
        variants={containerVariants}
        animate={controls}
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 gradient-text"
        >
          Let&apos;s Build Something Great
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground mb-10 leading-relaxed"
        >
          If you&apos;re looking for a Lead Full Stack Engineer to ship scalable SaaS, multi-tenant platforms, or modern digital products—let&apos;s talk.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button size="lg" className="gap-2" asChild>
            <a href="mailto:csmtalha@gmail.com">
              <Mail className="h-5 w-5" />
              Email
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2 glass-effect" asChild>
            <a
              href="https://github.com/csmtalha"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2 glass-effect" asChild>
            <a
              href="https://linkedin.com/in/csmtalha/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
