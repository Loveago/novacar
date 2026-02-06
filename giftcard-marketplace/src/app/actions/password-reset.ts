"use server";

import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";
import { toStringValue } from "@/lib/utils";
import { redirect } from "next/navigation";

function appUrl() {
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function requestPasswordReset(formData: FormData) {
  const email = toStringValue(formData.get("email"));
  if (!email) return;

  const user = await prisma.user.findUnique({ where: { email } });

  // Always redirect to the same page to avoid leaking whether the email exists
  if (!user) {
    redirect("/auth/forgot-password?sent=1");
  }

  // Delete any existing tokens for this user
  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

  await prisma.passwordResetToken.create({
    data: { token, userId: user.id, expiresAt },
  });

  const resetUrl = `${appUrl()}/auth/reset-password?token=${token}`;
  await sendPasswordResetEmail(user.email, resetUrl);

  redirect("/auth/forgot-password?sent=1");
}

export async function resetPassword(formData: FormData) {
  const token = toStringValue(formData.get("token"));
  const password = toStringValue(formData.get("password"));
  const confirm = toStringValue(formData.get("confirmPassword"));

  if (!token || !password || !confirm) return;
  if (password !== confirm) {
    redirect(`/auth/reset-password?token=${token}&error=mismatch`);
  }
  if (password.length < 6) {
    redirect(`/auth/reset-password?token=${token}&error=short`);
  }

  const record = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!record || record.expiresAt < new Date()) {
    redirect("/auth/reset-password?error=expired");
  }

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: record.userId },
    data: { password: hashed },
  });

  await prisma.passwordResetToken.delete({ where: { id: record.id } });

  redirect("/auth/login?reset=1");
}
