import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import DonationSection from "@/components/DonationSection";
import { churchName, getDict, isLocale, pick } from "@/lib/i18n";
import { isValidImageUrl } from "@/lib/images";
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
    title: `${dict.nav.about} — AD Niamey 2000`,
    description: dict.meta.aboutDescription,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDict(lang);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [departments, leaders, sermonCount, upcomingEvents] = await Promise.all([
    prisma.department.findMany({
      orderBy: { sortOrder: "asc" },
    }),
    prisma.leader.findMany({
      orderBy: { sortOrder: "asc" },
    }),
    prisma.sermon.count(),
    prisma.churchEvent.count({
      where: { date: { gte: today } },
    }),
  ]);

  const senior = leaders[0];
  const team = leaders.slice(1);

  const stats = [
    { value: new Date().getFullYear() - 2000, label: dict.about.stats.years },
    { value: departments.length, label: dict.about.stats.departments },
    { value: sermonCount, label: dict.about.stats.sermons },
    { value: upcomingEvents, label: dict.about.stats.events },
  ];

  return (
    <div>
      <PageHeader
        title={dict.about.title}
        subtitle={dict.about.subtitle}
        image="/images/about/prayer.jpg"
      />

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative fade-up">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-3xl bg-accent-soft" aria-hidden="true" />
            <Image
              src="/images/about/worship.jpg"
              alt={dict.about.title}
              width={640}
              height={480}
              className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
            />
          </div>
          <div className="fade-up-delay-1">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-dark">
              {churchName}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">
              {dict.about.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {dict.about.intro}
            </p>
            <p className="mt-3 leading-relaxed text-muted">
              {dict.about.intro2}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { value: new Date().getFullYear() - 2000, label: dict.about.stats.years },
                { value: departments.length, label: dict.about.stats.departments },
                { value: upcomingEvents, label: dict.about.stats.events },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-primary-soft bg-primary-soft/40 p-4 text-center"
                >
                  <p className="font-serif text-2xl font-bold text-accent">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-white">
            {dict.about.statsTitle}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-4xl font-bold text-accent sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-white/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div className="fade-up overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src="/images/about/mission.jpg"
              alt={dict.about.mission.title}
              width={640}
              height={360}
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="p-8">
              <h2 className="font-serif text-2xl font-bold text-primary-dark">
                {dict.about.mission.title}
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                {dict.about.mission.text}
              </p>
            </div>
          </div>
          <div className="fade-up-delay-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src="/images/about/prayer.jpg"
              alt={dict.about.vision.title}
              width={640}
              height={360}
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="p-8">
              <h2 className="font-serif text-2xl font-bold text-primary-dark">
                {dict.about.vision.title}
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                {dict.about.vision.text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center font-serif text-3xl font-bold">
          {dict.about.values.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
          {dict.about.values.text}
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {dict.about.valuesList.map((value, i) => (
            <div
              key={value.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center"
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary-dark font-serif text-lg font-bold text-white">
                {i + 1}
              </div>
              <h3 className="mt-4 font-serif text-lg font-bold text-primary-dark">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/about/singing.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/60" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            {dict.about.bannerTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/85">
            {dict.about.bannerText}
          </p>
        </div>
      </section>

      {/* Departments */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center font-serif text-3xl font-bold">
          {dict.about.departments.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
          {dict.about.departments.text}
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              {isValidImageUrl(dept.imageUrl) ? (
                <img
                  src={dept.imageUrl}
                  alt={pick(lang, dept.nameFr, dept.nameEn)}
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[16/9] w-full items-center justify-center bg-slate-100">
                  <span className="font-serif text-3xl font-bold text-slate-300">
                    {pick(lang, dept.nameFr, dept.nameEn).charAt(0)}
                  </span>
                </div>
              )}
              <div className="p-6">
                <h3 className="font-serif text-lg font-bold">
                  {pick(lang, dept.nameFr, dept.nameEn)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {pick(lang, dept.descFr, dept.descEn)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              {dict.about.leadership.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted">
              {dict.about.leadership.text}
            </p>
          </div>

          {senior && (
            <div className="fade-up mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
              <div className="grid sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div className="relative aspect-[4/3] sm:aspect-auto">
                  {isValidImageUrl(senior.imageUrl) ? (
                    <img
                      src={senior.imageUrl}
                      alt={senior.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100">
                      <span className="font-serif text-6xl font-bold text-slate-300">
                        {senior.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center p-8">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-dark px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    {dict.about.leadership.senior}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl font-bold text-ink">
                    {senior.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-primary-dark">
                    {pick(lang, senior.titleFr, senior.titleEn)}
                  </p>
                  <p className="mt-4 leading-relaxed text-muted">
                    {pick(lang, senior.bioFr, senior.bioEn)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {team.length > 0 && (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative aspect-[16/10]">
                    {isValidImageUrl(member.imageUrl) ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-100">
                        <span className="font-serif text-5xl font-bold text-slate-300">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-lg font-bold text-ink">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-primary-dark">
                      {pick(lang, member.titleFr, member.titleEn)}
                    </p>
                    {pick(lang, member.bioFr, member.bioEn) && (
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {pick(lang, member.bioFr, member.bioEn)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <DonationSection dict={dict} />
    </div>
  );
}
