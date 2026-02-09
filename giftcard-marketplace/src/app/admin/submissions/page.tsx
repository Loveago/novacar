import { readFile } from "fs/promises";
import path from "path";
import SiteShell from "@/components/SiteShell";
import StatusBadge from "@/components/StatusBadge";
import { updateSubmissionStatus } from "@/app/actions/submissions";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guards";
import { formatDateTime, formatMoney } from "@/lib/format";
import { decryptValue } from "@/lib/crypto";

type SubmissionWithExtras = {
  id: string;
  cardValue: number;
  payoutAmount: number;
  payoutMethod: string | null;
  payoutDetails: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED" | "PAID";
  adminNote: string | null;
  createdAt: Date;
  cardCode: string | null;
  cardImagePath: string | null;
  giftCard: { name: string };
  user: { name: string | null; email: string };
};

export default async function AdminSubmissionsPage() {
  await requireAdmin();
  const submissionsRaw: SubmissionWithExtras[] = await prisma.submission.findMany({
    include: { giftCard: true, user: true },
    orderBy: { createdAt: "desc" },
  });

  const submissions = await Promise.all(
    submissionsRaw.map(async (submission) => {
      let decryptedCardCode: string | null = null;
      if (submission.cardCode) {
        try {
          decryptedCardCode = decryptValue(submission.cardCode);
        } catch (error) {
          decryptedCardCode = "Unable to decrypt";
        }
      }

      let cardImagePreview: { src: string; filename: string } | null = null;
      if (submission.cardImagePath) {
        try {
          const buffer = await readFile(submission.cardImagePath);
          const ext = path.extname(submission.cardImagePath).replace(".", "") || "png";
          cardImagePreview = {
            src: `data:image/${ext};base64,${buffer.toString("base64")}`,
            filename: path.basename(submission.cardImagePath),
          };
        } catch (error) {
          cardImagePreview = null;
        }
      }

      return {
        ...submission,
        decryptedCardCode,
        cardImagePreview,
      };
    })
  );

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
                <div className="space-y-2">
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
                    <p className="text-xs text-slate-500 break-words">
                      Payout details: {submission.payoutDetails}
                    </p>
                  ) : null}
                  {submission.decryptedCardCode ? (
                    <p className="text-xs text-slate-700">
                      Card number: <span className="font-mono text-slate-900">{submission.decryptedCardCode}</span>
                    </p>
                  ) : null}
                </div>

                {submission.cardImagePreview ? (
                  <div className="flex flex-1 items-center gap-4 rounded-2xl border border-white/70 bg-white/80 p-3 text-xs text-slate-500">
                    <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={submission.cardImagePreview.src}
                        alt={submission.cardImagePreview.filename}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Uploaded image</p>
                      <p className="mt-1 break-all font-mono text-[11px] text-slate-700">
                        {submission.cardImagePreview.filename}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400">
                    No image uploaded
                  </div>
                )}

                <div className="text-sm text-slate-600">
                  ${submission.cardValue.toFixed(2)} → {formatMoney(submission.payoutAmount)}
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
