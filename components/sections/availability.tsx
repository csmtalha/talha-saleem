"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, Globe, MessageSquare, Briefcase, Code2, Rocket, Calendar } from "lucide-react";
import Link from "next/link";

const ENGAGEMENTS = [
  { icon: Briefcase, label: "Remote full-time roles" },
  { icon: Code2, label: "Freelance & contract" },
  { icon: Rocket, label: "Startup MVP builds" },
  { icon: Calendar, label: "Fixed-scope projects" },
];

const DETAILS = [
  { icon: Globe, label: "Timezone", value: "Lahore, Pakistan (UTC+5)" },
  { icon: Clock, label: "Overlap", value: "PST — 4–6 hrs daily" },
  { icon: MessageSquare, label: "Response", value: "< 24 hrs, Mon–Fri" },
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
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
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
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Let&apos;s Build Together
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mb-6" />
          <p className="text-muted-foreground max-w-xl mx-auto">
            Currently open to new projects and roles. Here&apos;s what works well.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
          {/* Left: status + engagement */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-border/50 bg-card/50 p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shrink-0" />
              <span className="text-lg font-semibold">Currently available</span>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                Open to
              </p>
              <ul className="space-y-3">
                {ENGAGEMENTS.map((e) => (
                  <li key={e.label} className="flex items-center gap-3 text-sm text-foreground/90">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <e.icon className="h-4 w-4" />
                    </div>
                    {e.label}
                  </li>
                ))}
              </ul>
            </div>

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 text-primary-foreground"
              asChild
            >
              <Link href="#contact">Start a Conversation</Link>
            </Button>
          </motion.div>

          {/* Right: logistics */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-border/50 bg-card/50 p-6 sm:p-8 space-y-6"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Logistics
            </p>
            <ul className="space-y-5">
              {DETAILS.map((d) => (
                <li key={d.label} className="flex items-start gap-4">
                  <div className="rounded-lg bg-muted p-2 text-muted-foreground shrink-0">
                    <d.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{d.label}</p>
                    <p className="text-sm font-medium">{d.value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Happy to jump on a quick call to see if there&apos;s a fit — no commitment, just a conversation.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
