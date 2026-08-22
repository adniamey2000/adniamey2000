export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function toDetailPath(
  type: "evenements" | "sermons" | "annonces",
  id: number,
  titleFr: string,
  lang: string
): string {
  const slug = toSlug(titleFr);
  return `/${lang}/${type}/${id}-${slug}`;
}

export function extractIdFromSlug(slug: string): number {
  const num = slug.split("-")[0];
  return Number(num) || 0;
}
