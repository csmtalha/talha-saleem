"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  LayoutDashboard,
  Globe,
  ShoppingCart,
  RefreshCw,
  Rocket,
  Bug,
} from "lucide-react";

const SERVICES = [
  {
    icon: LayoutDashboard,
    title: "SaaS & Web App Development",
    description:
      "Building scalable applications with React, Next.js, and modern frontend architecture.",
  },
  {
    icon: Globe,
    title: "High-Performance Website Development",
    description:
      "Fast, SEO-friendly marketing websites using Next.js or WordPress.",
  },
  {
    icon: ShoppingCart,
    title: "eCommerce Development",
    description:
      "Shopify and WooCommerce custom implementations for online stores.",
  },
  {
    icon: RefreshCw,
    title: "Migration & Modernization",
    description:
      "Legacy system migrations: PHP → Next.js, Vue 2 → Vue 3, and legacy stacks to modern tech.",
  },
  {
    icon: Rocket,
    title: "Startup MVP & Product Development",
    description:
      "Helping startups build and launch their first product quickly and reliably.",
  },
  {
    icon: Bug,
    title: "Production-Level Debugging",
    description:
      "Debugging and fixing issues in web applications at production level, tracking down critical errors, performance problems, and stability issues.",
  },
];

export default function Services() {
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
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="services"
      className="w-full bg-gradient-to-b from-background to-muted/20 relative overflow-hidden"
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
            Services & Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            What Talha helps clients and teams build, from SaaS products to modern
            websites and migrations.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Card className="h-full border-0 shadow-lg glass-effect card-hover overflow-hidden group">
                <CardContent className="p-6 sm:p-8">
                  <div className="rounded-xl bg-primary/10 w-12 h-12 flex items-center justify-center mb-5 text-primary group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 gradient-text">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
