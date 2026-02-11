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
      <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-12">
        <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-4 sm:rounded-3xl sm:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Transactions
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:mt-3 sm:text-3xl">
            Transaction history
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Monitor every submission, approval, and payout in real time.
          </p>
        </div>

        <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
          {submissions.length ? (
            submissions.map((submission) => (
              <div
                key={submission.id}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/90 p-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:px-5"
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
