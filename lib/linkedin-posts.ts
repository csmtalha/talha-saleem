/**
 * Latest LinkedIn posts (there are no long-form Pulse articles on the profile).
 * Collected from the public profile on 2026-10-11; titles are each post's
 * opening line. Update this list by hand when a new post goes out.
 */
export interface LinkedInPost {
  title: string;
  url: string;
  date: string;
  blurb: string;
}

export const LINKEDIN_FOLLOWERS = "3,400+";

export const LINKEDIN_POSTS: LinkedInPost[] = [
  {
    title: "Most teams want to add AI before understanding the problem",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7515126532391018497/",
    date: "2026-10-11",
    blurb: "A client asked for a support chatbot. The real time sink was onboarding, so we built a knowledge-base chat instead.",
  },
  {
    title: "Most SaaS founders discover the multi-tenancy problem too late",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7514777184423763968/",
    date: "2026-10-10",
    blurb: "How tenant data stays isolated in a production mortgage SaaS: every record carries a group id and every query filters on it.",
  },
  {
    title: "My AI stack for shipping fast without losing control of the code",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7474901060835250176/",
    date: "2026-06-22",
    blurb: "Which AI tool I use for which job: docs, boilerplate, code review and UI, and where I keep the wheel.",
  },
  {
    title: "Fleet safety platform for trucking industry compliance",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7473517162524057602/",
    date: "2026-06-18",
    blurb: "The hard part of an FMCSA compliance SaaS: turning federal trucking regulations into software carriers can actually use.",
  },
  {
    title: "Every senior engineer has a tech stack. Few have a decision-making stack.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7447734095566290944/",
    date: "2026-04-08",
    blurb: "How I make engineering calls under pressure: start from the constraints, timeline and team size, not the solution.",
  },
  {
    title: "What 18 months of production taught me about a multi-tenant mortgage SaaS",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7445156786896076800/",
    date: "2026-04-01",
    blurb: "Several mortgage companies running independently in one system, and what broke once real customers arrived.",
  },
  {
    title: "If your application is still running on Vue 2 in 2026",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7444813836513083392/",
    date: "2026-03-31",
    blurb: "The case for Vue 3: slower performance, inconsistent reactivity and broken plugins are what aging Vue 2 apps run into.",
  },
  {
    title: "Performance issues in React and Next.js often stem from small factors",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7422835951246278656/",
    date: "2026-01-30",
    blurb: "Avoid needless re-renders, memoize only when it helps, and keep state as local as possible.",
  },
  {
    title: "Early tech decisions impact performance and scalability",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7414775821581783041/",
    date: "2026-01-07",
    blurb: "Most scaling problems come from early decisions nobody revisited: a stack picked too soon, optimizing before users, AI for show.",
  },
];
