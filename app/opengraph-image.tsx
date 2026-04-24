import { ImageResponse } from "next/og";

export const alt = "Simone Pepe — Developer & Digital Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
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
          background:
            "radial-gradient(circle at 20% 0%, rgba(139,92,246,0.45), transparent 55%), #09090b",
          color: "#fafafa",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 22,
            color: "#a78bfa",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          sjmvne.dev
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 28,
              color: "#a1a1aa",
              fontFamily: "monospace",
            }}
          >
            Developer & Digital Builder
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Simone Pepe
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#d4d4d8",
              maxWidth: 900,
              lineHeight: 1.25,
            }}
          >
            Senior Developer · MES/ERP · SAPUI5 · DELMIA Apriso · AI Tooling
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #27272a",
            paddingTop: 24,
            fontFamily: "monospace",
            fontSize: 20,
            color: "#71717a",
          }}
        >
          <span>Accenture · WebHub · AI</span>
          <span>Milano, IT</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
