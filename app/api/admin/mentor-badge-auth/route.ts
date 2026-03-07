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

const bcryptHashPattern = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;

function normalizeEnvValue(value?: string) {
  if (!value) return null;

  let normalized = value.trim();
  if (
    (normalized.startsWith('"') && normalized.endsWith('"')) ||
    (normalized.startsWith("'") && normalized.endsWith("'"))
  ) {
    normalized = normalized.slice(1, -1).trim();
  }

  normalized = normalized.replace(/\\\$/g, "$");
  return normalized.length > 0 ? normalized : null;
}

function authError(code: string, message: string, status: number) {
  return NextResponse.json({ error: { code, message } }, { status });
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(MENTOR_BADGE_SESSION_COOKIE)?.value;
    const authenticated = await hasValidMentorBadgeSession(token);
    return NextResponse.json({ authenticated });
  } catch (error) {
    console.error("Mentor auth session check failed:", error);
    return authError(
      "AUTH_CONFIG_INVALID_SECRET",
      "Admin auth configuration is invalid",
      500
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = authSchema.parse(body);
    const hash = normalizeEnvValue(process.env.ADMIN_BADGE_PASSWORD_HASH);

    if (!hash) {
      return authError(
        "AUTH_CONFIG_MISSING_HASH",
        "Admin auth is not configured",
        500
      );
    }

    if (!bcryptHashPattern.test(hash)) {
      return authError(
        "AUTH_CONFIG_INVALID_HASH",
        "Admin password hash is invalid",
        500
      );
    }

    const isValid = await bcrypt.compare(data.password, hash);
    if (!isValid) {
      return authError("INVALID_PASSWORD", "Invalid password", 401);
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
      return authError("INVALID_PAYLOAD", "Invalid request payload", 400);
    }

    if (error instanceof Error && error.message.startsWith("AUTH_CONFIG_")) {
      return authError(error.message, "Admin auth configuration is invalid", 500);
    }

    console.error("Mentor auth failed:", error);
    return authError("AUTH_INTERNAL_ERROR", "Internal server error", 500);
  }
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(getMentorBadgeLogoutCookieOptions());
  return response;
}
