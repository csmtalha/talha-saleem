"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Download, ExternalLink, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import profilePic from "@/public/images/hero-dp.png";

const INDUSTRIES = [
  "SaaS Platforms",
  "Fintech & Compliance",
  "Freight & Logistics",
  "Healthcare Tech",
  "E-commerce",
];

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="hero"
      className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20"
        variants={containerVariants}
        animate={controls}
      >
        {/* Left */}
        <div className="flex-1 space-y-6 text-center lg:text-left">

          {/* Status */}
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Available for remote work · PST overlap
            </span>
          </motion.div>

          {/* Name + tagline */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="gradient-text-animated">Talha Saleem</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground/90 leading-tight">
              I build SaaS products that{" "}
              <span className="gradient-text">ship, scale, and stick.</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Lead Full Stack Engineer · React · Next.js · NestJS · AWS · WordPress & Shopify
            </p>
          </motion.div>

          {/* Pitch */}
          <motion.div
            variants={itemVariants}
            className="space-y-3 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed mx-auto lg:mx-0"
          >
            <p>
              5+ years building production SaaS - most recently led a multi-tenant mortgage platform
              from zero to production: architecture, RBAC, Stripe, AI, and AWS. Real customers use it daily.
            </p>
            <p>
              I work best with founder-led teams where shipping fast and building things that last both matter.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="#case-studies">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="glass-effect" asChild>
              <Link href="#contact" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Work With Me
              </Link>
            </Button>

            {/* Resume */}
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline" className="glass-effect">
                  <FileText className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full h-[90vh] flex flex-col p-0 gap-0">
                <DialogHeader className="flex flex-row items-center justify-between px-5 py-3 border-b shrink-0">
                  <DialogTitle className="text-base font-semibold">Talha Saleem — Frontend CV</DialogTitle>
                  <a
                    href="/files/talha-saleem-cv-frontend.pdf"
                    download="Talha-Saleem-CV.pdf"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </a>
                </DialogHeader>
                <iframe
                  src="/files/talha-saleem-cv-frontend.pdf#toolbar=0&navpanes=0"
                  className="flex-1 w-full rounded-b-lg"
                  title="Talha Saleem CV"
                />
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Recent launch */}
          <motion.div variants={itemVariants}>
            <a
              href="https://neblo.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                Latest
              </span>
              <span>Just shipped neblo.ai - AI freight broker platform</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>

          {/* Industry trust bar */}
          <motion.div variants={itemVariants} className="pt-1">
            <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-2 text-center lg:text-left">
              Industries served
            </p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {INDUSTRIES.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full bg-muted/60 text-xs text-muted-foreground border border-border/50"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="sr-only" aria-hidden>
            Lead Full Stack Engineer · SaaS · Multi-tenant · React · Next.js · Vue.js · Node.js · NestJS · AWS
          </div>
        </div>

        {/* Right: Photo */}
        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-sm md:max-w-md aspect-square shrink-0"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 via-purple-500/20 to-blue-500/20 blur-3xl animate-pulse-glow" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
            <Image
              src={profilePic}
              alt="Talha Saleem - Lead Full Stack Engineer"
              width={400}
              height={400}
              sizes="(max-width: 768px) 384px, 448px"
              className="object-cover w-full h-full"
              priority
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Floating badge: experience */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.4 }}
            className="absolute -bottom-4 -left-4 bg-background border border-border shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
              5+
            </div>
            <div>
              <p className="text-xs text-muted-foreground leading-none">Years building</p>
              <p className="text-sm font-semibold leading-tight">SaaS products</p>
            </div>
          </motion.div>

          {/* Floating badge: projects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            className="absolute -top-4 -right-4 bg-background border border-border shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 font-bold">
              30+
            </div>
            <div>
              <p className="text-xs text-muted-foreground leading-none">Products</p>
              <p className="text-sm font-semibold leading-tight">shipped</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
