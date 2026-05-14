import path from "path";
import Link from "next/link";
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

const PAGE_SIZE = 5;

type AdminSubmissionsPageProps = {
  searchParams?: { page?: string };
};

export default async function AdminSubmissionsPage({ searchParams }: AdminSubmissionsPageProps) {
  await requireAdmin();
  const currentPage = Math.max(1, Number.parseInt(searchParams?.page ?? "1", 10) || 1);
  const skip = (currentPage - 1) * PAGE_SIZE;

  const [submissionsRaw, totalCount]: [SubmissionWithExtras[], number] = await Promise.all([
    prisma.submission.findMany({
      include: { giftCard: true, user: true },
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip,
    }),
    prisma.submission.count(),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

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

      let cardImagePreview: { filename: string; downloadUrl: string } | null = null;
      if (submission.cardImagePath) {
        cardImagePreview = {
          filename: path.basename(submission.cardImagePath),
          downloadUrl: `/admin/submissions/${submission.id}/image`,
        };
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
      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-12">
        <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-4 sm:rounded-3xl sm:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Admin submissions
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:mt-3 sm:text-3xl">
            Review submissions
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Approve, reject, or mark as paid after sending funds.
          </p>

          <div className="mt-8 space-y-4">
            {submissions.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200/80 bg-white/70 p-6 text-center text-sm text-slate-500">
                No submissions on this page.
              </div>
            )}
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
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
                  <a
                    href={submission.cardImagePreview.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-1 items-center gap-4 rounded-2xl border border-white/70 bg-white/80 p-3 text-xs text-slate-500 transition hover:border-sky-200 hover:bg-white"
                  >
                    <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={submission.cardImagePreview.downloadUrl}
                        alt={submission.cardImagePreview.filename}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Uploaded image</p>
                      <p className="mt-1 break-all font-mono text-[11px] text-slate-700">
                        {submission.cardImagePreview.filename}
                      </p>
                    </div>
                  </a>
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
                  className="flex flex-wrap items-center gap-2 w-full sm:w-auto"
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
                    className="flex-1 min-w-0 rounded-full border border-slate-200 px-3 py-2 text-xs text-slate-600"
                  />
                  <button className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white">
                    Update
                  </button>
                </form>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6 text-sm text-slate-500">
            <p>
              Page {currentPage} of {totalPages} · Showing {submissions.length} of {totalCount} submissions
            </p>
            <div className="flex gap-2">
              <Link
                href={`/admin/submissions?page=${Math.max(1, currentPage - 1)}`}
                className={`rounded-full border px-4 py-2 transition ${
                  currentPage === 1
                    ? "pointer-events-none border-slate-100 text-slate-300"
                    : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                }`}
                aria-disabled={currentPage === 1}
              >
                Previous
              </Link>
              <Link
                href={`/admin/submissions?page=${Math.min(totalPages, currentPage + 1)}`}
                className={`rounded-full border px-4 py-2 transition ${
                  currentPage === totalPages
                    ? "pointer-events-none border-slate-100 text-slate-300"
                    : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                }`}
                aria-disabled={currentPage === totalPages}
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
