import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

// Social card rendered via Satori. Node runtime (default) — more reliable on
// Vercel's build than the edge runtime, and avoids the re-exported-runtime warning.
export const alt = `${siteConfig.name} — ${siteConfig.author}, ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#09090b",
          // Two soft brand glows (primary violet + secondary cyan).
          backgroundImage:
            "radial-gradient(900px 500px at 15% 0%, rgba(139,92,246,0.35), transparent 60%), radial-gradient(800px 500px at 100% 100%, rgba(34,211,238,0.28), transparent 60%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row: brand mark + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "9999px",
                backgroundColor: "#8b5cf6",
                boxShadow: "0 0 32px 4px rgba(139,92,246,0.9)",
              }}
            />
            <div
              style={{
                fontSize: "26px",
                letterSpacing: "0.35em",
                color: "rgba(255,255,255,0.72)",
                fontWeight: 600,
              }}
            >
              {siteConfig.name}
            </div>
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.02em",
            }}
          >
            www.cloudwithstephen.com
          </div>
        </div>

        {/* Middle: name + role */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "112px",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "transparent",
              backgroundImage:
                "linear-gradient(120deg, #c4b5fd 0%, #ffffff 40%, #67e8f9 100%)",
              backgroundClip: "text",
              // @ts-expect-error — Satori reads the vendor-prefixed property.
              "-webkit-background-clip": "text",
            }}
          >
            {`${siteConfig.author} James`}
          </div>
          <div
            style={{
              fontSize: "40px",
              color: "rgba(255,255,255,0.85)",
              fontWeight: 500,
            }}
          >
            {siteConfig.role}
          </div>
        </div>

        {/* Bottom: focus areas as chips */}
        <div style={{ display: "flex", gap: "16px" }}>
          {["Web Development", "Automation", "Agentic AI"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 26px",
                borderRadius: "9999px",
                fontSize: "26px",
                color: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(255,255,255,0.14)",
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
