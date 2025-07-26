"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, Github, X } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  details: string;
  github: string;
  demo: string;
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  const projects = [
    {
      title: "Mortgage Chatbot Platform",
      description:
        "Full-featured mortgage chatbot web application with multi-tenant architecture and enterprise SaaS solution.",
      image: "/images/projects/mortgageapp.png",
      tags: [
        "Next.js",
        "Tailwind CSS",
        "ShadCN UI",
        "PostgreSQL",
        "Prisma",
        "REST APIs",
        "Vercel",
      ],
      details:
        "Built a full-featured mortgage chatbot web application from scratch with multi-tenant architecture and domain-level separation. Designed and implemented admin dashboard for managing users, investors, and chatbot settings with secure role-based access control for admins, investors, and end users. Connected with third-party chatbot APIs and developed custom REST APIs. Used ShadCN UI for consistent and scalable UI design. Managed investor onboarding, profile management, and chat engagement tracking. Deployed on Vercel with environment-specific configurations and CI/CD. Delivered as an enterprise SaaS solution, built for scalability and maintainability.",
      github: "https://github.com/csmtalha",
      demo: "#",
    },
    {
      title: "AI Travels",
      description:
        "A dynamic travel CMS using Next.js and Firebase for seamless content management.",
      image: "/images/projects/ibrahim-travels.png",
      tags: [
        "Next.js",
        "Firebase",
        "Firestore",
        "Cloud Functions",
        "Responsive Design",
      ],
      details:
        "Developed a dynamic travel CMS using Next.js and Firebase for seamless content management. Integrated Firebase Firestore for scalable data storage and retrieval of travel information. Implemented Firebase Cloud Functions to integrate Google APIs for enhanced functionality. Deployed and managed the application with Firebase Hosting for fast content delivery. Optimized performance using Next.js for fast client-side rendering and SEO benefits. Designed responsive UI/UX with Next.js for a smooth cross-device experience. Automated content updates using Firebase functions to reduce manual effort.",
      github: "https://github.com/csmtalha",
      demo: "https://alibrahimtravel.com/",
    },
    {
      title: "Golden Insurance",
      description:
        "Migrated the business Insurance platform from PHP to Next.js, improving performance and scalability.",
      image: "/images/projects/goldeninsurance.png",
      tags: [
        "Next.js",
        "JavaScript",
        "PHP Migration",
        "Performance Optimization",
      ],
      details:
        "Migrated the business Insurance platform from PHP to Next.js, improving performance and scalability. Enhanced maintainability by refactoring the platform with modern JavaScript technologies. Optimized the application for faster load times using Next.js static and client-side rendering. Improved the user experience with responsive design and seamless navigation. Collaborated with the team to ensure a smooth migration while minimizing disruptions.",
      github: "https://github.com/csmtalha",
      demo: "#",
    },
    {
      title: "Regent",
      description:
        "A web platform for operational planning, logistics, and ship navigation using React.js.",
      image: "/images/projects/regent.png",
      tags: ["React.js", "Leaflet.js", "Logistics", "Route Planning"],
      details:
        "Developed a web platform for operational planning, logistics, and ship navigation using React.js. Integrated interactive maps with Leaflet.js for real-time spatial data and route visualization. Built vehicle and ship management features for efficient logistics and route planning.",
      github: "https://github.com/csmtalha",
      demo: "#",
    },
    {
      title: "Report Automation",
      description:
        "Automated accounting tasks to improve efficiency and reduce errors using AWS Textract.",
      image: "/images/projects/report.png",
      tags: ["React.js", "Redux", "Node.js", "AWS Textract", "PostgreSQL"],
      details:
        "Automated accounting tasks (payroll, invoicing, reporting) to improve efficiency and reduce errors. Integrated AWS Textract for accurate document data extraction. Developed custom regex for processing structured data from various documents. Used Lerna.js for managing multiple packages. Built new features with React.js, Redux, Node.js/Express, PostgreSQL, and Knex.js. Used Jenkins for deployment. Conducted document e2e testing to ensure reliability and functionality. Reduced manual task time, improved accuracy, and ensured scalability for large data volumes.",
      github: "https://github.com/csmtalha",
      demo: "#",
    },

    {
      title: "Salvation Beauty Ink",
      description:
        "Converted Figma designs into a fully functional WordPress website with seamless design integration.",
      image: "/images/projects/salvation.png",
      tags: ["WordPress", "Figma", "Custom Theme", "Responsive Design"],
      details:
        "Converted Figma designs into a fully functional WordPress website. Ensured seamless design integration for a consistent look and feel. Optimized the user experience for ease of navigation and responsiveness. Implemented custom WordPress theme and plugins to meet specific client requirements. Ensured mobile-first design approach for optimal viewing on all devices.",
      github: "https://github.com/csmtalha",
      demo: "#",
    },
  ];

  return (
    <section
      id="projects"
      className="w-full bg-gradient-to-b from-background to-muted/20 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dots-pattern opacity-[0.02]"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>

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
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A showcase of innovative solutions and creative implementations
            across various industries and technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full flex flex-col overflow-hidden card-hover glass-effect border-0 shadow-lg">
                <div className="relative h-48 sm:h-52 lg:h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      onClick={() => setSelectedProject(project)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
                <CardContent className="flex-grow p-6">
                  <h3 className="text-xl font-bold mb-3 text-glow">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="px-2 py-1 text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <Dialog
          open={!!selectedProject}
          onOpenChange={() => setSelectedProject(null)}
        >
          {selectedProject && (
            <DialogContent className="fixed inset-2 sm:inset-auto sm:max-w-[95vw] md:max-w-4xl lg:max-w-5xl sm:max-h-[95vh] overflow-hidden bg-background border-0 rounded-2xl shadow-2xl z-50 p-0">
              {/* Header with gradient background */}
              <div className="relative h-48 sm:h-64 overflow-hidden rounded-t-2xl">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Close button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm border border-white/20"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>

                {/* Project title overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                    {selectedProject.title}
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base max-w-2xl">
                    {selectedProject.description}
                  </p>
                </div>
              </div>

              {/* Content area */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                {/* Tech stack section */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold gradient-text">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="px-3 py-1.5 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Project details */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold gradient-text">
                    Project Overview
                  </h3>
                  <div className="prose prose-sm sm:prose-base max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.details}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                {/* <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  <Button variant="outline" className="flex-1 group" asChild>
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      View Code
                    </a>
                  </Button>
                  <Button className="flex-1 group" asChild>
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      Live Demo
                    </a>
                  </Button>
                </div> */}
              </div>
            </DialogContent>
          )}
        </Dialog>
      </motion.div>
    </section>
  );
}
