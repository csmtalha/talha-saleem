"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, FileText, Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Work", section: "work" },
  { label: "Experience", section: "experience" },
  { label: "Writing", section: "writing" },
] as const;

const PAGE_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Articles", href: "/articles-and-insights" },
] as const;

export function Monogram({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid h-8 w-8 place-items-center rounded-[10px] bg-gradient-to-br from-primary to-signal text-[13px] font-bold tracking-tight text-primary-foreground shadow-[0_0_20px_-4px_hsl(var(--primary)/0.7)]",
        className
      )}
    >
      TS
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [hovered, setHovered] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    if (!isHome) return;
    const observers: IntersectionObserver[] = [];
    for (const { section } of NAV_ITEMS) {
      const el = document.getElementById(section);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(section);
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = useCallback(
    (id: string) => {
      setOpen(false);
      if (isHome) document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      else router.push(`/#${id}`);
    },
    [isHome, router]
  );

  const pill = hovered ?? (isHome ? active : "");

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        aria-label="Main"
        className={cn(
          "pointer-events-auto flex h-14 w-full items-center justify-between gap-2 rounded-full pl-2.5 pr-2 transition-[max-width,background-color,box-shadow,border-color] duration-500",
          scrolled ? "glass-strong max-w-4xl" : "max-w-6xl border border-transparent bg-transparent"
        )}
      >
        <Link
          href="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
            setOpen(false);
          }}
          className="group flex shrink-0 items-center gap-2.5 rounded-full pr-2"
          aria-label="Talha Saleem, home"
        >
          <Monogram className="transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-105" />
          <span className="hidden text-[15px] font-semibold tracking-tight sm:inline">Talha Saleem</span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex" onMouseLeave={() => setHovered(null)}>
          {NAV_ITEMS.map((item) => (
            <li key={item.section}>
              <button
                type="button"
                onClick={() => go(item.section)}
                onMouseEnter={() => setHovered(item.section)}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
                  isHome && active === item.section ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {pill === item.section && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.07] ring-1 ring-inset ring-foreground/[0.06]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {item.label}
              </button>
            </li>
          ))}
          {PAGE_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
                  pathname.startsWith(l.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <a
            href={SITE.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
          >
            <FileText className="h-3.5 w-3.5" />
            CV
          </a>
          <ModeToggle />
          <button type="button" onClick={() => go("contact")} className="btn-glow hidden h-10 px-4 text-sm sm:inline-flex">
            Let&apos;s talk
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:bg-foreground/[0.06] lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="pointer-events-auto fixed inset-0 -z-10 bg-background/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              key="sheet"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong pointer-events-auto absolute inset-x-3 top-[4.75rem] rounded-3xl p-3 lg:hidden"
            >
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
              >
                {[...NAV_ITEMS, ...PAGE_LINKS.map((l) => ({ label: l.label, section: `__page:${l.href}` }))].map((item) => (
                  <motion.li
                    key={item.section}
                    variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                  >
                    {item.section.startsWith("__page:") ? (
                      <Link
                        href={item.section.slice("__page:".length)}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium text-foreground/90 transition-colors hover:bg-foreground/[0.05]"
                      >
                        {item.label}
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => go(item.section)}
                        className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-base font-medium text-foreground/90 transition-colors hover:bg-foreground/[0.05]"
                      >
                        {item.label}
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border/60 pt-3">
                <a href={SITE.cv} target="_blank" rel="noopener noreferrer" className="btn-ghost h-11 text-sm">
                  <FileText className="h-4 w-4" />
                  View CV
                </a>
                <button type="button" onClick={() => go("contact")} className="btn-glow h-11 text-sm">
                  Let&apos;s talk
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
