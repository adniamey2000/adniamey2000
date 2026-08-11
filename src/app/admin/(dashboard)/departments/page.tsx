import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDepartmentsPage() {
  const departments = await prisma.department.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
            Départements
          </h1>
          <p className="mt-1 text-sm text-muted">
            Les départements de l&apos;église (Chorale, Jeunesse, etc.).
          </p>
        </div>
        <Link
          href="/admin/departments/new"
          className="rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          + Nouveau département
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {departments.length === 0 && (
          <div className="rounded-2xl border border-dashed border-primary-soft bg-white p-10 text-center text-sm text-muted sm:col-span-3">
            Aucun département pour le moment.
          </div>
        )}

        {departments.map((dept) => (
          <div
            key={dept.id}
            className="flex flex-col justify-between rounded-2xl border border-primary-soft bg-white p-5 shadow-sm"
          >
            <div>
              <h2 className="font-serif text-base font-bold text-ink">
                {dept.nameFr}
              </h2>
              <p className="mt-1 text-xs text-muted">{dept.nameEn}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {dept.descFr}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Link
                href={`/admin/departments/${dept.id}`}
                className="rounded-full border border-primary-soft px-4 py-1.5 text-xs font-semibold text-primary-dark transition hover:bg-primary-soft"
              >
                Modifier
              </Link>
              <DeleteButton url={`/api/admin/departments/${dept.id}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
