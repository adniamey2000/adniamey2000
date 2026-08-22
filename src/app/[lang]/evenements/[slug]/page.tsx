import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import ShareButtons from "@/components/ShareButtons";
import { getDict, isLocale, pick } from "@/lib/i18n";
import { images, isValidImageUrl } from "@/lib/images";
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
  const event = await prisma.churchEvent.findUnique({ where: { id } });
  if (!event) return {};
  const title = pick(lang, event.titleFr, event.titleEn);
  const description = pick(lang, event.summaryFr, event.summaryEn).slice(0, 200);
  const url = toDetailPath("evenements", event.id, event.titleFr, lang);
  const image = event.imageUrl || "/og-default.jpg";
  return {
    title: `${title} — AD Niamey 2000`,
    description,
    openGraph: {
      title,
      description,
      url: `https://adniamey2000.vercel.app${url}`,
      type: "article",
      siteName: "AD Niamey 2000",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const id = extractIdFromSlug(slug);
  const dict = getDict(lang);

  const event = await prisma.churchEvent.findUnique({ where: { id } });
  if (!event) notFound();

  const title = pick(lang, event.titleFr, event.titleEn);
  const sharePath = toDetailPath("evenements", event.id, event.titleFr, lang);
  const date = new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "fr-FR", {
    dateStyle: "full",
  }).format(event.date);

  return (
    <div>
      <PageHeader title={title} image={images.pageHeaders.events} />

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
              alt={title}
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
          <div className="border-t border-slate-100 px-6 py-5 sm:px-8">
            <ShareButtons url={sharePath} title={title} />
          </div>
        </div>
      </section>
    </div>
  );
}
