"use client";

import { useEffect, useRef, useState } from "react";
// useRef kept for the section scroll ref
import Script from "next/script";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Clock, CheckCircle2, AlertCircle, Loader2, MessageCircle } from "lucide-react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      // v3: execute silently and get token
      const recaptchaToken = await new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(
              process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
              { action: "contact" }
            );
            resolve(token);
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
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="contact"
      className="w-full bg-gradient-to-b from-muted/20 to-background relative overflow-hidden"
    >
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="lazyOnload"
      />

      <div className="absolute inset-0 bg-dots-pattern opacity-[0.02]" />
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />

      <motion.div
        ref={ref}
        className="section-container relative z-10"
        variants={containerVariants}
        animate={controls}
      >
        <motion.div variants={itemVariants} className="mb-12 md:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or want to discuss opportunities? Send a message and I&apos;ll reply within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: info */}
          <motion.div variants={itemVariants}>
            <Card className="h-full glass-effect border-0 shadow-lg">
              <CardContent className="p-8 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-8 gradient-text">Contact Information</h3>

                <div className="space-y-6 flex-1">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:talha@creexio.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                        talha@creexio.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground text-sm">Lahore, Pakistan</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Availability</p>
                      <p className="text-muted-foreground text-sm">PST overlap · Responds within 24 hrs</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/10 p-3 rounded-full shrink-0">
                      <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <a
                        href="https://wa.me/923074497453"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors text-sm"
                      >
                        +92 307 4497453
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border/50">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Connect</p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="icon" asChild>
                      <a href="https://github.com/csmtalha" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a href="https://linkedin.com/in/csmtalha/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                        <span className="sr-only">LinkedIn</span>
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" className="hover:border-green-500 hover:text-green-600 dark:hover:text-green-400" asChild>
                      <a href="https://wa.me/923074497453" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        <span className="sr-only">WhatsApp</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: form */}
          <motion.div variants={itemVariants}>
            <Card className="glass-effect border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-8 gradient-text">Send a Message</h3>

                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                    <CheckCircle2 className="h-14 w-14 text-green-500" />
                    <h4 className="text-xl font-semibold">Message sent!</h4>
                    <p className="text-muted-foreground text-sm max-w-xs">
                      Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setStatus("idle")} className="mt-2">
                      Send another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          disabled={status === "loading"}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                          disabled={status === "loading"}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="What's this about?"
                        value={form.subject}
                        onChange={handleChange}
                        disabled={status === "loading"}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about your project or opportunity..."
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        required
                        disabled={status === "loading"}
                        className="resize-none"
                      />
                    </div>

                    {/* reCAPTCHA v3 runs invisibly - no widget needed */}

                    {status === "error" && errorMsg && (
                      <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 rounded-lg px-4 py-3">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {errorMsg}
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 text-primary-foreground"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
