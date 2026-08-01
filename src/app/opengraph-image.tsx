import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

/**
 * The shared social card, generated at build time.
 *
 * Drawn rather than shipped as a PNG for the same reason the product visuals
 * are: it re-renders from the real strings, so a copy change cannot leave a
 * stale image behind. Every route inherits this unless it defines its own.
 *
 * Kept to system fonts and flat fills deliberately: ImageResponse rasterises
 * with Satori, which supports neither the site's neumorphic box-shadows nor a
 * webfont without shipping the font binary into the build.
 */

export const alt = `${SITE.name} — financial infrastructure for regulated businesses`;
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
          padding: 72,
          background: "#e2e8f0",
          backgroundImage:
            "radial-gradient(circle at 78% 18%, rgba(99,102,241,0.20), transparent 55%), radial-gradient(circle at 8% 92%, rgba(124,58,237,0.16), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        {/*
          The settlement rails, as flat rules. Positioned absolutely at fixed
          offsets rather than distributed with flex: Satori supports only
          center / flex-start / flex-end / space-between / space-around, so
          space-evenly fails the build outright.
        */}
        {[80, 160, 240, 320, 400, 480, 560].map((top) => (
          <div
            key={top}
            style={{
              position: "absolute",
              top,
              left: 0,
              right: 0,
              height: 1,
              background: "rgba(99,102,241,0.12)",
            }}
          />
        ))}

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 99,
              background: "#6366f1",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#475569",
              fontWeight: 600,
            }}
          >
            {SITE.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: -2,
              color: "#0f172a",
              maxWidth: 900,
            }}
          >
            The financial infrastructure
          </div>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: -2,
              color: "#4f46e5",
              maxWidth: 900,
            }}
          >
            regulated businesses run on.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            fontSize: 22,
            color: "#475569",
          }}
        >
          {["Payments", "Reconciliation", "Onboarding", "Governed AI"].map(
            (t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  borderRadius: 99,
                  background: "rgba(255,255,255,0.65)",
                  border: "1px solid rgba(99,102,241,0.18)",
                }}
              >
                {t}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}
