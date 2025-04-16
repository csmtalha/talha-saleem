"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import profilePic from "@/public/images/profile1.jpeg";

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
    <section className="w-full min-h-screen mt-10 flex items-center justify-center bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
      </div>

      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 z-10 flex flex-col md:flex-row items-center justify-between gap-12"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="flex-1 space-y-8">
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="gradient-text">Talha Saleem</span>
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              Full-Stack Developer
            </h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl"
          >
            Crafting exceptional digital experiences with modern web
            technologies. Specializing in{" "}
            <span className="font-semibold text-primary">React</span>,
            <span className="font-semibold text-primary"> Next.js</span>, and
            <span className="font-semibold text-primary"> WordPress</span>{" "}
            development.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="#projects">
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#contact">
                Contact Me <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {/* <Button size="lg" variant="outline" asChild>
              <a href="/resume.pdf" download>
                Download CV <Download className="ml-2 h-4 w-4" />
              </a>
            </Button> */}
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4">
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
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-md aspect-square"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-primary/10 blur-3xl"></div>
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
            <Image
              src={profilePic}
              alt="Talha Saleem"
              width={600}
              height={600}
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
