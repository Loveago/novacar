import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import { createSubmission } from "@/app/actions/submissions";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guards";
import { formatMoney, formatRate } from "@/lib/format";

type SellPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SellPage({ params }: SellPageProps) {
  const session = await requireAuth();
  const { id } = await params;
  if (!id) {
    notFound();
  }
  const card = await prisma.giftCard.findFirst({
    where: {
      OR: [{ id }, { slug: id }],
    },
  });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { paymentDetails: true },
  });
  const savedPaymentDetails = user?.paymentDetails?.trim() ?? "";
  const hasSavedPaymentDetails = savedPaymentDetails.length > 0;

  if (!card) {
    notFound();
  }

  const estimate = formatMoney(card.rate * 100);

  return (
    <SiteShell>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-sky-200/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-12">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/70 bg-white shadow-lg">
                <Image
                  src={card.imagePath}
                  alt={`${card.name} logo`}
                  fill
                  sizes="56px"
                  className="object-contain p-2"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                  Sell {card.name}
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
                  Secure payout submission
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Lock in today&apos;s rate and get paid in minutes with verified rails.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-3 text-sm text-slate-600 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Live rate
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {formatRate(card.rate)}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-3 text-sm text-slate-600 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Region
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {card.region ?? "Global"}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-3 text-sm text-slate-600 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Estimated payout
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {estimate}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[32px] border border-slate-200/70 bg-white/90 p-8 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Submission form
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                    Submit your gift card
                  </h2>
                </div>
                <span className="rounded-full border border-emerald-200/70 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  Trusted payout
                </span>
              </div>

              <form className="mt-8 space-y-6" action={createSubmission}>
                <input type="hidden" name="giftCardId" value={card.id} />
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      Card value (USD)
                    </label>
                    <input
                      className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                      placeholder="$250"
                      name="cardValue"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      Card code
                    </label>
                    <input
                      className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                      placeholder="XXXX-XXXX-XXXX"
                      name="cardCode"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Upload card image
                  </label>
                  <label className="group mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200/90 bg-slate-50/60 px-4 py-6 transition-all hover:border-sky-400 hover:bg-sky-50/50 hover:shadow-md hover:shadow-sky-100/50">
                    <svg className="h-8 w-8 text-slate-300 transition group-hover:text-sky-500 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <span className="text-sm font-medium text-slate-400 transition group-hover:text-sky-600">
                      Click to upload or drag image here
                    </span>
                    <span className="text-xs text-slate-300 transition group-hover:text-sky-400">
                      PNG, JPG, WEBP up to 5MB
                    </span>
                    <input
                      type="file"
                      name="cardImage"
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 text-sm text-slate-600">
                  Estimated payout (for $100):{" "}
                  <span className="font-semibold text-slate-900">{estimate}</span>
                  <span className="ml-2 text-xs text-slate-400">
                    at {formatRate(card.rate)}
                  </span>
                </div>
                <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      Payout method
                    </label>
                    <select
                      name="payoutMethod"
                      defaultValue={hasSavedPaymentDetails ? "SAVED" : "MTN_MOMO"}
                      className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      {hasSavedPaymentDetails ? (
                        <option value="SAVED">Use saved payout details</option>
                      ) : null}
                      <option value="MTN_MOMO">MTN MoMo</option>
                      <option value="BANK_TRANSFER">Bank transfer</option>
                      <option value="CRYPTO">Crypto wallet</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      Alternative payout details
                    </label>
                    <input
                      name="payoutDetails"
                      className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                      placeholder="Crypto address / MoMo"
                    />
                  </div>
                </div>
                {hasSavedPaymentDetails ? (
                  <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/80 px-4 py-3 text-xs text-emerald-700">
                    Saved payout details: <span className="font-semibold">{savedPaymentDetails}</span>.{" "}
                    <Link href="/profile" className="font-semibold text-emerald-900">
                      Edit in profile
                    </Link>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 text-xs text-slate-500">
                    No saved payout details yet. <Link href="/profile" className="font-semibold text-slate-900">Add details in profile</Link>.
                  </div>
                )}
                <button className="w-full rounded-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:shadow-slate-900/30 active:translate-y-0 active:shadow-sm">
                  Submit for review
                </button>
              </form>
            </div>

            <div className="relative overflow-hidden rounded-[32px] border border-slate-800/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-xl">
              <div className="pointer-events-none absolute -top-20 right-0 h-40 w-40 rounded-full bg-sky-500/20 blur-2xl" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-full bg-emerald-400/20 blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)] animate-pulse" />
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                    Submission status
                  </p>
                </div>
                <h2 className="mt-3 text-2xl font-semibold">Pending review</h2>
                <p className="mt-3 text-sm text-slate-200">
                  Submissions are reviewed by our admin team within 20 minutes. You&apos;ll get a confirmation once approved.
                </p>
                <div className="mt-6 space-y-4 text-sm text-slate-200">
                  {[
                    "Card value verified",
                    "Payout calculated",
                    "Awaiting approval",
                  ].map((step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                        0{index + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                    Security layer
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    OCR + checksum validation, AML screening, and manual review for high-risk submissions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
