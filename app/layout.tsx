import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Source_Sans_3, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import "@/app/globals.css";
import Footer from "@/components/sections/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://talha.creexio.com"),
  title: {
    default: "Talha Saleem | Lead Full Stack Engineer",
    template: "%s | Talha Saleem",
  },
  description:
    "Lead Full Stack Engineer with 5+ years building scalable SaaS & multi-tenant platforms. React, Next.js, Vue.js, Node.js, NestJS, AWS, Stripe.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen flex flex-col bg-background font-sans antialiased text-foreground",
          sourceSans.variable,
          plusJakarta.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-grow pt-20">{children}</main>{" "}
          {/* Content pushes down */}
          <Footer /> {/* Footer stays at the bottom */}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
