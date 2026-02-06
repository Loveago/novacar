export type SeedGiftCard = {
  slug: string;
  name: string;
  imagePath: string;
  rate: number;
  description: string;
  region?: string;
  category?: string;
  payoutSpeed?: string;
  trend?: string;
  weeklyVolume?: string;
};

export const seedGiftCards: SeedGiftCard[] = [
  {
    slug: "amazon",
    name: "Amazon",
    imagePath: "/uploads/giftcards/amazon.png",
    rate: 11.2,
    description:
      "Trade physical or e-code Amazon cards with live market pricing and instant settlement.",
    region: "United States",
    category: "Retail",
    payoutSpeed: "Instant payout",
    trend: "+4.2%",
    weeklyVolume: "$92k weekly",
  },
  {
    slug: "apple",
    name: "Apple",
    imagePath: "/uploads/giftcards/apple.png",
    rate: 10.8,
    description:
      "Submit iTunes and Apple Store cards with instant validation and fraud scoring.",
    region: "Global",
    category: "Tech",
    payoutSpeed: "15 min payout",
    trend: "+2.4%",
    weeklyVolume: "$66k weekly",
  },
  {
    slug: "steam",
    name: "Steam",
    imagePath: "/uploads/giftcards/steam.png",
    rate: 9.95,
    description:
      "High-demand gaming cards with boosted rates during weekends.",
    region: "Europe",
    category: "Gaming",
    payoutSpeed: "Instant payout",
    trend: "+3.1%",
    weeklyVolume: "$44k weekly",
  },
  {
    slug: "google-play",
    name: "Google Play",
    imagePath: "/uploads/giftcards/google-play.png",
    rate: 10.35,
    description:
      "Mobile credits with smart verification for quick approvals.",
    region: "Global",
    category: "Mobile",
    payoutSpeed: "30 min payout",
    trend: "+1.7%",
    weeklyVolume: "$50k weekly",
  },
  {
    slug: "xbox",
    name: "Xbox",
    imagePath: "/uploads/giftcards/xbox.png",
    rate: 10.1,
    description:
      "Popular gaming credit with rapid settlement and high liquidity.",
    region: "Global",
    category: "Gaming",
    payoutSpeed: "25 min payout",
    trend: "+1.9%",
    weeklyVolume: "$33k weekly",
  },
  {
    slug: "playstation",
    name: "PlayStation",
    imagePath: "/uploads/giftcards/playstation.png",
    rate: 10.05,
    description:
      "Console storefront cards with strong weekend buyback demand.",
    region: "Global",
    category: "Gaming",
    payoutSpeed: "30 min payout",
    trend: "+2.0%",
    weeklyVolume: "$28k weekly",
  },
  {
    slug: "itunes",
    name: "iTunes",
    imagePath: "/uploads/giftcards/itunes.png",
    rate: 10.5,
    description:
      "Apple ecosystem balance with premium buyers and instant rate locks.",
    region: "Global",
    category: "Tech",
    payoutSpeed: "20 min payout",
    trend: "+1.6%",
    weeklyVolume: "$38k weekly",
  },
  {
    slug: "vanilla",
    name: "Vanilla Visa",
    imagePath: "/uploads/giftcards/vanilla.svg",
    rate: 10.25,
    description:
      "Reloadable Vanilla Visa cards with strong liquidity and instant verification.",
    region: "North America",
    category: "Prepaid",
    payoutSpeed: "20 min payout",
    trend: "+1.2%",
    weeklyVolume: "$24k weekly",
  },
  {
    slug: "neosurf",
    name: "Neosurf",
    imagePath: "/uploads/giftcards/neosurf.svg",
    rate: 10.6,
    description:
      "Popular cash-based voucher for EU buyers with steady weekly demand.",
    region: "Europe",
    category: "Payments",
    payoutSpeed: "Instant payout",
    trend: "+2.8%",
    weeklyVolume: "$19k weekly",
  },
  {
    slug: "razer-gold",
    name: "Razer Gold",
    imagePath: "/uploads/giftcards/razer-gold.svg",
    rate: 9.85,
    description:
      "Gaming wallet credit with bonus rates during esports events.",
    region: "Global",
    category: "Gaming",
    payoutSpeed: "15 min payout",
    trend: "+3.5%",
    weeklyVolume: "$21k weekly",
  },
];
