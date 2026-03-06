import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { posters } from "@/lib/db/schema";
import { getApprovedGuest } from "@/lib/luma";
import {
  hasValidMentorBadgeSession,
  MENTOR_BADGE_SESSION_COOKIE,
} from "@/lib/auth/mentor-badge-session";
import { isMentorRole } from "@/lib/poster/semantics";

const createPosterSchema = z.object({
  id: z.string().min(1),
  role: z.string().min(1),
  organization: z.string().max(40).optional(),
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createPosterSchema.parse(body);
    const creatingMentorPoster = isMentorRole(data.role);

    if (creatingMentorPoster) {
      const token = request.cookies.get(MENTOR_BADGE_SESSION_COOKIE)?.value;
      const authenticated = await hasValidMentorBadgeSession(token);

      if (!authenticated) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const guest = await getApprovedGuest(data.email);

    if (!guest.approved) {
      return NextResponse.json({ error: guest.error }, { status: 403 });
    }

    // Check if a poster already exists for this email
    const [existing] = await db
      .select()
      .from(posters)
      .where(eq(posters.email, data.email))
      .limit(1);

    if (existing) {
      const existingMentorPoster = isMentorRole(existing.role);
      if (existingMentorPoster !== creatingMentorPoster) {
        return NextResponse.json({ error: "role_conflict" }, { status: 409 });
      }

      const [updated] = await db
        .update(posters)
        .set({
          name: guest.name,
          role: data.role,
          organization: data.organization ?? null,
          updatedAt: new Date(),
        })
        .where(eq(posters.id, existing.id))
        .returning();

      return NextResponse.json(
        { poster: updated, created: false },
        { status: 200 }
      );
    }

    // Find the minimum available poster number (gap-filling)
    const result = await db.execute<{ nextNumber: number }>(
      sql`SELECT COALESCE(
        (SELECT min(n) FROM generate_series(0, (SELECT COALESCE(max(number), -1) + 1 FROM posters)) AS n
         WHERE n NOT IN (SELECT number FROM posters)),
        0
      ) AS "nextNumber"`
    );
    const nextNumber = result.rows[0].nextNumber;

    const [poster] = await db
      .insert(posters)
      .values({
        id: data.id,
        number: nextNumber,
        email: data.email,
        name: guest.name,
        role: data.role,
        organization: data.organization ?? null,
      })
      .returning();

    return NextResponse.json({ poster, created: true }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Failed to create poster:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
