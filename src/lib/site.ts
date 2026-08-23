import { prisma } from "@/lib/prisma";
import { pick, type Locale } from "@/lib/i18n";

export async function getSettings() {
  const rows = await prisma.siteSetting.findMany();
  const map = new Map(rows.map((r) => [r.key, r]));
  return {
    address: map.get("address") ?? null,
    phone: map.get("phone") ?? null,
    email: map.get("email") ?? null,
  };
}

export async function getSettingByKey(key: string) {
  return prisma.siteSetting.findUnique({ where: { key } });
}

export function settingValue(
  setting: { valueFr: string; valueEn: string } | null,
  fallback: string,
  locale: Locale
) {
  return setting ? pick(locale, setting.valueFr, setting.valueEn) : fallback;
}

export async function getSchedule(locale: Locale) {
  const items = await prisma.scheduleItem.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return items.map((item) => ({
    day: pick(locale, item.dayFr, item.dayEn),
    time: item.time,
    name: pick(locale, item.nameFr, item.nameEn),
  }));
}
