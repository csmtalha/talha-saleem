import type { ReactNode } from "react";

/** The site header comes from the root layout; this only clears space for it. */
export default function ArticlesLayout({ children }: { children: ReactNode }) {
  return <div className="pt-20 sm:pt-24">{children}</div>;
}
