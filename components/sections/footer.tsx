import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Talha Saleem. All rights
              reserved.
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
