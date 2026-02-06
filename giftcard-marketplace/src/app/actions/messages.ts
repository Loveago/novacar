"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireAdmin } from "@/lib/guards";
import { toStringValue } from "@/lib/utils";

export async function sendMessageToAdmin(formData: FormData) {
  const session = await requireAuth();
  const body = toStringValue(formData.get("body"))?.trim();
  if (!body) return;

  const senderId = (session.user as { id?: string }).id;
  if (!senderId) return;

  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!admin) return;

  await prisma.message.create({
    data: {
      body,
      senderId,
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

  const senderId = (session.user as { id?: string }).id;
  if (!senderId) return;

  await prisma.message.create({
    data: {
      body,
      senderId,
      receiverId: userId,
    },
  });

  revalidatePath(`/admin/messages/${userId}`);
  revalidatePath("/admin/messages");
}

export async function markConversationRead(userId: string) {
  const session = await requireAdmin();
  const adminId = (session.user as { id?: string }).id;
  if (!adminId) return;

  await prisma.message.updateMany({
    where: {
      senderId: userId,
      receiverId: adminId,
      isRead: false,
    },
    data: { isRead: true },
  });

  revalidatePath("/admin/messages");
  revalidatePath(`/admin/messages/${userId}`);
}
