/**
 * Client-side image utilities: convert to PNG and compress before upload.
 *
 * We draw the source image onto a canvas, scaling it down if it exceeds
 * MAX_DIMENSION on either axis. The result is exported as a PNG blob.
 * PNG is lossless so we control file size purely by capping resolution.
 *
 * IMPORTANT: The returned `image` is loaded from the scaled PNG blob so
 * that its dimensions match what gets uploaded. This ensures face detection
 * coordinates are consistent between the editor session and future reloads.
 */

const MAX_DIMENSION = 1600;

/**
 * Convert any image File to a compressed PNG Blob and a matching
 * HTMLImageElement whose dimensions equal the output PNG.
 */
export async function convertToPng(file: File): Promise<{
  blob: Blob;
  image: HTMLImageElement;
}> {
  const original = await loadFileAsImage(file);

  const { width, height } = scaleDimensions(
    original.naturalWidth,
    original.naturalHeight,
    MAX_DIMENSION
  );

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context");

  ctx.drawImage(original, 0, 0, width, height);

  const blob = await canvas.convertToBlob({ type: "image/png" });

  // Create an HTMLImageElement from the scaled blob so face detection
  // coordinates match the dimensions of the uploaded image.
  const scaledImage = await loadBlobAsImage(blob);

  return { blob, image: scaledImage };
}

function loadFileAsImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

function loadBlobAsImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load scaled image"));
    };
    img.src = url;
  });
}

function scaleDimensions(
  w: number,
  h: number,
  max: number
): { width: number; height: number } {
  if (w <= max && h <= max) return { width: w, height: h };

  const ratio = Math.min(max / w, max / h);
  return {
    width: Math.round(w * ratio),
    height: Math.round(h * ratio),
  };
}
