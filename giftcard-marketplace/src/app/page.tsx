import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import MarketplaceCard from "@/components/MarketplaceCard";
import StatCard from "@/components/StatCard";
import { categoryFilters, dashboardStats } from "@/data/marketplace";
import { prisma } from "@/lib/prisma";
import { toMarketplaceCard } from "@/lib/marketplace";
import type { MarketplaceCardData } from "@/types/marketplace";

const activityFeed = [
  "Amazon rate updated to GHS 11.20 · 2m ago",
  "USDT payout rail expanded for EU sellers · 9m ago",
  "Steam cards now eligible for instant settlement · 21m ago",
  "Risk engine flagged 98% of fraud in beta · 42m ago",
];

export default async function Home() {
  const giftCards = await prisma.giftCard.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
  const marketplaceCards: MarketplaceCardData[] = giftCards.map(toMarketplaceCard);

  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10">
        <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-gradient-to-r from-sky-200 via-cyan-100 to-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-900 shadow-sm">
              Live marketplace
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
              A fintech marketplace to liquidate gift cards in minutes.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-600">
              Discover live buy rates, submit cards securely, and track payouts
              inside a platform inspired by modern crypto P2P desks.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/auth/register"
                className="rounded-full border border-white/70 bg-gradient-to-r from-sky-500 via-indigo-500 to-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/40 transition hover:-translate-y-0.5 hover:shadow-sky-500/60"
              >
                Start selling
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
              >
                View dashboard
              </Link>
            </div>
            <div className="mt-8 grid gap-3 text-sm text-slate-500 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                <p className="text-xs uppercase tracking-[0.3em]">Avg payout</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  12 min
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                <p className="text-xs uppercase tracking-[0.3em]">Liquidity</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  $312k
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">Market Pulse</p>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                +6.4% today
              </span>
            </div>
            <div className="mt-6 h-40 rounded-2xl bg-gradient-to-br from-sky-500/15 via-blue-500/5 to-transparent p-4">
              <div className="flex h-full items-end gap-2">
                {[40, 65, 52, 70, 82, 60, 92].map((height, index) => (
                  <div
                    key={index}
                    className="w-full rounded-full bg-gradient-to-t from-sky-500 to-blue-700"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              {activityFeed.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-slate-200/60 bg-white/90 px-4 py-3"
                >
                  <span>{item}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Live
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3" id="rates">
          {dashboardStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Live order flow
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  Trending buyback rates
                </h2>
              </div>
              <Link
                href="/transactions"
                className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
              >
                See all
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {marketplaceCards.slice(0, 4).map((card) => (
                <div
                  key={card.slug}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <Image
                        src={card.imagePath}
                        alt={`${card.name} logo`}
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{card.name}</p>
                      <p className="text-xs text-slate-500">{card.region}</p>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-900">
                      {card.rate}
                    </span>
                    {card.trend ? (
                      <span className="ml-3 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {card.trend}
                      </span>
                    ) : null}
                  </div>
                  <Link
                    href={`/gift-cards/${card.slug}`}
                    className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
                  >
                    View details →
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Seller actions
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Manage your card submissions
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Track payouts, update payment details, and monitor status changes
              in real time.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Submit cards with OCR verification",
                "Get instant rate alerts via WhatsApp",
                "Track compliance checks and approvals",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/80 px-4 py-3 text-sm text-slate-600"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
            <Link
              href="/dashboard"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-white/60 bg-gradient-to-r from-sky-500 via-indigo-500 to-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/40 transition hover:-translate-y-0.5 hover:shadow-sky-500/60"
            >
              Go to dashboard
            </Link>
          </div>
        </section>

        <section className="mt-16" id="marketplace">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Marketplace
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Trade the highest demand gift cards
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categoryFilters.map((filter) => (
                <span
                  key={filter}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  {filter}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {marketplaceCards.map((card) => (
              <MarketplaceCard key={card.slug} card={card} />
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Seller journey
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Sell in three frictionless steps.
            </h2>
            <div className="mt-6 space-y-4">
              {[
                {
                  title: "Select gift card",
                  detail: "Choose a card, check rates, and lock in a quote.",
                },
                {
                  title: "Submit securely",
                  detail: "Enter code or upload an image with encrypted storage.",
                },
                {
                  title: "Receive payout",
                  detail: "Get paid instantly to bank, MoMo, or USDT.",
                },
              ].map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
                    0{index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{step.title}</p>
                    <p className="text-sm text-slate-500">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
              Enterprise ready
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Built with compliance, liquidity, and speed.
            </h2>
            <p className="mt-4 text-sm text-slate-300">
              NovaCard combines automated risk scoring, multi-corridor payouts,
              and a transparent order book so sellers always know the best rate.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
              <span>Escrow protection</span>
              <span>AML monitoring</span>
              <span>Multi-currency</span>
            </div>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-white/30 bg-gradient-to-r from-cyan-100 via-sky-200 to-indigo-200 px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:shadow-black/40"
            >
              Talk to sales
            </Link>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
