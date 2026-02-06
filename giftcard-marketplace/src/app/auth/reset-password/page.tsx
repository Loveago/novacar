import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { resetPassword } from "@/app/actions/password-reset";

const errorMessages: Record<string, string> = {
  mismatch: "Passwords do not match.",
  short: "Password must be at least 6 characters.",
  expired: "This reset link has expired or is invalid. Please request a new one.",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const { token, error } = await searchParams;

  if (!token && error === "expired") {
    return (
      <SiteShell>
        <div className="mx-auto w-full max-w-md px-6 pb-24 pt-12">
          <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8 text-center">
            <h1 className="text-2xl font-semibold text-slate-900">
              Link expired
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              {errorMessages.expired}
            </p>
            <Link
              href="/auth/forgot-password"
              className="mt-6 inline-block rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
            >
              Request new link
            </Link>
          </div>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-md px-6 pb-24 pt-12">
        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Account recovery
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Set new password
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Choose a strong password for your account.
          </p>

          {error && errorMessages[error] && (
            <div className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {errorMessages[error]}
            </div>
          )}

          <form className="mt-6 space-y-4" action={resetPassword}>
            <input type="hidden" name="token" value={token ?? ""} />
            <input
              className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm"
              placeholder="New password"
              type="password"
              name="password"
              minLength={6}
              required
            />
            <input
              className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm"
              placeholder="Confirm new password"
              type="password"
              name="confirmPassword"
              minLength={6}
              required
            />
            <button className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20">
              Reset password
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-slate-500">
            <Link
              href="/auth/login"
              className="font-semibold text-slate-900"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
