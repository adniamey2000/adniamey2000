import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import ShareButtons from "@/components/ShareButtons";
import { getDict, isLocale, pick } from "@/lib/i18n";
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
  const announcement = await prisma.announcement.findUnique({ where: { id } });
  if (!announcement) return {};
  const title = pick(lang, announcement.titleFr, announcement.titleEn);
  const description = pick(lang, announcement.contentFr, announcement.contentEn).slice(0, 200);
  const url = toDetailPath("annonces", announcement.id, announcement.titleFr, lang);
  return {
    title: `${title} — AD Niamey 2000`,
    description,
    openGraph: {
      title,
      description,
      url: `https://adniamey2000.vercel.app${url}`,
      type: "article",
      siteName: "AD Niamey 2000",
      images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-default.jpg"],
    },
  };
}

export default async function AnnouncementDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const id = extractIdFromSlug(slug);
  const dict = getDict(lang);

  const announcement = await prisma.announcement.findUnique({ where: { id } });
  if (!announcement) notFound();

  const title = pick(lang, announcement.titleFr, announcement.titleEn);
  const content = pick(lang, announcement.contentFr, announcement.contentEn);
  const sharePath = toDetailPath("annonces", announcement.id, announcement.titleFr, lang);
  const dateFormatter = new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "fr-FR", {
    dateStyle: "full",
  });

  return (
    <div>
      <PageHeader
        title={dict.announcements.title}
        subtitle={dict.announcements.subtitle}
        image={images.pageHeaders.announcements}
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Link
          href={`/${lang}/annonces`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-dark transition hover:text-ink"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {dict.announcements.title}
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-primary-soft bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-primary-soft bg-primary-soft/50 p-6 sm:p-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-dark text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 11l18-5v12L3 13v-2zM11.6 16.8a3 3 0 11-5.8-1.6" />
              </svg>
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-ink sm:text-2xl">{title}</h1>
              <time
                dateTime={announcement.date.toISOString()}
                className="mt-1 block text-xs font-semibold uppercase tracking-wide text-primary-dark"
              >
                {dateFormatter.format(announcement.date)}
              </time>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <p className="whitespace-pre-line text-lg leading-relaxed text-ink">{content}</p>
          </div>
          <div className="border-t border-slate-100 px-6 py-5 sm:px-8">
            <ShareButtons url={sharePath} title={title} />
          </div>
        </div>
      </section>
    </div>
  );
}
