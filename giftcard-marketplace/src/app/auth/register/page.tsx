import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { registerUser } from "@/app/actions/auth";

export default function RegisterPage() {
  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-5xl px-6 pb-24 pt-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Seller onboarding
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">
              Create your NovaCard account
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Start selling gift cards with verified rates and instant payouts.
            </p>
            <form className="mt-6 space-y-4" action={registerUser}>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm"
                  placeholder="First name"
                  name="firstName"
                />
                <input
                  className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm"
                  placeholder="Last name"
                  name="lastName"
                />
              </div>
              <input
                className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm"
                placeholder="Email address"
                name="email"
              />
              <input
                className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm"
                placeholder="Password"
                type="password"
                name="password"
              />
              <button className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20">
                Create account
              </button>
            </form>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
              <span>Already have an account?</span>
              <Link href="/auth/login" className="font-semibold text-slate-900">
                Log in
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Verification
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              Fast KYC, higher limits
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Complete verification to unlock larger payouts and dedicated
              liquidity routes.
            </p>
            <div className="mt-6 space-y-3 text-sm text-slate-500">
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 px-4 py-3">
                Upload ID & selfie
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 px-4 py-3">
                Add payout account
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 px-4 py-3">
                Review compliance status
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
