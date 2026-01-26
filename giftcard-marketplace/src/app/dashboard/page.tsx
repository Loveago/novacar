import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guards";
import { formatDateTime, formatMoney } from "@/lib/format";

const quickActions = [
  {
    title: "Submit a card",
    detail: "Upload a new gift card to sell.",
    href: "/marketplace",
  },
  {
    title: "Payout settings",
    detail: "Manage bank, mobile money, or USDT.",
    href: "/profile",
  },
  {
    title: "Rate alerts",
    detail: "Get notified when rates move.",
    href: "/transactions",
  },
];

export default async function DashboardPage() {
  const session = await requireAuth();
  const userId = session.user.id;

  const [recentSubmissions, submissionCount, approvedPayouts, pendingCount, topRate] =
    await prisma.$transaction([
      prisma.submission.findMany({
        where: { userId },
        include: { giftCard: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.submission.count({ where: { userId } }),
      prisma.submission.aggregate({
        where: { userId, status: { in: ["APPROVED", "PAID"] } },
        _sum: { payoutAmount: true },
      }),
      prisma.submission.count({ where: { userId, status: "PENDING" } }),
      prisma.giftCard.findFirst({
        where: { isActive: true },
        orderBy: { rate: "desc" },
      }),
    ]);

  const displayName =
    session.user.name?.split(" ")[0] ??
    session.user.email?.split("@")[0] ??
    "there";
  const approvedTotal = approvedPayouts._sum.payoutAmount ?? 0;
  const dashboardStats = [
    {
      label: "Total submissions",
      value: `${submissionCount}`,
      note: "Cards submitted for review",
    },
    {
      label: "Approved payouts",
      value: formatMoney(approvedTotal),
      note: "Total cleared payouts",
    },
    {
      label: "Pending reviews",
      value: `${pendingCount}`,
      note: "Awaiting admin approval",
    },
  ];

  const latestSubmission = recentSubmissions[0];
  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-12">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">
              Welcome back, {displayName}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Your latest payouts and card submissions across all corridors.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {dashboardStats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-slate-900 p-8 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
              Account health
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Account activity</h2>
            <p className="mt-3 text-sm text-slate-200">
              {latestSubmission
                ? `Latest submission · ${latestSubmission.giftCard.name} · ${formatMoney(
                    latestSubmission.payoutAmount
                  )}`
                : "No submissions yet. Start selling to see activity here."}
            </p>
            <div className="mt-6 space-y-3 text-sm text-slate-200">
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                Approved payouts: {formatMoney(approvedTotal)}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                Pending reviews: {pendingCount}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                Live rate: {topRate ? `${topRate.name} · GHS ${topRate.rate.toFixed(2)}` : "No live rates"}
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Link
                href="/marketplace"
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900"
              >
                New sale
              </Link>
              <Link
                href="/transactions"
                className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white"
              >
                View history
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {action.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">{action.detail}</p>
            </Link>
          ))}
        </section>

        <section className="mt-12 rounded-3xl border border-slate-200/70 bg-white/90 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Recent transactions
            </h2>
            <Link
              href="/transactions"
              className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
            >
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-4">
            {recentSubmissions.length ? (
              recentSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/70 bg-slate-50/80 px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {submission.giftCard.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatDateTime(submission.createdAt)}
                    </p>
                  </div>
                  <div className="text-sm text-slate-600">
                    ${submission.cardValue.toFixed(2)} →{" "}
                    {formatMoney(submission.payoutAmount)}
                  </div>
                  <StatusBadge status={submission.status} />
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200/70 bg-slate-50/80 px-4 py-6 text-sm text-slate-500">
                No submissions yet. Sell your first card to populate this feed.
              </div>
            )}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
