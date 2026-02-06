import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import StatCard from "@/components/StatCard";
import { dashboardStats } from "@/data/marketplace";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guards";

const adminActions = [
  {
    title: "Gift cards",
    detail: "Manage rates, images, and active listings.",
    href: "/admin/gift-cards",
  },
  {
    title: "Submissions",
    detail: "Review and approve seller submissions.",
    href: "/admin/submissions",
  },
  {
    title: "Users",
    detail: "Monitor user accounts and KYC status.",
    href: "/admin/users",
  },
  {
    title: "Messages",
    detail: "View and reply to user support messages.",
    href: "/admin/messages",
  },
];

export default async function AdminPage() {
  await requireAdmin();
  const [giftCardCount, userCount, pendingCount] = await Promise.all([
    prisma.giftCard.count(),
    prisma.user.count(),
    prisma.submission.count({ where: { status: "PENDING" } }),
  ]);

  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-12">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Admin overview
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">
              NovaCard control room
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage live listings, monitor liquidity, and update payout rails.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {dashboardStats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-slate-900 p-8 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
              Alerts
            </p>
            <h2 className="mt-3 text-2xl font-semibold">24 active reviews</h2>
            <p className="mt-3 text-sm text-slate-200">
              Average review time is 14 minutes across all submissions.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900">
                Pending: {pendingCount}
              </span>
              <span className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white">
                Gift cards: {giftCardCount}
              </span>
              <span className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white">
                Users: {userCount}
              </span>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {adminActions.map((action) => (
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
      </div>
    </SiteShell>
  );
}
