"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guards";
import { removePublicUpload, saveFile } from "@/lib/storage";
import { slugify, toNumber, toStringValue } from "@/lib/utils";

function getOptional(value: FormDataEntryValue | null) {
  const parsed = toStringValue(value);
  return parsed ? parsed : null;
}

export async function createGiftCard(formData: FormData) {
  await requireAdmin();

  const name = toStringValue(formData.get("name"));
  if (!name) {
    return;
  }

  const slug = toStringValue(formData.get("slug")) || slugify(name);
  const rate = toNumber(formData.get("rate"));
  const description = toStringValue(formData.get("description"));
  const region = getOptional(formData.get("region"));
  const category = getOptional(formData.get("category"));
  const payoutSpeed = getOptional(formData.get("payoutSpeed"));
  const trend = getOptional(formData.get("trend"));
  const weeklyVolume = getOptional(formData.get("weeklyVolume"));
  const isActive = formData.get("isActive") === "on";

  let imagePath = toStringValue(formData.get("imageUrl"));
  const imageFile = formData.get("imageFile");

  if (imageFile instanceof File && imageFile.size > 0) {
    imagePath = await saveFile(
      imageFile,
      "public/uploads/giftcards",
      "/uploads/giftcards"
    );
  }

  if (!imagePath) {
    return;
  }

  await prisma.giftCard.create({
    data: {
      name,
      slug,
      imagePath,
      rate,
      description,
      region,
      category,
      payoutSpeed,
      trend,
      weeklyVolume,
      isActive,
    },
  });

  revalidatePath("/");
  revalidatePath("/marketplace");
  revalidatePath("/admin/gift-cards");
}

export async function updateGiftCard(formData: FormData) {
  await requireAdmin();

  const id = toStringValue(formData.get("id"));
  if (!id) {
    return;
  }

  const existing = await prisma.giftCard.findUnique({ where: { id } });
  if (!existing) {
    return;
  }

  const name = toStringValue(formData.get("name")) || existing.name;
  const slug = toStringValue(formData.get("slug")) || existing.slug;
  const rate = toNumber(formData.get("rate")) || existing.rate;
  const description = toStringValue(formData.get("description")) || existing.description;
  const region = getOptional(formData.get("region")) ?? existing.region;
  const category = getOptional(formData.get("category")) ?? existing.category;
  const payoutSpeed =
    getOptional(formData.get("payoutSpeed")) ?? existing.payoutSpeed;
  const trend = getOptional(formData.get("trend")) ?? existing.trend;
  const weeklyVolume =
    getOptional(formData.get("weeklyVolume")) ?? existing.weeklyVolume;
  const isActive = formData.get("isActive") === "on";

  let imagePath = toStringValue(formData.get("imageUrl")) || existing.imagePath;
  const imageFile = formData.get("imageFile");
  const shouldReplaceImage = imageFile instanceof File && imageFile.size > 0;

  if (shouldReplaceImage) {
    imagePath = await saveFile(
      imageFile,
      "public/uploads/giftcards",
      "/uploads/giftcards"
    );
  }

  if (shouldReplaceImage) {
    await removePublicUpload(existing.imagePath);
  }

  await prisma.giftCard.update({
    where: { id },
    data: {
      name,
      slug,
      imagePath,
      rate,
      description,
      region,
      category,
      payoutSpeed,
      trend,
      weeklyVolume,
      isActive,
    },
  });

  revalidatePath("/");
  revalidatePath("/marketplace");
  revalidatePath("/admin/gift-cards");
}

export async function toggleGiftCardStatus(formData: FormData) {
  await requireAdmin();

  const id = toStringValue(formData.get("id"));
  if (!id) {
    return;
  }

  const existing = await prisma.giftCard.findUnique({ where: { id } });
  if (!existing) {
    return;
  }

  await prisma.giftCard.update({
    where: { id },
    data: { isActive: !existing.isActive },
  });

  revalidatePath("/");
  revalidatePath("/marketplace");
  revalidatePath("/admin/gift-cards");
}

export async function deleteGiftCard(formData: FormData) {
  await requireAdmin();

  const id = toStringValue(formData.get("id"));
  if (!id) {
    return;
  }

  const existing = await prisma.giftCard.findUnique({
    where: { id },
    select: { imagePath: true },
  });

  if (!existing) {
    return;
  }

  await removePublicUpload(existing.imagePath);
  await prisma.giftCard.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/marketplace");
  revalidatePath("/admin/gift-cards");
}
