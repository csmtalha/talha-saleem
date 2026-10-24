import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SITE } from "@/lib/site";

/**
 * High-contrast conversion band shown just before the contact form.
 * Speaks to the core niche: replacing manual, spreadsheet-driven ops.
 */
export default function ManualProcess() {
  return (
    <section aria-label="Got a manual process?" className="py-10 md:py-16">
      <div className="container-x">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-border/60 bg-foreground/[0.03] px-6 py-14 text-center sm:px-12 md:py-20">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_90%_130%_at_50%_0%,hsl(var(--primary)/0.18),transparent_60%)]" />
            <div className="bg-grid absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_70%_90%_at_50%_0%,#000,transparent)]" />

            <p className="eyebrow w-full justify-center">Still doing it by hand?</p>
            <h2 className="mx-auto mt-5 max-w-3xl text-balance text-[clamp(1.9rem,4.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              Got a process your team still <span className="text-gradient">does manually?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground sm:text-lg">
              If your business runs on spreadsheets, WhatsApp approvals or disconnected tools, I can build
              the system that replaces them. Tell me what&apos;s broken.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-glow h-[52px] px-7 text-base">
                <MessageCircle className="h-4 w-4" />
                WhatsApp Me
              </a>
              <a href={`mailto:${SITE.email}`} className="btn-ghost h-[52px] px-6 text-base">
                <Mail className="h-4 w-4" />
                Send an Email
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Replies within 24 hours · Mon–Fri
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
