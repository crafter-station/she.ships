import { NextResponse } from "next/server";
import { z } from "zod";
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
    return NextResponse.json({ error: "Badge not found" }, { status: 404 });
  }

  return NextResponse.json(badge);
}

const patchSchema = z.object({
  posterConfig: z.any().optional(),
  posterImageUrl: z.string().url().optional(),
  photoUrl: z.string().url().optional(),
  name: z.string().min(1).max(40).optional(),
  role: z.string().min(1).optional(),
  organization: z.string().max(40).optional().nullable(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = patchSchema.parse(body);

    const [updated] = await db
      .update(badges)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(badges.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Badge not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Failed to update badge:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
