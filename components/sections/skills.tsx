"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Skills() {
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

  const frontendSkills = [
    { name: "React.js", level: 90 },
    { name: "Next.js", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Tailwind CSS", level: 90 },
    { name: "HTML/CSS", level: 95 },
    { name: "JavaScript", level: 90 },
  ];

  const backendSkills = [
    { name: "MongoDB", level: 60 },
    { name: "Node.js", level: 70 },
    { name: "NestJS", level: 70 },
    { name: "Python", level: 60 },
    { name: "Express", level: 60 },
    { name: "PostgreSQL", level: 50 },
    { name: "REST APIs", level: 70 },
    { name: "Prisma", level: 70 },
  ];

  const otherSkills = [
    { name: "Git/GitHub", level: 90 },
    { name: "Vercel", level: 85 },
    { name: "WordPress", level: 80 },
    { name: "Shopify", level: 75 },
    { name: "Figma", level: 70 },
    { name: "Jira", level: 75 },
  ];

  return (
    <section
      id="skills"
      className="w-full bg-gradient-to-b from-muted/30 to-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>

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
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            My expertise spans across various technologies and frameworks in web
            development, with a focus on creating scalable and performant
            solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
            <Card className="card-hover glass-effect border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-8 text-center gradient-text">
                  Frontend Development
                </h3>
                <div className="space-y-6">
                  {frontendSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between mb-3">
                        <span className="font-medium text-glow">
                          {skill.name}
                        </span>
                        <span className="text-muted-foreground font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress
                        value={skill.level}
                        className="h-3 bg-muted/50"
                        style={
                          {
                            "--progress-background":
                              "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)",
                          } as React.CSSProperties
                        }
                      />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
            <Card className="card-hover glass-effect border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-8 text-center gradient-text">
                  Backend Development
                </h3>
                <div className="space-y-6">
                  {backendSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between mb-3">
                        <span className="font-medium text-glow">
                          {skill.name}
                        </span>
                        <span className="text-muted-foreground font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress
                        value={skill.level}
                        className="h-3 bg-muted/50"
                        style={
                          {
                            "--progress-background":
                              "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)",
                          } as React.CSSProperties
                        }
                      />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
            <Card className="card-hover glass-effect border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-8 text-center gradient-text">
                  Other Skills
                </h3>
                <div className="space-y-6">
                  {otherSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between mb-3">
                        <span className="font-medium text-glow">
                          {skill.name}
                        </span>
                        <span className="text-muted-foreground font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress
                        value={skill.level}
                        className="h-3 bg-muted/50"
                        style={
                          {
                            "--progress-background":
                              "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)",
                          } as React.CSSProperties
                        }
                      />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
