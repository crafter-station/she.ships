import { NextResponse } from "next/server";
import { z } from "zod";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { badges } from "@/lib/db/schema";
import { particleConfigSchema } from "@/lib/badge/particle-config";
import { getApprovedGuest } from "@/lib/luma";

const createBadgeSchema = z.object({
  id: z.string().min(1),
  role: z.string().min(1),
  organization: z.string().max(40).optional(),
  particleConfig: particleConfigSchema,
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = createBadgeSchema.parse(body);

    const guest = await getApprovedGuest(data.email);

    if (!guest.approved) {
      return NextResponse.json({ error: guest.error }, { status: 403 });
    }

    // Check if a badge already exists for this email
    const [existing] = await db
      .select()
      .from(badges)
      .where(eq(badges.email, data.email))
      .limit(1);

    if (existing) {
      // Update name from Luma and organization from form
      const [updated] = await db
        .update(badges)
        .set({
          name: guest.name,
          organization: data.organization ?? null,
          updatedAt: new Date(),
        })
        .where(eq(badges.id, existing.id))
        .returning();

      return NextResponse.json(
        { badge: updated, created: false },
        { status: 200 }
      );
    }

    // Find the minimum available badge number (gap-filling)
    const result = await db.execute<{ nextNumber: number }>(
      sql`SELECT COALESCE(
        (SELECT min(n) FROM generate_series(0, (SELECT COALESCE(max(number), -1) + 1 FROM badges)) AS n
         WHERE n NOT IN (SELECT number FROM badges)),
        0
      ) AS "nextNumber"`
    );
    const nextNumber = result.rows[0].nextNumber;

    const [badge] = await db
      .insert(badges)
      .values({
        id: data.id,
        number: nextNumber,
        email: data.email,
        name: guest.name,
        role: data.role,
        organization: data.organization ?? null,
        particleConfig: data.particleConfig,
      })
      .returning();

    return NextResponse.json({ badge, created: true }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Failed to create badge:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
