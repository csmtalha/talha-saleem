import { ImageResponse } from "next/og";
import { CATEGORY_LABEL, PROJECTS, creditLine, formatProjectDate, getProject } from "@/lib/projects";
import { SITE } from "@/lib/site";

export const alt = "Case study by Talha Saleem";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  const name = p?.name ?? "Case study";
  const metrics = p?.metrics?.slice(0, 3) ?? [];
  const stack = p?.stack.slice(0, 5) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090d",
          backgroundImage:
            "radial-gradient(circle at 0% 0%, rgba(125,134,251,0.35), transparent 55%), radial-gradient(circle at 100% 100%, rgba(52,211,180,0.16), transparent 50%)",
          padding: "60px 72px",
          color: "#eef0fa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#9aa0b8", letterSpacing: 2 }}>
            <span style={{ color: "#a5acff" }}>CASE STUDY</span>
            <span>·</span>
            <span>{p ? `${CATEGORY_LABEL[p.category].toUpperCase()} · ${formatProjectDate(p.date).toUpperCase()}` : ""}</span>
          </div>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #7d86fb, #34d3b4)",
              color: "#0b0d18",
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            TS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: name.length > 42 ? 56 : 68, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, maxWidth: 1000 }}>{name}</div>
          <div style={{ fontSize: 27, marginTop: 22, color: "#b6bbd0", lineHeight: 1.4, maxWidth: 980 }}>{p?.summary}</div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {metrics.length > 0
              ? metrics.map((m) => (
                  <div
                    key={m.label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "12px 20px",
                      borderRadius: 14,
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.04)",
                    }}
                  >
                    <div style={{ fontSize: 30, fontWeight: 700 }}>{m.value}</div>
                    <div style={{ fontSize: 17, color: "#9aa0b8" }}>{m.label}</div>
                  </div>
                ))
              : stack.map((t) => (
                  <div
                    key={t}
                    style={{
                      display: "flex",
                      padding: "8px 16px",
                      borderRadius: 999,
                      border: "1px solid rgba(255,255,255,0.14)",
                      fontSize: 20,
                      color: "#c8cce0",
                    }}
                  >
                    {t}
                  </div>
                ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <div style={{ fontSize: 22, color: "#eef0fa", fontWeight: 600 }}>{p ? creditLine(p) : "Talha Saleem"}</div>
            <div style={{ fontSize: 19, color: "#9aa0b8", marginTop: 4 }}>{`Lead Full-Stack Engineer · ${SITE.domain}`}</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
