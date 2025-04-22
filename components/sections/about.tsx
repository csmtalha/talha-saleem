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
    <section id="about" className="w-full  bg-background">
      <motion.div
        ref={ref}
        className="section-container"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-lg">
              I'm a{" "}
              <span className="font-semibold text-primary">
                highly skilled Software Engineer
              </span>{" "}
              with over extensive years of professional experience specializing
              in modern front-end and full-stack development.
            </p>
            <p className="text-lg">
              My expertise lies in building scalable, high-performance web
              applications with component-based architecture, advanced state
              management, and modern frameworks. I excel at creating intuitive,
              accessible, and engaging user experiences across all devices.
            </p>
            <p className="text-lg">
              I'm passionate about clean code, performance optimization, and
              staying at the cutting edge of web development technologies. My
              goal is to create digital experiences that are not only visually
              stunning but also technically excellent.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-2 border-primary/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Core Expertise</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "React.js",
                    "Next.js",
                    "TypeScript",
                    "TailwindCSS",
                    "WordPress",
                    "Node.js",
                    "UI/UX Design",
                    "Performance Optimization",
                    "Responsive Design",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="px-3 py-1 text-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>
                      Extensive years of professional development experience
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Worked with clients across multiple industries</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>
                      Bachelor's in Computer Science from University of Lahore
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Employee of the Year (2024) at CloudPacer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>
                      Passionate about creating accessible web experiences
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
