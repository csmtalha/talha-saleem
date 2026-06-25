"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Download, FileText, Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Work", section: "case-studies" },
  { label: "Services", section: "services" },
  { label: "Projects", section: "projects" },
  { label: "About", section: "about" },
  { label: "Articles", href: "/articles-and-insights" },
  { label: "Books", section: "book" },
] as const;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (!isHome) return;
    const ids = NAV_ITEMS.filter((i) => "section" in i).map((i) => (i as { section: string }).section);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  }, [isHome, router]);

  const logoClick = useCallback(() => {
    setMobileOpen(false);
    if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
    else router.push("/");
  }, [isHome, router]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-effect border-b border-border/50 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={logoClick}
          className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity duration-200 shrink-0"
        >
          Talha Saleem
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            if ("href" in item) {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "text-foreground bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }
            const active = isHome && activeSection === item.section;
            return (
              <button
                key={item.label}
                onClick={() => scrollTo(item.section)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "text-foreground bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <ModeToggle />
          <a
            href="/files/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors duration-200"
          >
            <FileText className="h-3.5 w-3.5" />
            Resume
          </a>
          <Button
            size="sm"
            className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 text-primary-foreground shadow-md"
            onClick={() => scrollTo("contact")}
          >
            Conact Me
          </Button>
        </div>

        {/* Mobile right */}
        <div className="lg:hidden flex items-center gap-1">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden glass-effect border-t border-border/50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              if ("href" in item) {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      active ? "text-foreground bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.section)}
                  className="px-4 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors text-left"
                >
                  {item.label}
                </button>
              );
            })}

            <div className="border-t border-border/50 mt-2 pt-3 flex flex-col gap-2">
              <a
                href="/files/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <FileText className="h-4 w-4" />
                View Resume
              </a>
              <a
                href="/files/cv.pdf"
                download="Talha-Saleem-CV.pdf"
                className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 text-primary-foreground mt-1"
                onClick={() => scrollTo("contact")}
              >
                Conact Me
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
