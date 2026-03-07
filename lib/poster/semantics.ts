export function isMentorRole(role: string | null | undefined) {
  const normalized = role?.trim().toLowerCase();
  return normalized === "mentor" || normalized === "organizer";
}

export function getPosterBadgeLabel(role: string | null | undefined) {
  return isMentorRole(role) ? "ORGANIZER" : "SHIPPER";
}

export const POSTER_PINK = "#e49bc2";
export const POSTER_GREEN = "#4ade80";
export const POSTER_DEFAULT_FACE_TINT = "#7e3a60";

export function getPosterAreaColors(role: string | null | undefined) {
  if (isMentorRole(role)) {
    return {
      pinkArea: POSTER_GREEN,
      greenArea: POSTER_PINK,
    };
  }

  return {
    pinkArea: POSTER_PINK,
    greenArea: POSTER_GREEN,
  };
}

export function resolvePosterAccentColor(
  role: string | null | undefined,
  accentColor: string
) {
  if (!isMentorRole(role)) return accentColor;

  const normalized = accentColor.trim().toLowerCase();
  if (normalized === POSTER_PINK) return POSTER_GREEN;
  if (normalized === POSTER_GREEN) return POSTER_PINK;

  return accentColor;
}

export function resolvePosterFaceTintColor(
  role: string | null | undefined,
  faceTintHex: string
) {
  if (!isMentorRole(role)) return faceTintHex;

  const normalized = faceTintHex.trim().toLowerCase();
  if (normalized === POSTER_DEFAULT_FACE_TINT || normalized === POSTER_PINK) {
    return POSTER_GREEN;
  }

  return faceTintHex;
}
