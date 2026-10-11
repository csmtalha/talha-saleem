import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = "Talha Saleem, Lead Full-Stack Engineer: React, Next.js, Node.js, NestJS, AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public/images/talha-saleem.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#08090d",
          backgroundImage:
            "radial-gradient(circle at 18% 0%, rgba(125,134,251,0.38), transparent 55%), radial-gradient(circle at 100% 100%, rgba(52,211,180,0.18), transparent 50%)",
          padding: "64px 72px",
          color: "#eef0fa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #7d86fb, #34d3b4)",
                color: "#0b0d18",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              TS
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 22, color: "#9aa0b8" }}>
              <div style={{ width: 10, height: 10, borderRadius: 10, background: "#34d399" }} />
              Available for remote roles & contract builds
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>Talha Saleem</div>
            <div style={{ fontSize: 40, fontWeight: 600, marginTop: 18, color: "#a5acff" }}>Lead Full-Stack Engineer</div>
            <div style={{ fontSize: 26, marginTop: 14, color: "#b6bbd0", maxWidth: 640, lineHeight: 1.35 }}>
              SaaS and AI products from schema to shipped: React, Next.js, Node.js, NestJS, PostgreSQL.
            </div>
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            {[
              ["6+", "years"],
              ["35+", "products & sites"],
              ["2024", "Employee of the Year"],
            ].map(([k, v]) => (
              <div
                key={v}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "14px 22px",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <div style={{ fontSize: 32, fontWeight: 700 }}>{k}</div>
                <div style={{ fontSize: 18, color: "#9aa0b8" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginLeft: 40 }}>
          <div
            style={{
              display: "flex",
              padding: 8,
              borderRadius: 36,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.05)",
              boxShadow: "0 0 80px rgba(125,134,251,0.45)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photoSrc} width={330} height={410} style={{ borderRadius: 28, objectFit: "cover" }} alt="" />
          </div>
          <div style={{ marginTop: 22, fontSize: 20, color: "#9aa0b8" }}>{SITE.domain}</div>
        </div>
      </div>
    ),
    size
  );
}
