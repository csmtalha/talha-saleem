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
    { name: "React.js", level: 85 },
    { name: "Next.js", level: 85 },
    { name: "TypeScript", level: 70 },
    { name: "TailwindCSS", level: 80 },
    { name: "WordPress", level: 80 },
  ];

  const backendSkills = [
    { name: "Node.js", level: 60 },
    { name: "Nest.js", level: 50 },
    { name: "Python/Django", level: 40 },
    { name: "PostgreSQL", level: 55 },
    { name: "MongoDB", level: 55 },
  ];

  const otherSkills = [
    { name: "UI/UX Design", level: 85 },
    { name: "Performance Optimization", level: 80 },
    { name: "Responsive Design", level: 90 },
    { name: "SEO", level: 70 },
    { name: "Git/GitHub", level: 85 },
    { name: "CI/CD", level: 60 },
    { name: "Docker", level: 50 },
  ];

  return (
    <section id="skills" className="w-full py-8 md:py-12 bg-muted/30">
      <motion.div
        ref={ref}
        className="section-container"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My expertise spans across various technologies and frameworks in web
            development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 text-center">
                  Frontend Development
                </h3>
                <div className="space-y-6">
                  {frontendSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 text-center">
                  Backend Development
                </h3>
                <div className="space-y-6">
                  {backendSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 text-center">
                  Other Skills
                </h3>
                <div className="space-y-6">
                  {otherSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
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
