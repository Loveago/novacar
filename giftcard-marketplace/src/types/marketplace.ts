export type MarketplaceCardData = {
  id: string;
  slug: string;
  name: string;
  imagePath: string;
  rate: string;
  payout: string;
  isActive: boolean;
  trend?: string | null;
  weeklyVolume?: string | null;
  region?: string | null;
  category?: string | null;
  description: string;
};

export type TransactionRow = {
  id: string;
  card: string;
  value: string;
  payout: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "PAID";
  time: string;
};

export type SubmissionRow = {
  id: string;
  seller: string;
  card: string;
  value: string;
  payout: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "PAID";
  time: string;
};

export type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  volume: string;
};
