export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function toNumber(value: FormDataEntryValue | null) {
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

export function toStringValue(value: FormDataEntryValue | null) {
  if (typeof value === "string") {
    return value.trim();
  }
  return "";
}
