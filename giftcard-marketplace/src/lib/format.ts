export function formatRate(rate: number) {
  if (!Number.isFinite(rate)) {
    return "$1 = GHS 0.00";
  }
  return `$1 = GHS ${rate.toFixed(2)}`;
}

export function formatMoney(value: number) {
  if (!Number.isFinite(value)) {
    return "GHS 0";
  }
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}
