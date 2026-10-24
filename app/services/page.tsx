import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Layers, Sparkles, MessageCircle, Check } from "lucide-react";
import { Reveal, Stagger, StaggerItem, SpotlightCard } from "@/components/motion/reveal";
import { SITE } from "@/lib/site";

const TITLE = "Services — What I Can Build For You | Talha Saleem";
const DESCRIPTION =
  "Custom business systems, multi-tenant SaaS, and AI feature integration. I turn manual, spreadsheet-driven operations into software built around your exact workflow.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE.url}/services` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url}/services`,
    type: "website",
  },
};

const SERVICES = [
  {
    icon: Building2,
    tag: "01",
    title: "Custom Business Systems",
    body: "From HR to finance to logistics — if your team runs it on Excel, I can automate it. I build integrated systems tailored to your exact workflow.",
    points: [
      "Workflow audit and data model designed around your process",
      "One system to replace spreadsheets, WhatsApp approvals and disconnected tools",
      "Role-based access, approvals and a full audit trail",
      "Reports and exports your team already relies on",
    ],
  },
  {
    icon: Layers,
    tag: "02",
    title: "Multi-Tenant SaaS Development",
    body: "Full-stack SaaS from architecture to deployment. Tenant isolation, subscription billing, admin dashboards and scalable infrastructure on AWS.",
    points: [
      "Architecture and PostgreSQL schema from scratch",
      "Tenant isolation with role-based access control",
      "Stripe billing and subscription management",
      "Admin dashboards and CI/CD deployment on AWS or Vercel",
    ],
  },
  {
    icon: Sparkles,
    tag: "03",
    title: "AI Feature Integration",
    body: "Add AI to your existing product or build AI-native. RAG pipelines, semantic search, chatbots and document processing with OpenAI, Claude and pgvector.",
    points: [
      "RAG pipelines grounded in your own documents and data",
      "Semantic search with pgvector embeddings",
      "Chatbots and assistants wired into your tools",
      "Guardrails, evaluation and tests so answers stay reliable",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen pt-32 sm:pt-40">
      <section className="section-y">
        <div className="container-x">
          <Reveal blur className="max-w-2xl">
            <p className="eyebrow">
              <span className="text-primary">Services</span>
              <span className="h-px w-6 bg-border" />
              Hire me to build it
            </p>
            <h1 className="mt-4 text-balance text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              What I can <span className="text-gradient">build for you.</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              I build the system that replaces your spreadsheets. Every engagement starts with a specific
              business problem, then I scope and deliver against the outcome.
            </p>
          </Reveal>

          <Stagger className="mt-14 space-y-5 md:space-y-6">
            {SERVICES.map((s) => (
              <StaggerItem key={s.title}>
                <SpotlightCard lift={false} className="p-7 sm:p-9">
                  <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-start">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                          <s.icon className="h-6 w-6" />
                        </span>
                        <span className="font-mono text-sm text-muted-foreground">{s.tag}</span>
                      </div>
                      <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">{s.title}</h2>
                      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-glow h-11 px-5 text-sm">
                          <MessageCircle className="h-4 w-4" />
                          Book a call
                        </a>
                        <Link href="/#contact" className="btn-ghost h-11 px-5 text-sm">
                          Start a conversation
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                    <ul className="space-y-3 rounded-2xl border border-border/60 bg-background/40 p-6">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-sm text-foreground/85">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {p}
                        </li>
                      ))}
                      <li className="border-t border-border/60 pt-3 text-xs uppercase tracking-wider text-muted-foreground">
                        Starting from — let&apos;s discuss
                      </li>
                    </ul>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-14" delay={0.1}>
            <div className="relative isolate overflow-hidden rounded-[2rem] border border-primary/25 px-6 py-12 text-center sm:px-12">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_120%_at_50%_0%,hsl(var(--primary)/0.2),transparent_65%)]" />
              <h2 className="mx-auto max-w-2xl text-balance text-[clamp(1.6rem,3.6vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.03em]">
                Not sure which one you need?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                Tell me what your team does manually. I&apos;ll tell you what I&apos;d build and how long it takes.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-glow h-[52px] px-7 text-base">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp me
                </a>
                <Link href="/#work" className="btn-ghost h-[52px] px-6 text-base">
                  See my work
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
