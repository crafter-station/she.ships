import { ImageResponse } from "next/og";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { badges } from "@/lib/db/schema";

/** Fetch an image and return it as a base64 data URI for Satori embedding. */
async function toDataUri(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    return `data:${contentType};base64,${Buffer.from(buf).toString("base64")}`;
  } catch {
    return null;
  }
}

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

  // Pre-fetch poster image as data URI so Satori doesn't need external fetch
  const posterDataUri = badge.posterImageUrl
    ? await toDataUri(badge.posterImageUrl)
    : null;

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
          {/* Headline */}
          <div
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            I&apos;m hacking at She Ships
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: "58px",
              fontWeight: 700,
              color: accentColor,
              marginTop: "8px",
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
              color: "rgba(255,255,255,0.8)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginTop: "10px",
            }}
          >
            {badge.role}
            {badge.organization ? ` @ ${badge.organization}` : ""}
          </div>

          {/* Badge number */}
          <div
            style={{
              fontSize: "13px",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "monospace",
              textTransform: "uppercase",
              marginTop: "12px",
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
              marginTop: "32px",
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
              fontSize: "13px",
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginTop: "20px",
            }}
          >
            sheships.org
          </div>
        </div>

        {/* Right side: poster thumbnail (if available) */}
        {posterDataUri && (
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
              src={posterDataUri}
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
