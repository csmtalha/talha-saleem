"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
    hidden: { y: 16, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="about"
      className="w-full bg-gradient-to-b from-muted/10 to-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-dots-pattern opacity-[0.02]" />
      <motion.div
        ref={ref}
        className="section-container relative z-10 max-w-3xl mx-auto text-center"
        variants={containerVariants}
        animate={controls}
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text"
        >
          About Talha
        </motion.h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mb-8" />
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground leading-relaxed mb-6"
        >
          Talha is a Lead Full Stack Engineer with 5+ years of experience building scalable SaaS
          products. Most recently, he led the development of a multi-tenant mortgage platform from
          scratch to production—architecture, RBAC, Stripe billing, AI integration, and AWS
          infrastructure. Real customers use it daily.
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground leading-relaxed"
        >
          He works best with founder-led teams where shipping fast and building things that last
          both matter. He is remote, available for PST overlap, and can start contributing from week
          one.
        </motion.p>
      </motion.div>
    </section>
  );
}
