"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { CATEGORIES, OTHER_PROJECTS, type ProjectCategory } from "@/lib/projects";
import { cn } from "@/lib/utils";

const INITIAL = 6;

export default function Projects() {
  const [active, setActive] = useState<ProjectCategory | "all">("all");
  const [expanded, setExpanded] = useState(false);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: OTHER_PROJECTS.length };
    for (const p of OTHER_PROJECTS) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  const filtered = active === "all" ? OTHER_PROJECTS : OTHER_PROJECTS.filter((p) => p.category === active);
  const visible = expanded ? filtered : filtered.slice(0, INITIAL);
  const hidden = filtered.length - visible.length;

  return (
    <section id="projects" className="section-y relative">
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow="More projects"
          title="SaaS, AI tools, migrations and client sites."
          description="Newest first. Every card opens a short case study: the problem, what I did, and what came of it."
        />

        <LayoutGroup>
          <div role="tablist" aria-label="Filter projects" className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            {CATEGORIES.filter((c) => counts[c.id]).map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active === c.id}
                onClick={() => {
                  setActive(c.id);
                  setExpanded(false);
                }}
                className={cn(
                  "relative isolate shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                  active === c.id
                    ? "border-transparent text-primary-foreground"
                    : "border-border/70 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                {active === c.id && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-primary shadow-[0_0_24px_-6px_hsl(var(--primary)/0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {c.label}
                  <span className={cn("ml-1.5 text-xs", active === c.id ? "opacity-70" : "opacity-50")}>{counts[c.id]}</span>
                </span>
              </button>
            ))}
          </div>

          <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((p, i) => (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: Math.min(i, 6) * 0.04 } }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                >
                  <ProjectCard project={p} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>

        {hidden > 0 && (
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => setExpanded(true)} className="btn-ghost">
              Show {hidden} more
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
