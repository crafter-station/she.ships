import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  createMentorBadgeSessionToken,
  getMentorBadgeLogoutCookieOptions,
  getMentorBadgeSessionCookieOptions,
  hasValidMentorBadgeSession,
  MENTOR_BADGE_SESSION_COOKIE,
} from "@/lib/auth/mentor-badge-session";

const authSchema = z.object({
  password: z.string().min(1),
});

export async function GET(request: NextRequest) {
  const token = request.cookies.get(MENTOR_BADGE_SESSION_COOKIE)?.value;
  const authenticated = await hasValidMentorBadgeSession(token);
  return NextResponse.json({ authenticated });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = authSchema.parse(body);
    const hash = process.env.ADMIN_BADGE_PASSWORD_HASH;

    if (!hash) {
      return NextResponse.json({ error: "Auth is not configured" }, { status: 500 });
    }

    const isValid = await bcrypt.compare(data.password, hash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const sessionToken = await createMentorBadgeSessionToken();
    const response = NextResponse.json({ authenticated: true });

    response.cookies.set({
      ...getMentorBadgeSessionCookieOptions(),
      value: sessionToken,
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    console.error("Mentor auth failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(getMentorBadgeLogoutCookieOptions());
  return response;
}
