import type { MetadataRoute } from "next";

const BASE = "https://adniamey2000.vercel.app";
const langs = ["fr", "en"] as const;

const staticPages = ["", "/annonces", "/a-propos", "/sermons", "/evenements", "/galerie", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const lang of langs) {
      entries.push({
        url: `${BASE}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            langs.map((l) => [l, `${BASE}/${l}${page}`])
          ),
        },
      });
    }
  }

  return entries;
}
