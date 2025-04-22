"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  if (!mounted) return null; // Prevent hydration mismatch

  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-4">
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-colors ${
          isDark ? "text-white" : "text-yellow-500"
        }`}
      />

      <Switch
        checked={isDark}
        onCheckedChange={handleToggle}
        className="w-[40px] h-[20px] bg-gray-200 dark:bg-primary rounded-full relative"
      >
        <span
          className={`absolute left-[2px] top-[2px] w-[16px] h-[16px] rounded-full bg-white transition-transform duration-300 ease-in-out ${
            isDark ? "translate-x-[20px]" : ""
          }`}
        />
      </Switch>

      <Moon
        className={`h-[1.2rem] w-[1.2rem] transition-colors ${
          isDark ? "text-blue-500" : "text-black"
        }`}
      />
    </div>
  );
}
