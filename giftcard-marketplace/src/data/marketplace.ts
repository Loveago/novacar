export const categoryFilters = [
  "Retail",
  "Gaming",
  "Tech",
  "Lifestyle",
  "Prepaid",
  "Travel",
];

export const dashboardStats = [
  {
    label: "Active buy rate",
    value: "GHS 11.20",
    delta: "+4.2%",
    note: "Amazon leading",
  },
  {
    label: "Avg payout time",
    value: "12 min",
    delta: "-18%",
    note: "Faster than last week",
  },
  {
    label: "Weekly liquidity",
    value: "$312k",
    delta: "+9.8%",
    note: "Across 18 partners",
  },
];

export const faqItems = [
  {
    question: "How fast do I get paid after submitting a card?",
    answer:
      "Most cards clear within 10-20 minutes once verified. High-risk cards may require manual review.",
  },
  {
    question: "Can I upload images instead of entering card codes?",
    answer:
      "Yes. You can upload front/back images and our team will verify the balance for you.",
  },
  {
    question: "How are rates calculated?",
    answer:
      "Rates are pulled from live buyer demand, risk signals, and liquidity pools on the platform.",
  },
  {
    question: "What payout methods are supported?",
    answer:
      "Bank transfer, mobile money, and USDT are available depending on your region.",
  },
];

export const transactions = [
  {
    id: "txn-1",
    card: "Amazon · $500",
    time: "2 minutes ago",
    value: "Value: $500",
    payout: "Payout: GHS 5,600",
    status: "APPROVED",
  },
  {
    id: "txn-2",
    card: "Steam · €150",
    time: "8 minutes ago",
    value: "Value: €150",
    payout: "Payout: ₦105,000",
    status: "PENDING",
  },
  {
    id: "txn-3",
    card: "Apple · $200",
    time: "15 minutes ago",
    value: "Value: $200",
    payout: "Payout: USDT 180",
    status: "PAID",
  },
  {
    id: "txn-4",
    card: "Google Play · $100",
    time: "31 minutes ago",
    value: "Value: $100",
    payout: "Payout: GHS 1,100",
    status: "REJECTED",
  },
  {
    id: "txn-5",
    card: "Nike · $250",
    time: "1 hour ago",
    value: "Value: $250",
    payout: "Payout: ₦182,000",
    status: "APPROVED",
  },
];
