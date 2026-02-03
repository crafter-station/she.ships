import sharp from "sharp";
import { writeFileSync } from "fs";
import { join } from "path";

const PUBLIC = join(import.meta.dir, "../public");

// Brand colors
const CHARCOAL = "#171717";
const GRID_GRAY = "#2A2A2A";
const ROSE_CORAL = "#E05A7A";
const OFF_WHITE = "#F5F2ED";
const WARM_GRAY = "#9B9688";

// Grid lines helper
function gridLines(
  w: number,
  h: number,
  spacing: number,
  color: string
): string {
  let lines = "";
  for (let x = 0; x <= w; x += spacing) {
    lines += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${color}" stroke-width="1" opacity="0.4"/>`;
  }
  for (let y = 0; y <= h; y += spacing) {
    lines += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${color}" stroke-width="1" opacity="0.4"/>`;
  }
  return lines;
}

// Coordinate crosses
function crosses(positions: [number, number][], color: string): string {
  return positions
    .map(
      ([x, y]) =>
        `<text x="${x}" y="${y}" fill="${color}" font-family="monospace" font-size="20" text-anchor="middle" opacity="0.3">+</text>`
    )
    .join("");
}

// --- OG Image (1200x630) ---
async function generateOG(width: number, height: number, filename: string) {
  const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${CHARCOAL}"/>
  ${gridLines(width, height, 64, GRID_GRAY)}
  ${crosses(
    [
      [80, 80],
      [1120, 80],
      [80, 550],
      [1120, 550],
      [200, 200],
      [1000, 430],
    ],
    WARM_GRAY
  )}

  <!-- Brand badge -->
  <rect x="520" y="160" width="160" height="28" rx="0" fill="${ROSE_CORAL}" opacity="0.15"/>
  <rect x="520" y="160" width="160" height="28" rx="0" stroke="${ROSE_CORAL}" stroke-width="1" fill="none" opacity="0.3"/>
  <text x="600" y="180" fill="${ROSE_CORAL}" font-family="monospace" font-size="12" text-anchor="middle" letter-spacing="3">8 DE MARZO</text>

  <!-- Main headline -->
  <text x="600" y="280" fill="${OFF_WHITE}" font-family="system-ui, sans-serif" font-size="72" font-weight="800" text-anchor="middle" letter-spacing="-2">Just</text>
  <text x="600" y="370" fill="${ROSE_CORAL}" font-family="system-ui, sans-serif" font-size="72" font-weight="800" text-anchor="middle" letter-spacing="-2">Ship It.</text>

  <!-- Tagline -->
  <text x="600" y="430" fill="${WARM_GRAY}" font-family="system-ui, sans-serif" font-size="20" text-anchor="middle">Donde las mujeres construyen y hacen ship</text>

  <!-- Brand name -->
  <text x="555" y="520" fill="${OFF_WHITE}" font-family="system-ui, sans-serif" font-size="24" font-weight="700" text-anchor="middle">She</text>
  <text x="605" y="520" fill="${ROSE_CORAL}" font-family="system-ui, sans-serif" font-size="24" font-weight="700" text-anchor="middle">Ships</text>

  <!-- Data labels -->
  <text x="60" y="620" fill="${WARM_GRAY}" font-family="monospace" font-size="10" opacity="0.5" letter-spacing="2">SHE.SHIPS</text>
  <text x="1060" y="620" fill="${WARM_GRAY}" font-family="monospace" font-size="10" opacity="0.5" letter-spacing="2">2026.03.08</text>
</svg>`;

  await sharp(Buffer.from(svg)).png({ quality: 95 }).toFile(join(PUBLIC, filename));
  console.log(`Generated ${filename}`);
}

// --- Favicon (SVG -> multi-size ICO via sharp) ---
async function generateFavicon() {
  // Simple "S" mark in rose-coral on charcoal
  const faviconSvg = `
<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
  <rect width="128" height="128" fill="${CHARCOAL}"/>
  <text x="64" y="96" fill="${ROSE_CORAL}" font-family="system-ui, sans-serif" font-size="88" font-weight="800" text-anchor="middle">S</text>
</svg>`;

  const svgBuffer = Buffer.from(faviconSvg);

  // Generate PNG sizes for ICO
  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map((size) =>
      sharp(svgBuffer).resize(size, size).png().toBuffer()
    )
  );

  // Build ICO file manually
  const ico = buildIco(pngBuffers, sizes);
  writeFileSync(join(PUBLIC, "favicon.ico"), ico);
  console.log("Generated favicon.ico");

  // Also generate a high-res PNG favicon for modern browsers
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(join(PUBLIC, "apple-touch-icon.png"));
  console.log("Generated apple-touch-icon.png");
}

// Minimal ICO builder
function buildIco(pngBuffers: Buffer[], sizes: number[]): Buffer {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * count;
  let offset = headerSize + dirSize;

  // ICO header
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  // Directory entries
  const entries = Buffer.alloc(dirSize);
  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const png = pngBuffers[i];
    const pos = i * dirEntrySize;
    entries.writeUInt8(size < 256 ? size : 0, pos); // width
    entries.writeUInt8(size < 256 ? size : 0, pos + 1); // height
    entries.writeUInt8(0, pos + 2); // color palette
    entries.writeUInt8(0, pos + 3); // reserved
    entries.writeUInt16LE(1, pos + 4); // color planes
    entries.writeUInt16LE(32, pos + 6); // bits per pixel
    entries.writeUInt32LE(png.length, pos + 8); // data size
    entries.writeUInt32LE(offset, pos + 12); // data offset
    offset += png.length;
  }

  return Buffer.concat([header, entries, ...pngBuffers]);
}

// Run
async function main() {
  await generateOG(1200, 630, "og.png");
  await generateOG(1200, 600, "og-twitter.png");
  await generateFavicon();
  console.log("\nAll brand assets generated.");
}

main().catch(console.error);
