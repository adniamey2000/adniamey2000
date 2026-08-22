import Link from "next/link";
import { BarChart, DonutChart, GroupedBarChart } from "@/components/admin/DashboardCharts";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function monthlyBuckets() {
  const monthNames = new Intl.DateTimeFormat("fr-FR", { month: "short" });
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    return { key, label: monthNames.format(d).replace(".", "") };
  });
}

function countByMonth(months: { key: string; label: string }[], dates: Date[]) {
  const byMonth = new Map<string, number>();
  for (const date of dates) {
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    byMonth.set(key, (byMonth.get(key) ?? 0) + 1);
  }
  return months.map((m) => ({ label: m.label, count: byMonth.get(m.key) ?? 0 }));
}

export default async function AdminDashboardPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    sermons,
    events,
    announcements,
    departments,
    schedule,
    donations,
    gallery,
    newsletter,
    settings,
    leaders,
    allEvents,
    sermonDates,
    contactMessages,
    unreadMessages,
  ] = await Promise.all([
    prisma.sermon.count(),
    prisma.churchEvent.count(),
    prisma.announcement.count(),
    prisma.department.count(),
    prisma.scheduleItem.count(),
    prisma.donationInfo.count(),
    prisma.galleryImage.count(),
    prisma.newsletterSubscriber.count({ where: { confirmed: true } }),
    prisma.siteSetting.count(),
    prisma.leader.count(),
    prisma.churchEvent.findMany({ select: { date: true } }),
    prisma.sermon.findMany({ select: { date: true } }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  const stats = [
    { label: "Sermons", value: sermons, href: "/espace-prive-ad-niamey-2000/sermons" },
    { label: "Événements", value: events, href: "/espace-prive-ad-niamey-2000/events" },
    { label: "Annonces", value: announcements, href: "/espace-prive-ad-niamey-2000/announcements" },
    { label: "Messages", value: contactMessages, href: "/espace-prive-ad-niamey-2000/messages" },
    { label: "Départements", value: departments, href: "/espace-prive-ad-niamey-2000/departments" },
    { label: "Équipe", value: leaders, href: "/espace-prive-ad-niamey-2000/leaders" },
    { label: "Horaires", value: schedule, href: "/espace-prive-ad-niamey-2000/schedule" },
    { label: "Dons", value: donations, href: "/espace-prive-ad-niamey-2000/donations" },
    { label: "Photos", value: gallery, href: "/espace-prive-ad-niamey-2000/gallery" },
    { label: "Newsletter", value: newsletter, href: "/espace-prive-ad-niamey-2000/newsletter" },
    { label: "Contact", value: settings, href: "/espace-prive-ad-niamey-2000/contact" },
  ];

  const months = monthlyBuckets();
  const eventMonthly = countByMonth(months, allEvents.map((e) => e.date));
  const sermonMonthly = countByMonth(months, sermonDates.map((s) => s.date));

  const upcomingCount = allEvents.filter((e) => e.date >= today).length;
  const pastCount = allEvents.length - upcomingCount;

  const contentParts = [
    { label: "Sermons", value: sermons, color: "#4a4dbb" },
    { label: "Événements", value: events, color: "#9fa1e1" },
    { label: "Annonces", value: announcements, color: "#1018e5" },
    { label: "Départements", value: departments, color: "#38b6ff" },
    { label: "Équipe", value: leaders, color: "#6ee7b7" },
    { label: "Photos", value: gallery, color: "#fbbf24" },
    { label: "Abonnés", value: newsletter, color: "#f472b6" },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
        Tableau de bord
      </h1>
      <p className="mt-1 text-sm text-muted">
        Gérez le contenu du site de l&apos;église depuis cet espace.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const isMessages = stat.label === "Messages";
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="relative rounded-2xl border border-primary-soft bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              {isMessages && unreadMessages > 0 && (
                <span className="absolute right-4 top-4 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-2 text-xs font-bold text-white">
                  {unreadMessages}
                </span>
              )}
              <p className="text-sm font-medium text-muted">{stat.label}</p>
              <p className="mt-2 font-serif text-4xl font-bold text-primary-dark">
                {stat.value}
              </p>
              <p className="mt-3 text-xs font-semibold text-primary-dark">
                Gérer →
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-primary-soft bg-white p-6 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-ink">
            Activité — 6 derniers mois
          </h2>
          <p className="mt-1 text-xs text-muted">
            Sermons et événements créés par mois.
          </p>
          <div className="mt-6">
            <GroupedBarChart
              series={[
                { name: "Sermons", data: sermonMonthly },
                { name: "Événements", data: eventMonthly },
              ]}
              labels={months.map((m) => m.label)}
              label="Sermons et événements par mois"
            />
          </div>
        </div>
        <div className="rounded-2xl border border-primary-soft bg-white p-6 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-ink">
            Répartition des événements
          </h2>
          <p className="mt-1 text-xs text-muted">
            À venir par rapport aux événements passés.
          </p>
          <div className="mt-6">
            <DonutChart
              parts={[
                { label: "À venir", value: upcomingCount, color: "#4a4dbb" },
                { label: "Passés", value: pastCount, color: "#9fa1e1" },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-primary-soft bg-white p-6 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-ink">
            Contenu du site
          </h2>
          <p className="mt-1 text-xs text-muted">
            Répartition des éléments gérés.
          </p>
          <div className="mt-6">
            <DonutChart parts={contentParts} centerLabel="éléments" />
          </div>
        </div>
        <div className="rounded-2xl border border-primary-soft bg-white p-6 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-ink">
            Événements — 6 derniers mois
          </h2>
          <p className="mt-1 text-xs text-muted">
            Nombre d&apos;événements créés par mois.
          </p>
          <div className="mt-6">
            <BarChart
              data={eventMonthly}
              label="Événements par mois"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-primary-soft bg-primary-soft/50 p-6">
        <h2 className="font-serif text-lg font-bold text-primary-dark">
          Voir le site
        </h2>
        <p className="mt-2 text-sm text-muted">
          Les changements effectués ici apparaissent directement sur le site
          public (pages Accueil, Sermons, Événements, Annonces, À propos,
          Contact).
        </p>
        <Link
          href="/fr"
          target="_blank"
          className="mt-4 inline-block rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Ouvrir le site →
        </Link>
      </div>
    </div>
  );
}
