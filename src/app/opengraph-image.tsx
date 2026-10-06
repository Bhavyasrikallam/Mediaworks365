import { ImageResponse } from "next/og";

// Root-segment image: no dynamic params (in Next 16, params would be a Promise).
export const alt = "Mediaworks 365 — Accelerate Your Business. Anytime, Anywhere, 365 Days a Year.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const AMBER = "#f5ad14";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#08080a",
          backgroundImage: "radial-gradient(circle at 88% 0%, rgba(245,173,20,0.30), rgba(8,8,10,0) 55%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>
          <span>Mediaworks</span>
          <span style={{ color: AMBER, marginLeft: 14 }}>365</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 96, height: 6, backgroundColor: AMBER, borderRadius: 3, marginBottom: 36 }} />
          <div style={{ display: "flex", fontSize: 78, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            Accelerate Your Business.
          </div>
          <div style={{ display: "flex", fontSize: 50, fontWeight: 700, lineHeight: 1.15, marginTop: 18, color: AMBER }}>
            Anytime, Anywhere, 365 Days a Year.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#b9b9c2" }}>
          SEO · Store Branding · Activations · Events · Digital · Out-of-Home
        </div>
      </div>
    ),
    { ...size },
  );
}
