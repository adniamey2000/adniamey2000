import LeadersEditor from "@/components/admin/LeadersEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminLeadersPage() {
  const leaders = await prisma.leader.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
        Équipe & Responsables
      </h1>
      <p className="mt-1 text-sm text-muted">
        L&apos;équipe affichée sur la page « À propos » (pasteurs, diacres,
        responsables de départements, etc.). Le premier responsable (en haut
        de liste) est mis en avant — utilisez les flèches ↑ ↓ pour réordonner.
      </p>
      <div className="mt-8">
        <LeadersEditor
          leaders={leaders.map((leader) => ({
            name: leader.name,
            titleFr: leader.titleFr,
            titleEn: leader.titleEn,
            bioFr: leader.bioFr,
            bioEn: leader.bioEn,
            imageUrl: leader.imageUrl,
          }))}
        />
      </div>
    </div>
  );
}
