import type { CardData } from "./types";

/** Parse hex color to RGB */
function hexToRgb(hex: string): [number, number, number] {
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
function lighten(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const lr = Math.round(r + (255 - r) * amount);
  const lg = Math.round(g + (255 - g) * amount);
  const lb = Math.round(b + (255 - b) * amount);
  return `#${lr.toString(16).padStart(2, "0")}${lg.toString(16).padStart(2, "0")}${lb.toString(16).padStart(2, "0")}`;
}

/** Pick the most readable particle color on a black background */
function pickReadableColor(colors: string[]): string {
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

export const generateCardTexture = async (
  cardData: CardData,
  particleColors?: string[]
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

    const textColor = pickReadableColor(particleColors || []);

    const baseImage = new Image();
    baseImage.onload = () => {
      ctx.drawImage(baseImage, 0, 0, 1024, 1024);

      // Draw name
      ctx.fillStyle = textColor;
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "left";
      const nameLines = cardData.name.split(" ");
      nameLines.forEach((line, index) => {
        ctx.fillText(line, 80, 300 + index * 55);
      });

      // Draw role
      ctx.fillStyle = textColor;
      ctx.font = "bold 24px Arial";
      ctx.fillText(cardData.role.toUpperCase(), 80, 300 + nameLines.length * 55 + 10);

      resolve(canvas.toDataURL("image/png"));
    };

    baseImage.onerror = () => {
      reject(new Error("Failed to load base texture"));
    };

    baseImage.src = "/badge/base_texture.png";
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
