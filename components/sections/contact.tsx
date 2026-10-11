"use client";

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import Script from "next/script";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  FileText,
  Linkedin,
  Loader2,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

type Status = "idle" | "loading" | "success" | "error";

const INTENTS = ["Full-time role", "Contract project", "Technical consultation", "Something else"] as const;

const field =
  "w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-[15px] text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/70 hover:border-foreground/20 focus:border-primary/60 focus:bg-background focus:ring-4 focus:ring-primary/15 disabled:opacity-60";

function Method({
  href,
  icon,
  label,
  value,
  accent,
  external = true,
  action,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
  accent: string;
  external?: boolean;
  action?: ReactNode;
}) {
  return (
    <div className="spotlight glass group relative flex items-center gap-4 rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-0.5">
      <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl ring-1", accent)}>{icon}</span>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="min-w-0 flex-1 after:absolute after:inset-0 after:z-[2] after:content-['']"
      >
        <span className="block text-xs text-muted-foreground">{label}</span>
        <span className="block truncate text-[15px] font-medium text-foreground">{value}</span>
      </a>
      {action ?? (
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [intent, setIntent] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const pickIntent = (i: string) => {
    setIntent(i);
    setForm((prev) => ({ ...prev, subject: prev.subject && !(INTENTS as readonly string[]).includes(prev.subject) ? prev.subject : i }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      // reCAPTCHA v3 runs invisibly and returns a token
      const recaptchaToken = await new Promise<string>((resolve, reject) => {
        if (!window.grecaptcha) return reject(new Error("Spam protection didn't load. Please email me directly."));
        window.grecaptcha.ready(async () => {
          try {
            resolve(await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { action: "contact" }));
          } catch (err) {
            reject(err);
          }
        });
      });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setIntent(null);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  };

  return (
    <section id="contact" className="section-y relative overflow-hidden">
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="lazyOnload"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,hsl(var(--primary)/0.18),transparent)]" />

      <div className="container-x">
        <Reveal blur className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">
            <span className="text-primary">07</span>
            <span className="h-px w-6 bg-border" />
            Contact
          </p>
          <h2 className="mt-5 text-balance text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            Let&apos;s build something <span className="text-gradient-animated">that ships.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Hiring a senior engineer, or need a product built end to end? Tell me what you&apos;re working on and I&apos;ll reply within 24 hours.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={`mailto:${SITE.email}`} className="btn-glow h-[52px] px-7 text-base">
              <Mail className="h-4 w-4" />
              Email me directly
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost h-[52px]">
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-5">
          <Reveal className="flex flex-col gap-3 lg:col-span-2" delay={0.05}>
            <Method
              href={`mailto:${SITE.email}`}
              external={false}
              label="Email"
              value={SITE.email}
              accent="bg-primary/10 text-primary ring-primary/20"
              icon={<Mail className="h-5 w-5" />}
              action={
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="relative z-[3] grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={copied ? "y" : "n"} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                      {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </motion.span>
                  </AnimatePresence>
                </button>
              }
            />
            <Method
              href={SITE.whatsapp}
              label="WhatsApp"
              value={SITE.whatsappDisplay}
              accent="bg-emerald-400/10 text-emerald-500 ring-emerald-400/20 dark:text-emerald-400"
              icon={<MessageCircle className="h-5 w-5" />}
            />
            <Method
              href={SITE.linkedin}
              label="LinkedIn"
              value="in/talhasaleemdev"
              accent="bg-[#0A66C2]/10 text-[#0A66C2] ring-[#0A66C2]/25 dark:text-[#5aa9f5]"
              icon={<Linkedin className="h-5 w-5" />}
            />
            <Method
              href={SITE.cv}
              label="Résumé"
              value="Download CV (PDF)"
              accent="bg-signal/10 text-signal ring-signal/20"
              icon={<FileText className="h-5 w-5" />}
            />
            <div className="glass mt-auto rounded-2xl p-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Lahore, Pakistan · UTC+5.</span> 4–6 hours of daily overlap with US
              Pacific time; I reply within 24 hours, Monday to Friday.
            </div>
          </Reveal>

          <Reveal className="lg:col-span-3" delay={0.12}>
            <div className="glass relative h-full overflow-hidden rounded-3xl p-6 sm:p-8">
              <div aria-hidden className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex h-full min-h-[420px] flex-col items-center justify-center gap-4 text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                      className="grid h-16 w-16 place-items-center rounded-full bg-emerald-400/15 text-emerald-400 shadow-[0_0_40px_-6px_rgba(52,211,153,0.6)]"
                    >
                      <CheckCircle2 className="h-8 w-8" />
                    </motion.span>
                    <h3 className="text-2xl font-semibold">Message sent</h3>
                    <p className="max-w-xs text-sm text-muted-foreground">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
                    <button type="button" onClick={() => setStatus("idle")} className="btn-ghost mt-2 h-10 text-sm">
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={onSubmit} className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div>
                      <p className="text-sm font-medium">What&apos;s this about?</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {INTENTS.map((i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => pickIntent(i)}
                            aria-pressed={intent === i}
                            className={cn(
                              "rounded-full border px-3.5 py-1.5 text-sm transition-all duration-200",
                              intent === i
                                ? "border-primary bg-primary/15 text-foreground shadow-[0_0_20px_-6px_hsl(var(--primary)/0.8)]"
                                : "border-border/80 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                            )}
                          >
                            {i}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block space-y-1.5">
                        <span className="text-sm font-medium">
                          Name <span className="text-primary">*</span>
                        </span>
                        <input name="name" value={form.name} onChange={onChange} required disabled={status === "loading"} placeholder="Your name" autoComplete="name" className={field} />
                      </label>
                      <label className="block space-y-1.5">
                        <span className="text-sm font-medium">
                          Email <span className="text-primary">*</span>
                        </span>
                        <input name="email" type="email" value={form.email} onChange={onChange} required disabled={status === "loading"} placeholder="you@company.com" autoComplete="email" className={field} />
                      </label>
                    </div>

                    <label className="block space-y-1.5">
                      <span className="text-sm font-medium">Subject</span>
                      <input name="subject" value={form.subject} onChange={onChange} disabled={status === "loading"} placeholder="Role, project or question" className={field} />
                    </label>

                    <label className="block space-y-1.5">
                      <span className="text-sm font-medium">
                        Message <span className="text-primary">*</span>
                      </span>
                      <textarea
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={onChange}
                        required
                        disabled={status === "loading"}
                        placeholder="A few lines about the role, team or product, plus a timeline if you have one."
                        className={cn(field, "resize-none")}
                      />
                    </label>

                    <AnimatePresence>
                      {status === "error" && errorMsg && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-start gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
                        >
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>
                            {errorMsg}{" "}
                            <span className="text-foreground/80">
                              You can also reach me directly at{" "}
                              <a href={`mailto:${SITE.email}`} className="font-medium underline underline-offset-2">
                                {SITE.email}
                              </a>{" "}
                              or on{" "}
                              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">
                                WhatsApp
                              </a>
                              .
                            </span>
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button type="submit" disabled={status === "loading"} className="btn-glow w-full disabled:cursor-wait disabled:opacity-80">
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs leading-relaxed text-muted-foreground">
                      Your details are only used to reply to you. This form is protected by reCAPTCHA and the Google{" "}
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">Privacy Policy</a> and{" "}
                      <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">Terms of Service</a> apply.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
