"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const STATS = [
  { value: "30+", label: "Projects Delivered" },
  { value: "5+", label: "Years Experience" },
  { value: "10+", label: "Technologies Used" },
  { value: "Startups • SaaS • Enterprise", label: "" },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
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
    hidden: { y: 12, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section
      id="stats"
      className="w-full py-12 md:py-16 bg-muted/20 border-y border-border/50"
    >
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        animate={controls}
      >
        <motion.p
          variants={itemVariants}
          className="text-center text-sm font-semibold uppercase tracking-wider text-primary mb-8"
        >
          By The Numbers
        </motion.p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
          {STATS.map((stat) => (
            <motion.div key={stat.label || stat.value} variants={itemVariants}>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">
                {stat.value}
              </div>
              {stat.label && (
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
