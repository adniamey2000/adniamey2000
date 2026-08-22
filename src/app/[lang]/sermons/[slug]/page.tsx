import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import ShareButtons from "@/components/ShareButtons";
import { getDict, isLocale, pick, youtubeEmbed, youtubeThumb } from "@/lib/i18n";
import { images } from "@/lib/images";
import { prisma } from "@/lib/prisma";
import { extractIdFromSlug, toDetailPath } from "@/lib/slug";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const id = extractIdFromSlug(slug);
  const sermon = await prisma.sermon.findUnique({ where: { id } });
  if (!sermon) return {};
  const title = pick(lang, sermon.titleFr, sermon.titleEn);
  const description = pick(lang, sermon.summaryFr, sermon.summaryEn).slice(0, 200);
  const url = toDetailPath("sermons", sermon.id, sermon.titleFr, lang);
  const thumb = youtubeThumb(sermon.videoUrl) || "/og-default.jpg";
  return {
    title: `${title} — AD Niamey 2000`,
    description,
    openGraph: {
      title,
      description,
      url: `https://adniamey2000.vercel.app${url}`,
      type: "article",
      siteName: "AD Niamey 2000",
      images: [{ url: thumb, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [thumb],
    },
  };
}

export default async function SermonDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const id = extractIdFromSlug(slug);
  const dict = getDict(lang);

  const sermon = await prisma.sermon.findUnique({ where: { id } });
  if (!sermon) notFound();

  const title = pick(lang, sermon.titleFr, sermon.titleEn);
  const summary = pick(lang, sermon.summaryFr, sermon.summaryEn);
  const sharePath = toDetailPath("sermons", sermon.id, sermon.titleFr, lang);

  return (
    <div>
      <PageHeader title={dict.sermons.title} image={images.pageHeaders.sermons} />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Link
          href={`/${lang}/sermons`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-dark transition hover:text-ink"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {dict.sermons.title}
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-primary-soft bg-white shadow-sm">
          <div className="aspect-video w-full bg-ink">
            <iframe
              className="h-full w-full"
              src={youtubeEmbed(sermon.videoUrl)}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="p-8 sm:p-10">
            <p className="text-sm font-semibold text-primary-dark">
              {sermon.speaker} ·{" "}
              {new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "fr-FR", {
                dateStyle: "long",
              }).format(sermon.date)}
            </p>
            <h1 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">{title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink">{summary}</p>
          </div>
          <div className="border-t border-slate-100 px-6 py-5 sm:px-8">
            <ShareButtons url={sharePath} title={title} />
          </div>
        </div>
      </section>
    </div>
  );
}
