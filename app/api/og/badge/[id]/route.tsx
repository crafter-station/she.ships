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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#131414",
          padding: "60px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative blurred color blobs */}
        {blobColors.map((color, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: color,
              opacity: 0.15,
              filter: "blur(100px)",
              top: i === 0 ? "-100px" : i === 1 ? "200px" : "100px",
              right: i === 0 ? "-50px" : i === 1 ? "100px" : "-100px",
            }}
          />
        ))}

        {/* Badge number */}
        <div
          style={{
            fontSize: "16px",
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
            fontSize: "72px",
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
            fontSize: "28px",
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
              fontSize: "20px",
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
            fontSize: "20px",
            color: "rgba(255,255,255,0.6)",
            marginTop: "40px",
          }}
        >
          I&apos;m participating in She Ships Hackathon
        </div>

        {/* Footer branding */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontSize: "18px",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.1em",
          }}
        >
          sheships.org
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
