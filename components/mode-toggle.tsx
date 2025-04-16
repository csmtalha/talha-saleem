"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  // Handle change for the toggle switch
  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-4">
      {/* Sun Icon - Only visible in light mode */}
      <Sun
        className={`h-[1.2rem] w-[1.2rem] ${
          theme === "dark" ? "text-white" : "text-yellow-500"
        }`}
      />

      {/* Switch to toggle themes */}
      <Switch
        checked={theme === "dark"} // Switch is checked if the theme is dark
        onCheckedChange={handleToggle} // Properly passing the checked state to handleToggle
        className="w-[40px] h-[20px] bg-gray-200 dark:bg-primary rounded-full relative"
      >
        <span
          className={`absolute left-[2px] top-[2px] w-[16px] h-[16px] rounded-full bg-white transition-transform duration-300 ease-in-out ${
            theme === "dark" ? "transform translate-x-[20px]" : ""
          }`}
        />
      </Switch>

      {/* Moon Icon - Only visible in dark mode */}
      <Moon
        className={`h-[1.2rem] w-[1.2rem] ${
          theme === "light" ? "text-black" : "text-blue-500"
        }`}
      />
    </div>
  );
}
