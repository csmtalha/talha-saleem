"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToPortfolio = () => {
    router.push("/"); // Navigate to Home page
  };

  const handleBackToArticles = () => {
    router.push("/articles-and-insights"); // Navigate to Articles page
  };

  return (
    <div>
      <header
        className={`fixed top-0 w-full z-50 transition-all ${
          scrolled ? "bg-muted/60 backdrop-blur border-b" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          {/* Logo */}
          <Image
            src="/images/protalha-logo-light.svg"
            alt="Logo"
            width={160}
            height={60}
            className="cursor-pointer"
            onClick={handleBackToPortfolio} // Navigate to Home page
          />

          {/* If on Blog page, show Articles and Insights button */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBackToArticles}>
              Articles & Insights
            </Button>
            <Button variant="ghost" size="sm" onClick={handleBackToPortfolio}>
              My Portfolio
            </Button>
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
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
      </header>
      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border shadow-sm">
          <div className="flex flex-col px-4 pb-4 space-y-2">
            <Button variant="ghost" size="sm" onClick={handleBackToArticles}>
              Articles & Insights
            </Button>
            <Button variant="ghost" size="sm" onClick={handleBackToPortfolio}>
              My Portfolio
            </Button>
            <div className="pt-2">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
      {/* Main Content (Blog Posts) */}
      <main className="pt-16">{children}</main>{" "}
      {/* Adjusted padding for header */}
    </div>
  );
};

export default BlogLayout;
