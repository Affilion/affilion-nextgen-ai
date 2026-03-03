export interface OptimizeImageOptions {
  maxWidth?: number;
  maxHeight?: number;
  targetMaxSizeMB?: number;
  outputType?: "image/jpeg" | "image/webp";
  initialQuality?: number;
  minQuality?: number;
}

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Nem sikerült beolvasni a fájlt."));
    reader.readAsDataURL(file);
  });

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Nem sikerült betölteni a képet."));
    img.src = src;
  });

const canvasToBlob = (canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> =>
  new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Nem sikerült tömöríteni a képet."));
          return;
        }
        resolve(blob);
      },
      type,
      quality,
    );
  });

export const optimizeImageForUpload = async (
  file: File,
  options: OptimizeImageOptions = {},
): Promise<File> => {
  const {
    maxWidth = 1920,
    maxHeight = 1920,
    targetMaxSizeMB = 2,
    outputType = "image/webp",
    initialQuality = 0.86,
    minQuality = 0.55,
  } = options;

  const dataUrl = await readFileAsDataUrl(file);
  const image = await loadImage(dataUrl);

  const scale = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("A böngésző nem támogatja a képoptimalizálást.");

  context.drawImage(image, 0, 0, width, height);

  const maxBytes = targetMaxSizeMB * 1024 * 1024;
  let quality = initialQuality;
  let blob = await canvasToBlob(canvas, outputType, quality);

  while (blob.size > maxBytes && quality > minQuality) {
    quality = Math.max(minQuality, quality - 0.08);
    blob = await canvasToBlob(canvas, outputType, quality);
  }

  const extension = outputType === "image/jpeg" ? "jpg" : "webp";
  const baseName = file.name.replace(/\.[^.]+$/, "");

  return new File([blob], `${baseName}.${extension}`, {
    type: outputType,
    lastModified: Date.now(),
  });
};
