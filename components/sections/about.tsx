"use client";

import { ArrowRight, BookOpen, Briefcase, Clock, Coffee, Globe, MessageSquare, Rocket, Zap } from "lucide-react";
import { Reveal, SpotlightCard, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";

const TRAITS = [
  {
    icon: Zap,
    title: "Fast, with clear updates",
    body: "No disappearing acts and no vague status reports. You always know what shipped, what's next and what's blocked.",
  },
  {
    icon: Coffee,
    title: "I care about the product, not just the ticket",
    body: "I'll flag what doesn't make sense, suggest a better approach and push back constructively when it matters.",
  },
  {
    icon: BookOpen,
    title: "I leave systems documented",
    body: "Onboarding guides, ticket plans and tests that explain intent, so the next engineer can move as fast as I did.",
  },
  {
    icon: Globe,
    title: "Remote-first, async-friendly",
    body: "Based in Lahore. Comfortable with PST overlap, Slack-first teams and async code review.",
  },
];

const OPEN_TO = [
  { icon: Briefcase, label: "Remote full-time · Senior / Lead Full-Stack" },
  { icon: Rocket, label: "Contract builds for startups and product teams" },
  { icon: MessageSquare, label: "Screening call, technical interview or paid trial, whatever your process uses" },
];

const LOGISTICS = [
  { label: "Timezone", value: "UTC+5 (Lahore)" },
  { label: "US overlap", value: "4–6 hrs daily (PST)" },
  { label: "Response", value: "< 24 hrs, Mon–Fri" },
];

export default function About() {
  return (
    <section id="about" className="section-y relative">
      <div className="container-x">
        <SectionHeading
          index="05"
          eyebrow="How I work"
          title={
            <>
              What it&apos;s like to <span className="text-gradient">work with me.</span>
            </>
          }
        />

        <div className="grid gap-5 lg:grid-cols-5">
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:col-span-3">
            {TRAITS.map((t) => (
              <StaggerItem key={t.title}>
                <SpotlightCard className="h-full p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <t.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold leading-snug">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="lg:col-span-2" delay={0.15}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-emerald-400/25 bg-gradient-to-b from-emerald-400/[0.07] to-transparent p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                </span>
                <p className="text-lg font-semibold">Currently available</p>
              </div>

              <p className="eyebrow mt-7">Open to</p>
              <ul className="mt-3 space-y-3">
                {OPEN_TO.map((o) => (
                  <li key={o.label} className="flex items-start gap-3 text-sm leading-snug text-foreground/90">
                    <o.icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
                    {o.label}
                  </li>
                ))}
              </ul>

              <dl className="mt-7 grid grid-cols-3 gap-2">
                {LOGISTICS.map((l) => (
                  <div key={l.label} className="rounded-xl border border-border/60 bg-background/50 p-3">
                    <dt className="text-[11px] text-muted-foreground">{l.label}</dt>
                    <dd className="mt-1 text-[13px] font-medium leading-tight">{l.value}</dd>
                  </div>
                ))}
              </dl>

              <a href="#contact" className="btn-glow mt-7 w-full">
                <Clock className="h-4 w-4" />
                Book a conversation
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
