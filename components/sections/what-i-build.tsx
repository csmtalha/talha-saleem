import { Building2, Layers, Sparkles } from "lucide-react";
import { Reveal, Stagger, StaggerItem, SpotlightCard } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";

const CARDS = [
  {
    icon: Building2,
    kicker: "Manual → Automated",
    title: "Business Systems",
    body: "I replace Excel sheets, WhatsApp approvals and disconnected tools with one integrated system built around your workflow.",
  },
  {
    icon: Layers,
    kicker: "SaaS Architecture",
    title: "Multi-Tenant SaaS",
    body: "End-to-end SaaS products with proper tenant isolation, role-based access, subscription billing and scalable infrastructure.",
  },
  {
    icon: Sparkles,
    kicker: "AI-Powered Features",
    title: "AI Integration",
    body: "RAG pipelines, AI chatbots, semantic search and LLM integrations using OpenAI, Claude and pgvector.",
  },
];

export default function WhatIBuild() {
  return (
    <section id="what-i-build" className="section-y relative">
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow="What I build"
          title={
            <>
              Custom software for how your team <span className="text-gradient">actually works.</span>
            </>
          }
          description="Not off-the-shelf tools bent to fit. Systems designed around your exact process, then shipped, tested and documented."
        />

        <Stagger className="grid gap-5 md:grid-cols-3">
          {CARDS.map((c) => (
            <StaggerItem key={c.title}>
              <SpotlightCard className="h-full p-7 sm:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                  <c.icon className="h-6 w-6" />
                </span>
                <p className="eyebrow mt-6">{c.kicker}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{c.body}</p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
