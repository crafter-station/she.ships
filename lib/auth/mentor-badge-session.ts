export const MENTOR_BADGE_SESSION_COOKIE = "mentor_badge_session";
export const MENTOR_BADGE_SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

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

function getSessionSecret() {
  const secret = normalizeEnvValue(process.env.ADMIN_BADGE_SESSION_SECRET);
  if (!secret) {
    throw new Error("AUTH_CONFIG_MISSING_SECRET");
  }

  if (secret.length < 32) {
    throw new Error("AUTH_CONFIG_INVALID_SECRET");
  }

  return secret;
}

function toHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function signPayload(payload: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return toHex(new Uint8Array(signatureBuffer));
}

export async function createMentorBadgeSessionToken() {
  const expiresAt = Date.now() + MENTOR_BADGE_SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `${expiresAt}`;
  const signature = await signPayload(payload);
  return `${payload}.${signature}`;
}

export async function hasValidMentorBadgeSession(token?: string | null) {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [expiresAtRaw, signatureRaw] = parts;
  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return false;

  const expectedSignature = await signPayload(expiresAtRaw);
  if (signatureRaw.length !== expectedSignature.length) return false;

  let mismatch = 0;
  for (let i = 0; i < signatureRaw.length; i += 1) {
    mismatch |= signatureRaw.charCodeAt(i) ^ expectedSignature.charCodeAt(i);
  }

  return mismatch === 0;
}

export function getMentorBadgeSessionCookieOptions() {
  return {
    name: MENTOR_BADGE_SESSION_COOKIE,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MENTOR_BADGE_SESSION_MAX_AGE_SECONDS,
  };
}

export function getMentorBadgeLogoutCookieOptions() {
  return {
    name: MENTOR_BADGE_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  };
}
