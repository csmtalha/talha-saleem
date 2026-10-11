"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { SpotlightCard } from "@/components/motion/reveal";
import { BrowserFrame } from "@/components/projects/browser-frame";
import { CATEGORY_LABEL, formatProjectDate, isRecent, type Project } from "@/lib/projects";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function NewBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-emerald-500 ring-1 ring-emerald-400/25 dark:text-emerald-400">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
      New
    </span>
  );
}

/** "Built by Talha Saleem" signature line that closes every project card. */
export function Credit({ project, className }: { project: Project; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-xs text-muted-foreground", className)}>
      <span className="relative h-5 w-5 overflow-hidden rounded-full ring-1 ring-border">
        <Image src={SITE.photo} alt="" fill sizes="20px" className="object-cover" />
      </span>
      <span>
        {project.credit} by <span className="font-medium text-foreground">Talha Saleem</span>
      </span>
    </span>
  );
}

export function ProjectLinks({ project, size = "sm" }: { project: Project; size?: "sm" | "md" }) {
  const base =
    "relative z-[3] inline-flex items-center gap-1 font-medium transition-colors duration-200 hover:text-foreground";
  const compact = size === "sm";
  const iconBtn =
    "relative z-[3] grid h-7 w-7 place-items-center rounded-full border border-border/70 transition-all duration-200 hover:border-primary/50 hover:text-foreground";
  return (
    <div className={cn("flex items-center text-muted-foreground", compact ? "gap-2 text-xs" : "gap-3.5 text-sm")}>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={compact ? iconBtn : base}
          aria-label={`${project.name} on GitHub`}
          title="Source on GitHub"
        >
          <Github className="h-3.5 w-3.5" />
          {!compact && "GitHub"}
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className={compact ? iconBtn : base}
          aria-label={`${project.name} live site`}
          title="Live site"
        >
          {!compact && "Live"}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      )}
      <Link href={`/work/${project.slug}`} className={cn(base, "ml-1 text-primary hover:text-primary")}>
        Case study
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

/** Compact card for the project grid. The whole card links to the case study. */
export function ProjectCard({ project }: { project: Project }) {
  const extra = project.stack.length - 4;
  return (
    <SpotlightCard className="group flex h-full flex-col p-2.5">
      <BrowserFrame project={project} media="image" sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 360px" />
      <div className="flex flex-1 flex-col px-2.5 pb-2 pt-5">
        <div className="flex items-center justify-between gap-3">
          <span className="eyebrow text-[10px]">
            {CATEGORY_LABEL[project.category]}
            <span aria-hidden className="text-border">/</span>
            <time dateTime={project.date}>{formatProjectDate(project.date)}</time>
          </span>
          {isRecent(project.date) && <NewBadge />}
        </div>
        <h3 className="mt-2.5 text-lg font-semibold leading-snug tracking-tight">
          <Link
            href={`/work/${project.slug}`}
            className="after:absolute after:inset-0 after:z-[2] after:rounded-2xl after:content-['']"
          >
            {project.name}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-muted-foreground/80">{project.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.stack.slice(0, 4).map((t) => (
            <li key={t} className="chip px-2 py-0.5 text-[11px]">
              {t}
            </li>
          ))}
          {extra > 0 && <li className="chip px-2 py-0.5 text-[11px]">+{extra}</li>}
        </ul>
        <div className="min-h-5 flex-1" />
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
          <Credit project={project} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </SpotlightCard>
  );
}
