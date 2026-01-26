import SiteShell from "@/components/SiteShell";
import StatusBadge from "@/components/StatusBadge";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guards";
import { formatDateTime, formatMoney } from "@/lib/format";

export default async function TransactionsPage() {
  const session = await requireAuth();
  const submissions = await prisma.submission.findMany({
    where: { userId: session.user.id },
    include: { giftCard: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-5xl px-6 pb-24 pt-12">
        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Transactions
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Transaction history
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Monitor every submission, approval, and payout in real time.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {submissions.length ? (
            submissions.map((submission) => (
              <div
                key={submission.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white/90 px-5 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {submission.giftCard.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDateTime(submission.createdAt)}
                  </p>
                </div>
                <div className="text-sm text-slate-600">
                  ${submission.cardValue.toFixed(2)} ·{" "}
                  {formatMoney(submission.payoutAmount)}
                </div>
                <StatusBadge status={submission.status} />
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200/70 bg-white/90 px-5 py-6 text-sm text-slate-500">
              No transactions yet. Your submissions will show up here once you
              sell a card.
            </div>
          )}
        </div>
      </div>
    </SiteShell>
  );
}
