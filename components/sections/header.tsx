"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // Icons for menu toggle

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const updateTheme = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", updateTheme);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", updateTheme);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false); // Close mobile menu on link click
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all ${
        scrolled ? "bg-muted/60 backdrop-blur border-b" : "bg-transparent"
      }`}
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center"
        onClick={() => scrollToSection("hero")}
      >
        <Image
          src={"/images/protalha-logo-light.svg"}
          alt="Logo"
          width={160}
          height={60}
          className="z-50"
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scrollToSection("about")}
          >
            About
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scrollToSection("skills")}
          >
            Skills
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scrollToSection("experience")}
          >
            Experience
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scrollToSection("projects")}
          >
            Projects
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </Button>
          {/* <ModeToggle /> */}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border shadow-sm">
          <div className="flex flex-col px-4 pb-4 space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("about")}
            >
              About
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("skills")}
            >
              Skills
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("experience")}
            >
              Experience
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("projects")}
            >
              Projects
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </Button>
            <div className="pt-2">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
