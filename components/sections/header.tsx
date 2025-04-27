"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleNavigation = (section: string) => {
    if (pathname === "/") {
      // If we're on home page, scroll to section
      scrollToSection(section);
    } else {
      // If we're on another page (like blog), navigate to home with hash
      router.push(`/#${section}`);
      // Wait for navigation to complete then scroll
      setTimeout(() => {
        const targetSection = document.getElementById(section);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      setMobileMenuOpen(false);
    }
  };

  const handleLogoClick = () => {
    if (pathname !== "/") {
      router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleBlogClick = () => {
    if (pathname !== "/articles-and-insights") {
      router.push("/articles-and-insights");
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all ${
        scrolled ? "bg-muted/60 backdrop-blur border-b" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Image
          src="/images/protalha-logo-light.svg"
          alt="Logo"
          width={160}
          height={60}
          className="cursor-pointer"
          onClick={handleLogoClick}
        />

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-4">
          {["about", "skills", "experience", "projects", "contact"].map(
            (section) => (
              <Button
                key={section}
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation(section)}
                className={
                  pathname.startsWith("/articles-and-insights")
                    ? "text-muted-foreground hover:text-foreground"
                    : ""
                }
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Button>
            )
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBlogClick}
            className={
              pathname.startsWith("/articles-and-insights")
                ? "font-semibold"
                : ""
            }
          >
            Articles & Insights
          </Button>
          <ModeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border shadow-sm">
          <div className="flex flex-col px-4 pb-4 space-y-2">
            {["about", "skills", "experience", "projects", "contact"].map(
              (section) => (
                <Button
                  key={section}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation(section)}
                  className={
                    pathname.startsWith("/articles-and-insights")
                      ? "text-muted-foreground hover:text-foreground"
                      : ""
                  }
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Button>
              )
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBlogClick}
              className={
                pathname.startsWith("/articles-and-insights")
                  ? "font-semibold"
                  : ""
              }
            >
              Articles & Insights
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
