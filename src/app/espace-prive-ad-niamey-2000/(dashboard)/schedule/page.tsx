import ScheduleEditor from "@/components/admin/ScheduleEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminSchedulePage() {
  const items = await prisma.scheduleItem.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
        Horaires
      </h1>
      <p className="mt-1 text-sm text-muted">
        Les cultes et activités réguliers affichés sur le site (Accueil,
        Contact, pied de page). Les horaires des événements se gèrent dans{" "}
        <span className="font-semibold">Événements</span>.
      </p>
      <div className="mt-8">
        <ScheduleEditor items={items} />
      </div>
    </div>
  );
}
