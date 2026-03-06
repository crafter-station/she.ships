import type { PosterOptions, FaceBox, FilterSettings } from "./types"
import { getPosterBadgeLabel } from "./semantics"

// ── Font loading (cached) ───────────────────────────────────────────
let fontsLoaded: Promise<void> | null = null

function loadPosterFonts(): Promise<void> {
  if (fontsLoaded) return fontsLoaded
  fontsLoaded = (async () => {
    const nameFace = new FontFace(
      "Monoblock",
      'url("/brand/Monoblock-ExtraBold.otf")',
      { weight: "800" }
    )
    const roleFace = new FontFace(
      "Monoblock",
      'url("/brand/Monoblock-Regular.otf")',
      { weight: "400" }
    )
    const [nameFont, roleFont] = await Promise.all([nameFace.load(), roleFace.load()])
    document.fonts.add(nameFont)
    document.fonts.add(roleFont)
  })()
  return fontsLoaded
}

// ── cs_gg.png watermark (cached) ────────────────────────────────────
let csGgImage: HTMLImageElement | null = null
let csGgLoaded: Promise<HTMLImageElement> | null = null

function loadCsGg(): Promise<HTMLImageElement> {
  if (csGgLoaded) return csGgLoaded
  csGgLoaded = new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => { csGgImage = img; resolve(img) }
    img.onerror = reject
    img.src = "/poster/cs_gg.png"
  })
  return csGgLoaded
}

// ── frame.png (cached) ──────────────────────────────────────────────
let frameImage: HTMLImageElement | null = null
let frameLoaded: Promise<HTMLImageElement> | null = null

function loadFrame(): Promise<HTMLImageElement> {
  if (frameLoaded) return frameLoaded
  frameLoaded = new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => { frameImage = img; resolve(img) }
    img.onerror = reject
    img.src = "/poster/frame.png"
  })
  return frameLoaded
}

// ── Grain texture (procedurally generated, cached) ──────────────────
let grainCanvas: HTMLCanvasElement | null = null

function getGrainTexture(): HTMLCanvasElement {
  if (grainCanvas) return grainCanvas
  grainCanvas = document.createElement("canvas")
  grainCanvas.width = 512
  grainCanvas.height = 512
  const ctx = grainCanvas.getContext("2d")!
  const imageData = ctx.createImageData(512, 512)
  for (let i = 0; i < imageData.data.length; i += 4) {
    const val = Math.random() * 255
    imageData.data[i] = val
    imageData.data[i + 1] = val
    imageData.data[i + 2] = val
    imageData.data[i + 3] = 255
  }
  ctx.putImageData(imageData, 0, 0)
  return grainCanvas
}

function tileGrain(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, alpha: number
) {
  if (alpha <= 0) return
  const grain = getGrainTexture()
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.globalCompositeOperation = "overlay"
  ctx.beginPath()
  ctx.rect(x, y, w, h)
  ctx.clip()
  for (let gx = x; gx < x + w; gx += 512) {
    for (let gy = y; gy < y + h; gy += 512) {
      ctx.drawImage(grain, gx, gy)
    }
  }
  ctx.restore()
}

function getCoverCoords(imgW: number, imgH: number, targetW: number, targetH: number, align: "top" | "center" = "center") {
  const imgRatio = imgW / imgH
  const targetRatio = targetW / targetH
  let sx: number, sy: number, sw: number, sh: number
  if (imgRatio > targetRatio) {
    sh = imgH; sw = imgH * targetRatio; sx = (imgW - sw) / 2; sy = 0
  } else {
    sw = imgW; sh = imgW / targetRatio; sx = 0
    sy = align === "top" ? 0 : (imgH - sh) / 2
  }
  return { sx, sy, sw, sh }
}

function clampBox(box: FaceBox, imgW: number, imgH: number): FaceBox {
  const x = Math.max(0, Math.min(box.x, imgW - 1))
  const y = Math.max(0, Math.min(box.y, imgH - 1))
  const w = Math.min(box.width, imgW - x)
  const h = Math.min(box.height, imgH - y)
  return { x, y, width: w, height: h }
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "")
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function imgToCanvas(
  imgX: number, imgY: number, imgW: number, imgH: number,
  canvasW: number, canvasH: number,
  cover: { sx: number; sy: number; sw: number; sh: number }
) {
  const scaleX = canvasW / cover.sw
  const scaleY = canvasH / cover.sh
  return {
    x: (imgX - cover.sx) * scaleX,
    y: (imgY - cover.sy) * scaleY,
    w: imgW * scaleX,
    h: imgH * scaleY,
  }
}

function renderGrayscaleTinted(
  image: HTMLImageElement,
  srcX: number, srcY: number, srcW: number, srcH: number,
  destW: number, destH: number, filter: FilterSettings
): HTMLCanvasElement {
  const w = Math.ceil(destW)
  const h = Math.ceil(destH)
  const off = document.createElement("canvas")
  off.width = w; off.height = h
  const offCtx = off.getContext("2d")!

  if (isFilterUnsupported()) {
    offCtx.drawImage(image, srcX, srcY, srcW, srcH, 0, 0, w, h)
    applyGrayscaleBrightness(offCtx, w, h, 1.0)
  } else {
    offCtx.filter = "grayscale(100%)"
    offCtx.drawImage(image, srcX, srcY, srcW, srcH, 0, 0, w, h)
    offCtx.filter = "none"
  }

  offCtx.globalCompositeOperation = "multiply"
  offCtx.fillStyle = hexToRgba(filter.faceTintHex, filter.faceTintOpacity)
  offCtx.fillRect(0, 0, w, h)
  offCtx.globalCompositeOperation = "screen"
  offCtx.fillStyle = hexToRgba(filter.faceTintHex, 0.1)
  offCtx.fillRect(0, 0, w, h)
  offCtx.globalCompositeOperation = "source-over"
  return off
}

let _filterSupported: boolean | null = null
function isFilterUnsupported(): boolean {
  if (_filterSupported !== null) return !_filterSupported
  if (typeof document === "undefined") return false
  try {
    const testCanvas = document.createElement("canvas")
    testCanvas.width = 1; testCanvas.height = 1
    const testCtx = testCanvas.getContext("2d")!

    // Draw a red pixel without filter
    testCtx.fillStyle = "red"
    testCtx.fillRect(0, 0, 1, 1)
    const before = testCtx.getImageData(0, 0, 1, 1).data[0] // R channel

    // Draw a red pixel with grayscale filter
    testCtx.clearRect(0, 0, 1, 1)
    testCtx.filter = "grayscale(100%)"
    testCtx.fillStyle = "red"
    testCtx.fillRect(0, 0, 1, 1)
    testCtx.filter = "none"
    const after = testCtx.getImageData(0, 0, 1, 1).data[0] // R channel

    // If filter works, R channel should differ (red → gray reduces R)
    _filterSupported = before !== after
  } catch {
    _filterSupported = false
  }
  return !_filterSupported
}

function applyGrayscaleBrightness(
  ctx: CanvasRenderingContext2D, w: number, h: number, brightness: number
) {
  const imageData = ctx.getImageData(0, 0, w, h)
  const d = imageData.data
  for (let i = 0; i < d.length; i += 4) {
    const gray = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114
    const val = Math.min(255, gray * brightness)
    d[i] = val; d[i + 1] = val; d[i + 2] = val
  }
  ctx.putImageData(imageData, 0, 0)
}

function sampleEdgeColors(
  image: HTMLImageElement,
  cover: { sx: number; sy: number; sw: number; sh: number }
): { top: string; bottom: string; left: string; right: string; avg: string } {
  const size = 64
  const off = document.createElement("canvas")
  off.width = size; off.height = size
  const c = off.getContext("2d")!
  c.drawImage(image, cover.sx, cover.sy, cover.sw, cover.sh, 0, 0, size, size)
  const data = c.getImageData(0, 0, size, size).data

  const sampleRegion = (pixels: number[][]) => {
    let r = 0, g = 0, b = 0, count = 0
    for (const [x, y] of pixels) {
      const i = (y * size + x) * 4
      const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
      r += gray; g += gray; b += gray; count++
    }
    const br = 0.3
    const ar = Math.round((r / count) * br)
    const ag = Math.round((g / count) * br)
    const ab = Math.round((b / count) * br)
    return `rgb(${ar},${ag},${ab})`
  }

  const depth = 8
  const topPx: number[][] = [], bottomPx: number[][] = []
  const leftPx: number[][] = [], rightPx: number[][] = []
  for (let x = 0; x < size; x++) {
    for (let d = 0; d < depth; d++) {
      topPx.push([x, d])
      bottomPx.push([x, size - 1 - d])
    }
  }
  for (let y = 0; y < size; y++) {
    for (let d = 0; d < depth; d++) {
      leftPx.push([d, y])
      rightPx.push([size - 1 - d, y])
    }
  }
  const allPx = [...topPx, ...bottomPx, ...leftPx, ...rightPx]

  return {
    top: sampleRegion(topPx),
    bottom: sampleRegion(bottomPx),
    left: sampleRegion(leftPx),
    right: sampleRegion(rightPx),
    avg: sampleRegion(allPx),
  }
}

function drawBackground(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  cover: { sx: number; sy: number; sw: number; sh: number },
  width: number, height: number,
  filter: FilterSettings,
  offsetX = 0, offsetY = 0
) {
  const edges = sampleEdgeColors(image, cover)

  ctx.fillStyle = edges.avg
  ctx.fillRect(0, 0, width, height)

  const topGrad = ctx.createLinearGradient(0, 0, 0, height * 0.2)
  topGrad.addColorStop(0, edges.top)
  topGrad.addColorStop(1, "transparent")
  ctx.fillStyle = topGrad
  ctx.fillRect(0, 0, width, height * 0.2)

  const botGrad = ctx.createLinearGradient(0, height * 0.8, 0, height)
  botGrad.addColorStop(0, "transparent")
  botGrad.addColorStop(1, edges.bottom)
  ctx.fillStyle = botGrad
  ctx.fillRect(0, height * 0.8, width, height * 0.2)

  const leftGrad = ctx.createLinearGradient(0, 0, width * 0.15, 0)
  leftGrad.addColorStop(0, edges.left)
  leftGrad.addColorStop(1, "transparent")
  ctx.fillStyle = leftGrad
  ctx.fillRect(0, 0, width * 0.15, height)

  const rightGrad = ctx.createLinearGradient(width * 0.85, 0, width, 0)
  rightGrad.addColorStop(0, "transparent")
  rightGrad.addColorStop(1, edges.right)
  ctx.fillStyle = rightGrad
  ctx.fillRect(width * 0.85, 0, width * 0.15, height)

  const sharpOff = document.createElement("canvas")
  sharpOff.width = width
  sharpOff.height = height
  const sc = sharpOff.getContext("2d")!
  sc.fillStyle = edges.avg
  sc.fillRect(0, 0, width, height)
  sc.drawImage(
    image,
    cover.sx, cover.sy, cover.sw, cover.sh,
    offsetX, offsetY, width, height
  )

  if (isFilterUnsupported()) {
    applyGrayscaleBrightness(sc, width, height, 0.3)
    const blurScale = 0.08
    const smallW = Math.max(1, Math.round(width * blurScale))
    const smallH = Math.max(1, Math.round(height * blurScale))
    const blurOff = document.createElement("canvas")
    blurOff.width = smallW; blurOff.height = smallH
    const bc = blurOff.getContext("2d")!
    bc.drawImage(sharpOff, 0, 0, smallW, smallH)
    const midW = Math.round(width * 0.3)
    const midH = Math.round(height * 0.3)
    const midOff = document.createElement("canvas")
    midOff.width = midW; midOff.height = midH
    const mc = midOff.getContext("2d")!
    mc.imageSmoothingEnabled = true
    mc.imageSmoothingQuality = "high"
    mc.drawImage(blurOff, 0, 0, midW, midH)
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"
    ctx.drawImage(midOff, 0, 0, width, height)
  } else {
    ctx.filter = `grayscale(100%) blur(${filter.bgBlur}px) brightness(0.3)`
    ctx.drawImage(sharpOff, 0, 0)
    ctx.filter = "none"
  }
}

export async function renderPoster(canvas: HTMLCanvasElement, options: PosterOptions): Promise<void> {
  await Promise.all([loadPosterFonts(), loadCsGg(), loadFrame()])
  const { speaker, image, bgImage, detection, template, filter, width, height } = options
  const ctx = canvas.getContext("2d")!
  canvas.width = width
  canvas.height = height

  const baseCover = getCoverCoords(image.width, image.height, width, height, "top")

  const zoom = Math.max(0.5, Math.min(filter.zoom, 2.0))
  const zoomedSw = baseCover.sw / zoom
  const zoomedSh = baseCover.sh / zoom

  const maxPanX = Math.max(image.width - zoomedSw, zoomedSw * 0.5)
  const maxPanY = Math.max(image.height - zoomedSh, zoomedSh * 0.5)
  const centerSx = baseCover.sx + (baseCover.sw - zoomedSw) / 2
  const centerSy = baseCover.sy + (baseCover.sh - zoomedSh) / 2
  const panOffsetX = -(filter.panX / 100) * (maxPanX / 2)
  const panOffsetY = -(filter.panY / 100) * (maxPanY / 2)
  const rawSx = centerSx + panOffsetX
  const rawSy = centerSy + panOffsetY

  const cover = {
    sx: Math.max(0, Math.min(rawSx, image.width - zoomedSw)),
    sy: Math.max(0, Math.min(rawSy, image.height - zoomedSh)),
    sw: zoomedSw,
    sh: zoomedSh,
  }

  let cropRegion: FaceBox
  if (template === "eyes") cropRegion = detection.eyesRegion
  else if (template === "smile") cropRegion = detection.smileRegion
  else cropRegion = detection.rightHalfBox
  const clamped = clampBox(cropRegion, image.width, image.height)

  const margin = width * 0.06
  const cropAspect = clamped.width / clamped.height
  let boxX: number, boxY: number, boxW: number, boxH: number
  let bgShiftX = 0
  let bgShiftY = 0

  if (filter.overlay) {
    const nat = imgToCanvas(
      clamped.x, clamped.y, clamped.width, clamped.height,
      width, height, cover
    )
    boxX = nat.x; boxY = nat.y; boxW = nat.w; boxH = nat.h

    if (filter.autoPosition) {
      const origBoxX = boxX
      const origBoxY = boxY
      const logoZoneBottom = height * 0.10
      const badgeW = width * 0.05
      const textZoneTop = height * 0.58

      if (boxY < logoZoneBottom) {
        boxY = logoZoneBottom
      }
      if (boxX + boxW + badgeW > width - margin) {
        boxX = width - margin - boxW - badgeW
      }
      if (boxX < margin) {
        boxX = margin
      }
      if (boxY + boxH > textZoneTop) {
        boxY = textZoneTop - boxH
        if (boxY < logoZoneBottom) {
          boxY = logoZoneBottom
          boxH = textZoneTop - logoZoneBottom
          boxW = boxH * cropAspect
        }
      }

      bgShiftX = boxX - origBoxX
      bgShiftY = boxY - origBoxY
    }
  } else {
    if (template === "half-face") {
      boxH = height * 0.55; boxW = boxH * cropAspect
      if (boxW > width * 0.35) { boxW = width * 0.35; boxH = boxW / cropAspect }
      boxX = width - boxW - margin; boxY = height * 0.08
    } else {
      boxW = width * 0.60; boxH = boxW / cropAspect
      if (boxH > height * 0.25) { boxH = height * 0.25; boxW = boxH * cropAspect }
      boxX = (width - boxW) / 2; boxY = height * 0.22
    }
  }

  // 1) DRAW BACKGROUND
  drawBackground(ctx, image, cover, width, height, filter, bgShiftX, bgShiftY)
  tileGrain(ctx, 0, 0, width, height, filter.bgGrain)

  // 2) TINTED FACE CROP BOX
  const tc = renderGrayscaleTinted(
    image, clamped.x, clamped.y, clamped.width, clamped.height,
    boxW, boxH, filter
  )
  ctx.save()
  ctx.beginPath()
  ctx.rect(boxX, boxY, boxW, boxH)
  ctx.clip()
  ctx.drawImage(tc, boxX, boxY)
  tileGrain(ctx, boxX, boxY, boxW, boxH, filter.faceGrain)
  ctx.restore()

  ctx.strokeStyle = filter.accentColor
  ctx.lineWidth = 2
  ctx.strokeRect(boxX, boxY, boxW, boxH)

  // 3) BADGE
  {
    const badgeText = getPosterBadgeLabel(speaker.role)
    const badgeFontSize = Math.round(width * 0.016)
    ctx.font = `800 ${badgeFontSize}px "Monoblock", sans-serif`
    const textW = ctx.measureText(badgeText).width

    if (template === "half-face") {
      // Vertical badge to the right of the crop box
      const badgePadY = badgeFontSize * 1.2
      const badgeW = width * 0.042
      const badgeH = textW + badgePadY * 2
      const badgeX = boxX + boxW
      const badgeY = boxY

      ctx.save()
      ctx.fillStyle = filter.accentColor
      ctx.fillRect(badgeX, badgeY, badgeW, badgeH)
      ctx.translate(badgeX + badgeW / 2, badgeY + badgeH / 2)
      ctx.rotate(-Math.PI / 2)
      ctx.fillStyle = "#1a1a1a"
      ctx.font = `800 ${badgeFontSize}px "Monoblock", sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(badgeText, 0, 0)
      ctx.restore()
    } else {
      // Horizontal badge on top of the crop box, right-aligned
      const badgePadX = badgeFontSize * 1.2
      const badgeH = width * 0.042
      const badgeW = textW + badgePadX * 2
      const badgeX = boxX + boxW - badgeW
      const badgeY = boxY - badgeH

      ctx.save()
      ctx.fillStyle = filter.accentColor
      ctx.fillRect(badgeX, badgeY, badgeW, badgeH)
      ctx.fillStyle = "#1a1a1a"
      ctx.font = `800 ${badgeFontSize}px "Monoblock", sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(badgeText, badgeX + badgeW / 2, badgeY + badgeH / 2)
      ctx.restore()
    }
  }

  // 4) bg.png frame overlay (inset with padding)
  if (bgImage) {
    const bgPad = Math.round(width * 0.03)
    const bgCover = getCoverCoords(bgImage.width, bgImage.height, width - bgPad * 2, height - bgPad * 2)
    ctx.drawImage(bgImage, bgCover.sx, bgCover.sy, bgCover.sw, bgCover.sh, bgPad, bgPad, width - bgPad * 2, height - bgPad * 2)
  }

  // 5) BOTTOM SECTION: portrait + name + role
  const nameFontSize = Math.round(width * 0.075)
  const roleFontSize = Math.round(width * 0.026)
  const bottomMargin = margin + width * 0.04
  const textX = bottomMargin
  const textMaxW = width * 0.46

  ctx.font = `400 ${roleFontSize}px "Monoblock", sans-serif`
  const roleLines = wrapText(ctx, speaker.role.toUpperCase(), textMaxW)
  const roleBlockH = roleLines.length * roleFontSize * 1.4

  ctx.font = `800 ${nameFontSize}px "Monoblock", sans-serif`
  const nameWords = speaker.name.toUpperCase().split(" ")
  const nameLines: string[] = []
  let tmpLine = ""
  for (const word of nameWords) {
    const test = tmpLine ? `${tmpLine} ${word}` : word
    if (ctx.measureText(test).width > textMaxW && tmpLine) {
      nameLines.push(tmpLine)
      tmpLine = word
    } else { tmpLine = test }
  }
  if (tmpLine) nameLines.push(tmpLine)
  const nameBlockH = nameLines.length * nameFontSize * 1.1

  const imgAspect = image.width / image.height
  const pScale = width * 0.12
  let pW: number, pH: number
  if (imgAspect > 1) { pW = pScale; pH = pScale / imgAspect }
  else { pH = pScale; pW = pScale * imgAspect }

  const bottomEdge = height * 0.93
  const roleStartY = bottomEdge - roleBlockH
  const nameRoleGap = nameFontSize * 0.6
  const nameBottomY = roleStartY - nameRoleGap
  const nameTopY = nameBottomY - nameBlockH + nameFontSize
  // "I'M PARTICIPATING IN SHE SHIPS" heading + subtitle
  const headingFontSize = Math.round(width * 0.032)
  const subtitleFontSize = Math.round(width * 0.02)
  const headingLines = ["I'M PARTICIPATING", "IN SHE SHIPS"]
  const subtitleLines = ["March 6-8, 2026", "48h Global Hackathon"]

  const headingLineH = headingFontSize * 1.3
  const subtitleLineH = subtitleFontSize * 1.4
  const headingSubGap = headingFontSize * 0.4

  ctx.font = `800 ${headingFontSize}px "Monoblock", sans-serif`
  const headingBlockH = headingLines.length * headingLineH

  const subtitleBlockH = subtitleLines.length * subtitleLineH
  const totalHeadingH = headingBlockH + headingSubGap + subtitleBlockH

  const portraitGap = nameFontSize * 0.5
  const pY = nameTopY - nameFontSize - portraitGap - pH
  const pX = bottomMargin

  const headingGap = nameFontSize * 5.5
  const headingTopY = pY - headingGap - totalHeadingH

  // Draw heading
  ctx.fillStyle = "#ffffff"
  ctx.font = `800 ${headingFontSize}px "Monoblock", sans-serif`
  ctx.textAlign = "left"
  for (let i = 0; i < headingLines.length; i++) {
    ctx.fillText(headingLines[i], textX, headingTopY + i * headingLineH + headingFontSize)
  }

  // Draw subtitle
  ctx.fillStyle = "rgba(255,255,255,0.5)"
  ctx.font = `400 ${subtitleFontSize}px "Monoblock", sans-serif`
  const subtitleStartY = headingTopY + headingBlockH + headingSubGap + subtitleFontSize
  for (let i = 0; i < subtitleLines.length; i++) {
    ctx.fillText(subtitleLines[i], textX, subtitleStartY + i * subtitleLineH)
  }

  // Draw portrait
  {
    const tp = renderGrayscaleTinted(
      image, 0, 0, image.width, image.height, pW, pH, filter
    )
    ctx.drawImage(tp, pX, pY)
    tileGrain(ctx, pX, pY, pW, pH, filter.faceGrain)

    const bPad = 8, bLen = 14
    ctx.strokeStyle = "#4ade80"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(pX + pW + bPad - bLen, pY - bPad)
    ctx.lineTo(pX + pW + bPad, pY - bPad)
    ctx.lineTo(pX + pW + bPad, pY - bPad + bLen)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(pX - bPad + bLen, pY + pH + bPad)
    ctx.lineTo(pX - bPad, pY + pH + bPad)
    ctx.lineTo(pX - bPad, pY + pH + bPad - bLen)
    ctx.stroke()
  }

  // Draw name
  ctx.fillStyle = "#ffffff"
  ctx.font = `800 ${nameFontSize}px "Monoblock", sans-serif`
  ctx.textAlign = "left"
  for (let i = 0; i < nameLines.length; i++) {
    ctx.fillText(nameLines[i], textX, nameTopY + i * nameFontSize * 1.1)
  }

  // Draw role
  ctx.fillStyle = "#4ade80"
  ctx.font = `400 ${roleFontSize}px "Monoblock", sans-serif`
  for (let i = 0; i < roleLines.length; i++) {
    ctx.fillText(roleLines[i], textX, roleStartY + i * roleFontSize * 1.4)
  }

  // 6) cs_gg.png — top-left and bottom-right (screen blend, drawn last)
  if (csGgImage) {
    const csMargin = Math.round(width * 0.025)
    const csH = Math.round(height * 0.28)
    const csW = Math.round(csH * (csGgImage.width / csGgImage.height))

    ctx.save()
    ctx.globalCompositeOperation = "screen"
    ctx.globalAlpha = 1.0

    const csYOffset = Math.round(height * 0.10)

    // Top-left (shifted down 10%)
    ctx.drawImage(csGgImage, csMargin, csMargin + csYOffset, csW, csH)

    // Bottom-right (shifted up 10%, rotated 180°)
    ctx.save()
    ctx.translate(width - csMargin, height - csMargin - csYOffset)
    ctx.rotate(Math.PI)
    ctx.drawImage(csGgImage, 0, 0, csW, csH)
    ctx.restore()

    ctx.restore()
  }

  // 7) frame.png — horizontal frame at top and bottom (screen blend)
  if (frameImage) {
    const frameW = width
    const frameH = Math.round(frameW * (frameImage.height / frameImage.width))

    ctx.save()
    ctx.globalCompositeOperation = "screen"
    ctx.globalAlpha = 1.0

    // Top frame
    ctx.drawImage(frameImage, 0, 0, frameW, frameH)

    // Bottom frame (flipped vertically)
    ctx.save()
    ctx.translate(0, height)
    ctx.scale(1, -1)
    ctx.drawImage(frameImage, 0, 0, frameW, frameH)
    ctx.restore()

    ctx.restore()
  }
}

export function exportPoster(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => { if (blob) resolve(blob); else reject(new Error("Failed to export canvas")) },
      "image/png", 1
    )
  })
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = ""
  for (const word of words) {
    const test = currentLine ? `${currentLine} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = test
    }
  }
  if (currentLine) lines.push(currentLine)
  return lines
}
