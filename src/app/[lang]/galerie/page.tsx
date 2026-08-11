import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GalleryGrid from "@/components/GalleryGrid";
import PageHeader from "@/components/PageHeader";
import { getDict, isLocale, pick } from "@/lib/i18n";
import { images } from "@/lib/images";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDict(lang);
  return {
    title: `${dict.nav.gallery} — AD Niamey 2000`,
    description: dict.meta.description,
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDict(lang);

  const galleryImages = await prisma.galleryImage.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <PageHeader
        title={dict.gallery.title}
        subtitle={dict.gallery.subtitle}
        image={images.pageHeaders.gallery}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {galleryImages.length === 0 ? (
          <p className="text-center text-muted">{dict.gallery.empty}</p>
        ) : (
          <GalleryGrid
            images={galleryImages.map((image) => ({
              id: image.id,
              url: image.url,
              caption: pick(lang, image.captionFr, image.captionEn),
            }))}
          />
        )}
      </section>

    </div>
  );
}
