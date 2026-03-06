import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { posters } from "@/lib/db/schema";
import {
  hasValidMentorBadgeSession,
  MENTOR_BADGE_SESSION_COOKIE,
} from "@/lib/auth/mentor-badge-session";
import { isMentorRole } from "@/lib/poster/semantics";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const poster = await db.query.posters.findFirst({
    where: eq(posters.id, id),
  });

  if (!poster) {
    return NextResponse.json({ error: "Poster not found" }, { status: 404 });
  }

  return NextResponse.json(poster);
}

const patchSchema = z.object({
  name: z.string().min(1).max(60).optional(),
  role: z.string().min(1).optional(),
  organization: z.string().max(40).optional().nullable(),
  template: z.enum(["half-face", "eyes", "smile"]).optional(),
  photoUrl: z.string().url().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = patchSchema.parse(body);

    const existing = await db.query.posters.findFirst({
      where: eq(posters.id, id),
    });

    if (!existing) {
      return NextResponse.json({ error: "Poster not found" }, { status: 404 });
    }

    const updatingMentorPoster = isMentorRole(existing.role) || isMentorRole(data.role);
    if (updatingMentorPoster) {
      const token = request.cookies.get(MENTOR_BADGE_SESSION_COOKIE)?.value;
      const authenticated = await hasValidMentorBadgeSession(token);

      if (!authenticated) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const [updated] = await db
      .update(posters)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(posters.id, id))
      .returning();

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Failed to update poster:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
