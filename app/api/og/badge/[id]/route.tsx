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

  // If a pre-rendered 1200x630 OG image exists, serve it directly
  if (badge.ogImageUrl) {
    return Response.redirect(badge.ogImageUrl, 302);
  }

  // Fallback: generate a text-only OG card (no poster embedding)
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
            opacity: 0.12,
            filter: "blur(100px)",
            top: "-100px",
            right: "-50px",
          }}
        />

        {/* Headline */}
        <div
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "rgba(255,255,255,0.6)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          I&apos;m hacking at She Ships
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "64px",
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
            fontSize: "26px",
            fontWeight: 700,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginTop: "12px",
          }}
        >
          {badge.role}
          {badge.organization ? ` @ ${badge.organization}` : ""}
        </div>

        {/* Badge number */}
        <div
          style={{
            fontSize: "14px",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.3)",
            fontFamily: "monospace",
            textTransform: "uppercase",
            marginTop: "16px",
          }}
        >
          {badgeNumber}
        </div>

        {/* CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "36px",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#1a1a1a",
              backgroundColor: accentColor,
              padding: "8px 20px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Join the hackathon
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            March 6-8, 2026 — 48h
          </div>
        </div>

        {/* Footer branding */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontSize: "16px",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.15em",
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
