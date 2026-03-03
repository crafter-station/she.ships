import { ImageResponse } from "next/og";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { badges } from "@/lib/db/schema";
import { pickAccentColor } from "@/lib/badge/texture-generator";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const badge = await db.query.badges.findFirst({
    where: eq(badges.id, id),
  });

  if (!badge) {
    return new Response("Badge not found", { status: 404 });
  }

  const colors = badge.particleConfig.groups.map((g) => g.color);
  const accentColor = pickAccentColor(colors);
  const badgeNumber = `#${String(badge.number).padStart(7, "0")}`;

  // Use up to 3 colors for decorative blobs
  const blobColors = colors.slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          backgroundColor: "#131414",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow blobs (radial gradients — filter:blur not supported by Satori) */}
        {blobColors.map((color, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
              top: i === 0 ? "-150px" : i === 1 ? "150px" : "50px",
              right: i === 0 ? "-100px" : i === 1 ? "50px" : "-150px",
            }}
          />
        ))}

        {/* Left column — text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "580px",
            padding: "60px 60px 60px 80px",
          }}
        >
          {/* Badge number */}
          <div
            style={{
              fontSize: "14px",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.4)",
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            {badgeNumber}
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: accentColor,
              marginTop: "16px",
              lineHeight: 1.1,
            }}
          >
            {badge.name}
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginTop: "12px",
            }}
          >
            {badge.role}
          </div>

          {/* Organization */}
          {badge.organization && (
            <div
              style={{
                fontSize: "18px",
                color: "rgba(255,255,255,0.5)",
                marginTop: "8px",
              }}
            >
              {badge.organization}
            </div>
          )}

          {/* Tagline */}
          <div
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.5)",
              marginTop: "40px",
            }}
          >
            I&apos;m participating in She Ships Hackathon
          </div>

          {/* Branding */}
          <div
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.15em",
              marginTop: "16px",
              textTransform: "uppercase",
            }}
          >
            sheships.org
          </div>
        </div>

        {/* Right column — stylized badge card */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "620px",
            padding: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "340px",
              height: "480px",
              borderRadius: "20px",
              border: `2px solid ${accentColor}40`,
              background: `linear-gradient(160deg, ${blobColors[0] || accentColor}18 0%, #1a1a1a 40%, ${blobColors[1] || accentColor}12 100%)`,
              padding: "40px 32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Card inner glow */}
            <div
              style={{
                position: "absolute",
                top: "-60px",
                right: "-60px",
                width: "250px",
                height: "250px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
              }}
            />

            {/* SHE SHIPS label */}
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.3em",
                color: accentColor,
                textTransform: "uppercase",
              }}
            >
              SHE SHIPS 2026
            </div>

            {/* Divider */}
            <div
              style={{
                width: "40px",
                height: "2px",
                backgroundColor: accentColor,
                marginTop: "20px",
                opacity: 0.5,
              }}
            />

            {/* Card name */}
            <div
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#ffffff",
                marginTop: "24px",
                lineHeight: 1.15,
              }}
            >
              {badge.name}
            </div>

            {/* Card role */}
            <div
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.7)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginTop: "12px",
              }}
            >
              {badge.role}
            </div>

            {/* Card organization */}
            {badge.organization && (
              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.4)",
                  marginTop: "6px",
                }}
              >
                {badge.organization}
              </div>
            )}

            {/* Card badge number at bottom */}
            <div
              style={{
                display: "flex",
                marginTop: "auto",
                fontSize: "11px",
                fontFamily: "monospace",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              {badgeNumber}
            </div>

            {/* Decorative particle dots */}
            {colors.slice(0, 5).map((color, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: `${8 + i * 4}px`,
                  height: `${8 + i * 4}px`,
                  borderRadius: "50%",
                  backgroundColor: color,
                  opacity: 0.4,
                  bottom: `${30 + i * 35}px`,
                  right: `${20 + i * 25}px`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
