import { ImageResponse } from "next/og";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { posters } from "@/lib/db/schema";
import { getPosterBadgeLabel } from "@/lib/poster/semantics";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const poster = await db.query.posters.findFirst({
    where: eq(posters.id, id),
  });

  if (!poster) {
    return new Response("Poster not found", { status: 404 });
  }

  // If we have a pre-rendered poster image, use it directly
  if (poster.renderedUrl) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000000",
          }}
        >
          <img
            src={poster.renderedUrl}
            alt={`${poster.name} poster`}
            style={{
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  // Fallback: JSX-based OG image
  const pink = "#e49bc2";
  const green = "#4ade80";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          backgroundColor: "#0a0a0a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Photo — left side, cropped to fill */}
        {poster.photoUrl && (
          <div
            style={{
              display: "flex",
              width: "420px",
              height: "630px",
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={poster.photoUrl}
              alt={poster.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                filter: "grayscale(100%) brightness(0.7)",
              }}
            />
            {/* Pink tint overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `${pink}55`,
                mixBlendMode: "multiply",
              }}
            />
            {/* Fade to right */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "120px",
                height: "100%",
                background:
                  "linear-gradient(to right, transparent, #0a0a0a)",
              }}
            />
          </div>
        )}

        {/* Right content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            padding: poster.photoUrl
              ? "60px 60px 60px 40px"
              : "60px 80px",
          }}
        >
          {/* SHIPPER badge */}
          <div
            style={{
              display: "flex",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "6px 16px",
                backgroundColor: pink,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.25em",
                color: "#1a1a1a",
                textTransform: "uppercase",
              }}
            >
              {getPosterBadgeLabel(poster.role)}
            </div>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: "52px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.05,
              textTransform: "uppercase",
            }}
          >
            {poster.name}
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: green,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginTop: "14px",
            }}
          >
            {poster.role}
          </div>

          {/* Organization */}
          {poster.organization && (
            <div
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.4)",
                marginTop: "8px",
              }}
            >
              {poster.organization}
            </div>
          )}

          {/* Divider */}
          <div
            style={{
              width: "48px",
              height: "2px",
              backgroundColor: pink,
              marginTop: "32px",
              opacity: 0.5,
            }}
          />

          {/* Event info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.7)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              She Ships 2026
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.1em",
              }}
            >
              March 6-8 — 48h Global Hackathon
            </div>
          </div>

          {/* Branding */}
          <div
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.15)",
              letterSpacing: "0.2em",
              marginTop: "20px",
              textTransform: "uppercase",
            }}
          >
            sheships.org
          </div>
        </div>

        {/* Accent line at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(to right, ${pink}, ${green})`,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
