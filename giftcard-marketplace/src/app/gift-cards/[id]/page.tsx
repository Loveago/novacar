import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import { prisma } from "@/lib/prisma";
import { formatRate } from "@/lib/format";

type GiftCardPageProps = {
  params: Promise<{ id: string }>;
};

export default async function GiftCardPage({ params }: GiftCardPageProps) {
  const { id } = await params;
  const card = await prisma.giftCard.findUnique({
    where: { slug: id },
  });

  if (!card) {
    notFound();
  }

  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-5xl px-6 pb-24 pt-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
                <Image
                  src={card.imagePath}
                  alt={`${card.name} logo`}
                  width={56}
                  height={56}
                  className="h-12 w-12 rounded-xl object-contain"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Gift card
                </p>
                <h1 className="text-3xl font-semibold text-slate-900">
                  {card.name}
                </h1>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-500">{card.description}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Buy rate
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {formatRate(card.rate)}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Payout speed
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {card.payoutSpeed ?? "Instant payout"}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Liquidity
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {card.weeklyVolume ?? "On demand"}
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/sell/${card.slug}`}
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20"
              >
                Sell this card
              </Link>
              <Link
                href="/marketplace"
                className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700"
              >
                Back to marketplace
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-slate-900 p-8 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
              Verification flow
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Instant validation</h2>
            <p className="mt-3 text-sm text-slate-200">
              Our engine checks card legitimacy, balance, and fraud signals
              before you submit.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-200">
              <li>• OCR + code checksum validation</li>
              <li>• 3-tier AML screening</li>
              <li>• Payout confirmation alerts</li>
            </ul>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
