import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { Monogram } from "@/components/sections/header";
import { SITE } from "@/lib/site";

const LINKS = [
  { label: "Selected work", href: "/#work" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Articles", href: "/articles-and-insights" },
  { label: "Contact", href: "/#contact" },
];

const SOCIAL = [
  { label: "LinkedIn", href: SITE.linkedin, icon: Linkedin },
  { label: "GitHub", href: SITE.github, icon: Github },
  { label: "WhatsApp", href: SITE.whatsapp, icon: MessageCircle },
  { label: "Email", href: `mailto:${SITE.email}`, icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-border/60">
      <div className="container-x py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Monogram />
              <span className="font-semibold tracking-tight">Talha Saleem</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              I build the system that replaces your spreadsheets. Custom business software, multi-tenant SaaS and AI-powered tools.
            </p>
            <a href="/#contact" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              Start a conversation
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-muted-foreground transition-colors hover:text-foreground">
                {l.label}
              </Link>
            ))}
            <a href={SITE.cv} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
              CV (PDF)
            </a>
          </nav>

          <ul className="flex gap-2">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="glass grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground hover:shadow-[0_0_24px_-6px_hsl(var(--primary)/0.8)]"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Talha Saleem. All rights reserved.</p>
          <p>Building systems that work as hard as your team.</p>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none -mb-[0.22em] select-none text-center text-[clamp(4rem,17vw,15rem)] font-semibold leading-none tracking-[-0.06em] text-foreground/[0.04]"
      >
        Talha Saleem
      </p>
    </footer>
  );
}
