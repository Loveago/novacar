import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { seedGiftCards } from "@/lib/seedData";

const globalForSeed = globalThis as typeof globalThis & {
  __novacardSeedPromise?: Promise<void>;
};

function isMissingTableError(error: unknown): error is { code?: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code?: string }).code === "string" &&
    (error as { code?: string }).code === "P2021"
  );
}

async function seedUsers() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@novacard.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "Admin123!";
  const sellerEmail = process.env.SEED_SELLER_EMAIL ?? "seller@novacard.com";
  const sellerPassword = process.env.SEED_SELLER_PASSWORD ?? "Seller123!";

  const [hashedAdmin, hashedSeller] = await Promise.all([
    bcrypt.hash(adminPassword, 10),
    bcrypt.hash(sellerPassword, 10),
  ]);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN", name: "Nova Admin" },
    create: {
      name: "Nova Admin",
      email: adminEmail,
      password: hashedAdmin,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: sellerEmail },
    update: {},
    create: {
      name: "Sample Seller",
      email: sellerEmail,
      password: hashedSeller,
      role: "USER",
      paymentDetails: "Bank: Zenith · 0123456789",
    },
  });
}

async function seedGiftCardCatalog() {
  await Promise.all(
    seedGiftCards.map((card) =>
      prisma.giftCard.upsert({
        where: { slug: card.slug },
        update: card,
        create: card,
      })
    )
  );
}

export async function ensureSeedData() {
  if (process.env.AUTO_SEED !== "true") {
    return;
  }

  if (!globalForSeed.__novacardSeedPromise) {
    globalForSeed.__novacardSeedPromise = (async () => {
      await seedUsers();
      await seedGiftCardCatalog();
    })().catch((error) => {
      if (isMissingTableError(error)) {
        return;
      }
      throw error;
    });
  }

  return globalForSeed.__novacardSeedPromise;
}
