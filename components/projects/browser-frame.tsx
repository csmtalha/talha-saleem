import Image from "next/image";
import {
  Building2,
  Bus,
  Calculator,
  ChartColumn,
  GraduationCap,
  House,
  Landmark,
  Leaf,
  Lock,
  PawPrint,
  Pill,
  Plane,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { CoverIcon, Project } from "@/lib/projects";
import { ARCHITECTURES } from "@/lib/architectures";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { cn } from "@/lib/utils";

const COVER_ICONS: Record<CoverIcon, LucideIcon> = {
  building: Building2,
  bus: Bus,
  calculator: Calculator,
  chart: ChartColumn,
  graduation: GraduationCap,
  home: House,
  landmark: Landmark,
  leaf: Leaf,
  paw: PawPrint,
  pill: Pill,
  plane: Plane,
  scan: ScanSearch,
  shield: ShieldCheck,
  sparkles: Sparkles,
  users: Users,
};

function hostOf(url?: string) {
  if (!url) return null;
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/** Stand-in artwork for products whose screenshots can't be shared. */
function GeneratedCover({ project }: { project: Project }) {
  const Icon = COVER_ICONS[project.icon ?? "sparkles"];
  const modules = (project.modules ?? project.stack).slice(0, 4);
  // Alternate the glow between the two accents so neighbouring covers differ.
  const flip = project.slug.length % 2 === 0;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0d18]">
      <div className="bg-grid absolute inset-0 opacity-70 [--grid-line:rgba(255,255,255,0.06)] [background-size:28px_28px]" />
      <div
        className={cn(
          "absolute -top-1/3 h-[140%] w-[90%] rounded-full blur-2xl",
          flip
            ? "-left-1/4 bg-[radial-gradient(closest-side,hsl(236_92%_72%/0.45),transparent)]"
            : "-right-1/4 bg-[radial-gradient(closest-side,hsl(168_72%_58%/0.35),transparent)]"
        )}
      />
      <div className="absolute inset-0 flex flex-col justify-between p-[6%]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
            {project.confidential ? "Confidential client build" : "Product preview"}
          </span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/15 backdrop-blur transition-transform duration-700 group-hover:-translate-y-1 group-hover:rotate-[-4deg]">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-3 line-clamp-2 max-w-[22ch] text-[clamp(0.95rem,2.2vw,1.35rem)] font-semibold leading-tight tracking-tight text-white">
              {project.name}
            </p>
          </div>
        </div>
        <ul className="flex flex-wrap gap-1.5">
          {modules.map((m) => (
            <li key={m} className="rounded-md bg-white/[0.07] px-2 py-1 text-[10px] font-medium text-white/75 ring-1 ring-white/10">
              {m}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export type FrameMedia = "auto" | "architecture" | "image";

/**
 * Project media inside a minimal browser chrome, so every project reads as a product.
 * "auto" shows the architecture diagram when there is one, otherwise the screenshot,
 * otherwise a generated cover.
 */
export function BrowserFrame({
  project,
  sizes,
  priority,
  className,
  media = "auto",
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
  media?: FrameMedia;
}) {
  const host = hostOf(project.live);
  const contain = project.imageFit === "contain";
  const arch = ARCHITECTURES[project.slug];
  const showArch = !!arch && media !== "image";
  const showImage = !showArch && !!project.image;

  return (
    <div className={cn("overflow-hidden rounded-xl border border-border/70 bg-card shadow-2xl shadow-black/20", className)}>
      <div className="flex h-8 items-center gap-1.5 border-b border-border/70 bg-muted/60 px-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        <span className="mx-auto flex max-w-[60%] items-center gap-1.5 truncate rounded-md bg-background/70 px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          {showArch ? (
            "system architecture"
          ) : host ? (
            host
          ) : (
            <>
              <Lock className="h-2.5 w-2.5" /> private build
            </>
          )}
        </span>
        <span className="w-[42px]" />
      </div>
      <div className={cn("relative aspect-[16/10] overflow-hidden", contain && showImage && "bg-[#0b1020]")}>
        {showArch ? (
          <ArchitectureDiagram
            id={project.slug}
            spec={arch}
            title={project.name}
            className="absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
          />
        ) : showImage ? (
          <Image
            src={project.image!}
            alt={`${project.name} screenshot`}
            fill
            sizes={sizes}
            priority={priority}
            quality={82}
            className={cn(
              "transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]",
              contain ? "object-contain p-2" : "object-cover object-top"
            )}
          />
        ) : (
          <GeneratedCover project={project} />
        )}
      </div>
    </div>
  );
}
