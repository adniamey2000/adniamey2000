import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventCalendar from "@/components/EventCalendar";
import EventsBrowser from "@/components/EventsBrowser";
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
    title: `${dict.nav.events} — AD Niamey 2000`,
    description: dict.meta.description,
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDict(lang);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [upcoming, past] = await Promise.all([
    prisma.churchEvent.findMany({
      where: { date: { gte: today } },
      orderBy: { date: "asc" },
    }),
    prisma.churchEvent.findMany({
      where: { date: { lt: today } },
      orderBy: { date: "desc" },
    }),
  ]);

  const serialize = (events: typeof upcoming) =>
    events.map((e) => ({
      id: e.id,
      title: pick(lang, e.titleFr, e.titleEn),
      summary: pick(lang, e.summaryFr, e.summaryEn),
      dateISO: e.date.toISOString(),
      time: e.time,
      place: e.place,
      imageUrl: e.imageUrl,
    }));

  return (
    <div>
      <PageHeader
        title={dict.events.title}
        subtitle={dict.events.subtitle}
        image={images.pageHeaders.events}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="fade-up mx-auto max-w-3xl">
          <EventCalendar
            events={upcoming.map((e) => ({
              id: e.id,
              title: pick(lang, e.titleFr, e.titleEn),
              date: e.date.toISOString(),
              time: e.time,
              place: e.place,
            }))}
            locale={lang === "en" ? "en-GB" : "fr-FR"}
            labels={{
              emptyDay: dict.events.emptyDay,
              monthPrev: dict.events.monthPrev,
              monthNext: dict.events.monthNext,
            }}
          />
        </div>

        <div className="fade-up-delay-1 mt-16">
          <EventsBrowser
            lang={lang}
            upcoming={serialize(upcoming)}
            past={serialize(past)}
            labels={{
              upcoming: dict.events.upcoming,
              past: dict.events.past,
              details: dict.events.details,
              searchPlaceholder: dict.events.searchPlaceholder,
              noResults: dict.events.noResults,
              filterLabel: dict.events.filterLabel,
              allMonths: dict.events.allMonths,
            }}
          />
        </div>
      </section>
    </div>
  );
}
