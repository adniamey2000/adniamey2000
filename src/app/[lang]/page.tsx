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
import { getSchedule, getSettingByKey, settingValue } from "@/lib/site";
import { toDetailPath } from "@/lib/slug";

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
      images: [
        {
          url: "/og-default.jpg",
          width: 1200,
          height: 630,
          alt: "AD Niamey 2000 — Assemblée de Dieu au Niger",
        },
      ],
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

  const [sermons, events, schedule, announcements, themeYear, themeText, verseYear] = await Promise.all([
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
    getSettingByKey("themeYear"),
    getSettingByKey("themeText"),
    getSettingByKey("verseYear"),
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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/50 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-32 text-center sm:px-6 md:py-44">
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur-md">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent-bright">
              <path d="M12 2l2.4 6.6L21 9.2l-5 4.4 1.5 6.4-5.5-3.7L6.5 20 8 13.6 3 9.2l6.6-.6L12 2z" />
            </svg>
            {dict.home.hero.badge}
          </span>
          <h1 className="max-w-4xl font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {dict.home.hero.title}{" "}
            <span className="bg-gradient-to-r from-accent-bright via-accent to-accent-bright bg-clip-text text-transparent">
              {dict.home.hero.highlight}
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
            {dict.home.hero.subtitle}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${lang}/contact`}
              className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30"
            >
              {dict.home.hero.cta1}
            </Link>
            <Link
              href={`/${lang}/sermons`}
              className="rounded-full border-2 border-white/40 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/60 hover:bg-white/20"
            >
              {dict.home.hero.cta2}
            </Link>
          </div>
        </div>
      </section>

      {/* Annual theme */}
      {(themeYear || themeText || verseYear) && (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent-soft via-white to-accent-soft/60 p-8 text-center shadow-lg sm:p-12">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/10" aria-hidden="true" />
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-primary/5" aria-hidden="true" />
              <span className="relative inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-widest text-accent shadow-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 6.6L21 9.2l-5 4.4 1.5 6.4-5.5-3.7L6.5 20 8 13.6 3 9.2l6.6-.6L12 2z" />
                </svg>
                {dict.home.annualTheme.title}
              </span>
              {themeYear && (
                <p className="relative mt-5 text-sm font-bold uppercase tracking-widest text-accent">
                  {dict.home.annualTheme.yearLabel} {settingValue(themeYear, "", lang as "fr" | "en")}
                </p>
              )}
              {themeText && (
                <h2 className="relative mt-4 font-serif text-2xl font-bold text-ink sm:text-3xl md:text-4xl">
                  &laquo; {settingValue(themeText, "", lang as "fr" | "en")} &raquo;
                </h2>
              )}
              {verseYear && (
                <p className="relative mt-5 text-sm italic leading-relaxed text-muted">
                  {dict.home.annualTheme.verseLabel} : {settingValue(verseYear, "", lang as "fr" | "en")}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Welcome */}
      <section className="relative">
        {schedule[0] && (
          <div className="relative z-10 mx-auto -mt-16 max-w-6xl px-4 sm:px-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:grid sm:grid-cols-[auto_1fr]">
              <div className="flex items-center gap-4 bg-primary-dark px-6 py-5 text-white sm:px-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                    {dict.home.schedule.title}
                  </p>
                  <p className="font-serif text-lg font-bold">
                    {schedule[0].day} · {schedule[0].time}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
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
          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {dict.home.welcome.features.map((feature, i) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:border-primary-soft hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary-dark transition group-hover:bg-primary group-hover:text-white">
                  {i === 0 && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                  )}
                  {i === 1 && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  )}
                  {i === 2 && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                  )}
                </div>
                <h3 className="font-serif text-lg font-bold text-ink">
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
                <Link
                  key={announcement.id}
                  href={toDetailPath("annonces", announcement.id, announcement.titleFr, lang)}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:border-primary-soft hover:shadow-md"
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
                  <h3 className="mt-4 font-serif text-lg font-bold leading-snug transition group-hover:text-primary-dark">
                    {pick(lang, announcement.titleFr, announcement.titleEn)}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                    {pick(lang, announcement.contentFr, announcement.contentEn)}
                  </p>
                </Link>
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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950/80" />
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="mx-auto text-accent/80">
            <path d="M9.6 4C6.3 4 3.6 6.7 3.6 10c0 3.7 2.9 6.2 5.4 7.5.3-1 .6-1.9 1-2.7-1.7-.9-3.4-2.5-3.4-4.8 0-2.5 2-4.4 4.4-4.4 1.2 0 2.3.5 3.1 1.3l2.1 2.1-2.3 2.3c.3 1.6 1 3.3 2 4.4l3.4-3.4c1.8-1.8 2.7-4.2 2.7-6.6C20 6.6 15.9 4 9.6 4z" />
          </svg>
          <blockquote className="relative mt-8 font-serif text-2xl font-semibold leading-snug text-white sm:text-3xl">
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
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:border-primary-soft hover:shadow-lg"
              >
                {youtubeThumb(sermon.videoUrl) && (
                  <Link
                    href={toDetailPath("sermons", sermon.id, sermon.titleFr, lang)}
                    className="relative block aspect-video w-full bg-slate-950"
                  >
                    <Image
                      src={youtubeThumb(sermon.videoUrl)!}
                      alt={pick(lang, sermon.titleFr, sermon.titleEn)}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-slate-950/20 transition group-hover:bg-slate-950/10">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-white shadow-xl transition duration-300 group-hover:scale-110 group-hover:bg-primary">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                  </Link>
                )}
                <div className="p-6">
                  <Link
                    href={toDetailPath("sermons", sermon.id, sermon.titleFr, lang)}
                    className="font-serif text-lg font-bold leading-snug transition group-hover:text-primary-dark"
                  >
                    {pick(lang, sermon.titleFr, sermon.titleEn)}
                  </Link>
                  <p className="mt-1.5 text-xs text-muted">
                    {sermon.speaker} ·{" "}
                    {new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "fr-FR").format(sermon.date)}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                    {pick(lang, sermon.summaryFr, sermon.summaryEn)}
                  </p>
                  <Link
                    href={toDetailPath("sermons", sermon.id, sermon.titleFr, lang)}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-dark transition group-hover:text-primary"
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
                  href={toDetailPath("evenements", event.id, event.titleFr, lang)}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:border-primary-soft hover:shadow-lg"
                >
                  {isValidImageUrl(event.imageUrl) && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                      <img
                        src={event.imageUrl}
                        alt={pick(lang, event.titleFr, event.titleEn)}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary-dark">
                      {new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "fr-FR", {
                        dateStyle: "medium",
                      }).format(event.date)}
                    </p>
                    <h3 className="mt-2 font-serif text-lg font-bold leading-snug transition group-hover:text-primary-dark">
                      {pick(lang, event.titleFr, event.titleEn)}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted">
                      {event.time} · {event.place}
                    </p>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                      {pick(lang, event.summaryFr, event.summaryEn)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-dark transition group-hover:text-primary">
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
    </>
  );
}
