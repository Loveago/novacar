import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

export async function saveFile(
  file: File,
  folder: string,
  publicPrefix?: string
) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Unsupported file type");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("File too large");
  }

  const extension = file.type.split("/")[1];
  const filename = `${randomUUID()}.${extension}`;
  const directoryPath = path.join(process.cwd(), folder);

  await mkdir(directoryPath, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  const outputPath = path.join(directoryPath, filename);
  await writeFile(outputPath, buffer);

  if (publicPrefix) {
    return `${publicPrefix}/${filename}`;
  }
  return outputPath;
}

const PUBLIC_ROOT = path.join(process.cwd(), "public");

export async function removePublicUpload(filePath: string) {
  if (!filePath.startsWith("/uploads/giftcards/")) {
    return;
  }
  const normalized = filePath.replace(/^\/+/, "");
  const absolutePath = path.join(PUBLIC_ROOT, normalized);
  if (!absolutePath.startsWith(PUBLIC_ROOT)) {
    return;
  }
  await unlink(absolutePath).catch(() => {});
}
