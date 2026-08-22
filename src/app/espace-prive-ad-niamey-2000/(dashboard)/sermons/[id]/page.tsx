import { notFound } from "next/navigation";
import SermonForm from "@/components/admin/SermonForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditSermonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sermon = await prisma.sermon.findUnique({ where: { id: Number(id) } });
  if (!sermon) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
        Modifier le sermon
      </h1>
      <p className="mt-1 text-sm text-muted">{sermon.titleFr}</p>
      <div className="mt-8">
        <SermonForm
          sermon={{
            ...sermon,
            date: sermon.date.toISOString(),
          }}
        />
      </div>
    </div>
  );
}
