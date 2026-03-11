"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import Image from "next/image";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STAR_LABELS = ["Situation", "Task", "Action", "Result"] as const;

function parseSTAR(details: string): { label: string; text: string }[] | null {
  const sections: { label: string; text: string }[] = [];
  const blocks = details.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
  for (const block of blocks) {
    for (const label of STAR_LABELS) {
      const marker = `${label}:`;
      if (!block.startsWith(marker)) continue;
      const text = block.slice(marker.length).trim();
      sections.push({ label, text });
      break;
    }
  }
  return sections.length === STAR_LABELS.length ? sections : null;
}

export interface ProjectDetail {
  title: string;
  description: string;
  image: string;
  tags: string[];
  details: string;
  github: string;
  demo: string;
}

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDetailModal({
  project,
  open,
  onOpenChange,
}: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/80",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed z-50 outline-none",
            "inset-0 sm:inset-[5vmin]",
            "flex items-stretch sm:items-center justify-center p-0 overflow-hidden",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          )}
          aria-describedby={undefined}
        >
          {/* Inner panel - responsive box */}
          <div
            className={cn(
              "relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:rounded-2xl",
              "bg-background shadow-2xl",
              "flex flex-col overflow-hidden",
              "sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"
            )}
          >
            {/* Image header */}
            <div className="relative h-40 sm:h-52 flex-shrink-0 overflow-hidden sm:rounded-t-2xl">
              <Image
                src={project.image || "/placeholder.jpg"}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Close */}
              <DialogPrimitive.Close asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-black/40 text-white hover:bg-black/60 border-0"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogPrimitive.Close>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 pr-14 sm:pr-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-lg break-words">
                  {project.title}
                </h2>
                <p className="text-white/95 text-sm sm:text-base mt-1 line-clamp-2 break-words">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Scrollable body */}
            <div
              id="project-detail-body"
              className={cn(
                "flex-1 min-h-0 overflow-y-auto overflow-x-hidden",
                "p-4 sm:p-6 space-y-4 sm:space-y-5",
                "text-sm sm:text-base"
              )}
            >
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-xs sm:text-sm px-2.5 py-0.5 bg-primary/10 text-primary border-primary/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </section>

              {(() => {
                const star = parseSTAR(project.details);
                if (star) {
                  return (
                    <section className="space-y-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                        Project details
                      </h3>
                      {star.map(({ label, text }) => (
                        <div key={label}>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                            {label}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed break-words text-sm sm:text-base">
                            {text}
                          </p>
                        </div>
                      ))}
                    </section>
                  );
                }
                return (
                  <section>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                      Overview
                    </h3>
                    <p className="text-muted-foreground leading-relaxed break-words">
                      {project.details}
                    </p>
                  </section>
                );
              })()}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
