import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { registerUser } from "@/app/actions/auth";

export default function RegisterPage() {
  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-12">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-5 shadow-xl shadow-slate-200/40 sm:rounded-3xl sm:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Seller onboarding
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:mt-3 sm:text-3xl">
              Create your NovaCard account
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Start selling gift cards with verified rates and instant payouts.
            </p>
            <form className="mt-6 space-y-4" action={registerUser}>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="First name"
                  name="firstName"
                />
                <input
                  className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="Last name"
                  name="lastName"
                />
              </div>
              <input
                className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="Email address"
                name="email"
                type="email"
                required
              />
              <input
                className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="Password"
                type="password"
                name="password"
                required
                autoComplete="new-password"
              />
              <button className="w-full rounded-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:shadow-slate-900/30 active:translate-y-0">
                Create account
              </button>
            </form>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
              <span>Already have an account?</span>
              <Link href="/auth/login" className="font-semibold text-slate-900 transition hover:text-slate-700">
                Log in
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-slate-800/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-5 text-white shadow-xl sm:rounded-3xl sm:p-8">
            <div className="pointer-events-none absolute -top-20 right-0 h-40 w-40 rounded-full bg-sky-500/20 blur-2xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-full bg-emerald-400/20 blur-2xl" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                Verification
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                Fast KYC, higher limits
              </h2>
              <p className="mt-3 text-sm text-slate-300">
                Complete verification to unlock larger payouts and dedicated
                liquidity routes.
              </p>
              <div className="mt-6 space-y-3 text-sm text-slate-200">
                {[
                  { icon: "M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z", label: "Upload ID & selfie" },
                  { icon: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z", label: "Add payout account" },
                  { icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z", label: "Review compliance status" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <svg className="h-5 w-5 shrink-0 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
