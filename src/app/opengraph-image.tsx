import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/portfolio";

// Branded text OG card (no photo needed). Generated at build time — works with output: "export".
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.title}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0b0b0c 0%, #17131b 100%)",
          padding: 80,
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 3, color: "#a1a1aa" }}>
          PORTFOLIO
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 46, color: "#f97316", marginTop: 12 }}>{siteConfig.title}</div>
          <div style={{ fontSize: 30, color: "#d4d4d8", maxWidth: 960, marginTop: 20 }}>
            {siteConfig.tagline}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#a1a1aa" }}>dangpham.pages.dev</div>
      </div>
    ),
    { ...size }
  );
}
