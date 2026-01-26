import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }
  return session;
}
