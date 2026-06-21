"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const STATS = [
  { target: 30, suffix: "+", label: "Products Shipped", sub: "SaaS · Web · E-commerce" },
  { target: 5, suffix: "+", label: "Years Experience", sub: "React · Next.js · Node.js" },
  { target: 10, suffix: "+", label: "Tech Stacks", sub: "Frontend · Backend · Cloud" },
  { target: 24, suffix: "h", label: "Response Time", sub: "Mon–Fri, PST overlap" },
];

const CLIENTS = ["Startups", "SaaS Companies", "Agencies", "Enterprise", "Founder-led teams"];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const total = 40;
    const id = setInterval(() => {
      frame++;
      const eased = 1 - Math.pow(1 - frame / total, 3);
      setCount(Math.round(target * eased));
      if (frame >= total) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [active, target]);

  return <>{count}{suffix}</>;
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  };

  return (
    <section
      id="stats"
      className="w-full py-14 md:py-20 bg-muted/20 border-y border-border/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        animate={controls}
      >
        <motion.p
          variants={itemVariants}
          className="text-center text-xs font-semibold uppercase tracking-widest text-primary mb-10"
        >
          By The Numbers
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants} className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text tabular-nums">
                <CountUp target={stat.target} suffix={stat.suffix} active={isInView} />
              </div>
              <div className="mt-2 text-sm font-semibold text-foreground/90">{stat.label}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {CLIENTS.map((c, i) => (
            <span key={c} className="text-xs text-muted-foreground/60 flex items-center gap-1">
              {i > 0 && <span className="text-muted-foreground/30 mr-5">·</span>}
              {c}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
