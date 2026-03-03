/**
 * Download a poster image.
 * On mobile: uses navigator.share() so the user gets the native "Save Image" option.
 * On desktop: triggers a standard file download via anchor element.
 */
export async function downloadPosterBlob(blob: Blob, filename: string) {
  const file = new File([blob], filename, { type: "image/png" });

  // Mobile: use native share sheet → "Save Image"
  if (
    typeof navigator !== "undefined" &&
    navigator.canShare?.({ files: [file] })
  ) {
    await navigator.share({ files: [file] });
    return;
  }

  // Desktop fallback: anchor download
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
