"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    // View Transition API — quadrant reveal handled by CSS
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as Document & { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
        setTheme(newTheme);
      });
      return;
    }

    // Fallback: DOM overlay expanding from top-right corner
    const overlay = document.createElement("div");
    overlay.style.cssText = [
      "position:fixed",
      "inset:0",
      "z-index:9999",
      `background:${newTheme === "dark" ? "#09090b" : "#ffffff"}`,
      "clip-path:circle(0% at top right)",
      "transition:clip-path 0.55s cubic-bezier(0.4,0,0.2,1)",
      "pointer-events:none",
    ].join(";");
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.clipPath = "circle(150% at top right)";
      });
    });

    setTimeout(() => setTheme(newTheme), 280);
    setTimeout(() => overlay.remove(), 600);
  };

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="hover:scale-110 transition-transform duration-200"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
}
