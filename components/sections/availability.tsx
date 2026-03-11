"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar, Code2, Rocket } from "lucide-react";

const AVAILABLE_FOR = [
  { icon: Briefcase, label: "Remote full-time roles" },
  { icon: Code2, label: "Freelance development" },
  { icon: Calendar, label: "SaaS frontend development" },
  { icon: Rocket, label: "Startup MVP builds" },
];

export default function Availability() {
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
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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
      id="availability"
      className="w-full bg-gradient-to-b from-background to-muted/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-dots-pattern opacity-[0.02]" />
      <motion.div
        ref={ref}
        className="section-container relative z-10"
        variants={containerVariants}
        animate={controls}
      >
        <motion.div
          variants={itemVariants}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Available For
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mb-6" />
          <p className="text-muted-foreground max-w-xl mx-auto mb-2">
            Open to remote, freelance, and startup projects. Get in touch to start a conversation.
          </p>
          <p className="text-sm font-medium text-primary">
            📍 Lahore, Pakistan
          </p>
          <p className="text-sm text-muted-foreground">
            🕐 Available for remote work (PST overlap)
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AVAILABLE_FOR.map((item) => (
            <motion.div key={item.label} variants={itemVariants}>
              <Card className="border border-border/50 bg-card/50 hover:border-primary/20 transition-colors h-full">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
