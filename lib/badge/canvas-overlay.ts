export interface BadgeOverlayInfo {
  name: string;
  role: string;
  organization: string | null;
  badgeNumber: string;
  accentColor: string;
}

/**
 * Draw the text overlay onto a composite canvas (left side),
 * matching the capture page layout.
 */
export function drawOverlay(
  ctx: CanvasRenderingContext2D,
  info: BadgeOverlayInfo,
  width: number,
  height: number
) {
  const left = Math.round(width * 0.08);
  const regionW = Math.round(width * 0.4);
  const centerY = height / 2;

  // Semi-transparent backdrop for readability
  const grad = ctx.createLinearGradient(0, 0, regionW + 80, 0);
  grad.addColorStop(0, "rgba(0,0,0,0.7)");
  grad.addColorStop(0.7, "rgba(0,0,0,0.4)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, regionW + 80, height);

  let y = centerY - 160;

  // Label
  ctx.fillStyle = info.accentColor;
  ctx.font = "bold 14px sans-serif";
  ctx.letterSpacing = "3px";
  ctx.textAlign = "left";
  ctx.fillText("SHE SHIPS 2026", left, y);
  ctx.letterSpacing = "0px";

  // Headline
  y += 50;
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 42px sans-serif";
  const headlineLines = ["I'M HACKING AT", "SHE SHIPS"];
  for (const line of headlineLines) {
    ctx.fillText(line, left, y);
    y += 48;
  }

  // Date
  y += 12;
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "14px sans-serif";
  ctx.fillText("March 6-8, 2026 — 48h Global Hackathon", left, y);

  // Divider
  y += 28;
  ctx.strokeStyle = info.accentColor + "33";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(left, y);
  ctx.lineTo(left + regionW - 40, y);
  ctx.stroke();

  // Name
  y += 36;
  ctx.fillStyle = info.accentColor;
  ctx.font = "bold 28px sans-serif";
  ctx.fillText(info.name.toUpperCase(), left, y);

  // Role
  y += 28;
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.font = "bold 14px sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText(info.role.toUpperCase(), left, y);
  ctx.letterSpacing = "0px";

  // Organization
  if (info.organization) {
    y += 22;
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "14px sans-serif";
    ctx.fillText(info.organization, left, y);
  }

  // Number
  y += 36;
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.font = "12px monospace";
  ctx.letterSpacing = "3px";
  ctx.fillText(`#${info.badgeNumber}`, left, y);
  ctx.letterSpacing = "0px";

  // Branding
  y += 28;
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.font = "12px sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText("sheships.org", left, y);
  ctx.letterSpacing = "0px";
}

/**
 * Draw the text overlay below the badge (mobile screenshot layout).
 * Badge occupies the top ~55%, text fills the bottom with a gradient fade.
 */
function drawOverlayMobile(
  ctx: CanvasRenderingContext2D,
  info: BadgeOverlayInfo,
  width: number,
  height: number
) {
  const left = Math.round(width * 0.06);
  const badgeBottom = Math.round(height * 0.67);

  // Gradient backdrop from badge area down
  const grad = ctx.createLinearGradient(0, badgeBottom - 80, 0, badgeBottom + 40);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(1, "rgba(0,0,0,0.85)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, badgeBottom - 80, width, height - badgeBottom + 80);

  // Solid dark below the gradient
  ctx.fillStyle = "rgba(0,0,0,0.85)";
  ctx.fillRect(0, badgeBottom + 40, width, height);

  let y = badgeBottom + 20;

  // Label
  ctx.fillStyle = info.accentColor;
  ctx.font = "bold 11px sans-serif";
  ctx.letterSpacing = "2px";
  ctx.textAlign = "left";
  ctx.fillText("SHE SHIPS 2026", left, y);
  ctx.letterSpacing = "0px";

  // Headline
  y += 32;
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 28px sans-serif";
  ctx.fillText("I'M HACKING AT SHE SHIPS", left, y);

  // Date
  y += 24;
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "11px sans-serif";
  ctx.fillText("March 6-8, 2026 — 48h Global Hackathon", left, y);

  // Divider
  y += 20;
  ctx.strokeStyle = info.accentColor + "33";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(left, y);
  ctx.lineTo(width - left, y);
  ctx.stroke();

  // Name
  y += 28;
  ctx.fillStyle = info.accentColor;
  ctx.font = "bold 22px sans-serif";
  ctx.fillText(info.name.toUpperCase(), left, y);

  // Role
  y += 24;
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.font = "bold 11px sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText(info.role.toUpperCase(), left, y);
  ctx.letterSpacing = "0px";

  // Organization
  if (info.organization) {
    y += 18;
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "11px sans-serif";
    ctx.fillText(info.organization, left, y);
  }

  // Number + branding on same line at bottom
  y += 28;
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.font = "10px monospace";
  ctx.letterSpacing = "2px";
  ctx.fillText(`#${info.badgeNumber}`, left, y);

  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.font = "10px sans-serif";
  ctx.fillText("sheships.org", width - left, y);
  ctx.textAlign = "left";
  ctx.letterSpacing = "0px";
}

/**
 * Take a screenshot by compositing the Three.js canvas + text overlay,
 * then trigger a PNG download. Fully client-side, no server round trip.
 */
export function takeScreenshot(info: BadgeOverlayInfo): boolean {
  const threeCanvas = document.querySelector("canvas");
  if (!threeCanvas) return false;

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const w = threeCanvas.width;
  const h = threeCanvas.height;
  const composite = document.createElement("canvas");
  composite.width = w;
  composite.height = h;
  const ctx = composite.getContext("2d")!;

  // Fill dark background to prevent transparency
  ctx.fillStyle = "#131414";
  ctx.fillRect(0, 0, w, h);

  // Draw 3D scene
  ctx.drawImage(threeCanvas, 0, 0, w, h);

  // Mobile: text below badge. Desktop: text on left side.
  if (isMobile) {
    drawOverlayMobile(ctx, info, w, h);
  } else {
    drawOverlay(ctx, info, w, h);
  }

  // Export as PNG
  composite.toBlob(async (blob) => {
    if (!blob) return;

    // On mobile, use native share sheet so user can save to gallery
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && navigator.canShare) {
      const file = new File([blob], "sheships.png", { type: "image/png" });
      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file] });
          return;
        } catch {
          // User cancelled or share failed — fall through to download
        }
      }
    }

    // Desktop fallback: regular download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sheships.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, "image/png");

  return true;
}
