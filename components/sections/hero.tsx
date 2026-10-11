"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Award, Download } from "lucide-react";
import profilePic from "@/public/images/talha-saleem.jpg";
import { TechIcon, type TechIconName } from "@/components/icons/tech-icons";
import { SITE } from "@/lib/site";

const STACK: { name: TechIconName; label: string }[] = [
  { name: "typescript", label: "TypeScript" },
  { name: "react", label: "React" },
  { name: "nextjs", label: "Next.js" },
  { name: "nodejs", label: "Node.js" },
  { name: "nestjs", label: "NestJS" },
  { name: "postgresql", label: "PostgreSQL" },
  { name: "prisma", label: "Prisma" },
  { name: "supabase", label: "Supabase" },
  { name: "anthropic", label: "Claude" },
  { name: "langchain", label: "LangChain" },
  { name: "python", label: "Python" },
  { name: "fastapi", label: "FastAPI" },
  { name: "docker", label: "Docker" },
  { name: "githubactions", label: "GitHub Actions" },
  { name: "tailwind", label: "Tailwind CSS" },
  { name: "stripe", label: "Stripe" },
  { name: "vercel", label: "Vercel" },
];

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* hairline grid, plus a brighter copy revealed around the pointer */}
      <div className="bg-grid mask-radial absolute inset-0" />
      <div
        className="bg-grid absolute inset-0 opacity-0 transition-opacity duration-500 [--grid-line:hsl(var(--primary)/0.35)] group-hover/hero:opacity-100"
        style={{
          WebkitMaskImage: "radial-gradient(260px circle at var(--hx, 50%) var(--hy, 30%), #000, transparent 70%)",
          maskImage: "radial-gradient(260px circle at var(--hx, 50%) var(--hy, 30%), #000, transparent 70%)",
        }}
      />
      {/* light beams travelling along grid lines */}
      <div className="mask-radial absolute inset-0">
        <span className="absolute left-0 top-[168px] h-px w-48 animate-beam-x bg-gradient-to-r from-transparent via-primary to-transparent" />
        <span className="absolute left-0 top-[392px] h-px w-64 animate-beam-x bg-gradient-to-r from-transparent via-signal to-transparent [animation-delay:3.5s] [animation-duration:12s]" />
        <span className="absolute left-[336px] top-0 h-48 w-px animate-beam-y bg-gradient-to-b from-transparent via-primary to-transparent [animation-delay:1.5s]" />
        <span className="absolute left-[952px] top-0 h-56 w-px animate-beam-y bg-gradient-to-b from-transparent via-signal to-transparent [animation-delay:6s] [animation-duration:14s]" />
      </div>
      <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.22),transparent)]" />
    </div>
  );
}

function PhotoCard() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), { stiffness: 200, damping: 20 });

  return (
    <div className="rise relative mx-auto hidden w-full max-w-[380px] [perspective:1200px] lg:block" style={d(0.35)}>
      <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.35),hsl(var(--signal)/0.12)_60%,transparent)] blur-2xl" />
      <motion.div
        ref={ref}
        onPointerMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          px.set((e.clientX - r.left) / r.width - 0.5);
          py.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="glass relative rounded-[28px] p-2"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
          <Image
            src={profilePic}
            alt="Talha Saleem, Lead Full-Stack Engineer"
            fill
            sizes="380px"
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Talha Saleem</p>
              <p className="text-xs text-white/70">Lead Full-Stack · Cloudpacer</p>
            </div>
            <span className="rounded-full bg-black/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/80 backdrop-blur">
              Lahore · UTC+5
            </span>
          </div>
        </div>

        <div
          style={{ transform: "translateZ(40px)" }}
          className="glass-strong absolute -left-10 top-[-2%] flex animate-float items-center gap-3 rounded-2xl px-3.5 py-2.5"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-400/15 text-amber-400">
            <Award className="h-[18px] w-[18px]" />
          </span>
          <div className="leading-tight">
            <p className="text-[11px] text-muted-foreground">Employee of the Year</p>
            <p className="text-sm font-semibold">2024 · Cloudpacer</p>
          </div>
        </div>

        <div
          style={{ transform: "translateZ(60px)", animationDelay: "-3s" }}
          className="glass-strong absolute -right-6 -top-5 flex animate-float items-center gap-2.5 rounded-2xl px-3.5 py-2.5"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <p className="text-sm font-medium">Replies within 24h</p>
        </div>
      </motion.div>
    </div>
  );
}

function StackMarquee() {
  const row = [...STACK, ...STACK];
  return (
    <div className="rise mt-16 md:mt-24" style={d(0.85)}>
      <p className="eyebrow mb-5 w-full justify-center">Stack I ship with daily</p>
      <div className="mask-fade-x group relative overflow-hidden">
        <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <li
              key={`${t.name}-${i}`}
              aria-hidden={i >= STACK.length}
              className="glass mr-3 flex items-center gap-2.5 rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              <TechIcon name={t.name} className="h-4 w-4" />
              {t.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      id="hero"
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--hx", `${e.clientX - r.left}px`);
        el.style.setProperty("--hy", `${e.clientY - r.top}px`);
      }}
      className="group/hero relative isolate overflow-hidden pb-16 pt-32 sm:pt-40 md:pb-20 lg:pt-44"
    >
      <HeroBackground />

      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.45fr_1fr] lg:gap-8">
          <div className="text-center lg:text-left">
            <div className="rise flex justify-center lg:justify-start" style={d(0)}>
              <a
                href="#contact"
                className="glass group inline-flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="relative h-6 w-6 overflow-hidden rounded-full ring-1 ring-border">
                  <Image src={profilePic} alt="" fill sizes="24px" className="object-cover" />
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="sm:hidden">Available for new work</span>
                <span className="hidden sm:inline">Available for remote roles &amp; contract builds</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            <div className="rise mt-7" style={d(0.1)}>
              <h1 className="text-gradient-animated pb-2 text-[clamp(3.4rem,11vw,7.25rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
                Talha Saleem
                <span className="sr-only">, Lead Full-Stack Engineer (React, Next.js, Node.js, NestJS)</span>
              </h1>
            </div>

            <p
              className="rise mt-5 text-balance text-[clamp(1.25rem,2.6vw,1.75rem)] font-medium leading-snug tracking-tight text-foreground/90"
              style={d(0.25)}
            >
              Lead Full-Stack Engineer who takes SaaS and AI products{" "}
              <span className="text-gradient">from schema to shipped.</span>
            </p>

            <p
              className="rise mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0"
              style={d(0.35)}
            >
              6+ years building TypeScript products end to end: multi-tenant platforms, payroll-grade
              data, AI features with retrieval, and the tests and deploys that keep them honest.
            </p>

            <div className="rise mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start" style={d(0.45)}>
              <a href="#contact" className="btn-glow h-[52px] px-7 text-base">
                Let&apos;s Work Together
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={SITE.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                <Download className="h-4 w-4" />
                or grab my CV
              </a>
            </div>

            {/* Social proof, above the fold */}
            <dl className="rise mx-auto mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 text-left sm:max-w-xl lg:mx-0" style={d(0.55)}>
              {[
                { k: "6+", v: "years in production" },
                { k: "35+", v: "products & sites" },
                { k: "2024", v: "Employee of the Year" },
              ].map((s) => (
                <div key={s.v} className="bg-background/80 px-3 py-3.5 sm:px-5">
                  <dt className="sr-only">{s.v}</dt>
                  <dd className="text-xl font-semibold tracking-tight sm:text-2xl">{s.k}</dd>
                  <dd aria-hidden className="mt-0.5 text-[11px] leading-tight text-muted-foreground sm:text-xs">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <PhotoCard />
        </div>
      </div>

      <StackMarquee />
    </section>
  );
}
