export const SITE = {
  /** Canonical origin. Change the domain here and everything else follows. */
  url: "https://talhasaleem.dev",
  domain: "talhasaleem.dev",
  name: "Talha Saleem",
  role: "Lead Full-Stack Engineer",
  email: "csmtalha@gmail.com",
  whatsapp: "https://wa.me/923174353728",
  whatsappDisplay: "+92 317 435 3728",
  linkedin: "https://www.linkedin.com/in/csmtalha/",
  github: "https://github.com/csmtalha",
  cv: "/files/Talha-Saleem-CV.pdf",
  location: "Lahore, Pakistan (UTC+5)",
  photo: "/images/talha-saleem.jpg",
} as const;

/** Numbers shown in the hero and proof band. Keep these conservative ("+" = floor). */
export const PROOF = [
  { value: 6, suffix: "+", label: "Years shipping production software" },
  { value: 35, suffix: "+", label: "Products and sites built or co-built" },
  { value: 240, suffix: "+", label: "Test files gating one platform's deploys" },
  { value: 2, suffix: "", label: "Published books on Amazon Kindle" },
] as const;

/** Real companies and clients I have shipped for (text wordmarks, no logos claimed). */
export const SHIPPED_FOR = [
  "Cloudpacer",
  "Neblo AI",
  "Al Ibrahim Travel",
  "Napollo",
  "Spadasoft",
  "Golden Era Insurance",
  "GEIA",
  "Butler Engineering",
  "Fit For A King",
  "Fimi Pro",
  "Chez Yiamme Catering",
] as const;
