"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireAdmin } from "@/lib/guards";
import { toStringValue } from "@/lib/utils";

export async function sendMessageToAdmin(formData: FormData) {
  const session = await requireAuth();
  const body = toStringValue(formData.get("body"))?.trim();
  if (!body) return;

  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!admin) return;

  await prisma.message.create({
    data: {
      body,
      senderId: session.user.id,
      receiverId: admin.id,
    },
  });

  revalidatePath("/support");
}

export async function sendAdminReply(formData: FormData) {
  const session = await requireAdmin();
  const body = toStringValue(formData.get("body"))?.trim();
  const userId = toStringValue(formData.get("userId"));
  if (!body || !userId) return;

  await prisma.message.create({
    data: {
      body,
      senderId: session.user.id,
      receiverId: userId,
    },
  });

  revalidatePath(`/admin/messages/${userId}`);
  revalidatePath("/admin/messages");
}

export async function markConversationRead(userId: string) {
  const session = await requireAdmin();

  await prisma.message.updateMany({
    where: {
      senderId: userId,
      receiverId: session.user.id,
      isRead: false,
    },
    data: { isRead: true },
  });

  revalidatePath("/admin/messages");
  revalidatePath(`/admin/messages/${userId}`);
}
