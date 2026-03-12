import { LinkedInBadge } from "@/components/linkedin-badge";

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t bg-gradient-to-t from-muted/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dots-pattern opacity-[0.01]"></div>

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center gap-6">
          <div className="[&_.LI-badge-container]:!bg-transparent [&_.badge-base__link]:!text-foreground [&_.LI-simple-link]:!text-foreground">
            <LinkedInBadge />
          </div>
          <div>
            <p className="text-sm text-muted-foreground text-center">
              Talha Saleem | Senior Software Engineer | React & Next.js
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline mt-1 sm:mt-0">&copy; {new Date().getFullYear()} All rights reserved. Crafted with 💻 and Next.js</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
