import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { badges } from "@/lib/db/schema";
import { particleConfigSchema } from "@/lib/badge/particle-config";

const createBadgeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(40),
  role: z.string().min(1),
  organization: z.string().max(40).optional(),
  particleConfig: particleConfigSchema,
  secret: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = createBadgeSchema.parse(body);

    if (data.secret !== process.env.BADGE_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 403 });
    }

    const [badge] = await db
      .insert(badges)
      .values({
        id: data.id,
        name: data.name,
        role: data.role,
        organization: data.organization ?? null,
        particleConfig: data.particleConfig,
      })
      .returning();

    return NextResponse.json(badge, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Failed to create badge:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
