import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t bg-gradient-to-t from-muted/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dots-pattern opacity-[0.01]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground text-center">
              &copy; {new Date().getFullYear()} Talha Saleem. All rights
              reserved. | Crafted with ❤️ and Next.js
            </p>
          </div>

          {/* <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="#about">About</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="#projects">Projects</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="#contact">Contact</a>
            </Button>
            <ModeToggle />
          </div> */}
        </div>
      </div>
    </footer>
  );
}
