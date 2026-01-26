"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin, requireAuth } from "@/lib/guards";
import { encryptValue } from "@/lib/crypto";
import { saveFile } from "@/lib/storage";
import { toNumber, toStringValue } from "@/lib/utils";

export async function createSubmission(formData: FormData) {
  const session = await requireAuth();

  const giftCardId = toStringValue(formData.get("giftCardId"));
  const cardValue = toNumber(formData.get("cardValue"));
  const cardCode = toStringValue(formData.get("cardCode"));
  const cardImage = formData.get("cardImage");
  const payoutMethod = toStringValue(formData.get("payoutMethod"));
  const payoutDetailsInput = toStringValue(formData.get("payoutDetails"));

  if (!giftCardId || !cardValue) {
    return;
  }

  const giftCard = await prisma.giftCard.findUnique({ where: { id: giftCardId } });
  if (!giftCard) {
    return;
  }

  let cardImagePath: string | null = null;
  if (cardImage instanceof File && cardImage.size > 0) {
    cardImagePath = await saveFile(cardImage, "private/submissions");
  }

  let payoutDetails = payoutDetailsInput || null;
  let resolvedPayoutMethod = payoutMethod || null;
  if ((!payoutMethod || payoutMethod === "SAVED") && !payoutDetails) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { paymentDetails: true },
    });
    if (user?.paymentDetails) {
      payoutDetails = user.paymentDetails;
      resolvedPayoutMethod = payoutMethod || "SAVED";
    }
  }

  const payoutAmount = cardValue * giftCard.rate;

  await prisma.submission.create({
    data: {
      userId: session.user.id,
      giftCardId,
      cardValue,
      payoutAmount,
      cardCode: cardCode ? encryptValue(cardCode) : null,
      cardImagePath,
      payoutMethod: resolvedPayoutMethod,
      payoutDetails,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/transactions");
  revalidatePath("/admin/submissions");
}

export async function updateSubmissionStatus(formData: FormData) {
  await requireAdmin();

  const id = toStringValue(formData.get("id"));
  const status = toStringValue(formData.get("status"));
  const adminNote = toStringValue(formData.get("adminNote"));

  if (!id || !status) {
    return;
  }

  await prisma.submission.update({
    where: { id },
    data: {
      status: status as "PENDING" | "APPROVED" | "REJECTED" | "PAID",
      adminNote: adminNote || null,
    },
  });

  revalidatePath("/admin/submissions");
  revalidatePath("/transactions");
  revalidatePath("/dashboard");
}
