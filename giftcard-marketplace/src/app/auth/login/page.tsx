import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { loginUser } from "@/app/actions/auth";

export default function LoginPage() {
  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-5xl px-6 pb-24 pt-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Seller portal
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Log in to track payouts, manage submissions, and view live rates.
            </p>
            <form className="mt-6 space-y-4" action={loginUser}>
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
                Sign in
              </button>
            </form>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
              <span>Need access?</span>
              <Link href="/auth/register" className="font-semibold text-slate-900">
                Create account
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-slate-900 p-8 text-white">
            <h2 className="text-2xl font-semibold">Secure seller dashboard</h2>
            <p className="mt-3 text-sm text-slate-200">
              Real-time rate alerts, compliance status, and payout tracking in
              one sleek fintech interface.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-200">
              <li>• 24/7 fraud screening</li>
              <li>• Multi-currency payouts</li>
              <li>• Dedicated account manager</li>
            </ul>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
