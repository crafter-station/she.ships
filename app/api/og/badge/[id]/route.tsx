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

  const accentColor = "#e49bc2";
  const badgeNumber = `#${String(badge.number).padStart(7, "0")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          backgroundColor: "#0e0e0e",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left side: text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "50px 60px",
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* Badge number */}
          <div
            style={{
              fontSize: "14px",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.35)",
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            {badgeNumber}
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: accentColor,
              marginTop: "12px",
              lineHeight: 1.05,
              textTransform: "uppercase",
            }}
          >
            {badge.name}
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginTop: "10px",
            }}
          >
            {badge.role}
          </div>

          {/* Organization */}
          {badge.organization && (
            <div
              style={{
                fontSize: "17px",
                color: "rgba(255,255,255,0.45)",
                marginTop: "6px",
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
              marginTop: "32px",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "3px",
                backgroundColor: accentColor,
                opacity: 0.6,
              }}
            />
            <div
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              SHE SHIPS HACKATHON 2026
            </div>
          </div>

          {/* Footer branding */}
          <div
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginTop: "24px",
            }}
          >
            sheships.org
          </div>
        </div>

        {/* Right side: poster thumbnail (if available) */}
        {badge.posterImageUrl && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "30px 40px 30px 0",
              width: "400px",
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={badge.posterImageUrl}
              alt=""
              width={288}
              height={360}
              style={{
                width: "288px",
                height: "360px",
                objectFit: "cover",
                border: `2px solid ${accentColor}`,
              }}
            />
          </div>
        )}

        {/* Decorative blurred color blob */}
        <div
          style={{
            position: "absolute",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: accentColor,
            opacity: 0.1,
            filter: "blur(80px)",
            top: "-80px",
            right: "-40px",
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
