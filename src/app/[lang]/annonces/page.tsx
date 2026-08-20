import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    title: `${dict.nav.announcements} — AD Niamey 2000`,
    description: dict.meta.announcementsDescription,
  };
}

export default async function AnnouncementsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDict(lang);

  const announcements = await prisma.announcement.findMany({
    where: { isPublished: true },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });

  const dateFormatter = new Intl.DateTimeFormat(
    lang === "en" ? "en-GB" : "fr-FR",
    { dateStyle: "full" }
  );

  return (
    <div>
      <PageHeader
        title={dict.announcements.title}
        subtitle={dict.announcements.subtitle}
        image={images.pageHeaders.announcements}
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        {announcements.length === 0 ? (
          <div className="fade-up rounded-3xl border border-dashed border-primary-soft bg-white p-16 text-center text-sm text-muted">
            {dict.announcements.empty}
          </div>
        ) : (
          <div className="space-y-6">
            {announcements.map((announcement, i) => (
              <article
                key={announcement.id}
                className={`fade-up${
                  i === 0 ? "" : i === 1 ? "-delay-1" : i === 2 ? "-delay-2" : ""
                } overflow-hidden rounded-3xl border border-primary-soft bg-white shadow-sm transition hover:shadow-md`}
              >
                <div className="flex flex-col gap-4 border-b border-primary-soft bg-primary-soft/50 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-dark text-white">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 11l18-5v12L3 13v-2zM11.6 16.8a3 3 0 11-5.8-1.6" />
                      </svg>
                    </div>
                    <h2 className="font-serif text-xl font-bold text-ink">
                      {pick(lang, announcement.titleFr, announcement.titleEn)}
                    </h2>
                  </div>
                  <time
                    dateTime={announcement.date.toISOString()}
                    className="text-xs font-semibold uppercase tracking-wide text-primary-dark"
                  >
                    {dateFormatter.format(announcement.date)}
                  </time>
                </div>
                <div className="p-6">
                  <p className="whitespace-pre-line leading-relaxed text-muted">
                    {pick(lang, announcement.contentFr, announcement.contentEn)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="fade-up-delay-2 mt-14 text-center">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-2 rounded-full border border-primary-soft bg-white px-6 py-3 text-sm font-semibold text-primary-dark transition hover:bg-primary-soft"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {dict.nav.home}
          </Link>
        </div>
      </section>
    </div>
  );
}
