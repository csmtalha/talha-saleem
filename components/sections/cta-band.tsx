import { ArrowRight, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SITE } from "@/lib/site";

/** Mid-page call to action, shown right after proof of work. */
export default function CtaBand({
  title = "Need someone to own a product end to end?",
  body = "From the first schema to the last deploy, I build it, test it and document it, so your team isn't left holding a black box.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-label="Work with me" className="py-10 md:py-14">
      <div className="container-x">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-primary/25 px-6 py-12 text-center sm:px-12 md:py-16">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_120%_at_50%_0%,hsl(var(--primary)/0.22),transparent_65%)]" />
            <div className="bg-grid absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_0%,#000,transparent)]" />
            <div className="absolute left-1/2 top-0 -z-10 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent" />

            <h2 className="mx-auto max-w-2xl text-balance text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground sm:text-lg">{body}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#contact" className="btn-glow h-[52px] px-7 text-base">
                Let&apos;s Work Together
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                WhatsApp me
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
