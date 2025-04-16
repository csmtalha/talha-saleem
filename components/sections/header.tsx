"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image"; // Importing the Image component to load logos

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("light"); // State to track the theme

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    // Listen for theme changes if ModeToggle updates theme state
    const updateTheme = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };

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
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all ${
        scrolled ? "bg-muted/60 backdrop-blur border-b" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Image
          src={"/images/protalha-logo-light.svg"}
          alt="Logo"
          width={180}
          height={80}
        />
        <nav className="flex items-center gap-4">
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
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
