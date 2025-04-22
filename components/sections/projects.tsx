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

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [selectedProject, setSelectedProject] = useState(null);

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
      title: "Tours & Travels",
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
      title: "Business Insurance",
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
      title: "Ship Navigation",
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
      title: "Finance Automation",
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
      title: "Mortgage App",
      description:
        "AI-powered mortgage application with admin dashboard, user management, and chat model integration.",
      image: "/images/projects/mortgageapp.png",
      tags: [
        "Next.js",
        "TailwindCSS",
        "shadcn/ui",
        "AI Integration",
        "User Management",
      ],
      details:
        "Developed an AI-powered mortgage application similar to ChatGPT with comprehensive admin dashboard, user management, and chat model integration. Built with Next.js, TailwindCSS, and shadcn/ui for a modern and responsive user interface. Implemented secure authentication and role-based access control. Integrated AI models for intelligent mortgage recommendations and assistance. Created an intuitive admin panel for managing users, monitoring conversations, and analyzing application data.",
      github: "https://github.com/csmtalha",
      demo: "#",
    },
    {
      title: "Beauty Salon",
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
    <section id="projects" className="w-full bg-background">
      <motion.div
        ref={ref}
        className="section-container"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work across various industries and
            technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300 border-2 border-muted">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="flex-grow p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="px-2 py-1 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details
                  </Button>
                  {/* <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Live Demo</span>
                      </a>
                    </Button>
                  </div> */}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        <Dialog
          open={!!selectedProject}
          onOpenChange={() => setSelectedProject(null)}
        >
          {selectedProject && (
            <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl font-bold">
                  {selectedProject.title}
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DialogHeader>
              <div className="relative aspect-video w-full overflow-hidden rounded-md">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  width={800}
                  height={450}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="space-y-4">
                <DialogDescription className="text-sm sm:text-base text-foreground">
                  {selectedProject.details}
                </DialogDescription>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="px-2 py-1 text-xs sm:text-sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </motion.div>
    </section>
  );
}
