import { ImageResponse } from "next/og";

export const alt = "Asteria UI — Open-source components for React & Tailwind";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "28px",
          backgroundColor: "#172152",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(59,99,245,0.4), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              backgroundColor: "#3B63F5",
            }}
          />
          <span
            style={{
              fontSize: "40px",
              fontWeight: 600,
              color: "#F9FAFB",
              letterSpacing: "-0.02em",
            }}
          >
            Asteria UI
          </span>
        </div>
        <span
          style={{
            fontSize: "34px",
            fontWeight: 400,
            color: "#BFD0FE",
            textAlign: "center",
            maxWidth: "760px",
          }}
        >
          Open-source components for React &amp; Tailwind
        </span>
      </div>
    ),
    { ...size },
  );
}
