import SiteShell from "@/components/SiteShell";
import { updateProfile } from "@/app/actions/profile";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guards";

const payoutMethods = ["MTN MoMo", "Bank transfer", "USDT wallet"];

export default async function ProfilePage() {
  const session = await requireAuth();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, paymentDetails: true },
  });
  const payoutSummary = await prisma.submission.aggregate({
    where: {
      userId: session.user.id,
      status: { in: ["PENDING", "APPROVED"] },
    },
    _sum: { payoutAmount: true },
    _count: { _all: true },
  });
  const walletBalance = payoutSummary._sum.payoutAmount ?? 0;
  const pendingCount = payoutSummary._count._all ?? 0;
  const walletDisplay = walletBalance.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const paymentDetails = user?.paymentDetails ?? "";
  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-5xl px-6 pb-24 pt-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Payout settings
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">
              Payment details
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Update your payout preferences and bank details.
            </p>
            <form className="mt-6 space-y-4" action={updateProfile}>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Legal name
                </label>
                <input
                  className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm"
                  name="name"
                  defaultValue={user?.name ?? ""}
                  placeholder="Ava Joseph"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Payout method
                </label>
                <div className="mt-2 grid gap-3 sm:grid-cols-3">
                  {payoutMethods.map((method) => (
                    <div
                      key={method}
                      className="rounded-2xl border border-slate-200/70 bg-slate-50/80 px-4 py-3 text-sm text-slate-600"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  MTN MoMo / bank / crypto details
                </label>
                <textarea
                  className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm"
                  name="paymentDetails"
                  defaultValue={paymentDetails}
                  rows={4}
                  placeholder="MTN MoMo: 024xxxxxxx · Bank: ABC/0123456789 · USDT: TQxx..."
                />
                <p className="mt-2 text-xs text-slate-400">
                  This will appear as the saved payout details on the sell form.
                </p>
              </div>
              <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20">
                Save settings
              </button>
            </form>
          </div>
          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Security
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                Protect your payouts
              </h2>
              <p className="mt-3 text-sm text-slate-500">
                Enable two-factor authentication and payout confirmations.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200/70 bg-slate-900 p-6 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                Wallet balance
              </p>
              <p className="mt-3 text-2xl font-semibold">GHS {walletDisplay}</p>
              <p className="mt-2 text-sm text-slate-300">
                {pendingCount > 0
                  ? `Awaiting approval on ${pendingCount} submission${pendingCount === 1 ? "" : "s"}.`
                  : "No pending payouts right now."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
