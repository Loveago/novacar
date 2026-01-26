"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/lib/auth";
import { toStringValue } from "@/lib/utils";

function isCredentialsSignin(error: unknown) {
  return (
    error &&
    typeof error === "object" &&
    "type" in error &&
    (error as { type?: string }).type === "CredentialsSignin"
  );
}

export async function registerUser(formData: FormData) {
  const name = `${toStringValue(formData.get("firstName"))} ${toStringValue(
    formData.get("lastName")
  )}`.trim();
  const email = toStringValue(formData.get("email"));
  const password = toStringValue(formData.get("password"));

  if (!email || !password) {
    return;
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name: name || null,
      email,
      password: hashed,
    },
  });

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (isCredentialsSignin(error)) {
      return;
    }
    throw error;
  }

  redirect("/dashboard");
}

export async function logoutUser() {
  await signOut({ redirectTo: "/auth/login" });
}

export async function loginUser(formData: FormData) {
  const email = toStringValue(formData.get("email"));
  const password = toStringValue(formData.get("password"));

  if (!email || !password) {
    return;
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (isCredentialsSignin(error)) {
      return;
    }
    throw error;
  }

  redirect("/dashboard");
}
