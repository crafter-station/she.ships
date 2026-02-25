import type { CardData } from "./types";

export const generateCardTexture = async (
  cardData: CardData
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

    const baseImage = new Image();
    baseImage.onload = () => {
      ctx.drawImage(baseImage, 0, 0, 1024, 1024);

      // Draw name
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "left";
      const nameLines = cardData.name.split(" ");
      nameLines.forEach((line, index) => {
        ctx.fillText(line, 30, 480 + index * 55);
      });

      // Draw role
      ctx.fillStyle = "#ff2d78";
      ctx.font = "bold 24px Arial";
      ctx.fillText(cardData.role.toUpperCase(), 30, 480 + nameLines.length * 55 + 10);

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
