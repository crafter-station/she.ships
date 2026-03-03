import type { PosterOptions, FaceBox, FilterSettings } from "./types";

// ── Brand colors (always pink/rose) ─────────────────────────────────
const ACCENT_COLOR = "#e49bc2";
const FACE_TINT_HEX = "#7e3a60";
const FACE_TINT_OPACITY = 0.66;

// ── Grain texture (procedurally generated, cached) ──────────────────
let grainCanvas: HTMLCanvasElement | null = null;

function getGrainTexture(): HTMLCanvasElement {
  if (grainCanvas) return grainCanvas;
  grainCanvas = document.createElement("canvas");
  grainCanvas.width = 512;
  grainCanvas.height = 512;
  const ctx = grainCanvas.getContext("2d")!;
  const imageData = ctx.createImageData(512, 512);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const val = Math.random() * 255;
    imageData.data[i] = val;
    imageData.data[i + 1] = val;
    imageData.data[i + 2] = val;
    imageData.data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
  return grainCanvas;
}

function tileGrain(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  alpha: number
) {
  if (alpha <= 0) return;
  const grain = getGrainTexture();
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.globalCompositeOperation = "overlay";
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  for (let gx = x; gx < x + w; gx += 512) {
    for (let gy = y; gy < y + h; gy += 512) {
      ctx.drawImage(grain, gx, gy);
    }
  }
  ctx.restore();
}

// ── Helper: cover-fit source coordinates ────────────────────────────
function getCoverCoords(
  imgW: number,
  imgH: number,
  targetW: number,
  targetH: number,
  align: "top" | "center" = "center"
) {
  const imgRatio = imgW / imgH;
  const targetRatio = targetW / targetH;
  let sx: number, sy: number, sw: number, sh: number;
  if (imgRatio > targetRatio) {
    sh = imgH;
    sw = imgH * targetRatio;
    sx = (imgW - sw) / 2;
    sy = 0;
  } else {
    sw = imgW;
    sh = imgW / targetRatio;
    sx = 0;
    sy = align === "top" ? 0 : (imgH - sh) / 2;
  }
  return { sx, sy, sw, sh };
}

function clampBox(box: FaceBox, imgW: number, imgH: number): FaceBox {
  const x = Math.max(0, Math.min(box.x, imgW - 1));
  const y = Math.max(0, Math.min(box.y, imgH - 1));
  const w = Math.min(box.width, imgW - x);
  const h = Math.min(box.height, imgH - y);
  return { x, y, width: w, height: h };
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function imgToCanvas(
  imgX: number,
  imgY: number,
  imgW: number,
  imgH: number,
  canvasW: number,
  canvasH: number,
  cover: { sx: number; sy: number; sw: number; sh: number }
) {
  const scaleX = canvasW / cover.sw;
  const scaleY = canvasH / cover.sh;
  return {
    x: (imgX - cover.sx) * scaleX,
    y: (imgY - cover.sy) * scaleY,
    w: imgW * scaleX,
    h: imgH * scaleY,
  };
}

function renderGrayscaleTinted(
  image: HTMLImageElement,
  srcX: number,
  srcY: number,
  srcW: number,
  srcH: number,
  destW: number,
  destH: number,
  filter: FilterSettings
): HTMLCanvasElement {
  const w = Math.ceil(destW);
  const h = Math.ceil(destH);
  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const offCtx = off.getContext("2d")!;

  if (isFilterUnsupported()) {
    offCtx.drawImage(image, srcX, srcY, srcW, srcH, 0, 0, w, h);
    applyGrayscaleBrightness(offCtx, w, h, 1.0);
  } else {
    offCtx.filter = "grayscale(100%)";
    offCtx.drawImage(image, srcX, srcY, srcW, srcH, 0, 0, w, h);
    offCtx.filter = "none";
  }

  // Apply tint
  offCtx.globalCompositeOperation = "multiply";
  offCtx.fillStyle = hexToRgba(FACE_TINT_HEX, FACE_TINT_OPACITY);
  offCtx.fillRect(0, 0, w, h);
  offCtx.globalCompositeOperation = "screen";
  offCtx.fillStyle = hexToRgba(FACE_TINT_HEX, 0.1);
  offCtx.fillRect(0, 0, w, h);
  offCtx.globalCompositeOperation = "source-over";
  return off;
}

// ── Detect if ctx.filter is unsupported (Safari < 17.2) ─────────────
let _filterSupported: boolean | null = null;
function isFilterUnsupported(): boolean {
  if (_filterSupported !== null) return !_filterSupported;
  if (typeof document === "undefined") return false;
  try {
    const testCanvas = document.createElement("canvas");
    testCanvas.width = 1;
    testCanvas.height = 1;
    const testCtx = testCanvas.getContext("2d")!;
    testCtx.filter = "grayscale(100%)";
    _filterSupported = testCtx.filter === "grayscale(100%)";
  } catch {
    _filterSupported = false;
  }
  return !_filterSupported;
}

// ── Manual grayscale + brightness for Safari fallback ───────────────
function applyGrayscaleBrightness(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  brightness: number
) {
  const imageData = ctx.getImageData(0, 0, w, h);
  const d = imageData.data;
  for (let i = 0; i < d.length; i += 4) {
    const gray = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;
    const val = Math.min(255, gray * brightness);
    d[i] = val;
    d[i + 1] = val;
    d[i + 2] = val;
  }
  ctx.putImageData(imageData, 0, 0);
}

// ── Sample edge colors for seamless blending ────────────────────────
function sampleEdgeColors(
  image: HTMLImageElement,
  cover: { sx: number; sy: number; sw: number; sh: number }
): { top: string; bottom: string; left: string; right: string; avg: string } {
  const size = 64;
  const off = document.createElement("canvas");
  off.width = size;
  off.height = size;
  const c = off.getContext("2d")!;
  c.drawImage(
    image,
    cover.sx,
    cover.sy,
    cover.sw,
    cover.sh,
    0,
    0,
    size,
    size
  );
  const data = c.getImageData(0, 0, size, size).data;

  const sampleRegion = (pixels: number[][]) => {
    let r = 0,
      g = 0,
      b = 0,
      count = 0;
    for (const [x, y] of pixels) {
      const i = (y * size + x) * 4;
      const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
      r += gray;
      g += gray;
      b += gray;
      count++;
    }
    const br = 0.3;
    const ar = Math.round((r / count) * br);
    const ag = Math.round((g / count) * br);
    const ab = Math.round((b / count) * br);
    return `rgb(${ar},${ag},${ab})`;
  };

  const depth = 8;
  const topPx: number[][] = [],
    bottomPx: number[][] = [];
  const leftPx: number[][] = [],
    rightPx: number[][] = [];
  for (let x = 0; x < size; x++) {
    for (let d = 0; d < depth; d++) {
      topPx.push([x, d]);
      bottomPx.push([x, size - 1 - d]);
    }
  }
  for (let y = 0; y < size; y++) {
    for (let d = 0; d < depth; d++) {
      leftPx.push([d, y]);
      rightPx.push([size - 1 - d, y]);
    }
  }
  const allPx = [...topPx, ...bottomPx, ...leftPx, ...rightPx];

  return {
    top: sampleRegion(topPx),
    bottom: sampleRegion(bottomPx),
    left: sampleRegion(leftPx),
    right: sampleRegion(rightPx),
    avg: sampleRegion(allPx),
  };
}

// ── BACKGROUND ──────────────────────────────────────────────────────
function drawBackground(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  cover: { sx: number; sy: number; sw: number; sh: number },
  width: number,
  height: number,
  filter: FilterSettings,
  offsetX = 0,
  offsetY = 0
) {
  const edges = sampleEdgeColors(image, cover);

  ctx.fillStyle = edges.avg;
  ctx.fillRect(0, 0, width, height);

  const topGrad = ctx.createLinearGradient(0, 0, 0, height * 0.2);
  topGrad.addColorStop(0, edges.top);
  topGrad.addColorStop(1, "transparent");
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, width, height * 0.2);

  const botGrad = ctx.createLinearGradient(0, height * 0.8, 0, height);
  botGrad.addColorStop(0, "transparent");
  botGrad.addColorStop(1, edges.bottom);
  ctx.fillStyle = botGrad;
  ctx.fillRect(0, height * 0.8, width, height * 0.2);

  const leftGrad = ctx.createLinearGradient(0, 0, width * 0.15, 0);
  leftGrad.addColorStop(0, edges.left);
  leftGrad.addColorStop(1, "transparent");
  ctx.fillStyle = leftGrad;
  ctx.fillRect(0, 0, width * 0.15, height);

  const rightGrad = ctx.createLinearGradient(width * 0.85, 0, width, 0);
  rightGrad.addColorStop(0, "transparent");
  rightGrad.addColorStop(1, edges.right);
  ctx.fillStyle = rightGrad;
  ctx.fillRect(width * 0.85, 0, width * 0.15, height);

  const sharpOff = document.createElement("canvas");
  sharpOff.width = width;
  sharpOff.height = height;
  const sc = sharpOff.getContext("2d")!;
  sc.fillStyle = edges.avg;
  sc.fillRect(0, 0, width, height);
  sc.drawImage(
    image,
    cover.sx,
    cover.sy,
    cover.sw,
    cover.sh,
    offsetX,
    offsetY,
    width,
    height
  );

  if (isFilterUnsupported()) {
    applyGrayscaleBrightness(sc, width, height, 0.3);
    const blurScale = 0.08;
    const smallW = Math.max(1, Math.round(width * blurScale));
    const smallH = Math.max(1, Math.round(height * blurScale));
    const blurOff = document.createElement("canvas");
    blurOff.width = smallW;
    blurOff.height = smallH;
    const bc = blurOff.getContext("2d")!;
    bc.drawImage(sharpOff, 0, 0, smallW, smallH);
    const midW = Math.round(width * 0.3);
    const midH = Math.round(height * 0.3);
    const midOff = document.createElement("canvas");
    midOff.width = midW;
    midOff.height = midH;
    const mc = midOff.getContext("2d")!;
    mc.imageSmoothingEnabled = true;
    mc.imageSmoothingQuality = "high";
    mc.drawImage(blurOff, 0, 0, midW, midH);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(midOff, 0, 0, width, height);
  } else {
    ctx.filter = `grayscale(100%) blur(${filter.bgBlur}px) brightness(0.3)`;
    ctx.drawImage(sharpOff, 0, 0);
    ctx.filter = "none";
  }
}

// ── Text wrapping helper ────────────────────────────────────────────
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";
  for (const word of words) {
    const test = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = test;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// ── Main render function ────────────────────────────────────────────
export function renderPoster(
  canvas: HTMLCanvasElement,
  options: PosterOptions
): void {
  const { speaker, image, bgImage, detection, template, filter, width, height } =
    options;
  const ctx = canvas.getContext("2d")!;
  canvas.width = width;
  canvas.height = height;

  // Top-aligned cover
  const baseCover = getCoverCoords(
    image.width,
    image.height,
    width,
    height,
    "top"
  );

  // Apply zoom
  const zoom = Math.max(0.5, Math.min(filter.zoom, 2.0));
  const zoomedSw = baseCover.sw / zoom;
  const zoomedSh = baseCover.sh / zoom;

  // Apply pan
  const maxPanX = Math.max(image.width - zoomedSw, zoomedSw * 0.5);
  const maxPanY = Math.max(image.height - zoomedSh, zoomedSh * 0.5);
  const centerSx = baseCover.sx + (baseCover.sw - zoomedSw) / 2;
  const centerSy = baseCover.sy + (baseCover.sh - zoomedSh) / 2;
  const panOffsetX = -(filter.panX / 100) * (maxPanX / 2);
  const panOffsetY = -(filter.panY / 100) * (maxPanY / 2);
  const rawSx = centerSx + panOffsetX;
  const rawSy = centerSy + panOffsetY;

  const cover = {
    sx: Math.max(0, Math.min(rawSx, image.width - zoomedSw)),
    sy: Math.max(0, Math.min(rawSy, image.height - zoomedSh)),
    sw: zoomedSw,
    sh: zoomedSh,
  };

  // Determine crop region
  let cropRegion: FaceBox;
  if (template === "eyes") cropRegion = detection.eyesRegion;
  else if (template === "smile") cropRegion = detection.smileRegion;
  else cropRegion = detection.rightHalfBox;
  const clamped = clampBox(cropRegion, image.width, image.height);

  // ── COMPUTE BOX POSITION ──────────────────────────────────────
  const margin = width * 0.06;
  const cropAspect = clamped.width / clamped.height;
  let boxX: number,
    boxY: number,
    boxW: number,
    boxH: number;
  // Track how much the box moved so we can shift the BG by the same delta
  let bgShiftX = 0;
  let bgShiftY = 0;

  if (filter.overlay) {
    // Natural position from imgToCanvas — matches the BG since both
    // use the same top-aligned cover coords.
    const nat = imgToCanvas(
      clamped.x,
      clamped.y,
      clamped.width,
      clamped.height,
      width,
      height,
      cover
    );
    boxX = nat.x;
    boxY = nat.y;
    boxW = nat.w;
    boxH = nat.h;

    // When autoPosition is ON, constrain the box to safe zones
    // AND shift the BG by the same amount so the face stays aligned.
    if (filter.autoPosition) {
      const origBoxX = boxX;
      const origBoxY = boxY;
      const logoZoneBottom = height * 0.1;
      const badgeW = width * 0.05;
      const textZoneTop = height * 0.58;

      if (boxY < logoZoneBottom) {
        boxY = logoZoneBottom;
      }
      if (boxX + boxW + badgeW > width - margin) {
        boxX = width - margin - boxW - badgeW;
      }
      if (boxX < margin) {
        boxX = margin;
      }
      if (boxY + boxH > textZoneTop) {
        boxY = textZoneTop - boxH;
        if (boxY < logoZoneBottom) {
          boxY = logoZoneBottom;
          boxH = textZoneTop - logoZoneBottom;
          boxW = boxH * cropAspect;
        }
      }

      bgShiftX = boxX - origBoxX;
      bgShiftY = boxY - origBoxY;
    }
  } else {
    if (template === "half-face") {
      boxH = height * 0.55;
      boxW = boxH * cropAspect;
      if (boxW > width * 0.35) {
        boxW = width * 0.35;
        boxH = boxW / cropAspect;
      }
      boxX = width - boxW - margin;
      boxY = height * 0.08;
    } else {
      boxW = width * 0.6;
      boxH = boxW / cropAspect;
      if (boxH > height * 0.25) {
        boxH = height * 0.25;
        boxW = boxH * cropAspect;
      }
      boxX = (width - boxW) / 2;
      boxY = height * 0.22;
    }
  }

  // ── 1) DRAW BACKGROUND ─────────────────────────────────────────
  drawBackground(ctx, image, cover, width, height, filter, bgShiftX, bgShiftY);
  tileGrain(ctx, 0, 0, width, height, filter.bgGrain);

  // ── 2) TINTED FACE CROP BOX ────────────────────────────────────
  const tc = renderGrayscaleTinted(
    image,
    clamped.x,
    clamped.y,
    clamped.width,
    clamped.height,
    boxW,
    boxH,
    filter
  );
  ctx.save();
  ctx.beginPath();
  ctx.rect(boxX, boxY, boxW, boxH);
  ctx.clip();
  ctx.drawImage(tc, boxX, boxY);
  tileGrain(ctx, boxX, boxY, boxW, boxH, filter.faceGrain);
  ctx.restore();

  ctx.strokeStyle = ACCENT_COLOR;
  ctx.lineWidth = 2;
  ctx.strokeRect(boxX, boxY, boxW, boxH);

  // ── 3) BADGE LABEL (attached to the crop box) ──────────────────
  {
    const badgeText = "PARTICIPANTE";
    const badgeFontSize = Math.round(width * 0.016);
    ctx.font = `bold ${badgeFontSize}px "Space Mono", "Geist", monospace`;
    const textW = ctx.measureText(badgeText).width;
    const badgePadY = badgeFontSize * 1.2;
    const badgeW = width * 0.042;
    const badgeH = textW + badgePadY * 2;
    const badgeX = boxX + boxW - 1;
    const badgeY = boxY -1;

    ctx.save();
    ctx.fillStyle = ACCENT_COLOR;
    ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
    ctx.translate(badgeX + badgeW / 2, badgeY + badgeH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = "#1a1a1a";
    ctx.font = `bold ${badgeFontSize}px "Space Mono", "Geist", monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(badgeText, 0, 0);
    ctx.restore();
  }

  // ── 4) Frame overlay ──────────────────────────────────────────
  if (bgImage) {
    const bgCover = getCoverCoords(
      bgImage.width,
      bgImage.height,
      width,
      height
    );
    ctx.drawImage(
      bgImage,
      bgCover.sx,
      bgCover.sy,
      bgCover.sw,
      bgCover.sh,
      0,
      0,
      width,
      height
    );
  }

  // ── 5) BOTTOM SECTION: portrait + name + role ─────────────────
  const nameFontSize = Math.round(width * 0.075);
  const roleFontSize = Math.round(width * 0.026);
  const textX = margin;
  const textMaxW = width * 0.46;

  // Pre-calculate role lines
  ctx.font = `600 ${roleFontSize}px "Space Grotesk Variable", "Geist", sans-serif`;
  const roleLines = wrapText(ctx, speaker.role.toUpperCase(), textMaxW);
  const roleBlockH = roleLines.length * roleFontSize * 1.4;

  // Pre-calculate name lines
  ctx.font = `900 ${nameFontSize}px "Space Grotesk Variable", "Geist", sans-serif`;
  const nameWords = speaker.name.toUpperCase().split(" ");
  const nameLines: string[] = [];
  let tmpLine = "";
  for (const word of nameWords) {
    const test = tmpLine ? `${tmpLine} ${word}` : word;
    if (ctx.measureText(test).width > textMaxW && tmpLine) {
      nameLines.push(tmpLine);
      tmpLine = word;
    } else {
      tmpLine = test;
    }
  }
  if (tmpLine) nameLines.push(tmpLine);
  const nameBlockH = nameLines.length * nameFontSize * 1.1;

  // Portrait sizing
  const imgAspect = image.width / image.height;
  const pScale = width * 0.12;
  let pW: number, pH: number;
  if (imgAspect > 1) {
    pW = pScale;
    pH = pScale / imgAspect;
  } else {
    pH = pScale;
    pW = pScale * imgAspect;
  }

  // Layout from bottom
  const bottomEdge = height * 0.93;
  const roleStartY = bottomEdge - roleBlockH;
  const nameRoleGap = nameFontSize * 0.6;
  const nameBottomY = roleStartY - nameRoleGap;
  const nameTopY = nameBottomY - nameBlockH + nameFontSize;
  const portraitGap = nameFontSize * 0.5;
  const pY = nameTopY - nameFontSize - portraitGap - pH;
  const pX = margin;

  // Draw portrait
  {
    const tp = renderGrayscaleTinted(
      image,
      0,
      0,
      image.width,
      image.height,
      pW,
      pH,
      filter
    );
    ctx.drawImage(tp, pX, pY);
    tileGrain(ctx, pX, pY, pW, pH, filter.faceGrain);

    const bPad = 8,
      bLen = 14;
    ctx.strokeStyle = "#4ade80";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pX + pW + bPad - bLen, pY - bPad);
    ctx.lineTo(pX + pW + bPad, pY - bPad);
    ctx.lineTo(pX + pW + bPad, pY - bPad + bLen);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pX - bPad + bLen, pY + pH + bPad);
    ctx.lineTo(pX - bPad, pY + pH + bPad);
    ctx.lineTo(pX - bPad, pY + pH + bPad - bLen);
    ctx.stroke();
  }

  // Draw name
  ctx.fillStyle = "#ffffff";
  ctx.font = `900 ${nameFontSize}px "Space Grotesk Variable", "Geist", sans-serif`;
  ctx.textAlign = "left";
  for (let i = 0; i < nameLines.length; i++) {
    ctx.fillText(nameLines[i], textX, nameTopY + i * nameFontSize * 1.1);
  }

  // Draw role
  ctx.fillStyle = "#4ade80";
  ctx.font = `600 ${roleFontSize}px "Space Grotesk Variable", "Geist", sans-serif`;
  for (let i = 0; i < roleLines.length; i++) {
    ctx.fillText(roleLines[i], textX, roleStartY + i * roleFontSize * 1.4);
  }
}

/** Export as lossless PNG — used for user downloads. */
export function exportPoster(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to export canvas"));
      },
      "image/png",
      1
    );
  });
}

/** Export as compressed JPEG — used for autosave / OG images (~10x smaller). */
export function exportPosterJpeg(
  canvas: HTMLCanvasElement,
  quality = 0.82
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to export canvas as JPEG"));
      },
      "image/jpeg",
      quality
    );
  });
}
