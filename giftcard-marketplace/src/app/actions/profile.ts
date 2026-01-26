"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guards";
import { toStringValue } from "@/lib/utils";

export async function updateProfile(formData: FormData) {
  const session = await requireAuth();

  const name = toStringValue(formData.get("name"));
  const paymentDetails = toStringValue(formData.get("paymentDetails"));

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: name || null,
      paymentDetails: paymentDetails || null,
    },
  });

  revalidatePath("/profile");
}
