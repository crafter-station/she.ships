import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { badges } from "@/lib/db/schema";

function uniqueSuffix(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Verify badge exists
    const badge = await db.query.badges.findFirst({
      where: eq(badges.id, id),
    });
    if (!badge) {
      return NextResponse.json({ error: "Badge not found" }, { status: 404 });
    }

    const formData = await request.formData();

    const result: { photoUrl?: string; posterImageUrl?: string } = {};

    // Handle photo upload (client converts to PNG before sending)
    const photoFile = formData.get("photo") as File | null;
    if (photoFile) {
      const blob = await put(
        `badges/${id}/photo-${uniqueSuffix()}.png`,
        photoFile,
        {
          access: "public",
          contentType: "image/png",
        }
      );
      result.photoUrl = blob.url;

      await db
        .update(badges)
        .set({ photoUrl: blob.url, updatedAt: new Date() })
        .where(eq(badges.id, id));
    }

    // Handle rendered poster upload (JPEG for fast OG loading)
    const posterFile = formData.get("poster") as File | null;
    if (posterFile) {
      const blob = await put(
        `badges/${id}/poster-${uniqueSuffix()}.jpg`,
        posterFile,
        {
          access: "public",
          contentType: "image/jpeg",
        }
      );
      result.posterImageUrl = blob.url;

      await db
        .update(badges)
        .set({ posterImageUrl: blob.url, updatedAt: new Date() })
        .where(eq(badges.id, id));
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to upload poster assets:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
