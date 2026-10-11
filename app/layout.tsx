import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { Backdrop } from "@/components/effects/backdrop";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { SPLASH_SCRIPT, Splash } from "@/components/effects/splash";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { cn } from "@/lib/utils";
import "@/app/globals.css";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Talha Saleem | Lead Full Stack Engineer",
    template: "%s | Talha Saleem",
  },
  description:
    "Lead Full-Stack Engineer with 6+ years shipping TypeScript products end to end. React, Next.js, Node.js, NestJS, PostgreSQL, AI integrations, AWS.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090d" },
    { media: "(prefers-color-scheme: light)", color: "#fcfcfd" },
  ],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SPLASH_SCRIPT }} />
      </head>
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background font-sans text-foreground antialiased",
          geist.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Splash />
          <Backdrop />
          <CursorGlow />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
