"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STACK = {
  Frontend: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"],
  Backend: ["Node.js", "NestJS", "Python", "Django", "PHP"],
  Data: ["PostgreSQL", "Prisma"],
  Platforms: ["WordPress", "Shopify", "AWS", "Vercel"],
  Integrations: ["Stripe", "AI APIs", "WebSockets"],
};

const SPECIALTIES = [
  "Multi-tenant applications",
  "Production-level debugging",
  "Legacy app migration",
  "WordPress critical & fatal error debugging",
];

const INTERESTED_IN = [
  "Python projects",
  "AngularJS projects",
];

export default function Skills() {
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
      transition: { staggerChildren: 0.06, delayChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { y: 12, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="skills"
      className="w-full bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
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
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Technologies Talha uses, and where he adds the most value.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-10">
          {Object.entries(STACK).map(([category, items]) => (
            <motion.div key={category} variants={itemVariants}>
              <Card className="h-full border-0 shadow-lg glass-effect overflow-hidden card-hover">
                <CardContent className="p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="space-y-6">
          <Card className="border-0 shadow-lg glass-effect overflow-hidden border-l-4 border-l-primary">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                Specialties
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Where he adds the most value on complex projects:
              </p>
              <div className="flex flex-wrap gap-2">
                {SPECIALTIES.map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="text-xs bg-primary/15 text-primary border-primary/30 hover:bg-primary/25"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-dashed border-primary/30 bg-primary/5 overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                Also interested in
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Talha is open to Python and AngularJS projects, reach out if you need a hand.
              </p>
              <div className="flex flex-wrap gap-2">
                {INTERESTED_IN.map((item) => (
                  <Badge
                    key={item}
                    variant="outline"
                    className="text-xs border-primary/40 text-foreground/90"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
