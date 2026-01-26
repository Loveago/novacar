import SiteShell from "@/components/SiteShell";
import StatusBadge from "@/components/StatusBadge";
import { updateSubmissionStatus } from "@/app/actions/submissions";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guards";
import { formatDateTime, formatMoney } from "@/lib/format";

export default async function AdminSubmissionsPage() {
  await requireAdmin();
  const submissions: Array<{
    id: string;
    cardValue: number;
    payoutAmount: number;
    payoutMethod: string | null;
    payoutDetails: string | null;
    status: "PENDING" | "APPROVED" | "REJECTED" | "PAID";
    adminNote: string | null;
    createdAt: Date;
    giftCard: { name: string };
    user: { name: string | null; email: string };
  }> = await prisma.submission.findMany({
    include: { giftCard: true, user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-12">
        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Admin submissions
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Review submissions
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Approve, reject, or mark as paid after sending funds.
          </p>

          <div className="mt-8 space-y-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/70 bg-slate-50/80 px-4 py-4"
              >
                <div>
                  <p className="font-semibold text-slate-900">
                    {submission.giftCard.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {submission.user.name ?? submission.user.email} ·{" "}
                    {formatDateTime(submission.createdAt)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Payout method: {submission.payoutMethod ?? "Not provided"}
                  </p>
                  {submission.payoutDetails ? (
                    <p className="mt-1 text-xs text-slate-500 break-words">
                      Payout details: {submission.payoutDetails}
                    </p>
                  ) : null}
                </div>
                <div className="text-sm text-slate-600">
                  ${submission.cardValue.toFixed(2)} →{" "}
                  {formatMoney(submission.payoutAmount)}
                </div>
                <form
                  action={updateSubmissionStatus}
                  className="flex flex-wrap items-center gap-2"
                >
                  <input type="hidden" name="id" value={submission.id} />
                  <StatusBadge status={submission.status} />
                  <select
                    name="status"
                    defaultValue={submission.status}
                    className="rounded-full border border-slate-200 px-3 py-2 text-xs text-slate-600"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="PAID">Paid</option>
                  </select>
                  <input
                    name="adminNote"
                    placeholder="Admin note"
                    defaultValue={submission.adminNote ?? ""}
                    className="rounded-full border border-slate-200 px-3 py-2 text-xs text-slate-600"
                  />
                  <button className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white">
                    Update
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
