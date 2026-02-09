import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guards";

const mimeMap: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
};

export async function GET(
  _request: Request,
  { params }: { params: { submissionId: string } }
) {
  await requireAdmin();

  const { submissionId } = params;
  if (!submissionId) {
    return NextResponse.json({ error: "Missing submission id" }, { status: 400 });
  }

  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
    select: { cardImagePath: true },
  });

  if (!submission?.cardImagePath) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  try {
    const buffer = await readFile(submission.cardImagePath);
    const ext = path.extname(submission.cardImagePath).replace(".", "").toLowerCase();
    const contentType = mimeMap[ext] ?? "application/octet-stream";
    const filename = path.basename(submission.cardImagePath);

    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Unable to read image" }, { status: 500 });
  }
}
