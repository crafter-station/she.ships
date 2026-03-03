import { ImageResponse } from "next/og";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { badges } from "@/lib/db/schema";

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

  // If a rendered poster image exists, redirect to it directly
  if (badge.posterImageUrl) {
    return Response.redirect(badge.posterImageUrl, 302);
  }

  // Fallback: generate a text-only OG card for badges without a poster
  const accentColor = "#e49bc2";
  const badgeNumber = `#${String(badge.number).padStart(7, "0")}`;

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
          backgroundColor: "#0e0e0e",
          padding: "60px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative blurred color blob */}
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: accentColor,
            opacity: 0.15,
            filter: "blur(100px)",
            top: "-100px",
            right: "-50px",
          }}
        />

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
            textTransform: "uppercase",
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
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "3px",
              backgroundColor: accentColor,
              opacity: 0.6,
            }}
          />
          <div
            style={{
              fontSize: "20px",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            SHE SHIPS HACKATHON 2026
          </div>
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
            textTransform: "uppercase",
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
