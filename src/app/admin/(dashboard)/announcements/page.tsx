import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(date);
}

export default async function AdminAnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
            Annonces
          </h1>
          <p className="mt-1 text-sm text-muted">
            Communiqués de chaque dimanche, affichés sur le site et en bandeau
            défilant sur l&apos;accueil.
          </p>
        </div>
        <Link
          href="/admin/announcements/new"
          className="rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          + Nouvelle annonce
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {announcements.length === 0 && (
          <div className="rounded-2xl border border-dashed border-primary-soft bg-white p-10 text-center text-sm text-muted">
            Aucune annonce pour le moment.
          </div>
        )}

        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary-soft bg-white p-5 shadow-sm"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/announcements/${announcement.id}`}
                  className="font-serif text-base font-bold text-ink transition hover:text-primary-dark"
                >
                  {announcement.titleFr || announcement.titleEn}
                </Link>
                {!announcement.isPublished && (
                  <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-[11px] font-semibold text-muted">
                    Brouillon
                  </span>
                )}
              </div>
              <p className="mt-1 line-clamp-1 text-xs text-muted">
                {announcement.contentFr || announcement.contentEn}
              </p>
              <p className="mt-1 text-xs text-muted/70">
                {formatDate(announcement.date)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/announcements/${announcement.id}`}
                className="rounded-full border border-primary-soft px-4 py-1.5 text-xs font-semibold text-primary-dark transition hover:bg-primary-soft"
              >
                Modifier
              </Link>
              <DeleteButton url={`/api/admin/announcements/${announcement.id}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
