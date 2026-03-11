"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Layers, Code2, Zap, Users, Activity } from "lucide-react";

const RESPONSIBILITIES = [
  {
    icon: Layers,
    title: "Frontend architecture design",
    description: "Designing scalable, maintainable frontend systems and component libraries.",
  },
  {
    icon: Code2,
    title: "Reusable component systems",
    description: "Building design systems and shared components for consistency and velocity.",
  },
  {
    icon: Zap,
    title: "API integration",
    description: "Integrating REST and other APIs with robust error handling and types.",
  },
  {
    icon: Activity,
    title: "Performance optimization",
    description: "Improving load times, Core Web Vitals, and runtime performance.",
  },
  {
    icon: Users,
    title: "Cross-functional collaboration",
    description: "Working with product, design, and backend teams to ship features.",
  },
];

export default function EngineeringExperience() {
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
    hidden: { y: 16, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="engineering-experience"
      className="w-full bg-gradient-to-b from-muted/20 to-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <motion.div
        ref={ref}
        className="section-container relative z-10"
        variants={containerVariants}
        animate={controls}
      >
        <motion.div
          variants={itemVariants}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Engineering Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            As a Senior Software Engineer, Talha focuses on frontend architecture,
            component systems, APIs, performance, and collaboration.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESPONSIBILITIES.map((item) => (
            <motion.div key={item.title} variants={itemVariants}>
              <Card className="h-full border border-border/50 bg-card/50 hover:border-primary/20 hover:bg-card/80 transition-colors">
                <CardContent className="p-6 flex gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 h-fit text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
