import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR").format(date);
}

export default async function AdminEventsPage() {
  const events = await prisma.churchEvent.findMany({ orderBy: { date: "asc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
            Événements
          </h1>
          <p className="mt-1 text-sm text-muted">
            Les événements et annonces de l&apos;église.
          </p>
        </div>
        <Link
          href="/espace-prive-ad-niamey-2000/events/new"
          className="rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          + Nouvel événement
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {events.length === 0 && (
          <div className="rounded-2xl border border-dashed border-primary-soft bg-white p-10 text-center text-sm text-muted">
            Aucun événement pour le moment.
          </div>
        )}

        {events.map((event) => (
          <div
            key={event.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary-soft bg-white p-5 shadow-sm"
          >
            <div className="min-w-0">
              <Link
                href={`/espace-prive-ad-niamey-2000/events/${event.id}`}
                className="font-serif text-base font-bold text-ink transition hover:text-primary-dark"
              >
                {event.titleFr}
              </Link>
              <p className="mt-1 text-xs text-muted">
                {formatDate(event.date)} · {event.time} · {event.place}
              </p>
              <p className="mt-1 line-clamp-1 text-xs text-muted/70">
                {event.summaryFr}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/espace-prive-ad-niamey-2000/events/${event.id}`}
                className="rounded-full border border-primary-soft px-4 py-1.5 text-xs font-semibold text-primary-dark transition hover:bg-primary-soft"
              >
                Modifier
              </Link>
              <DeleteButton url={`/api/espace-prive-ad-niamey-2000/events/${event.id}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
