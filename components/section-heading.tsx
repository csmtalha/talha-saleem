import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
  children,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-6 md:mb-16",
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <Reveal blur className={cn("max-w-2xl", centered && "mx-auto")}>
        <p className="eyebrow">
          {index && <span className="text-primary">{index}</span>}
          {index && <span className="h-px w-6 bg-border" />}
          {eyebrow}
        </p>
        <h2 className="mt-4 text-balance text-[clamp(2rem,4.6vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
          {title}
        </h2>
        {description && (
          <p className={cn("mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg", centered && "mx-auto max-w-xl")}>
            {description}
          </p>
        )}
      </Reveal>
      {children && <Reveal delay={0.1}>{children}</Reveal>}
    </div>
  );
}
