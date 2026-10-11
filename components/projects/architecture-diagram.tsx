import {
  Bell,
  Braces,
  Calculator,
  CalendarClock,
  ChartColumn,
  CircleCheck,
  Clock,
  Cloud,
  Cpu,
  Database,
  FileText,
  Fingerprint,
  GitBranch,
  Globe,
  Layers,
  LayoutDashboard,
  ListOrdered,
  Lock,
  Mail,
  Map as MapIcon,
  MessageSquare,
  Radio,
  Router,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Ticket,
  Truck,
  User,
  Users,
  Webhook,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { TECH_ICONS } from "@/components/icons/tech-icons";
import type { ArchIcon, ArchNode, ArchTone, Architecture } from "@/lib/architectures";

/* Geometry: a 16:10 canvas with a 4 × 5 grid of fixed-size nodes. */
export const ARCH_W = 860;
export const ARCH_H = 538;
const COL_X = [22, 236, 450, 664];
const ROW_Y = [84, 168, 252, 336, 440];
const NODE_W = 176;
const NODE_H = 54;

const LUCIDE: Record<Exclude<ArchIcon, { tech: string }>, LucideIcon> = {
  bell: Bell,
  braces: Braces,
  calculator: Calculator,
  calendar: CalendarClock,
  chart: ChartColumn,
  check: CircleCheck,
  clock: Clock,
  cloud: Cloud,
  cpu: Cpu,
  database: Database,
  file: FileText,
  fingerprint: Fingerprint,
  git: GitBranch,
  globe: Globe,
  layers: Layers,
  layout: LayoutDashboard,
  list: ListOrdered,
  lock: Lock,
  mail: Mail,
  map: MapIcon,
  message: MessageSquare,
  radio: Radio,
  router: Router,
  search: Search,
  server: Server,
  shield: ShieldCheck,
  sparkles: Sparkles,
  ticket: Ticket,
  truck: Truck,
  user: User,
  users: Users,
  webhook: Webhook,
  workflow: Workflow,
  zap: Zap,
};

const TONE = {
  default: { fill: "rgba(255,255,255,0.035)", stroke: "rgba(255,255,255,0.13)", icon: "rgba(231,233,245,0.85)", chip: "rgba(255,255,255,0.06)" },
  primary: { fill: "rgba(125,134,251,0.13)", stroke: "rgba(125,134,251,0.6)", icon: "#a5acff", chip: "rgba(125,134,251,0.18)" },
  signal: { fill: "rgba(52,211,180,0.10)", stroke: "rgba(52,211,180,0.55)", icon: "#5eead4", chip: "rgba(52,211,180,0.16)" },
} as const;

const GROUP_TONE = {
  default: "rgba(255,255,255,0.10)",
  primary: "rgba(125,134,251,0.35)",
  signal: "rgba(52,211,180,0.32)",
} as const;

const x = (col: number) => COL_X[0] + col * (COL_X[1] - COL_X[0]);
const y = (row: number) => (Number.isInteger(row) ? ROW_Y[row] : ROW_Y[0] + row * (ROW_Y[1] - ROW_Y[0]));

type Side = "l" | "r" | "t" | "b";

function anchor(n: ArchNode, side: Side) {
  const nx = x(n.col);
  const ny = y(n.row);
  switch (side) {
    case "l":
      return [nx, ny + NODE_H / 2] as const;
    case "r":
      return [nx + NODE_W, ny + NODE_H / 2] as const;
    case "t":
      return [nx + NODE_W / 2, ny] as const;
    case "b":
      return [nx + NODE_W / 2, ny + NODE_H] as const;
  }
}

/** Cubic bezier between the two facing sides of the nodes. */
function edgePath(a: ArchNode, b: ArchNode) {
  const dx = x(b.col) - x(a.col);
  const dy = y(b.row) - y(a.row);
  const horizontal = Math.abs(dx) >= Math.abs(dy) * 1.2;
  const [s, t]: [Side, Side] = horizontal ? (dx >= 0 ? ["r", "l"] : ["l", "r"]) : dy >= 0 ? ["b", "t"] : ["t", "b"];
  const [x1, y1] = anchor(a, s);
  const [x2, y2] = anchor(b, t);
  const k = horizontal ? Math.max(18, Math.abs(x2 - x1) / 2) : Math.max(14, Math.abs(y2 - y1) / 2);
  const c1 = horizontal ? [x1 + (s === "r" ? k : -k), y1] : [x1, y1 + (s === "b" ? k : -k)];
  const c2 = horizontal ? [x2 + (t === "l" ? -k : k), y2] : [x2, y2 + (t === "t" ? -k : k)];
  // midpoint of the curve (t = 0.5) for the label
  const mx = (x1 + 3 * c1[0] + 3 * c2[0] + x2) / 8;
  const my = (y1 + 3 * c1[1] + 3 * c2[1] + y2) / 8;
  return { d: `M${x1},${y1} C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${x2},${y2}`, mx, my };
}

function NodeIcon({ icon, tone, px, py }: { icon?: ArchIcon; tone: keyof typeof TONE; px: number; py: number }) {
  const size = 14;
  if (!icon) return null;
  if (typeof icon === "object") {
    const t = TECH_ICONS[icon.tech];
    return (
      <svg x={px} y={py} width={size} height={size} viewBox="0 0 24 24" fill={TONE[tone].icon} aria-hidden>
        <path d={t.path} />
      </svg>
    );
  }
  const Icon = LUCIDE[icon];
  return <Icon x={px} y={py} width={size} height={size} color={TONE[tone].icon} strokeWidth={2} aria-hidden />;
}

/**
 * System architecture rendered as an SVG, drawn from a small spec.
 * Dark by design (it sits in the same frame as product screenshots),
 * with animated data flow along the edges.
 */
export function ArchitectureDiagram({
  id,
  spec,
  title,
  className,
}: {
  id: string;
  spec: Architecture;
  title: string;
  className?: string;
}) {
  const byId = Object.fromEntries(spec.nodes.map((n) => [n.id, n]));
  const arrow = `arch-arrow-${id}`;
  const arrowFlow = `arch-arrow-flow-${id}`;

  return (
    <svg
      viewBox={`0 0 ${ARCH_W} ${ARCH_H}`}
      role="img"
      aria-label={`System architecture of ${title}`}
      className={className}
      style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
    >
      <defs>
        <marker id={arrow} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,1 L9,5 L0,9 z" fill="rgba(255,255,255,0.35)" />
        </marker>
        <marker id={arrowFlow} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,1 L9,5 L0,9 z" fill="#8f97ff" />
        </marker>
        <pattern id={`arch-grid-${id}`} width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
        </pattern>
        <radialGradient id={`arch-glow-${id}`} cx="30%" cy="20%" r="70%">
          <stop offset="0%" stopColor="rgba(125,134,251,0.22)" />
          <stop offset="100%" stopColor="rgba(125,134,251,0)" />
        </radialGradient>
      </defs>

      <rect width={ARCH_W} height={ARCH_H} fill="#0a0d18" />
      <rect width={ARCH_W} height={ARCH_H} fill={`url(#arch-grid-${id})`} />
      <rect width={ARCH_W} height={ARCH_H} fill={`url(#arch-glow-${id})`} />

      {/* header */}
      <text x={22} y={32} fill="rgba(231,233,245,0.55)" fontSize={10} letterSpacing="2.2" style={{ fontFamily: "var(--font-mono), ui-monospace, monospace" }}>
        SYSTEM ARCHITECTURE
      </text>
      <g transform={`translate(${ARCH_W - 186}, 22)`}>
        <line x1={0} y1={6} x2={26} y2={6} stroke="#8f97ff" strokeWidth={1.5} strokeDasharray="2 6" className="arch-flow" />
        <text x={32} y={10} fill="rgba(231,233,245,0.55)" fontSize={10}>
          data flow
        </text>
        <line x1={92} y1={6} x2={118} y2={6} stroke="rgba(255,255,255,0.35)" strokeWidth={1.25} strokeDasharray="4 4" />
        <text x={124} y={10} fill="rgba(231,233,245,0.55)" fontSize={10}>
          config / CI
        </text>
      </g>

      {/* groups */}
      {spec.groups?.map((g) => {
        const gx = x(g.from[0]) - 10;
        const gy = y(g.from[1]) - 30;
        const gw = x(g.to[0]) + NODE_W + 10 - gx;
        const gh = y(g.to[1]) + NODE_H + 10 - gy;
        return (
          <g key={g.label}>
            <rect x={gx} y={gy} width={gw} height={gh} rx={14} fill="rgba(255,255,255,0.015)" stroke={GROUP_TONE[g.tone ?? "default"]} strokeDasharray="3 4" />
            <text
              x={g.labelAlign === "right" ? gx + gw - 12 : gx + 12}
              y={gy + 17}
              textAnchor={g.labelAlign === "right" ? "end" : "start"}
              fill={g.tone === "primary" ? "#a5acff" : g.tone === "signal" ? "#5eead4" : "rgba(231,233,245,0.5)"}
              fontSize={9.5}
              letterSpacing="1.6"
              style={{ fontFamily: "var(--font-mono), ui-monospace, monospace", textTransform: "uppercase" }}
            >
              {g.label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* edges */}
      {spec.edges.map((e) => {
        const a = byId[e.from];
        const b = byId[e.to];
        if (!a || !b) return null;
        const { d, mx, my } = edgePath(a, b);
        return (
          <g key={`${e.from}-${e.to}`}>
            {e.dashed ? (
              <path d={d} fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth={1.25} strokeDasharray="4 4" markerEnd={`url(#${arrow})`} />
            ) : (
              <>
                <path d={d} fill="none" stroke="rgba(143,151,255,0.22)" strokeWidth={1.25} markerEnd={`url(#${arrowFlow})`} />
                <path d={d} fill="none" stroke="#8f97ff" strokeWidth={1.6} strokeDasharray="2 10" strokeLinecap="round" className="arch-flow" />
              </>
            )}
            {e.label && (
              <g transform={`translate(${mx}, ${my})`}>
                <rect x={-(e.label.length * 2.9 + 7)} y={-8} width={e.label.length * 5.8 + 14} height={16} rx={8} fill="#0d1120" stroke="rgba(255,255,255,0.12)" />
                <text textAnchor="middle" y={3.5} fill="rgba(231,233,245,0.75)" fontSize={9.5}>
                  {e.label}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* nodes */}
      {spec.nodes.map((n) => {
        const tone: keyof typeof TONE = (n.tone as ArchTone | undefined) ?? "default";
        const nx = x(n.col);
        const ny = y(n.row);
        const t = TONE[tone];
        return (
          <g key={n.id} className="arch-node">
            <rect x={nx} y={ny} width={NODE_W} height={NODE_H} rx={11} fill="#0d1120" />
            <rect x={nx} y={ny} width={NODE_W} height={NODE_H} rx={11} fill={t.fill} stroke={t.stroke} className="arch-node-box" />
            <rect x={nx + 12} y={ny + 14} width={26} height={26} rx={7} fill={t.chip} />
            <NodeIcon icon={n.icon} tone={tone} px={nx + 18} py={ny + 20} />
            <text x={nx + 48} y={n.sub ? ny + 24 : ny + 31} fill="#eef0fa" fontSize={12.5} fontWeight={600}>
              {n.label}
            </text>
            {n.sub && (
              <text x={nx + 48} y={ny + 40} fill="rgba(200,204,224,0.62)" fontSize={10}>
                {n.sub}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
