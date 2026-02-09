import Image from "next/image";
import SiteShell from "@/components/SiteShell";
import {
  createGiftCard,
  deleteGiftCard,
  toggleGiftCardStatus,
  updateGiftCard,
} from "@/app/actions/gift-cards";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guards";

export default async function AdminGiftCardsPage() {
  await requireAdmin();
  const giftCards = await prisma.giftCard.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-12">
        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Manage gift cards
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">
                Gift card listings
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Control rates, images, and active status.
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600">
              {giftCards.length} cards
            </span>
          </div>
          <form
            className="mt-8 grid gap-4 rounded-3xl border border-slate-200/70 bg-slate-50/80 p-6"
            action={createGiftCard}
          >
            <h2 className="text-lg font-semibold text-slate-900">
              Add new gift card
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="name"
                placeholder="Gift card name"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                required
              />
              <input
                name="slug"
                placeholder="slug (optional)"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <input
                name="rate"
                placeholder="Rate (e.g. 11.2)"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                required
              />
              <input
                name="payoutSpeed"
                placeholder="Payout speed"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
              />
              <input
                name="weeklyVolume"
                placeholder="Weekly volume"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="region"
                placeholder="Region"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
              />
              <input
                name="category"
                placeholder="Category"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_auto]">
              <input
                name="trend"
                placeholder="Trend (e.g. +2.1%)"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
              />
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm">
                <input
                  name="imageUrl"
                  placeholder="Image URL (optional)"
                  className="w-full border-none bg-transparent p-0 text-sm focus:outline-none"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="file"
                name="imageFile"
                accept="image/png,image/jpeg,image/webp"
                className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-3 text-sm"
              />
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" name="isActive" defaultChecked />
                Active listing
              </label>
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="min-h-[120px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
              required
            />
            <button className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20">
              Create gift card
            </button>
          </form>

          <div className="mt-10 space-y-6">
            {giftCards.map((card) => (
              <div
                key={card.id}
                className="rounded-3xl border border-slate-200/70 bg-white/90 p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
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
                      <p className="font-semibold text-slate-900">{card.name}</p>
                      <p className="text-xs text-slate-500">{card.slug}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <form action={toggleGiftCardStatus}>
                      <input type="hidden" name="id" value={card.id} />
                      <button className="rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-600">
                        {card.isActive ? "Disable" : "Activate"}
                      </button>
                    </form>
                    <form action={deleteGiftCard}>
                      <input type="hidden" name="id" value={card.id} />
                      <button className="rounded-full bg-rose-600 px-4 py-2 text-xs font-semibold text-white">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>

                <form
                  className="mt-5 grid gap-4 md:grid-cols-2"
                  action={updateGiftCard}
                >
                  <input type="hidden" name="id" value={card.id} />
                  <input
                    name="name"
                    defaultValue={card.name}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  />
                  <input
                    name="slug"
                    defaultValue={card.slug}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  />
                  <input
                    name="rate"
                    defaultValue={card.rate}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  />
                  <input
                    name="payoutSpeed"
                    defaultValue={card.payoutSpeed ?? ""}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  />
                  <input
                    name="weeklyVolume"
                    defaultValue={card.weeklyVolume ?? ""}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  />
                  <input
                    name="trend"
                    defaultValue={card.trend ?? ""}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  />
                  <input
                    name="region"
                    defaultValue={card.region ?? ""}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  />
                  <input
                    name="category"
                    defaultValue={card.category ?? ""}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  />
                  <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:col-span-2 md:grid-cols-[1fr_auto]">
                    <input
                      name="imageUrl"
                      defaultValue={card.imagePath}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                    />
                    <div className="flex items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-3">
                      <Image
                        src={card.imagePath}
                        alt={`${card.name} preview`}
                        width={64}
                        height={64}
                        className="h-12 w-12 rounded-xl object-contain"
                      />
                    </div>
                  </div>
                  <input
                    type="file"
                    name="imageFile"
                    accept="image/png,image/jpeg,image/webp"
                    className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-3 text-sm md:col-span-2"
                  />
                  <textarea
                    name="description"
                    defaultValue={card.description}
                    className="min-h-[120px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm md:col-span-2"
                  />
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" name="isActive" defaultChecked={card.isActive} />
                    Active listing
                  </label>
                  <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 md:col-span-2">
                    Save changes
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
