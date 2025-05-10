"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";

export default function Experience() {
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

  const experiences = [
    {
      company: "CloudPacer",
      position: "Software Engineer",
      period: "Aug 2022 - Present",
      description: [
        "Built a smart AI-powered mortgage dashboard using Next.js and Tailwind CSS, delivering user and admin interfaces with seamless two-way data sync between frontend and PostgreSQL backend.",
        "Integrated LLM APIs for real-time conversational support, providing users with personalized mortgage insights via a responsive chat interface.",
        "Designed and implemented scalable authentication and user management systems with secure session handling and role-based access.",
        "Developed a self-managed travel CMS platform with dynamic destination and booking pages using Next.js and Firebase, reducing content update dependency on developers.",
        "Migrated a legacy insurance application from PHP to Next.js, enhancing performance, maintainability, and CI/CD deployment workflows.",
        "Revamped an eCommerce platform frontend with Django templates and vanilla JS, improving UX, layout structure, and overall site engagement.",
        "Integrated real-time map tracking in a logistics application using Leaflet.js and React.js, enabling dynamic route visualization and optimization.",
        "Engineered backend APIs using NestJS and PostgreSQL with well-structured service/controller logic, resolving key issues and ensuring system stability.",
        "Automated invoice and payroll data extraction using AWS Textract and JavaScript RegEx, rendering results in interactive React.js data tables.",
        "Troubleshot and improved backend reliability by diagnosing issues via AWS CloudWatch and Jenkins pipelines, boosting system performance and uptime.",
      ],
      skills: [
        "React.js",
        "Next.js",
        "TailwindCSS",
        "Shadcn",
        "Node.js",
        "Nest.js",
        "Material UI",
        "MongoDB",
        "Postgresql",
        "Firestore",
        "Python",
        "Django",
        "Docker",
        "Vercel",
        "RESTful APIs",
        "Authentication",
      ],
    },
    // {
    //   company: "Freelance",
    //   position: "Frontend Developer",
    //   period: "2020 - 2025",
    //   description: [
    //     "Delivered over multiple custom web applications and websites for clients across various industries.",
    //     "Specialized in creating high-performance React and Next.js applications with modern UI/UX design.",
    //     "Developed custom WordPress themes and plugins for content-driven websites.",
    //     "Implemented e-commerce solutions using Shopify, WooCommerce, and custom platforms.",
    //     "Provided ongoing maintenance, support, and feature enhancements for client projects.",
    //   ],
    //   skills: [
    //     "React.js",
    //     "Next.js",
    //     "WordPress",
    //     "Shopify",
    //     "E-commerce",
    //     "UI/UX Design",
    //     "Technical Writing",
    //   ],
    // },
    {
      company: "Napollo LLC",
      position: "Frontend Developer",
      period: "May 2020 - July 2022",
      description: [
        "Developed and maintained dynamic, responsive websites using WordPress and Shopify, building custom themes and plugins to meet unique client requirements.",
        "Created interactive UI components with React.js, improving site responsiveness and user engagement across desktop and mobile platforms.",
        "Integrated third-party APIs and Shopify Liquid templates to enable advanced functionality in eCommerce storefronts.",
        "Collaborated closely with backend developers and designers to translate Figma wireframes into pixel-perfect, production-ready web pages.",
        "Improved SEO performance and accessibility compliance by optimizing frontend markup and page structure.",
        "Conducted cross-browser testing and debugging to ensure seamless performance across major browsers and devices.",
        "Streamlined development workflows using Git, Trello, and Agile sprints, consistently delivering client projects on time.",
      ],
      skills: [
        "WordPress",
        "Shopify",
        "Liquid",
        "HTML/CSS",
        "JavaScript",
        "React.js",
        "APIs",
        "Figma",
        "Git",
        "Trello",
        "SEO",
        "Accessibility",
        "Cross-Browser Testing",
        "Agile",
      ],
    },
  ];

  return (
    <section id="experience" className="w-full bg-muted/30">
      <motion.div
        ref={ref}
        className="section-container"
        variants={containerVariants}
        animate={controls}
      >
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work Experience
          </h2>
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
                    <Badge
                      variant="outline"
                      className="md:self-start px-3 py-1"
                    >
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
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-2 py-1 text-xs"
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
      </motion.div>
    </section>
  );
}
