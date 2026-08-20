import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DonationSection from "@/components/DonationSection";
import VerseOfTheDay from "@/components/VerseOfTheDay";
import {
  churchName,
  getDict,
  isLocale,
  pick,
  youtubeThumb,
} from "@/lib/i18n";
import { images, isValidImageUrl } from "@/lib/images";
import { prisma } from "@/lib/prisma";
import { getSchedule } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDict(lang);
  return {
    title: lang === "en" ? "Home" : "Accueil",
    description: dict.meta.description,
    openGraph: {
      title: "AD Niamey 2000 — Assemblée de Dieu au Niger",
      description: dict.meta.description,
      url: "https://adniamey2000.vercel.app",
      siteName: "AD Niamey 2000",
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDict(lang);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [sermons, events, schedule, announcements] = await Promise.all([
    prisma.sermon.findMany({ orderBy: { date: "desc" }, take: 3 }),
    prisma.churchEvent.findMany({
      where: { date: { gte: today } },
      orderBy: { date: "asc" },
      take: 3,
    }),
    getSchedule(lang),
    prisma.announcement.findMany({
      where: { isPublished: true },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
      take: 8,
    }),
  ]);

  const homeAnnouncements = announcements.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Church",
            name: "AD Niamey 2000 — Assemblée de Dieu au Niger",
            alternateName: "Assemblies of God Niamey 2000",
            url: "https://adniamey2000.vercel.app",
            description:
              "Site officiel de l'Assemblée de Dieu Niamey 2000 — Annoncer la bonne nouvelle de Christ à Niamey, au Niger et au-delà.",
            email: "adniamey2000@gmail.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Niamey",
              addressCountry: "NE",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 13.5127,
              longitude: 2.1128,
            },
            sameAs: [],
            foundingDate: "2000",
            areaServed: {
              "@type": "City",
              name: "Niamey",
            },
          }),
        }}
      />
    <div>
      {/* Hero */}
      <section className="relative isolate bg-slate-950">
        <Image
          src={images.hero}
          alt={churchName}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/45 to-slate-900/15" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-28 text-center sm:px-6 md:py-40">
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
              <path d="M12 2l2.4 6.6L21 9.2l-5 4.4 1.5 6.4-5.5-3.7L6.5 20 8 13.6 3 9.2l6.6-.6L12 2z" />
            </svg>
            {dict.home.hero.badge}
          </span>
          <h1 className="max-w-4xl font-serif text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
            {dict.home.hero.title}{" "}
            <span className="text-accent-bright">{dict.home.hero.highlight}</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/90 drop-shadow sm:text-lg">
            {dict.home.hero.subtitle}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${lang}/contact`}
              className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark"
            >
              {dict.home.hero.cta1}
            </Link>
            <Link
              href={`/${lang}/sermons`}
              className="rounded-full border-2 border-white/50 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              {dict.home.hero.cta2}
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome */}
      <section className="relative">
        {schedule[0] && (
          <div className="relative z-10 mx-auto -mt-14 max-w-6xl px-4 sm:px-6">
            <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-2xl sm:grid-cols-[auto_1fr] sm:items-center sm:gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {dict.home.schedule.title}
                  </p>
                  <p className="truncate font-serif text-lg font-bold text-ink">
                    {schedule[0].day} · {schedule[0].time}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                <p className="text-sm leading-snug text-muted">{schedule[0].name}</p>
                <Link
                  href={`/${lang}/evenements`}
                  className="shrink-0 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  {dict.home.schedule.viewEvents}
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-3xl bg-primary-soft" aria-hidden="true" />
            <Image
              src={images.welcome}
              alt={churchName}
              width={640}
              height={480}
              className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-dark">
              {churchName}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">
              {dict.home.welcome.title}
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              {dict.home.welcome.text1}
            </p>
            <p className="mt-3 leading-relaxed text-muted">
              {dict.home.welcome.text2}
            </p>
            <Link
              href={`/${lang}/a-propos`}
              className="mt-6 inline-block rounded-full bg-primary-dark px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {dict.actions.learnMore}
            </Link>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {dict.home.welcome.features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="font-serif text-lg font-bold text-primary-dark">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verse of the day */}
      <VerseOfTheDay
        title={dict.home.verse.title}
        subtitle={dict.home.verse.subtitle}
        lang={lang}
      />

      {/* Announcements */}
      {homeAnnouncements.length > 0 && (
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl font-bold sm:text-4xl">
                  {dict.home.announcements.title}
                </h2>
                <p className="mt-2 text-muted">
                  {dict.home.announcements.subtitle}
                </p>
              </div>
              <Link
                href={`/${lang}/annonces`}
                className="text-sm font-semibold text-primary-dark transition hover:text-ink"
              >
                {dict.home.announcements.viewAll} →
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {homeAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="group rounded-2xl border border-primary-soft bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-dark">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 11l18-5v12L3 13v-2z" />
                      </svg>
                      {dict.home.announcements.tickerLabel}
                    </span>
                    <time
                      dateTime={announcement.date.toISOString()}
                      className="text-[11px] font-semibold uppercase tracking-wide text-muted"
                    >
                      {new Intl.DateTimeFormat(
                        lang === "en" ? "en-GB" : "fr-FR",
                        { dateStyle: "medium" }
                      ).format(announcement.date)}
                    </time>
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-bold transition group-hover:text-primary-dark">
                    {pick(lang, announcement.titleFr, announcement.titleEn)}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                    {pick(lang, announcement.contentFr, announcement.contentEn)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Worship */}
      <section className="relative isolate overflow-hidden">
        <Image
          src={images.worship}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="mx-auto text-primary-soft">
            <path d="M9.6 4C6.3 4 3.6 6.7 3.6 10c0 3.7 2.9 6.2 5.4 7.5.3-1 .6-1.9 1-2.7-1.7-.9-3.4-2.5-3.4-4.8 0-2.5 2-4.4 4.4-4.4 1.2 0 2.3.5 3.1 1.3l2.1 2.1-2.3 2.3c.3 1.6 1 3.3 2 4.4l3.4-3.4c1.8-1.8 2.7-4.2 2.7-6.6C20 6.6 15.9 4 9.6 4z" />
          </svg>
          <blockquote className="mt-6 font-serif text-2xl font-semibold leading-snug text-white sm:text-3xl">
            {dict.home.welcome.text2}
          </blockquote>
        </div>
      </section>

      {/* Schedule */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center font-serif text-3xl font-bold sm:text-4xl">
            {dict.home.schedule.title}
          </h2>
          <p className="mt-3 text-center text-muted">
            {dict.home.schedule.subtitle}
          </p>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -right-4 -top-4 h-full w-full rounded-3xl bg-slate-200" aria-hidden="true" />
              <Image
                src={images.schedule}
                alt={dict.home.schedule.title}
                width={640}
                height={480}
                className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
              />
            </div>
            <div className="order-1 space-y-4 lg:order-2">
              {schedule.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center gap-4 rounded-2xl border border-primary-soft bg-white p-5 shadow-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full bg-primary-dark text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary-dark">
                      {service.day} · {service.time}
                    </p>
                    <p className="text-sm text-muted">{service.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest sermons */}
      {sermons.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl font-bold sm:text-4xl">
                {dict.home.sermons.title}
              </h2>
              <p className="mt-2 text-muted">{dict.home.sermons.subtitle}</p>
            </div>
            <Link
              href={`/${lang}/sermons`}
              className="text-sm font-semibold text-primary-dark transition hover:text-ink"
            >
              {dict.actions.allSermons} →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {sermons.map((sermon) => (
              <div
                key={sermon.id}
                className="overflow-hidden rounded-2xl border border-primary-soft bg-white shadow-sm transition hover:shadow-md"
              >
                {youtubeThumb(sermon.videoUrl) && (
                  <Link
                    href={`/${lang}/sermons/${sermon.id}`}
                    className="group relative block aspect-video w-full bg-slate-950"
                  >
                    <Image
                      src={youtubeThumb(sermon.videoUrl)!}
                      alt={pick(lang, sermon.titleFr, sermon.titleEn)}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition group-hover:scale-110">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                  </Link>
                )}
                <div className="p-5">
                  <Link
                    href={`/${lang}/sermons/${sermon.id}`}
                    className="font-serif text-lg font-bold transition hover:text-primary-dark"
                  >
                    {pick(lang, sermon.titleFr, sermon.titleEn)}
                  </Link>
                  <p className="mt-1 text-xs text-muted">
                    {sermon.speaker} ·{" "}
                    {new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "fr-FR").format(sermon.date)}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                    {pick(lang, sermon.summaryFr, sermon.summaryEn)}
                  </p>
                  <Link
                    href={`/${lang}/sermons/${sermon.id}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-dark transition hover:text-ink"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    {dict.sermons.watch}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Events */}
      {events.length > 0 && (
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl font-bold sm:text-4xl">
                  {dict.home.events.title}
                </h2>
                <p className="mt-2 text-muted">{dict.home.events.subtitle}</p>
              </div>
              <Link
                href={`/${lang}/evenements`}
                className="text-sm font-semibold text-primary-dark transition hover:text-ink"
              >
                {dict.actions.allEvents} →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {events.map((event) => (
                <Link
                  key={event.id}
                  href={`/${lang}/evenements/${event.id}`}
                  className="group overflow-hidden rounded-2xl border border-primary-soft bg-white shadow-sm transition hover:shadow-md"
                >
                  {isValidImageUrl(event.imageUrl) && (
                    <Image
                      src={event.imageUrl}
                      alt={pick(lang, event.titleFr, event.titleEn)}
                      width={600}
                      height={400}
                      className="aspect-[16/9] w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  )}
                  <div className="p-6">
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary-dark">
                      {new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "fr-FR", {
                        dateStyle: "medium",
                      }).format(event.date)}
                    </p>
                    <h3 className="mt-2 font-serif text-lg font-bold transition group-hover:text-primary-dark">
                      {pick(lang, event.titleFr, event.titleEn)}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {event.time} · {event.place}
                    </p>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                      {pick(lang, event.summaryFr, event.summaryEn)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-dark">
                      {dict.events.details}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Donation */}
      <DonationSection dict={dict} />
    </div>
  );
}
