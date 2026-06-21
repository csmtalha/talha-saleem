"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { BookOpen, Coffee, MapPin, Zap } from "lucide-react";

const TRAITS = [
  {
    icon: Zap,
    title: "I move fast and communicate clearly",
    body: "No disappearing acts, no vague updates. You'll always know where things stand.",
  },
  {
    icon: Coffee,
    title: "I care about the product, not just the ticket",
    body: "I'll flag if something doesn't make sense, suggest a better approach, and push back constructively.",
  },
  {
    icon: BookOpen,
    title: "I wrote a book on AI for business teams",
    body: "\"AI Productivity for Businesses: Practical Operations\" - published on Kindle. I think deeply about how software and AI intersect in real workflows.",
  },
  {
    icon: MapPin,
    title: "Remote-first, async-friendly",
    body: "Based in Lahore, Pakistan. Comfortable with PST overlap, Slack-first teams, and async code reviews.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <section
      id="about"
      className="w-full bg-gradient-to-b from-muted/10 to-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-dots-pattern opacity-[0.02]" />
      <motion.div
        ref={ref}
        className="section-container relative z-10"
        variants={containerVariants}
        animate={controls}
      >
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">
            What It&apos;s Like Working With Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Beyond the tech stack - the things that make collaboration actually work.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
          {TRAITS.map((t) => (
            <motion.div
              key={t.title}
              variants={itemVariants}
              className="flex gap-4 p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/20 hover:bg-card/80 transition-colors duration-300"
            >
              <div className="rounded-xl bg-primary/10 p-3 h-fit text-primary shrink-0">
                <t.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1.5">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
