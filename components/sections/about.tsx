"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
        staggerChildren: 0.1,
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
      id="about"
      className="w-full bg-gradient-to-b from-background to-muted/10 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dots-pattern opacity-[0.02]"></div>
      <div className="absolute top-1/3 right-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-20 w-56 h-56 bg-purple-500/5 rounded-full blur-3xl"></div>

      <motion.div
        ref={ref}
        className="section-container relative z-10"
        variants={containerVariants}
        animate={controls}
      >
        <motion.div
          variants={itemVariants}
          className="mb-12 md:mb-16 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div variants={itemVariants} className="space-y-8">
            <motion.p
              className="text-lg leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              I am a{" "}
              <span className="font-semibold gradient-text">
                highly driven Senior Frontend Developer
              </span>{" "}
              with over extensive years of hands-on experience specializing in React.js,
              Next.js, and Tailwind CSS.
            </motion.p>
            <motion.p
              className="text-lg leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              My expertise lies in building high-performance user interfaces,
              integrating complex APIs, deploying scalable applications via
              Vercel, and leading frontend projects from concept to launch. I
              excel at collaborating within cross-functional teams and crafting
              elegant, maintainable solutions.
            </motion.p>
            <motion.p
              className="text-lg leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              I am passionate about continuously improving development workflows
              and staying at the cutting edge of web development technologies.
              My goal is to create digital experiences that are not only
              visually stunning but also technically excellent and scalable.
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
            <Card className="card-hover glass-effect border-0 shadow-lg overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6 gradient-text">
                  Core Expertise
                </h3>
                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    "React.js",
                    "Next.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "Node.js",
                    "NestJS",
                    "Python",
                    "PostgreSQL",
                    "Vercel",
                    "Git/GitHub",
                    "WordPress",
                    "Shopify",
                  ].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Badge
                        variant="secondary"
                        className="px-3 py-2 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-6 gradient-text">
                  Quick Facts
                </h3>
                <ul className="space-y-4">
                  {[
                    "Over extensive years of hands-on development experience",
                    "Proven expertise in building high-performance user interfaces",
                    "Bachelor's in Computer Science from University of Lahore",
                    "Employee of the Year (2024) at CloudPacer",
                    "Passionate about crafting elegant, maintainable solutions",
                  ].map((fact, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-primary mr-3 text-lg">•</span>
                      <span className="leading-relaxed">{fact}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
