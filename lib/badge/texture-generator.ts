import type { CardData } from "./types";

/** Parse hex color to RGB */
export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

/** Relative luminance (0–1) for contrast on black */
function luminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/** Lighten a hex color toward white by a factor (0–1) */
export function lighten(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const lr = Math.round(r + (255 - r) * amount);
  const lg = Math.round(g + (255 - g) * amount);
  const lb = Math.round(b + (255 - b) * amount);
  return `#${lr.toString(16).padStart(2, "0")}${lg.toString(16).padStart(2, "0")}${lb.toString(16).padStart(2, "0")}`;
}

/** Pick the most readable particle color on a black background */
export function pickReadableColor(colors: string[]): string {
  if (colors.length === 0) return "#ffffff";

  // Sort by luminance — brightest first
  const sorted = colors
    .map((c) => ({ color: c, lum: luminance(...hexToRgb(c)) }))
    .sort((a, b) => b.lum - a.lum);

  const best = sorted[0];

  // If bright enough, use as-is; otherwise lighten to ensure readability
  if (best.lum > 0.15) return best.color;
  return lighten(best.color, 0.5);
}

/** HSL saturation (0–1) from RGB */
function saturation(r: number, g: number, b: number): number {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  if (max === 0) return 0;
  const l = (max + min) / 2;
  if (max === min) return 0;
  const d = max - min;
  return l > 0.5 ? d / (2 - max - min) : d / (max + min);
}

/** Pick the most vivid particle color for UI accents (skips whites/grays, lightens darks) */
export function pickAccentColor(colors: string[]): string {
  if (colors.length === 0) return "#ff2d78";

  const scored = colors.map((c) => {
    const [r, g, b] = hexToRgb(c);
    const sat = saturation(r, g, b);
    const lum = luminance(r, g, b);
    return { color: c, sat, lum };
  });

  // Filter out whites/grays (low saturation)
  const vivid = scored.filter((c) => c.sat > 0.2);

  // If all colors are near-white/gray, just use the first non-white or fallback
  const pick = vivid.length > 0
    ? vivid.sort((a, b) => b.sat - a.sat)[0]
    : scored[0];

  // If too dark to read on black, lighten it
  if (pick.lum < 0.08) return lighten(pick.color, 0.4);
  return pick.color;
}

const CRAFTER_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="257" height="257" viewBox="0 0 257 257" fill="none"><path d="M116.419 16.3268C109.59 11.5679 97.9222 5.96914 90.2388 3.72965C72.8798 -1.58913 59.1794 1.40491 50.114 4.56947C32.4704 10.7281 21.3721 18.8462 11.412 33.6828C-4.23949 56.6375 -1.96292 93.869 17.1035 114.864C21.3721 119.903 23.6487 119.063 40.1539 107.026C40.723 106.466 38.4465 102.827 35.0316 98.6278C27.3481 89.11 22.7949 71.754 25.0715 61.9563C32.4704 31.1634 70.3187 14.6472 94.7919 31.4433C100.199 35.0825 117.273 50.199 132.64 65.0356C155.691 86.8706 162.52 91.9094 168.212 91.3496C173.903 90.7897 175.895 88.8301 176.464 82.6715C177.318 75.9531 174.757 72.034 161.667 60.2767C152.845 52.1585 145.731 44.8802 145.731 43.4805C145.731 42.3608 151.707 37.6019 159.105 33.1229C206.914 3.1698 258.421 62.7961 218.581 101.987C213.459 107.026 204.353 112.345 198.377 114.024C191.547 115.704 159.959 117.104 120.688 117.104C47.2683 117.104 43.2842 117.943 23.9332 135.02C-0.824636 157.134 -6.51609 194.926 10.8429 222.359C33.3241 258.191 81.7016 267.149 115.85 241.675L128.372 232.157L142.885 241.675C166.504 257.351 185.571 260.431 208.621 252.872C254.722 237.476 271.796 179.809 241.916 141.178C238.501 136.979 236.794 136.699 232.241 138.939C218.297 146.777 218.581 146.217 226.834 163.013C233.094 175.89 234.233 180.929 232.81 190.727C228.826 215.361 210.044 231.877 186.14 231.877C167.643 231.877 161.667 228.238 127.518 195.486C109.59 178.689 93.0845 164.693 90.8079 164.693C86.5393 164.693 77.433 173.371 77.433 177.57C77.433 178.689 85.1165 187.647 94.7919 197.165L112.151 214.241L101.906 222.08C65.7655 249.233 14.2578 216.761 26.2098 174.211C29.9093 161.333 42.9996 147.057 55.5209 142.578C60.3586 140.618 90.2388 139.498 130.648 139.498C204.922 139.498 213.744 138.099 230.818 123.542C281.757 80.9919 252.161 0.930299 185.571 1.21023C166.22 1.21023 155.691 5.12933 137.762 18.2863L128.656 25.0048L116.419 16.3268Z" fill="COLOR"/></svg>`;

function loadSvgAsImage(color: string, size: number): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const svg = CRAFTER_LOGO_SVG.replace("COLOR", color);
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = reject;
    img.width = size;
    img.height = size;
    img.src = url;
  });
}

export interface DebugOffsets {
  numberOffsetX: number;
  numberOffsetY: number;
  logoOffsetX: number;
  logoOffsetY: number;
}

export const defaultDebugOffsets: DebugOffsets = {
  numberOffsetX: 0,
  numberOffsetY: 35,
  logoOffsetX: 0,
  logoOffsetY: 45,
};

export const generateCardTexture = async (
  cardData: CardData,
  particleColors?: string[],
  debugOffsets?: DebugOffsets,
  badgeNumber?: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Could not get canvas context"));
      return;
    }

    const textColor = pickAccentColor(particleColors || []);

    const baseImage = new Image();
    baseImage.onload = () => {
      ctx.drawImage(baseImage, 0, 0, 1024, 1024);

      // Draw name
      ctx.fillStyle = textColor;
      ctx.font = "300 64px Arial";
      ctx.textAlign = "left";
      const nameLines = cardData.name.split(" ");
      nameLines.forEach((line, index) => {
        ctx.fillText(line, 80, 200 + index * 72);
      });

      // Draw role — below name
      const roleY = 200 + nameLines.length * 72 + 10;
      ctx.fillStyle = textColor;
      ctx.font = "bold 24px Arial";
      ctx.fillText(cardData.role.toUpperCase(), 80, roleY);

      // Draw organization — below role, if provided
      let bottomY = roleY;
      if (cardData.organization) {
        bottomY = roleY + 30;
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = textColor;
        ctx.font = "300 20px Arial";
        ctx.fillText(cardData.organization, 80, bottomY);
        ctx.globalAlpha = 1;
      }

      // Draw badge number — subtle, below org/role
      const off = debugOffsets || defaultDebugOffsets;
      const displayNumber = badgeNumber || "0000000";
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = textColor;
      ctx.font = "300 20px Arial";
      ctx.fillText(`# ${displayNumber}`, 80 + off.numberOffsetX, bottomY + off.numberOffsetY);
      ctx.globalAlpha = 1;

      resolve(canvas.toDataURL("image/png"));
    };

    baseImage.onerror = () => {
      reject(new Error("Failed to load base texture"));
    };

    baseImage.src = "/badge/base_texture_ss.png";
  });
};

export const generateShareImage = async (
  cardData: CardData
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1201;
    canvas.height = 1351;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Could not get canvas context"));
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      ctx.drawImage(img, 0, 0, 1201, 1351);

      // Draw name
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 96px Arial";
      ctx.textAlign = "center";
      ctx.fillText(cardData.name, 600, 950);

      // Draw role
      ctx.fillStyle = "#ff2d78";
      ctx.font = "bold 40px Arial";
      ctx.fillText(cardData.role.toUpperCase(), 600, 1010);

      resolve(canvas.toDataURL("image/png"));
    };

    img.onerror = () => {
      reject(new Error("Failed to load share card base"));
    };

    img.src = "/badge/share-card.jpg";
  });
};
