"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import profilePic from "@/public/images/profilepic_1.1.jpeg";

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
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="hero"
      className="w-full min-h-screen  flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16"
        variants={containerVariants}
        animate={controls}
      >
        <div className="flex-1 space-y-8">
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">
              <span className="gradient-text-animated">Talha Saleem</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-2 text-glow">
              Senior Software Engineer
            </h2>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">
                Available for opportunities
              </span>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
           Next.js SaaS Frontend Developer helping startups and businesses build modern websites, dashboards, and landing pages with clean UI and fast performance.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              variant="outline"
              className="glass-effect hover:scale-105 transition-transform duration-300"
              asChild
            >
              <Link href="#projects">
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              asChild
            >
              <Link href="#contact">
                Contact Me <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* <motion.div variants={itemVariants} className="flex gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/csmtalha"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://linkedin.com/in/csmtalha/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
          </motion.div> */}
        </div>

        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-sm md:max-w-md aspect-square"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 via-purple-500/20 to-blue-500/20 blur-3xl animate-pulse-glow"></div>
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl animate-float">
            <Image
              src={profilePic}
              alt="Talha Saleem"
              width={700}
              height={700}
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          {/* Floating elements around the image */}
          <div
            className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-float"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500/20 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 -right-8 w-4 h-4 bg-blue-500/20 rounded-full animate-float"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </motion.div>
      </motion.div>
    </section>
  );
}
