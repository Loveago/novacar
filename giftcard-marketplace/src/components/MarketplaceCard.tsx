import Image from "next/image";
import Link from "next/link";
import type { MarketplaceCardData } from "@/types/marketplace";

export default function MarketplaceCard({
  card,
}: {
  card: MarketplaceCardData;
}) {
  const isLive = card.isActive;
  const tags = [card.category, card.region].filter(Boolean) as string[];

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-white/60 bg-gradient-to-b from-white/95 via-white/90 to-cyan-50/70 p-4 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.45)] transition hover:-translate-y-1 hover:shadow-[0_30px_70px_-35px_rgba(15,23,42,0.55)] sm:rounded-3xl sm:p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50">
            <Image
              src={card.imagePath}
              alt={`${card.name} logo`}
              width={48}
              height={48}
              className="h-10 w-10 rounded-xl object-contain"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Gift card
            </p>
            <h3 className="text-lg font-semibold text-slate-900">{card.name}</h3>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
            isLive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isLive ? "animate-pulse bg-emerald-500" : "bg-slate-400"
            }`}
          />
          {isLive ? "Live" : "Disabled"}
        </span>
      </div>
      <div className="mt-4 flex-1">
        <p className="text-sm text-slate-600">{card.description}</p>
        {tags.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-sky-100/80 bg-sky-50/70 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-4 rounded-2xl border border-sky-100/80 bg-gradient-to-br from-sky-50/70 via-white to-white/90 p-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
            <span>Live buy rate</span>
            {card.trend ? (
              <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600 shadow-inner">
                {card.trend}
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
            {card.rate}
          </p>
          <p className="mt-1 text-xs text-slate-500">Auto-updated seconds ago</p>
        </div>
      </div>
      <div className="mt-5 space-y-2 text-sm text-slate-600">
        <div className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/70 px-4 py-2">
          <span>Payout speed</span>
          <span className="font-semibold text-slate-900">{card.payout}</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/70 px-4 py-2">
          <span>Liquidity</span>
          <span className="font-semibold text-slate-900">
            {card.weeklyVolume ?? "$0 weekly"}
          </span>
        </div>
      </div>
      <Link
        href={`/sell/${card.slug}`}
        className="mt-6 inline-flex items-center justify-center rounded-full border border-white/50 bg-gradient-to-r from-sky-500 via-indigo-500 to-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:shadow-sky-500/40"
      >
        Sell card
      </Link>
    </div>
  );
}
