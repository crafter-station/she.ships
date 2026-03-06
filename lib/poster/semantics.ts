export function isMentorRole(role: string | null | undefined) {
  return role?.trim().toLowerCase() === "mentor";
}

export function getPosterBadgeLabel(role: string | null | undefined) {
  return isMentorRole(role) ? "MENTOR" : "SHIPPER";
}
