import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { requestPasswordReset } from "@/app/actions/password-reset";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;

  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-md px-6 pb-24 pt-12">
        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8 shadow-xl shadow-slate-200/40">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Account recovery
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Forgot password
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter your email and we&apos;ll send you a link to reset your
            password.
          </p>

          {sent && (
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              If that email exists in our system, a reset link has been sent.
              Check your inbox.
            </div>
          )}

          <form className="mt-6 space-y-4" action={requestPasswordReset}>
            <input
              className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Email address"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
            <button className="w-full rounded-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:shadow-slate-900/30 active:translate-y-0">
              Send reset link
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-slate-500">
            <Link
              href="/auth/login"
              className="font-semibold text-slate-900 transition hover:text-slate-700"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
