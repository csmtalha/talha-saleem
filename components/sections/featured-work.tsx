"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SpotlightCard } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { BrowserFrame, type FrameMedia } from "@/components/projects/browser-frame";
import { ARCHITECTURES } from "@/lib/architectures";
import { Credit, NewBadge, ProjectLinks } from "@/components/projects/project-card";
import { FEATURED, formatProjectDate, isRecent, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "problem", label: "Problem" },
  { id: "contribution", label: "Contribution" },
  { id: "outcome", label: "Outcome" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function StoryTabs({ project }: { project: Project }) {
  const [tab, setTab] = useState<TabId>("problem");
  const idBase = `story-${project.slug}`;

  return (
    <div className="mt-6">
      <div role="tablist" aria-label={`${project.name} story`} className="relative z-[3] flex gap-1 rounded-full bg-muted/70 p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            id={`${idBase}-${t.id}-tab`}
            aria-selected={tab === t.id}
            aria-controls={`${idBase}-panel`}
            onClick={() => setTab(t.id)}
            className={cn(
              "relative flex-1 rounded-full px-2 py-1.5 text-xs font-medium transition-colors duration-200 sm:text-[13px]",
              tab === t.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab === t.id && (
              <motion.span
                layoutId={`${idBase}-pill`}
                className="absolute inset-0 -z-10 rounded-full bg-background shadow-sm ring-1 ring-border"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            {t.label}
          </button>
        ))}
      </div>
      <div
        id={`${idBase}-panel`}
        role="tabpanel"
        aria-labelledby={`${idBase}-${tab}-tab`}
        className="relative mt-4 min-h-[9.5rem] sm:min-h-[8rem]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={tab}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.25 }}
            className="text-[15px] leading-relaxed text-muted-foreground"
          >
            {project[tab]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MediaSwitch({ value, onChange, slug }: { value: FrameMedia; onChange: (v: FrameMedia) => void; slug: string }) {
  return (
    <div role="tablist" aria-label="Project media" className="glass-strong flex gap-0.5 rounded-full p-1 text-[11px] font-medium">
      {(
        [
          ["architecture", "Architecture"],
          ["image", "Product"],
        ] as const
      ).map(([id, label]) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={value === id}
          onClick={() => onChange(id)}
          className={cn(
            "relative isolate rounded-full px-3 py-1 transition-colors",
            value === id ? "text-white" : "text-white/60 hover:text-white"
          )}
        >
          {value === id && (
            <motion.span
              layoutId={`media-${slug}`}
              className="absolute inset-0 -z-10 rounded-full bg-primary/80"
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
            />
          )}
          {label}
        </button>
      ))}
    </div>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  const hasArch = !!ARCHITECTURES[project.slug];
  const hasProduct = !!project.image;
  const [media, setMedia] = useState<FrameMedia>("architecture");

  return (
    <SpotlightCard lift={false} className="group p-2.5 sm:p-3">
      <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
        <div className={cn("relative z-[3] lg:col-span-7", flip && "lg:order-2")}>
          <Link href={`/work/${project.slug}`} aria-label={`${project.name} case study`} className="block">
            <BrowserFrame
              project={project}
              media={hasArch ? media : "auto"}
              priority={index === 0}
              sizes="(max-width: 1024px) 94vw, 640px"
            />
          </Link>
          {hasArch && hasProduct && (
            <div className="absolute bottom-3 right-3 z-[4]">
              <MediaSwitch value={media} onChange={setMedia} slug={project.slug} />
            </div>
          )}
        </div>

        <div className={cn("px-2.5 pb-3 lg:col-span-5 lg:py-6", flip ? "lg:pl-6" : "lg:pr-6")}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="eyebrow">
              <span className="text-primary">{String(index + 1).padStart(2, "0")}</span>
              <span className="h-px w-5 bg-border" />
              {project.role}
            </p>
            <span className="flex items-center gap-2">
              {isRecent(project.date) && <NewBadge />}
              <time dateTime={project.date} className="font-mono text-[11px] text-muted-foreground">
                {formatProjectDate(project.date)}
              </time>
            </span>
          </div>
          <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-[1.75rem]">
            <Link href={`/work/${project.slug}`} className="transition-colors hover:text-primary">
              {project.name}
            </Link>
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">{project.summary}</p>

          {project.metrics && (
            <dl className="mt-6 grid grid-cols-3 gap-2">
              {project.metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-border/60 bg-background/40 px-3 py-2.5">
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="text-lg font-semibold tracking-tight text-foreground">{m.value}</dd>
                  <dd aria-hidden className="text-[11px] leading-tight text-muted-foreground">
                    {m.label}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <StoryTabs project={project} />

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.stack.map((t) => (
              <li key={t} className="chip px-2 py-0.5 text-[11px]">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
            <Credit project={project} />
            <ProjectLinks project={project} size="md" />
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function FeaturedWork() {
  return (
    <section id="work" className="section-y relative">
      <div className="container-x">
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          title={
            <>
              Systems I designed, built <span className="text-gradient">and shipped.</span>
            </>
          }
          description="My most important recent work, newest first. Numbers come from the code and git history, not a pitch deck."
        />
        <div className="space-y-8 md:space-y-10">
          {FEATURED.map((p, i) => (
            <Reveal key={p.slug} y={40}>
              <FeaturedCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
