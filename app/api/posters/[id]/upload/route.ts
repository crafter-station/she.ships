import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { posters } from "@/lib/db/schema";
import {
  hasValidMentorBadgeSession,
  MENTOR_BADGE_SESSION_COOKIE,
} from "@/lib/auth/mentor-badge-session";
import { isMentorRole } from "@/lib/poster/semantics";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const poster = await db.query.posters.findFirst({
      where: eq(posters.id, id),
    });

    if (!poster) {
      return NextResponse.json({ error: "Poster not found" }, { status: 404 });
    }

    if (isMentorRole(poster.role)) {
      const token = request.cookies.get(MENTOR_BADGE_SESSION_COOKIE)?.value;
      const authenticated = await hasValidMentorBadgeSession(token);

      if (!authenticated) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max 5MB." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    const blob = await put(`posters/${id}/${file.name}`, file, {
      access: "public",
      allowOverwrite: true,
    });

    const [updated] = await db
      .update(posters)
      .set({ photoUrl: blob.url, updatedAt: new Date() })
      .where(eq(posters.id, id))
      .returning();

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to upload photo:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
