"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guards";
import { toStringValue } from "@/lib/utils";

export async function updateUser(formData: FormData) {
  await requireAdmin();

  const id = toStringValue(formData.get("id"));
  if (!id) {
    return;
  }

  const name = toStringValue(formData.get("name"));
  const email = toStringValue(formData.get("email"));
  const role = toStringValue(formData.get("role"));
  const paymentDetails = toStringValue(formData.get("paymentDetails"));

  await prisma.user.update({
    where: { id },
    data: {
      name: name || null,
      email: email || undefined,
      role: role === "ADMIN" ? "ADMIN" : "USER",
      paymentDetails: paymentDetails || null,
    },
  });

  revalidatePath("/admin/users");
}
