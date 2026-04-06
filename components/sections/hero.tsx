"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Mail, Phone } from "lucide-react";
import Link from "next/link";
import profilePic from "@/public/images/herodp.png";

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
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
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="gradient-text-animated">Talha Saleem</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/90 font-medium">
              Lead Full Stack Engineer
            </p>
            <p className="text-sm text-muted-foreground">
              React · Next.js · Vue.js · Node.js · NestJS · AWS · WordPress & Shopify
            </p>
            <p className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1 text-sm text-muted-foreground pt-1">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Available for remote (PST)
              </span>
              <span aria-hidden className="text-muted-foreground/50">·</span>
              <span>📍 Lahore, Pakistan</span>
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="space-y-4 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed mx-auto lg:mx-0 text-center lg:text-left"
          >
            <p>
              I am a Lead Full Stack Engineer with 5+ years of experience building scalable SaaS
              products. Most recently, I led the development of a multi-tenant mortgage platform from
              scratch to production—handling architecture, RBAC, Stripe billing, AI integration, and
              AWS infrastructure. Real customers use it daily.
            </p>
            <p>
              I work best with founder-led teams where shipping fast and building things that last
              both matter. I am remote, available for PST overlap, and can start contributing from
              week one.
            </p>
          </motion.div>

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
                View Case Studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="glass-effect" asChild>
              <Link href="#contact" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Hire Me
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="glass-effect" asChild>
              <Link href="#contact" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Book a Call
              </Link>
            </Button>
            {/* <Button size="lg" variant="outline" className="glass-effect" asChild>
              <Link href="#contact" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Me
              </Link>
            </Button> */}
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xs text-muted-foreground/80 pt-1 max-w-md mx-auto lg:mx-0"
          >
            5+ years experience · SaaS · Multi-tenant · Founder-led teams
          </motion.p>

          {/* SEO: hidden keywords for recruiters */}
          <div className="sr-only" aria-hidden>
            Lead Full Stack Engineer • SaaS • Multi-tenant • React • Next.js • Vue.js • Node.js • NestJS • AWS
          </div>
        </div>

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
        </motion.div>
      </motion.div>
    </section>
  );
}
