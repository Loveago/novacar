import { prisma } from "@/lib/prisma";

function isMissingTableError(error: unknown): error is { code?: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code?: string }).code === "string" &&
    (error as { code?: string }).code === "P2021"
  );
}

export async function fetchActiveGiftCards() {
  try {
    return await prisma.giftCard.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    if (isMissingTableError(error)) {
      console.warn(
        "GiftCard table not found. Returning empty dataset during build/prerender."
      );
      return [];
    }
    throw error;
  }
}
