import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { getDict, isLocale, pick } from "@/lib/i18n";
import { images, isValidImageUrl } from "@/lib/images";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLocale(lang)) return {};
  const event = await prisma.churchEvent.findUnique({
    where: { id: Number(id) },
  });
  return {
    title: `${event ? pick(lang, event.titleFr, event.titleEn) : "Événement"} — AD Niamey 2000`,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDict(lang);

  const event = await prisma.churchEvent.findUnique({
    where: { id: Number(id) },
  });
  if (!event) notFound();

  const date = new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "fr-FR", {
    dateStyle: "full",
  }).format(event.date);

  return (
    <div>
      <PageHeader title={pick(lang, event.titleFr, event.titleEn)} image={images.pageHeaders.events} />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Link
          href={`/${lang}/evenements`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-dark transition hover:text-ink"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {dict.events.title}
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-primary-soft bg-white shadow-sm">
          {isValidImageUrl(event.imageUrl) && (
            <img
              src={event.imageUrl}
              alt={pick(lang, event.titleFr, event.titleEn)}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover"
            />
          )}
          <div className="p-8 sm:p-10">
            <div className="flex items-center gap-6 rounded-2xl bg-slate-50 p-5">
            <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-primary-dark text-white">
              <span className="text-lg font-bold">
                {new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "fr-FR", { day: "2-digit" }).format(event.date)}
              </span>
              <span className="text-xs uppercase">
                {new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "fr-FR", { month: "short" }).format(event.date)}
              </span>
            </div>
            <div className="space-y-1 text-sm">
              <p className="font-serif text-lg font-bold">{date}</p>
              <p className="text-muted">
                {dict.events.time} : {event.time}
              </p>
              <p className="text-muted">
                {dict.events.place} : {event.place}
              </p>
            </div>
          </div>

          <p className="mt-8 text-lg leading-relaxed text-ink">
            {pick(lang, event.summaryFr, event.summaryEn)}
          </p>

          <div className="mt-10 rounded-2xl bg-primary-dark p-8 text-center text-white">
            <p className="font-serif text-xl font-bold">{dict.home.schedule.title}</p>
            <p className="mt-2 text-white/85">{dict.events.welcomeNote}</p>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}
