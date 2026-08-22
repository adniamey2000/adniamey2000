import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import SermonBrowser from "@/components/SermonBrowser";
import { getDict, isLocale, pick, youtubeThumb } from "@/lib/i18n";
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
    title: `${dict.nav.sermons} — AD Niamey 2000`,
    description: dict.meta.sermonsDescription,
  };
}

export default async function SermonsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDict(lang);

  const sermons = await prisma.sermon.findMany({ orderBy: { date: "desc" } });

  return (
    <div>
      <PageHeader
        title={dict.sermons.title}
        subtitle={dict.sermons.subtitle}
        image={images.pageHeaders.sermons}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {sermons.length === 0 ? (
          <p className="text-center text-muted">—</p>
        ) : (
          <SermonBrowser
            lang={lang}
            sermons={sermons.map((sermon) => ({
              id: sermon.id,
              title: pick(lang, sermon.titleFr, sermon.titleEn),
              titleFr: sermon.titleFr,
              summary: pick(lang, sermon.summaryFr, sermon.summaryEn),
              dateISO: sermon.date.toISOString(),
              speaker: sermon.speaker,
              thumb: youtubeThumb(sermon.videoUrl),
            }))}
            labels={{
              searchPlaceholder: dict.sermons.searchPlaceholder,
              sortNewest: dict.sermons.sortNewest,
              sortOldest: dict.sermons.sortOldest,
              noResults: dict.sermons.noResults,
              summary: dict.sermons.summary,
              watch: dict.sermons.watch,
            }}
          />
        )}
      </section>
    </div>
  );
}
