"use client";

import { motion } from "framer-motion";
import { Bot, Boxes, Database, FlaskConical, Layout, Plug, ServerCog, Sparkles } from "lucide-react";
import { EASE, Reveal, SpotlightCard, popChild } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TechIcon, iconFor } from "@/components/icons/tech-icons";

const STACK = [
  {
    title: "Frontend",
    icon: Layout,
    items: ["TypeScript", "React", "Next.js (App Router, RSC, ISR)", "Vue 3", "Tailwind CSS", "shadcn/ui", "TanStack Query", "Zustand", "Framer Motion"],
  },
  {
    title: "Backend",
    icon: ServerCog,
    items: ["Node.js", "NestJS", "Express", "FastAPI", "Django / DRF", "REST", "WebSockets", "Cron & background jobs"],
  },
  {
    title: "Data",
    icon: Database,
    items: ["PostgreSQL", "Prisma", "TypeORM", "SQLAlchemy", "Supabase (RLS, Edge Functions)", "pgvector", "Redis"],
  },
  {
    title: "AI / LLM",
    icon: Bot,
    items: ["Anthropic Claude", "OpenAI (GPT-4o, Whisper, embeddings)", "RAG with pgvector", "LangChain"],
  },
  {
    title: "Testing & DevOps",
    icon: FlaskConical,
    items: ["Vitest", "Jest", "Playwright", "pytest", "GitHub Actions", "Docker", "AWS", "nginx + PM2", "Vercel"],
  },
  {
    title: "Integrations",
    icon: Plug,
    items: ["Stripe", "SendGrid", "Resend", "Twilio", "Slack", "Google Workspace APIs", "Sanity CMS", "Firebase", "WordPress", "Shopify"],
  },
];

const SPECIALTIES = [
  "Multi-tenant SaaS and RBAC",
  "Row-level security and data isolation",
  "Test suites that gate deploys",
  "Retrieval-augmented AI features",
  "Legacy migrations (PHP, Framer, Vue 2 → modern stacks)",
];

export default function Skills() {
  return (
    <section id="skills" className="section-y relative">
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow="Skills"
          title={
            <>
              One engineer, <span className="text-gradient">the whole stack.</span>
            </>
          }
          description="The tools I reach for, from the database schema to the deploy pipeline."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STACK.map((group, gi) => (
            <Reveal key={group.title} delay={(gi % 3) * 0.08}>
              <SpotlightCard className="h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <group.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-semibold">{group.title}</h3>
                  <span className="ml-auto font-mono text-[11px] text-muted-foreground">{String(group.items.length).padStart(2, "0")}</span>
                </div>
                <motion.ul
                  className="mt-5 flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035, delayChildren: 0.15 + (gi % 3) * 0.08 } } }}
                >
                  {group.items.map((item) => {
                    const icon = iconFor(item);
                    return (
                      <motion.li
                        key={item}
                        variants={popChild}
                        whileHover={{ y: -2, transition: { duration: 0.15, ease: EASE } }}
                        className="chip cursor-default py-1.5 text-[13px]"
                      >
                        {icon && <TechIcon name={icon} className="h-3.5 w-3.5" />}
                        {item}
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-5" delay={0.1}>
          <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-7">
            <div aria-hidden className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-primary via-signal to-transparent" />
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
              <div className="flex shrink-0 items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-signal/10 text-signal ring-1 ring-signal/20">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold">Where I add the most value</h3>
                  <p className="text-xs text-muted-foreground">On complex, multi-team products</p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2 lg:ml-auto lg:justify-end">
                {SPECIALTIES.map((s) => (
                  <li key={s} className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/[0.07] px-3 py-1.5 text-[13px] font-medium text-foreground/90">
                    <Boxes className="h-3.5 w-3.5 text-primary" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
