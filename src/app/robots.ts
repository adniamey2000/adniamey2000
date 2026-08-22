import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/espace-prive-ad-niamey-2000/"],
      },
    ],
    sitemap: "https://adniamey2000.vercel.app/sitemap.xml",
  };
}
