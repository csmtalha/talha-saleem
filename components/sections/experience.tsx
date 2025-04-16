"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase } from "lucide-react"

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const experiences = [
    {
      company: "CloudPacer",
      position: "Software Engineer",
      period: "Aug 2022 - Present",
      description: [
        "Designed and developed responsive, user-centric features using React.js, Next.js, and TailwindCSS, ensuring consistent UX across devices.",
        "Built dynamic and interactive UI components, including admin dashboards, AI-powered chat interfaces, and complex data tables.",
        "Implemented robust authentication flows and collaborated closely with backend teams to integrate RESTful APIs.",
        "Migrated legacy PHP applications to Next.js, significantly improving scalability, performance, and maintainability.",
      ],
      skills: ["React.js", "Next.js", "TailwindCSS", "Material UI", "RESTful APIs", "Authentication"],
    },
    {
      company: "Freelance",
      position: "Full-Stack Developer",
      period: "2020 - 2025",
      description: [
        "Delivered over 30 custom web applications and websites for clients across various industries.",
        "Specialized in creating high-performance React and Next.js applications with modern UI/UX design.",
        "Developed custom WordPress themes and plugins for content-driven websites.",
        "Implemented e-commerce solutions using Shopify, WooCommerce, and custom platforms.",
        "Provided ongoing maintenance, support, and feature enhancements for client projects.",
      ],
      skills: ["React.js", "Next.js", "WordPress", "Shopify", "E-commerce", "UI/UX Design"],
    },
    {
      company: "Napollo LLC",
      position: "Frontend Developer",
      period: "2021 - 2021",
      description: [
        "Developed WordPress and Shopify websites with custom themes and plugins.",
        "Implemented dynamic and responsive user interfaces with HTML, CSS, and JavaScript.",
      ],
      skills: ["WordPress", "Shopify", "HTML/CSS", "JavaScript"],
    },
  ]

  return (
    <section id="experience" className="w-full py-16 md:py-24 bg-muted/30">
      <motion.div
        ref={ref}
        className="section-container"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden border-l-4 border-l-primary">
                <CardHeader className="bg-muted/50 p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{exp.position}</h3>
                        <p className="text-muted-foreground">{exp.company}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="md:self-start px-3 py-1">
                      {exp.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-2 py-1 text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
