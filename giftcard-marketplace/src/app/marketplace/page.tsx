import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import MarketplaceCard from "@/components/MarketplaceCard";
import { categoryFilters } from "@/data/marketplace";
import { toMarketplaceCard } from "@/lib/marketplace";
import { fetchActiveGiftCards } from "@/lib/giftCards";

export default async function MarketplacePage() {
  const giftCards = await fetchActiveGiftCards();

  const marketplaceCards = giftCards.map(toMarketplaceCard);
  const liveQuotes = marketplaceCards.slice(0, 4);

  return (
    <SiteShell>
      <div className="market-glow">
        <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10">
          <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-gradient-to-r from-sky-200 via-cyan-100 to-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-900 shadow-sm">
                Live marketplace
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              </div>
              <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
                Trade gift cards like a modern P2P desk.
              </h1>
              <p className="mt-4 max-w-xl text-lg text-slate-600">
                Track live buy rates, lock in quotes, and submit cards with a
                market-driven workflow built for speed.
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
              <div className="mt-8 grid gap-3 text-sm text-slate-500 sm:grid-cols-3">
                {
                  [
                    {
                      label: "Active listings",
                      value: `${marketplaceCards.length} live`,
                      note: "Updated seconds ago",
                    },
                    {
                      label: "Avg payout",
                      value: "12 min",
                      note: "Instant settlement",
                    },
                    {
                      label: "Liquidity",
                      value: "$312k",
                      note: "Across verified buyers",
                    },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-slate-200/70 bg-white/80 p-4"
                    >
                      <p className="text-xs uppercase tracking-[0.3em]">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-slate-900">
                        {metric.value}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {metric.note}
                      </p>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">Order book pulse</p>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Live pricing
                </span>
              </div>
              <div className="mt-6 h-40 rounded-2xl bg-gradient-to-br from-sky-500/20 via-blue-500/5 to-transparent p-4">
                <div className="flex h-full items-end gap-2">
                  {[38, 62, 52, 78, 64, 88, 76].map((height, index) => (
                    <div
                      key={index}
                      className="w-full rounded-full bg-gradient-to-t from-sky-500 to-blue-700"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-6 space-y-3 text-sm text-slate-600">
                {liveQuotes.length ? (
                  liveQuotes.map((card) => (
                    <div
                      key={card.id}
                      className="flex items-center justify-between rounded-2xl border border-slate-200/60 bg-white/90 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50">
                          <Image
                            src={card.imagePath}
                            alt={`${card.name} logo`}
                            width={28}
                            height={28}
                            className="h-6 w-6 object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {card.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {card.payout}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-[0.2em] text-emerald-500">
                          Live
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                          {card.rate}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200/70 bg-slate-50/80 px-4 py-6 text-center text-sm text-slate-500">
                    No live quotes yet. Add gift cards to begin trading.
                  </div>
                )}
              </div>
            </div>
          </section>

          <section
            id="rates"
            className="mt-14 flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Live rates
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Marketplace listings
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
          </section>

          {marketplaceCards.length ? (
            <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {marketplaceCards.map((card) => (
                <MarketplaceCard key={card.id} card={card} />
              ))}
            </section>
          ) : (
            <section className="mt-8 rounded-3xl border border-dashed border-slate-200/70 bg-white/80 p-10 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                No listings yet
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                Gift card marketplace is empty
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Add listings from the admin desk to activate live trading for
                sellers.
              </p>
              <Link
                href="/admin/gift-cards"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20"
              >
                Manage gift cards
              </Link>
            </section>
          )}

          <section className="mt-16 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Trading desk tools
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Built for high-frequency sellers.
              </h2>
              <div className="mt-6 space-y-3 text-sm text-slate-600">
                {[
                  "Live-rate alerts with market pulse tracking",
                  "Escrow-backed buyer guarantees",
                  "Automated compliance checks on every submission",
                  "Multi-rail payout options in minutes",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/80 px-4 py-3"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200/70 bg-slate-900 p-8 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                Market conditions
              </p>
              <h2 className="mt-3 text-3xl font-semibold">Premium buy rates</h2>
              <p className="mt-3 text-sm text-slate-200">
                NovaCard continuously matches sell orders with the highest
                liquidity pools, keeping rates competitive.
              </p>
              <div className="mt-6 space-y-3 text-sm text-slate-200">
                {["High-volume corridors", "Instant settlement", "Risk scored buyers"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
              <Link
                href="/dashboard"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-black/20"
              >
                View your desk
              </Link>
            </div>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
