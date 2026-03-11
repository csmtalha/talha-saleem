"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
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
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "glass-effect border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center relative">
          {/* Logo - matches main page */}
          <h1
            className="text-xl font-bold gradient-text cursor-pointer hover:scale-105 transition-transform duration-200 min-w-[100px]"
            onClick={handleBackToPortfolio}
          >
            Talha Saleem
          </h1>

          {/* Menu - centered on desktop */}
          <div className="hidden md:flex items-center justify-center gap-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Button variant="ghost" size="sm" onClick={handleBackToArticles}>
              Articles & Insights
            </Button>
            <Button variant="ghost" size="sm" onClick={handleBackToPortfolio}>
              Portfolio
            </Button>
            <ModeToggle />
          </div>

          {/* Right: spacer + mobile menu */}
          <div className="flex items-center min-w-[100px] justify-end">
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
          <div className="hidden md:block w-[100px]" aria-hidden />
          </div>
        </div>
      </header>
      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border shadow-sm">
          <div className="flex flex-col items-center px-4 pb-4 space-y-2">
            <Button variant="ghost" size="sm" onClick={handleBackToArticles}>
              Articles & Insights
            </Button>
            <Button variant="ghost" size="sm" onClick={handleBackToPortfolio}>
              Portfolio
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
