import type { TechIconName } from "@/components/icons/tech-icons";

/**
 * System-architecture diagrams for the latest and most important projects.
 * They double as cover art, so confidential projects can show how they work
 * without a screenshot that would reveal the client.
 *
 * Layout is a 4-column grid (col 0–3) by 5 rows (row 0–4); see
 * components/projects/architecture-diagram.tsx for the geometry. Keep labels
 * under ~18 characters and sub-labels under ~22 so they fit their boxes.
 */

export type ArchIcon =
  | { tech: TechIconName }
  | "bell"
  | "braces"
  | "calculator"
  | "calendar"
  | "chart"
  | "check"
  | "clock"
  | "cloud"
  | "cpu"
  | "database"
  | "file"
  | "fingerprint"
  | "git"
  | "globe"
  | "layers"
  | "layout"
  | "list"
  | "lock"
  | "mail"
  | "map"
  | "message"
  | "radio"
  | "router"
  | "search"
  | "server"
  | "shield"
  | "sparkles"
  | "ticket"
  | "truck"
  | "user"
  | "users"
  | "webhook"
  | "workflow"
  | "zap";

export type ArchTone = "primary" | "signal";

export interface ArchNode {
  id: string;
  col: number;
  row: number;
  label: string;
  sub?: string;
  icon?: ArchIcon;
  tone?: ArchTone;
}

export interface ArchGroup {
  label: string;
  from: [col: number, row: number];
  to: [col: number, row: number];
  tone?: ArchTone;
  /** Put the label on the right when an edge would cross it */
  labelAlign?: "left" | "right";
}

export interface ArchEdge {
  from: string;
  to: string;
  label?: string;
  /** Configuration / CI relationship rather than runtime data flow */
  dashed?: boolean;
}

export interface Architecture {
  groups?: ArchGroup[];
  nodes: ArchNode[];
  edges: ArchEdge[];
}

export const ARCHITECTURES: Record<string, Architecture> = {
  "cloudpacer-hrms": {
    groups: [
      { label: "Office LAN", from: [0, 0], to: [0, 1] },
      { label: "Next.js 16 · App Router", from: [1, 0], to: [2, 2], tone: "primary" },
      { label: "Data & delivery", from: [3, 0], to: [3, 3] },
      { label: "CI / CD", from: [1, 4], to: [2, 4] },
    ],
    nodes: [
      { id: "dev", col: 0, row: 0, label: "Biometric devices", sub: "ZKTeco terminals", icon: "fingerprint" },
      { id: "agent", col: 0, row: 1, label: "LAN agent", sub: "pulls punches", icon: "router" },
      { id: "users", col: 0, row: 3, label: "People & HR", sub: "role-based access", icon: "users" },
      { id: "adms", col: 1, row: 0, label: "ADMS endpoint", sub: "device push", icon: "webhook" },
      { id: "api", col: 2, row: 1, label: "API routes", sub: "220+ · NextAuth RBAC", icon: "server", tone: "primary" },
      { id: "ui", col: 1, row: 2, label: "Web app", sub: "80+ pages", icon: "layout" },
      { id: "payroll", col: 2, row: 2, label: "Payroll engine", sub: "idempotent pay runs", icon: "calculator", tone: "signal" },
      { id: "cron", col: 2, row: 3, label: "node-cron jobs", sub: "monthly runs · syncs", icon: "clock" },
      { id: "log", col: 3, row: 0, label: "Punch log", sub: "append-only", icon: "list" },
      { id: "pg", col: 3, row: 1, label: "PostgreSQL", sub: "Prisma · 100+ models", icon: { tech: "postgresql" } },
      { id: "notify", col: 3, row: 2, label: "Slack · Web Push", sub: "notifications", icon: "bell" },
      { id: "exports", col: 3, row: 3, label: "Excel / PDF", sub: "finance exports", icon: "file" },
      { id: "gha", col: 1, row: 4, label: "GitHub Actions", sub: "240+ test files gate", icon: { tech: "githubactions" } },
      { id: "aws", col: 2, row: 4, label: "AWS", sub: "blue-green via SSM", icon: "cloud" },
    ],
    edges: [
      { from: "dev", to: "adms", label: "push" },
      { from: "agent", to: "adms", label: "pull" },
      { from: "adms", to: "log" },
      { from: "log", to: "payroll" },
      { from: "users", to: "ui" },
      { from: "ui", to: "api" },
      { from: "api", to: "pg" },
      { from: "api", to: "payroll" },
      { from: "api", to: "notify" },
      { from: "payroll", to: "exports" },
      { from: "cron", to: "payroll" },
      { from: "gha", to: "aws", label: "deploy", dashed: true },
    ],
  },

  "cloudpacer-knowledge-base": {
    groups: [
      { label: "Next.js 16", from: [1, 0], to: [2, 0], tone: "primary" },
      { label: "Supabase", from: [3, 0], to: [3, 1] },
      { label: "Retrieval flow", from: [1, 2], to: [2, 3], tone: "signal", labelAlign: "right" },
    ],
    nodes: [
      { id: "sales", col: 0, row: 0, label: "Sales team", sub: "pastes a job post", icon: "users" },
      { id: "cal", col: 0, row: 2, label: "Google Calendar", sub: "45-min hold + email", icon: "calendar" },
      { id: "owner", col: 0, row: 3, label: "Technical owner", sub: "assigned lead", icon: "user" },
      { id: "ui", col: 1, row: 0, label: "CRM app", sub: "34 pages", icon: "layout" },
      { id: "perm", col: 2, row: 0, label: "can() policies", sub: "app-level RBAC", icon: "shield", tone: "primary" },
      { id: "parity", col: 2, row: 1, label: "Parity test", sub: "CI: app rules = RLS", icon: "check" },
      { id: "pg", col: 3, row: 0, label: "Postgres + RLS", sub: "24 tables · 80+ RLS", icon: { tech: "supabase" } },
      { id: "vec", col: 3, row: 1, label: "pgvector", sub: "HNSW · past projects", icon: "database", tone: "signal" },
      { id: "claude", col: 1, row: 2, label: "Claude", sub: "requirement breakdown", icon: { tech: "anthropic" } },
      { id: "embed", col: 2, row: 2, label: "Embeddings", sub: "job post → vector", icon: "sparkles" },
      { id: "draft", col: 2, row: 3, label: "Proposal draft", sub: "grounded in past work", icon: "file", tone: "signal" },
    ],
    edges: [
      { from: "sales", to: "ui" },
      { from: "ui", to: "perm" },
      { from: "perm", to: "pg" },
      { from: "parity", to: "perm", dashed: true },
      { from: "parity", to: "pg", dashed: true },
      { from: "ui", to: "claude", label: "job post" },
      { from: "claude", to: "embed" },
      { from: "embed", to: "vec", label: "nearest" },
      { from: "vec", to: "draft" },
      { from: "ui", to: "cal", label: "assign" },
      { from: "cal", to: "owner" },
    ],
  },

  "mortgage-guidelines-ai-assistant": {
    groups: [
      { label: "Multi-tenant platform · Next.js 16", from: [1, 0], to: [2, 3], tone: "primary" },
      { label: "Services", from: [3, 0], to: [3, 3] },
      { label: "Ops", from: [1, 4], to: [2, 4] },
    ],
    nodes: [
      { id: "lenders", col: 0, row: 0, label: "Lender domains", sub: "one tenant each", icon: "globe" },
      { id: "brokers", col: 0, row: 1, label: "Brokers & admins", sub: "self-serve workspaces", icon: "users" },
      { id: "widget", col: 0, row: 2, label: "Chat widget", sub: "embedded on sites", icon: "message" },
      { id: "resolver", col: 1, row: 0, label: "Tenant resolver", sub: "branding · flags", icon: "layers" },
      { id: "api", col: 1, row: 1, label: "tRPC API", sub: "250+ handlers", icon: "server", tone: "primary" },
      { id: "auth", col: 1, row: 2, label: "NextAuth", sub: "roles per tenant", icon: "lock" },
      { id: "engine", col: 2, row: 1, label: "Workflow engine", sub: "multi-step, streamed", icon: "workflow", tone: "signal" },
      { id: "review", col: 2, row: 2, label: "Guide review", sub: "48 attributes", icon: "file" },
      { id: "cron", col: 2, row: 3, label: "17 scheduled jobs", sub: "billing · retention", icon: "clock" },
      { id: "llm", col: 3, row: 0, label: "Guideline sources", sub: "LLM answers", icon: "sparkles" },
      { id: "pg", col: 3, row: 1, label: "PostgreSQL", sub: "Prisma · per tenant", icon: { tech: "postgresql" } },
      { id: "stripe", col: 3, row: 2, label: "Stripe", sub: "plans · usage limits", icon: { tech: "stripe" } },
      { id: "cms", col: 3, row: 3, label: "Sanity CMS", sub: "content · newsletter", icon: { tech: "sanity" } },
      { id: "aws", col: 1, row: 4, label: "AWS", sub: "EC2 · S3 · SSM", icon: "cloud" },
      { id: "tests", col: 2, row: 4, label: "Vitest", sub: "480+ test cases", icon: { tech: "vitest" } },
    ],
    edges: [
      { from: "lenders", to: "resolver" },
      { from: "resolver", to: "api" },
      { from: "brokers", to: "api" },
      { from: "widget", to: "api" },
      { from: "api", to: "auth" },
      { from: "api", to: "engine" },
      { from: "api", to: "review" },
      { from: "engine", to: "llm", label: "query" },
      { from: "engine", to: "pg" },
      { from: "cron", to: "stripe" },
      { from: "tests", to: "aws", label: "gate", dashed: true },
    ],
  },

  "pms-integration-factory": {
    groups: [
      { label: "Factory", from: [1, 0], to: [2, 2], tone: "primary" },
      { label: "GitOps", from: [1, 4], to: [2, 4] },
    ],
    nodes: [
      { id: "docs", col: 0, row: 0, label: "Vendor API docs", sub: "input", icon: "file" },
      { id: "agent", col: 1, row: 0, label: "Research agent", sub: "Claude", icon: { tech: "anthropic" }, tone: "primary" },
      { id: "map", col: 2, row: 0, label: "Capability map", sub: "reviewed · gaps noted", icon: "map" },
      { id: "jira", col: 3, row: 0, label: "Jira", sub: "epic + feature tickets", icon: "ticket" },
      { id: "gen", col: 2, row: 1, label: "Generator", sub: "deterministic NestJS", icon: "cpu" },
      { id: "contract", col: 3, row: 1, label: "Zod contract", sub: "25 event types", icon: "braces" },
      { id: "fill", col: 1, row: 2, label: "LLM fill loop", sub: "implements seams", icon: "sparkles" },
      { id: "svc", col: 2, row: 2, label: "Generated service", sub: "NestJS + seams", icon: { tech: "nestjs" }, tone: "signal" },
      { id: "bus", col: 0, row: 3, label: "Recorded traffic", sub: "NATS · redacted", icon: "radio" },
      { id: "harness", col: 1, row: 3, label: "Grading harness", sub: "4-way failure taxonomy", icon: "check" },
      { id: "gates", col: 2, row: 3, label: "Validation gates", sub: "15 gates · 330+ tests", icon: "shield" },
      { id: "img", col: 1, row: 4, label: "Docker images", sub: "built in CI", icon: { tech: "docker" } },
      { id: "k8s", col: 2, row: 4, label: "Kubernetes", sub: "Argo CD · dev / stage", icon: "cloud" },
    ],
    edges: [
      { from: "docs", to: "agent" },
      { from: "agent", to: "map" },
      { from: "map", to: "jira" },
      { from: "map", to: "gen" },
      { from: "gen", to: "svc" },
      { from: "fill", to: "svc" },
      { from: "svc", to: "contract", label: "conforms", dashed: true },
      { from: "bus", to: "harness", label: "replay" },
      { from: "harness", to: "svc", label: "grades" },
      { from: "harness", to: "fill", label: "retry", dashed: true },
      { from: "svc", to: "gates" },
      { from: "img", to: "k8s" },
    ],
  },

  "neblo-ai": {
    groups: [
      { label: "Sanity", from: [1, 0], to: [2, 0] },
      { label: "Next.js 16 on Vercel", from: [1, 2], to: [2, 3], tone: "primary" },
    ],
    nodes: [
      { id: "editors", col: 0, row: 0, label: "Content team", sub: "writes & publishes", icon: "users" },
      { id: "studio", col: 1, row: 0, label: "Sanity Studio", sub: "embedded at /studio", icon: { tech: "sanity" }, tone: "primary" },
      { id: "lake", col: 2, row: 0, label: "Content Lake", sub: "7 schemas", icon: "database" },
      { id: "hook", col: 2, row: 1, label: "Revalidate hook", sub: "fires on publish", icon: "webhook" },
      { id: "visitors", col: 3, row: 1, label: "Visitors", sub: "search & direct", icon: "globe" },
      { id: "rsc", col: 1, row: 2, label: "Server components", sub: "13 pages", icon: { tech: "nextjs" }, tone: "primary" },
      { id: "isr", col: 2, row: 2, label: "ISR cache", sub: "fresh in seconds", icon: "zap", tone: "signal" },
      { id: "edge", col: 3, row: 2, label: "Vercel edge", sub: "neblo.ai", icon: { tech: "vercel" } },
      { id: "seo", col: 1, row: 3, label: "Programmatic SEO", sub: "sitemap · RSS", icon: "search" },
      { id: "form", col: 2, row: 3, label: "Contact form", sub: "SendGrid", icon: "mail" },
    ],
    edges: [
      { from: "editors", to: "studio" },
      { from: "studio", to: "lake", label: "publish" },
      { from: "lake", to: "hook" },
      { from: "hook", to: "isr", label: "revalidate" },
      { from: "lake", to: "rsc", label: "GROQ" },
      { from: "rsc", to: "isr" },
      { from: "isr", to: "edge" },
      { from: "visitors", to: "edge" },
      { from: "rsc", to: "seo" },
      { from: "rsc", to: "form" },
    ],
  },

  "geia-csa-dot-platform": {
    groups: [
      { label: "React 18 + Vite", from: [1, 0], to: [1, 3] },
      { label: "NestJS API", from: [2, 0], to: [2, 3], tone: "primary" },
      { label: "Data & delivery", from: [3, 0], to: [3, 3] },
    ],
    nodes: [
      { id: "staff", col: 0, row: 0, label: "Compliance staff", sub: "insurer team", icon: "users" },
      { id: "carriers", col: 0, row: 2, label: "Carriers", sub: "insured fleets", icon: "truck" },
      { id: "console", col: 1, row: 0, label: "Staff console", sub: "cases · KPIs · users", icon: { tech: "react" } },
      { id: "portal", col: 1, row: 2, label: "Carrier portal", sub: "17 routes", icon: { tech: "react" } },
      { id: "wizard", col: 1, row: 3, label: "DataQs wizard", sub: "6 steps · evidence", icon: "file" },
      { id: "edge", col: 2, row: 0, label: "Hardening", sub: "Helmet · CORS · limits", icon: "shield" },
      { id: "guards", col: 2, row: 1, label: "Guard chain", sub: "JWT → tenant → role", icon: "lock", tone: "primary" },
      { id: "api", col: 2, row: 2, label: "16 modules", sub: "~147 endpoints", icon: { tech: "nestjs" }, tone: "primary" },
      { id: "cron", col: 2, row: 3, label: "Scheduled jobs", sub: "KPI snapshots", icon: "clock" },
      { id: "notify", col: 3, row: 0, label: "SendGrid · Twilio", sub: "email + SMS", icon: "mail" },
      { id: "pg", col: 3, row: 1, label: "PostgreSQL", sub: "tenant-scoped rows", icon: { tech: "postgresql" } },
      { id: "mig", col: 3, row: 2, label: "Migrations", sub: "TypeORM, versioned", icon: "git" },
      { id: "evidence", col: 3, row: 3, label: "Evidence & audit", sub: "hashed files", icon: "fingerprint", tone: "signal" },
    ],
    edges: [
      { from: "staff", to: "console" },
      { from: "carriers", to: "portal" },
      { from: "portal", to: "wizard" },
      { from: "console", to: "edge" },
      { from: "portal", to: "edge" },
      { from: "edge", to: "guards" },
      { from: "guards", to: "api" },
      { from: "api", to: "pg" },
      { from: "api", to: "notify" },
      { from: "api", to: "evidence" },
      { from: "mig", to: "pg", dashed: true },
      { from: "cron", to: "pg" },
    ],
  },

  "microfinance-loan-management": {
    groups: [
      { label: "Next.js 16", from: [1, 0], to: [1, 1] },
      { label: "NestJS API", from: [2, 0], to: [2, 3], tone: "primary" },
      { label: "Data & delivery", from: [3, 0], to: [3, 2] },
    ],
    nodes: [
      { id: "officers", col: 0, row: 0, label: "Branch officers", sub: "14 branches", icon: "users" },
      { id: "borrowers", col: 0, row: 1, label: "Borrowers", sub: "KYC · CNIC", icon: "user" },
      { id: "web", col: 1, row: 0, label: "Dashboards", sub: "branch · officer views", icon: { tech: "nextjs" } },
      { id: "intake", col: 1, row: 1, label: "Loan intake", sub: "KYC uploads", icon: "file" },
      { id: "cron", col: 1, row: 3, label: "Nightly job", sub: "overdue detection", icon: "clock" },
      { id: "guards", col: 2, row: 0, label: "JWT + role guards", sub: "branch-scoped access", icon: "lock", tone: "primary" },
      { id: "loans", col: 2, row: 1, label: "Loan engine", sub: "products · approvals", icon: "calculator", tone: "signal" },
      { id: "emi", col: 2, row: 2, label: "EMI schedules", sub: "reducing balance", icon: "chart" },
      { id: "collect", col: 2, row: 3, label: "Collections", sub: "PAR buckets", icon: "chart" },
      { id: "pg", col: 3, row: 0, label: "PostgreSQL", sub: "Prisma · audit trail", icon: { tech: "postgresql" } },
      { id: "reports", col: 3, row: 1, label: "Regulator reports", sub: "Excel · PDF", icon: "file" },
      { id: "sms", col: 3, row: 2, label: "SMS alerts", sub: "borrowers & staff", icon: "message" },
    ],
    edges: [
      { from: "officers", to: "web" },
      { from: "borrowers", to: "intake" },
      { from: "web", to: "guards" },
      { from: "intake", to: "loans" },
      { from: "guards", to: "loans" },
      { from: "guards", to: "pg" },
      { from: "loans", to: "reports" },
      { from: "loans", to: "emi" },
      { from: "emi", to: "collect" },
      { from: "cron", to: "collect" },
      { from: "collect", to: "sms" },
    ],
  },
};
