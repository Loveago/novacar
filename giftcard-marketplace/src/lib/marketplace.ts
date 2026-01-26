import type { MarketplaceCardData } from "@/types/marketplace";
import { formatRate } from "@/lib/format";

type GiftCardRecord = {
  id: string;
  slug: string;
  name: string;
  imagePath: string;
  rate: number;
  payoutSpeed: string | null;
  trend: string | null;
  weeklyVolume: string | null;
  region: string | null;
  category: string | null;
  description: string;
  isActive: boolean;
};

export function toMarketplaceCard(card: GiftCardRecord): MarketplaceCardData {
  return {
    id: card.id,
    slug: card.slug,
    name: card.name,
    imagePath: card.imagePath,
    rate: formatRate(card.rate),
    payout: card.payoutSpeed ?? "Instant payout",
    isActive: card.isActive,
    trend: card.trend,
    weeklyVolume: card.weeklyVolume,
    region: card.region,
    category: card.category,
    description: card.description,
  };
}
