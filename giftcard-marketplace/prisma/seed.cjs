/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const giftCards = [
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
];

async function main() {
  const adminPassword = await bcrypt.hash("Admin123!", 10);
  const sellerPassword = await bcrypt.hash("Seller123!", 10);

  await prisma.user.upsert({
    where: { email: "admin@novacard.com" },
    update: { role: "ADMIN", name: "Nova Admin" },
    create: {
      name: "Nova Admin",
      email: "admin@novacard.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "seller@novacard.com" },
    update: {},
    create: {
      name: "Sample Seller",
      email: "seller@novacard.com",
      password: sellerPassword,
      role: "USER",
      paymentDetails: "Bank: Zenith · 0123456789",
    },
  });

  for (const card of giftCards) {
    await prisma.giftCard.upsert({
      where: { slug: card.slug },
      update: card,
      create: card,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
