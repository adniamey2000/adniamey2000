import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR").format(date);
}

export default async function AdminSermonsPage() {
  const sermons = await prisma.sermon.findMany({ orderBy: { date: "desc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
            Sermons
          </h1>
          <p className="mt-1 text-sm text-muted">
            Ajoutez un lien YouTube et un résumé pour chaque sermon.
          </p>
        </div>
        <Link
          href="/admin/sermons/new"
          className="rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          + Nouveau sermon
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {sermons.length === 0 && (
          <div className="rounded-2xl border border-dashed border-primary-soft bg-white p-10 text-center text-sm text-muted">
            Aucun sermon pour le moment.
          </div>
        )}

        {sermons.map((sermon) => (
          <div
            key={sermon.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary-soft bg-white p-5 shadow-sm"
          >
            <div className="min-w-0">
              <Link
                href={`/admin/sermons/${sermon.id}`}
                className="font-serif text-base font-bold text-ink transition hover:text-primary-dark"
              >
                {sermon.titleFr}
              </Link>
              <p className="mt-1 truncate text-xs text-muted">
                {sermon.speaker} · {formatDate(sermon.date)}
              </p>
              <p className="mt-1 truncate text-xs text-muted/70">{sermon.videoUrl}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/sermons/${sermon.id}`}
                className="rounded-full border border-primary-soft px-4 py-1.5 text-xs font-semibold text-primary-dark transition hover:bg-primary-soft"
              >
                Modifier
              </Link>
              <DeleteButton url={`/api/admin/sermons/${sermon.id}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
